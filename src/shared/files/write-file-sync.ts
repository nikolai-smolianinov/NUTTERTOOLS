import * as fs from "node:fs";
import { WriteFileOptions } from "node:fs";
import { assureDirectory } from "@/shared/files/assure-directory";

export const writeFileSync = (
  filePath: string,
  data: string | NodeJS.ArrayBufferView,
  options?: WriteFileOptions,
) => {
  assureDirectory(filePath);

  return fs.writeFileSync(filePath, data, options);
};
