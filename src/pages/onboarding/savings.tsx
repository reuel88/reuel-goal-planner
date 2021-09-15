import type { NextPage } from "next";
import { useTranslations } from "next-intl";
import BasicLayout from "@modules/layouts/BasicLayout";

const Savings: NextPage = () => {

  const t = useTranslations();

  return (<BasicLayout>
      <ol>
        <li>{t("ONBOARDING.savings")}</li>
        <li>{t("ONBOARDING.contributions")}</li>
      </ol>
      <section>
        <form>
          <div>
            <label htmlFor="savings">{t("ONBOARDING_SAVINGS.label-savings")}</label>
            <input type="text" id="savings" />
          </div>
          <button>{t("FORM.btn-next")}</button>
        </form>
      </section>
    </BasicLayout>
  );
};

export default Savings;