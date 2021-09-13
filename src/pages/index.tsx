import type { NextPage } from "next";
import { useTranslations } from "next-intl";


const Home: NextPage = () => {

  const t = useTranslations("Index");

  return (<div>
      {t("title")}
    </div>
  );
};

export default Home;
