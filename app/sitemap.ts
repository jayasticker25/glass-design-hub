import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://interior-solutions-indonesia.com'
  
  const products = [
    'sandblast-polos',
    'sandblast-motif', 
    'kaca-film-black',
    'stiker-oneway'
  ]

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/product/${product}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...productUrls,
  ]
}