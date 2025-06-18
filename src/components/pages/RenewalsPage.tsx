import React, { useState, useMemo } from 'react';
import { Plus, Search, Edit, Trash2, Eye, DollarSign, Calendar, RefreshCw, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import type { Renewal, RenewalFormData, RenewalModalProps } from '../../types';
import { mockRenewals, mockClients, mockServices } from '../../data';
import { ConfirmDeleteModal } from '../common/ConfirmDeleteModal';
import { DetailViewModal, DetailSection, DetailRow, DetailGrid } from '../common/DetailViewModal';

const RenewalModal: React.FC<RenewalModalProps> = ({ isOpen, onClose, renewal, mode, onSubmit }) => {
  const [formData, setFormData] = useState<RenewalFormData>({
    clientId: renewal?.clientId || 1,
    serviceId: renewal?.serviceId || 1,
    currentPrice: renewal?.currentPrice || 0,
    renewalPrice: renewal?.renewalPrice || 0,
    renewalDate: renewal?.renewalDate || new Date().toISOString().split('T')[0],
    status: renewal?.status || 'Upcoming',
    autoRenew: renewal?.autoRenew || false,
    notes: renewal?.notes || '',
    nextRenewalDate: renewal?.nextRenewalDate || new Date().toISOString().split('T')[0]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              type === 'number' ? parseFloat(value) || 0 : value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    {mode === 'create' ? 'Add New Renewal' : 'Edit Renewal'}
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Client</label>
                      <select
                        name="clientId"
                        value={formData.clientId}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e]"
                        required
                      >
                        {mockClients.map(client => (
                          <option key={client.id} value={client.id}>
                            {client.name} - {client.company}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Service</label>
                      <select
                        name="serviceId"
                        value={formData.serviceId}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e]"
                        required
                      >
                        {mockServices.map(service => (
                          <option key={service.id} value={service.id}>
                            {service.name} - ${service.price}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Current Price ($)</label>
                        <input
                          type="number"
                          name="currentPrice"
                          value={formData.currentPrice}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e]"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Renewal Price ($)</label>
                        <input
                          type="number"
                          name="renewalPrice"
                          value={formData.renewalPrice}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e]"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Renewal Date</label>
                        <input
                          type="date"
                          name="renewalDate"
                          value={formData.renewalDate}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e]"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Next Renewal Date</label>
                        <input
                          type="date"
                          name="nextRenewalDate"
                          value={formData.nextRenewalDate}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e]"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e]"
                      >
                        <option value="Upcoming">Upcoming</option>
                        <option value="Due">Due</option>
                        <option value="Overdue">Overdue</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="autoRenew"
                        checked={formData.autoRenew}
                        onChange={handleChange}
                        className="h-4 w-4 text-[#096e6e] focus:ring-[#096e6e] border-gray-300 rounded"
                      />
                      <label className="ml-2 block text-sm text-gray-900">
                        Auto-renewal enabled
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Notes</label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e]"
                        placeholder="Additional notes about this renewal..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#096e6e] text-base font-medium text-white hover:bg-[#0d8080] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#096e6e] sm:ml-3 sm:w-auto sm:text-sm transition-colors"
              >
                {mode === 'create' ? 'Create Renewal' : 'Update Renewal'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#096e6e] sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export const RenewalsPage: React.FC = () => {
  const [renewals, setRenewals] = useState<Renewal[]>(mockRenewals);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedRenewal, setSelectedRenewal] = useState<Renewal | undefined>(undefined);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [renewalToDelete, setRenewalToDelete] = useState<Renewal | undefined>(undefined);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [renewalToView, setRenewalToView] = useState<Renewal | undefined>(undefined);

  // Filter renewals based on search and filters
  const filteredRenewals = useMemo(() => {
    return renewals.filter(renewal => {
      const matchesSearch = 
        renewal.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        renewal.serviceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        renewal.notes?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || renewal.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [renewals, searchTerm, statusFilter]);

  const handleCreateRenewal = () => {
    setModalMode('create');
    setSelectedRenewal(undefined);
    setIsModalOpen(true);
  };

  const handleEditRenewal = (renewal: Renewal) => {
    setModalMode('edit');
    setSelectedRenewal(renewal);
    setIsModalOpen(true);
  };

  const handleDeleteRenewal = (renewal: Renewal) => {
    setRenewalToDelete(renewal);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteRenewal = () => {
    if (renewalToDelete) {
      setRenewals(renewals.filter(renewal => renewal.id !== renewalToDelete.id));
    }
  };

  const handleViewRenewal = (renewal: Renewal) => {
    setRenewalToView(renewal);
    setIsDetailModalOpen(true);
  };

  const handleSubmitRenewal = (renewalData: RenewalFormData) => {
    const client = mockClients.find(c => c.id === renewalData.clientId);
    const service = mockServices.find(s => s.id === renewalData.serviceId);
    
    if (modalMode === 'create') {
      const newRenewal: Renewal = {
        ...renewalData,
        id: Math.max(...renewals.map(r => r.id)) + 1,
        clientName: client?.name || '',
        serviceName: service?.name || ''
      };
      setRenewals([...renewals, newRenewal]);
    } else {
      setRenewals(renewals.map(renewal => 
        renewal.id === selectedRenewal?.id 
          ? { 
              ...renewal, 
              ...renewalData,
              clientName: client?.name || renewal.clientName,
              serviceName: service?.name || renewal.serviceName
            }
          : renewal
      ));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Upcoming': return 'bg-blue-100 text-blue-800';
      case 'Due': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Upcoming': return <Calendar className="h-4 w-4" />;
      case 'Due': return <AlertTriangle className="h-4 w-4" />;
      case 'Overdue': return <AlertTriangle className="h-4 w-4" />;
      case 'Completed': return <CheckCircle className="h-4 w-4" />;
      case 'Cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getDaysUntilRenewal = (renewalDate: string) => {
    const today = new Date();
    const renewal = new Date(renewalDate);
    const diffTime = renewal.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Renewals</h1>
          <p className="text-gray-600">Manage service renewals and subscriptions</p>
        </div>
        <button 
          onClick={handleCreateRenewal}
          className="inline-flex items-center px-4 py-2 bg-[#096e6e] text-white font-medium rounded-lg hover:bg-[#0d8080] focus:outline-none focus:ring-2 focus:ring-[#096e6e] focus:ring-offset-2 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Renewal
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search renewals by client, service, or notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e]"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e]"
            >
              <option value="all">All Status</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Due">Due</option>
              <option value="Overdue">Overdue</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Renewals Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Renewal List</h3>
            <span className="text-sm text-gray-500">{filteredRenewals.length} renewals</span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/30">
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Client & Service</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Renewal Date</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Pricing</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Auto-Renew</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRenewals.map((renewal) => {
                const daysUntil = getDaysUntilRenewal(renewal.renewalDate);
                return (
                  <tr key={renewal.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{renewal.clientName}</div>
                        <div className="text-sm text-gray-500">{renewal.serviceName}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        {getStatusIcon(renewal.status)}
                        <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(renewal.status)}`}>
                          {renewal.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <div className="text-sm text-gray-900">{renewal.renewalDate}</div>
                        <div className="text-xs text-gray-500">
                          {daysUntil > 0 ? `${daysUntil} days away` : 
                           daysUntil < 0 ? `${Math.abs(daysUntil)} days overdue` : 
                           'Due today'}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="text-sm text-gray-600">
                          Current: ${renewal.currentPrice.toLocaleString()}
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          Renewal: ${renewal.renewalPrice.toLocaleString()}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        {renewal.autoRenew ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-gray-400" />
                        )}
                        <span className="ml-2 text-sm text-gray-600">
                          {renewal.autoRenew ? 'Enabled' : 'Disabled'}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleViewRenewal(renewal)}
                          className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          title="View details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEditRenewal(renewal)}
                          className="p-2 text-green-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                          title="Edit renewal"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteRenewal(renewal)}
                          className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                          title="Delete renewal"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        
        {filteredRenewals.length === 0 && (
          <div className="text-center py-12">
            <RefreshCw className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No renewals found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Renewal Modal */}
      <RenewalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        renewal={selectedRenewal}
        mode={modalMode}
        onSubmit={handleSubmitRenewal}
      />

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteRenewal}
        title="Delete Renewal"
        message="Are you sure you want to delete the renewal"
        itemName={`${renewalToDelete?.clientName} - ${renewalToDelete?.serviceName}`}
      />

      {/* Detail View Modal */}
      <DetailViewModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title={`${renewalToView?.clientName} - ${renewalToView?.serviceName}`}
      >
        {renewalToView && (
          <div className="space-y-6">
            <DetailSection title="Renewal Information">
              <DetailGrid>
                <DetailRow 
                  label="Client" 
                  value={renewalToView.clientName} 
                  icon={<Calendar className="h-4 w-4" />}
                />
                <DetailRow 
                  label="Service" 
                  value={renewalToView.serviceName} 
                  icon={<RefreshCw className="h-4 w-4" />}
                />
                <DetailRow 
                  label="Status" 
                  value={renewalToView.status} 
                  icon={getStatusIcon(renewalToView.status)}
                />
                <DetailRow 
                  label="Auto-Renew" 
                  value={renewalToView.autoRenew ? 'Enabled' : 'Disabled'} 
                  icon={renewalToView.autoRenew ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                />
              </DetailGrid>
            </DetailSection>
            
            <DetailSection title="Pricing Information">
              <DetailGrid>
                <DetailRow 
                  label="Current Price" 
                  value={`$${renewalToView.currentPrice.toLocaleString()}`} 
                  icon={<DollarSign className="h-4 w-4" />}
                />
                <DetailRow 
                  label="Renewal Price" 
                  value={`$${renewalToView.renewalPrice.toLocaleString()}`} 
                  icon={<DollarSign className="h-4 w-4" />}
                />
                <DetailRow 
                  label="Renewal Date" 
                  value={renewalToView.renewalDate} 
                  icon={<Calendar className="h-4 w-4" />}
                />
                <DetailRow 
                  label="Next Renewal" 
                  value={renewalToView.nextRenewalDate} 
                  icon={<Calendar className="h-4 w-4" />}
                />
              </DetailGrid>
            </DetailSection>

            {renewalToView.lastRenewalDate && (
              <DetailSection title="Previous Renewal">
                <DetailRow 
                  label="Last Renewal Date" 
                  value={renewalToView.lastRenewalDate} 
                  icon={<Calendar className="h-4 w-4" />}
                />
              </DetailSection>
            )}

            {renewalToView.notes && (
              <DetailSection title="Notes">
                <p className="text-sm text-gray-600">{renewalToView.notes}</p>
              </DetailSection>
            )}
          </div>
        )}
      </DetailViewModal>
    </div>
  );
}; 