import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import routes from "@constants/routes.json";
import BasicLayout from "@modules/layouts/BasicLayout";
import { SyntheticEvent } from "react";
import OnboardingStepper from "@modules/onboarding/OnboardingStepper";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const Contribution: NextPage = () => {
  const t = useTranslations();
  const router = useRouter();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    await router.push(routes.DASHBOARD);
  }

  return (<BasicLayout>
    <OnboardingStepper activeStep={1} />

      <Container as="section">
        <Row className="justify-content-center">
          <Col xs={12} sm={8} md={6} lg={5} xl={4} xxl={3}>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="contributions">
                <Form.Label className="d-block">{t("ONBOARDING_CONTRIBUTION.label-contributions")}</Form.Label>
                <InputGroup>
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control type="text" />
                </InputGroup>
                <Form.Text>{t("ONBOARDING_CONTRIBUTION.description-contributions")}</Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="period">
                <Form.Label className="d-block">{t("PERIOD.label-period")}</Form.Label>
                <Form.Select defaultValue={t("PERIOD.option-weekly")}>
                  <option>{t("PERIOD.option-daily")}</option>
                  <option>{t("PERIOD.option-weekly")}</option>
                  <option>{t("PERIOD.option-fortnightly")}</option>
                  <option>{t("PERIOD.option-monthly")}</option>
                </Form.Select>
              </Form.Group>

              <div className="d-grid gap-2">
                <Button type="submit">{t("FORM.btn-next")}</Button>
                <Link href={routes.ONBOARDING_SAVING} passHref>
                  <Button as="a" variant="outline-secondary">{t("FORM.btn-back")}</Button>
                </Link>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>

  </BasicLayout>);
};

export default Contribution;