import "./globals.css";
import { Inter } from "next/font/google";

const font = Inter({ subsets: ["latin", "cyrillic"], weight: "400" });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
