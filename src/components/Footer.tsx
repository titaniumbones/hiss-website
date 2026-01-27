import Link from "next/link";
import type { Department, ContactConfig, FooterConfig } from "@/lib/content";

interface FooterProps {
  siteName: string;
  departments: Department[];
  contactInfo: ContactConfig;
  footerConfig: FooterConfig;
}

export default function Footer({
  siteName,
  departments,
  contactInfo,
  footerConfig,
}: FooterProps) {
  const currentYear = new Date().getFullYear();
  const { aboutDescription, quickLinks, institutionalLinks, copyright } =
    footerConfig;

  // Format copyright year range
  const copyrightYears =
    copyright.startYear === currentYear
      ? currentYear
      : `${copyright.startYear}-${currentYear}`;

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__section">
            <h3>About {siteName}</h3>
            <p>{aboutDescription}</p>
          </div>

          <div className="footer__section">
            <h3>Founding Departments</h3>
            <ul className="footer__list">
              {departments.map((dept) => (
                <li key={dept.name}>
                  <a href={dept.url} target="_blank" rel="noopener noreferrer">
                    {dept.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__section">
            <h3>{quickLinks.heading}</h3>
            <ul className="footer__list">
              {quickLinks.links.map((link) => (
                <li key={link.href}>
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link href={link.href}>{link.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__section">
            <h3>Contact</h3>
            <address>
              <p>
                {contactInfo.address.line1}
                <br />
                {contactInfo.address.line2}
                <br />
                {contactInfo.address.city}, {contactInfo.address.province}{" "}
                {contactInfo.address.postalCode}
              </p>
              <p>
                <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
              </p>
            </address>
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            &copy; {copyrightYears} {copyright.organization}. All rights
            reserved.
            {institutionalLinks.map((link, index) => (
              <span key={link.href}>
                {" | "}
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__institutional-link"
                >
                  {link.label}
                </a>
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
