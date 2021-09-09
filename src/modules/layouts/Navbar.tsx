import Link from "next/link";
import React, { FunctionComponent } from "react";
import styled from "styled-components";
import route from "../../constants/route.json";
import { useAuth } from "../../contexts/AuthContext";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;

  > :first-child {
    flex-grow: 1;
  }
`;

const Navbar: FunctionComponent = () => {
    const {currentUser} = useAuth();

    return (
        <Nav>
            <h2>
                <Link href={route.DASHBOARD}>
                    <a>Goal Planner</a>
                </Link>
            </h2>

            <Link href={`${route.DRIVE}/`}>
                <a>Drive</a>
            </Link>
            <Link href={`${route.USER}/${currentUser?.uid}`}>
                <a>Profile</a>
            </Link>
        </Nav>
    );
}

export default Navbar;