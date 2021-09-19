import type { GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { SyntheticEvent, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import routes from "@constants/routes.json";
import BasicLayout from "@modules/layouts/BasicLayout";
import cheerio from "cheerio";


const Home: NextPage<{ links: string[], splice: number }> = (props) => {
  const t = useTranslations("HOME");
  const [count, setCount] = useState(0);

  function handleClick(e: SyntheticEvent) {
    e.preventDefault();
    console.log(props.splice + count);

    window.open(props.links[count], "_bank");

    setCount(count + 1);
  }

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
          <Button onClick={handleClick}>Careers</Button>
        </Container>
      </section>
    </BasicLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const splice = 47;

    const response = await fetch("https://australianfintech.com.au/directory-all/")
      .then(res => res.text())
      .then(html => {
        const $ = cheerio.load(html);
        return $("h3[class*=title] > a").contents().map(function() {
          return `https://www.google.com/search?q=${encodeURIComponent($(this).text())}+career`;
        }).splice(splice);
      });

    return {
      props: { links: [...response], splice: splice }
    };
  } catch (e) {

  }

  return { props: {} };
};

export default Home;
