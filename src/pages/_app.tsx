import "bootstrap/dist/css/bootstrap.min.css";
import type { AppContext, AppProps } from "next/app";
import NextApp from "next/app";
import { NextIntlProvider } from "next-intl";
import { DefaultSeo } from "next-seo";
import { AuthProvider } from "@contexts/AuthContext";

type MyAppPros = AppProps & { messages: object };

function MyApp({ Component, messages, pageProps }: MyAppPros) {
  return (
    <NextIntlProvider
      messages={{ ...messages, ...pageProps.messages }}
      formats={{
        dateTime: {
          short: {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          }
        }
      }}
      now={new Date(pageProps.now)}
    >
      <DefaultSeo
        title="Goal Planner"
        description="A quick and easy way to create and plan your goals"
      />

      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </NextIntlProvider>
  );
}

MyApp.getInitialProps = async function getInitialProps(context: AppContext) {
  const { locale } = context.router;

  return {
    ...(await NextApp.getInitialProps(context)),
    messages: require(`../../public/locales/${locale ?? "en-AU"}.json`)
  };
};

export default MyApp;
