import { appWithTranslation } from 'next-i18next';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { useEffect } from 'react';
import BuiltYearProvider from 'hooks/useBuiltYear';
import './styles.css';

function App({ Component, builtYear, pageProps }) {
  useEffect(() => {
    console.log(
      '%cCreated by http://itta.dev',
      'font-size: 1.5em; color: #000; font-style: italic; padding: 20px'
    );
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <BuiltYearProvider value={builtYear}>
        <Component {...pageProps} />
      </BuiltYearProvider>
    </ChakraProvider>
  );
}

export async function getStaticProps(context) {
  return {
    props: {
      builtYear: new Date().getFullYear(),
    },
  };
}

export default appWithTranslation(App);
