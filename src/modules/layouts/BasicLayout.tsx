import { FunctionComponent } from "react";
import Navbar from "./Navbar";

const BasicLayout: FunctionComponent = ({ children }) => {

  return (
    <div className="bg-gray-100 dark:bg-gray-900 dark:text-gray-100 h-screen">
      <Navbar />

      {children}
    </div>
  );
};

export default BasicLayout;