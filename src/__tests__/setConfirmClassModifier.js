import setConfirmClassModifier from "../setConfirmClassModifier";

describe("setConfirmClassModifier", () => {
  test("retourne success", () => {
    const result = setConfirmClassModifier(false);
    expect(result).toBe("confirm success");
  });

  test("retourne disable", () => {
    const result = setConfirmClassModifier(true);
    expect(result).toBe("confirm disabled");
  });

  test("verifiacation de true et false avec un classModifier", () => {
    const clmodif = "verif";

    let result = setConfirmClassModifier(false, clmodif);
    expect(result).toBe("verif success");

    result = setConfirmClassModifier(true, clmodif);
    expect(result).toBe("verif disabled");
  });
});
