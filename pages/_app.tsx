import '../styles/globals.scss';
import Head from 'next/head';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Rate Your Hotel!</title>
        <meta name="description" content="My Museum - App test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
