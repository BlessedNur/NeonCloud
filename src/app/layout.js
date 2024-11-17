import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});
export const metadata = {
  title: "NeonCloud | Modern Web Hosting & Deployment Platform",
  description:
    "Deploy your web applications instantly with NeonCloud. Features include one-click deployment, continuous integration, custom domains, and automatic HTTPS. Start hosting for free.",
  keywords:
    "web hosting, cloud hosting, deployment platform, free hosting, continuous deployment, CI/CD, web deployment, NeonCloud",
  alternates: {
    canonical: "https://neoncloud.com",
  },
  openGraph: {
    title: "NeonCloud - Modern Web Hosting Platform",
    description:
      "Deploy your web applications instantly with NeonCloud. Features include one-click deployment, continuous integration, custom domains, and automatic HTTPS.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg", // Make sure to create this image
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
