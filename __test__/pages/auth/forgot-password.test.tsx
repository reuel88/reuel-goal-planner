import { act, fireEvent, render } from "@testing-library/react";
import { getControlledPromise } from "../../testUtils/ControlledPromise";
import ForgotPassword from "@pages/auth/forgot-password";

const authPackage = require("@contexts/AuthContext"); // to prevent error

const faker = require("faker");

jest.mock("@contexts/AuthContext", () => ({
  useAuth: jest.fn()
}));

describe("Forgot Password", () => {

  it("Expect to be Forgot Password Page", () => {
    authPackage.useAuth.mockImplementation(() => ({
      resetPassword: jest.fn()
    }));

    const { getByRole } = render(<ForgotPassword />);

    expect(getByRole("heading", {}, { name: /Reset Password/i })).toBeInTheDocument();
  });

  it("Expect to render error alert", () => {
    authPackage.useAuth.mockImplementation(() => ({
      resetPassword: jest.fn()
    }));

    const { getByRole, getByTestId } = render(<ForgotPassword />);

    const resetPasswordBtn = getByTestId("submit-reset-password-btn");
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

    const { getByLabelText, getByRole, getByTestId } = render(<ForgotPassword />);

    const emailInput = getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: email } });
    expect(emailInput).toHaveValue(email);

    let resetPasswordBtn = getByTestId("submit-reset-password-btn");
    fireEvent.click(resetPasswordBtn);

    resetPasswordBtn = getByTestId("submit-reset-password-btn");
    expect(resetPasswordBtn).toHaveAttribute("disabled");

    setTimeout(() => deferred.resolve(), 1000);

    await act(() => promise);
    const successAlert = getByRole("alert");
    expect(successAlert).toHaveTextContent("Check your inbox for further instructions");

    resetPasswordBtn = getByTestId("submit-reset-password-btn");
    expect(resetPasswordBtn).toHaveAttribute("disabled", "false");
  });

  it("Button is disabled when loading and alert message should appear", async () => {
    expect.assertions(3);

    const { deferred, promise } = getControlledPromise();
    const email = faker.internet.email();

    authPackage.useAuth.mockImplementation(() => ({
      resetPassword: () => promise
    }));

    const { getByLabelText, getByRole,getByTestId } = render(<ForgotPassword />);

    const emailInput = getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: email } });
    expect(emailInput).toHaveValue(email);

    let resetPasswordBtn = getByTestId("submit-reset-password-btn");
    fireEvent.click(resetPasswordBtn);

    resetPasswordBtn = getByTestId("submit-reset-password-btn");
    expect(resetPasswordBtn).toHaveAttribute("disabled");

    setTimeout(() => deferred.reject(), 1000);

    try {
      await act(() => promise);
    } catch (e) {
      const errorAlert = getByRole("alert");
      expect(errorAlert).toHaveTextContent("Failed to Reset Password");
    }
  });

  it("Expect no reset password to render", () => {
    authPackage.useAuth.mockImplementation(() => ({}));

    const { getByTestId } = render(<ForgotPassword />);

    const noResetPassword = getByTestId("no-reset-password");

    expect(noResetPassword).toBeInTheDocument();
  });

});