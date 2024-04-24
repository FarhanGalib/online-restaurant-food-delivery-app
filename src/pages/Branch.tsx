import { MinusIcon, SmallAddIcon } from '@chakra-ui/icons';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  HStack,
  Heading,
  IconButton,
  Image,
  Input,
  Stack,
  Tab,
  TabIndicator,
  TabList,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import Sheet from 'react-modal-sheet';
import { useParams } from 'react-router';
import FoodItemCard from '../components/FoodItemCard';
import SingleItems from '../components/SingleItems';
import { useCartContext } from '../providers/CartProvider';
import service from '../services';
import { getCurrentTimeInMinutes, parseTimeInMinutes } from '../utils';
import { log } from 'console';

const Branch = () => {
  const [categoryId, setCategoryId] = useState('1');
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [foodItem, setFootItem] = useState({} as TFoodItem);
  const [foodList, setFoodList] = useState([] as TFoodItem[]);
  const [itemQuantity, setItemQuantity] = useState(0);
  const [tempCart, setTempCart] = useState([] as TCartFoodItem[]);
  const [tempCartItem, setTempCartItem] = useState<TCartFoodItem | undefined>();
  const [isBranchClosed, setBranchClosed] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { id } = useParams();
  const { cart, handleAddToCart } = useCartContext();

  const {
    data: branchData,
    isPending: isBranchDataPending,
    isError: isBranchDataError,
  } = useQuery({
    queryKey: ['branch', id],
    queryFn: () => service.getBranch(id!),
    enabled: !!id,
  });

  const {
    data: foodCategories,
    isPending: isFoodCategories,
    isError: isFoodCategoriesError,
  } = useQuery({
    queryKey: ['foodCategories'],
    queryFn: () => service.getFoodCategories(),
    enabled: !!id,
  });

  const {
    data: foodItemsData,
    isPending: isFoodItemsDataPending,
    isError: isFoodItemsDataError,
  } = useQuery({
    queryKey: ['foodItems', categoryId],
    queryFn: () => service.getFoodItems(categoryId),
    enabled: !!categoryId,
  });

  const {
    data: dipsData,
    isPending: isDipsDataPending,
    isError: isDipsDataError,
  } = useQuery({
    queryKey: ['dipsItems'],
    queryFn: () => service.getFoodItems('2'),
  });

  useEffect(() => {
    if (!foodItemsData) return;
    setFoodList(foodItemsData.data.data);
  }, [foodItemsData]);

  useEffect(() => {
    handleBranchClosing();
  }, [branchData]);

  // useEffect(() => {
  //   const cartString = localStorage.getItem('foodAppCart');
  //   if (cartString) setTempCart(JSON.parse(cartString));
  // }, []);

  const getCurrentOpeningClosingStringFromData = (
    currentTime = new Date(),
    openingTimes: Record<TDay, string>
  ) => {
    return openingTimes[
      Object.keys(openingTimes)[currentTime.getDay()] as TDay
    ];
  };

  const handleBranchClosing = () => {
    if (!branchData) return;
    const currentTime = new Date();
    const currentTimeInMinute = getCurrentTimeInMinutes(currentTime);
    const openingClosingTimeString = getCurrentOpeningClosingStringFromData(
      currentTime,
      branchData?.data.data.open!
    );
    const [startingTimeInMinute, closingTimeInMinute] = openingClosingTimeString
      .split('-')
      .map((time) => parseTimeInMinutes(time));

    if (currentTimeInMinute < startingTimeInMinute) {
      setBranchClosed(true);
      setIsClosing(false);
    } else if (
      currentTimeInMinute >= closingTimeInMinute - 30 &&
      currentTimeInMinute < closingTimeInMinute
    ) {
      setBranchClosed(false);
      setIsClosing(true);
      console.log('last 30 mins');
    } else {
      setBranchClosed(false);
      setIsClosing(false);
    }
    console.log(currentTimeInMinute, startingTimeInMinute, closingTimeInMinute);
  };

  const handleTabs = (id: number) => {
    let selectedCategoryId = id + 1;
    setCategoryId(selectedCategoryId.toString());
  };

  const handleSheet = (foodItem: TFoodItem) => {
    setSheetOpen(true);
    setFootItem(foodItem);
  };

  const handleCloseSheet = () => {
    setSheetOpen(false);
    setItemQuantity(0);
    setTempCartItem(undefined);
    setTempCart([]);
  };

  const handleTotalAmount = (type: TType) => {
    const itemQuantityCopy = itemQuantity;
    let tempCartCopy = tempCart;
    let tempCartItemCopy = tempCartItem;

    if (type === 'PLUS') {
      if (tempCartCopy.length <= 0) {
        tempCartItemCopy = { item: foodItem, quantity: itemQuantityCopy + 1 };
        setTempCartItem(tempCartItemCopy);
        tempCartCopy.push(tempCartItemCopy);
      } else {
        if (tempCartItemCopy) {
          tempCartItemCopy = {
            ...tempCartItemCopy,
            quantity: itemQuantityCopy + 1,
          };
          tempCartCopy = [tempCartItemCopy];
        }
      }
      setItemQuantity((val) => val + 1);
    } else if (type === 'MINUS' && itemQuantity > 0) {
      let index;
      const existedItem = tempCartCopy.find((item, i) => {
        index = i;
        return item.item.id === id;
      });
      if (itemQuantity === 1) {
        if (existedItem && index === 0) {
          tempCartCopy.splice(index, 1);
        }
      } else {
        tempCartItemCopy = { item: foodItem, quantity: itemQuantityCopy - 1 };
        setTempCartItem(tempCartItemCopy);
        if ((index || index === 0) && existedItem) {
          tempCartCopy[index].quantity -= 1;
        }
      }
      setItemQuantity((val) => val - 1);
    }
    setTempCart(tempCartCopy);
  };

  const handleAddToTheCart = () => {
    id && handleAddToCart(id, tempCart);
    handleCloseSheet();
  };

  return (
    <Box>
      {/* {getIsBranchClosing() && (
        <Box
          pos={'absolute'}
          bg={'black'}
          top={'-1rem'}
          bottom={'-1rem'}
          left={'-1rem'}
          right={'-1rem'}
          zIndex={1}
          opacity={0.3}
          cursor={'not-allowed'}
        />
      )} */}
      <Card variant='none'>
        <CardHeader p={0}>
          <Image
            h={150}
            w='full'
            objectFit='cover'
            src={branchData?.data.data.image}
            alt=''
          />

          {(isClosing || isBranchClosed) && (
            <Alert status='error'>
              <AlertIcon />
              <AlertTitle>
                {isClosing &&
                  'Restaurant is closing soon. Not receiving any orders.'}
                {isBranchClosed && 'Restaurant is closed.'}
              </AlertTitle>
            </Alert>
          )}
        </CardHeader>
        <CardBody p='0' pt='3'>
          <Heading size={'sm'}>{branchData?.data.data.branchName}</Heading>
          <Tabs position='relative' variant='line' mt='3' onChange={handleTabs}>
            <TabList>
              {foodCategories?.data.data.map((category) => (
                <Tab
                  key={category.id}
                  _selected={{ color: '#F4051D' }}
                  fontWeight='bold'
                >
                  {category.name}
                </Tab>
              ))}
            </TabList>
            <TabIndicator
              mt='-5px'
              height='5px'
              bg='#F4051D'
              borderRadius='3px'
            />

            {foodList.map((food) => (
              <FoodItemCard
                key={food.id}
                isDisabled={true}
                foodItem={food}
                handleSheet={handleSheet}
              />
            ))}
          </Tabs>
        </CardBody>
      </Card>
      <Sheet isOpen={isSheetOpen} onClose={handleCloseSheet}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <Box pos={'relative'} w={'full'} h={'full'}>
              <Image
                src={foodItem?.image}
                height={150}
                objectFit={'cover'}
                w={'full'}
              />
              <Container>
                <HStack justify={'space-between'} align={'center'} mt={3}>
                  <Heading size={'sm'} textTransform={'capitalize'}>
                    {foodItem?.name}
                  </Heading>
                  <Heading size={'sm'}> {foodItem.price} TK</Heading>
                </HStack>
                <HStack align={'center'} justify={'space-between'} mt={5}>
                  <Text>Add Item</Text>
                  <HStack>
                    <IconButton
                      aria-label='minus'
                      size={'sm'}
                      colorScheme='red'
                      icon={<MinusIcon />}
                      isDisabled={!itemQuantity}
                      onClick={() => handleTotalAmount('MINUS')}
                    />
                    <Input
                      w={'80px'}
                      size={'sm'}
                      textAlign={'center'}
                      type='number'
                      value={itemQuantity}
                      onChange={({ target }) =>
                        setItemQuantity(Number(target.value))
                      }
                    />
                    <IconButton
                      aria-label='plus'
                      size={'sm'}
                      colorScheme='red'
                      icon={<SmallAddIcon />}
                      onClick={() => handleTotalAmount('PLUS')}
                    />
                  </HStack>
                </HStack>

                <Box mt={6}>
                  <Heading size={'sm'} mb={4}>
                    Frequently Order With
                  </Heading>
                  <Stack overflow={'auto'} h={'calc(100vh - 400px)'} gap={3}>
                    {dipsData?.data?.data.map((food) => (
                      <SingleItems
                        key={food.id}
                        food={food}
                        cart={tempCart}
                        setCart={setTempCart}
                        isFoodAdded={!!itemQuantity}
                      />
                    ))}
                  </Stack>
                </Box>
              </Container>
              <Button
                pos={'absolute'}
                colorScheme='red'
                fontWeight={'bold'}
                bottom={0}
                zIndex={1}
                w='full'
                isDisabled={!itemQuantity}
                onClick={handleAddToTheCart}
              >
                Add To Cart
              </Button>
            </Box>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </Box>
  );
};

export default Branch;
