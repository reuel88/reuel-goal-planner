import type { NextPage } from 'next';
import React, { useRef, useState } from "react";
import validate from "validate.js";
import Link from "next/link";
import { withPublic } from "../../hooks/useAuthRouter";
import { useAuth } from "../../contexts/AuthContext";
import route from "../../constants/route.json";

const ForgotPassword: NextPage = () => {
    const emailRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const {resetPassword} = useAuth();

    async function handleSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        setError('');
        setMessage('');

        const email = emailRef?.current?.value ?? '';

        const notValid = validate({
            email,
        }, {
            email: {presence: {allowEmpty: false}},
        })

        if (notValid) {
            const firstKey = Object.keys(notValid)[0];
            const firstError = notValid[firstKey][0];
            return setError(firstError);
        }

        try {
            setLoading(true);
            await resetPassword(email)
            setMessage('Check your inbox for further instructions');
        } catch (e) {
            setError('Failed to Reset Password');
            console.error(e);
        }

        setLoading(false)
    }

    return (
        <>
            <section>
                <header className="section-header">
                    <h2>Reset Password</h2>
                </header>
                {error && <div className="alert alert-danger">{error}</div>}
                {message && <div className="alert alert-success">{message}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="section-content">
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" className="form-control" id="email" ref={emailRef} />
                        </div>
                    </div>
                    <footer className="section-footer">
                        <button type="submit" disabled={loading}>Reset Password</button>
                    </footer>
                </form>
            </section>


            <div>
                <Link href={route.LOGIN}>
                    <a>
                        Login
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

export default withPublic(ForgotPassword);
