import Link from "next/link";
import React, { FunctionComponent } from "react";
import routes from "@constants/routes.json";
import { useAuth } from "@contexts/AuthContext";
import { RotButton, RotPageHeader } from "../../web-components/components";

const Navbar: FunctionComponent = () => {
  const { currentUser } = useAuth() ?? { currentUser: null };

  return (
    <RotPageHeader>
      <Link href={routes.ROOT} passHref>
        <RotButton as="a" href={routes.ROOT} className="flex-grow">Goal Planner</RotButton>
      </Link>

      <Link href={`${routes.DRIVE}/`} passHref>
        <RotButton as="a" href={`${routes.DRIVE}/`} variant="link">Drive</RotButton>
      </Link>
      <Link href={`${routes.PROFILE}/${currentUser?.uid}`} passHref>
        <RotButton as="a" href={`${routes.PROFILE}/${currentUser?.uid}`} variant="link">Profile</RotButton>
      </Link>
    </RotPageHeader>
  );
};

export default Navbar;