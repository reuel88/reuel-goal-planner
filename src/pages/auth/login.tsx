import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import nookies from "nookies";
import React, { useRef, useState } from "react";
import validate from "validate.js";
import routes from "@constants/routes.json";
import { useAuth } from "@contexts/AuthContext";
import authBackendService from "@services/authBackendService";

const Login: NextPage = () => {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signInWithEmailAndPassword } = useAuth() ?? { signInWithEmailAndPassword: null };

  if (!signInWithEmailAndPassword) {
    return <div data-testid="no-sign-in" />;
  }

  async function handleSubmit(e: React.SyntheticEvent, signInWithEmailAndPassword: (email: string, password: string) => Promise<any>) {
    e.preventDefault();
    const email = emailRef?.current?.value ?? "";
    const password = passwordRef?.current?.value ?? "";

    const notValid = validate({
      email, password
    }, {
      email: { presence: { allowEmpty: false }, email: true },
      password: { presence: { allowEmpty: false } }
    });

    if (notValid) {
      const firstKey = Object.keys(notValid)[0];
      const firstError = notValid[firstKey][0];
      return setError(firstError);
    }

    try {
      setError("");
      setLoading(true);
      await signInWithEmailAndPassword(email, password);

      return await router.push(routes.DASHBOARD);
    } catch (e) {
      setError("Failed to login");
    }

    setLoading(false);
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
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <form onSubmit={e => handleSubmit(e, signInWithEmailAndPassword)}>
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
        <Link href={routes.FORGOT_PASSWORD}>
          <a>
            Forgot Password
          </a>
        </Link>
      </div>

      <div>
        Need a account?
        <Link href={routes.REGISTER}>
          <a>
            Create Account
          </a>
        </Link>
      </div>
    </>
  );
};

export default Login;

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  console.log(ctx);

  try {
    const cookies = nookies.get(ctx);

    const token = await authBackendService.verifyIdToken(cookies.token);

    console.log(token);

    return {
      redirect: {
        destination: `${routes.LOGIN}`,
        permanent: true
      }
    };
  } catch (e) {
    return {
      props: {}
    };
  }
};
