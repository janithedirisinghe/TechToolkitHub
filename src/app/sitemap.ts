import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://srilankahow.com'
  
  // Static pages
  const staticRoutes = [
    '',
    '/travel',
    '/culture',
    '/guides',
    '/lifestyle',
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
    'sigiriya-complete-guide',
    'sim-card-sri-lanka-guide',
    'sri-lankan-food-culture',
    'best-time-visit-sri-lanka',
    'traditional-sri-lankan-festivals',
    'budget-travel-sri-lanka',
    'kandy-ultimate-guide',
    'sri-lanka-transportation-guide',
    'galle-fort-walking-guide',
    '7-day-sri-lanka-itinerary',
    'best-beaches-sri-lanka',
    'buddhist-temple-etiquette',
    'traditional-arts-crafts',
    'sri-lankan-wedding-traditions',
    'ayurveda-traditional-medicine',
    'how-to-book-train-tickets',
    'sri-lanka-visa-application-guide',
    'how-to-exchange-money-sri-lanka',
    'how-to-hire-tuk-tuk-sri-lanka',
    'how-to-find-accommodation-sri-lanka',
    'how-to-stay-safe-sri-lanka',
    'colombo-public-transport-guide',
    'student-guide-sri-lanka',
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
