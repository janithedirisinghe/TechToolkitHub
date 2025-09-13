'use client';

import AdminLayout from '@/components/AdminLayout';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';

interface Category {
  _id: string;
  name: string;
  slug: string;
}

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const articleId = params.id;

  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    category: '',
    tags: '',
    featuredImage: '',
    status: 'draft' as 'draft' | 'published',
    featured: false,
    metaTitle: '',
    metaDescription: '',
    metaKeywords: ''
  });

  interface Section {
    heading: string;
    content: string;
    order: number;
  }
  const [sections, setSections] = useState<Section[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('adminToken');

        // Fetch categories and article data in parallel
        const [categoriesResponse, articleResponse] = await Promise.all([
          fetch('/api/admin/categories', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
          fetch(`/api/admin/articles/${articleId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          })
        ]);

        if (!categoriesResponse.ok) {
          throw new Error('Failed to fetch categories');
        }

        if (!articleResponse.ok) {
          throw new Error('Failed to fetch article');
        }

        const categoriesData = await categoriesResponse.json();
        const articleData = await articleResponse.json();

        setCategories(categoriesData.categories);
        
        // Set form data from API response
        const article = articleData.article;
        setFormData({
          title: article.title || '',
          slug: article.slug || '',
          excerpt: article.excerpt || '',
            // Prefer raw content if available else fallback
          content: article.content || '',
          category: article.category?.name || '',
          tags: (article.tags || []).join(', '),
          featuredImage: article.featuredImage || '',
          status: article.status === 'published' ? 'published' : 'draft',
          featured: article.featured || false,
          metaTitle: article.metaTitle || (article.title || '').substring(0,60),
          metaDescription: article.metaDescription || (article.excerpt || '').substring(0,160),
          metaKeywords: article.metaKeywords || ''
        });
        if (Array.isArray(article.sections)) {
          setSections(article.sections.map((s: { heading?: string; content?: string; order?: number }, index: number) => ({
            heading: s.heading || `Section ${index+1}`,
            content: s.content || '',
            order: typeof s.order === 'number' ? s.order : index
          })).sort((a: Section,b: Section)=>a.order-b.order));
        } else {
          setSections([]);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setIsLoading(false);
      }
    };

    if (articleId) {
      fetchData();
    }
  }, [articleId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    let processedValue = value;
    
    // Truncate metaTitle to 60 characters
    if (name === 'metaTitle' && value.length > 60) {
      processedValue = value.substring(0, 60);
    }
    
    // Truncate metaDescription to 160 characters
    if (name === 'metaDescription' && value.length > 160) {
      processedValue = value.substring(0, 160);
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : processedValue
    }));

    // Auto-generate slug from title
    if (name === 'title') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content || !formData.category) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      const token = localStorage.getItem('adminToken');

      const response = await fetch(`/api/admin/articles/${articleId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          slug: formData.slug,
          excerpt: formData.excerpt,
          content: formData.content,
          category: formData.category,
          featured: formData.featured,
          status: formData.status,
          metaTitle: formData.metaTitle,
          metaDescription: formData.metaDescription,
          metaKeywords: formData.metaKeywords,
          featuredImage: formData.featuredImage,
          tags: formData.tags,
          sections: sections.map((s, idx) => ({
            heading: s.heading.trim() || `Section ${idx+1}`,
            content: s.content,
            order: idx
          }))
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update article');
      }

      // Redirect to articles list
      router.push('/admin/articles');
    } catch (err) {
      console.error('Error updating article:', err);
      setError(err instanceof Error ? err.message : 'Failed to update article');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
      return;
    }

    try {
      setError('');
      const token = localStorage.getItem('adminToken');

      const response = await fetch(`/api/admin/articles/${articleId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete article');
      }

      // Redirect to articles list
      router.push('/admin/articles');
    } catch (err) {
      console.error('Error deleting article:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete article');
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading article...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => router.push('/admin/articles')}
              className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700"
            >
              Back to Articles
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Article</h1>
            <p className="text-gray-600">Update your blog article</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleDelete}
              className="text-red-600 hover:text-red-900 flex items-center"
            >
              🗑️ Delete Article
            </button>
            <button
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-900 flex items-center"
            >
              ← Back to Articles
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Article Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Enter article title"
                />
              </div>

              <div className="md:col-span-2">
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
                  placeholder="article-url-slug"
                />
                <p className="text-sm text-gray-500 mt-1">
                  URL: srilankahow.com/{formData.category.toLowerCase()}/{formData.slug}
                </p>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="travel, sri lanka, guide (comma separated)"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt *
                </label>
                <textarea
                  id="excerpt"
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Brief description of the article (used in previews and meta description)"
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="featuredImage" className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image URL
                </label>
                <input
                  type="url"
                  id="featuredImage"
                  name="featuredImage"
                  value={formData.featuredImage}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
                {formData.featuredImage && (
                  <div className="mt-2">
                    <Image 
                      src={formData.featuredImage} 
                      alt="Featured image preview" 
                      width={400}
                      height={192}
                      className="w-full max-w-md h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Content</h2>
            
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Article Content (HTML) *
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                rows={14}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-mono"
                placeholder="Paste or type your HTML here (e.g., <h2>Title</h2><p>Paragraph...</p>)"
              />
              <p className="mt-2 text-xs text-gray-500">
                You can use HTML tags like &lt;p&gt;, &lt;h2&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;ol&gt;, &lt;table&gt;, etc. Unsafe markup will be sanitized on save.
              </p>
            </div>
          </div>

          {/* SEO Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="metaTitle" className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Title
                </label>
                <input
                  type="text"
                  id="metaTitle"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleInputChange}
                  maxLength={60}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="SEO title (recommended: 50-60 characters)"
                />
                <p className={`text-sm mt-1 ${
                  formData.metaTitle.length >= 60 
                    ? 'text-red-500' 
                    : formData.metaTitle.length >= 50 
                    ? 'text-yellow-600' 
                    : 'text-gray-500'
                }`}>
                  {formData.metaTitle.length}/60 characters
                  {formData.metaTitle.length >= 60 && ' (Maximum reached)'}
                </p>
              </div>

              <div>
                <label htmlFor="metaDescription" className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description
                </label>
                <textarea
                  id="metaDescription"
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleInputChange}
                  maxLength={160}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="SEO description (recommended: 140-160 characters)"
                />
                <p className={`text-sm mt-1 ${
                  formData.metaDescription.length >= 160 
                    ? 'text-red-500' 
                    : formData.metaDescription.length >= 140 
                    ? 'text-yellow-600' 
                    : 'text-gray-500'
                }`}>
                  {formData.metaDescription.length}/160 characters
                  {formData.metaDescription.length >= 160 && ' (Maximum reached)'}
                </p>
              </div>

              <div>
                <label htmlFor="metaKeywords" className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Keywords
                </label>
                <input
                  type="text"
                  id="metaKeywords"
                  name="metaKeywords"
                  value={formData.metaKeywords}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="keyword1, keyword2, keyword3 (comma separated)"
                />
              </div>
            </div>
          </div>

          {/* Publishing Options */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Publishing Options</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              <div className="flex items-center">
                <div className="flex items-center h-5">
                  <input
                    id="featured"
                    name="featured"
                    type="checkbox"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                  />
                </div>
                <div className="ml-3">
                  <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                    Featured Article
                  </label>
                  <p className="text-sm text-gray-500">
                    Featured articles appear in the homepage featured section
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Article Sections */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Article Sections</h2>
              <button
                type="button"
                onClick={() => setSections(prev => [...prev, { heading: `Section ${prev.length+1}`, content: '', order: prev.length }])}
                className="px-3 py-1.5 text-sm bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
              >
                + Add Section
              </button>
            </div>
            {sections.length === 0 && (
              <p className="text-sm text-gray-500">No sections yet. Add sections to break your article into structured parts.</p>
            )}
            <div className="space-y-6">
              {sections.map((section, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 relative group bg-gray-50">
                  <div className="flex items-start gap-4">
                    <div className="flex-1 space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Heading</label>
                        <input
                          type="text"
                          value={section.heading}
                          onChange={e => setSections(prev => prev.map((s,i)=> i===index ? { ...s, heading: e.target.value } : s))}
                          className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm"
                          placeholder={`Section ${index+1} Heading`}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">Content (HTML)</label>
                        <textarea
                          value={section.content}
                          onChange={e => setSections(prev => prev.map((s,i)=> i===index ? { ...s, content: e.target.value } : s))}
                          rows={5}
                          className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-sm font-mono"
                          placeholder="<p>Section content...</p>"
                        />
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>Order:</span>
                        <input
                          type="number"
                          min={0}
                          value={section.order}
                          onChange={e => {
                            const newOrder = parseInt(e.target.value, 10);
                            if (!Number.isNaN(newOrder)) {
                              setSections(prev => prev.map((s,i)=> i===index ? { ...s, order: newOrder } : s).sort((a,b)=>a.order-b.order));
                            }
                          }}
                          className="w-16 px-2 py-1 border border-gray-300 rounded-md focus:ring-emerald-500 focus:border-emerald-500"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button
                        type="button"
                        onClick={() => setSections(prev => prev.filter((_,i)=>i!==index))}
                        className="text-red-600 hover:text-red-800 text-xs"
                      >
                        Remove
                      </button>
                      {index>0 && (
                        <button
                          type="button"
                          onClick={() => setSections(prev => {
                            const copy = [...prev];
                            const tmp = copy[index-1];
                            copy[index-1] = copy[index];
                            copy[index] = tmp;
                            return copy.map((s,i)=> ({...s, order:i}));
                          })}
                          className="text-gray-600 hover:text-gray-900 text-xs"
                        >
                          ↑ Up
                        </button>
                      )}
                      {index < sections.length -1 && (
                        <button
                          type="button"
                          onClick={() => setSections(prev => {
                            const copy = [...prev];
                            const tmp = copy[index+1];
                            copy[index+1] = copy[index];
                            copy[index] = tmp;
                            return copy.map((s,i)=> ({...s, order:i}));
                          })}
                          className="text-gray-600 hover:text-gray-900 text-xs"
                        >
                          ↓ Down
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            
            <div className="flex items-center space-x-4">
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={() => setFormData(prev => ({ ...prev, status: 'draft' }))}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : 'Save as Draft'}
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={() => setFormData(prev => ({ ...prev, status: 'published' }))}
                className="px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Updating...' : 'Update Article'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
