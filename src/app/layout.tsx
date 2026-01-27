import type { Metadata } from "next";
import "./globals.css";
import "@/styles/main.scss";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UtscQuickLinks from "@/components/UtscQuickLinks";
import {
  GoogleTagManagerHead,
  GoogleTagManagerBody,
} from "@/components/GoogleTagManager";
import {
  getMainNavigation,
  getUtscQuickLinks,
  getSiteName,
  getDepartments,
  getContactInfo,
  getFooterConfig,
  getAnalyticsConfig,
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
  const utscQuickLinks = getUtscQuickLinks();
  const siteName = getSiteName();
  const departments = getDepartments();
  const contactInfo = getContactInfo();
  const footerConfig = getFooterConfig();
  const analyticsConfig = getAnalyticsConfig();

  return (
    <html lang="en">
      <head>
        <GoogleTagManagerHead gtmId={analyticsConfig?.gtmId} />
      </head>
      <body>
        <GoogleTagManagerBody gtmId={analyticsConfig?.gtmId} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <UtscQuickLinks links={utscQuickLinks} />
          <Header navigation={navigation} />
          <main style={{ flex: 1 }}>{children}</main>
          <Footer
            siteName={siteName}
            departments={departments}
            contactInfo={contactInfo}
            footerConfig={footerConfig}
          />
        </div>
      </body>
    </html>
  );
}
