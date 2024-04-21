import {
  Box,
  Card,
  HStack,
  IconButton,
  Image,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';
import { MinusIcon, SmallAddIcon } from '@chakra-ui/icons';
import { useState } from 'react';
interface CartItemProps {
  product: TCartFoodItem;
  tempCart: TCartFoodItem[] | undefined;
  handleQuantity: (type: TType, id: TId) => void;
}
const CartItem = ({ product, tempCart, handleQuantity }: CartItemProps) => {
  const { id, name, price, image } = product.item;
  const { quantity } = product;
  const [itemQuantity, setItemQuantity] = useState<number>(quantity);

  const handleItemQuantity = (type: TType, id: TId) => {
    handleQuantity(type, id);
    if (type === 'PLUS') {
      setItemQuantity((quantity) => quantity + 1);
    } else {
      setItemQuantity((quantity) => quantity - 1);
    }
  };

  return (
    <HStack key={id} justify={'space-between'} mt={4}>
      <HStack gap={3}>
        <Image
          src={image}
          height={50}
          width={50}
          objectFit={'cover'}
          borderRadius={'md'}
          overflow={'hidden'}
        />
        <VStack alignItems={'start'}>
          <Text>{name}</Text>
          <Text fontSize={'sm'}>
            {quantity} X {price} tk = {quantity * price} tk
          </Text>
        </VStack>
      </HStack>
      <HStack>
        <IconButton
          aria-label='minus'
          size={'sm'}
          colorScheme='red'
          icon={<MinusIcon />}
          onClick={() => handleItemQuantity('MINUS', id)}
        />
        <Input
          w={'50px'}
          size={'sm'}
          textAlign={'center'}
          type='number'
          readOnly
          value={itemQuantity}
          onChange={(e) => setItemQuantity(Number(e.target.value))}
        />
        <IconButton
          aria-label='plus'
          size={'sm'}
          colorScheme='red'
          icon={<SmallAddIcon />}
          onClick={() => handleItemQuantity('PLUS', id)}
        />
      </HStack>
    </HStack>
  );
};

export default CartItem;
