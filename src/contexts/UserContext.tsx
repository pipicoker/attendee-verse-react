
import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'customer' | 'agent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface UserContextType {
  user: User;
  toggleRole: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'customer'
  });

  const toggleRole = () => {
    setUser(prev => ({
      ...prev,
      role: prev.role === 'customer' ? 'agent' : 'customer',
      name: prev.role === 'customer' ? 'Agent Smith' : 'John Doe',
      email: prev.role === 'customer' ? 'agent.smith@company.com' : 'john.doe@example.com'
    }));
  };

  return (
    <UserContext.Provider value={{ user, toggleRole }}>
      {children}
    </UserContext.Provider>
  );
};
