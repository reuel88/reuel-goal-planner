import React, { FunctionComponent } from "react";
import Link from "next/link";
import route from "../../constants/route.json";
import { useAuth } from "../../contexts/AuthContext";

const Navbar: FunctionComponent = () => {
    const {currentUser} = useAuth();

    return (
        <nav>
            <h1>
                <Link href={route.DASHBOARD}>
                    <a>Drive</a>
                </Link>
            </h1>

            <Link href={`${route.USER}/${currentUser?.uid}`}>
                <a>Profile</a>
            </Link>
        </nav>
    );
}

export default Navbar;