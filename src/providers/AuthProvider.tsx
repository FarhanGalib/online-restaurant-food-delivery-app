import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
export type TAuthContext = {
  token?: string | undefined;
};

const AuthContext = createContext<TAuthContext | null>(null);
const AuthProvider = ({ children }: PropsWithChildren) => {
  const [token, setToken] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setToken('sdfsfdfdsf');
    }, 2000);
  }, []);
  if (!token) return <div>Loading</div>;
  return (
    <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error('Auth Provider is not found!');
  }

  return context;
};

export default AuthProvider;
