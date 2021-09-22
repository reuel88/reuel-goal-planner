import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
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
import routes from "@constants/routes.json";
import { useAuth } from "@contexts/AuthContext";
import authBackendService from "@services/authBackendService";

const Register: NextPage = () => {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const verifyPasswordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { signUp } = useAuth() ?? { signUp: null };

  if (!signUp) {
    return <div data-testid="no-sign-up" />;
  }

  async function handleSubmit(e: React.SyntheticEvent, signUp: (email: string, password: string) => Promise<any>) {
    e.preventDefault();

    const email = emailRef?.current?.value ?? "";
    const password = passwordRef?.current?.value ?? "";
    const verifyPassword = verifyPasswordRef?.current?.value ?? "";

    const notValid = validate({
      email, password, verifyPassword
    }, {
      email: { presence: { allowEmpty: false } },
      password: { presence: { allowEmpty: false } },
      verifyPassword: {
        presence: { allowEmpty: false },
        equality: "password"
      }
    });

    if (notValid) {
      const firstKey = Object.keys(notValid)[0];
      const firstError = notValid[firstKey][0];
      return setError(firstError);
    }

    try {
      setError("");
      setLoading(true);
      await signUp(email, password);
      return await router.push(routes.DASHBOARD);
    } catch (e) {
      setError("Failed to register");
    }

    setLoading(false);
  }

  return (
    <>
      <NextSeo
        title="Goal Planner - Register"
      />

      <main className="bg-light min-vh-100 py-4">
        <Container as="section">
          <Row className="justify-content-center">
            <Col xs={12} sm={8} md={6} lg={5} xl={4} xxl={3}>
              <Card as="section">
                <Card.Body>
                  <Card.Title as="h2" className="text-center">Sign Up</Card.Title>
                  <Form onSubmit={e => handleSubmit(e, signUp)}>
                    {error && <Alert variant="danger" role="alert">{error}</Alert>}

                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="text" placeholder="john.smith@example.com" ref={emailRef} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" ref={passwordRef} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="verify-password">
                      <Form.Label>Verify Password</Form.Label>
                      <Form.Control type="password" ref={verifyPasswordRef} />
                    </Form.Group>

                    <div className="d-grid gap-2">
                      <Link href={routes.FORGOT_PASSWORD} passHref>
                        <a>
                          Forgot Password
                        </a>
                      </Link>
                      <Button type="submit" disabled={loading}>Sign Up</Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>

              <div className="text-center d-flex flex-column gap-2 py-2">
                <div>
                  Already have a account?&nbsp;
                  <Link href={routes.LOGIN}>
                    <a>
                      Log in
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

export default Register;

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