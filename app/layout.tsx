import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import BackToTop from "./components/layout/BackToTop";

// Inlined at build time from next.config.ts → env.NEXT_PUBLIC_BASE_PATH
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ieeesb.uom.lk"),
  title: {
    default: "IEEE Student Branch - University of Moratuwa",
    template: "%s | IEEE Student Branch - University of Moratuwa",
  },
  description:
    "Official website of IEEE Student Branch, University of Moratuwa. Empowering future engineers through innovation, technical excellence, and collaboration. Join a community of over 500+ active members.",
  keywords: [
    "IEEE",
    "ieee uom",
    "university of moratuwa",
    "uom ieee",
    "IEEESB",
    "ieeesb uom",
    "student branch uom",
    "ieee student branch uom",
    "ieee sb moratuwa",
    "engineering",
    "technology",
    "innovation",
    "sri lanka",
    "uom student branch",
  ],
  authors: [{ name: "IEEE Student Branch, University of Moratuwa" }],
  creator: "IEEE Student Branch, University of Moratuwa",
  publisher: "IEEE Student Branch, University of Moratuwa",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ieeesb.uom.lk",
    siteName: "IEEE Student Branch - University of Moratuwa",
    title: "IEEE Student Branch - University of Moratuwa",
    description:
      "Empowering future engineers through innovation and collaboration at the University of Moratuwa.",
    images: [
      {
        url: "/logo/ieeesblogo.webp",
        width: 1200,
        height: 630,
        alt: "IEEE Student Branch University of Moratuwa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IEEE Student Branch - University of Moratuwa",
    description:
      "Empowering future engineers through innovation and collaboration at the University of Moratuwa.",
    images: ["/logo/ieeesblogo.webp"],
  },
  icons: {
    icon: `${BASE}/favicon.webp`,
    shortcut: `${BASE}/favicon.webp`,
    apple: `${BASE}/favicon.webp`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const libPath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        {/* Preload critical scripts for faster globe animation loading */}
        <link rel="preload" as="script" href={`${libPath}/lib/three.min.js`} />
        <link rel="preload" as="script" href={`${libPath}/lib/FontUtils.js`} />
        <link
          rel="preload"
          as="script"
          href={`${libPath}/lib/TextGeometry.js`}
        />
        <link rel="preload" as="script" href={`${libPath}/lib/bas.js`} />

        {/* Prefetch secondary scripts */}
        <link
          rel="prefetch"
          as="script"
          href={`${libPath}/lib/pnltri.min.js`}
        />
        <link
          rel="prefetch"
          as="script"
          href={`${libPath}/lib/droid_sans_bold.typeface.js`}
        />
        <link
          rel="prefetch"
          as="script"
          href={`${libPath}/lib/TweenMax.min.js`}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NGO",
              name: "IEEE Student Branch - University of Moratuwa",
              url: "https://ieeesb.uom.lk",
              logo: "https://ieeesb.uom.lk/logo/ieeesblogo.webp",
              sameAs: [
                "https://web.facebook.com/ieeesbuom",
                "https://www.linkedin.com/company/ieee-student-branch-university-of-moratuwa",
                "https://www.instagram.com/ieee_uom/",
              ],
              description:
                "The official IEEE Student Branch of the University of Moratuwa, empowering students through innovation and technical excellence.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Moratuwa",
                addressCountry: "Sri Lanka",
              },
            }),
          }}
        />
        <Navbar />
        {children}
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
