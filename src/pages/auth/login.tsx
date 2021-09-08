import type { NextPage } from 'next';
import Link from "next/link";
import { useRouter } from "next/router";
import { NextSeo } from 'next-seo';
import React, { useRef, useState } from "react";
import validate from "validate.js";
import { withPublic } from "../../hooks/route";
import { useAuth } from "../../contexts/AuthContext";
import route from "../../constants/route.json";

const Login: NextPage = () => {
    const router = useRouter();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const {signIn} = useAuth();

    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        const email = emailRef?.current?.value ?? '';
        const password = passwordRef?.current?.value ?? '';

        const notValid = validate({
            email, password,
        }, {
            email: {presence: {allowEmpty: false}},
            password: {presence: {allowEmpty: false}},
        })

        if (notValid) {
            const firstKey = Object.keys(notValid)[0];
            const firstError = notValid[firstKey][0];
            return setError(firstError);
        }

        try {
            setError('');
            setLoading(true);
            await signIn(email, password)

            return await router.push(route.DASHBOARD);
        } catch (e) {
            setError('Failed to login');
            console.error(e);
        }

        setLoading(false)
    }

    return (
        <>
            <NextSeo
                title="Goal Planner - Login"
            />

            <section>
                <header className="section-header">
                    <h2>Login</h2>
                </header>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="section-content">
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" ref={emailRef} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" ref={passwordRef} />
                        </div>
                    </div>
                    <footer className="section-footer">
                        <button type="submit" disabled={loading}>Login</button>
                    </footer>
                </form>
            </section>
            <div>
                <Link href={route.FORGOT_PASSWORD}>
                    <a>
                        Forgot Password
                    </a>
                </Link>
            </div>

            <div>
                Need a account?
                <Link href={route.REGISTER}>
                    <a>
                        Create Account
                    </a>
                </Link>
            </div>
        </>
    )
}

export default withPublic(Login);
