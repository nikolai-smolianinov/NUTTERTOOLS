export const uppercaseFirstLetter = (string_: string) =>
  string_.charAt(0).toUpperCase() + string_.slice(1);

export const lowercaseFirstLetter = (string_: string) =>
  string_.charAt(0).toLowerCase() + string_.slice(1);

export const cutString = (string_: string, length: number, tail = "") => {
  if (string_.length <= length - tail.length) return string_;

  const cutIndex = tail ? length - tail.length : length;

  return string_.slice(0, cutIndex).trim() + (tail || "");
};

export const getAllowedExtensionsString = (
  extentions: (string | `.${string}`)[],
) =>
  extentions
    .map((_string, index, self) => {
      const string_ = _string.replace(".", "").toUpperCase();
      if (index < self.length - 1) {
        return `${string_}${index < self.length - 2 ? "," : ""} `;
      }

      return `and ${string_}`;
    })
    .join("");

/**
 * Finds correct article
 * @example getArticle('apple') -> "an" | getArticle('lion') -> "a"
 */
export const getArticle = (string: string) => {
  const pattern = /^([aeiou])/i;

  return pattern.test(string) ? "an" : "a";
};

export const trim = (value: unknown) =>
  typeof value === "string" ? value.trim() : value;

export const removeSpaces = (value: string) => value.replaceAll(/\s+/g, "");

// Убираем все кроме цифр, дефиса, плюса, скобок и пробелов
export const clearPhoneNumber = (value: unknown) =>
  typeof value === "string" ? value.replaceAll(/[^\d\s()+\-]/g, "") : value;

// Простой форматтер множественного числа
export const pluralize = (
  count: number | undefined,
  noun: string,
  suffix = "s",
) => {
  if (count === undefined) return noun;

  return `${noun}${count === 1 ? "" : suffix}`;
};
