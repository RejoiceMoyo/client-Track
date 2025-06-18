export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'active' | 'inactive' | 'paused';
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in months
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ClientService {
  id: string;
  clientId: string;
  serviceId: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'expired' | 'paused' | 'terminated';
  renewalDate: string;
  lastReminderSent?: string;
  createdAt: string;
  updatedAt: string;
  client?: Client;
  service?: Service;
} 