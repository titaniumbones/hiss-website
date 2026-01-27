import type { Metadata } from "next";
import "./globals.css";
import "@/styles/main.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  getMainNavigation,
  getSiteName,
  getDepartments,
  getContactInfo,
  getSiteDescription,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "HISS - Humanities & Interpretive Social Sciences Hub",
  description: "Research hub for cross-disciplinary community at UTSC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Load content data at the layout level (server component)
  const navigation = getMainNavigation();
  const siteName = getSiteName();
  const siteDescription = getSiteDescription();
  const departments = getDepartments();
  const contactInfo = getContactInfo();

  return (
    <html lang="en">
      <body>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Header navigation={navigation} />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer
            siteName={siteName}
            siteDescription={siteDescription}
            departments={departments}
            contactInfo={contactInfo}
          />
        </div>
      </body>
    </html>
  );
}
