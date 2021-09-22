import { act, fireEvent, queryByAttribute, render } from "@testing-library/react";
import { getControlledPromise } from "../../testUtils/ControlledPromise";
import Register from "@pages/auth/register";
import { useRouter } from "next/router";

const authPackage = require("@contexts/AuthContext"); // to prevent error

const faker = require("faker");

jest.mock("next/router", () => ({
  useRouter: jest.fn()
}));

jest.mock("@contexts/AuthContext", () => ({
  useAuth: jest.fn()
}));

describe("Register", () => {
  it("Expect to be Register Page", () => {
    authPackage.useAuth.mockImplementation(() => ({
      signUp: jest.fn()
    }));

    const { getByRole } = render(<Register />);

    expect(getByRole("heading", { name: /Sign Up/i })).toBeInTheDocument();
  });

  it("Expect to render error alert", () => {
    authPackage.useAuth.mockImplementation(() => ({
      signUp: jest.fn()
    }));

    const { getByRole } = render(<Register />);

    const signUpBtn = getByRole("button", {}, { name: /Sign Up/i });
    fireEvent.click(signUpBtn);

    const errorAlert = getByRole("alert");
    expect(errorAlert).toBeInTheDocument();
  });

  it("Button is disabled when loading and redirect", async () => {
    expect.assertions(5); // Test to make sure all assertions are made

    const { deferred, promise } = getControlledPromise();
    const email = faker.internet.email();
    const password = faker.internet.password();

    const push = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({ push }));

    authPackage.useAuth.mockImplementation(() => ({
      signUp: () => promise
    }));

    const getById = queryByAttribute.bind(null, "id");

    const dom = render(<Register />);

    const emailInput: HTMLElement | null = getById(dom.container, "email");
    if (!emailInput) return;
    fireEvent.change(emailInput, { target: { value: email } });
    expect(emailInput).toHaveValue(email);

    const passwordInput: HTMLElement | null = getById(dom.container, "password");
    if (!passwordInput) return;
    fireEvent.change(passwordInput, { target: { value: password } });
    expect(passwordInput).toHaveValue(password);

    const verifyPasswordInput: HTMLElement | null = getById(dom.container, "verify-password");
    if (!verifyPasswordInput) return;
    fireEvent.change(verifyPasswordInput, { target: { value: password } });
    expect(verifyPasswordInput).toHaveValue(password);

    let signUpBtn = dom.getByRole("button", {}, { name: /Sign Up/i });
    fireEvent.click(signUpBtn);

    signUpBtn = dom.getByRole("button", {}, { name: /Sign Up/i });
    expect(signUpBtn).toHaveAttribute("disabled");

    setTimeout(() => deferred.resolve(), 1000);

    await act(() => promise);

    expect(push).toHaveBeenCalled();
  });

  it("Button is disabled when loading and alert message should appear", async () => {
    expect.assertions(6); // Test to make sure all assertions are made

    const { deferred, promise } = getControlledPromise();
    const email = faker.internet.email();
    const password = faker.internet.password();

    authPackage.useAuth.mockImplementation(() => ({
      signUp: () => promise
    }));

    const getById = queryByAttribute.bind(null, "id");

    const dom = render(<Register />);

    const emailInput: HTMLElement | null = getById(dom.container, "email");
    if (!emailInput) return;
    fireEvent.change(emailInput, { target: { value: email } });
    expect(emailInput).toHaveValue(email);

    const passwordInput: HTMLElement | null = getById(dom.container, "password");
    if (!passwordInput) return;
    fireEvent.change(passwordInput, { target: { value: password } });
    expect(passwordInput).toHaveValue(password);

    const verifyPasswordInput: HTMLElement | null = getById(dom.container, "verify-password");
    if (!verifyPasswordInput) return;
    fireEvent.change(verifyPasswordInput, { target: { value: password } });
    expect(verifyPasswordInput).toHaveValue(password);

    let signUpBtn = dom.getByRole("button", {}, { name: /Sign Up/i });
    fireEvent.click(signUpBtn);

    signUpBtn = dom.getByRole("button", {}, { name: /Sign Up/i });
    expect(signUpBtn).toHaveAttribute("disabled");

    setTimeout(() => deferred.reject(), 1000);

    try {
      await act(() => promise);
    } catch (e) {
      const errorAlert = dom.getByRole("alert");
      expect(errorAlert).toHaveTextContent("Failed to register");

      signUpBtn = dom.getByRole("button", {}, { name: /Sign Up/i });
      expect(signUpBtn).not.toHaveAttribute("disabled");
    }
  });

  it("Expect no sign in to render", () => {
    authPackage.useAuth.mockImplementation(() => ({}));

    const { getByTestId } = render(<Register />);

    const noSignIn = getByTestId("no-sign-up");

    expect(noSignIn).toBeInTheDocument();
  });
});