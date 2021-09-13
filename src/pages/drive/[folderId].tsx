import type { NextPage } from "next";
import Drive from "./index";
import { GetServerSideProps } from "next";
import nookies from "nookies";
import authBackendService from "@services/authBackendService";
import route from "@constants/route.json";

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
        destination: `${route.LOGIN}`,
        permanent: true
      }
    };
  }
};