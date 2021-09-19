import type { NextPage } from "next";
import Link from "next/link";
import { useTranslations } from "next-intl";
import routes from "@constants/routes.json";
import BasicLayout from "@modules/layouts/BasicLayout";
import { RotButton } from "../web-components/components";

const Home: NextPage = () => {
  const t = useTranslations("HOME");

  return (<BasicLayout>
      <section>
        <header>
          <h1>{t("title-welcome")}</h1>
          <h2>{t("subtitle-welcome")}</h2>
          <Link href={`${routes.ONBOARDING_SAVING}`} passHref>
            <RotButton>{t("btn-get-started")}</RotButton>
          </Link>
        </header>
      </section>
    </BasicLayout>
  );
};

export default Home;
