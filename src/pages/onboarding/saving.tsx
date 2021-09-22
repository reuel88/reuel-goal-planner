import type { NextPage } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import { SyntheticEvent } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import routes from "@constants/routes.json";
import BasicLayout from "@modules/layouts/BasicLayout";
import OnboardingStepper from "@modules/onboarding/OnboardingStepper";

const Saving: NextPage = () => {
  const t = useTranslations();
  const router = useRouter();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    await router.push(routes.ONBOARDING_CONTRIBUTION);
  }

  return (<BasicLayout>
      <main>

        <OnboardingStepper activeStep={0} />

        <Container as="section">
          <Row className="justify-content-center">
            <Col xs={12} sm={8} md={6} lg={5} xl={4} xxl={3} >
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="savings">
                  <Form.Label>{t("ONBOARDING_SAVING.label-savings")}</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control type="text" />
                  </InputGroup>
                </Form.Group>

                <div className="d-grid">
                  <Button type="submit">{t("FORM.btn-next")}</Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>


      </main>
    </BasicLayout>
  );
};

export default Saving;