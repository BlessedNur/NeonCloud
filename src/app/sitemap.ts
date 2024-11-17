// app/sitemap.ts
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get your base URL from environment variable
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://neoncloud.vercel.app'
  
  // Define your static routes
  const staticRoutes = [
    '',  // home page
    '/domain',
    '/pricing',
    '/terms',
    '/contact',
    '/about',
    '/docs',
    '/blog',
    // Add all your static routes
  ]

  // Create static pages sitemap
  const staticPages = staticRoutes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // If you have dynamic routes (like blog posts), you can fetch them:
  // Example with blog posts
  /*
  const posts = await prisma.post.findMany({
    select: {
      slug: true,
      updatedAt: true,
    },
  })

  const dynamicPages = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  */

  return [
    ...staticPages,
    // ...dynamicPages, // Uncomment when you add dynamic routes
  ]
}
