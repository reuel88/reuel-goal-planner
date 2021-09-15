import type { NextPage } from "next";
import Link from "next/link";
import { useTranslations } from "next-intl";
import routes from "@constants/routes.json";
import BasicLayout from "@modules/layouts/BasicLayout";

const Home: NextPage = () => {
  const t = useTranslations("HOME");

  return (<BasicLayout>
      <section>
        <header>
          <h1>{t("welcome-title")} </h1>
          <h2>{t("welcome-subtitle")}</h2>
          <Link href={`${routes.ONBOARDING_SAVINGS}`}>
            <a>{t("btn-get-started")}</a>
          </Link>
        </header>
      </section>

    </BasicLayout>
  );
};

export default Home;
