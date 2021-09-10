import { useRouter } from "next/router";
import React, { FunctionComponent, useEffect } from "react";
import route from "@constants/route.json";
import { useAuth } from "@contexts/AuthContext";

function Redirect({ to }: { to: string }) {
  const router = useRouter();

  useEffect( () => {
     router.replace(to);
  }, [to, router]);

  return <div data-testid="no-redirect"/>;
}

export function withPublic(Component: FunctionComponent) {
  return function WithPublic(props: any) {
    const { currentUser } = useAuth() ?? { currentUser: null };

    if (currentUser) {
      return <Redirect to={route.DASHBOARD} />; // Not public
    }

    return <Component {...props} />; // Public
  };
}

export function withProtected(Component: FunctionComponent) {
  return function WithProtected(props: any) {
    const { currentUser } = useAuth() ?? { currentUser: null };

    if (!currentUser) {
      return <Redirect to={route.LOGIN} />; // Unprotected
    }

    return <Component {...props} />; // Protected
  };
}