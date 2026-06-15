import type { Metadata } from "next";
import { EB_Garamond, Lato } from "next/font/google";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import CookieConsent from "@/components/CookieConsent";
import "./globals.css";

const ebGaramond = EB_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lato = Lato({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "Lucas Matoso de Morais | Matoso Morais Advocacia",
  description: "Atendimento jurídico estratégico, humanizado e personalizado nas áreas previdenciária, trabalhista e cível em Mossoró - RN.",
  icons: {
    icon: "/brand/file_00000000611c720ebece5ee323503a39.png"
  }
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
        {children}
        <WhatsAppWidget />
        <CookieConsent />
      </body>
    </html>
  );
}
