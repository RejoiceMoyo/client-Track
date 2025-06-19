import type { Client, Service, Invoice, Project, Contact, DashboardStats, Renewal, Reminder, RevenueReport, ClientReport, ServiceReport, ProjectReport, RenewalReport, ReminderReport, ChartData, UserProfile, CompanySettings, NotificationSettings, SecuritySettings, InvoiceSettings, ReminderSettings, IntegrationSettings, BackupSettings, ThemeSettings } from './types';

export const mockClients: Client[] = [
  {
    id: 1,
    name: "Acme Corp",
    email: "contact@acme.com",
    phone: "+1234567890",
    address: "123 Main St, City",
    status: "Active",
    // Add other required fields from your Client type if needed
  },
  // Add more mock clients as needed
];

export const mockServices: Service[] = [
  {
    id: 1,
    name: "Web Hosting",
    description: "Basic web hosting package",
    basePrice: 100,
    category: "Hosting",
    // Add other required fields from your Service type if needed
  },
  // Add more mock services as needed
];

export const mockInvoices: Invoice[] = [
  {
    id: 1,
    clientId: 1,
    clientName: "Acme Corp",
    amount: 1200,
    status: "Paid",
    dueDate: "2024-06-01",
    issueDate: "2024-05-01",
    services: []
  },
  // Add more mock invoices as needed
];

export const mockProjects: Project[] = [
  {
    id: 1,
    clientId: 1,
    name: "Website Redesign",
    status: "Active",
    budget: 5000,
    progress: 60,
    // Add other required fields from your Project type if needed
  },
  // Add more mock projects as needed
];

export const mockRenewals: Renewal[] = [
  {
    id: 1,
    clientId: 1,
    serviceId: 1,
    renewalDate: "2024-07-01",
    renewalPrice: 300,
    status: "Upcoming",
    // Add other required fields from your Renewal type if needed
  },
  // Add more mock renewals as needed
];

export const mockReminders: Reminder[] = [
  {
    id: 1,
    clientId: 1,
    type: "Payment",
    dueDate: "2024-07-10",
    status: "Pending",
    priority: "High",
    // Add other required fields from your Reminder type if needed
  },
  // Add more mock reminders as needed
];

// All mock data arrays and functions depending on them have been removed.

// Helper functions
// export const getClientById = (id: number): Client | undefined => {
//   return mockClients.find(client => client.id === id);
// }; // Removed as mockClients is removed

export const getClientInvoices = (clientId: number): Invoice[] => {
  return mockInvoices.filter(invoice => invoice.clientId === clientId);
};

export const getClientProjects = (clientId: number): Project[] => {
  return mockProjects.filter(project => project.clientId === clientId);
};

export const getClientContacts = (clientId: number): Contact[] => {
  return mockContacts.filter(contact => contact.clientId === clientId);
};

export const getClientServices = (clientId: number): Service[] => {
  const clientInvoices = getClientInvoices(clientId);
  const serviceIds = new Set<number>();
  
  clientInvoices.forEach(invoice => {
    invoice.services.forEach(service => {
      serviceIds.add(service.id);
    });
  });
  
  return mockServices.filter(service => serviceIds.has(service.id));
};

// Helper functions for renewals
export const getRenewalsByClient = (clientId: number): Renewal[] => {
  return mockRenewals.filter(renewal => renewal.clientId === clientId);
};

export const getRenewalsByService = (serviceId: number): Renewal[] => {
  return mockRenewals.filter(renewal => renewal.serviceId === serviceId);
};

export const getUpcomingRenewals = (days: number = 30): Renewal[] => {
  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + days);
  
  return mockRenewals.filter(renewal => {
    const renewalDate = new Date(renewal.renewalDate);
    return renewalDate >= today && renewalDate <= futureDate && renewal.status === 'Upcoming';
  });
};

export const getOverdueRenewals = (): Renewal[] => {
  const today = new Date();
  return mockRenewals.filter(renewal => {
    const renewalDate = new Date(renewal.renewalDate);
    return renewalDate < today && renewal.status === 'Due';
  });
};

// Helper functions for reminders
export const getRemindersByClient = (clientId: number): Reminder[] => {
  return mockReminders.filter(reminder => reminder.clientId === clientId);
};

export const getRemindersByType = (type: string): Reminder[] => {
  return mockReminders.filter(reminder => reminder.type === type);
};

export const getOverdueReminders = (): Reminder[] => {
  const today = new Date();
  return mockReminders.filter(reminder => {
    const dueDate = new Date(reminder.dueDate);
    return dueDate < today && reminder.status !== 'Completed' && reminder.status !== 'Cancelled';
  });
};

export const getUpcomingReminders = (days: number = 7): Reminder[] => {
  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + days);
  
  return mockReminders.filter(reminder => {
    const dueDate = new Date(reminder.dueDate);
    return dueDate >= today && dueDate <= futureDate && reminder.status !== 'Completed' && reminder.status !== 'Cancelled';
  });
};

export const getHighPriorityReminders = (): Reminder[] => {
  return mockReminders.filter(reminder => 
    (reminder.priority === 'High' || reminder.priority === 'Urgent') && 
    reminder.status !== 'Completed' && 
    reminder.status !== 'Cancelled'
  );
};

// Report data and helper functions
// generateRevenueReport, generateClientReport, generateClientTypeChartData, getTopClientsByRevenue
// were removed as they depended on mockClients.

export const generateServiceReport = (): ServiceReport[] => {
  return mockServices.map(service => {
    const serviceInvoices = mockInvoices.filter(invoice => 
      invoice.services.some(s => s.id === service.id)
    );
    const totalRevenue = serviceInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
    const clientIds = new Set(serviceInvoices.map(invoice => invoice.clientId));

    return {
      serviceName: service.name,
      totalRevenue,
      clientCount: clientIds.size,
      averagePrice: service.basePrice,
      category: service.category
    };
  });
};

export const generateProjectReport = (period: string = '30days'): ProjectReport => {
  const totalProjects = mockProjects.length;
  const activeProjects = mockProjects.filter(project => project.status === 'Active').length;
  const completedProjects = mockProjects.filter(project => project.status === 'Completed').length;
  const onHoldProjects = mockProjects.filter(project => project.status === 'On Hold').length;
  const totalBudget = mockProjects.reduce((sum, project) => sum + project.budget, 0);
  const averageProgress = mockProjects.reduce((sum, project) => sum + project.progress, 0) / totalProjects;

  return {
    period,
    totalProjects,
    activeProjects,
    completedProjects,
    totalBudget,
    averageProgress,
    onHoldProjects
  };
};

export const generateRenewalReport = (period: string = '30days'): RenewalReport => {
  const totalRenewals = mockRenewals.length;
  const completedRenewals = mockRenewals.filter(renewal => renewal.status === 'Completed').length;
  const upcomingRenewals = mockRenewals.filter(renewal => renewal.status === 'Upcoming').length;
  const overdueRenewals = mockRenewals.filter(renewal => renewal.status === 'Overdue').length;
  const totalRenewalValue = mockRenewals.reduce((sum, renewal) => sum + renewal.renewalPrice, 0);

  return {
    period,
    totalRenewals,
    completedRenewals,
    upcomingRenewals,
    overdueRenewals,
    totalRenewalValue,
    averageRenewalRate: (completedRenewals / totalRenewals) * 100
  };
};

export const generateReminderReport = (period: string = '30days'): ReminderReport => {
  const totalReminders = mockReminders.length;
  const completedReminders = mockReminders.filter(reminder => reminder.status === 'Completed').length;
  const overdueReminders = mockReminders.filter(reminder => reminder.status === 'Overdue').length;
  const pendingReminders = mockReminders.filter(reminder => reminder.status === 'Pending').length;
  const highPriorityReminders = mockReminders.filter(reminder => 
    reminder.priority === 'High' || reminder.priority === 'Urgent'
  ).length;

  return {
    period,
    totalReminders,
    completedReminders,
    overdueReminders,
    pendingReminders,
    highPriorityReminders,
    averageCompletionRate: (completedReminders / totalReminders) * 100
  };
};

// Chart data generators
export const generateRevenueChartData = (): ChartData => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const revenueData = [12000, 15000, 18000, 14000, 22000, 25000];
  const paidData = [10000, 12000, 15000, 11000, 18000, 20000];
  const pendingData = [2000, 3000, 3000, 3000, 4000, 5000];

  return {
    labels: months,
    datasets: [
      {
        label: 'Total Revenue',
        data: revenueData,
        backgroundColor: 'rgba(9, 110, 110, 0.2)',
        borderColor: 'rgba(9, 110, 110, 1)',
        borderWidth: 2
      },
      {
        label: 'Paid Revenue',
        data: paidData,
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 2
      },
      {
        label: 'Pending Revenue',
        data: pendingData,
        backgroundColor: 'rgba(251, 191, 36, 0.2)',
        borderColor: 'rgba(251, 191, 36, 1)',
        borderWidth: 2
      }
    ]
  };
};

export const generateClientTypeChartData = (): ChartData => {
  return {
    labels: ['Individual', 'Business', 'Enterprise'],
    datasets: [
      {
        label: 'Clients by Type',
        data: [4, 5, 1],
        backgroundColor: ['#60a5fa', '#34d399', '#fbbf24'],
      },
    ],
  };
};

export const generateServiceRevenueChartData = (): ChartData => {
  const serviceReport = generateServiceReport();
  
  return {
    labels: serviceReport.map(service => service.serviceName),
    datasets: [
      {
        label: 'Revenue',
        data: serviceReport.map(service => service.totalRevenue),
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(168, 85, 247, 0.8)',
          'rgba(236, 72, 153, 0.8)'
        ],
        borderColor: [
          'rgba(239, 68, 68, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(236, 72, 153, 1)'
        ],
        borderWidth: 1
      }
    ]
  };
};

export const generateProjectStatusChartData = (): ChartData => {
  const projectReport = generateProjectReport();
  
  return {
    labels: ['Active', 'Completed', 'On Hold', 'Cancelled'],
    datasets: [
      {
        label: 'Project Count',
        data: [
          projectReport.activeProjects,
          projectReport.completedProjects,
          projectReport.onHoldProjects,
          mockProjects.filter(project => project.status === 'Cancelled').length
        ],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)'
        ],
        borderWidth: 1
      }
    ]
  };
};

// Helper functions for reports
// Removed getTopClientsByRevenue as it depended on mockClients.

export const getTopServicesByRevenue = (limit: number = 5): ServiceReport[] => {
  return generateServiceReport()
    .sort((a, b) => b.totalRevenue - a.totalRevenue)
    .slice(0, limit);
};

export const getRecentInvoices = (limit: number = 10): Invoice[] => {
  return [...mockInvoices]
    .sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime())
    .slice(0, limit);
};

export const getUpcomingRenewalsForReports = (limit: number = 10): Renewal[] => {
  return [...mockRenewals]
    .filter(renewal => renewal.status === 'Upcoming' || renewal.status === 'Due')
    .sort((a, b) => new Date(a.renewalDate).getTime() - new Date(b.renewalDate).getTime())
    .slice(0, limit);
};

export const getOverdueRemindersForReports = (limit: number = 10): Reminder[] => {
  return [...mockReminders]
    .filter(reminder => reminder.status === 'Overdue')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, limit);
};

// Settings data
export const defaultUserProfile: UserProfile = {
  id: 1,
  name: "Tinashe Chiwenga",
  email: "tinashe.chiwenga@clienttrack.zw",
  role: "Administrator",
  phone: "+263 77 123 4567",
  timezone: "Africa/Harare",
  language: "en",
  dateFormat: "DD/MM/YYYY",
  currency: "ZWL"
};

export const defaultCompanySettings: CompanySettings = {
  name: "ClientTrack Zimbabwe",
  email: "contact@clienttrack.zw",
  phone: "+263 4 123 4567",
  address: "123 Samora Machel Avenue, Harare, Zimbabwe",
  website: "https://clienttrack.zw",
  industry: "Technology",
  timezone: "Africa/Harare",
  currency: "ZWL",
  taxRate: 14.5,
  invoicePrefix: "INV",
  invoiceNumbering: "sequential"
};

export const defaultNotificationSettings: NotificationSettings = {
  emailNotifications: true,
  smsNotifications: false,
  pushNotifications: true,
  clientUpdates: true,
  paymentReminders: true,
  renewalReminders: true,
  overdueAlerts: true,
  weeklyReports: true,
  monthlyReports: true,
  dailyDigest: false
};

export const defaultSecuritySettings: SecuritySettings = {
  twoFactorAuth: false,
  sessionTimeout: 30,
  passwordExpiry: 90,
  loginAttempts: 5,
  ipWhitelist: [],
  auditLog: true
};

export const defaultInvoiceSettings: InvoiceSettings = {
  defaultPaymentTerms: 30,
  lateFeePercentage: 5,
  autoReminders: true,
  reminderFrequency: 7,
  taxIncluded: false,
  currencySymbol: "$",
  invoiceTemplate: "default",
  emailTemplate: "default"
};

export const defaultReminderSettings: ReminderSettings = {
  defaultPriority: "Medium",
  autoComplete: false,
  reminderAdvanceDays: 3,
  recurringReminders: true,
  emailReminders: true,
  smsReminders: false,
  pushReminders: true
};

export const defaultIntegrationSettings: IntegrationSettings = {
  emailProvider: "Gmail",
  smsProvider: "Twilio",
  paymentGateway: "Stripe",
  calendarSync: true,
  cloudStorage: "Google Drive",
  apiKeys: {},
  webhooks: []
};

export const defaultBackupSettings: BackupSettings = {
  autoBackup: true,
  backupFrequency: "daily",
  backupTime: "02:00",
  retentionPeriod: 30,
  cloudBackup: true,
  localBackup: false,
  encryption: true
};

export const defaultThemeSettings: ThemeSettings = {
  mode: "light",
  primaryColor: "#096e6e",
  accentColor: "#0d8080",
  fontSize: "medium",
  compactMode: false,
  sidebarCollapsed: false
};

// Settings helper functions
export const saveSettings = (settings: any, category: string) => {
  // Mock function to save settings to localStorage or API
  const key = `settings_${category}`;
  localStorage.setItem(key, JSON.stringify(settings));
  console.log(`Settings saved for ${category}:`, settings);
};

export const loadSettings = (category: string) => {
  // Mock function to load settings from localStorage or API
  const key = `settings_${category}`;
  const saved = localStorage.getItem(key);
  if (saved) {
    return JSON.parse(saved);
  }
  
  // Return default settings if none saved
  switch (category) {
    case 'profile':
      return defaultUserProfile;
    case 'company':
      return defaultCompanySettings;
    case 'notifications':
      return defaultNotificationSettings;
    case 'security':
      return defaultSecuritySettings;
    case 'invoice':
      return defaultInvoiceSettings;
    case 'reminders':
      return defaultReminderSettings;
    case 'integrations':
      return defaultIntegrationSettings;
    case 'backup':
      return defaultBackupSettings;
    case 'theme':
      return defaultThemeSettings;
    default:
      return {};
  }
};

export const resetSettings = (category: string) => {
  // Mock function to reset settings to defaults
  const key = `settings_${category}`;
  localStorage.removeItem(key);
  console.log(`Settings reset for ${category}`);
};

export const exportSettings = () => {
  // Mock function to export all settings
  const allSettings = {
    profile: loadSettings('profile'),
    company: loadSettings('company'),
    notifications: loadSettings('notifications'),
    security: loadSettings('security'),
    invoice: loadSettings('invoice'),
    reminders: loadSettings('reminders'),
    integrations: loadSettings('integrations'),
    backup: loadSettings('backup'),
    theme: loadSettings('theme')
  };
  
  const dataStr = JSON.stringify(allSettings, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'client-track-settings.json';
  link.click();
  
  URL.revokeObjectURL(url);
};

export const importSettings = (file: File): Promise<void> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const settings = JSON.parse(e.target?.result as string);
        
        // Save each category
        Object.keys(settings).forEach(category => {
          saveSettings(settings[category], category);
        });
        
        console.log('Settings imported successfully');
        resolve();
      } catch (error) {
        reject(new Error('Invalid settings file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

// Available options for settings
export const timezoneOptions = [
  { value: 'Africa/Harare', label: 'Harare (CAT)' },
  { value: 'Africa/Johannesburg', label: 'Johannesburg (SAST)' },
  { value: 'Africa/Lagos', label: 'Lagos (WAT)' },
  { value: 'Africa/Cairo', label: 'Cairo (EET)' },
  { value: 'Europe/London', label: 'London (GMT)' },
  { value: 'Europe/Paris', label: 'Paris (CET)' },
  { value: 'America/New_York', label: 'New York (EST)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)' }
];

export const languageOptions = [
  { value: 'en', label: 'English' },
  { value: 'sn', label: 'Shona' },
  { value: 'nd', label: 'Ndebele' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'ja', label: 'Japanese' }
];

export const currencyOptions = [
  { value: 'ZWL', label: 'Zimbabwe Dollar (Z$)' },
  { value: 'USD', label: 'US Dollar ($)' },
  { value: 'EUR', label: 'Euro (€)' },
  { value: 'GBP', label: 'British Pound (£)' },
  { value: 'ZAR', label: 'South African Rand (R)' },
  { value: 'BWP', label: 'Botswana Pula (P)' },
  { value: 'JPY', label: 'Japanese Yen (¥)' },
  { value: 'CNY', label: 'Chinese Yuan (¥)' }
];

export const dateFormatOptions = [
  { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
  { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
  { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' },
  { value: 'MM-DD-YYYY', label: 'MM-DD-YYYY' },
  { value: 'DD-MM-YYYY', label: 'DD-MM-YYYY' }
];

export const industryOptions = [
  'Technology',
  'Mining',
  'Agriculture',
  'Tourism',
  'Manufacturing',
  'Finance',
  'Healthcare',
  'Education',
  'Retail',
  'Real Estate',
  'Legal',
  'Marketing',
  'Design',
  'Consulting',
  'Other'
];

export const emailProviderOptions = [
  'Gmail',
  'Outlook',
  'Yahoo',
  'Custom SMTP',
  'SendGrid',
  'Mailgun'
];

export const smsProviderOptions = [
  'Twilio',
  'Vonage',
  'MessageBird',
  'Custom'
];

export const paymentGatewayOptions = [
  'Stripe',
  'PayPal',
  'Square',
  'Authorize.net',
  'Braintree'
];

export const cloudStorageOptions = [
  'Google Drive',
  'Dropbox',
  'OneDrive',
  'Box',
  'Amazon S3'
];

export const generateClientReport = (period: string = '30days'): ClientReport => {
  return {
    period,
    totalClients: 10,
    newClients: 2,
    activeClients: 7,
    inactiveClients: 2,
    prospectClients: 1,
    averageRevenuePerClient: 1200,
  };
};

export const generateRevenueReport = (period: string = '30days'): RevenueReport => {
  return {
    period,
    totalRevenue: 12000,
    paidRevenue: 10000,
    pendingRevenue: 1500,
    overdueRevenue: 500,
    clientCount: 10,
    invoiceCount: 15,
  };
}; 