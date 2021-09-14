import * as firebaseAdmin from "firebase-admin";

jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
  apps: [],
  credential: {
    cert: jest.fn()
  }
}));

describe("firebase backend", () => {
    it("Test initialization", async () => {
      const initializeApp = jest.spyOn(firebaseAdmin, "initializeApp").mockImplementation(jest.fn());

      await require("@configs/firebaseBackend").firebaseAdmin;

      expect(initializeApp).toBeCalled();
    })
})