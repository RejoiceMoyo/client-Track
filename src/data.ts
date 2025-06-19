import type { Client, Service, Invoice, Project, Contact, DashboardStats, Renewal, Reminder, RevenueReport, ClientReport, ServiceReport, ProjectReport, RenewalReport, ReminderReport, ChartData, UserProfile, CompanySettings, NotificationSettings, SecuritySettings, InvoiceSettings, ReminderSettings, IntegrationSettings, BackupSettings, ThemeSettings } from './types';

// REMOVE mockClients, mockServices, mockInvoices, mockProjects, mockRenewals, mockReminders arrays
// REMOVE or comment out getClientContacts and any reference to mockContacts
// REMOVE or comment out any code that directly depends on the removed mock data arrays

// Helper functions
// export const getClientById = (id: number): Client | undefined => {
//   return mockClients.find(client => client.id === id);
// }; // Removed as mockClients is removed

export const getClientInvoices = (clientId: number): Invoice[] => {
  // return mockInvoices.filter(invoice => invoice.clientId === clientId);
  return [];
};

export const getClientProjects = (_clientId: number): Project[] => {
  // return mockProjects.filter(project => project.clientId === clientId);
  return [];
};

export const getClientServices = (clientId: number): Service[] => {
  const clientInvoices = getClientInvoices(clientId);
  const serviceIds = new Set<number>();
  
  clientInvoices.forEach(invoice => {
    invoice.services.forEach(service => {
      serviceIds.add(service.id);
    });
  });
  
  // return mockServices.filter(service => serviceIds.has(service.id));
  return [];
};

// Helper functions for renewals
export const getRenewalsByClient = (clientId: number): Renewal[] => {
  // return mockRenewals.filter(renewal => renewal.clientId === clientId);
  return [];
};

export const getRenewalsByService = (serviceId: number): Renewal[] => {
  // return mockRenewals.filter(renewal => renewal.serviceId === serviceId);
  return [];
};

export const getUpcomingRenewals = (days: number = 30): Renewal[] => {
  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + days);
  
  // return mockRenewals.filter(renewal => {
  //   const renewalDate = new Date(renewal.renewalDate);
  //   return renewalDate >= today && renewalDate <= futureDate && renewal.status === 'Upcoming';
  // });
  return [];
};

export const getOverdueRenewals = (): Renewal[] => {
  const today = new Date();
  // return mockRenewals.filter(renewal => {
  //   const renewalDate = new Date(renewal.renewalDate);
  //   return renewalDate < today && renewal.status === 'Due';
  // });
  return [];
};

// Helper functions for reminders
export const getRemindersByClient = (clientId: number): Reminder[] => {
  // return mockReminders.filter(reminder => reminder.clientId === clientId);
  return [];
};

export const getRemindersByType = (type: string): Reminder[] => {
  // return mockReminders.filter(reminder => reminder.type === type);
  return [];
};

export const getOverdueReminders = (): Reminder[] => {
  const today = new Date();
  // return mockReminders.filter(reminder => {
  //   const dueDate = new Date(reminder.dueDate);
  //   return dueDate < today && reminder.status !== 'Completed' && reminder.status !== 'Cancelled';
  // });
  return [];
};

export const getUpcomingReminders = (days: number = 7): Reminder[] => {
  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + days);
  
  // return mockReminders.filter(reminder => {
  //   const dueDate = new Date(reminder.dueDate);
  //   return dueDate >= today && dueDate <= futureDate && reminder.status !== 'Completed' && reminder.status !== 'Cancelled';
  // });
  return [];
};

export const getHighPriorityReminders = (): Reminder[] => {
  // return mockReminders.filter(reminder => 
  //   (reminder.priority === 'High' || reminder.priority === 'Urgent') && 
  //   reminder.status !== 'Completed' && 
  //   reminder.status !== 'Cancelled'
  // );
  return [];
};

// Report data and helper functions
// generateRevenueReport, generateClientReport, generateClientTypeChartData, getTopClientsByRevenue
// were removed as they depended on mockClients.

export const generateServiceReport = (): ServiceReport[] => {
  // return mockServices.map(service => {
  //   const serviceInvoices = mockInvoices.filter(invoice => 
  //     invoice.services.some(s => s.id === service.id)
  //   );
  //   const totalRevenue = serviceInvoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  //   const clientIds = new Set(serviceInvoices.map(invoice => invoice.clientId));

  //   return {
  //     serviceName: service.name,
  //     totalRevenue,
  //     clientCount: clientIds.size,
  //     averagePrice: service.basePrice,
  //     category: service.category
  //   };
  // });
  return [];
};

export const generateProjectReport = (period: string = '30days'): ProjectReport => {
  return {
    period,
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    totalBudget: 0,
    averageProgress: 0,
    onHoldProjects: 0,
  };
};

export const generateClientReport = (period: string = '30days'): ClientReport => {
  return {
    period,
    totalClients: 0,
    newClients: 0,
    activeClients: 0,
    inactiveClients: 0,
    prospectClients: 0,
    averageRevenuePerClient: 0,
  };
};

export const generateClientTypeChartData = (): ChartData => {
  return {
    labels: [],
    datasets: [
      {
        label: 'Clients by Type',
        data: [],
        backgroundColor: [],
      },
    ],
  };
};

export const generateServiceRevenueChartData = (): ChartData => {
  return {
    labels: [],
    datasets: [
      {
        label: 'Revenue',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1
      }
    ]
  };
};

export const generateProjectStatusChartData = (): ChartData => {
  return {
    labels: [],
    datasets: [
      {
        label: 'Project Count',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1
      }
    ]
  };
};

// Helper functions for reports
// Removed getTopClientsByRevenue as it depended on mockClients.

export const getTopServicesByRevenue = (limit: number = 5): ServiceReport[] => {
  return [];
};

export const getRecentInvoices = (limit: number = 10): Invoice[] => {
  return [];
};

export const getUpcomingRenewalsForReports = (limit: number = 10): Renewal[] => {
  return [];
};

export const getOverdueRemindersForReports = (limit: number = 10): Reminder[] => {
  return [];
};

// Settings data
// REMOVE all default*Settings objects
// REMOVE all options arrays (timezoneOptions, languageOptions, currencyOptions, dateFormatOptions, industryOptions, emailProviderOptions, smsProviderOptions, paymentGatewayOptions, cloudStorageOptions)
// REMOVE all hardcoded return values in report functions (generateClientReport, generateRevenueReport, etc.) and return empty objects/arrays or nulls as appropriate

// Settings helper functions
export const saveSettings = (settings: any, category: string) => {
  // No-op for non-browser environments
};

export const loadSettings = (category: string) => {
  // No-op for non-browser environments
  return {};
};

export const resetSettings = (category: string) => {
  // No-op for non-browser environments
};

export const exportSettings = () => {
  // No-op for non-browser environments
};

export const importSettings = (file: File): Promise<void> => {
  // No-op for non-browser environments
  return Promise.resolve();
};

// Available options for settings
// REMOVE all options arrays (timezoneOptions, languageOptions, currencyOptions, dateFormatOptions, industryOptions, emailProviderOptions, smsProviderOptions, paymentGatewayOptions, cloudStorageOptions)

export const generateRevenueReport = (period: string = '30days'): RevenueReport => {
  return {
    period,
    totalRevenue: 0,
    paidRevenue: 0,
    pendingRevenue: 0,
    overdueRevenue: 0,
    clientCount: 0,
    invoiceCount: 0,
  };
}; 