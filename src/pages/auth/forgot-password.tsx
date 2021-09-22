import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { NextSeo } from "next-seo";
import nookies from "nookies";
import React, { useRef, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import validate from "validate.js";
import { useAuth } from "@contexts/AuthContext";
import routes from "@constants/routes.json";
import authBackendService from "@services/authBackendService";

const ForgotPassword: NextPage = () => {
  const emailRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const { resetPassword } = useAuth() ?? { resetPassword: null };

  if (!resetPassword) {
    return <div data-testid="no-reset-password" />;
  }

  async function handleSubmit(e: React.SyntheticEvent, resetPassword: (email: string) => Promise<any>) {
    e.preventDefault();
    const email = emailRef?.current?.value ?? "";

    const notValid = validate({
      email
    }, {
      email: { presence: { allowEmpty: false }, email: true }
    });

    if (notValid) {
      const firstKey = Object.keys(notValid)[0];
      const firstError = notValid[firstKey][0];
      return setError(firstError);
    }

    try {
      setError("");
      setMessage("");
      setLoading(true);
      await resetPassword(email);
      setMessage("Check your inbox for further instructions");
    } catch (e) {
      setError("Failed to Reset Password");
    }

    setLoading(false);
  }

  return (
    <>
      <NextSeo
        title="Goal Planner - Forgot Password"
      />

      <main className="bg-light min-vh-100 py-4">
        <Container as="section" >
          <Row className="justify-content-center">
            <Col xs={12} sm={8} md={6} lg={5} xl={4} xxl={3} >
              <Card as="section">
                <Card.Body>
                  <Card.Title as="h2" className="text-center">
                    Reset Password
                  </Card.Title>
                  <Form onSubmit={e => handleSubmit(e, resetPassword)}>
                    {error && <Alert variant="danger" role="alert">{error}</Alert>}
                    {message && <Alert variant="success" role="alert">{message}</Alert>}

                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="text" placeholder="john.smith@example.com" ref={emailRef} />
                    </Form.Group>

                    <div className="d-grid gap-2">
                      <Button type="submit" disabled={loading}>Reset Password</Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>

              <div className="text-center d-flex flex-column gap-2 py-2">
                <div>
                  Already have a account?&nbsp;
                  <Link href={routes.LOGIN}>
                    <a>
                      Login
                    </a>
                  </Link>
                </div>
              </div>



            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
};

export default ForgotPassword;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  try {
    const cookies = nookies.get(ctx);

    const token = await authBackendService.verifyIdToken(cookies.token);

    console.log(token);

    return {
      redirect: {
        destination: `${routes.LOGIN}`,
        permanent: true
      }
    };
  } catch (e) {
    return {
      props: {}
    };
  }
};