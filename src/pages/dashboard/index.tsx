import { NextPage } from "next";
import Link from "next/link";
import BasicLayout from "@modules/layouts/BasicLayout";
import { useTranslations } from "next-intl";
import routes from "@constants/routes.json";
import { RotButton } from "../../web-components/components";

const Dashboard: NextPage = () => {
  const t = useTranslations();

  return (<BasicLayout>
    <main>
      <section>
        <header>
          <div>{t("DASHBOARD_DONT_EARN_ENOUGH.alert")}</div>
          <h3>Title</h3>
        </header>
        <div>
          <div>$500</div>
          <div>Date</div>
        </div>
        <footer>
          <p>{t("DASHBOARD_DONT_EARN_ENOUGH.achievable-timeline")}</p>
          <RotButton>{t("DASHBOARD_DONT_EARN_ENOUGH.btn-recalculate")}</RotButton>
          <RotButton variant="secondary">{t("DASHBOARD_DONT_EARN_ENOUGH.btn-lock-date")}</RotButton>
        </footer>
      </section>

      <section>
        <header>
          <h3>{t("DASHBOARD_EXTRA_CONTRIBUTION.title-need-extra-contribution")}</h3>
        </header>
        <div>
          <div>$500 + $100</div>
          <div>$600</div>
          <div>
            <label htmlFor="period">{t("PERIOD.label-period")}</label>
            <select name="period" id="period">
              <option value="daily">{t("PERIOD.option-daily")}</option>
              <option value="weekly">{t("PERIOD.option-weekly")}</option>
              <option value="fortnightly">{t("PERIOD.option-fortnightly")}</option>
              <option value="monthly">{t("PERIOD.option-monthly")}</option>
            </select>
          </div>
        </div>
      </section>

      <section>
        <Link href={`${routes.GOAL_NEW}`}>
          <a>{t("DASHBOARD.btn-new-goal")}</a>
        </Link>

        <section>
          <h1>{t("DASHBOARD.title-welcome")}</h1>
          <h2>{t("DASHBOARD.subtitle-welcome")}</h2>
          <Link href={`${routes.GOAL_NEW}`}>
            <a>{t("DASHBOARD.btn-new-goal")}</a>
          </Link>
        </section>

        <article>
          <Link href={`${routes.GOAL_EDIT}`}>
            <a>
              <header>
                <h3>Title</h3>
              </header>
              <div>
                <p>Content</p>
                <div>$500</div>
                <div>Date</div>
              </div>
            </a>
          </Link>
        </article>
      </section>
    </main>
  </BasicLayout>);
};

export default Dashboard;