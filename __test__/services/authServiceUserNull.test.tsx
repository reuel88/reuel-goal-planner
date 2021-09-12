import authService from "@services/authService";

import { updateEmail, updatePassword} from "firebase/auth";

const faker = require("faker");

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({currentUser: null})),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
  updateEmail: jest.fn(),
  updatePassword: jest.fn(),
  onAuthStateChanged: jest.fn()
}));

describe("authServices", () => {
  it("Expect not to call updateEmail", () => {
    expect.assertions(3);

    const email = faker.internet.email();

    authService.updateEmail(email).catch((e) => {
      expect(e).toBe("firebaseAuth.currentUser not set");
      expect(e).toBeTruthy();
    });

    expect(updateEmail).not.toBeCalled();
  });

  it("Testing not to call updatePassword", () => {
    expect.assertions(3);

    const password = faker.internet.password();

    authService.updatePassword(password).catch((e) => {
      expect(e).toBe("firebaseAuth.currentUser not set");
      expect(e).toBeTruthy();
    });

    expect(updatePassword).not.toBeCalled();
  });
});