import { act, fireEvent, queryByAttribute, render, waitFor } from "@testing-library/react";
import Uid from "@pages/profile/[uid]";
import { getControlledPromise } from "../../testUtils/ControlledPromise";
import { useRouter } from "next/router";

const authPackage = require("@contexts/AuthContext"); // to prevent error

const faker = require("faker");

jest.mock("next/router", () => ({
  useRouter: jest.fn()
}));

jest.mock("@contexts/AuthContext", () => ({
  useAuth: jest.fn()
}));

describe("uid", () => {
  it("Expect to be Uid Page", () => {
    const uuid = faker.datatype.uuid();
    const email = faker.internet.email();

    authPackage.useAuth.mockImplementation(() => ({
      currentUser: { uid: uuid, email: email },
      updateEmail: jest.fn(),
      updatePassword: jest.fn()
    }));

    const { getByRole } = render(<Uid />);

    expect(getByRole("heading", {}, { name: /Update Profile/i })).toBeInTheDocument();
  });

  it("Expect to render error alert", () => {
    const uuid = faker.datatype.uuid();
    const email = faker.internet.email();

    authPackage.useAuth.mockImplementation(() => ({
      currentUser: { uid: uuid, email: email },
      updateEmail: jest.fn(),
      updatePassword: jest.fn()
    }));

    const { getByLabelText, getByRole, getByTestId } = render(<Uid />);

    const emailInput = getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: "" } });
    expect(emailInput).toHaveValue("");

    const updateBtn = getByTestId("submit-update-btn");
    fireEvent.click(updateBtn);

    const errorAlert = getByRole("alert");
    expect(errorAlert).toBeInTheDocument();
  });

  it("Testing update email", async () => {
    expect.assertions(3);

    const { deferred, promise } = getControlledPromise();
    const uuid = faker.datatype.uuid();
    const email = faker.internet.email();
    const newEmail = faker.internet.email();

    const push = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({ push }));

    authPackage.useAuth.mockImplementation(() => ({
      currentUser: { uid: uuid, email: email },
      updateEmail: () => promise,
      updatePassword: jest.fn()
    }));

    const { getByLabelText, getByTestId } = render(<Uid />);

    const emailInput = getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: newEmail } });
    expect(emailInput).toHaveValue(newEmail);

    let updateBtn = getByTestId("submit-update-btn");
    fireEvent.click(updateBtn);

    updateBtn = getByTestId("submit-update-btn");
    expect(updateBtn).toHaveAttribute("disabled");

    setTimeout(() => deferred.resolve(), 1000);

    await act(() => promise);
    expect(push).toHaveBeenCalled();
  });

  it("Testing update password", async () => {
    expect.assertions(4);

    const { deferred, promise } = getControlledPromise();
    const uuid = faker.datatype.uuid();
    const email = faker.internet.email();
    const newPassword = faker.internet.password();

    const push = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({ push }));

    authPackage.useAuth.mockImplementation(() => ({
      currentUser: { uid: uuid, email: email },
      updateEmail: jest.fn(),
      updatePassword: () => promise
    }));

    const getById = queryByAttribute.bind(null, "id");

    const dom = render(<Uid />);

    const passwordInput: HTMLElement | null = getById(dom.container, "password");
    if (!passwordInput) return;
    fireEvent.change(passwordInput, { target: { value: newPassword } });
    expect(passwordInput).toHaveValue(newPassword);

    const verifyPasswordInput: HTMLElement | null = getById(dom.container, "verify-password");
    if (!verifyPasswordInput) return;
    fireEvent.change(verifyPasswordInput, { target: { value: newPassword } });
    expect(verifyPasswordInput).toHaveValue(newPassword);

    let updateBtn = dom.getByTestId("submit-update-btn");
    fireEvent.click(updateBtn);

    updateBtn = dom.getByTestId("submit-update-btn");
    expect(updateBtn).toHaveAttribute("disabled");

    setTimeout(() => deferred.resolve(), 1000);

    await act(() => promise);
    expect(push).toHaveBeenCalled();
  });

  it("Testing fail update email", async () => {
    expect.assertions(4);

    const { deferred, promise } = getControlledPromise();
    const uuid = faker.datatype.uuid();
    const email = faker.internet.email();
    const newEmail = faker.internet.email();

    const push = jest.fn();
    (useRouter as jest.Mock).mockImplementation(() => ({ push }));

    authPackage.useAuth.mockImplementation(() => ({
      currentUser: { uid: uuid, email: email },
      updateEmail: () => promise,
      updatePassword: jest.fn()
    }));

    const { getByLabelText, getByRole, getByTestId } = render(<Uid />);

    const emailInput = getByLabelText(/email/i);
    fireEvent.change(emailInput, { target: { value: newEmail } });
    expect(emailInput).toHaveValue(newEmail);

    let updateBtn = getByTestId("submit-update-btn");
    fireEvent.click(updateBtn);

    updateBtn = getByTestId("submit-update-btn");
    expect(updateBtn).toHaveAttribute("disabled");

    setTimeout(() => deferred.reject(), 1000);

    try {
      await act(() => waitFor(() => promise)); // because i have a promise.all
    } catch (e) {
      const errorAlert = getByRole("alert");
      expect(errorAlert).toHaveTextContent("Failed to Update");

      updateBtn = getByTestId("submit-update-btn");
      expect(updateBtn).toHaveAttribute("disabled", "false" );
    }
  });

  it("Expect no auth in to render", () => {
    const uuid = faker.datatype.uuid();
    const email = faker.internet.email();

    authPackage.useAuth.mockImplementation(() => ({
      currentUser: { uid: uuid, email: email }
    }));

    const { getByTestId } = render(<Uid />);

    const noAuth = getByTestId("no-auth");

    expect(noAuth).toBeInTheDocument();
  });
});