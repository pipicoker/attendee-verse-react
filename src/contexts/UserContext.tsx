import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from '@/lib/axios';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'organizer' | 'attendee';
}

interface UserContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  loading: boolean;
}

const UserContext = createContext<UserContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  loading: true,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = (userData: User) => {
    setUser(userData);
     localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  };

  useEffect(() => {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  if (token && storedUser) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setUser(JSON.parse(storedUser)); // ✅ Use local copy
    setLoading(false);
  } else if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/profile`)
      .then(res => {
        const u = res.data.user;
        const userObj: User = {
          id: u._id,
          name: u.name,
          email: u.email,
          role: u.role,
          avatar: u.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.email}`,
        };
        setUser(userObj);
        localStorage.setItem("user", JSON.stringify(userObj)); // ✅ Store for next refresh
      })
      .catch(() => {
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
      })
      .finally(() => setLoading(false));
  } else {
    setLoading(false);
  }
}, []);


  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
