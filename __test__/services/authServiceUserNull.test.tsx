import authorization from "firebase/auth";
import { auth } from "@configs/firebase";
import authService from "@services/authService";

const faker = require("faker");

jest.mock("@configs/firebase", () => ({
  auth: {currentUser: null}
}));

jest.mock("firebase/auth", () => ({
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
  updateEmail: jest.fn(),
  updatePassword: jest.fn(),
  onAuthStateChanged: jest.fn()
}));

describe("authServices", () => {
  it("Expect no to call updateEmail", () => {
    const updateEmail = jest.spyOn(authorization, "updateEmail").mockImplementation(jest.fn());

    const email = faker.internet.email();

    authService.updateEmail(email).catch((e) => {
      expect(e).toBeTruthy()
    });

    expect(updateEmail).not.toBeCalled();
  });

  it("Testing not to call updatePassword", () => {
    const updatePassword = jest.spyOn(authorization, "updatePassword").mockImplementation(jest.fn());

    const password = faker.internet.password();

    authService.updatePassword(password).catch((e) => {
      expect(e).toBeTruthy()
    });

    expect(updatePassword).not.toBeCalled();
  });
});