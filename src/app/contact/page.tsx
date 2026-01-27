import { H1, H2, Paragraph } from "@/components/Typography";
import { getContactInfo } from "@/lib/content";
import { getPageContent, extractSectionText } from "@/lib/markdown";
import "../../styles/pages/_contact.scss";

// Define the expected frontmatter structure
interface QuickLink {
  label: string;
  href: string;
  external?: boolean;
}

interface ContactMetadata {
  title: string;
  description: string;
  pageTitle: string;
  headerSubtitle: string;
  contactHeading: string;
  emailLabel: string;
  addressLabel: string;
  connectLabel: string;
  messageHeading: string;
  quickLinksHeading: string;
  quickLinks: QuickLink[];
}

export async function generateMetadata() {
  const content = await getPageContent("contact");
  return {
    title: content?.metadata.title || "Contact - HISS Hub",
    description:
      content?.metadata.description || "Get in touch with the HISS Hub team",
  };
}

export default async function ContactPage() {
  const content = await getPageContent("contact");
  const contactInfo = getContactInfo();

  if (!content) {
    return (
      <div className="contact-page">
        <p>Content not available</p>
      </div>
    );
  }

  const metadata = content.metadata as unknown as ContactMetadata;

  return (
    <div className="contact-page">
      <section className="contact-page__header">
        <div className="contact-page__container">
          <H1>{metadata.pageTitle}</H1>
          <Paragraph lead>{metadata.headerSubtitle}</Paragraph>
        </div>
      </section>

      <section className="contact-page__content">
        <div className="contact-page__container">
          <div className="contact-page__grid">
            <div className="contact-page__info">
              <H2>{metadata.contactHeading}</H2>

              <div className="contact-page__section">
                <h3>{metadata.emailLabel}</h3>
                <Paragraph>
                  <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                </Paragraph>
              </div>

              <div className="contact-page__section">
                <h3>{metadata.addressLabel}</h3>
                <address>
                  {contactInfo.address.line1}
                  <br />
                  {contactInfo.address.line2}
                  <br />
                  {contactInfo.address.city}, {contactInfo.address.province}{" "}
                  {contactInfo.address.postalCode}
                  <br />
                  {contactInfo.address.country}
                </address>
              </div>

              <div className="contact-page__section">
                <h3>{metadata.connectLabel}</h3>
                <Paragraph>
                  {extractSectionText(content.htmlContent, "connect-intro")}
                </Paragraph>
              </div>
            </div>

            <div className="contact-page__form">
              <H2>{metadata.messageHeading}</H2>
              <Paragraph>
                {extractSectionText(content.htmlContent, "message-intro")}
              </Paragraph>

              <div className="contact-page__quick-links">
                <h3>{metadata.quickLinksHeading}</h3>
                <ul>
                  {metadata.quickLinks.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        {...(link.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
