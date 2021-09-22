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
      <main>
        <Container as="section">
          <Row className="justify-content-center">
            <Col xs={12} sm={8} md={6} lg={5} xl={4} xxl={3} className="text-center">
              <h1>{t("title-welcome")}</h1>
              <h2 className="h6">{t("subtitle-welcome")}</h2>
              <div className="d-grid mt-3">
                <Link href={`${routes.ONBOARDING_SAVING}`} passHref>
                  <Button as="a">{t("btn-get-started")}</Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </main>
    </BasicLayout>
  );
};

export default Home;
