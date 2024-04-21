import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Provider from '../providers/Provider';
import Registration from '../pages/auth/Registration';
import Home from '../pages/Home';
import ChakraUIProvider from '../providers/ChakraProvider';
import QueryProvider from '../providers/QueryProvider';
import PageNotFound from '../pages/PageNotFound';
import BaseLayout from '../layout/BaseLayout';
import Branch from '../pages/Branch';
import Cart from '../pages/Cart';
import MyOrders from '../pages/MyOrders';
import ConfirmOrder from '../pages/ConfirmOrder';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Provider />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/branch/:id',
        element: <Branch />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/confirm-order',
        element: <ConfirmOrder />,
      },
      {
        path: '/my-order',
        element: <MyOrders />,
      },
    ],
  },
  {
    path: '/login',
    element: (
      <ChakraUIProvider>
        <QueryProvider>
          <Login />
        </QueryProvider>
      </ChakraUIProvider>
    ),
  },
  {
    path: '/register',
    element: (
      <ChakraUIProvider>
        <Registration />
      </ChakraUIProvider>
    ),
  },
  {
    path: '*',
    element: (
      <ChakraUIProvider>
        <BaseLayout>
          <PageNotFound />
        </BaseLayout>
      </ChakraUIProvider>
    ),
  },
]);

export default function Router() {
  return <RouterProvider router={router}></RouterProvider>;
}
