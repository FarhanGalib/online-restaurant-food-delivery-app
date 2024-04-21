import {
  Accordion,
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Order from '../components/Order';

const MyOrders = () => {
  const [orders, setOrders] = useState<TOrder[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [orderId, setOrderId] = useState<TId | undefined>();
  const toast = useToast();

  const fetchOrders = () => {
    const ordersString = localStorage.getItem('foodAppOrder');
    let orders;
    if (ordersString) {
      orders = JSON.parse(ordersString);
      setOrders(orders);
    }
  };

  useEffect(() => fetchOrders(), []);

  const handleModal = (id: TId) => {
    setModalOpen((prevVal) => !prevVal);
    setOrderId(id);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  const handleCancelOrder = () => {
    const index = orders.findIndex((order) => order.id === orderId);
    setOrders((prev) => {
      prev.splice(index, 1);
      localStorage.setItem('foodAppOrder', JSON.stringify(prev));
      return [...prev];
    });
    handleClose();
    toast({
      title: 'Successfully Canaled The Order!',
      position: 'top',
      duration: 1500,
      status: 'success',
      isClosable: true,
    });
  };

  return (
    <Box>
      <Heading size={'md'} mb={3}>
        Orders
      </Heading>
      {orders && orders.length > 0 ? (
        orders.map((order) => (
          <Accordion key={order.id} allowMultiple>
            <Order order={order} handleModal={handleModal} />
          </Accordion>
        ))
      ) : (
        <Text textAlign={'center'}>No Order Found</Text>
      )}
      <Modal onClose={handleClose} isOpen={isModalOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cancel Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure want to delete this order?</ModalBody>
          <ModalFooter gap={2}>
            <Button onClick={handleCancelOrder} colorScheme='red'>
              Yes, Delete
            </Button>
            <Button onClick={handleClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default MyOrders;
