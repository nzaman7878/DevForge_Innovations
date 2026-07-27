import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pencil, Trash2, Plus } from 'lucide-react';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';

export default function AdminPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    tags: '',
    published: true
  });

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`);
      setPosts(res.data);
    } catch (error) {
      console.error('Error fetching posts', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleOpenModal = (post = null) => {
    if (post) {
      setEditingPost(post);
      setFormData({
        ...post,
        tags: post.tags?.join(', ') || ''
      });
    } else {
      setEditingPost(null);
      setFormData({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        coverImage: '',
        tags: '',
        published: true
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPost(null);
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const generateSlug = () => {
    if (formData.title) {
      const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      setFormData({ ...formData, slug });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      tags: formData.tags.split(',').map(t => t.trim()).filter(t => t)
    };

    try {
      if (editingPost) {
        await axios.put(`${import.meta.env.VITE_API_URL}/posts/${editingPost._id}`, payload);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/posts`, payload);
      }
      fetchPosts();
      handleCloseModal();
    } catch (error) {
      console.error('Error saving post', error);
      alert('Error saving post');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/posts/${id}`);
        fetchPosts();
      } catch (error) {
        console.error('Error deleting post', error);
      }
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Blog Posts</h1>
          <p className="text-slate-400">Manage your agency's content and articles.</p>
        </div>
        <Button onClick={() => handleOpenModal()} className="flex items-center gap-2">
          <Plus size={18} /> New Post
        </Button>
      </div>

      <div className="bg-surface-elevated/30 border border-slate-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-400">Loading posts...</div>
        ) : posts.length === 0 ? (
          <div className="p-8 text-center text-slate-400">No posts found. Create one to get started.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-800/50 text-slate-400">
                <tr>
                  <th className="px-6 py-4 font-medium">Title</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium hidden md:table-cell">Date</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {posts.map(post => (
                  <tr key={post._id} className="hover:bg-slate-800/20 transition-colors">
                    <td className="px-6 py-4 font-medium text-white">
                      {post.title}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded text-xs ${post.published ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 hidden md:table-cell">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button 
                          onClick={() => handleOpenModal(post)}
                          className="text-slate-400 hover:text-primary transition-colors p-1"
                          title="Edit"
                        >
                          <Pencil size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(post._id)}
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
        title={editingPost ? 'Edit Post' : 'New Post'}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-h-[75vh] overflow-y-auto pr-2">
          <Input 
            label="Title" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            required 
          />
          
          <div className="flex items-end gap-2">
            <div className="flex-grow">
              <Input 
                label="Slug (URL)" 
                name="slug" 
                value={formData.slug} 
                onChange={handleChange} 
                required 
              />
            </div>
            <Button type="button" variant="secondary" onClick={generateSlug} className="mb-0.5">
              Auto Generate
            </Button>
          </div>

          <Input 
            label="Cover Image URL" 
            name="coverImage" 
            value={formData.coverImage} 
            onChange={handleChange} 
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-300">Excerpt</label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              rows="2"
              required
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-300">Markdown Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="8"
              required
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all font-mono text-sm"
            />
          </div>

          <Input 
            label="Tags (comma separated)" 
            name="tags" 
            value={formData.tags} 
            onChange={handleChange} 
            placeholder="React, Design, Tech"
          />

          <label className="flex items-center gap-2 text-sm text-slate-300 mt-2">
            <input 
              type="checkbox" 
              name="published" 
              checked={formData.published} 
              onChange={handleChange}
              className="rounded border-slate-700 bg-slate-900 text-primary focus:ring-primary/50"
            />
            Publish immediately
          </label>

          <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-slate-800">
            <Button type="button" variant="ghost" onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button type="submit">
              {editingPost ? 'Save Changes' : 'Create Post'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
