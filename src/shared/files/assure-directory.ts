import fs from "node:fs";
import path from "node:path";

export function assureDirectory(destination: string) {
  const directory = path.dirname(destination);
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}
