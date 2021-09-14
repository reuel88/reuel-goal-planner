import { useRouter } from "next/router";
import { act, fireEvent, render } from "@testing-library/react";
import Dashboard from "@pages/dashboard";
import { getControlledPromise } from "../../testUtils/ControlledPromise";


const authPackage = require("@contexts/AuthContext"); // to prevent error

const faker = require("faker");

jest.mock("next/router", () => ({
  useRouter: jest.fn()
}));

jest.mock("@contexts/AuthContext", () => ({
  useAuth: jest.fn()
}));

describe("Dashboard", () => {

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      replace: jest.fn()
    });
  });

  it("Expect to be Dashboard Page", () => {
    const uuid = faker.datatype.uuid();
    const email = faker.internet.email();

    authPackage.useAuth.mockImplementation(() => ({
      currentUser: { uid: uuid, email: email },
      signOut: jest.fn()
    }));

    const { getByRole } = render(<Dashboard />);

    expect(getByRole("heading", {}, { name: /Profile/i })).toBeInTheDocument();
  });

  it("Expect to logout when click button", async () => {

    const { deferred, promise } = getControlledPromise();
    const uuid = faker.datatype.uuid();
    const email = faker.internet.email();

    const push = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({ push }));

    authPackage.useAuth.mockImplementation(() => ({
      currentUser: { uid: uuid, email: email },
      signOut: () => promise
    }));

    const { getByRole } = render(<Dashboard />);

    const logoutBtn = getByRole("button", {}, { name: /Log out/i });
    fireEvent.click(logoutBtn);

    setTimeout(() => deferred.resolve(), 1000);

    await act(() => promise);
    expect(push).toHaveBeenCalled();
  });

  it("Expect to fail logout when click button", async () => {
    expect.assertions(1);

    const { deferred, promise } = getControlledPromise();
    const uuid = faker.datatype.uuid();
    const email = faker.internet.email();

    const push = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({ push }));

    authPackage.useAuth.mockImplementation(() => ({
      currentUser: { uid: uuid, email: email },
      signOut: () => promise
    }));

    const { getByRole } = render(<Dashboard />);

    const logoutBtn = getByRole("button", {}, { name: /Log out/i });
    fireEvent.click(logoutBtn);

    setTimeout(() => deferred.reject(), 1000);

    try {
      await act(() => promise);
    } catch (e) {
      const errorAlert = getByRole("alert");
      expect(errorAlert).toHaveTextContent("Failed to logout");
    }
  });

  it("Expect no auth in to render", () => {
    const uuid = faker.datatype.uuid();
    const email = faker.internet.email();

    authPackage.useAuth.mockImplementation(() => ({
      currentUser: { uid: uuid, email: email },
    }));

    const { getByTestId } = render(<Dashboard />);

    const noAuth = getByTestId("no-auth");

    expect(noAuth).toBeInTheDocument();
  });

});