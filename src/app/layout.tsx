import type { Metadata } from "next";
import { EB_Garamond, Lato } from "next/font/google";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import "./globals.css";

const ebGaramond = EB_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lucas Matoso de Morais | Matoso Morais Advocacia",
  description: "Atendimento jurídico estratégico, humanizado e personalizado nas áreas previdenciária, trabalhista e cível em Mossoró - RN.",
  keywords: ["Advogado Previdenciário", "INSS", "Mossoró", "RN", "Advogado Trabalhista", "Direito Cível", "BPC", "LOAS", "Aposentadoria", "Lucas Matoso"],
  authors: [{ name: "Lucas Matoso de Morais" }],
  creator: "Lucas Matoso de Morais",
  publisher: "Matoso Morais Advocacia",
  openGraph: {
    title: "Matoso Morais Advocacia | Advogado em Mossoró",
    description: "Atendimento jurídico estratégico nas áreas previdenciária, trabalhista e cível em Mossoró - RN.",
    url: "https://matosomoraisadv.com.br",
    siteName: "Matoso Morais Advocacia",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Matoso Morais Advocacia",
    description: "Atendimento jurídico estratégico, humanizado e personalizado nas áreas previdenciária, trabalhista e cível em Mossoró - RN.",
  },
  icons: {
    icon: "/brand/logo_transparent.png"
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LegalService",
      "name": "Matoso Morais Advocacia",
      "image": "https://matosomoraisadv.com.br/brand/logo_horizontal.png",
      "url": "https://matosomoraisadv.com.br",
      "telephone": "+5584991594538",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Mossoró",
        "addressRegion": "RN",
        "addressCountry": "BR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -5.1884,
        "longitude": -37.3444
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "08:00",
          "closes": "18:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Saturday"],
          "opens": "08:00",
          "closes": "12:00"
        }
      ]
    },
    {
      "@type": "Person",
      "name": "Lucas Matoso de Morais",
      "jobTitle": "Advogado",
      "url": "https://matosomoraisadv.com.br",
      "sameAs": [
        "https://instagram.com",
        "https://linkedin.com",
        "https://facebook.com"
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${ebGaramond.variable} ${lato.variable} antialiased`}
    >
      <body className="min-h-screen font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <WhatsAppWidget />
      </body>
    </html>
  );
}
