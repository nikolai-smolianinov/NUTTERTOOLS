export const isValidHttpLink = (string?: string): boolean => {
  if (!string) return false;

  try {
    // Попытка создать объект URL для проверки корректности
    const url = new URL(string);

    // Проверка на наличие протокола (http или https)
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    // Если создание объекта URL вызвало ошибку, значит, строка не является валидной ссылкой
    return false;
  }
};
