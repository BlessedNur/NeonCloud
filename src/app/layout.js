import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
            },
            className: "my-toast-class",
            success: {
              style: {
                background: "black",
                color: "white",
                border: "1px solid rgba(207, 8, 140, 0.3)",
              },
              icon: "✓",
            },
            error: {
              style: {
                background: "black",
                color: "white",
                border: "1px solid rgba(255, 0, 0, 0.3)",
              },
              icon: "✕",
            },
            loading: {
              style: {
                background: "black",
                color: "white",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
