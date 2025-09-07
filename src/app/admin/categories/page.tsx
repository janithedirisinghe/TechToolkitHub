'use client';

import AdminLayout from '@/components/AdminLayout';
import { useState, useEffect } from 'react';

interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  articleCount: number;
  color: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface FormData {
  name: string;
  slug: string;
  description: string;
  color: string;
  order: number;
  isActive: boolean;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    slug: '',
    description: '',
    color: '#059669',
    order: 0,
    isActive: true
  });

  // Fetch categories from API
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('adminToken');

      const response = await fetch('/api/admin/categories', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }

      const data = await response.json();
      setCategories(data.categories);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(err instanceof Error ? err.message : 'Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Auto-generate slug from name
    if (name === 'name') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.slug) {
      setError('Name and slug are required');
      return;
    }

    try {
      setSaving(true);
      setError('');
      const token = localStorage.getItem('adminToken');

      const url = editingCategory 
        ? `/api/admin/categories/${editingCategory._id}`
        : '/api/admin/categories';
      
      const method = editingCategory ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save category');
      }

      const data = await response.json();
      
      if (editingCategory) {
        // Update existing category in state
        setCategories(prev => prev.map(cat => 
          cat._id === editingCategory._id 
            ? data.category
            : cat
        ));
      } else {
        // Add new category to state
        setCategories(prev => [...prev, data.category]);
      }

      // Reset form
      setFormData({
        name: '',
        slug: '',
        description: '',
        color: '#059669',
        order: categories.length + 1,
        isActive: true
      });
      setEditingCategory(null);
      setShowForm(false);
    } catch (err) {
      console.error('Error saving category:', err);
      setError(err instanceof Error ? err.message : 'Failed to save category');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (category: Category) => {
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description,
      color: category.color,
      order: category.order,
      isActive: category.isActive
    });
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    const category = categories.find(c => c._id === id);
    if (!category) return;
    
    if (category.articleCount > 0) {
      alert(`Cannot delete category "${category.name}" because it contains ${category.articleCount} articles. Please move or delete the articles first.`);
      return;
    }

    if (confirm(`Are you sure you want to delete the category "${category.name}"?`)) {
      try {
        setError('');
        const token = localStorage.getItem('adminToken');

        const response = await fetch(`/api/admin/categories/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete category');
        }

        // Remove from state
        setCategories(prev => prev.filter(cat => cat._id !== id));
      } catch (err) {
        console.error('Error deleting category:', err);
        setError(err instanceof Error ? err.message : 'Failed to delete category');
      }
    }
  };

  const handleToggleActive = async (id: string) => {
    const category = categories.find(c => c._id === id);
    if (!category) return;

    try {
      setError('');
      const token = localStorage.getItem('adminToken');

      const response = await fetch(`/api/admin/categories/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...category,
          isActive: !category.isActive
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update category');
      }

      const data = await response.json();
      
      // Update in state
      setCategories(prev => prev.map(cat => 
        cat._id === id ? data.category : cat
      ));
    } catch (err) {
      console.error('Error updating category:', err);
      setError(err instanceof Error ? err.message : 'Failed to update category');
    }
  };

  const cancelForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      color: '#059669',
      order: categories.length + 1,
      isActive: true
    });
    setEditingCategory(null);
    setShowForm(false);
    setError('');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
            <p className="text-gray-600">Manage your blog categories and organization</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 sm:mt-0 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center"
          >
            <span className="mr-2">➕</span>
            New Category
          </button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {editingCategory ? 'Edit Category' : 'Add New Category'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="e.g., Travel"
                  />
                </div>

                <div>
                  <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="e.g., travel"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    placeholder="Brief description of this category"
                  />
                </div>

                <div>
                  <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-2">
                    Color
                  </label>
                  <input
                    type="color"
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className="w-full h-10 border border-gray-300 rounded-lg"
                  />
                </div>

                <div>
                  <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    id="order"
                    name="order"
                    value={formData.order}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-center">
                    <input
                      id="isActive"
                      name="isActive"
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                    />
                    <label htmlFor="isActive" className="ml-2 text-sm font-medium text-gray-700">
                      Active (visible on website)
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={cancelForm}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
                >
                  {saving ? 'Saving...' : (editingCategory ? 'Update Category' : 'Add Category')}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center min-h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
              <p className="text-gray-500 mt-2">Loading categories...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">📁</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No categories yet</h3>
                  <p className="text-gray-500 mb-4">Get started by creating your first category</p>
                  <button
                    onClick={() => setShowForm(true)}
                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Create Category
                  </button>
                </div>
              ) : (
                categories.map((category) => (
                  <div key={category._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-500">/{category.slug}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {!category.isActive && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Inactive
                    </span>
                  )}
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {category.description}
              </p>

              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">
                  {category.articleCount} articles
                </span>
                <span className="text-sm text-gray-500">
                  Order: {category.order}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEdit(category)}
                    className="text-emerald-600 hover:text-emerald-900 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleToggleActive(category._id)}
                    className="text-blue-600 hover:text-blue-900 text-sm"
                  >
                    {category.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="text-red-600 hover:text-red-900 text-sm"
                    disabled={category.articleCount > 0}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
                ))
              )}
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
