// /pages/_document.js
import React from 'react';
import Document, {Head, Html, Main, NextScript} from 'next/document';

class MyDocument extends Document {


  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="apple-touch-icon" sizes="57x57" href="/icon/apple-icon-57x57.png"/>
          <link rel="apple-touch-icon" sizes="60x60" href="/icon/apple-icon-60x60.png"/>
          <link rel="apple-touch-icon" sizes="72x72" href="/icon/apple-icon-72x72.png"/>
          <link rel="apple-touch-icon" sizes="76x76" href="/icon/apple-icon-76x76.png"/>
          <link rel="apple-touch-icon" sizes="114x114" href="/icon/apple-icon-114x114.png"/>
          <link rel="apple-touch-icon" sizes="120x120" href="/icon/apple-icon-120x120.png"/>
          <link rel="apple-touch-icon" sizes="144x144" href="/icon/apple-icon-144x144.png"/>
          <link rel="apple-touch-icon" sizes="152x152" href="/icon/apple-icon-152x152.png"/>
          <link rel="apple-touch-icon" sizes="180x180" href="/icon/apple-icon-180x180.png"/>
          <link rel="icon" type="image/png" sizes="192x192" href="/icon/android-icon-192x192.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/icon/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="96x96" href="/icon/favicon-96x96.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/icon/favicon-16x16.png"/>
          <link rel="manifest" href="/icon/manifest.json"/>
          <meta name="msapplication-TileColor" content="#ffffff"/>
          <meta name="msapplication-TileImage" content="/icon/ms-icon-144x144.png"/>
          <meta name="theme-color" content="#ffffff"/>
          <meta charSet="utf-8"/>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
          <meta name="viewport"
                content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"/>
          <meta name="description"
                content="Calories tracker is a web application for helping you keep track of nutrition intakes."/>
          <meta name="keywords" content="Calories, Health, Food"/>
          <meta name="theme-color" content="red"/>
          <meta name="mobile-web-app-capable" content="yes"/>
          <meta name="apple-mobile-web-app-title" content="Calories Tracker"/>
          <meta name="apple-mobile-web-app-capable" content="yes"/>
          <meta name="apple-mobile-web-app-status-bar-style" content="default"/>
          <meta name="application-name" content="Calories Tracker"/>
          <meta name="msapplication-tooltip"
                content="Calories tracker is a web application for helping you keep track of nutrition intakes."/>
          <meta name="msapplication-starturl" content="/"/>
          <link href="/fonts/style.css" rel="stylesheet"/>
          <link href="/css/custom.css" rel="stylesheet"/>
          <link href="touch-icon-iphone.png" rel="apple-touch-icon"/>
          <link href="touch-icon-ipad.png" rel="apple-touch-icon" sizes="76x76"/>
          <link href="touch-icon-iphone-retina.png" rel="apple-touch-icon" sizes="120x120"/>
          <link href="touch-icon-ipad-retina.png" rel="apple-touch-icon" sizes="152x152"/>
          <link href="icon-192x192.png" rel="icon" sizes="192x192"/>
          <link href="icon-128x128.png" rel="icon" sizes="128x128"/>
        </Head>
        <body>

        <Main/>
        <NextScript/>
        </body>
      </Html>
    );
  }
}

export default MyDocument;