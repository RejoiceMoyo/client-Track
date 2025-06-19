//import React from 'react'

import React,{useState,useMemo} from 'react';
import { Plus, Search, Edit, Trash2, Eye, Mail, Phone, Building, User, Calendar, DollarSign, MapPin, Globe, Briefcase, Info, Tag, UserCheck } from 'lucide-react';
import type { Client, ClientFormData, ClientModalProps } from '../../types';
// import { mockClients } from '../../data'; // No longer needed as initial state is empty
import { ConfirmDeleteModal } from '../common/ConfirmDeleteModal';
import { DetailViewModal, DetailSection, DetailRow, DetailGrid } from '../common/DetailViewModal';
import { useLocation } from 'react-router-dom';

// Client Modal Component
const ClientModal: React.FC<ClientModalProps> = ({ isOpen, onClose, client, mode, onSubmit }) => {
  // Use a local string for tags input, but keep the rest as ClientFormData
  const [formData, setFormData] = useState<Omit<ClientFormData, 'tags'> & { tags: string }>(
    {
      name: client?.name || '',
      email: client?.email || '',
      phone: client?.phone || '',
      company: client?.company || '',
      type: client?.type || 'Individual',
      status: client?.status || 'Active',
      address: client?.address || '',
      website: client?.website || '',
      industry: client?.industry || '',
      notes: client?.notes || '',
      tags: client?.tags ? (client.tags as string[]).join(', ') : '', // always a string for the input
      assignedTo: client?.assignedTo || '',
    } as Omit<ClientFormData, 'tags'> & { tags: string }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Convert tags string to array for submission
    const tagsString: string = formData.tags;
    const dataToSubmit: ClientFormData = {
      ...formData,
      tags: tagsString
        ? tagsString.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag !== '')
        : [],
    };
    onSubmit(dataToSubmit);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full md:w-3/4 lg:w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-6">
                    {mode === 'create' ? 'Add New Client' : 'Edit Client'}
                  </h3>
                  
                  <div className="w-full gap-x-6 gap-y-4 grid grid-cols-1 md:grid-cols-2">
                    {/* Existing Fields */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e]"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Company</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Type</label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e]"
                      >
                        <option value="Individual">Individual</option>
                        <option value="Business">Business</option>
                        <option value="Enterprise">Enterprise</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e]"
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Prospect">Prospect</option>
                      </select>
                    </div>

                    {/* New Fields */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Address</label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Website</label>
                      <input
                        type="url"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e]"
                        placeholder="https://example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Industry</label>
                      <input
                        type="text"
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e]"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Notes</label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
                      <input
                        type="text"
                        name="tags"
                        value={formData.tags} // This is a string
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e]"
                        placeholder="e.g., vip, new, referral"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Assigned To (User ID)</label>
                      <input
                        type="text"
                        name="assignedTo"
                        value={formData.assignedTo}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e]"
                        placeholder="Enter user ID or UUID"
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
                {mode === 'create' ? 'Create Client' : 'Update Client'}
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

export const ClientsPage: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedClient, setSelectedClient] = useState<Client | undefined>(undefined);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<Client | undefined>(undefined);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [clientToView, setClientToView] = useState<Client | undefined>(undefined);
  const location = useLocation();

  // Filter clients based on search and filters
  const filteredClients = useMemo(() => {
    return clients.filter(client => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        client.name.toLowerCase().includes(searchLower) ||
        client.email.toLowerCase().includes(searchLower) ||
        client.company.toLowerCase().includes(searchLower) ||
        (client.industry && client.industry.toLowerCase().includes(searchLower)) ||
        (client.tags && client.tags.some(tag => tag.toLowerCase().includes(searchLower)));
      
      const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
      const matchesType = typeFilter === 'all' || client.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [clients, searchTerm, statusFilter, typeFilter]);

  const openModal = () => {
    setError(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setError(null);
    setIsModalOpen(false);
  };

  const openDeleteModal = () => {
    setError(null);
    setIsDeleteModalOpen(true);
  }

  const closeDeleteModal = () => {
    setError(null);
    setIsDeleteModalOpen(false);
  }

  const openDetailModal = () => {
    setError(null);
    setIsDetailModalOpen(true);
  }

  const closeDetailModal = () => {
    setError(null);
    setIsDetailModalOpen(false);
  }

  const handleCreateClient = () => {
    setError(null);
    setModalMode('create');
    setSelectedClient(undefined);
    openModal();
  };

  const handleEditClient = (client: Client) => {
    setError(null);
    setModalMode('edit');
    setSelectedClient(client);
    openModal();
  };

  const handleDeleteClient = (client: Client) => {
    setClientToDelete(client);
    openDeleteModal();
  };

  const confirmDeleteClient = () => {
    if (clientToDelete) {
      setClients(clients.filter(client => client.id !== clientToDelete.id));
      closeDeleteModal();
    }
  };

  const handleViewClient = (client: Client) => {
    setClientToView(client);
    openDetailModal();
  };

  const handleSubmitClient = async (clientData: ClientFormData) => {
    setError(null); // Clear previous errors at the start of submission
    // Ensure tags are handled as an array
    const processedClientData = {
      ...clientData,
      tags: typeof clientData.tags === 'string'
            ? clientData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
            : (clientData.tags || [])
    };

    if (modalMode === 'create') {
      const apiPayload = {
        ...processedClientData, // Contains all form fields including new ones
        services: 0, // Default for creation
        totalRevenue: 0, // Default for creation
        lastContact: new Date().toISOString().split('T')[0] // Default to today
      };

      try {
        const response = await fetch('https://ct-backend-3ge7.onrender.com/api/v1/clients', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(apiPayload),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('API error:', response.status, errorText);
          setError(`Failed to create client. Server responded with ${response.status}: ${errorText.substring(0, 100)}`);
          // Not closing modal here, user might want to correct data and retry or explicitly cancel.
          return;
        }

        const createdClient = await response.json();
        setError(null); // Clear error on success

        // Update the local state with the client returned by the API
        setClients(prevClients => [...prevClients, createdClient]);
        closeModal(); // Close modal on successful creation

      } catch (err: any) { // Explicitly type err
        console.error('Failed to create client:', err);
        setError(`Failed to create client: ${err.message}`);
        // Not closing modal here.
      }
    } else {
      // Logic for updating an existing client (modalMode === 'edit')
      // This will be handled in a separate subtask for API integration.
      // For now, assume success and close modal.
      // This will be handled in a separate subtask for API integration.
      setClients(clients.map(client => 
        client.id === selectedClient?.id 
          ? { ...client, ...processedClientData }
          : client
      ));
      setError(null); // Assume success for local update for now
      closeModal(); // Close modal after edit
    }
    // setIsModalOpen(false); // Now handled by closeModal()
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'Prospect': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Enterprise': return 'bg-purple-100 text-purple-800';
      case 'Business': return 'bg-blue-100 text-blue-800';
      case 'Individual': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  React.useEffect(() => {
    if (location.state && location.state.openAddClientModal) {
      setModalMode('create');
      setSelectedClient(undefined);
      setIsModalOpen(true);
    }
  }, [location.state]);

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setError(null)}>
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
          </span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600">Manage your client relationships effectively.</p>
        </div>
        <button 
          onClick={handleCreateClient}
          className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-[#096e6e] text-white font-medium rounded-lg hover:bg-[#0d8080] focus:outline-none focus:ring-2 focus:ring-[#096e6e] focus:ring-offset-2 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Client
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 md:p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search clients by name, email, company, industry, or tags..."
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
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e] w-full sm:w-auto"
            >
              <option value="all">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Prospect">Prospect</option>
            </select>

            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e] w-full sm:w-auto"
            >
              <option value="all">All Types</option>
              <option value="Individual">Individual</option>
              <option value="Business">Business</option>
              <option value="Enterprise">Enterprise</option>
            </select>
          </div>
        </div>
      </div>

      {/* Clients Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50/50 px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Client List</h3>
            <span className="text-sm text-gray-500">{filteredClients.length} clients</span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]"> {/* Added min-w for better responsiveness */}
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/30">
                <th className="text-left py-3 px-4 md:py-4 md:px-6 text-xs md:text-sm font-medium text-gray-600 uppercase tracking-wider">Client</th>
                <th className="text-left py-3 px-4 md:py-4 md:px-6 text-xs md:text-sm font-medium text-gray-600 uppercase tracking-wider">Contact</th>
                <th className="text-left py-3 px-4 md:py-4 md:px-6 text-xs md:text-sm font-medium text-gray-600 uppercase tracking-wider">Type</th>
                <th className="text-left py-3 px-4 md:py-4 md:px-6 text-xs md:text-sm font-medium text-gray-600 uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-4 md:py-4 md:px-6 text-xs md:text-sm font-medium text-gray-600 uppercase tracking-wider hidden md:table-cell">Services</th>
                <th className="text-left py-3 px-4 md:py-4 md:px-6 text-xs md:text-sm font-medium text-gray-600 uppercase tracking-wider hidden lg:table-cell">Revenue</th>
                <th className="text-left py-3 px-4 md:py-4 md:px-6 text-xs md:text-sm font-medium text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredClients.map((client) => (
                <tr key={client.id} className="hover:bg-gray-50/50 transition-colors duration-150">
                  <td className="py-3 px-4 md:py-4 md:px-6">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{client.name}</div>
                      <div className="text-xs text-gray-500">{client.company}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4 md:py-4 md:px-6">
                    <div className="space-y-1">
                      <div className="flex items-center text-xs text-gray-600">
                        <Mail className="h-3 w-3 mr-1.5 flex-shrink-0" />
                        {client.email}
                      </div>
                      <div className="flex items-center text-xs text-gray-600">
                        <Phone className="h-3 w-3 mr-1.5 flex-shrink-0" />
                        {client.phone || '-'}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 md:py-4 md:px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeColor(client.type)}`}>
                      {client.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 md:py-4 md:px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 md:py-4 md:px-6 text-sm text-gray-900 hidden md:table-cell">{client.services}</td>
                  <td className="py-3 px-4 md:py-4 md:px-6 text-sm text-gray-900 hidden lg:table-cell">${client.totalRevenue.toLocaleString()}</td>
                  <td className="py-3 px-4 md:py-4 md:px-6">
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleViewClient(client)}
                        className="p-1.5 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all duration-150"
                        title="View details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEditClient(client)}
                        className="p-1.5 text-green-500 hover:text-green-600 hover:bg-green-50 rounded-md transition-all duration-150"
                        title="Edit client"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteClient(client)}
                        className="p-1.5 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-all duration-150"
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
        
        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No clients found</h3>
            <p className="text-sm text-gray-500">Try adjusting your search criteria or filters.</p>
          </div>
        )}
      </div>

      {/* Client Modal */}
      <ClientModal
        isOpen={isModalOpen}
        onClose={closeModal} // Use centralized close function
        client={selectedClient}
        mode={modalMode}
        onSubmit={handleSubmitClient}
      />

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal} // Use centralized close function
        onConfirm={confirmDeleteClient}
        title="Delete Client"
        message={`Are you sure you want to delete the client "${clientToDelete?.name || ''}"? This action cannot be undone.`}
        itemName={clientToDelete?.name} // Optional: for specific item name in message
      />

      {/* Detail View Modal */}
      <DetailViewModal
        isOpen={isDetailModalOpen}
        onClose={closeDetailModal} // Use centralized close function
        title={clientToView?.name ? `${clientToView.name} - Details` : 'Client Details'}
      >
        {clientToView && (
          <div className="space-y-6">
            <DetailSection title="Contact Information">
              <DetailGrid>
                <DetailRow label="Email" value={clientToView.email} icon={<Mail className="h-4 w-4 text-gray-500"/>}/>
                <DetailRow label="Phone" value={clientToView.phone || '-'} icon={<Phone className="h-4 w-4 text-gray-500"/>}/>
                <DetailRow label="Address" value={clientToView.address || '-'} icon={<MapPin className="h-4 w-4 text-gray-500"/>}/>
                <DetailRow label="Website" value={clientToView.website || '-'} icon={<Globe className="h-4 w-4 text-gray-500"/>} isLink={!!clientToView.website}/>
              </DetailGrid>
            </DetailSection>
            
            <DetailSection title="Business Information">
              <DetailGrid>
                <DetailRow label="Company" value={clientToView.company} icon={<Building className="h-4 w-4 text-gray-500"/>}/>
                <DetailRow label="Industry" value={clientToView.industry || '-'} icon={<Briefcase className="h-4 w-4 text-gray-500"/>}/>
                <DetailRow label="Type" value={clientToView.type} icon={<User className="h-4 w-4 text-gray-500"/>}/>
                <DetailRow label="Status" value={clientToView.status} icon={<Info className="h-4 w-4 text-gray-500"/>}/>
              </DetailGrid>
            </DetailSection>

            <DetailSection title="Engagement Details">
              <DetailGrid>
                 <DetailRow label="Services Used" value={clientToView.services.toString()} icon={<Briefcase className="h-4 w-4 text-gray-500"/>}/>
                <DetailRow label="Total Revenue" value={`$${clientToView.totalRevenue.toLocaleString()}`} icon={<DollarSign className="h-4 w-4 text-gray-500"/>}/>
                <DetailRow label="Last Contact" value={clientToView.lastContact ? new Date(clientToView.lastContact).toLocaleDateString() : '-'} icon={<Calendar className="h-4 w-4 text-gray-500"/>}/>
                <DetailRow label="Assigned To" value={clientToView.assignedTo || '-'} icon={<UserCheck className="h-4 w-4 text-gray-500"/>}/>
              </DetailGrid>
            </DetailSection>

            {clientToView.tags && clientToView.tags.length > 0 && (
              <DetailSection title="Tags">
                <div className="flex flex-wrap gap-2">
                  {clientToView.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded-full font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </DetailSection>
            )}

            {clientToView.notes && (
              <DetailSection title="Notes">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{clientToView.notes}</p>
              </DetailSection>
            )}
          </div>
        )}
      </DetailViewModal>
    </div>
  );
};