import { render, screen } from "@testing-library/react";
import Home from "@pages/index";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(() => (key: any) => key)
}));

jest.mock("@contexts/AuthContext", () => ({
  useAuth: jest.fn()
}));

describe("Home", () => {

  test("Renders a heading", async () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /welcome-title/i
    });

    expect(heading).toBeInTheDocument();
  });
});