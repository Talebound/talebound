import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
import { getCssText } from '../styles/stitches.config';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const cache = createCache();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => (
          <StyleProvider cache={cache}>
            <App {...props} />
          </StyleProvider>
        ),
      });

    const initialProps = await Document.getInitialProps(ctx);
    const antdStyle = extractStyle(cache, true);

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
          <style id="antd" dangerouslySetInnerHTML={{ __html: antdStyle }} />
        </>
      ),
    };
  }

  // static async getInitialProps(ctx: DocumentContext) {
  //   const cache = createCache();
  //   const initialProps = await Document.getInitialProps(ctx);
  //   return {
  //     ...initialProps,
  //     cache: cache,
  //     styles: React.Children.toArray([initialProps.styles]),
  //   };
  // }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/assets/logo/logo-v1-64.png" type="image/svg+xml" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin={undefined} />
          <link
            href="https://fonts.googleapis.com/css2?family=Astloch:wght@700&family=Cambay:ital,wght@0,400;0,700;1,400;1,700&family=Gudea:wght@400;700&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,400&display=swap"
            rel="stylesheet"
          />
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
