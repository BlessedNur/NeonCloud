import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { CloudContextProvider } from "../context/Context";

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
  icons: {
    icon: "/favicon.ico",
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
      <body className={poppins.className}>
        <CloudContextProvider>

        {children}
        <Toaster
          position="top-right"
          theme="dark"
          toastOptions={{
            style: {
              background: "black",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            },
            className: "neoncloud-toast",
          }}
          />
          </CloudContextProvider>
      </body>
    </html>
  );
}
