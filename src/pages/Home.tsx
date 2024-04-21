import { SearchIcon } from '@chakra-ui/icons';
import { Box, Container, HStack, IconButton, Input } from '@chakra-ui/react';
import BranchCard from '../components/BranchCard';
import { useMutation, useQuery } from '@tanstack/react-query';
import service from '../services';
import { useEffect, useState } from 'react';
import useDebounce from '../hooks/useDebounse';
import { Select, SingleValue } from 'chakra-react-select';
import { useNavigate } from 'react-router';

const Home = () => {
  const [branchesId, setBranchesId] = useState([] as string[]);
  const [branches, setBranches] = useState([] as TBranches);
  const [locations, setLocations] = useState([] as TLocation[]);
  const navigate = useNavigate();
  const { data, isPending, isError } = useQuery({
    queryKey: ['Branches', branchesId],
    queryFn: () => service.getBranches({ branchesId }),
  });

  const {
    data: locationData,
    isPending: isPendingLocations,
    isError: isErrorLocations,
  } = useQuery({
    queryKey: ['Locations'],
    queryFn: () => {
      return service.getLocations();
    },
  });

  useEffect(() => {
    if (!data) return;
    setBranches(data.data.data);
  }, [data]);

  useEffect(() => {
    if (!locationData) return;
    const restructuredLocations: TLocation[] = locationData?.data?.data.map(
      (loc) => {
        return { label: loc.name, value: loc.id, branchesId: loc.branchesId };
      }
    );

    setLocations(restructuredLocations);
  }, [locationData]);

  const handleLocationSelect = (data: SingleValue<TLocation>): void => {
    setBranchesId(data?.branchesId!);
  };

  return (
    <Container>
      <Select
        placeholder='Select Your Location'
        onChange={(data) => handleLocationSelect(data)}
        options={locations}
      />
      <Box mt='5'>
        {!isPending &&
          branches?.map((branch) => (
            <Box
              mb='4'
              key={branch.id}
              onClick={() => navigate(`branch/${branch.id}`)}
              _hover={{ cursor: 'pointer' }}
            >
              <BranchCard branch={branch} />
            </Box>
          ))}
      </Box>
    </Container>
  );
};

export default Home;
