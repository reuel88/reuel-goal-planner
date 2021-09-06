import type {NextPage} from 'next';
import React, {useRef, useState} from "react";
import validate from "validate.js";
import Link from "next/link";
import {useRouter} from "next/router";
import {withPublic} from "../../hooks/route";
import {useAuth} from "../../contexts/AuthContext";
import route from "../../constants/route.json";
import {NextSeo} from "next-seo";

const Register: NextPage = () => {
    const router = useRouter();
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const verifyPasswordRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const {signUp} = useAuth();

    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();

        const email = emailRef?.current?.value ?? '';
        const password = passwordRef?.current?.value ?? '';
        const verifyPassword = verifyPasswordRef?.current?.value ?? '';

        const notValid = validate({
            email, password, verifyPassword
        }, {
            email: {presence: {allowEmpty: false}},
            password: {presence: {allowEmpty: false}},
            verifyPassword: {
                presence: {allowEmpty: false},
                equality: "password"
            },
        })

        if (notValid) {
            const firstKey = Object.keys(notValid)[0];
            const firstError = notValid[firstKey][0];
            return setError(firstError);
        }

        try {
            setError('');
            setLoading(true);
            await signUp(email, password);
            return await router.push(route.DASHBOARD);
        } catch (e) {
            setError('Failed to register');
            console.error(e);
        }

        setLoading(false)
    }

    return (
        <>
            <NextSeo
                title="Goal Planner - Register"
            />

            <section>
                <header className="section-header">
                    <h2>Sign Up</h2>
                </header>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="section-content">
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" ref={emailRef}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" ref={passwordRef}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="verify-password" className="form-label">Verify Password</label>
                            <input type="password" className="form-control" id="verify-password"
                                   ref={verifyPasswordRef}/>
                        </div>
                    </div>
                    <footer className="section-footer">
                        <button type="submit" disabled={loading}>Sign Up</button>
                    </footer>
                </form>
            </section>

            <div>
                Already have a account?
                <Link href={route.LOGIN}>
                    <a>
                        Log in
                    </a>
                </Link>
            </div>
        </>
    )
}

export default withPublic(Register);