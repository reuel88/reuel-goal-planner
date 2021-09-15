import { withProtected, withPublic } from "@hooks/useAuthRouter";
import { render, screen } from "@testing-library/react";
import { FunctionComponent } from "react";
import { useRouter } from "next/router";
import { AuthProvider } from "@contexts/AuthContext.legacy";
import authClientService from "@services/authClientService";

const faker = require("faker");

jest.mock("next/router");

jest.mock("@services/authClientService", () => ({
    authStateChanged: jest.fn().mockImplementation(callback => callback(null)),
    idTokenChanged: jest.fn()
  })
);

describe("useAuthRouter", () => {

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      replace: jest.fn()
    });

  });

  it("Expect routes to render public component", () => {

    const lorem = faker.lorem.sentences();

    const PublicComponent: FunctionComponent = () => {
      return <div data-testid="public">{lorem}</div>;
    };

    const WithPublic = withPublic(PublicComponent);

    render(<AuthProvider><WithPublic /></AuthProvider>);

    const publicElement = screen.getByTestId("public");

    expect(publicElement).toHaveTextContent(lorem);

  });

  it("Expect routes to render unprotected component", () => {
    const lorem = faker.lorem.sentences();

    const Unprotected: FunctionComponent = () => {
      return <div data-testid="unprotected">{lorem}</div>;
    };

    const WithProtected = withProtected(Unprotected);

    render(<AuthProvider><WithProtected /></AuthProvider>);

    const noRedirectElement = screen.getByTestId("no-redirect");

    expect(noRedirectElement).toBeInTheDocument();
  });

  it("Expect routes to render not public component", () => {

    jest.spyOn(authClientService, "authStateChanged").mockImplementation((callback: any) => callback({
      uid: "r",
      email: "t"
    }));

    const lorem = faker.lorem.sentences();

    const NotPublicComponent: FunctionComponent = () => {
      return <div data-testid="not-public">{lorem}</div>;
    };

    const WithPublic = withPublic(NotPublicComponent);

    render(<AuthProvider><WithPublic /></AuthProvider>);

    const noRedirectElement = screen.getByTestId("no-redirect");

    expect(noRedirectElement).toBeInTheDocument();

  });

  it("Expect routes to render protected component", () => {
    jest.spyOn(authClientService, "authStateChanged").mockImplementation((callback: any) => callback({
      uid: "r",
      email: "t"
    }));

    const lorem = faker.lorem.sentences();

    const Protected: FunctionComponent = () => {
      return <div data-testid="protected">{lorem}</div>;
    };

    const WithProtected = withProtected(Protected);

    render(<AuthProvider><WithProtected /></AuthProvider>);

    const ProtectedElement = screen.getByTestId("protected");

    expect(ProtectedElement).toHaveTextContent(lorem);
  });
});