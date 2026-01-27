import Link from "next/link";
import type { Department, ContactConfig } from "@/lib/content";

interface FooterProps {
  siteName: string;
  siteDescription: string;
  departments: Department[];
  contactInfo: ContactConfig;
}

export default function Footer({
  siteName,
  siteDescription,
  departments,
  contactInfo,
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__section">
            <h3>About {siteName}</h3>
            <p>{siteDescription}</p>
          </div>

          <div className="footer__section">
            <h3>Founding Departments</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {departments.map((dept) => (
                <li key={dept.name} style={{ marginBottom: "0.5rem" }}>
                  <a href={dept.url} target="_blank" rel="noopener noreferrer">
                    {dept.name}
                  </a>
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
            &copy; {currentYear} University of Toronto. All rights reserved.
            {" | "}
            <Link href="https://www.utoronto.ca/accessibility">
              Accessibility
            </Link>
            {" | "}
            <Link href="https://www.utoronto.ca/privacy">Privacy</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
