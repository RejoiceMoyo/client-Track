import React, { useState, useMemo } from 'react';
import { Users, Package, DollarSign, Search, Plus, Eye, Edit, Trash2, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [clientFilter, setClientFilter] = useState('all-clients');
  const [serviceFilter, setServiceFilter] = useState('active-services');
  const [expiryFilter, setExpiryFilter] = useState('expiring-soon');

  const navigate = useNavigate();

  // Placeholders for dashboard stats (replace with real data fetching logic)
  const totalClients = 0;
  const totalRevenue = 0;
  const activeServices = 0;
  const expiringSoon = 0;

  // Placeholder for renewals (replace with real data fetching logic)
  // const filteredRenewals = useMemo(() => [], []);

  const handleAddClient = () => {
    // Navigate to /clients and open the add client modal
    navigate('/clients', { state: { openAddClientModal: true } });
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
                <p className="text-3xl font-bold text-gray-900">{totalClients}</p>
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
                <p className="text-3xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
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
        {/*
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          ...
        </div>
        */}
        {/* Service Renewals table removed: implement with real data source in the future */}
      </div>
    </div>
  );
}; 