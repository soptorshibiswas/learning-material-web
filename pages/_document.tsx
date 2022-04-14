import Document, { Html, Head, Main, NextScript } from "next/document";
import React from "react";
import { ServerStyleSheet } from "styled-components";

React.useLayoutEffect = React.useEffect;
class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: any) => (props: any) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="bn" translate="no">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Baloo+Da+2:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />

          <link rel="icon" href="/images/logo.ico" sizes="32x32" />

          <meta name="referrer" content="no-referrer" />

          <meta
            name="description"
            content="Online learning material | Learn more"
          />
          <meta name="theme-color" content="#0E5A49" />

          <meta name="robots" content="index, follow" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
