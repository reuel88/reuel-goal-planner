import type { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo';
import '../styles/globals.css';
import { AuthProvider } from "../contexts/AuthContext";

function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <DefaultSeo
                title="Goal Planner"
                description="A quick and easy way to create and plan your goals"
            />
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </>
    );
}

export default MyApp
