import React, { FunctionComponent, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthContext";
import route from "../constants/route.json";

function Redirect({to}: { to: string }) {
    const router = useRouter();

    useEffect(() => {
        router.replace(to).then((bool) => console.trace(bool));
    }, [to, router])

    return null;
}

export function withPublic(Component: FunctionComponent) {
    return function WithPublic(props: any) {
        const {currentUser} = useAuth();

        if (currentUser) {
            return <Redirect to={route.DASHBOARD} />
        }

        return <Component {...props} />
    }
}

export function withProtected(Component: FunctionComponent) {
    return function WithProtected(props: any) {
        const {currentUser} = useAuth();

        if (!currentUser) {
            return <Redirect to={route.LOGIN} />;
        }

        return <Component {...props} />
    }
}