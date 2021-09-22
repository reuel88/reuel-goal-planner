import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { SyntheticEvent } from "react";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import BasicLayout from "@modules/layouts/BasicLayout";
import { useTranslations } from "next-intl";
import routes from "@constants/routes.json";

const New: NextPage = () => {
  const t = useTranslations();
  const router = useRouter();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    await router.push(routes.DASHBOARD);
  }

  return (<BasicLayout>
    <main>
      <Container as="section">
        <Row className="justify-content-center">
          <Col xs={12} sm={8} md={6} lg={5} xl={4} xxl={3} >
            <Form onSubmit={handleSubmit}>
              <h2>{t("GOAL.title-new-goal")}</h2>

              <Form.Group className="mb-3" controlId="title">
                <Form.Label>{t("GOAL.label-title")}</Form.Label>
                <Form.Control type="text" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="description">
                <Form.Label>{t("GOAL.label-description")} <Badge pill
                                                                 bg="secondary">{t("FORM.optional")}</Badge></Form.Label>
                <Form.Control as="textarea" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="total-cost">
                <Form.Label className="d-block">{t("GOAL.label-total-cost")}</Form.Label>
                <InputGroup>
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control type="text" />
                </InputGroup>
              </Form.Group>

              <Form.Group className="mb-3" controlId="target-date">
                <Form.Label>{t("GOAL.label-target-date")} <Badge pill
                                                                 bg="secondary">{t("FORM.optional")}</Badge></Form.Label>
                <Form.Control type="date" />
              </Form.Group>


              <Form.Group className="mb-3" controlId="lock-date">
                <Form.Check type="checkbox" label={t("GOAL.label-lock-date")} />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button type="submit">
                  {t("GOAL.btn-create-goal")}
                </Button>
                <Link href={`${routes.DASHBOARD}`} passHref>
                  <Button as="a" variant="outline-secondary">{t("FORM.btn-cancel")}</Button>
                </Link>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </main>
  </BasicLayout>);
};

export default New;