import type { Client, Service, Invoice, Project, Contact, DashboardStats, Renewal, Reminder, RevenueReport, ClientReport, ServiceReport, ProjectReport, RenewalReport, ReminderReport, ChartData, UserProfile, CompanySettings, NotificationSettings, SecuritySettings, InvoiceSettings, ReminderSettings, IntegrationSettings, BackupSettings, ThemeSettings } from './types';

// Mock data for clients
export const mockClients: Client[] = [
  {
    id: 1,
    name: "Tendai Moyo",
    email: "tendai@hararetech.co.zw",
    phone: "+263 77 123 4567",
    company: "Harare Tech Solutions",
    type: "Business",
    status: "Active",
    services: 3,
    totalRevenue: 2499,
    lastContact: "2024-01-15"
  },
  {
    id: 2,
    name: "Farai Chikomba",
    email: "farai@bulawayodigital.zw",
    phone: "+263 71 234 5678",
    company: "Bulawayo Digital Marketing",
    type: "Business",
    status: "Active",
    services: 2,
    totalRevenue: 1899,
    lastContact: "2024-01-10"
  },
  {
    id: 3,
    name: "Rutendo Ndlovu",
    email: "rutendo@creativezimbabwe.zw",
    phone: "+263 78 345 6789",
    company: "Creative Zimbabwe Studio",
    type: "Business",
    status: "Inactive",
    services: 1,
    totalRevenue: 899,
    lastContact: "2023-12-20"
  },
  {
    id: 4,
    name: "Tatenda Mutasa",
    email: "tatenda@startupzimbabwe.zw",
    phone: "+263 73 456 7890",
    company: "Startup Zimbabwe Ventures",
    type: "Enterprise",
    status: "Active",
    services: 5,
    totalRevenue: 5499,
    lastContact: "2024-01-12"
  },
  {
    id: 5,
    name: "Chiedza Marufu",
    email: "chiedza@consultingzimbabwe.zw",
    phone: "+263 77 567 8901",
    company: "Zimbabwe Consulting Group",
    type: "Enterprise",
    status: "Active",
    services: 4,
    totalRevenue: 3999,
    lastContact: "2024-01-08"
  },
  {
    id: 6,
    name: "Tafadzwa Sibanda",
    email: "tafadzwa@freelance.zw",
    phone: "+263 71 678 9012",
    company: "Freelance Designer Zimbabwe",
    type: "Individual",
    status: "Prospect",
    services: 0,
    totalRevenue: 0,
    lastContact: "2024-01-05"
  },
  {
    id: 7,
    name: "Rumbidzai Gumbo",
    email: "rumbidzai@marketingzimbabwe.zw",
    phone: "+263 78 789 0123",
    company: "Zimbabwe Marketing Agency",
    type: "Business",
    status: "Active",
    services: 2,
    totalRevenue: 1599,
    lastContact: "2024-01-14"
  },
  {
    id: 8,
    name: "Kudzai Mupfumira",
    email: "kudzai@ecommercezimbabwe.zw",
    phone: "+263 73 890 1234",
    company: "Zimbabwe E-commerce Store",
    type: "Business",
    status: "Active",
    services: 3,
    totalRevenue: 2899,
    lastContact: "2024-01-11"
  }
];

// Mock data for services (what we offer)
export const mockServices: Service[] = [
  {
    id: 1,
    name: "Website Development",
    description: "Custom website development with modern technologies",
    basePrice: 999,
    baseDuration: "2-4 weeks",
    category: "Development"
  },
  {
    id: 2,
    name: "SEO Optimization",
    description: "Search engine optimization for better rankings",
    basePrice: 499,
    baseDuration: "1-2 weeks",
    category: "Marketing"
  },
  {
    id: 3,
    name: "Logo Design",
    description: "Professional logo design and branding",
    basePrice: 299,
    baseDuration: "1 week",
    category: "Design"
  },
  {
    id: 4,
    name: "Social Media Management",
    description: "Monthly social media content and management",
    basePrice: 399,
    baseDuration: "Ongoing",
    category: "Marketing"
  },
  {
    id: 5,
    name: "Mobile App Development",
    description: "Cross-platform mobile application development",
    basePrice: 2499,
    baseDuration: "6-8 weeks",
    category: "Development"
  },
  {
    id: 6,
    name: "Content Writing",
    description: "Professional content writing for websites and blogs",
    basePrice: 199,
    baseDuration: "3-5 days",
    category: "Content"
  }
];

// Mock data for invoices
export const mockInvoices: Invoice[] = [
  {
    id: 1,
    clientId: 1,
    clientName: "Tendai Moyo",
    amount: 999,
    status: "Paid",
    dueDate: "2024-01-20",
    issueDate: "2024-01-01",
    services: [mockServices[0]]
  },
  {
    id: 2,
    clientId: 2,
    clientName: "Farai Chikomba",
    amount: 499,
    status: "Pending",
    dueDate: "2024-01-25",
    issueDate: "2024-01-05",
    services: [mockServices[1]]
  },
  {
    id: 3,
    clientId: 4,
    clientName: "Tatenda Mutasa",
    amount: 2499,
    status: "Overdue",
    dueDate: "2024-01-15",
    issueDate: "2023-12-15",
    services: [mockServices[4]]
  },
  {
    id: 4,
    clientId: 5,
    clientName: "Chiedza Marufu",
    amount: 399,
    status: "Paid",
    dueDate: "2024-01-30",
    issueDate: "2024-01-10",
    services: [mockServices[3]]
  },
  {
    id: 5,
    clientId: 7,
    clientName: "Rumbidzai Gumbo",
    amount: 598,
    status: "Pending",
    dueDate: "2024-02-05",
    issueDate: "2024-01-15",
    services: [mockServices[1], mockServices[3]]
  }
];

// Mock data for projects
export const mockProjects: Project[] = [
  {
    id: 1,
    clientId: 1,
    clientName: "Tendai Moyo",
    name: "E-commerce Website Redesign",
    description: "Complete redesign of the existing e-commerce platform",
    status: "Active",
    startDate: "2024-01-01",
    budget: 5000,
    progress: 75
  },
  {
    id: 2,
    clientId: 4,
    clientName: "Tatenda Mutasa",
    name: "Mobile App Development",
    description: "Cross-platform mobile app for startup",
    status: "Active",
    startDate: "2023-12-01",
    budget: 15000,
    progress: 60
  },
  {
    id: 3,
    clientId: 5,
    clientName: "Chiedza Marufu",
    name: "Brand Identity Design",
    description: "Complete brand identity including logo and guidelines",
    status: "Completed",
    startDate: "2023-11-01",
    endDate: "2023-12-15",
    budget: 3000,
    progress: 100
  },
  {
    id: 4,
    clientId: 2,
    clientName: "Farai Chikomba",
    name: "SEO Campaign",
    description: "6-month SEO optimization campaign",
    status: "Active",
    startDate: "2024-01-01",
    budget: 2000,
    progress: 25
  },
  {
    id: 5,
    clientId: 8,
    clientName: "Kudzai Mupfumira",
    name: "Website Maintenance",
    description: "Ongoing website maintenance and updates",
    status: "On Hold",
    startDate: "2023-10-01",
    budget: 1200,
    progress: 40
  }
];

// Mock data for contacts
export const mockContacts: Contact[] = [
  {
    id: 1,
    clientId: 1,
    type: "Meeting",
    date: "2024-01-15",
    description: "Project kickoff meeting for e-commerce redesign",
    outcome: "Project requirements finalized, timeline agreed"
  },
  {
    id: 2,
    clientId: 2,
    type: "Email",
    date: "2024-01-10",
    description: "Follow-up on SEO campaign progress",
    outcome: "Client satisfied with initial results"
  },
  {
    id: 3,
    clientId: 4,
    type: "Phone",
    date: "2024-01-12",
    description: "Discussion about mobile app features",
    outcome: "Additional features requested, budget increase needed"
  },
  {
    id: 4,
    clientId: 5,
    type: "Meeting",
    date: "2024-01-08",
    description: "Brand identity presentation",
    outcome: "Design approved, moving to implementation"
  },
  {
    id: 5,
    clientId: 6,
    type: "Email",
    date: "2024-01-05",
    description: "Initial contact and proposal",
    outcome: "Proposal sent, waiting for response"
  },
  {
    id: 6,
    clientId: 7,
    type: "Phone",
    date: "2024-01-14",
    description: "Monthly check-in call",
    outcome: "Client happy with services, considering expansion"
  },
  {
    id: 7,
    clientId: 8,
    type: "Note",
    date: "2024-01-11",
    description: "Website performance review",
    outcome: "Issues identified, maintenance plan updated"
  }
];

// Mock data for renewals
export const mockRenewals: Renewal[] = [
  {
    id: 1,
    clientId: 1,
    clientName: "Tendai Moyo",
    serviceId: 1,
    serviceName: "Website Development",
    currentPrice: 999,
    renewalPrice: 1099,
    renewalDate: "2025-07-15",
    status: "Upcoming",
    autoRenew: true,
    notes: "Client requested additional features for renewal",
    lastRenewalDate: "2024-07-15",
    nextRenewalDate: "2026-07-15"
  },
  {
    id: 2,
    clientId: 2,
    clientName: "Farai Chikomba",
    serviceId: 2,
    serviceName: "SEO Optimization",
    currentPrice: 499,
    renewalPrice: 549,
    renewalDate: "2025-06-25",
    status: "Due",
    autoRenew: false,
    notes: "Client considering upgrading to premium package",
    lastRenewalDate: "2024-06-25",
    nextRenewalDate: "2026-06-25"
  },
  {
    id: 3,
    clientId: 4,
    clientName: "Tatenda Mutasa",
    serviceId: 5,
    serviceName: "Mobile App Development",
    currentPrice: 2499,
    renewalPrice: 2749,
    renewalDate: "2025-06-10",
    status: "Overdue",
    autoRenew: true,
    notes: "Payment reminder sent, awaiting response",
    lastRenewalDate: "2024-06-10",
    nextRenewalDate: "2026-06-10"
  },
  {
    id: 4,
    clientId: 5,
    clientName: "Chiedza Marufu",
    serviceId: 4,
    serviceName: "Social Media Management",
    currentPrice: 399,
    renewalPrice: 399,
    renewalDate: "2025-06-30",
    status: "Completed",
    autoRenew: true,
    notes: "Successfully renewed for another year",
    lastRenewalDate: "2025-06-30",
    nextRenewalDate: "2026-06-30"
  },
  {
    id: 5,
    clientId: 7,
    clientName: "Rumbidzai Gumbo",
    serviceId: 2,
    serviceName: "SEO Optimization",
    currentPrice: 499,
    renewalPrice: 499,
    renewalDate: "2025-07-05",
    status: "Upcoming",
    autoRenew: true,
    notes: "Standard renewal, no changes requested",
    lastRenewalDate: "2024-07-05",
    nextRenewalDate: "2026-07-05"
  },
  {
    id: 6,
    clientId: 8,
    clientName: "Kudzai Mupfumira",
    serviceId: 1,
    serviceName: "Website Development",
    currentPrice: 999,
    renewalPrice: 0,
    renewalDate: "2025-06-20",
    status: "Cancelled",
    autoRenew: false,
    notes: "Client decided to discontinue service",
    lastRenewalDate: "2024-06-20",
    nextRenewalDate: "2025-06-20"
  },
  {
    id: 7,
    clientId: 1,
    clientName: "Tendai Moyo",
    serviceId: 3,
    serviceName: "Logo Design",
    currentPrice: 299,
    renewalPrice: 299,
    renewalDate: "2025-08-01",
    status: "Upcoming",
    autoRenew: false,
    notes: "One-time service, no renewal needed",
    nextRenewalDate: "2025-08-01"
  },
  {
    id: 8,
    clientId: 4,
    clientName: "Tatenda Mutasa",
    serviceId: 4,
    serviceName: "Social Media Management",
    currentPrice: 399,
    renewalPrice: 449,
    renewalDate: "2025-07-20",
    status: "Due",
    autoRenew: true,
    notes: "Price increase due to expanded service scope",
    lastRenewalDate: "2024-07-20",
    nextRenewalDate: "2026-07-20"
  },
  {
    id: 9,
    clientId: 2,
    clientName: "Farai Chikomba",
    serviceId: 4,
    serviceName: "Social Media Management",
    currentPrice: 399,
    renewalPrice: 399,
    renewalDate: "2025-07-28",
    status: "Upcoming",
    autoRenew: true,
    notes: "Standard renewal, client satisfied with current service",
    lastRenewalDate: "2024-07-28",
    nextRenewalDate: "2026-07-28"
  },
  {
    id: 10,
    clientId: 5,
    clientName: "Chiedza Marufu",
    serviceId: 1,
    serviceName: "Website Development",
    currentPrice: 999,
    renewalPrice: 1099,
    renewalDate: "2025-08-05",
    status: "Upcoming",
    autoRenew: false,
    notes: "Client requested website redesign for renewal",
    lastRenewalDate: "2024-08-05",
    nextRenewalDate: "2026-08-05"
  },
  {
    id: 11,
    clientId: 7,
    clientName: "Rumbidzai Gumbo",
    serviceId: 3,
    serviceName: "Logo Design",
    currentPrice: 299,
    renewalPrice: 349,
    renewalDate: "2025-08-10",
    status: "Upcoming",
    autoRenew: false,
    notes: "Logo refresh requested, price increase for additional revisions",
    lastRenewalDate: "2024-08-10",
    nextRenewalDate: "2026-08-10"
  },
  {
    id: 12,
    clientId: 8,
    clientName: "Kudzai Mupfumira",
    serviceId: 2,
    serviceName: "SEO Optimization",
    currentPrice: 499,
    renewalPrice: 499,
    renewalDate: "2025-08-15",
    status: "Upcoming",
    autoRenew: true,
    notes: "Standard SEO renewal, performance has improved",
    lastRenewalDate: "2024-08-15",
    nextRenewalDate: "2026-08-15"
  },
  {
    id: 13,
    clientId: 1,
    clientName: "Tendai Moyo",
    serviceId: 5,
    serviceName: "Mobile App Development",
    currentPrice: 2499,
    renewalPrice: 2749,
    renewalDate: "2025-08-20",
    status: "Upcoming",
    autoRenew: true,
    notes: "App maintenance and updates renewal",
    lastRenewalDate: "2024-08-20",
    nextRenewalDate: "2026-08-20"
  },
  {
    id: 14,
    clientId: 3,
    clientName: "Rutendo Ndlovu",
    serviceId: 6,
    serviceName: "Content Writing",
    currentPrice: 199,
    renewalPrice: 199,
    renewalDate: "2025-08-25",
    status: "Upcoming",
    autoRenew: false,
    notes: "Monthly content writing service renewal",
    lastRenewalDate: "2024-08-25",
    nextRenewalDate: "2026-08-25"
  },
  {
    id: 15,
    clientId: 6,
    clientName: "Tafadzwa Sibanda",
    serviceId: 3,
    serviceName: "Logo Design",
    currentPrice: 299,
    renewalPrice: 299,
    renewalDate: "2025-07-01",
    status: "Upcoming",
    autoRenew: false,
    notes: "First-time logo design project",
    nextRenewalDate: "2025-09-01"
  },
  {
    id: 16,
    clientId: 4,
    clientName: "Tatenda Mutasa",
    serviceId: 6,
    serviceName: "Content Writing",
    currentPrice: 199,
    renewalPrice: 249,
    renewalDate: "2025-09-05",
    status: "Upcoming",
    autoRenew: true,
    notes: "Content writing service renewal with expanded scope",
    lastRenewalDate: "2024-09-05",
    nextRenewalDate: "2026-09-05"
  },
  {
    id: 17,
    clientId: 2,
    clientName: "Farai Chikomba",
    serviceId: 1,
    serviceName: "Website Development",
    currentPrice: 999,
    renewalPrice: 999,
    renewalDate: "2025-09-10",
    status: "Upcoming",
    autoRenew: true,
    notes: "Website maintenance and hosting renewal",
    lastRenewalDate: "2024-09-10",
    nextRenewalDate: "2026-09-10"
  },
  {
    id: 18,
    clientId: 5,
    clientName: "Chiedza Marufu",
    serviceId: 5,
    serviceName: "Mobile App Development",
    currentPrice: 2499,
    renewalPrice: 2499,
    renewalDate: "2025-09-15",
    status: "Upcoming",
    autoRenew: true,
    notes: "Mobile app hosting and maintenance renewal",
    lastRenewalDate: "2024-09-15",
    nextRenewalDate: "2026-09-15"
  }
];

// Mock data for reminders
export const mockReminders: Reminder[] = [
  {
    id: 1,
    clientId: 1,
    clientName: "Tendai Moyo",
    title: "Follow up on website redesign proposal",
    description: "Send follow-up email regarding the e-commerce website redesign proposal",
    dueDate: "2024-01-20",
    priority: "High",
    status: "Pending",
    type: "Follow-up",
    category: "Sales",
    isCompleted: false,
    notes: "Client showed interest in additional features",
    recurring: false
  },
  {
    id: 2,
    clientId: 2,
    clientName: "Farai Chikomba",
    title: "SEO campaign review meeting",
    description: "Schedule and conduct monthly SEO campaign performance review",
    dueDate: "2024-01-25",
    priority: "Medium",
    status: "In Progress",
    type: "Meeting",
    category: "Client Relations",
    isCompleted: false,
    notes: "Prepare performance report before meeting",
    recurring: true,
    recurringPattern: "Monthly"
  },
  {
    id: 3,
    clientId: 4,
    clientName: "Tatenda Mutasa",
    title: "Mobile app payment reminder",
    description: "Send payment reminder for mobile app development project",
    dueDate: "2024-01-15",
    priority: "Urgent",
    status: "Overdue",
    type: "Payment",
    category: "Finance",
    isCompleted: false,
    notes: "Payment is 5 days overdue, send final reminder",
    recurring: false
  },
  {
    id: 4,
    clientId: 5,
    clientName: "Chiedza Marufu",
    title: "Brand identity project completion",
    description: "Finalize and deliver brand identity package",
    dueDate: "2024-01-30",
    priority: "High",
    status: "Completed",
    type: "Task",
    category: "Design",
    isCompleted: true,
    completedDate: "2024-01-28",
    notes: "Project completed ahead of schedule",
    recurring: false
  },
  {
    id: 5,
    clientId: 7,
    clientName: "Rumbidzai Gumbo",
    title: "Social media content planning",
    description: "Plan and schedule next month's social media content",
    dueDate: "2024-02-01",
    priority: "Medium",
    status: "Pending",
    type: "Task",
    category: "Marketing",
    isCompleted: false,
    notes: "Include holiday-themed content for February",
    recurring: true,
    recurringPattern: "Monthly"
  },
  {
    id: 6,
    clientId: 8,
    clientName: "Kudzai Mupfumira",
    title: "Website maintenance check",
    description: "Perform routine website maintenance and security updates",
    dueDate: "2024-01-22",
    priority: "Low",
    status: "Pending",
    type: "Task",
    category: "Maintenance",
    isCompleted: false,
    notes: "Check for plugin updates and security patches",
    recurring: true,
    recurringPattern: "Weekly"
  },
  {
    id: 7,
    clientId: 1,
    clientName: "Tendai Moyo",
    title: "Contract renewal discussion",
    description: "Discuss contract renewal terms and pricing",
    dueDate: "2024-02-10",
    priority: "High",
    status: "Pending",
    type: "Renewal",
    category: "Sales",
    isCompleted: false,
    notes: "Prepare new pricing proposal",
    recurring: false
  },
  {
    id: 8,
    clientId: 6,
    clientName: "Tafadzwa Sibanda",
    title: "Initial consultation call",
    description: "Conduct initial consultation call with prospect",
    dueDate: "2024-01-18",
    priority: "Medium",
    status: "Completed",
    type: "Meeting",
    category: "Sales",
    isCompleted: true,
    completedDate: "2024-01-18",
    notes: "Prospect interested in logo design services",
    recurring: false
  },
  {
    id: 9,
    clientId: 3,
    clientName: "Rutendo Ndlovu",
    title: "Reactivation campaign",
    description: "Send reactivation email to inactive client",
    dueDate: "2024-01-28",
    priority: "Medium",
    status: "Pending",
    type: "Follow-up",
    category: "Sales",
    isCompleted: false,
    notes: "Offer special discount for reactivation",
    recurring: false
  },
  {
    id: 10,
    clientId: 4,
    clientName: "Tatenda Mutasa",
    title: "Project milestone review",
    description: "Review mobile app development milestone and plan next phase",
    dueDate: "2024-02-05",
    priority: "High",
    status: "Pending",
    type: "Meeting",
    category: "Project Management",
    isCompleted: false,
    notes: "Prepare milestone report and next phase proposal",
    recurring: false
  }
];

// Dashboard statistics
export const dashboardStats: DashboardStats = {
  totalClients: mockClients.length,
  activeClients: mockClients.filter(client => client.status === 'Active').length,
  totalRevenue: mockClients.reduce((sum, client) => sum + client.totalRevenue, 0),
  pendingInvoices: mockInvoices.filter(invoice => invoice.status === 'Pending').length,
  recentContacts: mockContacts.filter(contact => {
    const contactDate = new Date(contact.date);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return contactDate >= thirtyDaysAgo;
  }).length
};

// Helper functions
export const getClientById = (id: number): Client | undefined => {
  return mockClients.find(client => client.id === id);
};

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
export const generateRevenueReport = (period: string = '30days'): RevenueReport => {
  const totalRevenue = mockClients.reduce((sum, client) => sum + client.totalRevenue, 0);
  const paidInvoices = mockInvoices.filter(invoice => invoice.status === 'Paid');
  const pendingInvoices = mockInvoices.filter(invoice => invoice.status === 'Pending');
  const overdueInvoices = mockInvoices.filter(invoice => invoice.status === 'Overdue');

  return {
    period,
    totalRevenue,
    paidRevenue: paidInvoices.reduce((sum, invoice) => sum + invoice.amount, 0),
    pendingRevenue: pendingInvoices.reduce((sum, invoice) => sum + invoice.amount, 0),
    overdueRevenue: overdueInvoices.reduce((sum, invoice) => sum + invoice.amount, 0),
    clientCount: mockClients.length,
    invoiceCount: mockInvoices.length
  };
};

export const generateClientReport = (period: string = '30days'): ClientReport => {
  const totalClients = mockClients.length;
  const activeClients = mockClients.filter(client => client.status === 'Active').length;
  const inactiveClients = mockClients.filter(client => client.status === 'Inactive').length;
  const prospectClients = mockClients.filter(client => client.status === 'Prospect').length;
  const totalRevenue = mockClients.reduce((sum, client) => sum + client.totalRevenue, 0);

  return {
    period,
    totalClients,
    newClients: Math.floor(totalClients * 0.2), // Mock calculation
    activeClients,
    inactiveClients,
    prospectClients,
    averageRevenuePerClient: totalRevenue / totalClients
  };
};

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
  const clientTypes = ['Individual', 'Business', 'Enterprise'];
  const typeCounts = [
    mockClients.filter(client => client.type === 'Individual').length,
    mockClients.filter(client => client.type === 'Business').length,
    mockClients.filter(client => client.type === 'Enterprise').length
  ];

  return {
    labels: clientTypes,
    datasets: [
      {
        label: 'Client Count',
        data: typeCounts,
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(168, 85, 247, 0.8)'
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(168, 85, 247, 1)'
        ],
        borderWidth: 1
      }
    ]
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
export const getTopClientsByRevenue = (limit: number = 5): Client[] => {
  return [...mockClients]
    .sort((a, b) => b.totalRevenue - a.totalRevenue)
    .slice(0, limit);
};

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