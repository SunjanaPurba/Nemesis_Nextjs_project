import "./globals.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Providers from "../../components/Providers";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "ProStore – Product Management",
  description: "A modern product management application with authentication",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased">
        <Providers>
          <Toaster
            position="top-center"
            toastOptions={{
              className: "!bg-[var(--bg-secondary)] !border !border-[var(--border)] !text-[var(--text-primary)]",
              success: { iconTheme: { primary: "var(--accent-start)" } },
              error: { iconTheme: { primary: "var(--danger)" } },
            }}
          />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}