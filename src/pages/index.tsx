import type { NextPage } from "next";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import routes from "@constants/routes.json";
import BasicLayout from "@modules/layouts/BasicLayout";


const Home: NextPage = () => {
  const t = useTranslations("HOME");

  return (<BasicLayout>

      <section>
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} sm={7} md={6} lg={4} xl={3} className="text-center">
              <h1>{t("title-welcome")}</h1>
              <h2 className="h6">{t("subtitle-welcome")}</h2>
              <div className="d-grid">
                <Link href={`${routes.ONBOARDING_SAVING}`} passHref>
                  <Button as="a">{t("btn-get-started")}</Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </BasicLayout>
  );
};

export default Home;
