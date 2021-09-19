import Link from "next/link";
import React, { FunctionComponent } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import routes from "@constants/routes.json";
import { useAuth } from "@contexts/AuthContext";


const PageHeader: FunctionComponent = () => {
  const { currentUser } = useAuth() ?? { currentUser: null };

  return (
    <Navbar as="header" className="bg-light bg-gradient">
      <Container>
        <div className="d-flex gap-2 w-100">
          <div className="flex-grow-1">
            <Link href={routes.DASHBOARD} passHref>
              <Navbar.Brand>Goal Planner</Navbar.Brand>
            </Link>
          </div>
          <Nav as="nav" className="d-flex gap-2">
            <Link href={`${routes.DRIVE}/`} passHref>
              <Nav.Link>Drive</Nav.Link>
            </Link>
            <Link href={`${routes.PROFILE}/${currentUser?.uid}`} passHref>
              <Nav.Link>Profile</Nav.Link>
            </Link>
          </Nav>
        </div>
      </Container>

    </Navbar>
  );
};

export default PageHeader;