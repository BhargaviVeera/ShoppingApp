import { ReactNode, createContext, useContext, useState } from 'react';

type AuthContextType = {
  phone: string;
  setPhone: (phone: string) => void;
};

type Props = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType>({
  phone: '',
  setPhone: () => {},
});

export const AuthProvider = ({ children }: Props) => {
  const [phone, setPhone] = useState('');
  return (
    <AuthContext.Provider value={{ phone, setPhone }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
