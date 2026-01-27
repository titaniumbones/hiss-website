import type { NavigationItem } from "@/lib/content";

interface UtscQuickLinksProps {
  links: NavigationItem[];
}

export default function UtscQuickLinks({ links }: UtscQuickLinksProps) {
  return (
    <div className="utsc-quick-links">
      <div className="utsc-quick-links__container">
        <nav aria-label="UTSC Quick Links">
          <ul className="utsc-quick-links__list">
            {links.map((link, index) => (
              <li key={link.href} className="utsc-quick-links__item">
                {index > 0 && (
                  <span
                    className="utsc-quick-links__separator"
                    aria-hidden="true"
                  >
                    |
                  </span>
                )}
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="utsc-quick-links__link"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
