import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Card,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import service from '../services';
import { orderStatus } from '../const';
interface OrderProps {
  order: TOrder;
  handleModal: (id: TId) => void;
}
const Order = ({ order, handleModal }: OrderProps) => {
  const {
    data: branchData,
    isPending: isBranchDataPending,
    isError: isBranchDataError,
  } = useQuery({
    queryKey: ['branch', order.orderedItems.branchId],
    queryFn: () => service.getBranch(order.orderedItems.branchId!),
    enabled: !!order.orderedItems.branchId,
  });

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box as='span' flex='1' textAlign='left'>
            <Text fontWeight={'bold'}>{branchData?.data.data.branchName}</Text>
            <Text>Status: {order.status}</Text>
            <Text>Total Items: {order.totalItems}</Text>
            <Text>Total Amount:{order.totalAmount} TK</Text>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        {order.orderedItems.cart.map((food) => (
          <Card
            key={food.item.id}
            mt={3}
            p={2}
            display={'flex'}
            flexDir={'row'}
            gap={2}
            align={'center'}
          >
            <Image
              w={'4rem'}
              h={'4rem'}
              src={food.item.image}
              objectFit={'cover'}
              borderRadius={'md'}
            />
            <VStack align={'left'}>
              <Text textTransform={'capitalize'} fontWeight={'bold'}>
                {food.item.name}
              </Text>
              <Text fontSize={'small'}>
                {food.quantity} X {food.item.price} Tk ={' '}
                {food.quantity * food.item.price} TK
              </Text>
            </VStack>
          </Card>
        ))}
        {orderStatus.PENDING === 'Pending' && (
          <Button w={'full'} mt={3} onClick={() => handleModal(order.id)}>
            Cancel Order
          </Button>
        )}
      </AccordionPanel>
    </AccordionItem>
  );
};

export default Order;
