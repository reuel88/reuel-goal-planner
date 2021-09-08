import type { NextPage } from 'next';
import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { withProtected } from "../../hooks/route";
import { useAuth } from "../../contexts/AuthContext";
import route from "../../constants/route.json";
import { NextSeo } from "next-seo";

const Dashboard: NextPage = () => {
    const router = useRouter();
    const [error, setError] = useState('');

    const {currentUser, signOut} = useAuth();

    async function handleLogout(e: React.SyntheticEvent) {
        e.preventDefault();

        try {
            setError('');
            await signOut();
            await router.push(route.LOGIN);
        } catch (e) {
            setError('Failed to logout');
            console.error(e);
        }
    }

    return (
        <>
            <NextSeo
                title="Goal Planner - Dashboard"
            />

            <section>
                <header className="section-header">
                    <h2>Profile</h2>
                </header>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="section-content">
                    <p>
                        <strong>
                            Email:
                        </strong>
                        {currentUser?.email}
                    </p>

                    <Link href={`${route.USER}/${currentUser?.uid}`}>
                        <a>
                            Update Profile
                        </a>
                    </Link>
                </div>
            </section>
            <div>
                <button type="button" onClick={handleLogout}>Log out</button>
            </div>
        </>
    );
}

export default withProtected(Dashboard);