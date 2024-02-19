import { computeDataError } from "../computeDataError";
import { STATUS_HTTP_MESSAGES, setResponseError } from "../setResponseError";

// Mock
jest.mock("../setResponseError", () => ({
  setResponseError: jest.fn(),
  STATUS_HTTP_MESSAGES: { 404: "Not Found" },
}));

describe("computeDataError", () => {
  beforeEach(() => {
    setResponseError.mockClear();
  });

  test("traite correctement une réponse avec données JSON valides", async () => {
    const mockJsonPromise = Promise.resolve({ message: "Erreur" });
    const response = {
      json: jest.fn().mockImplementation(() => mockJsonPromise),
      status: 500,
    };

    await computeDataError(response);

    expect(response.json).toHaveBeenCalled();
    expect(setResponseError).toHaveBeenCalledWith({
      response: expect.objectContaining({
        message: "Erreur",
        status: 500,
      }),
    });
  });

  test("gère une réponse sans données JSON valides", async () => {
    const response = {
      json: jest.fn().mockRejectedValue(new Error("Échec du parsing JSON")),
      status: 404,
    };

    await computeDataError(response);

    expect(response.json).toHaveBeenCalled();
    expect(setResponseError).toHaveBeenCalledWith({
      response: {
        anomaly: { label: "Not Found" },
        status: 404,
      },
    });
  });

  test("utilise une fonction setResponseErrorFn personnalisée", async () => {
    const customSetResponseError = jest.fn();
    const mockJsonPromise = Promise.resolve({
      message: "Erreur personnalisée",
    });
    const response = {
      json: jest.fn().mockImplementation(() => mockJsonPromise),
      status: 200,
    };

    await computeDataError(response, customSetResponseError);

    expect(customSetResponseError).toHaveBeenCalled();
  });
});
