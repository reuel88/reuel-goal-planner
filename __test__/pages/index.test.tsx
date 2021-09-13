import { render, screen } from "@testing-library/react";
import Home from "@pages/index";

jest.mock("next-intl", () => ({
  useTranslations: jest.fn(() => (key: any) => key)
}));

describe("Home", () => {

  test("Renders a heading", async () => {
    render(<Home />);

    const heading = screen.getByRole("heading", {
      name: /welcome to next\.js!/i
    });

    expect(heading).toBeInTheDocument();
  });
});