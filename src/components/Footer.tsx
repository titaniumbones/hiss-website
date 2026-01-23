import Link from "next/link";
import { CONTACT_INFO, FOUNDING_DEPARTMENTS, SITE_NAME } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__section">
            <h3>About {SITE_NAME}</h3>
            <p>
              A research hub fostering cross-disciplinary community for faculty
              at the University of Toronto Scarborough.
            </p>
          </div>

          <div className="footer__section">
            <h3>Founding Departments</h3>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {FOUNDING_DEPARTMENTS.map((dept) => (
                <li key={dept} style={{ marginBottom: "0.5rem" }}>
                  {dept}
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__section">
            <h3>Contact</h3>
            <address>
              <p>
                {CONTACT_INFO.address.line1}
                <br />
                {CONTACT_INFO.address.line2}
                <br />
                {CONTACT_INFO.address.city}, {CONTACT_INFO.address.province}{" "}
                {CONTACT_INFO.address.postalCode}
              </p>
              <p>
                <a href={`mailto:${CONTACT_INFO.email}`}>
                  {CONTACT_INFO.email}
                </a>
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
