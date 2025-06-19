import React, { useState, useMemo } from 'react';
import { Plus, Search, Edit, Trash2, Eye, DollarSign, Clock, Tag, Package } from 'lucide-react';
import type { Service } from '../../types';
// import { mockServices } from '../../data'; // Removed
import { ConfirmDeleteModal } from '../common/ConfirmDeleteModal';
import { DetailViewModal, DetailSection, DetailRow, DetailGrid } from '../common/DetailViewModal';

interface ServiceFormData {
  name: string;
  description: string;
  price: number;
  duration: string;
  category: string;
}

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  service?: Service;
  mode: 'create' | 'edit';
  onSubmit: (serviceData: ServiceFormData) => void;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, service, mode, onSubmit }) => {
  const [formData, setFormData] = useState<ServiceFormData>({
    name: service?.name || '',
    description: service?.description || '',
    price: service?.price || 0,
    duration: service?.duration || '',
    category: service?.category || 'Development'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
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
                    {mode === 'create' ? 'Add New Service' : 'Edit Service'}
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Service Name</label>
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
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e]"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e]"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Duration</label>
                        <input
                          type="text"
                          name="duration"
                          value={formData.duration}
                          onChange={handleChange}
                          placeholder="e.g., 2-4 weeks"
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e]"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e]"
                      >
                        <option value="Development">Development</option>
                        <option value="Design">Design</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Content">Content</option>
                        <option value="Consulting">Consulting</option>
                      </select>
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
                {mode === 'create' ? 'Create Service' : 'Update Service'}
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

export const ServicesPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedService, setSelectedService] = useState<Service | undefined>(undefined);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<Service | undefined>(undefined);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [serviceToView, setServiceToView] = useState<Service | undefined>(undefined);

  // Filter services based on search and filters
  const filteredServices = useMemo(() => {
    return services.filter(service => {
      const matchesSearch = 
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = categoryFilter === 'all' || service.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [services, searchTerm, categoryFilter]);

  const handleCreateService = () => {
    setModalMode('create');
    setSelectedService(undefined);
    setIsModalOpen(true);
  };

  const handleEditService = (service: Service) => {
    setModalMode('edit');
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleDeleteService = (service: Service) => {
    setServiceToDelete(service);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteService = () => {
    if (serviceToDelete) {
      setServices(services.filter(service => service.id !== serviceToDelete.id));
    }
  };

  const handleViewService = (service: Service) => {
    setServiceToView(service);
    setIsDetailModalOpen(true);
  };

  const handleSubmitService = (serviceData: ServiceFormData) => {
    if (modalMode === 'create') {
      const newService: Service = {
        ...serviceData,
        id: new Date().getTime(), // Using timestamp for temporary unique ID
        basePrice: serviceData.price, // Assuming basePrice is same as price for new mock service
        baseDuration: serviceData.duration // Assuming baseDuration is same as duration for new mock service
      };
      setServices([...services, newService]);
    } else {
      setServices(services.map(service => 
        service.id === selectedService?.id 
          ? { ...service, ...serviceData }
          : service
      ));
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Development': return 'bg-blue-100 text-blue-800';
      case 'Design': return 'bg-purple-100 text-purple-800';
      case 'Marketing': return 'bg-green-100 text-green-800';
      case 'Content': return 'bg-yellow-100 text-yellow-800';
      case 'Consulting': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Services</h1>
          <p className="text-gray-600">Manage your service offerings</p>
        </div>
        <button 
          onClick={handleCreateService}
          className="inline-flex items-center px-4 py-2 bg-[#096e6e] text-white font-medium rounded-lg hover:bg-[#0d8080] focus:outline-none focus:ring-2 focus:ring-[#096e6e] focus:ring-offset-2 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Service
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
                placeholder="Search services by name, description, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e]"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e]"
            >
              <option value="all">All Categories</option>
              <option value="Development">Development</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Content">Content</option>
              <option value="Consulting">Consulting</option>
            </select>
          </div>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Service List</h3>
            <span className="text-sm text-gray-500">{filteredServices.length} services</span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/30">
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Service</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Category</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Price</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Duration</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((service) => (
                <tr key={service.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{service.name}</div>
                      <div className="text-sm text-gray-500 line-clamp-2 max-w-xs">{service.description}</div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(service.category)}`}>
                      {service.category}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center text-sm text-gray-900">
                      <DollarSign className="h-4 w-4 mr-1" />
                      ${service.price.toLocaleString()}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-1" />
                      {service.duration}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleViewService(service)}
                        className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                        title="View details"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEditService(service)}
                        className="p-2 text-green-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                        title="Edit service"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteService(service)}
                        className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                        title="Delete service"
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
        
        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Service Modal */}
      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
        mode={modalMode}
        onSubmit={handleSubmitService}
      />

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteService}
        title="Delete Service"
        message="Are you sure you want to delete the service"
        itemName={serviceToDelete?.name}
      />

      {/* Detail View Modal */}
      <DetailViewModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title={serviceToView?.name || 'Service Details'}
      >
        {serviceToView && (
          <div className="space-y-6">
            <DetailSection title="Description">
              <p>{serviceToView.description}</p>
            </DetailSection>
            
            <DetailGrid>
              <DetailRow 
                label="Category" 
                value={serviceToView.category} 
                icon={<Tag className="h-4 w-4" />}
              />
              <DetailRow 
                label="Price" 
                value={`$${serviceToView.price.toLocaleString()}`} 
                icon={<DollarSign className="h-4 w-4" />}
              />
              <DetailRow 
                label="Duration" 
                value={serviceToView.duration} 
                icon={<Clock className="h-4 w-4" />}
              />
              <DetailRow 
                label="Service ID" 
                value={serviceToView.id.toString()} 
                icon={<Package className="h-4 w-4" />}
              />
            </DetailGrid>
          </div>
        )}
      </DetailViewModal>
    </div>
  );
}; 