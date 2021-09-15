// import '@testing-library/jest-dom' // imported by jest.setup.ts
import { AuthProvider, useAuth } from "@contexts/AuthContext.legacy";
import authService from "@services/authClientService";
import { render, screen } from "@testing-library/react";
import { FunctionComponent } from "react";

const faker = require("faker");

jest.mock("@services/authClientService", () => ({
    authStateChanged: jest.fn(),
    signUp: jest.fn(),
    signIn: jest.fn(),
    signOut: jest.fn(),
    resetPassword: jest.fn(),
    updateEmail: jest.fn(),
    updatePassword: jest.fn(),
    idTokenChanged: jest.fn()
  })
);


describe("AuthContext.legacy", () => {
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

  it("Expect profile to load", () => {
    const uuid = faker.datatype.uuid();
    const email = faker.internet.email();

    jest.spyOn(authService, "authStateChanged").mockImplementation((callback: any) => callback({
      uid: uuid,
      email: email
    }));

    const TestingComponent: FunctionComponent = () => {
      const { currentUser } = useAuth() ?? { currentUser: null };

      if (!currentUser) return <div data-testid="no-profile-output">No User</div>;

      return <div data-testid="is-profile-output">{currentUser?.uid} - {currentUser?.email}</div>;
    };

    render(<AuthProvider><TestingComponent /></AuthProvider>);

    const isUserOutput = screen.getByTestId("is-profile-output");

    expect(isUserOutput).toHaveTextContent(`${uuid} - ${email}`);
  });

});
