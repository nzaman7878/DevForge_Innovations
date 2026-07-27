import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pencil, Trash2, Plus } from 'lucide-react';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Web',
    imageUrl: '',
    liveLink: '',
    githubLink: '',
    technologies: ''
  });

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/projects`);
      setProjects(res.data);
    } catch (error) {
      console.error('Error fetching projects', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        ...project,
        technologies: project.technologies?.join(', ') || ''
      });
      setImagePreview(project.imageUrl || null);
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        description: '',
        category: 'Web',
        imageUrl: '',
        liveLink: '',
        githubLink: '',
        technologies: ''
      });
      setImagePreview(null);
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Image must be less than 5MB');
        return;
      }
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const payload = new FormData();
      payload.append('title', formData.title);
      payload.append('description', formData.description);
      payload.append('category', formData.category);
      payload.append('technologies', formData.technologies); // backend parses string
      if (formData.liveLink) payload.append('liveLink', formData.liveLink);
      if (formData.githubLink) payload.append('githubLink', formData.githubLink);
      
      if (imageFile) {
        payload.append('image', imageFile);
      }

      const headers = { 'Content-Type': 'multipart/form-data' };

      if (editingProject) {
        await axios.put(`${import.meta.env.VITE_API_URL}/projects/${editingProject._id}`, payload, { headers });
      } else {
        if (!imageFile) {
          alert('Please select an image for the project');
          setSubmitting(false);
          return;
        }
        await axios.post(`${import.meta.env.VITE_API_URL}/projects`, payload, { headers });
      }
      fetchProjects();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving project', error);
      alert('Error saving project');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/projects/${id}`);
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project', error);
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Projects</h1>
          <p className="text-slate-400">Manage your portfolio projects and case studies.</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
          <Plus size={18} /> New Project
        </Button>
      </div>

      <div className="bg-surface-elevated/30 border border-slate-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-400">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="p-8 text-center text-slate-400">No projects found. Create one to get started.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-800/50 text-slate-400">
                <tr>
                  <th className="px-6 py-4 font-medium">Title</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium hidden md:table-cell">Technologies</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {projects.map(project => (
                  <tr key={project._id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">
                      {project.title}
                    </td>
                    <td className="px-6 py-4 text-slate-300">
                      <span className="px-2 py-1 rounded bg-slate-800 text-xs">
                        {project.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 hidden md:table-cell">
                      {project.technologies?.slice(0, 3).join(', ')}
                      {project.technologies?.length > 3 && ' ...'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button 
                          onClick={() => handleOpenModal(project)}
                          className="text-slate-400 hover:text-primary transition-colors p-1"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(project._id)}
                          className="text-slate-400 hover:text-red-400 transition-colors p-1"
                          title="Delete"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title={editingProject ? 'Edit Project' : 'New Project'}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input 
            label="Project Title" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            required 
          />
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-300">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              required
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-300">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              >
                <option value="Web">Web</option>
                <option value="Mobile">Mobile</option>
                <option value="SaaS">SaaS</option>
                <option value="AI">AI</option>
                <option value="Ecommerce">Ecommerce</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-300">Project Image</label>
              <div className="border-2 border-dashed border-slate-700 rounded-lg p-4 text-center hover:bg-slate-800/30 transition-colors relative cursor-pointer">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {imagePreview ? (
                  <div className="flex flex-col items-center">
                    <img src={imagePreview} alt="Preview" className="h-20 object-cover rounded-md mb-2" />
                    <span className="text-xs text-slate-400">Click or drag to change image</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-4">
                    <Plus size={24} className="text-slate-500 mb-2" />
                    <span className="text-sm text-slate-400">Upload Image (Max 5MB)</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Input 
            label="Technologies (comma separated)" 
            name="technologies" 
            value={formData.technologies} 
            onChange={handleChange} 
            placeholder="React, Node.js, MongoDB"
          />

          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Live URL" 
              name="liveLink" 
              value={formData.liveLink} 
              onChange={handleChange} 
            />
            <Input 
              label="GitHub URL" 
              name="githubLink" 
              value={formData.githubLink} 
              onChange={handleChange} 
            />
          </div>

          <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-slate-800">
            <Button type="button" variant="ghost" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Saving...' : (editingProject ? 'Save Changes' : 'Create Project')}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
