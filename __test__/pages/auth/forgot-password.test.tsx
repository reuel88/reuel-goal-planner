import { render, fireEvent, act } from "@testing-library/react";
import ForgotPassword from "@pages/auth/forgot-password";

const authPackage = require("@contexts/AuthContext"); // to prevent error

const faker = require("faker");

jest.mock("@contexts/AuthContext", () => ({
  useAuth: jest.fn()
}));

// jest.mock("@contexts/AuthContext", jest.fn());

interface ControlledPromiseInterface {
  deferred: {
    resolve: () => void,
    reject: () => void,
  },
  promise: Promise<any>
}

const getControlledPromise = (): ControlledPromiseInterface => {
  let deferred;

  const promise = new Promise((resolve, reject) => {
    deferred = { resolve, reject };
  });

  if (!deferred) return {
    deferred: ((msg) => {
      console.log(msg);

      return {
        resolve: () => {
        },
        reject: () => {
        }
      };
    })("Failed resolve deferred"), promise
  };

  return { deferred, promise };
};

describe("Forgot Password", () => {

  it("Expect to Forgot Password Page", () => {
    authPackage.useAuth.mockImplementation(() => ({
      resetPassword: jest.fn()
    }));

    const { getByRole } = render(<ForgotPassword />);

    expect(getByRole("heading", {}, { name: /Reset Password/i })).toBeInTheDocument();
  });

  it("Expect to render error", () => {
    authPackage.useAuth.mockImplementation(() => ({
      resetPassword: jest.fn()
    }));

    const { getByRole } = render(<ForgotPassword />);

    const resetPasswordBtn = getByRole("button", {}, { name: /Reset Password/i });
    fireEvent.click(resetPasswordBtn);

    const errorAlert = getByRole("alert");
    expect(errorAlert).toBeInTheDocument();
  });

  it("Button is disabled when loading and success message should appear", async () => {
    expect.assertions(4);

    const { deferred, promise } = getControlledPromise();
    const email = faker.internet.email();

    authPackage.useAuth.mockImplementation(() => ({
      resetPassword: () => promise
    }));

    const { getByLabelText, getByRole } = render(<ForgotPassword />);

    const emailInput = getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: email } });
    expect(emailInput).toHaveValue(email);

    let resetPasswordBtn = getByRole("button", {}, { name: /Reset Password/i });
    fireEvent.click(resetPasswordBtn);

    resetPasswordBtn = getByRole("button", {}, { name: /Reset Password/i });
    expect(resetPasswordBtn).toHaveAttribute("disabled");

    setTimeout(() => deferred.resolve(), 1000);

    await act(() => promise);
    const successAlert = getByRole("alert");
    expect(successAlert).toHaveTextContent("Check your inbox for further instructions");

    resetPasswordBtn = getByRole("button", {}, { name: /Reset Password/i });
    expect(resetPasswordBtn).not.toHaveAttribute("disabled");
  });

  it("Button is disabled when loading and alert message should appear", async () => {
    expect.assertions(3);

    const { deferred, promise } = getControlledPromise();
    const email = faker.internet.email();

    authPackage.useAuth.mockImplementation(() => ({
      resetPassword: () => promise
    }));

    const { getByLabelText, getByRole } = render(<ForgotPassword />);

    const emailInput = getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: email } });
    expect(emailInput).toHaveValue(email);

    let resetPasswordBtn = getByRole("button", {}, { name: /Reset Password/i });
    fireEvent.click(resetPasswordBtn);

    resetPasswordBtn = getByRole("button", {}, { name: /Reset Password/i });
    expect(resetPasswordBtn).toHaveAttribute("disabled");

    setTimeout(() => deferred.reject(), 1000);

    try {
      await act(() => promise);
    } catch (e) {
      const successAlert = getByRole("alert");
      expect(successAlert).toHaveTextContent("Failed to Reset Password");
    }
  });

  it("Expect no reset password to render", () => {
    authPackage.useAuth.mockImplementation(() => ({}));

    const { getByTestId } = render(<ForgotPassword />);

    const noResetPassword = getByTestId("no-reset-password");

    expect(noResetPassword).toBeInTheDocument();
  });

});