import { buildResponse } from "../buildResponse";
import { computeDataError } from "../computeDataError";
import { STATUS_API } from "../setResponseError";

// Mock de computeDataError et STATUS_API pour les tests
jest.mock("../computeDataError", () => jest.fn());
jest.mock("../setResponseError", () => ({
  STATUS_API: {
    ERROR: "error",
    WARNING: "warning",
    SUCCESS: "success",
  },
}));

describe("buildResponse", () => {
  test("lance une exception pour une réponse avec statut d'erreur", async () => {
    const response = { status: STATUS_API.ERROR };
    const config = {};
    await expect(buildResponse(response, config)).rejects.toThrow();
  });

  test("lance une exception pour une réponse avec statut d'avertissement", async () => {
    const response = { status: STATUS_API.WARNING };
    const config = {};
    await expect(buildResponse(response, config)).rejects.toThrow();
  });
});
