import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import service from '../../services';
import { useMutation } from '@tanstack/react-query';

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TAuth>();

  const { data, isPending, isError, mutate } = useMutation({
    mutationFn: (payload: TAuth) => service.authenticate(payload),
  });

  const onSubmit: SubmitHandler<TAuth> = (data) => {
    mutate(data);
  };

  return (
    <Container h={'100vh'}>
      <Box as='form' h='full' onSubmit={handleSubmit(onSubmit)}>
        <VStack h={'full'} justify={'center'} align={'center'} spacing={'1rem'}>
          <FormControl isInvalid={!!errors?.email}>
            <Input
              placeholder='Email or phone no'
              type='email'
              {...register('email', { required: true })}
            />
            <FormErrorMessage>
              {errors.email && 'Email is required'}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors?.password}>
            <Input
              placeholder='Password'
              type='password'
              {...register('password', {
                required: true,
              })}
            />
            <FormErrorMessage>
              {errors.password && 'Password is required'}
            </FormErrorMessage>
          </FormControl>
          <Button type='submit'>SUBMIT</Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default Login;
