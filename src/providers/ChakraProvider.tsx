import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme/chakra-theme';

const ChakraUIProvider = ({ children }: React.PropsWithChildren) => {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

export default ChakraUIProvider;
