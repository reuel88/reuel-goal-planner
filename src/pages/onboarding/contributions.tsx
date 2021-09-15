import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import routes from "@constants/routes.json";
import BasicLayout from "@modules/layouts/BasicLayout";
import { SyntheticEvent } from "react";

const Savings: NextPage = () => {
  const t = useTranslations();
  const router = useRouter();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    await router.push(routes.DASHBOARD);
  }

  return (<BasicLayout>
    <ol>
      <li>{t("ONBOARDING.savings")}</li>
      <li>{t("ONBOARDING.contributions")}</li>
    </ol>
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="contributions">{t("ONBOARDING_CONTRIBUTIONS.label-contributions")}</label>
          <p>{t("ONBOARDING_CONTRIBUTIONS.description-contributions")}</p>

          <label htmlFor="period">{t("PERIOD.label-period")}</label>
          <select name="period" id="period">
            <option value="daily">{t("PERIOD.option-daily")}</option>
            <option value="weekly">{t("PERIOD.option-weekly")}</option>
            <option value="fortnightly">{t("PERIOD.option-fortnightly")}</option>
            <option value="monthly">{t("PERIOD.option-monthly")}</option>
          </select>
          <input type="text" id="savings" />
        </div>

        <button>{t("FORM.btn-next")}</button>
        <Link href={routes.ONBOARDING_SAVINGS}>
          <a>{t("FORM.btn-back")}</a>
        </Link>
      </form>
    </section>
  </BasicLayout>);
};

export default Savings;