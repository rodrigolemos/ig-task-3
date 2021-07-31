import { ReactElement } from 'react';
import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render(): ReactElement {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
          <meta name="theme-color" content="#1A1D23" />
          <title>Space Travelling by Rodrigo Lemos</title>
        </Head>
        <Main />
        <NextScript />
      </Html>
    );
  }
}
