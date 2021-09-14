import React from "react";
const ReactTestRenderer = require('react-test-renderer');
import Home from "@pages/index";

it("renders homepage unchanged", () => {
  const tree = ReactTestRenderer.create(<Home />).toJSON();
  expect(tree).toMatchSnapshot();
});