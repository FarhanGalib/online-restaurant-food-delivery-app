import { useState } from 'react';
import { useCartContext } from '../providers/CartProvider';
import {
  Box,
  Button,
  Divider,
  Heading,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';

import CartItem from '../components/CartItem';
import { deepCopy } from '../utils';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import service from '../services';

const Cart = () => {
  const { cart, updateCart } = useCartContext();
  const [newCart, setNewCart] = useState<TCartFoodItem[] | undefined>(
    cart?.cart
  );
  const navigate = useNavigate();
  const toast = useToast();

  const {
    data: branchData,
    isPending: isBranchDataPending,
    isError: isBranchDataError,
  } = useQuery({
    queryKey: ['branch', cart?.branchId],
    queryFn: () => service.getBranch(cart?.branchId!),
    enabled: !!cart?.branchId,
  });

  const handleQuantity = (type: TType, id: TId) => {
    const newCartCopy = deepCopy(newCart!);
    let index: number = -1;
    if (newCartCopy) {
      index = newCartCopy.findIndex((foodItem) => foodItem.item.id === id);
    }

    if (index >= 0) {
      if (type === 'PLUS') {
        newCartCopy[index].quantity += 1;
      } else {
        if (newCartCopy[index].quantity === 1) {
          newCartCopy.splice(index, 1);
        } else {
          newCartCopy[index].quantity -= 1;
        }
      }
      setNewCart(newCartCopy);
      updateCart(newCartCopy!);
    }
  };

  const getTotalAmount = () => {
    if (newCart)
      return newCart.reduce(
        (total, item) => total + item.quantity * item.item.price,
        0
      );
  };

  console.log('newCart', newCart);

  return (
    <Box pos={'relative'} h={'full'} overflow={'hidden'}>
      <Heading size={'md'}> Cart</Heading>
      {newCart && newCart.length > 0 ? (
        <Box h={'calc(100% - 6rem)'} overflow={'auto'} mt={3}>
          <Text fontWeight={'bold'}>{branchData?.data.data.branchName}</Text>
          {newCart?.map((item) => (
            <Box key={item.item.id}>
              <CartItem
                product={item}
                tempCart={newCart}
                handleQuantity={handleQuantity}
              />
              <Divider mt={2} />
            </Box>
          ))}
        </Box>
      ) : (
        <Box textAlign={'center'}>No item added to the cart.</Box>
      )}
      {newCart && newCart.length > 0 && (
        <VStack gap={2} pos={'absolute'} bottom={1} w={'full'} h={'6rem'} p={1}>
          <Divider />
          <Text fontWeight={'bold'}>Total Amount: {getTotalAmount()} TK</Text>
          <Button
            w={'full'}
            colorScheme='red'
            fontWeight={'bold'}
            onClick={() => navigate('/confirm-order')}
          >
            Proceed to checkout
          </Button>
        </VStack>
      )}
    </Box>
  );
};

export default Cart;
