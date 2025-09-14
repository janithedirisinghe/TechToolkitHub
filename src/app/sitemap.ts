import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://techtoolkithub.com'
  
  // Static pages
  const staticRoutes = [
    '',
    '/software-reviews',
    '/dev-tools',
    '/productivity',
    '/business-tools',
    '/about',
    '/contact',
    '/privacy',
    '/terms',
  ]
  
  const staticPages = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Sample article pages (in a real app, you'd fetch these from your CMS/database)
  const articleSlugs = [
    'vs-code-complete-review',
    'slack-vs-teams-comparison',
    'figma-design-tool-review',
    'best-project-management-tools',
    'notion-productivity-app-review',
    'github-vs-gitlab-comparison',
    'photoshop-vs-canva-review',
    'zoom-video-conferencing-guide',
    'trello-project-management-review',
    'best-code-editors-2024',
    'docker-development-tool-review',
    'asana-task-management-review',
    'shopify-ecommerce-platform-review',
    'aws-vs-azure-cloud-comparison',
    'chrome-vs-firefox-browser-review',
    'how-to-choose-crm-software',
    'wordpress-vs-webflow-comparison',
    'how-to-select-email-marketing-tool',
    'how-to-pick-design-software',
    'how-to-find-best-backup-solution',
    'how-to-choose-antivirus-software',
    'best-video-editing-software-review',
    'developer-productivity-tools-guide',
    'digital-nomad-sri-lanka-guide',
    'expat-guide-living-sri-lanka',
    'budget-backpacking-sri-lanka',
    'health-wellness-sri-lanka',
    'solo-female-travel-sri-lanka',
    'shopping-guide-sri-lanka',
    'sustainable-travel-sri-lanka',
  ]

  const articlePages = articleSlugs.map((slug) => ({
    url: `${baseUrl}/articles/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...articlePages]
}
