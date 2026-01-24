import { H1, H2, Paragraph } from "@/components/Typography";
import { CONTACT_INFO } from "@/lib/constants";
import { getPageContent, extractSectionText } from "@/lib/markdown";
import "../../styles/pages/_contact.scss";

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

  if (!content) {
    return (
      <div className="contact-page">
        <p>Content not available</p>
      </div>
    );
  }

  return (
    <div className="contact-page">
      <section className="contact-page__header">
        <div className="contact-page__container">
          <H1>Contact Us</H1>
          <Paragraph lead>
            {content.metadata.headerSubtitle as string}
          </Paragraph>
        </div>
      </section>

      <section className="contact-page__content">
        <div className="contact-page__container">
          <div className="contact-page__grid">
            <div className="contact-page__info">
              <H2>Contact Information</H2>

              <div className="contact-page__section">
                <h3>Email</h3>
                <Paragraph>
                  <a href={`mailto:${CONTACT_INFO.email}`}>
                    {CONTACT_INFO.email}
                  </a>
                </Paragraph>
              </div>

              <div className="contact-page__section">
                <h3>Address</h3>
                <address>
                  {CONTACT_INFO.address.line1}
                  <br />
                  {CONTACT_INFO.address.line2}
                  <br />
                  {CONTACT_INFO.address.city}, {CONTACT_INFO.address.province}{" "}
                  {CONTACT_INFO.address.postalCode}
                  <br />
                  {CONTACT_INFO.address.country}
                </address>
              </div>

              <div className="contact-page__section">
                <h3>Connect With Us</h3>
                <Paragraph>
                  {extractSectionText(content.htmlContent, "connect-intro")}
                </Paragraph>
              </div>
            </div>

            <div className="contact-page__form">
              <H2>Send Us a Message</H2>
              <Paragraph>
                {extractSectionText(content.htmlContent, "message-intro")}
              </Paragraph>

              <div className="contact-page__quick-links">
                <h3>Quick Links</h3>
                <ul>
                  <li>
                    <a href="/calendar">View Events Calendar</a>
                  </li>
                  <li>
                    <a href="/about">Learn About HISS Hub</a>
                  </li>
                  <li>
                    <a href="https://www.utsc.utoronto.ca">
                      Visit UTSC Website
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
