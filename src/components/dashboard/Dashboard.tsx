import React, { useState, useMemo } from 'react';
import { Users, Package, DollarSign, Search, Plus, Eye, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { 
  dashboardStats, 
  mockClients, 
  mockRenewals
} from '../../data';

export const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [clientFilter, setClientFilter] = useState('all-clients');
  const [serviceFilter, setServiceFilter] = useState('active-services');
  const [expiryFilter, setExpiryFilter] = useState('expiring-soon');

  // Get dashboard data from mock data
  const stats = dashboardStats;
  
  // Calculate additional stats
  const expiringSoon = 0;
  const activeServices = mockClients.reduce((sum, client) => sum + client.services, 0);

  // Filter renewals based on search and filters
  const filteredRenewals = useMemo(() => mockRenewals, []);

  const handleAddClient = () => {
    console.log('Opening add client form...');
  };

  const handleViewClient = (clientId: number) => {
    console.log(`Viewing client ${clientId}`);
    // In a real app, this would navigate to client details
  };

  const handleEditClient = (clientId: number) => {
    console.log(`Editing client ${clientId}`);
    // In a real app, this would open edit form
  };

  const handleDeleteClient = (clientId: number) => {
    console.log(`Deleting client ${clientId}`);
    // In a real app, this would show confirmation dialog
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Client Overview</h1>
            <p className="text-gray-600 mt-1 ">Manage your clients and track service renewals</p>
          </div>
          <button 
            onClick={handleAddClient}
            className="inline-flex items-center px-4 py-2 bg-[#096e6e] text-white font-medium border rounded-lg hover:bg-[#0d8080] focus:outline-none focus:ring-2 focus:ring-[#096e6e] focus:ring-offset-2 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
            <div className="p-3 bg-blue-50 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Clients</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalClients}</p>
               
              </div>
             
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
            <div className="p-3 bg-green-50 rounded-lg">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Active Projects</p>
                <p className="text-3xl font-bold text-gray-900">{activeServices}</p>
                
              </div>
             
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
            <div className="p-3 bg-orange-50 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Expiring Soon</p>
                <p className="text-3xl font-bold text-gray-900">{expiringSoon}</p>
               
              </div>
             
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
            <div className="p-3 bg-purple-50 rounded-lg">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Revenue YTD</p>
                <p className="text-3xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
              
              </div>
             
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search clients or services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <select 
                value={clientFilter}
                onChange={(e) => setClientFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all-clients">All Clients</option>
                <option value="individual">Individual</option>
                <option value="business">Business</option>
                <option value="enterprise">Enterprise</option>
              </select>

              <select 
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="active-services">All Services</option>
                <option value="development">Development</option>
                <option value="marketing">Marketing</option>
                <option value="design">Design</option>
                <option value="content">Content</option>
              </select>

              <select 
                value={expiryFilter}
                onChange={(e) => setExpiryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="expiring-soon">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="due">Due</option>
                <option value="overdue">Overdue</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Upcoming Service Renewals Table */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-50/50 px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Service Renewals</h3>
              <span className="text-sm text-gray-500">{filteredRenewals.length} results</span>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/30">
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Client</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Service</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Amount</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Expiry Date</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRenewals.map((renewal) => (
                  <tr key={renewal.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{renewal.clientName}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-blue-600 font-medium">{renewal.serviceName}</td>
                    <td className="py-4 px-6 text-sm text-gray-900">${renewal.renewalPrice}</td>
                    <td className="py-4 px-6 text-sm text-gray-500">{renewal.renewalDate}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        renewal.status === "Overdue"
                          ? "bg-red-100 text-red-800"
                          : renewal.status === "Due"
                            ? "bg-orange-100 text-orange-800"
                            : renewal.status === "Upcoming"
                              ? "bg-blue-100 text-blue-800"
                              : renewal.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                      }`}>
                        {renewal.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleViewClient(renewal.id)}
                          className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          title="View details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEditClient(renewal.id)}
                          className="p-2 text-green-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                          title="Edit client"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClient(renewal.id)}
                          className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                          title="Delete client"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredRenewals.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No renewals found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 