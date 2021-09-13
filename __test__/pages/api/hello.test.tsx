import httpMocks from 'node-mocks-http';
import { NextApiRequest, NextApiResponse } from 'next';
import handler from "@pages/api/hello";

describe("hello", () => {
  it("Test handler", () => {
    const mockReq = httpMocks.createRequest<NextApiRequest>();
    const mockRes = httpMocks.createResponse<NextApiResponse>();

    const status = jest.spyOn(mockRes, "status");
    const json = jest.spyOn(mockRes, "json");

    handler(mockReq, mockRes);

    expect(status).toBeCalledWith(200);
    expect(json).toBeCalledWith({ name: "John Doe" });
  });
});