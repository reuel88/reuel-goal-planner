import { withPublic, withProtected } from "@hooks/route";
import { render, screen } from "@testing-library/react";
import { FunctionComponent } from "react";
import { useRouter } from "next/router";
import { AuthProvider } from "@contexts/AuthContext";
import authService from "@services/authService";

const faker = require("faker");

jest.mock('next/router');

jest.mock("@services/authService", () => ({
    authListener: jest.fn().mockImplementation(callback => callback(null))
  })
);

describe("useAuthRouter", () => {

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      replace: () => {}
    });
  })

  it("Expect route to render public component", () => {

    const lorem = faker.lorem.sentences();

    const PublicComponent: FunctionComponent = () => {
      return <div data-testid="public">{lorem}</div>;
    };

    const WithPublic = withPublic(PublicComponent)

    render(<AuthProvider><WithPublic /></AuthProvider>);

    const publicElement = screen.getByTestId("public");

    expect(publicElement).toHaveTextContent(lorem);

  });

  it("Expect route to render unprotected component", () => {
    const lorem = faker.lorem.sentences();

    const Unprotected: FunctionComponent = () => {
      return <div data-testid="unprotected">{lorem}</div>;
    };

    const WithProtected = withProtected(Unprotected)

    render(<AuthProvider><WithProtected/></AuthProvider>);

    const noRedirectElement = screen.getByTestId("no-redirect");

    expect(noRedirectElement).toBeInTheDocument();
  });

  it("Expect route to render not public component", () => {
    jest.spyOn(authService, "authListener").mockImplementation((callback: any) => callback({
      uid: "r",
      email: "t"
    }));

    const lorem = faker.lorem.sentences();

    const NotPublicComponent: FunctionComponent = () => {
      return <div data-testid="not-public">{lorem}</div>;
    };

    const WithPublic = withPublic(NotPublicComponent)

    render(<AuthProvider><WithPublic /></AuthProvider>);

    const noRedirectElement = screen.getByTestId("no-redirect");

    expect(noRedirectElement).toBeInTheDocument();

  });

  it("Expect route to render protected component", () => {
    jest.spyOn(authService, "authListener").mockImplementation((callback: any) => callback({
      uid: "r",
      email: "t"
    }));

    const lorem = faker.lorem.sentences();

    const Protected: FunctionComponent = () => {
      return <div data-testid="protected">{lorem}</div>;
    };

    const WithProtected = withProtected(Protected)

    render(<AuthProvider><WithProtected/></AuthProvider>);

    const ProtectedElement = screen.getByTestId("protected");

    expect(ProtectedElement).toHaveTextContent(lorem);
  });

});