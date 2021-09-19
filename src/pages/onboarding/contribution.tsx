import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { SyntheticEvent } from "react";
import styled from "styled-components";
import routes from "@constants/routes.json";
import BasicLayout from "@modules/layouts/BasicLayout";
import { RotButton } from "../../web-components/components";

const FormFooter = styled.footer`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
`;

const Contribution: NextPage = () => {
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
          <label htmlFor="contributions">{t("ONBOARDING_CONTRIBUTION.label-contributions")}</label>
          <p>{t("ONBOARDING_CONTRIBUTION.description-contributions")}</p>

          <label htmlFor="period">{t("PERIOD.label-period")}</label>
          <select name="period" id="period">
            <option value="daily">{t("PERIOD.option-daily")}</option>
            <option value="weekly">{t("PERIOD.option-weekly")}</option>
            <option value="fortnightly">{t("PERIOD.option-fortnightly")}</option>
            <option value="monthly">{t("PERIOD.option-monthly")}</option>
          </select>
          <input type="text" id="savings" />
        </div>

        <FormFooter>
          <RotButton onClick={handleSubmit}>{t("FORM.btn-next")}</RotButton>
          <Link href={routes.ONBOARDING_SAVING} passHref>
            <RotButton as="a" variant="secondary">{t("FORM.btn-back")}</RotButton>
          </Link>
        </FormFooter>
      </form>
    </section>
  </BasicLayout>);
};

export default Contribution;