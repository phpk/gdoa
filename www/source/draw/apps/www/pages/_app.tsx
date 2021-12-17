import '../styles/globals.css'
import Head from 'next/head'
import useGtag from 'utils/useGtag'
import { init } from 'utils/sentry'
import type { AppProps } from 'next/app'

import type React from 'react'

init()

const APP_NAME = '白板'
const APP_DESCRIPTION = '协同白板'

function MyApp({ Component, pageProps }: AppProps) {
  useGtag()

  return (
    <>
      <Head>
        <meta name="application-name" content={APP_NAME} />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content={APP_NAME} />
        <meta name="description" content={APP_DESCRIPTION} />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#fafafa" />


        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"
        />

        <link rel="manifest" href="/manifest.json" />
        <link rel="shortcut icon" href="/favicon.ico" />

        <title>协同白板</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
