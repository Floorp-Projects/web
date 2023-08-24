import { appWithTranslation } from 'next-i18next';
import nextI18NextConfig from '../next-i18next.config.js';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { useEffect } from 'react';
import './styles.css';

const theme = extendTheme({
  components: {
    Link: {
      baseStyle: {
        color: 'blue.500',
      },
    },
    Button: {
      baseStyle: {
        color: 'black',
        textDecoration: 'none!important',
      },
    },
  },
});

function App({ Component, pageProps }) {
  useEffect(() => {
    console.log(
      '%cDeveloped by http://itta.dev',
      'font-size: 1.5em; color: #000; font-style: italic; padding: 20px'
    );
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default appWithTranslation(App, nextI18NextConfig);
