import Home from "@pages/index";

const renderer = require("react-test-renderer");

it('renders homepage unchanged', () => {
  const tree = renderer.create(<Home />).toJSON()
  expect(tree).toMatchSnapshot()
})