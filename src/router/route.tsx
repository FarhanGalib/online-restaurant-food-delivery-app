import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Provider from '../providers/Provider';
import Registration from '../pages/auth/Registration';
import Home from '../pages/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Provider />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Registration />,
  },
]);

export default function Router() {
  return <RouterProvider router={router}></RouterProvider>;
}
