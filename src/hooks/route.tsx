import { useRouter } from "next/router";
import React, { FunctionComponent, useEffect } from "react";
import route from "../constants/route.json";
import { useAuth } from "../contexts/AuthContext";


function Redirect({to}: { to: string }) {
    const router = useRouter();

    useEffect(() => {
        router.replace(to).then((res) => {
            console.log(res);
        });
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