import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { SyntheticEvent } from "react";
import routes from "@constants/routes.json";
import BasicLayout from "@modules/layouts/BasicLayout";


import { RotButton } from "../../web-components/components";

const New: NextPage = () => {
  const t = useTranslations();
  const router = useRouter();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    await router.push(routes.DASHBOARD);
  }


  return (<BasicLayout>
    <section>
      <form onSubmit={handleSubmit}>
        <h2>{t("GOAL.title-new-goal")}</h2>

        <div>
          <label htmlFor="title">{t("GOAL.label-title")}</label>
          <input type="text" id="title" />
        </div>

        <div>
          <label htmlFor="description">{t("GOAL.label-description")} <span>{t("FORM.optional")}</span></label>
          <textarea id="description" />
        </div>

        <div>
          <label htmlFor="total-cost">{t("GOAL.label-total-cost")}</label>
          <input type="text" id="total-cost" />
        </div>

        <div>
          <label htmlFor="target-date">{t("GOAL.label-target-date")} <span>{t("FORM.optional")}</span></label>
          <input type="date" id="target-date" />
        </div>

        <div>
          <label htmlFor="lock-date">
            <input type="checkbox" id="lock-date" />
            {t("GOAL.label-lock-date")}
          </label>
        </div>

        <RotButton>
          {t("GOAL.btn-create-goal")}
        </RotButton>
        <Link href={`${routes.DASHBOARD}`}>
          <a>{t("FORM.btn-cancel")}</a>
        </Link>
      </form>
    </section>
  </BasicLayout>);
};

export default New;