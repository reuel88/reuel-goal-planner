import { FunctionComponent } from "react";
import Navbar from "./Navbar";

const BasicLayout: FunctionComponent = ({children}) => {

    return (
        <>
            <Navbar />

            <hr/>

            {children}
        </>
    )
}

export default BasicLayout;