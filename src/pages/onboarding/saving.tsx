import type { NextPage } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { SyntheticEvent } from "react";
import routes from "@constants/routes.json";
import BasicLayout from "@modules/layouts/BasicLayout";
import { RotButton } from "../../web-components/components";

const Saving: NextPage = () => {
  const t = useTranslations();
  const router = useRouter();

  async function handleSubmit(e: SyntheticEvent) {

    console.log(e);
    e.preventDefault();

    await router.push(routes.ONBOARDING_CONTRIBUTION);
  }

  return (<BasicLayout>
      <ol>
        <li>{t("ONBOARDING.savings")}</li>
        <li>{t("ONBOARDING.contributions")}</li>
      </ol>
      <section>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="savings">{t("ONBOARDING_SAVING.label-savings")}</label>
            <input type="text" id="savings" />
          </div>
          <RotButton type="submit" onClick={handleSubmit}>{t("FORM.btn-next")}</RotButton>
        </form>
      </section>
    </BasicLayout>
  );
};

export default Saving;