import { MinusIcon, SmallAddIcon } from '@chakra-ui/icons';
import {
  HStack,
  IconButton,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';

const SingleItems = ({
  food,
  cart,
  setCart,
  isFoodAdded,
}: {
  food: TFoodItem;
  cart: TCartFoodItem[];
  setCart: Dispatch<SetStateAction<TCartFoodItem[]>>;
  isFoodAdded: boolean;
}) => {
  const [itemQuantity, setItemQuantity] = useState(0);
  const [tempCartItem, setTempCartItem] = useState<TCartFoodItem | undefined>();

  const handleTotalAmount = (type: TType) => {
    let index;
    let copyCart = cart;

    const alreadyExisted =
      cart &&
      cart.find((item, i) => {
        index = i;
        return item.item.id === food.id;
      });

    if (type === 'PLUS') {
      setItemQuantity((val) => val + 1);

      if ((index || index === 0) && alreadyExisted) {
        copyCart[index].quantity += 1;
      } else {
        copyCart = [...copyCart, { item: food, quantity: 1 }];
      }
    }

    if (type === 'MINUS' && itemQuantity > 0) {
      if ((index || index === 0) && alreadyExisted) {
        if (itemQuantity === 1) {
          copyCart.splice(index, 1);
        } else {
          copyCart[index].quantity -= 1;
        }
      }
      setItemQuantity((val) => val - 1);
    }

    setCart(() => copyCart);
  };

  useEffect(() => {
    if (!isFoodAdded) setItemQuantity(0);
  }, [isFoodAdded]);

  return (
    <HStack key={food.id} justify={'space-between'}>
      <HStack gap={3}>
        <Image
          src={food.image}
          height={50}
          width={50}
          objectFit={'cover'}
          borderRadius={'md'}
          overflow={'hidden'}
        />
        <VStack alignItems={'start'}>
          <Text>{food.name}</Text>
          <Text fontSize={'sm'}>{food.price} tk</Text>
        </VStack>
      </HStack>
      <HStack>
        <IconButton
          aria-label='minus'
          size={'sm'}
          colorScheme='red'
          icon={<MinusIcon />}
          isDisabled={!itemQuantity || !isFoodAdded}
          onClick={() => handleTotalAmount('MINUS')}
        />
        <Input
          w={'50px'}
          size={'sm'}
          textAlign={'center'}
          type='number'
          value={itemQuantity}
          isDisabled={!isFoodAdded}
          onChange={({ target }) => setItemQuantity(Number(target.value))}
        />
        <IconButton
          aria-label='plus'
          size={'sm'}
          colorScheme='red'
          icon={<SmallAddIcon />}
          isDisabled={!isFoodAdded}
          onClick={() => handleTotalAmount('PLUS')}
        />
      </HStack>
    </HStack>
  );
};

export default SingleItems;
