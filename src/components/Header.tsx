"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { NAVIGATION_ITEMS } from "@/lib/constants";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <Link href="/">
            <Logo priority width={180} height={54} />
          </Link>
        </div>

        <nav className="header__nav" aria-label="Main navigation">
          <ul className="nav__list">
            {NAVIGATION_ITEMS.map((item) => (
              <li key={item.href} className="nav__item">
                <Link
                  href={item.href}
                  className={`nav__link ${
                    pathname === item.href ? "nav__link--active" : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <button
          className="header__mobile-toggle"
          onClick={toggleMobileMenu}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle mobile menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {mobileMenuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <nav
          className={`mobile-nav ${mobileMenuOpen ? "mobile-nav--open" : ""}`}
          aria-label="Mobile navigation"
        >
          <ul className="nav__list">
            {NAVIGATION_ITEMS.map((item) => (
              <li key={item.href} className="nav__item">
                <Link
                  href={item.href}
                  className={`nav__link ${
                    pathname === item.href ? "nav__link--active" : ""
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
