import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/pro-solid-svg-icons";
import { NextPage } from "next";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import BasicLayout from "@modules/layouts/BasicLayout";
import routes from "@constants/routes.json";

const Dashboard: NextPage = () => {
  const t = useTranslations();

  return (<BasicLayout>
    <main>
      {/*<section>*/}
      {/*  <header>*/}
      {/*    <div>{t("DASHBOARD_DONT_EARN_ENOUGH.alert")}</div>*/}
      {/*    <h3>Title</h3>*/}
      {/*  </header>*/}
      {/*  <div>*/}
      {/*    <div>$500</div>*/}
      {/*    <div>Date</div>*/}
      {/*  </div>*/}
      {/*  <footer>*/}
      {/*    <p>{t("DASHBOARD_DONT_EARN_ENOUGH.achievable-timeline")}</p>*/}
      {/*    <Button>{t("DASHBOARD_DONT_EARN_ENOUGH.btn-recalculate")}</Button>*/}
      {/*    <Button>{t("DASHBOARD_DONT_EARN_ENOUGH.btn-lock-date")}</Button>*/}
      {/*  </footer>*/}
      {/*</section>*/}

      {/*<section>*/}
      {/*  <header>*/}
      {/*    <h3>{t("DASHBOARD_EXTRA_CONTRIBUTION.title-need-extra-contribution")}</h3>*/}
      {/*  </header>*/}
      {/*  <div>*/}
      {/*    <div>$500 + $100</div>*/}
      {/*    <div>$600</div>*/}
      {/*    <div>*/}
      {/*      <label htmlFor="period">{t("PERIOD.label-period")}</label>*/}
      {/*      <select name="period" id="period">*/}
      {/*        <option value="daily">{t("PERIOD.option-daily")}</option>*/}
      {/*        <option value="weekly">{t("PERIOD.option-weekly")}</option>*/}
      {/*        <option value="fortnightly">{t("PERIOD.option-fortnightly")}</option>*/}
      {/*        <option value="monthly">{t("PERIOD.option-monthly")}</option>*/}
      {/*      </select>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}

      <Container as="section">
        <Row className="justify-content-center">

          <Col xs={12} sm={8} md={6} lg={5} xl={4} xxl={3} >
            <Link href={`${routes.GOAL_NEW}`} passHref>
              <Button as="a" variant="outline-secondary" className="d-inline-flex gap-2 align-items-center">
                <FontAwesomeIcon icon={faPlus} />
                {t("DASHBOARD.btn-new-goal")}
              </Button>
            </Link>

            <section className="text-center py-3">
              <h1>{t("DASHBOARD.title-welcome")}</h1>
              <h2 className="h6">{t("DASHBOARD.subtitle-welcome")}</h2>
              <div className="d-grid mt-3">
                <Link href={`${routes.GOAL_NEW}`} passHref>
                  <Button as="a">{t("DASHBOARD.btn-new-goal")}</Button>
                </Link>
              </div>
            </section>
          </Col>
        </Row>

        {/*<article>*/}
        {/*  <Link href={`${routes.GOAL_EDIT}`} passHref>*/}
        {/*    <Button as="a">*/}
        {/*      <header>*/}
        {/*        <h3>Title</h3>*/}
        {/*      </header>*/}
        {/*      <div>*/}
        {/*        <p>Content</p>*/}
        {/*        <div>$500</div>*/}
        {/*        <div>Date</div>*/}
        {/*      </div>*/}
        {/*    </Button>*/}
        {/*  </Link>*/}
        {/*</article>*/}
      </Container>
    </main>
  </BasicLayout>);
};

export default Dashboard;