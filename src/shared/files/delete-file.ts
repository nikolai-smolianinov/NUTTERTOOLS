import fs from "node:fs";

/**
 * Deletes file or directory
 * @param path
 */
export async function deleteFile(path: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Сначала проверяем существование пути
    fs.access(path, fs.constants.F_OK, (accessError) => {
      if (accessError) {
        // Если путь не существует, резолвим промис
        return resolve();
      }

      // Проверяем, является ли путь директорией
      fs.stat(path, (statError, stats) => {
        if (statError) {
          return reject(statError);
        }

        if (stats.isDirectory()) {
          // Если это директория, используем rm с recursive
          fs.rm(path, { recursive: true }, (rmError) => {
            if (rmError) {
              return reject(rmError);
            }
            resolve();
          });
        } else {
          // Если это файл, используем unlink
          fs.unlink(path, (unlinkError) => {
            if (unlinkError) {
              return reject(unlinkError);
            }
            resolve();
          });
        }
      });
    });
  });
}
