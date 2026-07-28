import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card, { CardContent, CardHeader } from '../components/ui/Card';
import { User, Upload, Trash2, Loader2, Camera } from 'lucide-react';

export default function Profile() {
  const { user, updateUser } = useAuth();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    company: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('/users/profile');
        setFormData({
          name: res.data.name || '',
          bio: res.data.bio || '',
          company: res.data.company || ''
        });
        setAvatar(res.data.avatarUrl || '');
        updateUser(res.data);
      } catch (err) {
        console.error('Error fetching profile', err);
        setMessage({ type: 'error', text: 'Failed to load profile data.' });
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []); // eslint-disable-line

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });
    
    try {
      const res = await axios.put('/users/profile', formData);
      updateUser(res.data);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update profile.' });
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Please select an image file.' });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'File size must be less than 5MB.' });
      return;
    }

    const formDataFile = new FormData();
    formDataFile.append('avatar', file);

    setUploading(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await axios.post('/users/profile/avatar', formDataFile, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setAvatar(res.data.avatarUrl);
      
      // Fetch full profile again to sync context
      const profileRes = await axios.get('/users/profile');
      updateUser(profileRes.data);
      
      setMessage({ type: 'success', text: 'Profile picture updated!' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to upload profile picture.' });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleRemoveAvatar = async () => {
    if (!window.confirm('Are you sure you want to remove your profile picture?')) return;
    
    setUploading(true);
    setMessage({ type: '', text: '' });

    try {
      await axios.delete('/users/profile/avatar');
      setAvatar('');
      
      const profileRes = await axios.get('/users/profile');
      updateUser(profileRes.data);
      
      setMessage({ type: 'success', text: 'Profile picture removed.' });
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to remove profile picture.' });
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <div className="py-24 text-center text-slate-400">Loading profile...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
      
      {message.text && (
        <div className={`p-4 mb-8 rounded-lg text-sm border ${message.type === 'error' ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'}`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Avatar Section */}
        <Card className="col-span-1 h-fit">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="relative mb-6 group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-800 bg-slate-900 flex items-center justify-center relative">
                {avatar ? (
                  <img src={avatar} alt={user?.name} className="w-full h-full object-cover" />
                ) : (
                  <User size={48} className="text-slate-600" />
                )}
                
                {uploading && (
                  <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center backdrop-blur-sm">
                    <Loader2 size={24} className="text-primary animate-spin" />
                  </div>
                )}
              </div>
              
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg hover:bg-primary-hover transition-colors cursor-pointer ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
                title="Upload Picture"
              >
                <Camera size={18} />
                <span className="sr-only">Upload avatar picture</span>
              </label>
            </div>
            
            <input 
              id="avatar-upload"
              type="file" 
              ref={fileInputRef} 
              onChange={handleAvatarChange} 
              accept="image/*" 
              className="sr-only" 
            />

            <div className="flex flex-col gap-2 w-full">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="w-full flex items-center justify-center gap-2"
              >
                <Upload size={16} /> Upload New
              </Button>
              
              {avatar && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleRemoveAvatar}
                  disabled={uploading}
                  className="w-full flex items-center justify-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-400/10"
                >
                  <Trash2 size={16} /> Remove
                </Button>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-4">JPG, GIF or PNG. Max size 5MB.</p>
          </CardContent>
        </Card>

        {/* Profile Info Section */}
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <p className="text-sm text-slate-400">Update your account details and bio.</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input 
                  label="Full Name" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <Input 
                  label="Email Address" 
                  type="email"
                  value={user?.email || ''}
                  disabled
                  helperText="Email address cannot be changed."
                />
              </div>

              <Input 
                label="Company / Organization" 
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Optional"
              />

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-slate-300">Bio</label>
                <textarea 
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:outline-none focus:border-primary transition-colors text-white resize-none"
                  placeholder="Tell us a little bit about yourself..."
                />
              </div>

              <div className="flex justify-end pt-4 border-t border-slate-800">
                <Button 
                  type="submit" 
                  disabled={saving}
                  className="flex items-center gap-2"
                >
                  {saving && <Loader2 size={16} className="animate-spin" />}
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
