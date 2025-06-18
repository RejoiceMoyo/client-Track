import React, { useState, useMemo } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Calendar, DollarSign, Target, Clock, CheckCircle, XCircle, Pause, Play, User, BarChart3 } from 'lucide-react';
import type { Project, ProjectFormData, ProjectModalProps } from '../../types';
import { mockProjects, mockClients } from '../../data';
import { ConfirmDeleteModal } from '../common/ConfirmDeleteModal';
import { DetailViewModal, DetailSection, DetailRow, DetailGrid } from '../common/DetailViewModal';

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project, mode, onSubmit }) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    clientId: project?.clientId || 1,
    name: project?.name || '',
    description: project?.description || '',
    status: project?.status || 'Active',
    startDate: project?.startDate || new Date().toISOString().split('T')[0],
    endDate: project?.endDate || '',
    budget: project?.budget || 0,
    progress: project?.progress || 0
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
      [name]: type === 'number' ? parseFloat(value) || 0 : value
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
                    {mode === 'create' ? 'Add New Project' : 'Edit Project'}
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
                      <label className="block text-sm font-medium text-gray-700">Project Name</label>
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
                        <label className="block text-sm font-medium text-gray-700">Start Date</label>
                        <input
                          type="date"
                          name="startDate"
                          value={formData.startDate}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e]"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">End Date</label>
                        <input
                          type="date"
                          name="endDate"
                          value={formData.endDate}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Budget ($)</label>
                        <input
                          type="number"
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e]"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Progress (%)</label>
                        <input
                          type="number"
                          name="progress"
                          value={formData.progress}
                          onChange={handleChange}
                          min="0"
                          max="100"
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
                        <option value="Active">Active</option>
                        <option value="Completed">Completed</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Cancelled">Cancelled</option>
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
                {mode === 'create' ? 'Create Project' : 'Update Project'}
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

export const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [clientFilter, setClientFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedProject, setSelectedProject] = useState<Project | undefined>(undefined);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | undefined>(undefined);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [projectToView, setProjectToView] = useState<Project | undefined>(undefined);

  // Filter projects based on search and filters
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = 
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.clientName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
      const matchesClient = clientFilter === 'all' || project.clientId.toString() === clientFilter;

      return matchesSearch && matchesStatus && matchesClient;
    });
  }, [projects, searchTerm, statusFilter, clientFilter]);

  const handleCreateProject = () => {
    setModalMode('create');
    setSelectedProject(undefined);
    setIsModalOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setModalMode('edit');
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleDeleteProject = (project: Project) => {
    setProjectToDelete(project);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteProject = () => {
    if (projectToDelete) {
      setProjects(projects.filter(project => project.id !== projectToDelete.id));
    }
  };

  const handleViewProject = (project: Project) => {
    setProjectToView(project);
    setIsDetailModalOpen(true);
  };

  const handleSubmitProject = (projectData: ProjectFormData) => {
    const client = mockClients.find(c => c.id === projectData.clientId);
    
    if (modalMode === 'create') {
      const newProject: Project = {
        ...projectData,
        id: Math.max(...projects.map(p => p.id)) + 1,
        clientName: client?.name || ''
      };
      setProjects([...projects, newProject]);
    } else {
      setProjects(projects.map(project => 
        project.id === selectedProject?.id 
          ? { 
              ...project, 
              ...projectData,
              clientName: client?.name || project.clientName
            }
          : project
      ));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'On Hold': return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active': return <Play className="h-4 w-4" />;
      case 'Completed': return <CheckCircle className="h-4 w-4" />;
      case 'On Hold': return <Pause className="h-4 w-4" />;
      case 'Cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getDaysRemaining = (endDate?: string) => {
    if (!endDate) return null;
    const today = new Date();
    const end = new Date(endDate);
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600">Manage your client projects and track progress</p>
        </div>
        <button 
          onClick={handleCreateProject}
          className="inline-flex items-center px-4 py-2 bg-[#096e6e] text-white font-medium rounded-lg hover:bg-[#0d8080] focus:outline-none focus:ring-2 focus:ring-[#096e6e] focus:ring-offset-2 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Project
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
                placeholder="Search projects by name, description, or client..."
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
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <select 
              value={clientFilter}
              onChange={(e) => setClientFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e]"
            >
              <option value="all">All Clients</option>
              {mockClients.map(client => (
                <option key={client.id} value={client.id.toString()}>
                  {client.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Project List</h3>
            <span className="text-sm text-gray-500">{filteredProjects.length} projects</span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/30">
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Project</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Client</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Progress</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Budget</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Timeline</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((project) => {
                const daysRemaining = getDaysRemaining(project.endDate);
                return (
                  <tr key={project.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{project.name}</div>
                        <div className="text-sm text-gray-500 line-clamp-2 max-w-xs">{project.description}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center text-sm text-gray-900">
                        <User className="h-4 w-4 mr-1" />
                        {project.clientName}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {getStatusIcon(project.status)}
                        <span className="ml-1">{project.status}</span>
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(project.progress)}`}
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-12">{project.progress}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-900">${project.budget.toLocaleString()}</td>
                    <td className="py-4 px-6">
                      <div>
                        <div className="text-sm text-gray-900">{project.startDate}</div>
                        {project.endDate && (
                          <div className="text-xs text-gray-500">
                            {daysRemaining !== null && daysRemaining > 0 ? `${daysRemaining} days left` : 
                             daysRemaining !== null && daysRemaining < 0 ? `${Math.abs(daysRemaining)} days overdue` : 
                             'Due today'}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleViewProject(project)}
                          className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          title="View details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEditProject(project)}
                          className="p-2 text-green-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                          title="Edit project"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project)}
                          className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                          title="Delete project"
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
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
        mode={modalMode}
        onSubmit={handleSubmitProject}
      />

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteProject}
        title="Delete Project"
        message="Are you sure you want to delete the project"
        itemName={projectToDelete?.name}
      />

      {/* Detail View Modal */}
      <DetailViewModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title={projectToView?.name || 'Project Details'}
      >
        {projectToView && (
          <div className="space-y-6">
            <DetailSection title="Project Information">
              <DetailGrid>
                <DetailRow 
                  label="Client" 
                  value={projectToView.clientName} 
                  icon={<User className="h-4 w-4" />}
                />
                <DetailRow 
                  label="Status" 
                  value={projectToView.status} 
                  icon={getStatusIcon(projectToView.status)}
                />
                <DetailRow 
                  label="Budget" 
                  value={`$${projectToView.budget.toLocaleString()}`} 
                  icon={<DollarSign className="h-4 w-4" />}
                />
                <DetailRow 
                  label="Progress" 
                  value={`${projectToView.progress}%`} 
                  icon={<BarChart3 className="h-4 w-4" />}
                />
              </DetailGrid>
            </DetailSection>
            
            <DetailSection title="Description">
              <p className="text-sm text-gray-600">{projectToView.description}</p>
            </DetailSection>

            <DetailSection title="Timeline">
              <DetailGrid>
                <DetailRow 
                  label="Start Date" 
                  value={projectToView.startDate} 
                  icon={<Calendar className="h-4 w-4" />}
                />
                <DetailRow 
                  label="End Date" 
                  value={projectToView.endDate || 'Not set'} 
                  icon={<Calendar className="h-4 w-4" />}
                />
                <DetailRow 
                  label="Days Remaining" 
                  value={getDaysRemaining(projectToView.endDate)?.toString() || 'N/A'} 
                  icon={<Clock className="h-4 w-4" />}
                />
              </DetailGrid>
            </DetailSection>

            <DetailSection title="Progress">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">Completion</span>
                  <span className="text-sm text-gray-600">{projectToView.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-300 ${getProgressColor(projectToView.progress)}`}
                    style={{ width: `${projectToView.progress}%` }}
                  />
                </div>
              </div>
            </DetailSection>
          </div>
        )}
      </DetailViewModal>
    </div>
  );
}; 