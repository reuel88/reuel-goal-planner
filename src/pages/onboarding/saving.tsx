import type { NextPage } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { SyntheticEvent } from "react";
import routes from "@constants/routes.json";
import BasicLayout from "@modules/layouts/BasicLayout";

const Saving: NextPage = () => {
  const t = useTranslations();
  const router = useRouter();

  async function handleSubmit(e: SyntheticEvent) {
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
          <button>{t("FORM.btn-next")}</button>
        </form>
      </section>
    </BasicLayout>
  );
};

export default Saving;