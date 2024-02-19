import { isValidDate, formatDate, setDate } from "../formatDate";

describe("isValidDate", () => {
  test("retourne true pour une date valide", () => {
    expect(isValidDate("01/01/1970")).toBe(true);
  });

  test("retourne false pour une date invalide", () => {
    expect(isValidDate(null)).toBe(false);
    expect(isValidDate("")).toBe(false);
    expect(isValidDate(undefined)).toBe(false);
  });
});

describe("formatDate", () => {
  test("formate correctement une date donnée", () => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = "01/01/1970";
    const expected = new Intl.DateTimeFormat("fr-FR", options).format(
      new Date(date)
    );
    expect(formatDate(date, "fr-FR", options)).toEqual(expected);
  });

  test("retourne une chaîne vide pour une date invalide", () => {
    expect(formatDate("")).toEqual("");
  });
});

describe("setDate", () => {
  test("retourne la date formatée pour une date valide", () => {
    const date = "2020-01-01";
    const result = setDate({ date });
    expect(result).toMatch(/\d{2}\/\d{2}\/\d{4}/);
  });

  test("retourne une chaîne vide pour une date invalide", () => {
    const date = "";
    const result = setDate({ date });
    expect(result).toEqual("");
  });
});
