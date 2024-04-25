import { SmallAddIcon } from '@chakra-ui/icons';
import {
  Box,
  Card,
  HStack,
  Heading,
  IconButton,
  Image,
  Text,
} from '@chakra-ui/react';

interface PropsInterface {
  foodItem: TFoodItem;
  isDisabled?: boolean;
  handleSheet: (foodItem: TFoodItem) => void;
}
const FoodItemCard = ({
  foodItem,
  isDisabled = false,
  handleSheet,
}: PropsInterface) => {
  return (
    <Card
      display={'flex'}
      flexDir={'row'}
      alignItems={'center'}
      justify={'space-between'}
      mt={3}
      p={3}
      opacity={isDisabled ? 0.3 : 1}
      cursor={isDisabled ? 'not-allowed' : 'initial'}
    >
      <HStack>
        <Image
          h={50}
          w={70}
          objectFit={'cover'}
          src={foodItem.image}
          alt={foodItem.name}
          borderRadius={5}
        />
        <Box>
          <Heading size='sm' textTransform='capitalize'>
            {foodItem.name}
          </Heading>
          <Text>{foodItem.price} tk</Text>
        </Box>
      </HStack>

      <IconButton
        isRound
        size={'sm'}
        aria-label='add'
        icon={<SmallAddIcon />}
        isDisabled={isDisabled}
        onClick={() => {
          handleSheet(foodItem);
        }}
      />
    </Card>
  );
};

export default FoodItemCard;
