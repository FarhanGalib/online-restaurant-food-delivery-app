import { StarIcon } from '@chakra-ui/icons';
import {
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Icon,
  Image,
  Text,
} from '@chakra-ui/react';
import { isTimeInRange } from '../utils';

interface BranchCardProps {
  branch: TBranch;
}

const BranchCard = ({ branch }: BranchCardProps) => {
  const currentDay = new Date();
  const openTime =
    branch.open[Object.keys(branch.open)[currentDay.getDay()] as TDay];

  const [isOpen, startTimeStr, endTimeStr] = isTimeInRange(openTime);

  return (
    <Card overflow='hidden' variant='outline'>
      <CardHeader p='0'>
        <Image
          height={150}
          width={'100%'}
          src={branch.image}
          alt={branch.branchName}
          overflow='hidden'
          objectFit={'cover'}
        />
      </CardHeader>
      <CardBody pt='3'>
        <HStack justify='space-between'>
          <Heading size='sm'>{branch.branchName}</Heading>
          <HStack>
            <Icon as={StarIcon} color='yellow.400' />
            <Text>{branch.ratings}</Text>
          </HStack>
        </HStack>
        <Text>{branch.address}</Text>
        <Text>
          <Text as='b' color={isOpen ? 'green' : 'red'}>
            {isOpen ? 'Open ⋅ ' : 'Closed ⋅ '}
          </Text>
          {isOpen ? `Closes at ${endTimeStr}` : `Opens at ${startTimeStr}`}
        </Text>
      </CardBody>
    </Card>
  );
};

export default BranchCard;
