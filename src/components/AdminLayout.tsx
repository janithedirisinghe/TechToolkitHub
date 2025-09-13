'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect, useRef, useCallback } from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const firstFocusableRef = useRef<HTMLButtonElement | null>(null);

  // Close sidebar on route change (mobile UX improvement)
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  // Focus management & ESC handling when sidebar is open
  useEffect(() => {
    if (!isSidebarOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSidebarOpen(false);
      }
      if (e.key === 'Tab' && sidebarRef.current) {
        const focusable = sidebarRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex="0"]'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isSidebarOpen]);

  useEffect(() => {
    if (isSidebarOpen && firstFocusableRef.current) {
      firstFocusableRef.current.focus();
    }
  }, [isSidebarOpen]);

  const openSidebar = useCallback(() => setIsSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);

  useEffect(() => {
    // Check authentication
    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        router.push('/admin/login');
        setIsLoading(false);
        return;
      }

      try {
        // Verify token with backend
        const response = await fetch('/api/admin/auth/verify', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          // Token is invalid
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          router.push('/admin/login');
        }
      } catch (error) {
        console.error('Auth verification failed:', error);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        router.push('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
    { name: 'Articles', href: '/admin/articles', icon: '📝' },
    { name: 'Add Article', href: '/admin/articles/new', icon: '➕' },
    { name: 'Categories', href: '/admin/categories', icon: '📁' },
    { name: 'Settings', href: '/admin/settings', icon: '⚙️' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile menu overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-[1px] z-40 md:hidden animate-fadeIn"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl ring-1 ring-gray-200/60 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0 flex flex-col`}
        role="dialog"
        aria-modal="true"
        aria-label="Admin navigation sidebar"
      >
        <div className="flex items-center justify-between h-16 px-5 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">SL</span>
            </div>
            <span className="text-lg font-semibold text-gray-900">Admin Panel</span>
          </div>
          <button
            onClick={closeSidebar}
            ref={firstFocusableRef}
            className="lg:hidden text-gray-500 hover:text-gray-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label="Close navigation menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="mt-4 px-3 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg mb-1 transition-colors ${
                  isActive
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={closeSidebar}
              >
                <span className="mr-3 text-lg" aria-hidden="true">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <span className="mr-3">🚪</span>
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
  <div className="md:ml-64 flex flex-col min-h-screen">
        {/* Top header */}
        <header className="bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <div className="flex items-center">
              <button
                onClick={openSidebar}
                className="md:hidden text-gray-500 hover:text-gray-700 mr-3 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                aria-label="Open navigation menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900 line-clamp-1">
                {navigation.find(item => item.href === pathname)?.name || 'Admin Panel'}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                target="_blank"
                className="text-gray-500 hover:text-gray-700 transition-colors hidden sm:inline-flex"
              >
                <span className="text-sm">View Site</span>
              </Link>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="text-emerald-600 font-medium text-sm">A</span>
                </div>
                <span className="text-sm text-gray-700 hidden xs:inline-block">Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 w-full max-w-full overflow-x-hidden">
          <div className="mx-auto max-w-7xl w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
