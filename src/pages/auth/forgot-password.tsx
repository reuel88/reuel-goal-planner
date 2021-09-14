import type { NextPage } from "next";
import Link from "next/link";
import { NextSeo } from "next-seo";
import React, { useRef, useState } from "react";
import validate from "validate.js";
import { useAuth } from "@contexts/AuthContext";
import route from "@constants/route.json";
import { GetServerSideProps } from "next";
import nookies from "nookies";
import authBackendService from "@services/authBackendService";

const ForgotPassword: NextPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { resetPassword } = useAuth() ?? { resetPassword: null };

  if (!resetPassword) {
    return <div data-testid="no-reset-password" />;
  }

  async function handleSubmit(e: React.SyntheticEvent, resetPassword: (email: string) => Promise<any>) {
    e.preventDefault();
    const email = emailRef?.current?.value ?? "";

    const notValid = validate({
      email
    }, {
      email: { presence: { allowEmpty: false }, email: true }
    });

    if (notValid) {
      const firstKey = Object.keys(notValid)[0];
      const firstError = notValid[firstKey][0];
      return setError(firstError);
    }

    try {
      setError("");
      setMessage("");
      setLoading(true);
      await resetPassword(email);
      setMessage("Check your inbox for further instructions");
    } catch (e) {
      setError("Failed to Reset Password");
    }

    setLoading(false);
  }

  return (
    <>
      <NextSeo
        title="Goal Planner - Forgot Password"
      />

      <section>
        <header className="section-header">
          <h2>Reset Password</h2>
        </header>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        {message && <div className="alert alert-success" role="alert">{message}</div>}
        <form onSubmit={e => handleSubmit(e, resetPassword)}>
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
  );
};

export default ForgotPassword;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);

    const token = await authBackendService.verifyIdToken(cookies.token);

    console.log(token);

    return {
      redirect: {
        destination: `${route.LOGIN}`,
        permanent: true
      }
    };
  } catch (e) {
    return {
      props: {}
    };
  }
};