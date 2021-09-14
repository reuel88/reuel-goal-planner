import { render, fireEvent, act } from "@testing-library/react";
import { useRouter } from "next/router";
import { getControlledPromise } from "../../testUtils/ControlledPromise";
import Login from "@pages/auth/login";

const authPackage = require("@contexts/AuthContext"); // to prevent error

const faker = require("faker");

jest.mock("next/router", () => ({
  useRouter: jest.fn()
}));

jest.mock("@contexts/AuthContext", () => ({
  useAuth: jest.fn()
}));

describe("Login", () => {

  it("Expect to be Login Page", () => {
    authPackage.useAuth.mockImplementation(() => ({
      signIn: jest.fn()
    }));

    const { getByRole } = render(<Login />);

    expect(getByRole("heading", {}, { name: /Login/i })).toBeInTheDocument();
  });

  it("Expect to render error alert", () => {
    authPackage.useAuth.mockImplementation(() => ({
      signIn: jest.fn()
    }));

    const { getByRole } = render(<Login />);

    const loginBtn = getByRole("button", {}, { name: /Login/i });
    fireEvent.click(loginBtn);

    const errorAlert = getByRole("alert");
    expect(errorAlert).toBeInTheDocument();
  });

  it("Button is disabled when loading and redirect", async () => {
    expect.assertions(4);

    const { deferred, promise } = getControlledPromise();
    const email = faker.internet.email();
    const password = faker.internet.password();

    const push = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({ push }));

    authPackage.useAuth.mockImplementation(() => ({
      signIn: () => promise
    }));

    const { getByLabelText, getByRole } = render(<Login />);

    const emailInput = getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: email } });
    expect(emailInput).toHaveValue(email);

    const passwordInput = getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: password } });
    expect(passwordInput).toHaveValue(password);

    let loginBtn = getByRole("button", {}, { name: /Login/i });
    fireEvent.click(loginBtn);

    loginBtn = getByRole("button", {}, { name: /Login/i });
    expect(loginBtn).toHaveAttribute("disabled");

    setTimeout(() => deferred.resolve(), 1000);

    await act(() => promise);

    expect(push).toHaveBeenCalled();
  });

  it("Button is disabled when loading and alert message should appear", async () => {
    expect.assertions(5);

    const { deferred, promise } = getControlledPromise();
    const email = faker.internet.email();
    const password = faker.internet.password();

    authPackage.useAuth.mockImplementation(() => ({
      signIn: () => promise
    }));

    const { getByLabelText, getByRole } = render(<Login />);

    const emailInput = getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: email } });
    expect(emailInput).toHaveValue(email);

    const passwordInput = getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: password } });
    expect(passwordInput).toHaveValue(password);

    let loginBtn = getByRole("button", {}, { name: /Login/i });
    fireEvent.click(loginBtn);

    loginBtn = getByRole("button", {}, { name: /Login/i });
    expect(loginBtn).toHaveAttribute("disabled");

    setTimeout(() => deferred.reject(), 1000);

    try {
      await act(() => promise);
    } catch (e) {
      const errorAlert = getByRole("alert");
      expect(errorAlert).toHaveTextContent("Failed to login");

      loginBtn = getByRole("button", {}, { name: /Login/i });
      expect(loginBtn).not.toHaveAttribute("disabled");
    }
  });

  it("Expect no sign in to render", () => {
    authPackage.useAuth.mockImplementation(() => ({}));

    const { getByTestId } = render(<Login />);

    const noSignIn = getByTestId("no-sign-in");

    expect(noSignIn).toBeInTheDocument();
  });
});