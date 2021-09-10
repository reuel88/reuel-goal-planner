/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import Home from "@pages/index";

describe("Home", () => {

  it("It should render Welcome", async () => {
    render(<Home/>)

    const heading = screen.getByText(/Welcome to/i);

    expect(heading).toBeInTheDocument();
  });
});