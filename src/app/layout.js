import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Head from "next/head";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
export const metadata = {
  title: "NeonCloud | Modern Web Hosting & Deployment Platform",
  description:
    "Deploy your web applications instantly with NeonCloud. Features include one-click deployment, continuous integration, custom domains, and automatic HTTPS. Start hosting for free.",
  verification: {
    google: "cBkIpxf4CKHqnk_hQ0GHrq1NbgpbJHTwp5kIxeAnRX0", 
  },
  keywords:
    "web hosting, cloud hosting, deployment platform, free hosting, continuous deployment, CI/CD, web deployment, NeonCloud",
  alternates: {
    canonical: "https://neoncloud.vercel.app",
  },
  openGraph: {
    title: "NeonCloud - Modern Web Hosting Platform",
    description:
      "Deploy your web applications instantly with NeonCloud. Features include one-click deployment, continuous integration, custom domains, and automatic HTTPS.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/logo.png", 
        width: 1200,
        height: 630,
        alt: "NeonCloud Platform Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NeonCloud - Modern Web Hosting Platform",
    description: "Deploy your web applications instantly with NeonCloud",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
       <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.ico?v=2" />
      </Head>

      <body className={poppins.className}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "black",
              color: "white",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              borderRadius: "8px",
              padding: "12px",
              boxShadow: "0 0 10px rgba(207, 8, 140, 0.2)",
            },
            className: "neoncloud-toast",
            success: {
              style: {
                background: "black",
                color: "white",
                border: "1px solid rgba(207, 8, 140, 0.3)",
                boxShadow: "0 0 10px rgba(207, 8, 140, 0.2)",
              },
              icon: "✓",
            },
            error: {
              style: {
                background: "black",
                color: "white",
                border: "1px solid rgba(255, 0, 0, 0.3)",
                boxShadow: "0 0 10px rgba(255, 0, 0, 0.2)",
              },
              icon: "✕",
            },
            loading: {
              style: {
                background: "black",
                color: "white",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                boxShadow: "0 0 10px rgba(207, 8, 140, 0.1)",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
