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

const Register: NextPage = () => {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const verifyPasswordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuth() ?? { signUp: null };

  if (!signUp) {
    return <div data-testid="no-sign-up" />;
  }

  async function handleSubmit(e: React.SyntheticEvent, signUp: (email: string, password: string) => Promise<any>) {
    e.preventDefault();

    const email = emailRef?.current?.value ?? "";
    const password = passwordRef?.current?.value ?? "";
    const verifyPassword = verifyPasswordRef?.current?.value ?? "";

    const notValid = validate({
      email, password, verifyPassword
    }, {
      email: { presence: { allowEmpty: false } },
      password: { presence: { allowEmpty: false } },
      verifyPassword: {
        presence: { allowEmpty: false },
        equality: "password"
      }
    });

    if (notValid) {
      const firstKey = Object.keys(notValid)[0];
      const firstError = notValid[firstKey][0];
      return setError(firstError);
    }

    try {
      setError("");
      setLoading(true);
      await signUp(email, password);
      return await router.push(routes.DASHBOARD);
    } catch (e) {
      setError("Failed to register");
    }

    setLoading(false);
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
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <form onSubmit={e => handleSubmit(e, signUp)}>
          <div className="section-content">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" ref={emailRef} />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" ref={passwordRef} />
            </div>
            <div className="form-group">
              <label htmlFor="verify-password" className="form-label">Verify Password</label>
              <input type="password" className="form-control" id="verify-password"
                     ref={verifyPasswordRef} />
            </div>
          </div>
          <footer className="section-footer">
            <button type="submit" disabled={loading}>Sign Up</button>
          </footer>
        </form>
      </section>

      <div>
        Already have a account?
        <Link href={routes.LOGIN}>
          <a>
            Log in
          </a>
        </Link>
      </div>
    </>
  );
};

export default Register;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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