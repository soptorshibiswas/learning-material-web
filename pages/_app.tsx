import "../src/assets/styles/globals.css";
import { ThemeProvider } from "styled-components";
import { theme } from "../src/assets/styles/theme";
import Head from "next/head";
import App, { AppInitialProps } from "next/app";
import { ReactElement } from "react";
import AuthContextProvider from "../src/HOC/contexts/AuthContext";
import cookies from "next-cookies";
import { COOKIE_KEYS } from "../shared/types/cookies";
import { IAuthAdmin } from "../shared/types/admin";
import NextNProgress from "nextjs-progressbar";

type AppProps = {
  authenticated: boolean;
  authAdmin: IAuthAdmin | null;
};

class WrappedApp extends App<AppProps> {
  render(): ReactElement {
    const { Component, pageProps, authenticated, authAdmin } = this.props;

    return (
      <AuthContextProvider authenticated={authenticated} admin={authAdmin}>
        <ThemeProvider theme={theme}>
          <Head>
            <title>Online learning Material</title>
          </Head>
          <NextNProgress height={4} color="#0E5A49" />
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthContextProvider>
    );
  }
}

WrappedApp.getInitialProps = async (
  appContext
): Promise<AppInitialProps & AppProps> => {
  let authenticated = false;
  let authAdmin: IAuthAdmin | null = null;

  const allCookies = cookies(appContext.ctx);
  const authToken = allCookies[COOKIE_KEYS.authAccessToken];
  const authAdminCookie = allCookies[COOKIE_KEYS.authAdmin];

  if (authToken && authAdminCookie) {
    authenticated = true;
    authAdmin = authAdminCookie as unknown as IAuthAdmin;
  }

  // console.log(authToken, authAdmin);

  // Call the page's `getInitialProps` and fill `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps, authenticated, authAdmin };
};

export default WrappedApp;
