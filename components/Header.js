import Head from 'next/head';

const Header = () => {
  return (
    <Head>
      <title>Погода</title>
      <meta name="description" content="Прогноз погоды городов" />
      <link rel="icon" href="/favicon.svg" />
    </Head>
  );
};

export default Header;
