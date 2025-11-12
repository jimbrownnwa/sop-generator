import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Process Documentation Tool",
  description: "Document your business processes with guided interviews",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
