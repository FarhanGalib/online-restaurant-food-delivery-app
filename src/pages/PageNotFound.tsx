import { Box, HStack, Heading, Text, VStack } from '@chakra-ui/react';

const PageNotFound = () => {
  return (
    <VStack h='full' w='full' justify='center' align='center'>
      <Heading as='h2'>404</Heading>
      <Heading as='h3'>Page Not Found!</Heading>
    </VStack>
  );
};

export default PageNotFound;
