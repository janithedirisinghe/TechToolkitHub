'use client';

import AdminLayout from '@/components/AdminLayout';
import Link from 'next/link';

// Mock data - in production, this would come from your API
const dashboardStats = {
  totalArticles: 28,
  publishedArticles: 25,
  draftArticles: 3,
  totalViews: 45672,
  monthlyViews: 12543,
  weeklyViews: 3214,
  categories: 6,
  lastUpdated: '2 hours ago'
};

const recentArticles = [
  {
    id: 1,
    title: 'Complete Guide to Sigiriya Rock Fortress',
    status: 'Published',
    category: 'Travel',
    views: 1245,
    lastModified: '2024-09-06',
  },
  {
    id: 2,
    title: 'How to Get a SIM Card in Sri Lanka',
    status: 'Published',
    category: 'Guides',
    views: 892,
    lastModified: '2024-09-05',
  },
  {
    id: 3,
    title: 'Digital Nomad Guide to Sri Lanka',
    status: 'Draft',
    category: 'Lifestyle',
    views: 0,
    lastModified: '2024-09-04',
  },
  {
    id: 4,
    title: 'Traditional Sri Lankan Festivals',
    status: 'Published',
    category: 'Culture',
    views: 567,
    lastModified: '2024-09-03',
  },
];

const categoryStats = [
  { name: 'Travel', count: 8, color: 'bg-blue-500' },
  { name: 'Guides', count: 7, color: 'bg-purple-500' },
  { name: 'Culture', count: 6, color: 'bg-orange-500' },
  { name: 'Lifestyle', count: 4, color: 'bg-pink-500' },
  { name: 'Food', count: 2, color: 'bg-green-500' },
  { name: 'Others', count: 1, color: 'bg-gray-500' },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-emerald-500 to-blue-600 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Welcome back, Admin!</h1>
          <p className="text-emerald-100">
            Manage your Sri Lanka How blog content and track your audience engagement.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <span className="text-2xl">📝</span>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Total Articles</h3>
                <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalArticles}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <span className="text-2xl">👁️</span>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Total Views</h3>
                <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalViews.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <span className="text-2xl">✅</span>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Published</h3>
                <p className="text-2xl font-bold text-gray-900">{dashboardStats.publishedArticles}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <span className="text-2xl">📁</span>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">Categories</h3>
                <p className="text-2xl font-bold text-gray-900">{dashboardStats.categories}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Articles */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Articles</h2>
                <Link
                  href="/admin/articles"
                  className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                >
                  View all
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentArticles.map((article) => (
                  <div key={article.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">{article.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <span className="w-2 h-2 rounded-full mr-2 bg-emerald-500"></span>
                          {article.category}
                        </span>
                        <span>{article.lastModified}</span>
                        <span>{article.views} views</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        article.status === 'Published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {article.status}
                      </span>
                      <Link
                        href={`/admin/articles/${article.id}/edit`}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/admin/articles/new"
                  className="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center"
                >
                  <span className="mr-2">➕</span>
                  New Article
                </Link>
                <Link
                  href="/admin/articles"
                  className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                >
                  <span className="mr-2">📝</span>
                  Manage Articles
                </Link>
                <Link
                  href="/admin/categories"
                  className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                >
                  <span className="mr-2">📁</span>
                  Categories
                </Link>
              </div>
            </div>

            {/* Categories Overview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-3">
                {categoryStats.map((category) => (
                  <div key={category.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                      <span className="text-sm text-gray-700">{category.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{category.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Analytics Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">This Month</span>
                  <span className="text-sm font-medium text-gray-900">{dashboardStats.monthlyViews.toLocaleString()} views</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">This Week</span>
                  <span className="text-sm font-medium text-gray-900">{dashboardStats.weeklyViews.toLocaleString()} views</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg. per Article</span>
                  <span className="text-sm font-medium text-gray-900">{Math.round(dashboardStats.totalViews / dashboardStats.totalArticles).toLocaleString()} views</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
