// import '@testing-library/jest-dom' // imported by jest.setup.ts
import { AuthProvider, useAuth } from "@contexts/AuthContext";
import authClientService from "@services/authClientService";
import { act, render, screen, waitFor } from "@testing-library/react";
import { FunctionComponent } from "react";
import { getControlledPromise } from "../testUtils/ControlledPromise";

const faker = require("faker");

jest.mock("nookies", () => ({
    set: jest.fn()
  })
);

jest.mock("@services/authClientService", () => ({
    signUp: jest.fn(),
    signInWithEmailAndPassword: jest.fn(),
    signOut: jest.fn(),
    resetPassword: jest.fn(),
    updateEmail: jest.fn(),
    updatePassword: jest.fn(),
    authStateChanged: jest.fn(),
    idTokenChanged: jest.fn((callback) => callback(null))
  })
);

describe("AuthContext", () => {
  it("Expect to be loading", () => {
    expect.assertions(1);

    const uuid = faker.datatype.uuid();
    const email = faker.internet.email();

    const { promise } = getControlledPromise();

    jest.spyOn(authClientService, "idTokenChanged").mockImplementation((callback: any) => callback({
      uid: uuid,
      email: email,
      getIdToken: () => promise
    }));

    const TestingComponent: FunctionComponent = () => {
      const { currentUser } = useAuth() ?? { currentUser: null };

      if (!currentUser) return <div data-testid="no-user-output">No User</div>;

      return <div data-testid="is-user-output">{currentUser?.uid} - {currentUser?.email}</div>;
    };

    render(<AuthProvider><TestingComponent /></AuthProvider>);
    const loading = screen.getByText(/loading/i);

    expect(loading).toBeInTheDocument();
  });

  it("Expect profile to load", async () => {
    expect.assertions(1);

    const uuid = faker.datatype.uuid();
    const email = faker.internet.email();
    const token = faker.datatype.uuid();

    const { deferred, promise } = getControlledPromise();

    jest.spyOn(authClientService, "idTokenChanged").mockImplementation((callback: any) => callback({
      uid: uuid,
      email: email,
      getIdToken: () => promise
    }));

    const TestingComponent: FunctionComponent = () => {
      const { currentUser } = useAuth() ?? { currentUser: null };

      if (!currentUser) return <div data-testid="no-user-output">No User</div>;

      return <div data-testid="is-profile-output">{currentUser?.uid} - {currentUser?.email}</div>;
    };

    render(<AuthProvider><TestingComponent /></AuthProvider>);

    setTimeout(() => deferred.resolve(token), 1000);

    await act(() => waitFor(() => promise));

    const isUserOutput = screen.getByTestId("is-profile-output");

    expect(isUserOutput).toHaveTextContent(`${uuid} - ${email}`);
  });

  it("Expect sign up to be called", async () => {
    expect.assertions(1);

    const createUserWithEmailAndPassword = jest.spyOn(authClientService, "signUp").mockImplementation(jest.fn());

    const email = faker.internet.email();
    const password = faker.internet.password();

    jest.spyOn(authClientService, "idTokenChanged").mockImplementation((callback: any) => callback(null));

    const TestingComponent: FunctionComponent = () => {
      const { signUp } = useAuth() ?? { signUp: null };

      if (signUp) {
        signUp(email, password);
      }

      return <div data-testid="is-user-output">Test</div>;
    };

    render(<AuthProvider><TestingComponent /></AuthProvider>);

    expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(email, password);
  });

  it("Expect sign in to be called", async () => {
    expect.assertions(1);

    const signInWithEmailAndPassword = jest.spyOn(authClientService, "signInWithEmailAndPassword").mockImplementation(jest.fn());

    const email = faker.internet.email();
    const password = faker.internet.password();

    jest.spyOn(authClientService, "idTokenChanged").mockImplementation((callback: any) => callback(null));

    const TestingComponent: FunctionComponent = () => {
      const { signInWithEmailAndPassword } = useAuth() ?? { signIn: null };

      if (signInWithEmailAndPassword) {
        signInWithEmailAndPassword(email, password);
      }

      return <div data-testid="is-user-output">Test</div>;
    };

    render(<AuthProvider><TestingComponent /></AuthProvider>);

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(email, password);
  });

  it("Expect sign out to be called", async () => {
    expect.assertions(1);

    const signOut = jest.spyOn(authClientService, "signOut").mockImplementation(jest.fn());

    const uuid = faker.datatype.uuid();
    const email = faker.internet.email();
    const token = faker.datatype.uuid();

    const { deferred, promise } = getControlledPromise();

    jest.spyOn(authClientService, "idTokenChanged").mockImplementation((callback: any) => callback({
      uid: uuid,
      email: email,
      getIdToken: () => promise
    }));

    const TestingComponent: FunctionComponent = () => {
      const { signOut } = useAuth() ?? { signOut: null };

      if (signOut) {
        signOut();
      }

      return <div data-testid="is-user-output">Test</div>;
    };

    render(<AuthProvider><TestingComponent /></AuthProvider>);

    setTimeout(() => deferred.resolve(token), 1000);

    await act(() => waitFor(() => promise));

    expect(signOut).toHaveBeenCalled();
  });

  it("Expect reset password to be called", async () => {
    expect.assertions(1);

    const resetPassword = jest.spyOn(authClientService, "resetPassword").mockImplementation(jest.fn());

    const email = faker.internet.email();

    jest.spyOn(authClientService, "idTokenChanged").mockImplementation((callback: any) => callback(null));

    const TestingComponent: FunctionComponent = () => {
      const { resetPassword } = useAuth() ?? { resetPassword: null };

      if (resetPassword) {
        resetPassword(email);
      }

      return <div data-testid="is-user-output">Test</div>;
    };

    render(<AuthProvider><TestingComponent /></AuthProvider>);

    expect(resetPassword).toHaveBeenCalledWith(email);
  });

  it("Expect update email to be called", async () => {
    expect.assertions(1);

    const updateEmail = jest.spyOn(authClientService, "updateEmail").mockImplementation(jest.fn());

    const uuid = faker.datatype.uuid();
    const email = faker.internet.email();
    const newEmail = faker.internet.email();
    const token = faker.datatype.uuid();

    const { deferred, promise } = getControlledPromise();

    jest.spyOn(authClientService, "idTokenChanged").mockImplementation((callback: any) => callback({
      uid: uuid,
      email: email,
      getIdToken: () => promise
    }));

    const TestingComponent: FunctionComponent = () => {
      const { updateEmail } = useAuth() ?? { updateEmail: null };

      if (updateEmail) {
        updateEmail(newEmail);
      }

      return <div data-testid="is-user-output">Test</div>;
    };

    render(<AuthProvider><TestingComponent /></AuthProvider>);

    setTimeout(() => deferred.resolve(token), 1000);

    await act(() => waitFor(() => promise));

    expect(updateEmail).toHaveBeenCalledWith(newEmail);
  });

  it("Expect update password to be called", async () => {
    expect.assertions(1);

    const updatePassword = jest.spyOn(authClientService, "updatePassword").mockImplementation(jest.fn());

    const uuid = faker.datatype.uuid();
    const email = faker.internet.email();
    const password = faker.internet.password();
    const token = faker.datatype.uuid();

    const { deferred, promise } = getControlledPromise();

    jest.spyOn(authClientService, "idTokenChanged").mockImplementation((callback: any) => callback({
      uid: uuid,
      email: email,
      getIdToken: () => promise
    }));

    const TestingComponent: FunctionComponent = () => {
      const { updatePassword } = useAuth() ?? { updatePassword: null };

      if (updatePassword) {
        updatePassword(password);
      }

      return <div data-testid="is-user-output">Test</div>;
    };

    render(<AuthProvider><TestingComponent /></AuthProvider>);

    setTimeout(() => deferred.resolve(token), 1000);

    await act(() => waitFor(() => promise));

    expect(updatePassword).toHaveBeenCalledWith(password);
  });
});
