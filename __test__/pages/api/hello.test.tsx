import handler from "@pages/api/hello";

describe("hello", () => {
  it("Test handler", () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };

    const status = jest.spyOn(res, "status");
    const json = jest.spyOn(res, "json");

    handler({}, res);

    expect(status).toBeCalledWith(200);
    expect(json).toBeCalledWith({ name: "John Doe" });
  });
});