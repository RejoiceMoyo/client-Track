import React, { useState, useEffect } from 'react';
import {
  saveSettings,
  loadSettings,
  resetSettings,
  exportSettings,
  importSettings
} from '../../data';
import { Upload, Download, RefreshCw, Save, User, Bell, Lock, FileText, Repeat, Zap, Database, Palette, Building2 } from 'lucide-react';

const categories = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'company', label: 'Company', icon: Building2 },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'invoice', label: 'Invoice', icon: FileText },
  { id: 'reminders', label: 'Reminders', icon: Repeat },
  { id: 'integrations', label: 'Integrations', icon: Zap },
  { id: 'backup', label: 'Backup', icon: Database },
  { id: 'theme', label: 'Theme', icon: Palette }
];

const getDefault = (category: string) => ({});

export const SettingsPage: React.FC = () => {
  const [selected, setSelected] = useState('profile');
  const [form, setForm] = useState<any>(getDefault('profile'));
  const [importing, setImporting] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    setForm(loadSettings(selected));
    setSuccessMsg(null);
    setImportError(null);
  }, [selected]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev: any) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    saveSettings(form, selected);
    setSuccessMsg('Settings saved!');
    setTimeout(() => setSuccessMsg(null), 2000);
  };

  const handleReset = () => {
    resetSettings(selected);
    setForm(getDefault(selected));
    setSuccessMsg('Settings reset to default!');
    setTimeout(() => setSuccessMsg(null), 2000);
  };

  const handleExport = () => {
    exportSettings();
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setImporting(true);
    setImportError(null);
    try {
      await importSettings(e.target.files[0]);
      setSuccessMsg('Settings imported!');
      setTimeout(() => setSuccessMsg(null), 2000);
      setForm(loadSettings(selected));
    } catch (err: any) {
      setImportError(err.message || 'Import failed');
    } finally {
      setImporting(false);
    }
  };

  // --- Renderers for each section ---
  const renderProfile = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input name="name" value={form.name || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input name="email" value={form.email || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input name="phone" value={form.phone || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Timezone</label>
        <select name="timezone" value={form.timezone || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
          {([] as any[]).map((opt: any) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Language</label>
        <select name="language" value={form.language || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
          {([] as any[]).map((opt: any) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Date Format</label>
        <select name="dateFormat" value={form.dateFormat || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
          {([] as any[]).map((opt: any) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Currency</label>
        <select name="currency" value={form.currency || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
          {([] as any[]).map((opt: any) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </div>
    </div>
  );

  const renderCompany = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Company Name</label>
        <input name="name" value={form.name || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input name="email" value={form.email || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Phone</label>
        <input name="phone" value={form.phone || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <input name="address" value={form.address || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Website</label>
        <input name="website" value={form.website || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Industry</label>
        <select name="industry" value={form.industry || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
          {([] as any[]).map((opt: any) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Timezone</label>
        <select name="timezone" value={form.timezone || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
          {([] as any[]).map((opt: any) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Currency</label>
        <select name="currency" value={form.currency || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
          {([] as any[]).map((opt: any) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Tax Rate (%)</label>
        <input name="taxRate" type="number" value={form.taxRate || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Invoice Prefix</label>
        <input name="invoicePrefix" value={form.invoicePrefix || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Invoice Numbering</label>
        <select name="invoiceNumbering" value={form.invoiceNumbering || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
          <option value="sequential">Sequential</option>
          <option value="yearly">Yearly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-4">
      {Object.entries({}).map(([key]) => (
        <div key={key} className="flex items-center">
          <input type="checkbox" name={key} checked={!!form[key]} onChange={handleChange} className="h-4 w-4 text-[#096e6e] border-gray-300 rounded" />
          <label className="ml-2 block text-sm text-gray-700">{key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}</label>
        </div>
      ))}
    </div>
  );

  const renderSecurity = () => (
    <div className="space-y-4">
      <div className="flex items-center">
        <input type="checkbox" name="twoFactorAuth" checked={!!form.twoFactorAuth} onChange={handleChange} className="h-4 w-4 text-[#096e6e] border-gray-300 rounded" />
        <label className="ml-2 block text-sm text-gray-700">Two-Factor Authentication</label>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Session Timeout (minutes)</label>
        <input name="sessionTimeout" type="number" value={form.sessionTimeout || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Password Expiry (days)</label>
        <input name="passwordExpiry" type="number" value={form.passwordExpiry || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Login Attempts</label>
        <input name="loginAttempts" type="number" value={form.loginAttempts || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">IP Whitelist (comma separated)</label>
        <input name="ipWhitelist" value={form.ipWhitelist ? form.ipWhitelist.join(', ') : ''} onChange={e => setForm((prev: any) => ({ ...prev, ipWhitelist: e.target.value.split(',').map((ip: string) => ip.trim()) }))} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
      </div>
      <div className="flex items-center">
        <input type="checkbox" name="auditLog" checked={!!form.auditLog} onChange={handleChange} className="h-4 w-4 text-[#096e6e] border-gray-300 rounded" />
        <label className="ml-2 block text-sm text-gray-700">Enable Audit Log</label>
      </div>
    </div>
  );

  const renderInvoice = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Default Payment Terms (days)</label>
        <input name="defaultPaymentTerms" type="number" value={form.defaultPaymentTerms || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Late Fee (%)</label>
        <input name="lateFeePercentage" type="number" value={form.lateFeePercentage || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
      </div>
      <div className="flex items-center">
        <input type="checkbox" name="autoReminders" checked={!!form.autoReminders} onChange={handleChange} className="h-4 w-4 text-[#096e6e] border-gray-300 rounded" />
        <label className="ml-2 block text-sm text-gray-700">Auto Reminders</label>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Reminder Frequency (days)</label>
        <input name="reminderFrequency" type="number" value={form.reminderFrequency || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
      </div>
      <div className="flex items-center">
        <input type="checkbox" name="taxIncluded" checked={!!form.taxIncluded} onChange={handleChange} className="h-4 w-4 text-[#096e6e] border-gray-300 rounded" />
        <label className="ml-2 block text-sm text-gray-700">Tax Included</label>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Currency Symbol</label>
        <input name="currencySymbol" value={form.currencySymbol || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Invoice Template</label>
        <input name="invoiceTemplate" value={form.invoiceTemplate || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email Template</label>
        <input name="emailTemplate" value={form.emailTemplate || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
      </div>
    </div>
  );

  const renderReminders = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Default Priority</label>
        <select name="defaultPriority" value={form.defaultPriority || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Urgent">Urgent</option>
        </select>
      </div>
      <div className="flex items-center">
        <input type="checkbox" name="autoComplete" checked={!!form.autoComplete} onChange={handleChange} className="h-4 w-4 text-[#096e6e] border-gray-300 rounded" />
        <label className="ml-2 block text-sm text-gray-700">Auto Complete</label>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Reminder Advance Days</label>
        <input name="reminderAdvanceDays" type="number" value={form.reminderAdvanceDays || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
      </div>
      <div className="flex items-center">
        <input type="checkbox" name="recurringReminders" checked={!!form.recurringReminders} onChange={handleChange} className="h-4 w-4 text-[#096e6e] border-gray-300 rounded" />
        <label className="ml-2 block text-sm text-gray-700">Recurring Reminders</label>
      </div>
      <div className="flex items-center">
        <input type="checkbox" name="emailReminders" checked={!!form.emailReminders} onChange={handleChange} className="h-4 w-4 text-[#096e6e] border-gray-300 rounded" />
        <label className="ml-2 block text-sm text-gray-700">Email Reminders</label>
      </div>
      <div className="flex items-center">
        <input type="checkbox" name="smsReminders" checked={!!form.smsReminders} onChange={handleChange} className="h-4 w-4 text-[#096e6e] border-gray-300 rounded" />
        <label className="ml-2 block text-sm text-gray-700">SMS Reminders</label>
      </div>
      <div className="flex items-center">
        <input type="checkbox" name="pushReminders" checked={!!form.pushReminders} onChange={handleChange} className="h-4 w-4 text-[#096e6e] border-gray-300 rounded" />
        <label className="ml-2 block text-sm text-gray-700">Push Reminders</label>
      </div>
    </div>
  );

  const renderIntegrations = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Email Provider</label>
        <select name="emailProvider" value={form.emailProvider || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
          {([] as any[]).map((opt: any) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">SMS Provider</label>
        <select name="smsProvider" value={form.smsProvider || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
          {([] as any[]).map((opt: any) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Payment Gateway</label>
        <select name="paymentGateway" value={form.paymentGateway || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
          {([] as any[]).map((opt: any) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>
      <div className="flex items-center">
        <input type="checkbox" name="calendarSync" checked={!!form.calendarSync} onChange={handleChange} className="h-4 w-4 text-[#096e6e] border-gray-300 rounded" />
        <label className="ml-2 block text-sm text-gray-700">Calendar Sync</label>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Cloud Storage</label>
        <select name="cloudStorage" value={form.cloudStorage || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
          {[].map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>
    </div>
  );

  const renderBackup = () => (
    <div className="space-y-4">
      <div className="flex items-center">
        <input type="checkbox" name="autoBackup" checked={!!form.autoBackup} onChange={handleChange} className="h-4 w-4 text-[#096e6e] border-gray-300 rounded" />
        <label className="ml-2 block text-sm text-gray-700">Auto Backup</label>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Backup Frequency</label>
        <select name="backupFrequency" value={form.backupFrequency || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Backup Time</label>
        <input name="backupTime" value={form.backupTime || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Retention Period (days)</label>
        <input name="retentionPeriod" type="number" value={form.retentionPeriod || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2" />
      </div>
      <div className="flex items-center">
        <input type="checkbox" name="cloudBackup" checked={!!form.cloudBackup} onChange={handleChange} className="h-4 w-4 text-[#096e6e] border-gray-300 rounded" />
        <label className="ml-2 block text-sm text-gray-700">Cloud Backup</label>
      </div>
      <div className="flex items-center">
        <input type="checkbox" name="localBackup" checked={!!form.localBackup} onChange={handleChange} className="h-4 w-4 text-[#096e6e] border-gray-300 rounded" />
        <label className="ml-2 block text-sm text-gray-700">Local Backup</label>
      </div>
      <div className="flex items-center">
        <input type="checkbox" name="encryption" checked={!!form.encryption} onChange={handleChange} className="h-4 w-4 text-[#096e6e] border-gray-300 rounded" />
        <label className="ml-2 block text-sm text-gray-700">Encryption</label>
      </div>
    </div>
  );

  const renderTheme = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Mode</label>
        <select name="mode" value={form.mode || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="auto">Auto</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Primary Color</label>
        <input name="primaryColor" value={form.primaryColor || ''} onChange={handleChange} type="color" className="mt-1 block w-16 h-10 border border-gray-300 rounded-md" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Accent Color</label>
        <input name="accentColor" value={form.accentColor || ''} onChange={handleChange} type="color" className="mt-1 block w-16 h-10 border border-gray-300 rounded-md" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Font Size</label>
        <select name="fontSize" value={form.fontSize || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2">
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>
      <div className="flex items-center">
        <input type="checkbox" name="compactMode" checked={!!form.compactMode} onChange={handleChange} className="h-4 w-4 text-[#096e6e] border-gray-300 rounded" />
        <label className="ml-2 block text-sm text-gray-700">Compact Mode</label>
      </div>
      <div className="flex items-center">
        <input type="checkbox" name="sidebarCollapsed" checked={!!form.sidebarCollapsed} onChange={handleChange} className="h-4 w-4 text-[#096e6e] border-gray-300 rounded" />
        <label className="ml-2 block text-sm text-gray-700">Sidebar Collapsed</label>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (selected) {
      case 'profile': return renderProfile();
      case 'company': return renderCompany();
      case 'notifications': return renderNotifications();
      case 'security': return renderSecurity();
      case 'invoice': return renderInvoice();
      case 'reminders': return renderReminders();
      case 'integrations': return renderIntegrations();
      case 'backup': return renderBackup();
      case 'theme': return renderTheme();
      default: return null;
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Tabs */}
      <nav className="flex flex-wrap gap-2 border-b border-gray-200 bg-white rounded-t-xl px-4 pt-4">
        {categories.map(cat => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setSelected(cat.id)}
              className={`inline-flex items-center px-4 py-2 rounded-t-lg text-sm font-medium transition-colors border-b-2 ${selected === cat.id ? 'border-[#096e6e] text-[#096e6e] bg-gray-50' : 'border-transparent text-gray-700 hover:bg-gray-100'}`}
              style={{ outline: 'none' }}
            >
              <Icon className="h-4 w-4 mr-2" />
              {cat.label}
            </button>
          );
        })}
        <div className="flex-1" />
        <div className="flex items-center gap-2 pb-2">
          <button onClick={handleExport} className="flex items-center px-3 py-2 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"><Download className="h-4 w-4 mr-2" />Export</button>
          <label className="flex items-center px-3 py-2 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 transition-colors cursor-pointer">
            <Upload className="h-4 w-4 mr-2" />
            Import
            <input type="file" accept=".json" onChange={handleImport} className="hidden" disabled={importing} />
          </label>
        </div>
      </nav>
      {/* Main Content */}
      <main className="flex-1 bg-white border border-gray-200 rounded-b-xl shadow-sm p-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 capitalize">{categories.find(c => c.id === selected)?.label} Settings</h1>
          <div className="flex gap-2">
            <button onClick={handleSave} className="inline-flex items-center px-4 py-2 bg-[#096e6e] text-white font-medium rounded-lg hover:bg-[#0d8080] transition-colors"><Save className="h-4 w-4 mr-2" />Save</button>
            <button onClick={handleReset} className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"><RefreshCw className="h-4 w-4 mr-2" />Reset</button>
          </div>
        </div>
        {successMsg && <div className="mb-4 text-green-700 bg-green-100 rounded-lg px-4 py-2">{successMsg}</div>}
        {importError && <div className="mb-4 text-red-700 bg-red-100 rounded-lg px-4 py-2">{importError}</div>}
        {renderSection()}
      </main>
    </div>
  );
}; 