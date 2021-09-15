import { useRouter } from "next/router";
import React, { FunctionComponent, useEffect } from "react";
import routes from "@constants/routes.json";
import { useAuth } from "@contexts/AuthContext.legacy";

function Redirect({ to }: { to: string }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(to);
  }, [to, router]);

  return <div data-testid="no-redirect" />;
}


export function withPublic(Component: FunctionComponent) {
  return function WithPublic(props: any) {
    const { currentUser } = useAuth() ?? { currentUser: null };

    if (currentUser) return <Redirect to={routes.DASHBOARD} />; // Not public

    return <Component {...props} />; // Public
  };
}


export function withProtected(Component: FunctionComponent) {
  return function WithProtected(props: any) {
    const { currentUser } = useAuth() ?? { currentUser: null };

    if (!currentUser) return <Redirect to={routes.LOGIN} />; // Unprotected

    return <Component {...props} />; // Protected
  };
}