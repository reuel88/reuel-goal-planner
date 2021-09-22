import { FunctionComponent } from "react";
import PageHeader from "./PageHeader";

const BasicLayout: FunctionComponent = ({ children }) => {

  return (
    <div className="bg-light min-vh-100 pb-4">
      <PageHeader />

      {children}
    </div>
  );
};

export default BasicLayout;