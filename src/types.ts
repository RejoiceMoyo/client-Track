export interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  type: ClientType;
  status: ClientStatus;
  services: number;
  totalRevenue: number;
  lastContact: string;
}

export type ClientType = 'Individual' | 'Business' | 'Enterprise';

export type ClientStatus = 'Active' | 'Inactive' | 'Prospect';

export interface ClientFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  type: ClientType;
  status: ClientStatus;
}

export interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  client?: Client;
  mode: 'create' | 'edit';
  onSubmit: (clientData: ClientFormData) => void;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  duration: string;
  category: string;
}

export interface Renewal {
  id: number;
  clientId: number;
  clientName: string;
  serviceId: number;
  serviceName: string;
  currentPrice: number;
  renewalPrice: number;
  renewalDate: string;
  status: RenewalStatus;
  autoRenew: boolean;
  notes?: string;
  lastRenewalDate?: string;
  nextRenewalDate: string;
}

export type RenewalStatus = 'Upcoming' | 'Due' | 'Overdue' | 'Completed' | 'Cancelled';

export interface RenewalFormData {
  clientId: number;
  serviceId: number;
  currentPrice: number;
  renewalPrice: number;
  renewalDate: string;
  status: RenewalStatus;
  autoRenew: boolean;
  notes: string;
  nextRenewalDate: string;
}

export interface RenewalModalProps {
  isOpen: boolean;
  onClose: () => void;
  renewal?: Renewal;
  mode: 'create' | 'edit';
  onSubmit: (renewalData: RenewalFormData) => void;
}

export interface Reminder {
  id: number;
  clientId: number;
  clientName: string;
  title: string;
  description: string;
  dueDate: string;
  priority: ReminderPriority;
  status: ReminderStatus;
  type: ReminderType;
  category: string;
  isCompleted: boolean;
  completedDate?: string;
  notes?: string;
  recurring?: boolean;
  recurringPattern?: string;
}

export type ReminderPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export type ReminderStatus = 'Pending' | 'In Progress' | 'Completed' | 'Overdue' | 'Cancelled';

export type ReminderType = 'Follow-up' | 'Meeting' | 'Payment' | 'Renewal' | 'Task' | 'General';

export interface ReminderFormData {
  clientId: number;
  title: string;
  description: string;
  dueDate: string;
  priority: ReminderPriority;
  status: ReminderStatus;
  type: ReminderType;
  category: string;
  isCompleted: boolean;
  notes: string;
  recurring: boolean;
  recurringPattern: string;
}

export interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  reminder?: Reminder;
  mode: 'create' | 'edit';
  onSubmit: (reminderData: ReminderFormData) => void;
}

export interface Invoice {
  id: number;
  clientId: number;
  clientName: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  dueDate: string;
  issueDate: string;
  services: Service[];
}

export interface Project {
  id: number;
  clientId: number;
  clientName: string;
  name: string;
  description: string;
  status: 'Active' | 'Completed' | 'On Hold' | 'Cancelled';
  startDate: string;
  endDate?: string;
  budget: number;
  progress: number;
}

export interface ProjectFormData {
  clientId: number;
  name: string;
  description: string;
  status: 'Active' | 'Completed' | 'On Hold' | 'Cancelled';
  startDate: string;
  endDate: string;
  budget: number;
  progress: number;
}

export interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: Project;
  mode: 'create' | 'edit';
  onSubmit: (projectData: ProjectFormData) => void;
}

export interface Contact {
  id: number;
  clientId: number;
  type: 'Email' | 'Phone' | 'Meeting' | 'Note';
  date: string;
  description: string;
  outcome?: string;
}

export interface DashboardStats {
  totalClients: number;
  activeClients: number;
  totalRevenue: number;
  pendingInvoices: number;
  recentContacts: number;
}

export interface FilterOptions {
  searchTerm: string;
  statusFilter: string;
  typeFilter: string;
}

// Report-related interfaces
export interface RevenueReport {
  period: string;
  totalRevenue: number;
  paidRevenue: number;
  pendingRevenue: number;
  overdueRevenue: number;
  clientCount: number;
  invoiceCount: number;
}

export interface ClientReport {
  period: string;
  totalClients: number;
  newClients: number;
  activeClients: number;
  inactiveClients: number;
  prospectClients: number;
  averageRevenuePerClient: number;
}

export interface ServiceReport {
  serviceName: string;
  totalRevenue: number;
  clientCount: number;
  averagePrice: number;
  category: string;
}

export interface ProjectReport {
  period: string;
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  totalBudget: number;
  averageProgress: number;
  onHoldProjects: number;
}

export interface RenewalReport {
  period: string;
  totalRenewals: number;
  completedRenewals: number;
  upcomingRenewals: number;
  overdueRenewals: number;
  totalRenewalValue: number;
  averageRenewalRate: number;
}

export interface ReminderReport {
  period: string;
  totalReminders: number;
  completedReminders: number;
  overdueReminders: number;
  pendingReminders: number;
  highPriorityReminders: number;
  averageCompletionRate: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
  }[];
}

export interface ReportFilters {
  dateRange: '7days' | '30days' | '90days' | '1year' | 'custom';
  startDate?: string;
  endDate?: string;
  clientType?: string;
  serviceCategory?: string;
  status?: string;
}

export interface ReportExportOptions {
  format: 'pdf' | 'csv' | 'excel';
  includeCharts: boolean;
  includeData: boolean;
}

// Settings-related interfaces
export interface UserProfile {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  phone?: string;
  timezone: string;
  language: string;
  dateFormat: string;
  currency: string;
}

export interface CompanySettings {
  name: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  logo?: string;
  industry: string;
  timezone: string;
  currency: string;
  taxRate: number;
  invoicePrefix: string;
  invoiceNumbering: 'sequential' | 'yearly' | 'monthly';
}

export interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  clientUpdates: boolean;
  paymentReminders: boolean;
  renewalReminders: boolean;
  overdueAlerts: boolean;
  weeklyReports: boolean;
  monthlyReports: boolean;
  dailyDigest: boolean;
}

export interface SecuritySettings {
  twoFactorAuth: boolean;
  sessionTimeout: number;
  passwordExpiry: number;
  loginAttempts: number;
  ipWhitelist: string[];
  auditLog: boolean;
}

export interface InvoiceSettings {
  defaultPaymentTerms: number;
  lateFeePercentage: number;
  autoReminders: boolean;
  reminderFrequency: number;
  taxIncluded: boolean;
  currencySymbol: string;
  invoiceTemplate: string;
  emailTemplate: string;
}

export interface ReminderSettings {
  defaultPriority: ReminderPriority;
  autoComplete: boolean;
  reminderAdvanceDays: number;
  recurringReminders: boolean;
  emailReminders: boolean;
  smsReminders: boolean;
  pushReminders: boolean;
}

export interface IntegrationSettings {
  emailProvider: string;
  smsProvider: string;
  paymentGateway: string;
  calendarSync: boolean;
  cloudStorage: string;
  apiKeys: Record<string, string>;
  webhooks: string[];
}

export interface BackupSettings {
  autoBackup: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
  backupTime: string;
  retentionPeriod: number;
  cloudBackup: boolean;
  localBackup: boolean;
  encryption: boolean;
}

export interface ThemeSettings {
  mode: 'light' | 'dark' | 'auto';
  primaryColor: string;
  accentColor: string;
  fontSize: 'small' | 'medium' | 'large';
  compactMode: boolean;
  sidebarCollapsed: boolean;
}

export interface SettingsFormData {
  profile: Partial<UserProfile>;
  company: Partial<CompanySettings>;
  notifications: Partial<NotificationSettings>;
  security: Partial<SecuritySettings>;
  invoice: Partial<InvoiceSettings>;
  reminders: Partial<ReminderSettings>;
  integrations: Partial<IntegrationSettings>;
  backup: Partial<BackupSettings>;
  theme: Partial<ThemeSettings>;
} 