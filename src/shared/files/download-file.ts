import fs from "node:fs";
import path from "node:path";
import mime from "mime-types";
import { axios, AxiosProgressEvent } from "@/lib";

interface DownloadOptions {
  headers?: Record<string, string>;
  onProgress?: (progress: number) => void;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  forceExtension?: string;
}

/**
 * Get file extension from content type or URL
 */
function getFileExtension(
  contentType: string | undefined,
  url: string,
  originalPath: string,
): string {
  // If path already has extension, use it
  const existingExtension = path.extname(originalPath);
  if (existingExtension) return originalPath;

  // Try to get extension from content-type
  if (contentType) {
    const extensionFromMime = mime.extension(contentType);
    if (extensionFromMime) {
      return `${originalPath}.${extensionFromMime}`;
    }
  }

  // Try to get extension from URL
  const urlExtension = path.extname(new URL(url).pathname);
  if (urlExtension) {
    return `${originalPath}${urlExtension}`;
  }

  // If no extension could be determined, return original path
  return originalPath;
}

export async function downloadFile(
  url: string,
  destination: string,
  options: DownloadOptions = {},
): Promise<string> {
  const {
    headers,
    onProgress,
    timeout = 30_000,
    retries = 3,
    retryDelay = 1000,
    forceExtension,
  } = options;

  const download = async (attempt: number): Promise<string> => {
    try {
      // First make a HEAD request to get content-type
      const headResponse = await axios.head(url, { headers, timeout });
      const contentType = headResponse.headers["content-type"]?.split(";")[0];

      // Determine final destination with correct extension
      let finalDestination = destination;
      if (forceExtension) {
        finalDestination = destination.endsWith(forceExtension)
          ? destination
          : `${destination}.${forceExtension}`;
      } else {
        finalDestination = getFileExtension(contentType, url, destination);
      }

      // Ensure directory exists
      const directory = path.dirname(finalDestination);
      await fs.promises.mkdir(directory, { recursive: true });

      // If file exists, delete it first
      if (await fs.promises.access(finalDestination).catch(() => false)) {
        await fs.promises.unlink(finalDestination);
      }

      const response = await axios.get(url, {
        responseType: "stream",
        headers: {
          ...headers,
          // Add Accept header based on detected content type
          ...(contentType && { Accept: contentType }),
        },
        timeout,
        onDownloadProgress: (progressEvent: AxiosProgressEvent) => {
          if (onProgress && progressEvent.total) {
            const progress = (progressEvent.loaded / progressEvent.total) * 100;
            onProgress(Math.round(progress));
          }
        },
      });

      const writer = fs.createWriteStream(finalDestination);
      response.data.pipe(writer);

      return new Promise<string>((resolve, reject) => {
        writer.on("finish", () => resolve(finalDestination));
        writer.on("error", async (error) => {
          // Clean up failed download
          await fs.promises.unlink(finalDestination).catch(() => {});
          reject(error);
        });
      });
    } catch (error: any) {
      if (attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return download(attempt + 1);
      }
      throw new Error(
        `Failed to download file after ${retries} attempts: ${error.message}`,
      );
    }
  };

  return download(1);
}
