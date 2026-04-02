import type { Metadata, Viewport } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#ff3e00",
};

export const metadata: Metadata = {
  title: "Financial Protection Advocate | SEO Content Engine",
  description: "Pacific Cross / Non-Life Insurance / HMO Philippines — SEO + GEO Niche Content Strategy for Financial Protection Advocate by Marky Tantongco",
  keywords: [
    "Pacific Cross Philippines",
    "health insurance Philippines",
    "HMO vs insurance",
    "non-life insurance IC Philippines",
    "health insurance for freelancers",
    "OFW health insurance",
    "Financial Protection Advocate",
    "Marky Tantongco"
  ],
  authors: [{ name: "Marky Tantongco", url: "https://github.com/marktantongco" }],
  creator: "Financial Protection Advocate",
  publisher: "Financial Protection Advocate",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Financial Protection Advocate | SEO Content Engine",
    description: "Pacific Cross / Non-Life Insurance / HMO Philippines — Complete SEO Content Strategy",
    url: "https://financial-protection-advocate.vercel.app",
    siteName: "Financial Protection Advocate",
    type: "website",
    locale: "en_PH",
  },
  twitter: {
    card: "summary_large_image",
    title: "Financial Protection Advocate | SEO Content Engine",
    description: "Pacific Cross / Non-Life Insurance / HMO Philippines — Complete SEO Content Strategy",
    creator: "@markytanky",
  },
  alternates: {
    canonical: "https://financial-protection-advocate.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="FPA SEO Engine" />
      </head>
      <body
        className={`${jetbrainsMono.variable} font-mono antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
