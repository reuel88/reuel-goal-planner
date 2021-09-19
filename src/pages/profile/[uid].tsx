import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import nookies from "nookies";
import React, { useRef, useState } from "react";
import validate from "validate.js";
import routes from "@constants/routes.json";
import { useAuth } from "@contexts/AuthContext";
import BasicLayout from "@modules/layouts/BasicLayout";
import authBackendService from "@services/authBackendService";
import { RotButton } from "../../web-components/components";

const Uid: NextPage = () => {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const verifyPasswordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { updateEmail, updatePassword, currentUser } = useAuth() ?? {
    currentUser: null,
    updateEmail: null,
    updatePassword: null
  };

  if (!currentUser || !updateEmail || !updatePassword) {
    return <div data-testid="no-auth" />;
  }

  async function handleSubmit(e: React.SyntheticEvent, updateEmail: (email: string) => Promise<any>, updatePassword: (password: string) => Promise<any>) {
    e.preventDefault();

    const email = emailRef?.current?.value ?? "";
    const password = passwordRef?.current?.value ?? "";
    const verifyPassword = verifyPasswordRef?.current?.value ?? "";

    const notValid = validate({
      email, password, verifyPassword
    }, {
      email: { presence: { allowEmpty: false }, email: true },
      verifyPassword: {
        equality: "password"
      }
    });

    if (notValid) {
      const firstKey = Object.keys(notValid)[0];
      const firstError = notValid[firstKey][0];
      return setError(firstError);
    }

    const promises = [];
    if (email !== currentUser?.email) {
      promises.push(updateEmail(email));
    }

    if (password) {
      promises.push(updatePassword(password));
    }

    try {
      setError("");
      setLoading(true);
      await Promise.all(promises);
      return await router.push(routes.DASHBOARD);
    } catch (e) {
      setError("Failed to Update");
    }

    setLoading(false);
  }

  return (
    <BasicLayout>
      <NextSeo
        title={`Goal Planner - ${currentUser?.email}`}
      />

      <section>
        <header className="section-header">
          <h2>Update Profile</h2>
        </header>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
        <form onSubmit={e => handleSubmit(e, updateEmail, updatePassword)}>
          <div className="section-content">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" ref={emailRef}
                     defaultValue={currentUser?.email}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" ref={passwordRef}
                     placeholder="Leave blank to keep the same"
              />
            </div>
            <div className="form-group">
              <label htmlFor="verify-password" className="form-label">Verify Password</label>
              <input type="password" className="form-control" id="verify-password"
                     ref={verifyPasswordRef}
                     placeholder="Leave blank to keep the same"
              />
            </div>
          </div>
          <footer className="section-footer">
            <RotButton type="submit" data-testId="submit-update-btn"  role="button" disabled={loading} onClick={e => handleSubmit(e, updateEmail, updatePassword)}>Update</RotButton>
          </footer>
        </form>
      </section>

      <div>

        <Link href={routes.DASHBOARD}>
          <a>
            Cancel
          </a>
        </Link>
      </div>
    </BasicLayout>
  );
};

export default Uid;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);

    const token = await authBackendService.verifyIdToken(cookies.token);

    console.log(token);

    return { props: {} };
  } catch (e) {
    return {
      redirect: {
        destination: `${routes.LOGIN}`,
        permanent: true
      }
    };
  }
};