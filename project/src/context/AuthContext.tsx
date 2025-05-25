import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User, mockUsers } from '../data/mockData';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (cpf: string, password: string) => boolean;
  logout: () => void;
  register: (name: string, cpf: string, password: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const isAuthenticated = !!currentUser;

  const login = (cpf: string, password: string): boolean => {
    // Remove any non-numeric characters from CPF
    const normalizedCpf = cpf.replace(/\D/g, '');
    
    const user = mockUsers.find(
      (user) => user.cpf === normalizedCpf && user.password === password
    );

    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const register = (name: string, cpf: string, password: string): boolean => {
    // Remove any non-numeric characters from CPF
    const normalizedCpf = cpf.replace(/\D/g, '');
    
    // Check if user already exists
    const userExists = mockUsers.some((user) => user.cpf === normalizedCpf);
    
    if (userExists) {
      return false;
    }

    // In a real app, this would send data to a backend
    // Here we just simulate adding to our mock data
    const newUser: User = {
      id: (mockUsers.length + 1).toString(),
      name,
      cpf: normalizedCpf,
      password,
      nextWorkout: {
        type: 'Musculação',
        date: '27/05',
        time: '17h'
      },
      workoutsCompleted: 0,
      joinedDate: new Date().toISOString()
    };

    mockUsers.push(newUser);
    return true;
  };

  const value = {
    currentUser,
    isAuthenticated,
    login,
    logout,
    register
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};