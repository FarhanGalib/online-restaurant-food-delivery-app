import QueryProvider from './QueryProvider';
import AuthProvider from './AuthProvider';
import { Outlet } from 'react-router';

const Provider = () => {
  return (
    <QueryProvider>
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </QueryProvider>
  );
};

export default Provider;
