import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import React, { useRef, useState } from "react";
import validate from "validate.js";
import { withProtected } from "@hooks/route";
import { useAuth } from "@contexts/AuthContext";
import route from "@constants/route.json";

const Register: NextPage = () => {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const verifyPasswordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { updateEmail, updatePassword, currentUser } = useAuth();

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const email = emailRef?.current?.value ?? "";
    const password = passwordRef?.current?.value ?? "";
    const verifyPassword = verifyPasswordRef?.current?.value ?? "";

    const notValid = validate({
      email, password, verifyPassword
    }, {
      email: { presence: { allowEmpty: false } },
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
      return await router.push(route.DASHBOARD);
    } catch (e) {
      setError("Failed to Update");
      console.error(e);
    }

    setLoading(false);
  }

  return (
    <>
      <NextSeo
        title={`Goal Planner - ${currentUser?.email}`}
      />

      <section>
        <header className="section-header">
          <h2>Update Profile</h2>
        </header>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
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
            <button type="submit" disabled={loading}>Update</button>
          </footer>
        </form>
      </section>

      <div>

        <Link href={route.DASHBOARD}>
          <a>
            Cancel
          </a>
        </Link>
      </div>
    </>
  );
};

export default withProtected(Register);