import React, { useState, useMemo, useEffect } from 'react';
import { 
  // BarChart3, 
  // TrendingUp, 
  Users, 
  DollarSign, 
  // Calendar, 
  // Clock, 
  AlertTriangle, 
  // Download, 
  // Eye,
  // Activity,
  Target,
  // CheckCircle,
  // XCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  generateRevenueReport,
  generateClientReport,
  // generateServiceReport,
  // generateProjectReport, // Removed
  // generateRenewalReport,
  // generateReminderReport,
  generateRevenueChartData,
  generateClientTypeChartData,
  generateServiceRevenueChartData,
  // generateProjectStatusChartData, // Removed
  // getTopClientsByRevenue,
  // getRecentInvoices,
  // getUpcomingRenewalsForReports,
  // getOverdueRemindersForReports
} from '../../data';
import type { ChartData } from '../../types';

// Simple Chart Component (since we don't have Chart.js installed)
const SimpleBarChart: React.FC<{ data: ChartData; title: string; height?: number }> = ({ data, title, height = 200 }) => {
  const maxValue = Math.max(...data.datasets[0].data);
  
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-3" style={{ height }}>
        {data.labels.map((label: string, index: number) => {
          const value = data.datasets[0].data[index];
          const percentage = (value / maxValue) * 100;
          const backgroundColor = Array.isArray(data.datasets[0].backgroundColor) 
            ? (data.datasets[0].backgroundColor as string[])[index] 
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
  const total = data.datasets[0].data.reduce((sum: number, value: number) => sum + value, 0);
  
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      <div className="space-y-2">
        {data.labels.map((label: string, index: number) => {
          const value = data.datasets[0].data[index];
          const percentage = ((value / total) * 100).toFixed(1);
          const backgroundColor = Array.isArray(data.datasets[0].backgroundColor) 
            ? (data.datasets[0].backgroundColor as string[])[index] 
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

// const DataTable: React.FC<{
//   title: string;
//   headers: string[];
//   data: any[];
//   onViewDetails?: (item: any) => void;
// }> = ({ title, headers, data, onViewDetails }) => (
//   <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//     <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
//       <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
//     </div>
//     <div className="overflow-x-auto">
//       <table className="w-full">
//         <thead>
//           <tr className="border-b border-gray-200 bg-gray-50/30">
//             {headers.map((header) => (
//               <th key={header} className="text-left py-3 px-6 text-sm font-medium text-gray-600">
//                 {header}
//               </th>
//             ))}
//             {onViewDetails && <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Actions</th>}
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item, index) => (
//             <tr key={index} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
//               {Object.values(item).map((value: any, valueIndex) => (
//                 <td key={valueIndex} className="py-3 px-6 text-sm text-gray-900">
//                   {typeof value === 'number' && value > 1000 ? `$${value.toLocaleString()}` : value}
//                 </td>
//               ))}
//               {onViewDetails && (
//                 <td className="py-3 px-6">
//                   <button
//                     onClick={() => onViewDetails(item)}
//                     className="p-1 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
//                     title="View details"
//                   >
//                     <Eye className="h-4 w-4" />
//                   </button>
//                 </td>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </div>
// );

export const ReportsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState<'7days' | '30days' | '90days' | '1year'>('30days');

  useEffect(() => {
    setDateRange("1year");
  }, []);

  // const [selectedReport, setSelectedReport] = useState<string>('overview');

  // Generate reports based on selected date range
  const revenueReport = useMemo(() => generateRevenueReport(dateRange), [dateRange]);
  const clientReport = useMemo(() => generateClientReport(dateRange), [dateRange]);
  // const serviceReport = useMemo(() => generateServiceReport(), []);
  // const projectReport = useMemo(() => generateProjectReport(dateRange), [dateRange]); // Removed
  // const renewalReport = useMemo(() => generateRenewalReport(dateRange), [dateRange]);
  // const reminderReport = useMemo(() => generateReminderReport(dateRange), [dateRange]);

  // Generate chart data
  const revenueChartData = useMemo(() => generateRevenueChartData(), []);
  const clientTypeChartData = useMemo(() => generateClientTypeChartData(), []);
  const serviceRevenueChartData = useMemo(() => generateServiceRevenueChartData(), []);
  // const projectStatusChartData = useMemo(() => generateProjectStatusChartData(), []); // Removed

  // Get top performers
  // const topClients = useMemo(() => getTopClientsByRevenue(5), []);
  // const recentInvoices = useMemo(() => getRecentInvoices(5), []);
  // const upcomingRenewals = useMemo(() => getUpcomingRenewalsForReports(5), []);
  // const overdueReminders = useMemo(() => getOverdueRemindersForReports(5), []);

  // const handleExportReport = (format: 'pdf' | 'csv' | 'excel') => {
  //   // Mock export functionality
  //   console.log(`Exporting ${selectedReport} report as ${format}`);
  //   alert(`Exporting ${selectedReport} report as ${format.toUpperCase()}`);
  // };

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
          value={'N/A'} // Was projectReport.activeProjects - Updated due to mockProjects removal
          change={0} // Updated due to mockProjects removal
          icon={<Target className="h-6 w-6 text-white" />}
          color="bg-purple-500"
        />
        <MetricCard
          title="Pending Invoices"
          value={'N/A'} // Was revenueReport.invoiceCount - Updated due to mockInvoices removal
          change={0} // Updated due to mockInvoices removal
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

      {/* Project Status - Chart Removed */}
      {/* <SimplePieChart
        data={projectStatusChartData}
        title="Project Status Distribution"
      /> */}
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
          title="Active Clients"
          value={clientReport.activeClients}
          change={8.2}
          icon={<Users className="h-6 w-6 text-white" />}
          color="bg-blue-500"
        />
        <MetricCard
          title="Active Projects"
          value={'N/A'} // Was projectReport.activeProjects - Updated due to mockProjects removal
          change={0} // Updated due to mockProjects removal
          icon={<Target className="h-6 w-6 text-white" />}
          color="bg-purple-500"
        />
        <MetricCard
          title="Pending Invoices"
          value={'N/A'} // Was revenueReport.invoiceCount - Updated due to mockInvoices removal
          change={0} // Updated due to mockInvoices removal
          icon={<AlertTriangle className="h-6 w-6 text-white" />}
          color="bg-orange-500"
        />
      </div>
      {/* ...other content... */}
    </div>
  );

  return (
    <div className="space-y-6">
      {renderOverview()}
      {renderRevenueReport()}
    </div>
  );
};