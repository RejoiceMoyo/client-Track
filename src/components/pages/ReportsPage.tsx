import React, { useState, useMemo } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  Download, 
  Filter,
  Eye,
  PieChart,
  Activity,
  Target,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import type { 
  RevenueReport, 
  ClientReport, 
  ServiceReport, 
  ProjectReport, 
  RenewalReport, 
  ReminderReport,
  ReportFilters,
  ChartData
} from '../../types';
import { 
  generateRevenueReport,
  generateClientReport,
  generateServiceReport,
  generateProjectReport,
  generateRenewalReport,
  generateReminderReport,
  generateRevenueChartData,
  generateClientTypeChartData,
  generateServiceRevenueChartData,
  generateProjectStatusChartData,
  getTopClientsByRevenue,
  getTopServicesByRevenue,
  getRecentInvoices,
  getUpcomingRenewalsForReports,
  getOverdueRemindersForReports
} from '../../data';

// Simple Chart Component (since we don't have Chart.js installed)
const SimpleBarChart: React.FC<{ data: ChartData; title: string; height?: number }> = ({ data, title, height = 200 }) => {
  const maxValue = Math.max(...data.datasets[0].data);
  
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-3" style={{ height }}>
        {data.labels.map((label, index) => {
          const value = data.datasets[0].data[index];
          const percentage = (value / maxValue) * 100;
          const backgroundColor = Array.isArray(data.datasets[0].backgroundColor) 
            ? data.datasets[0].backgroundColor[index] 
            : data.datasets[0].backgroundColor;
          
          return (
            <div key={label} className="flex items-center space-x-3">
              <div className="w-24 text-sm text-gray-600 truncate">{label}</div>
              <div className="flex-1 bg-gray-200 rounded-full h-4">
                <div 
                  className="h-4 rounded-full transition-all duration-300"
                  style={{ 
                    width: `${percentage}%`,
                    backgroundColor: backgroundColor || '#096e6e'
                  }}
                />
              </div>
              <div className="w-16 text-sm font-medium text-gray-900 text-right">
                {value.toLocaleString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SimplePieChart: React.FC<{ data: ChartData; title: string }> = ({ data, title }) => {
  const total = data.datasets[0].data.reduce((sum, value) => sum + value, 0);
  
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-2">
        {data.labels.map((label, index) => {
          const value = data.datasets[0].data[index];
          const percentage = ((value / total) * 100).toFixed(1);
          const backgroundColor = Array.isArray(data.datasets[0].backgroundColor) 
            ? data.datasets[0].backgroundColor[index] 
            : data.datasets[0].backgroundColor;
          
          return (
            <div key={label} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: backgroundColor || '#096e6e' }}
                />
                <span className="text-sm text-gray-600">{label}</span>
              </div>
              <div className="text-sm font-medium text-gray-900">
                {value} ({percentage}%)
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MetricCard: React.FC<{
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
  color: string;
}> = ({ title, value, change, icon, color }) => (
  <div className="bg-white p-6 rounded-lg border border-gray-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        {change !== undefined && (
          <div className="flex items-center mt-2">
            {change >= 0 ? (
              <ArrowUpRight className="h-4 w-4 text-green-500" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-red-500" />
            )}
            <span className={`text-sm font-medium ml-1 ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {Math.abs(change)}%
            </span>
            <span className="text-sm text-gray-500 ml-1">vs last period</span>
          </div>
        )}
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        {icon}
      </div>
    </div>
  </div>
);

const DataTable: React.FC<{
  title: string;
  headers: string[];
  data: any[];
  onViewDetails?: (item: any) => void;
}> = ({ title, headers, data, onViewDetails }) => (
  <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50/30">
            {headers.map((header) => (
              <th key={header} className="text-left py-3 px-6 text-sm font-medium text-gray-600">
                {header}
              </th>
            ))}
            {onViewDetails && <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
              {Object.values(item).map((value: any, valueIndex) => (
                <td key={valueIndex} className="py-3 px-6 text-sm text-gray-900">
                  {typeof value === 'number' && value > 1000 ? `$${value.toLocaleString()}` : value}
                </td>
              ))}
              {onViewDetails && (
                <td className="py-3 px-6">
                  <button
                    onClick={() => onViewDetails(item)}
                    className="p-1 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="View details"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export const ReportsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState<'7days' | '30days' | '90days' | '1year'>('30days');
  const [selectedReport, setSelectedReport] = useState<string>('overview');

  // Generate reports based on selected date range
  const revenueReport = useMemo(() => generateRevenueReport(dateRange), [dateRange]);
  const clientReport = useMemo(() => generateClientReport(dateRange), [dateRange]);
  const serviceReport = useMemo(() => generateServiceReport(), []);
  const projectReport = useMemo(() => generateProjectReport(dateRange), [dateRange]);
  const renewalReport = useMemo(() => generateRenewalReport(dateRange), [dateRange]);
  const reminderReport = useMemo(() => generateReminderReport(dateRange), [dateRange]);

  // Generate chart data
  const revenueChartData = useMemo(() => generateRevenueChartData(), []);
  const clientTypeChartData = useMemo(() => generateClientTypeChartData(), []);
  const serviceRevenueChartData = useMemo(() => generateServiceRevenueChartData(), []);
  const projectStatusChartData = useMemo(() => generateProjectStatusChartData(), []);

  // Get top performers
  const topClients = useMemo(() => getTopClientsByRevenue(5), []);
  const topServices = useMemo(() => getTopServicesByRevenue(5), []);
  const recentInvoices = useMemo(() => getRecentInvoices(5), []);
  const upcomingRenewals = useMemo(() => getUpcomingRenewalsForReports(5), []);
  const overdueReminders = useMemo(() => getOverdueRemindersForReports(5), []);

  const handleExportReport = (format: 'pdf' | 'csv' | 'excel') => {
    // Mock export functionality
    console.log(`Exporting ${selectedReport} report as ${format}`);
    alert(`Exporting ${selectedReport} report as ${format.toUpperCase()}`);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value={`$${revenueReport.totalRevenue.toLocaleString()}`}
          change={12.5}
          icon={<DollarSign className="h-6 w-6 text-white" />}
          color="bg-green-500"
        />
        <MetricCard
          title="Active Clients"
          value={clientReport.activeClients}
          change={8.2}
          icon={<Users className="h-6 w-6 text-white" />}
          color="bg-blue-500"
        />
        <MetricCard
          title="Active Projects"
          value={projectReport.activeProjects}
          change={-3.1}
          icon={<Target className="h-6 w-6 text-white" />}
          color="bg-purple-500"
        />
        <MetricCard
          title="Pending Invoices"
          value={revenueReport.invoiceCount}
          change={15.7}
          icon={<AlertTriangle className="h-6 w-6 text-white" />}
          color="bg-orange-500"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SimpleBarChart
          data={revenueChartData}
          title="Revenue Trend"
          height={300}
        />
        <SimplePieChart
          data={clientTypeChartData}
          title="Client Distribution"
        />
      </div>

      {/* Service Performance */}
      <SimpleBarChart
        data={serviceRevenueChartData}
        title="Service Revenue Performance"
        height={250}
      />

      {/* Project Status */}
      <SimplePieChart
        data={projectStatusChartData}
        title="Project Status Distribution"
      />
    </div>
  );

  const renderRevenueReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="Total Revenue"
          value={`$${revenueReport.totalRevenue.toLocaleString()}`}
          icon={<DollarSign className="h-6 w-6 text-white" />}
          color="bg-green-500"
        />
        <MetricCard
          title="Paid Revenue"
          value={`$${revenueReport.paidRevenue.toLocaleString()}`}
          icon={<CheckCircle className="h-6 w-6 text-white" />}
          color="bg-blue-500"
        />
        <MetricCard
          title="Pending Revenue"
          value={`$${revenueReport.pendingRevenue.toLocaleString()}`}
          icon={<Clock className="h-6 w-6 text-white" />}
          color="bg-orange-500"
        />
      </div>

      <SimpleBarChart
        data={revenueChartData}
        title="Revenue Breakdown"
        height={300}
      />

      <DataTable
        title="Recent Invoices"
        headers={['Client', 'Amount', 'Status', 'Due Date']}
        data={recentInvoices.map(invoice => ({
          client: invoice.clientName,
          amount: invoice.amount,
          status: invoice.status,
          dueDate: invoice.dueDate
        }))}
      />
    </div>
  );

  const renderClientReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Clients"
          value={clientReport.totalClients}
          icon={<Users className="h-6 w-6 text-white" />}
          color="bg-blue-500"
        />
        <MetricCard
          title="Active Clients"
          value={clientReport.activeClients}
          icon={<CheckCircle className="h-6 w-6 text-white" />}
          color="bg-green-500"
        />
        <MetricCard
          title="New Clients"
          value={clientReport.newClients}
          icon={<ArrowUpRight className="h-6 w-6 text-white" />}
          color="bg-purple-500"
        />
        <MetricCard
          title="Avg Revenue/Client"
          value={`$${clientReport.averageRevenuePerClient.toLocaleString()}`}
          icon={<DollarSign className="h-6 w-6 text-white" />}
          color="bg-orange-500"
        />
      </div>

      <SimplePieChart
        data={clientTypeChartData}
        title="Client Type Distribution"
      />

      <DataTable
        title="Top Clients by Revenue"
        headers={['Client', 'Company', 'Type', 'Revenue', 'Services']}
        data={topClients.map(client => ({
          client: client.name,
          company: client.company,
          type: client.type,
          revenue: client.totalRevenue,
          services: client.services
        }))}
      />
    </div>
  );

  const renderServiceReport = () => (
    <div className="space-y-6">
      <SimpleBarChart
        data={serviceRevenueChartData}
        title="Service Revenue Performance"
        height={300}
      />

      <DataTable
        title="Service Performance Details"
        headers={['Service', 'Category', 'Revenue', 'Clients', 'Avg Price']}
        data={serviceReport.map(service => ({
          service: service.serviceName,
          category: service.category,
          revenue: service.totalRevenue,
          clients: service.clientCount,
          avgPrice: service.averagePrice
        }))}
      />
    </div>
  );

  const renderProjectReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Projects"
          value={projectReport.totalProjects}
          icon={<Target className="h-6 w-6 text-white" />}
          color="bg-blue-500"
        />
        <MetricCard
          title="Active Projects"
          value={projectReport.activeProjects}
          icon={<Activity className="h-6 w-6 text-white" />}
          color="bg-green-500"
        />
        <MetricCard
          title="Completed Projects"
          value={projectReport.completedProjects}
          icon={<CheckCircle className="h-6 w-6 text-white" />}
          color="bg-purple-500"
        />
        <MetricCard
          title="Total Budget"
          value={`$${projectReport.totalBudget.toLocaleString()}`}
          icon={<DollarSign className="h-6 w-6 text-white" />}
          color="bg-orange-500"
        />
      </div>

      <SimplePieChart
        data={projectStatusChartData}
        title="Project Status Distribution"
      />
    </div>
  );

  const renderRenewalReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Renewals"
          value={renewalReport.totalRenewals}
          icon={<Calendar className="h-6 w-6 text-white" />}
          color="bg-blue-500"
        />
        <MetricCard
          title="Completed Renewals"
          value={renewalReport.completedRenewals}
          icon={<CheckCircle className="h-6 w-6 text-white" />}
          color="bg-green-500"
        />
        <MetricCard
          title="Upcoming Renewals"
          value={renewalReport.upcomingRenewals}
          icon={<Clock className="h-6 w-6 text-white" />}
          color="bg-orange-500"
        />
        <MetricCard
          title="Renewal Rate"
          value={`${renewalReport.averageRenewalRate.toFixed(1)}%`}
          icon={<TrendingUp className="h-6 w-6 text-white" />}
          color="bg-purple-500"
        />
      </div>

      <DataTable
        title="Upcoming Renewals"
        headers={['Client', 'Service', 'Renewal Date', 'Current Price', 'Renewal Price']}
        data={upcomingRenewals.map(renewal => ({
          client: renewal.clientName,
          service: renewal.serviceName,
          renewalDate: renewal.renewalDate,
          currentPrice: renewal.currentPrice,
          renewalPrice: renewal.renewalPrice
        }))}
      />
    </div>
  );

  const renderReminderReport = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Reminders"
          value={reminderReport.totalReminders}
          icon={<Clock className="h-6 w-6 text-white" />}
          color="bg-blue-500"
        />
        <MetricCard
          title="Completed"
          value={reminderReport.completedReminders}
          icon={<CheckCircle className="h-6 w-6 text-white" />}
          color="bg-green-500"
        />
        <MetricCard
          title="Overdue"
          value={reminderReport.overdueReminders}
          icon={<XCircle className="h-6 w-6 text-white" />}
          color="bg-red-500"
        />
        <MetricCard
          title="Completion Rate"
          value={`${reminderReport.averageCompletionRate.toFixed(1)}%`}
          icon={<TrendingUp className="h-6 w-6 text-white" />}
          color="bg-purple-500"
        />
      </div>

      <DataTable
        title="Overdue Reminders"
        headers={['Client', 'Title', 'Due Date', 'Priority', 'Type']}
        data={overdueReminders.map(reminder => ({
          client: reminder.clientName,
          title: reminder.title,
          dueDate: reminder.dueDate,
          priority: reminder.priority,
          type: reminder.type
        }))}
      />
    </div>
  );

  const renderSelectedReport = () => {
    switch (selectedReport) {
      case 'overview':
        return renderOverview();
      case 'revenue':
        return renderRevenueReport();
      case 'clients':
        return renderClientReport();
      case 'services':
        return renderServiceReport();
      case 'projects':
        return renderProjectReport();
      case 'renewals':
        return renderRenewalReport();
      case 'reminders':
        return renderReminderReport();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Comprehensive insights into your business performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e]"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="1year">Last year</option>
          </select>
          <button
            onClick={() => handleExportReport('pdf')}
            className="inline-flex items-center px-4 py-2 bg-[#096e6e] text-white font-medium rounded-lg hover:bg-[#0d8080] focus:outline-none focus:ring-2 focus:ring-[#096e6e] focus:ring-offset-2 transition-colors"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>

      {/* Report Navigation */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'revenue', label: 'Revenue', icon: DollarSign },
            { id: 'clients', label: 'Clients', icon: Users },
            { id: 'services', label: 'Services', icon: Activity },
            { id: 'projects', label: 'Projects', icon: Target },
            { id: 'renewals', label: 'Renewals', icon: Calendar },
            { id: 'reminders', label: 'Reminders', icon: Clock }
          ].map((report) => {
            const Icon = report.icon;
            return (
              <button
                key={report.id}
                onClick={() => setSelectedReport(report.id)}
                className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedReport === report.id
                    ? 'bg-[#096e6e] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Icon className="h-4 w-4 mr-2" />
                {report.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Report Content */}
      <div className="space-y-6">
        {renderSelectedReport()}
      </div>
    </div>
  );
}; 