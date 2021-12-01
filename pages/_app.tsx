import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import { useEffect } from 'react';
import { APP1_ID } from '../constants';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    (window.fbAsyncInit = function () {
      window.FB.init({
        appId: "417461823192941",
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v12.0',
      });
      window.FB.AppEvents.logPageView();
    }),
      [];
  });

  return (
    <>
      <Component {...pageProps} />
      <Script
        async
        defer
        crossOrigin="anonymous"
        src="https://connect.facebook.net/en_US/sdk.js"
      ></Script>
    </>
  );
}

export default MyApp;
