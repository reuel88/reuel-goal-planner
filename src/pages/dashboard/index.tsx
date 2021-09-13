import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import nookies from "nookies";
import React, { useState } from "react";
import route from "@constants/route.json";
import { useAuth } from "@contexts/AuthContext";
import BasicLayout from "@modules/layouts/BasicLayout";
import authBackendService from "@services/authBackendService";

const Dashboard: NextPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const { currentUser, signOut } = useAuth() ?? { currentUser: null, signOut: null };

  if (!currentUser || !signOut) {
    return <div data-testid="no-auth" />;
  }

  async function handleLogout(e: React.SyntheticEvent, signOut: () => void) {
    e.preventDefault();

    try {
      setError("");
      await signOut();
      await router.push(route.LOGIN);
    } catch (e) {
      setError("Failed to logout");
    }
  }

  return (
    <BasicLayout>
      <NextSeo
        title="Goal Planner - Dashboard"
      />

      <section>
        <header className="section-header">
          <h2>Profile</h2>
        </header>
        {error && <div className="alert alert-danger" role="alert">{error}</div>}
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
        <button type="button" onClick={e => handleLogout(e, signOut)}>Log out</button>
      </div>
    </BasicLayout>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);

    const token = await authBackendService.verifyIdToken(cookies.token);

    console.log(token);

    return { props: {} };
  } catch (e) {
    return {
      redirect: {
        destination: `${route.LOGIN}`,
        permanent: true
      }
    };
  }
};
