import type { NextPage } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { SyntheticEvent } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
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
      <Breadcrumb>
        <Breadcrumb.Item active>{t("ONBOARDING.savings")}</Breadcrumb.Item>
        <Breadcrumb.Item>{t("ONBOARDING.contributions")}</Breadcrumb.Item>
      </Breadcrumb>
      <section>
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} sm={7} md={6} lg={4} xl={3}>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="savings">
                  <Form.Label>{t("ONBOARDING_SAVING.label-savings")}</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control type="text" />
                  </InputGroup>
                </Form.Group>


                <div className="d-grid">
                  <Button>{t("FORM.btn-next")}</Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </BasicLayout>
  );
};

export default Saving;