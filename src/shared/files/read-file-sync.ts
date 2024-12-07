import * as fs from "node:fs";
import { WriteFileOptions } from "node:fs";
import { assureDirectory } from "@/shared/files/assure-directory";

export const readFileSync = (filePath: string, options?: WriteFileOptions) => {
  // assureDirectory(filePath);

  return fs.readFileSync(filePath, options);
};
