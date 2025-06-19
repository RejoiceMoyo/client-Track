import React, { useState, useMemo } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Calendar, Clock, AlertTriangle, CheckCircle, XCircle, Bell, Flag, User } from 'lucide-react';
import type { Reminder, ReminderFormData, ReminderModalProps } from '../../types';
import { ConfirmDeleteModal } from '../common/ConfirmDeleteModal';
import { DetailViewModal, DetailSection, DetailRow, DetailGrid } from '../common/DetailViewModal';

const ReminderModal: React.FC<ReminderModalProps> = ({ isOpen, onClose, reminder, mode, onSubmit }) => {
  const [formData, setFormData] = useState<ReminderFormData>({
    clientId: reminder?.clientId || 1,
    title: reminder?.title || '',
    description: reminder?.description || '',
    dueDate: reminder?.dueDate || new Date().toISOString().split('T')[0],
    priority: reminder?.priority || 'Medium',
    status: reminder?.status || 'Pending',
    type: reminder?.type || 'General',
    category: reminder?.category || '',
    isCompleted: reminder?.isCompleted || false,
    notes: reminder?.notes || '',
    recurring: reminder?.recurring || false,
    recurringPattern: reminder?.recurringPattern || 'Weekly'
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
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
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
                    {mode === 'create' ? 'Add New Reminder' : 'Edit Reminder'}
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
                        {[] /* mockClients removed */.map(client => (
                          <option key={client.id} value={client.id}>
                            {client.name} - {client.company}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Title</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
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
                        <label className="block text-sm font-medium text-gray-700">Due Date</label>
                        <input
                          type="date"
                          name="dueDate"
                          value={formData.dueDate}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e]"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Priority</label>
                        <select
                          name="priority"
                          value={formData.priority}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e]"
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                          <option value="Urgent">Urgent</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Type</label>
                        <select
                          name="type"
                          value={formData.type}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e]"
                        >
                          <option value="Follow-up">Follow-up</option>
                          <option value="Meeting">Meeting</option>
                          <option value="Payment">Payment</option>
                          <option value="Renewal">Renewal</option>
                          <option value="Task">Task</option>
                          <option value="General">General</option>
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
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Overdue">Overdue</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Category</label>
                      <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="e.g., Sales, Marketing, Finance"
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e]"
                      />
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="isCompleted"
                        checked={formData.isCompleted}
                        onChange={handleChange}
                        className="h-4 w-4 text-[#096e6e] focus:ring-[#096e6e] border-gray-300 rounded"
                      />
                      <label className="ml-2 block text-sm text-gray-900">
                        Mark as completed
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        name="recurring"
                        checked={formData.recurring}
                        onChange={handleChange}
                        className="h-4 w-4 text-[#096e6e] focus:ring-[#096e6e] border-gray-300 rounded"
                      />
                      <label className="ml-2 block text-sm text-gray-900">
                        Recurring reminder
                      </label>
                    </div>

                    {formData.recurring && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Recurring Pattern</label>
                        <select
                          name="recurringPattern"
                          value={formData.recurringPattern}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e]"
                        >
                          <option value="Daily">Daily</option>
                          <option value="Weekly">Weekly</option>
                          <option value="Monthly">Monthly</option>
                          <option value="Quarterly">Quarterly</option>
                          <option value="Yearly">Yearly</option>
                        </select>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700">Notes</label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e]"
                        placeholder="Additional notes about this reminder..."
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
                {mode === 'create' ? 'Create Reminder' : 'Update Reminder'}
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

export const RemindersPage: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [selectedReminder, setSelectedReminder] = useState<Reminder | undefined>(undefined);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [reminderToDelete, setReminderToDelete] = useState<Reminder | undefined>(undefined);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [reminderToView, setReminderToView] = useState<Reminder | undefined>(undefined);

  // Filter reminders based on search and filters
  const filteredReminders = useMemo(() => {
    return reminders.filter(reminder => {
      const matchesSearch = 
        reminder.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reminder.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reminder.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reminder.notes?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || reminder.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || reminder.priority === priorityFilter;
      const matchesType = typeFilter === 'all' || reminder.type === typeFilter;

      return matchesSearch && matchesStatus && matchesPriority && matchesType;
    });
  }, [reminders, searchTerm, statusFilter, priorityFilter, typeFilter]);

  const handleCreateReminder = () => {
    setModalMode('create');
    setSelectedReminder(undefined);
    setIsModalOpen(true);
  };

  const handleEditReminder = (reminder: Reminder) => {
    setModalMode('edit');
    setSelectedReminder(reminder);
    setIsModalOpen(true);
  };

  const handleDeleteReminder = (reminder: Reminder) => {
    setReminderToDelete(reminder);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteReminder = () => {
    if (reminderToDelete) {
      setReminders(reminders.filter(reminder => reminder.id !== reminderToDelete.id));
    }
  };

  const handleViewReminder = (reminder: Reminder) => {
    setReminderToView(reminder);
    setIsDetailModalOpen(true);
  };

  const handleSubmitReminder = (reminderData: ReminderFormData) => {
    const client = undefined; // mockClients removed
    
    if (modalMode === 'create') {
      const newReminder: Reminder = {
        ...reminderData,
        id: Math.max(...reminders.map(r => r.id)) + 1,
        clientName: client?.name || ''
      };
      setReminders([...reminders, newReminder]);
    } else {
      setReminders(reminders.map(reminder => 
        reminder.id === selectedReminder?.id 
          ? { 
              ...reminder, 
              ...reminderData,
              clientName: client?.name || reminder.clientName
            }
          : reminder
      ));
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgent': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      case 'Cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Follow-up': return <Bell className="h-4 w-4" />;
      case 'Meeting': return <Calendar className="h-4 w-4" />;
      case 'Payment': return <AlertTriangle className="h-4 w-4" />;
      case 'Renewal': return <Clock className="h-4 w-4" />;
      case 'Task': return <Flag className="h-4 w-4" />;
      case 'General': return <Bell className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reminders</h1>
          <p className="text-gray-600">Manage your tasks and reminders</p>
        </div>
        <button 
          onClick={handleCreateReminder}
          className="inline-flex items-center px-4 py-2 bg-[#096e6e] text-white font-medium rounded-lg hover:bg-[#0d8080] focus:outline-none focus:ring-2 focus:ring-[#096e6e] focus:ring-offset-2 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Reminder
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
                placeholder="Search reminders by title, description, client, or notes..."
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
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Overdue">Overdue</option>
              <option value="Cancelled">Cancelled</option>
            </select>

            <select 
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e]"
            >
              <option value="all">All Priorities</option>
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#096e6e] focus:border-[#096e6e]"
            >
              <option value="all">All Types</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Meeting">Meeting</option>
              <option value="Payment">Payment</option>
              <option value="Renewal">Renewal</option>
              <option value="Task">Task</option>
              <option value="General">General</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reminders Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Reminder List</h3>
            <span className="text-sm text-gray-500">{filteredReminders.length} reminders</span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/30">
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Reminder</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Client</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Priority</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Status</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Due Date</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Type</th>
                <th className="text-left py-4 px-6 text-sm font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReminders.map((reminder) => {
                const daysUntil = getDaysUntilDue(reminder.dueDate);
                return (
                  <tr key={reminder.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 px-6">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{reminder.title}</div>
                        <div className="text-sm text-gray-500 line-clamp-2 max-w-xs">{reminder.description}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center text-sm text-gray-900">
                        <User className="h-4 w-4 mr-1" />
                        {reminder.clientName}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(reminder.priority)}`}>
                        {reminder.priority}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(reminder.status)}`}>
                        {reminder.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <div className="text-sm text-gray-900">{reminder.dueDate}</div>
                        <div className="text-xs text-gray-500">
                          {daysUntil > 0 ? `${daysUntil} days away` : 
                           daysUntil < 0 ? `${Math.abs(daysUntil)} days overdue` : 
                           'Due today'}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center text-sm text-gray-600">
                        {getTypeIcon(reminder.type)}
                        <span className="ml-1">{reminder.type}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => handleViewReminder(reminder)}
                          className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          title="View details"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleEditReminder(reminder)}
                          className="p-2 text-green-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                          title="Edit reminder"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteReminder(reminder)}
                          className="p-2 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                          title="Delete reminder"
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
        
        {filteredReminders.length === 0 && (
          <div className="text-center py-12">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No reminders found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Reminder Modal */}
      <ReminderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reminder={selectedReminder}
        mode={modalMode}
        onSubmit={handleSubmitReminder}
      />

      {/* Confirm Delete Modal */}
      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDeleteReminder}
        title="Delete Reminder"
        message="Are you sure you want to delete the reminder"
        itemName={reminderToDelete?.title}
      />

      {/* Detail View Modal */}
      <DetailViewModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title={reminderToView?.title || 'Reminder Details'}
      >
        {reminderToView && (
          <div className="space-y-6">
            <DetailSection title="Reminder Information">
              <DetailGrid>
                <DetailRow 
                  label="Client" 
                  value={reminderToView.clientName} 
                  icon={<User className="h-4 w-4" />}
                />
                <DetailRow 
                  label="Type" 
                  value={reminderToView.type} 
                  icon={getTypeIcon(reminderToView.type)}
                />
                <DetailRow 
                  label="Priority" 
                  value={reminderToView.priority} 
                  icon={<Flag className="h-4 w-4" />}
                />
                <DetailRow 
                  label="Status" 
                  value={reminderToView.status} 
                  icon={<CheckCircle className="h-4 w-4" />}
                />
              </DetailGrid>
            </DetailSection>
            
            <DetailSection title="Description">
              <p className="text-sm text-gray-600">{reminderToView.description}</p>
            </DetailSection>

            <DetailSection title="Timing Information">
              <DetailGrid>
                <DetailRow 
                  label="Due Date" 
                  value={reminderToView.dueDate} 
                  icon={<Calendar className="h-4 w-4" />}
                />
                <DetailRow 
                  label="Days Until Due" 
                  value={getDaysUntilDue(reminderToView.dueDate).toString()} 
                  icon={<Clock className="h-4 w-4" />}
                />
                <DetailRow 
                  label="Category" 
                  value={reminderToView.category} 
                  icon={<Bell className="h-4 w-4" />}
                />
                <DetailRow 
                  label="Completed" 
                  value={reminderToView.isCompleted ? 'Yes' : 'No'} 
                  icon={reminderToView.isCompleted ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                />
              </DetailGrid>
            </DetailSection>

            {reminderToView.completedDate && (
              <DetailSection title="Completion Information">
                <DetailRow 
                  label="Completed Date" 
                  value={reminderToView.completedDate} 
                  icon={<CheckCircle className="h-4 w-4" />}
                />
              </DetailSection>
            )}

            {reminderToView.recurring && (
              <DetailSection title="Recurring Information">
                <DetailRow 
                  label="Recurring Pattern" 
                  value={reminderToView.recurringPattern || 'N/A'} 
                  icon={<Clock className="h-4 w-4" />}
                />
              </DetailSection>
            )}

            {reminderToView.notes && (
              <DetailSection title="Notes">
                <p className="text-sm text-gray-600">{reminderToView.notes}</p>
              </DetailSection>
            )}
          </div>
        )}
      </DetailViewModal>
    </div>
  );
}; 