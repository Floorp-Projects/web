import { ChakraProvider, extendTheme } from '@chakra-ui/react';
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
  console.log('%cつくったひと%c：http://itta.dev', 'font-size: 1.5em; color: #000;');
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;
