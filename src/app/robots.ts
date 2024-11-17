// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://neoncloud.com'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/private/',
        
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`, // Next.js automatically handles the .xml extension
    host: baseUrl,
  }
}
