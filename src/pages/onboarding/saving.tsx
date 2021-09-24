import type { NextPage } from "next";
import { useTranslations } from "next-intl";
import { useRouter } from "next/router";
import React, { SyntheticEvent, useRef } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import routes from "@constants/routes.json";
import BasicLayout from "@modules/layouts/BasicLayout";
import OnboardingStepper from "@modules/onboarding/OnboardingStepper";
import { useOnboarding, withOnboarding } from "@contexts/OnboardingContext";

const Saving: NextPage = () => {
  const t = useTranslations();
  const router = useRouter();
  const { state: { savingValue }, setSavings } = useOnboarding() ?? { setSavings: null };
  const savingsRef = useRef<HTMLInputElement>(null);

  if (!setSavings) {
    return <div data-testid="no-sign-in" />;
  }

  async function handleSubmit(e: SyntheticEvent, setSavings: (savings: number) => any) {
    e.preventDefault();

    const savings = savingsRef?.current?.value ?? "";

    setSavings(parseFloat(savings));

    await router.push(routes.ONBOARDING_CONTRIBUTION);
  }

  console.log(savingValue);

  return (<BasicLayout>
      <main>

        <OnboardingStepper activeStep={0} />

        <Container as="section">
          <Row className="justify-content-center">
            <Col xs={12} sm={8} md={6} lg={5} xl={4} xxl={3}>
              <Form onSubmit={e => handleSubmit(e, setSavings)}>
                <Form.Group className="mb-3" controlId="savings">
                  <Form.Label>{t("ONBOARDING_SAVING.label-savings")}</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control type="text" defaultValue={savingValue} ref={savingsRef} />
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

export default withOnboarding(Saving);