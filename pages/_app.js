import { ChakraProvider, extendTheme } from '@chakra-ui/react';

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
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;
