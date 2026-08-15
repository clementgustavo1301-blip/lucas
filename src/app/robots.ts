import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://matosomorais.com.br';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Se quiser bloquear alguma rota, adicione aqui:
      // disallow: '/admin/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
