import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Container,
  HStack,
  Heading,
  Image,
  Tab,
  TabIndicator,
  TabList,
  Tabs,
} from '@chakra-ui/react';
import service from '../services';
import Sheet from 'react-modal-sheet';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import FoodItemCard from '../components/FoodItemCard';

export const Branch = () => {
  const [categoryId, setCategoryId] = useState('1');
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [foodItem, setFootItem] = useState({} as TFoodItem);
  const [foodList, setFoodList] = useState([] as TFoodItem[]);
  const { id } = useParams();

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

  useEffect(() => {
    if (!foodItemsData) return;
    setFoodList(foodItemsData.data.data);
  }, [foodItemsData]);

  const handleTabs = (id: number) => {
    let selectedCategoryId = id + 1;
    setCategoryId(selectedCategoryId.toString());
  };

  const handleSheet = (foodItem: TFoodItem) => {
    setSheetOpen(true);
    setFootItem(foodItem);
  };


  return (
    <Box>
      <Card variant='none'>
        <CardHeader p={0}>
          <Image
            h={150}
            w='full'
            objectFit='cover'
            src={branchData?.data.data.image}
            alt=''
          />
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
                foodItem={food}
                handleSheet={handleSheet}
              />
            ))}
          </Tabs>
        </CardBody>
      </Card>
      <Sheet
        isOpen={isSheetOpen}
        disableScrollLocking={true}
        onClose={() => {
          setSheetOpen(false);
        }}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <Image
              src={foodItem?.image}
              height={150}
              objectFit={'cover'}
            ></Image>
            <Container>
              <HStack justify={'space-between'} align={'center'} mt={3}>
                <Heading size={'sm'} textTransform={'capitalize'}>
                  {foodItem?.name}
                </Heading>
                <Heading size={'sm'}> {foodItem.price} TK</Heading>
              </HStack>
            </Container>
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </Box>
  );
};
