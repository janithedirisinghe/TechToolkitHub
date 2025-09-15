'use client';

import AdminLayout from '@/components/AdminLayout';
import SitemapRefreshButton from '@/components/SitemapRefreshButton';
import Link from 'next/link';

// Mock data - in production, this would come from your API
const dashboardStats = {
  totalArticles: 28,
  publishedArticles: 25,
  draftArticles: 3,
  totalViews: 45672,
  monthlyViews: 12543,
  weeklyViews: 3214,
  categories: 4,
  lastUpdated: '2 hours ago'
};

const recentArticles = [
  {
    id: 1,
    title: 'Complete Review of Visual Studio Code 2024',
    status: 'Published',
    category: 'Software Reviews',
    views: 1245,
    lastModified: '2024-09-06',
  },
  {
    id: 2,
    title: 'Docker Desktop Review: Complete Container Development Platform',
    status: 'Published',
    category: 'Dev Tools',
    views: 892,
    lastModified: '2024-09-05',
  },
  {
    id: 3,
    title: 'Notion vs. Obsidian: Ultimate Productivity App Comparison 2024',
    status: 'Published',
    category: 'Productivity',
    views: 756,
    lastModified: '2024-09-04',
  },
  {
    id: 4,
    title: 'Slack vs Microsoft Teams: Complete Business Communication Comparison',
    status: 'Published',
    category: 'Business Tools',
    views: 1124,
    lastModified: '2024-09-03',
  },
];

const categoryStats = [
  { name: 'Software Reviews', count: 8, color: 'bg-blue-500' },
  { name: 'Dev Tools', count: 7, color: 'bg-purple-500' },
  { name: 'Productivity', count: 6, color: 'bg-green-500' },
  { name: 'Business Tools', count: 4, color: 'bg-red-500' },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-4 sm:space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 sm:p-6 text-white">
          <h1 className="text-xl sm:text-2xl font-bold mb-2">Welcome back, Admin!</h1>
          <p className="text-blue-100 text-sm sm:text-base">
            Manage your TechToolkitHub content and track your audience engagement.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                <span className="text-xl sm:text-2xl">📝</span>
              </div>
              <div className="ml-3 sm:ml-4 min-w-0">
                <h3 className="text-xs sm:text-sm font-medium text-gray-500 truncate">Total Articles</h3>
                <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalArticles}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                <span className="text-xl sm:text-2xl">👁️</span>
              </div>
              <div className="ml-3 sm:ml-4 min-w-0">
                <h3 className="text-xs sm:text-sm font-medium text-gray-500 truncate">Total Views</h3>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">{dashboardStats.totalViews.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
                <span className="text-xl sm:text-2xl">✅</span>
              </div>
              <div className="ml-3 sm:ml-4 min-w-0">
                <h3 className="text-xs sm:text-sm font-medium text-gray-500 truncate">Published</h3>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">{dashboardStats.publishedArticles}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 border border-gray-200">
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
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Recent Articles</h2>
                <Link
                  href="/admin/articles"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View all
                </Link>
              </div>
            </div>
            <div className="p-4 sm:p-6">
              <div className="space-y-4">
                {recentArticles.map((article) => (
                  <div key={article.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex-1 mb-3 sm:mb-0">
                      <h3 className="font-medium text-gray-900 mb-1">{article.title}</h3>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <span className="w-2 h-2 rounded-full mr-2 bg-emerald-500"></span>
                          {article.category}
                        </span>
                        <span className="hidden sm:inline">{article.lastModified}</span>
                        <span>{article.views} views</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        article.status === 'Published' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {article.status}
                      </span>
                      <Link
                        href={`/admin/articles/${article.id}/edit`}
                        className="text-gray-400 hover:text-gray-600 p-1"
                        aria-label="Edit article"
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
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  href="/admin/articles/new"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center text-sm sm:text-base"
                >
                  <span className="mr-2">➕</span>
                  New Article
                </Link>
                <Link
                  href="/admin/articles"
                  className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center text-sm sm:text-base"
                >
                  <span className="mr-2">📝</span>
                  Manage Articles
                </Link>
                <Link
                  href="/admin/categories"
                  className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center text-sm sm:text-base"
                >
                  <span className="mr-2">📁</span>
                  Categories
                </Link>
              </div>
            </div>

            {/* Categories Overview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-3">
                {categoryStats.map((category) => (
                  <div key={category.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                      <span className="text-sm text-gray-700 truncate">{category.name}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900 flex-shrink-0">{category.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Analytics Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
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

            {/* Sitemap Management */}
            <SitemapRefreshButton />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
