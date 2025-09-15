'use client'

import { useState } from 'react'

export default function SitemapRefreshButton() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('')

  const refreshSitemap = async () => {
    setIsRefreshing(true)
    setMessage('')
    setMessageType('')
 
    try {
      // Get the admin token from localStorage
      const token = localStorage.getItem('adminToken')
      
      if (!token) {
        setMessage('❌ Not authenticated. Please log in again.')
        setMessageType('error')
        setIsRefreshing(false)
        return
      }

      const response = await fetch('/api/admin/refresh-sitemap', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Add authorization header
        },
        credentials: 'include', // Include cookies for authentication
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setMessage('✅ Sitemap refreshed successfully!')
        setMessageType('success')
        
        // Optional: Show timestamp
        const timestamp = new Date().toLocaleTimeString()
        setTimeout(() => {
          setMessage(`✅ Sitemap refreshed at ${timestamp}`)
        }, 2000)
      } else {
        setMessage(`❌ Failed to refresh sitemap: ${data.error || 'Unknown error'}`)
        setMessageType('error')
      }
    } catch (error) {
      console.error('Error refreshing sitemap:', error)
      setMessage('❌ Network error while refreshing sitemap')
      setMessageType('error')
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Sitemap Management</h3>
          <p className="text-sm text-gray-600 mt-1">
            Manually refresh the sitemap.xml to include new published articles
          </p>
        </div>
        
        <button
          onClick={refreshSitemap}
          disabled={isRefreshing}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            isRefreshing
              ? 'bg-gray-400 text-white cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white hover:shadow-md'
          }`}
        >
          {isRefreshing ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Refreshing...</span>
            </div>
          ) : (
            '🔄 Refresh Sitemap'
          )}
        </button>
      </div>

      {message && (
        <div className={`mt-4 p-3 rounded-md text-sm ${
          messageType === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message}
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500">
        <p>💡 <strong>Tip:</strong> The sitemap automatically updates when you publish articles, but you can use this button if needed.</p>
        <p className="mt-1">🌐 <strong>Sitemap URL:</strong> <a href="/sitemap.xml" target="_blank" className="text-blue-600 hover:underline">/sitemap.xml</a></p>
      </div>
    </div>
  )
}