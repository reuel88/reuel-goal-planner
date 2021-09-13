import authorization, { updateEmail, updatePassword } from "firebase/auth";
import authService from "@services/authClientService";

const faker = require("faker");

jest.mock("@configs/firebase", () => ({
  auth: {currentUser: {}}
}));

jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({currentUser: {}})),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  sendPasswordResetEmail: jest.fn(),
  updateEmail: jest.fn(),
  updatePassword: jest.fn(),
  onAuthStateChanged: jest.fn(),
  setPersistence: jest.fn()
}));

describe("authServices", () => {
  it("Testing sign up", () => {
    const createUserWithEmailAndPassword = jest.spyOn(authorization, "createUserWithEmailAndPassword").mockImplementation(jest.fn());

    const email = faker.internet.email();
    const password = faker.internet.password();

    authService.signUp(email, password);

    expect(createUserWithEmailAndPassword).toBeCalled();
  });

  it("Testing sign in", () => {
    const signInWithEmailAndPassword = jest.spyOn(authorization, "signInWithEmailAndPassword").mockImplementation(jest.fn());

    const email = faker.internet.email();
    const password = faker.internet.password();

    authService.signIn(email, password);

    expect(signInWithEmailAndPassword).toBeCalled();
  });

  it("Testing sign out", () => {
    const signOut = jest.spyOn(authorization, "signOut").mockImplementation(jest.fn());

    authService.signOut();

    expect(signOut).toBeCalled();
  });

  it("Testing reset password", () => {
    const sendPasswordResetEmail = jest.spyOn(authorization, "sendPasswordResetEmail").mockImplementation(jest.fn());

    const email = faker.internet.email();

    authService.resetPassword(email);

    expect(sendPasswordResetEmail).toBeCalled();
  });

  it("Testing update email", () => {
    const updateEmail = jest.spyOn(authorization, "updateEmail").mockImplementation(jest.fn());

    const email = faker.internet.email();

    authService.updateEmail(email);

    expect(updateEmail).toBeCalledWith({}, email);
  });

  it("Testing update password", () => {
    const updatePassword = jest.spyOn(authorization, "updatePassword").mockImplementation(jest.fn());

    const password = faker.internet.password();

    authService.updatePassword(password);

    expect(updatePassword).toBeCalledWith({}, password);
  });

  it("Testing authorization listener", () => {
    const onAuthStateChanged = jest.spyOn(authorization, "onAuthStateChanged").mockImplementation(jest.fn());

    authService.authStateChanged(() => {
    });

    expect(onAuthStateChanged).toBeCalled();
  });
});