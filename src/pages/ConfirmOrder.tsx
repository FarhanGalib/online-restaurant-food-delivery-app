import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useCartContext } from '../providers/CartProvider';
import { useNavigate } from 'react-router';
import { handleOrderId } from '../utils';
import { orderStatus } from '../const';

const ConfirmOrder = () => {
  const [address, setAddress] = useState<string>('');
  const { cart, getTotalAmount, getTotalItems, updateCart } = useCartContext();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<TAddress>();
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit: SubmitHandler<TAddress> = (data) => {
    setAddress(data.address);
    const ordersString = localStorage.getItem('foodAppOrder');
    let orders;
    if (ordersString) {
      orders = JSON.parse(ordersString);
      const newOrderId = handleOrderId(orders);
      orders.push({
        id: newOrderId,
        status: orderStatus.PENDING,
        deliveryAddress: getValues('address'),
        orderedItems: cart,
        totalItems: getTotalItems(),
        totalAmount: getTotalAmount(),
      });
      localStorage.setItem('foodAppOrder', JSON.stringify(orders));
    } else {
      localStorage.setItem(
        'foodAppOrder',
        JSON.stringify([
          {
            id: '1',
            status: 'Pending',
            deliveryAddress: getValues('address'),
            orderedItems: cart,
            totalItems: getTotalItems(),
            totalAmount: getTotalAmount(),
          },
        ])
      );
    }
    updateCart([]);
    toast({
      title: 'Successfully Placed Order!',
      position: 'top',
      duration: 1500,
      status: 'success',
      isClosable: true,
    });
    navigate('/my-order');
  };

  return (
    <Box as='form' h={'full'} onSubmit={handleSubmit(onSubmit)}>
      <Box h={'calc(100% - 3rem)'}>
        <FormControl isInvalid={!!errors?.address}>
          <Text fontWeight={'bold'}>Address</Text>
          <Textarea
            placeholder='Enter your address'
            {...register('address', { required: true })}
          />
          <FormErrorMessage>
            {errors.address && 'Address is required'}
          </FormErrorMessage>
        </FormControl>

        <Text mt={5} fontWeight={'bold'}>
          Total Items: {getTotalItems() || 0}
        </Text>
        <Text fontWeight={'bold'}>
          Total Amount: {getTotalAmount() || 0} TK
        </Text>
      </Box>
      <Button
        isDisabled={!getTotalItems()}
        w={'full'}
        type='submit'
        colorScheme='red'
      >
        Confirm Order
      </Button>
    </Box>
  );
};

export default ConfirmOrder;
