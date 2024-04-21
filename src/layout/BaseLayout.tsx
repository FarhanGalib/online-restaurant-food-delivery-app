import { Box, Container, Image, Text } from '@chakra-ui/react';
import React, { PropsWithChildren, useEffect } from 'react';
import styles from './BaseLayout.module.css';
import { useCartContext } from '../providers/CartProvider';
import { useNavigate } from 'react-router';

const BaseLayout = ({ children }: PropsWithChildren) => {
  const { cart } = useCartContext();
  const navigate = useNavigate();

  console.log('cart from baseLayout = ', cart);

  const getTotalItem = () => {
    return cart?.cart.reduce((total, item) => item.quantity + total, 0) || '0';
  };

  return (
    <Box h='100vh'>
      <Box h='3rem' bg={'primary'} pos='relative' zIndex={1}>
        <Box
          h={'full'}
          mr={'32px'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'end'}
          pos={'relative'}
          _hover={{ cursor: 'pointer' }}
          onClick={() => {
            navigate('/cart');
          }}
        >
          <Image
            height={'30px'}
            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAACPUlEQVR4nO2aPWgUQRiGn0A0kBQWIkgOIWXAdJb+tebPVBIuSLQTsdBKUiqiWKRREtIIgrnWKmlSxDtC7ISQIilsvEatoiYRtFBWBkYIy3E3sztz+WZ3Hnjqb9732N3b7w4ikUgkEvkEJCn/AB+BBeBs0St63aKAo34DRigwtzsUoGwCJygoQwYFKKcpESeBV6kCapSMiy0ug1LRB/xKlXCOkrGRKqBKyXiaKuA7sAu8B1aBZeAl8Bh4ANwCrgOX9aOzAvQTMGOGTwgT1eX0BdgBNoEV4A3wAngE3AdmgUngEnAeGAR6jrOAU/pboasSgixvW0ABWf0NfAWu5ClgUUCQvOZ6elUFBMjjj7yXQkVAiDyqe0ZumgKCZHXJRQE1AUGyes9FAXcFBMnqVRcFjAgIktXTLgroAfYEhLH1Mw5ZERDI1jWXBcwJCGTrvM8FSRKAat/pdUGSCPcCnhckiWD/AgOuC3gmIJip6ocd0QuSxLNvi7wgSQxUazovbAsIZ+INXwUsCghn4rCvAqoCwpmswnp9FVARELCTW3imKSBkO9XG2Cs1ASHb+dB3AXcEhGznNd8FnBH8XrCn31u8MycgbCtv0kVmgA/6sXOcoX/q9fdoN8NHIpHIf6aAhr4ZKev6t/pQ51jxvM3dWf3FJrQ51p9Ip0fUREBzrGkYHOxdQHOsOTQ42EFAc7wcbD+gOdbUDQ62HtAcayYNDjYe0Bwn/yY96pMA52RiQt+FD7Xrnj6Rbs2JRCKRCEXnH2xKsDU8Ew7VAAAAAElFTkSuQmCC'
          ></Image>
          <Box
            pos={'absolute'}
            h={'20px'}
            w={'20px'}
            borderRadius={'full'}
            bg={'greenyellow'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            zIndex={'5'}
            top={'2px'}
            right={'-10px'}
          >
            <Text fontSize={'xs'}>{getTotalItem()}</Text>
          </Box>
        </Box>
      </Box>
      <Container
        h='calc(100% - 3rem)'
        pt={4}
        overflow='auto'
        className={styles.body}
      >
        {children}
      </Container>
    </Box>
  );
};

export default BaseLayout;
