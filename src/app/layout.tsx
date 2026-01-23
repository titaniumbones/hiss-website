import type { Metadata } from "next";
import "./globals.css";
import "@/styles/main.scss";

export const metadata: Metadata = {
  title: "HISS - Humanities & Interpretive Social Sciences Hub",
  description: "Research hub for cross-disciplinary community at UTSC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
