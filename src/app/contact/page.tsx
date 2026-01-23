import { H1, H2, Paragraph } from "@/components/Typography";
import { CONTACT_INFO, SITE_NAME } from "@/lib/constants";
import "../../styles/pages/_contact.scss";

export const metadata = {
  title: "Contact - HISS Hub",
  description: "Get in touch with the HISS Hub team",
};

export default function ContactPage() {
  return (
    <div className="contact-page">
      <section className="contact-page__header">
        <div className="contact-page__container">
          <H1>Contact Us</H1>
          <Paragraph lead>
            We&apos;d love to hear from you. Get in touch with the {SITE_NAME}{" "}
            team.
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
                  Follow our calendar for upcoming events, workshops, and
                  seminars. Join our community of scholars exploring the
                  humanities and interpretive social sciences.
                </Paragraph>
              </div>
            </div>

            <div className="contact-page__form">
              <H2>Send Us a Message</H2>
              <Paragraph>
                For inquiries about events, collaborations, or membership,
                please email us at{" "}
                <a href={`mailto:${CONTACT_INFO.email}`}>
                  {CONTACT_INFO.email}
                </a>
                .
              </Paragraph>
              <Paragraph>
                We typically respond within 2-3 business days.
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
