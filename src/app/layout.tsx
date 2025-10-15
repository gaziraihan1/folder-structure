import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Data Folder Explorer",
  description: "Interactive data folder with cart functionality",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <main>{children}</main>
      </body>
    </html>
  );
}

