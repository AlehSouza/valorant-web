/* eslint-disable react-hooks/rules-of-hooks */
import { extendTheme } from '@chakra-ui/react';
import { StyleFunctionProps } from '@chakra-ui/styled-system';
import { useColorModeValue } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  maxWidth: '1200px',
  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        backgroundColor:'#0c0d0e',
        text:  useColorModeValue( '#0c0d0e', '#f1f3f5'),
        scrollBehavior: "smooth",
      },
    }),
  },
});

export default theme
