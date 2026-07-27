import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import { Shield, Bell, Lock, User as UserIcon, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('security');

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 flex-shrink-0">
          <nav className="flex flex-col gap-2">
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <UserIcon size={18} />
              General Profile
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === 'security' ? 'bg-primary/10 text-primary font-medium' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Lock size={18} />
              Security & Password
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === 'notifications' ? 'bg-primary/10 text-primary font-medium' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Bell size={18} />
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === 'privacy' ? 'bg-primary/10 text-primary font-medium' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Shield size={18} />
              Privacy
            </button>
          </nav>
        </aside>

        <main className="flex-1">
          {activeTab === 'security' && <SecurityTab />}
          {activeTab === 'notifications' && <NotificationsTab user={user} updateUser={updateUser} />}
          {activeTab === 'privacy' && <PrivacyTab user={user} updateUser={updateUser} />}
        </main>
      </div>
    </div>
  );
}

function SecurityTab() {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }
    
    setLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      await axios.put('/users/password', {
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword
      });
      setMessage({ type: 'success', text: 'Password updated successfully' });
      setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.msg || 'Failed to update password' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-semibold">Change Password</h2>
        <p className="text-sm text-slate-400">Ensure your account is using a long, random password to stay secure.</p>
      </CardHeader>
      <CardContent>
        {message.text && (
          <div className={`p-4 mb-6 rounded-lg text-sm border ${message.type === 'error' ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'}`}>
            {message.text}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <Input 
            label="Current Password" 
            type="password" 
            name="currentPassword" 
            value={formData.currentPassword} 
            onChange={handleChange} 
            required 
          />
          <Input 
            label="New Password" 
            type="password" 
            name="newPassword" 
            value={formData.newPassword} 
            onChange={handleChange} 
            required 
          />
          <Input 
            label="Confirm New Password" 
            type="password" 
            name="confirmPassword" 
            value={formData.confirmPassword} 
            onChange={handleChange} 
            required 
          />
          <div className="flex justify-end pt-4 border-t border-slate-800">
            <Button type="submit" disabled={loading} className="flex items-center gap-2">
              {loading && <Loader2 size={16} className="animate-spin" />}
              Update Password
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function NotificationsTab({ user, updateUser }) {
  const [preferences, setPreferences] = useState({
    emailNotifications: user?.preferences?.emailNotifications ?? true,
    marketingEmails: user?.preferences?.marketingEmails ?? false,
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleToggle = async (key) => {
    const newPrefs = { ...preferences, [key]: !preferences[key] };
    setPreferences(newPrefs);
    
    setSaving(true);
    try {
      const res = await axios.put('/users/preferences', { preferences: newPrefs });
      updateUser(res.data);
      setMessage('Preferences saved');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Notification Preferences</h2>
          <p className="text-sm text-slate-400">Manage how we contact you.</p>
        </div>
        {saving ? <Loader2 size={16} className="animate-spin text-slate-400" /> : <span className="text-sm text-emerald-400">{message}</span>}
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <ToggleRow 
          title="Email Notifications" 
          description="Receive emails about your account activity and project updates." 
          checked={preferences.emailNotifications} 
          onChange={() => handleToggle('emailNotifications')} 
        />
        <div className="h-px bg-slate-800" />
        <ToggleRow 
          title="Marketing Emails" 
          description="Receive emails about new products, features, and promotions." 
          checked={preferences.marketingEmails} 
          onChange={() => handleToggle('marketingEmails')} 
        />
      </CardContent>
    </Card>
  );
}

function PrivacyTab({ user, updateUser }) {
  const [preferences, setPreferences] = useState({
    publicProfile: user?.preferences?.publicProfile ?? true,
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const handleToggle = async (key) => {
    const newPrefs = { ...preferences, [key]: !preferences[key] };
    setPreferences(newPrefs);
    
    setSaving(true);
    try {
      const res = await axios.put('/users/preferences', { preferences: newPrefs });
      updateUser(res.data);
      setMessage('Preferences saved');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Privacy Settings</h2>
          <p className="text-sm text-slate-400">Manage who can see your information.</p>
        </div>
        {saving ? <Loader2 size={16} className="animate-spin text-slate-400" /> : <span className="text-sm text-emerald-400">{message}</span>}
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <ToggleRow 
          title="Public Profile" 
          description="Make your profile visible to other users on the platform." 
          checked={preferences.publicProfile} 
          onChange={() => handleToggle('publicProfile')} 
        />
      </CardContent>
    </Card>
  );
}

// Simple toggle switch component
function ToggleRow({ title, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium text-white">{title}</p>
        <p className="text-sm text-slate-400">{description}</p>
      </div>
      <button 
        type="button"
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-slate-900 ${checked ? 'bg-primary' : 'bg-slate-700'}`}
      >
        <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
      </button>
    </div>
  );
}
