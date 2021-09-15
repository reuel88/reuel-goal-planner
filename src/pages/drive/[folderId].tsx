import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Drive from "./index";
import nookies from "nookies";
import authBackendService from "@services/authBackendService";
import routes from "@constants/routes.json";

const FolderId: NextPage = () => <Drive />;

export default FolderId;

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