import { useRouter } from "next/router";
import { act, fireEvent, render } from "@testing-library/react";
import Profile from "@pages/profile";
import { getControlledPromise } from "../../testUtils/ControlledPromise";

const authPackage = require("@contexts/AuthContext"); // to prevent error

const faker = require("faker");

jest.mock("reuel-component-library/loader", () => ({
  defineCustomElements: jest.fn()
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn()
}));

jest.mock("@contexts/AuthContext", () => ({
  useAuth: jest.fn()
}));

describe("Profile", () => {

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      replace: jest.fn()
    });
  });

  it("Expect to be Profile Page", () => {
    const uuid = faker.datatype.uuid();
    const email = faker.internet.email();

    authPackage.useAuth.mockImplementation(() => ({
      currentUser: { uid: uuid, email: email },
      signOut: jest.fn()
    }));

    const { getByRole } = render(<Profile />);

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

    const { getByRole } = render(<Profile />);

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

    const { getByRole } = render(<Profile />);

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
      currentUser: { uid: uuid, email: email }
    }));

    const { getByTestId } = render(<Profile />);

    const noAuth = getByTestId("no-auth");

    expect(noAuth).toBeInTheDocument();
  });

});