import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { NextSeo } from "next-seo";
import nookies from "nookies";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import routes from "@constants/routes.json";
import { useAuth } from "@contexts/AuthContext";
import BasicLayout from "@modules/layouts/BasicLayout";
import authBackendService from "@services/authBackendService";

const Profile: NextPage = () => {
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
      await router.push(routes.LOGIN);
    } catch (e) {
      setError("Failed to logout");
    }
  }

  return (
    <BasicLayout>
      <NextSeo
        title="Goal Planner - Profile"
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

          <Link href={`${routes.PROFILE}/${currentUser?.uid}`} passHref>
            <Button as="a">
              Update Profile
            </Button>
          </Link>
        </div>
      </section>
      <div>
        <Button type="button" onClick={e => handleLogout(e, signOut)}>Log out</Button>
      </div>
    </BasicLayout>
  );
};

export default Profile;

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
