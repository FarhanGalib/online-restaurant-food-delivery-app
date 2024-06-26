import QueryProvider from './QueryProvider';
import AuthProvider from './AuthProvider';
import ChakraUIProvider from './ChakraProvider';
import { Outlet } from 'react-router';
import BaseLayout from '../layout/BaseLayout';
import CartProvider from './CartProvider';

const Provider = () => {
  return (
    <ChakraUIProvider>
      <CartProvider>
        <BaseLayout>
          <QueryProvider>
            <AuthProvider>
              <Outlet />
            </AuthProvider>
          </QueryProvider>
        </BaseLayout>
      </CartProvider>
    </ChakraUIProvider>
  );
};

export default Provider;
