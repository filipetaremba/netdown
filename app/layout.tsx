import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  icons: {
    icon: '/logo.ico',
  },
  title: "Netdown",
  description: "Plataforma de Geração Automática de Documentos Universitários",
  keywords: [
    "documentos universitários",
    "rendimento pedagógico",
    "declaração de vínculo",
    "certificado de conclusão",
    "gerador de documentos",
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Cormorant+Garamond:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}