// import '@testing-library/jest-dom' // imported by jest.setup.ts
import { AuthProvider, useAuth } from "@contexts/AuthContext";
import authService from "@services/authService";
import { render, screen } from "@testing-library/react";
import { FunctionComponent } from "react";

const faker = require("faker");

jest.mock("@services/authService", () => ({
    authListener: jest.fn(),
    signUp: jest.fn(),
    signIn: jest.fn(),
    signOut: jest.fn(),
    resetPassword: jest.fn(),
    updateEmail: jest.fn(),
    updatePassword: jest.fn()
  })
);

describe("AuthContext", () => {
  it("Expect to be loading", () => {
    const TestingComponent: FunctionComponent = () => {
      const { currentUser } = useAuth() ?? { currentUser: null };

      if (!currentUser) return <div data-testid="no-user-output">No User</div>;

      return <div data-testid="is-user-output">{currentUser?.uid} - {currentUser?.email}</div>;
    };

    render(<AuthProvider><TestingComponent /></AuthProvider>);
    const loading = screen.getByText(/loading/i);

    expect(loading).toBeInTheDocument();
  });

  it("Expect user to load", () => {
    const uuid = faker.datatype.uuid();
    const email = faker.internet.email();

    jest.spyOn(authService, "authListener").mockImplementation((callback: any) => callback({
      uid: uuid,
      email: email
    }));

    const TestingComponent: FunctionComponent = () => {
      const { currentUser } = useAuth() ?? { currentUser: null };

      if (!currentUser) return <div data-testid="no-user-output">No User</div>;

      return <div data-testid="is-user-output">{currentUser?.uid} - {currentUser?.email}</div>;
    };

    render(<AuthProvider><TestingComponent /></AuthProvider>);

    const isUserOutput = screen.getByTestId("is-user-output");

    expect(isUserOutput).toHaveTextContent(`${uuid} - ${email}`);
  });

  it("Expect sign up to be called", () => {
    const createUserWithEmailAndPassword = jest.spyOn(authService, "signUp").mockImplementation(jest.fn());

    const email = faker.internet.email();
    const password = faker.internet.password();

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

  it("Expect sign in to be called", () => {
    const signInWithEmailAndPassword = jest.spyOn(authService, "signIn").mockImplementation(jest.fn());

    const email = faker.internet.email();
    const password = faker.internet.password();

    const TestingComponent: FunctionComponent = () => {
      const { signIn } = useAuth() ?? { signIn: null };

      if (signIn) {
        signIn(email, password);
      }

      return <div data-testid="is-user-output">Test</div>;
    };

    render(<AuthProvider><TestingComponent /></AuthProvider>);

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(email, password);
  });

  it("Expect sign out to be called", () => {
    const signOut = jest.spyOn(authService, "signOut").mockImplementation(jest.fn());

    const TestingComponent: FunctionComponent = () => {
      const { signOut } = useAuth() ?? { signOut: null };

      if (signOut) {
        signOut();
      }

      return <div data-testid="is-user-output">Test</div>;
    };

    render(<AuthProvider><TestingComponent /></AuthProvider>);

    expect(signOut).toHaveBeenCalled();
  });

  it("Expect reset password to be called", () => {
    const resetPassword = jest.spyOn(authService, "resetPassword").mockImplementation(jest.fn());

    const email = faker.internet.email();

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


  it("Expect update email to be called", () => {
    const updateEmail = jest.spyOn(authService, "updateEmail").mockImplementation(jest.fn());

    const email = faker.internet.email();

    const TestingComponent: FunctionComponent = () => {
      const { updateEmail } = useAuth() ?? { updateEmail: null };

      if (updateEmail) {
        updateEmail(email);
      }

      return <div data-testid="is-user-output">Test</div>;
    };

    render(<AuthProvider><TestingComponent /></AuthProvider>);

    expect(updateEmail).toHaveBeenCalledWith(email);
  });

  it("Expect update password to be called", () => {
    const updatePassword = jest.spyOn(authService, "updatePassword").mockImplementation(jest.fn());

    const password = faker.internet.password();

    const TestingComponent: FunctionComponent = () => {
      const { updatePassword } = useAuth() ?? { updatePassword: null };

      if (updatePassword) {
        updatePassword(password);
      }

      return <div data-testid="is-user-output">Test</div>;
    };

    render(<AuthProvider><TestingComponent /></AuthProvider>);

    expect(updatePassword).toHaveBeenCalledWith(password);
  });
});
