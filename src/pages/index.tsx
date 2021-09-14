import type { NextPage } from "next";
import { useTranslations } from "next-intl";


const Home: NextPage = () => {

  const t = useTranslations("Index");

  return (<div>
      <h1>
        {t("title")}
      </h1>
    </div>
  );
};

export default Home;
