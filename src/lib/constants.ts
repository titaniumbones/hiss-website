// Application constants

export const SITE_NAME = "HISS Hub";
export const SITE_DESCRIPTION =
  "Humanities and Interpretive Social Sciences Research Hub at UTSC";
export const SITE_URL = "https://hiss.utsc.utoronto.ca"; // Update with actual URL

export const FOUNDING_DEPARTMENTS = [
  "Anthropology",
  "Department of Language Studies",
  "English",
  "Geography",
  "Historical and Cultural Studies",
  "Arts, Culture, and Media",
] as const;

export const NAVIGATION_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Calendar", href: "/calendar" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

// Logo configuration
export const LOGO_CONFIG = {
  default: {
    src: "/images/logos/utsc-logo.svg",
    width: 200,
    height: 60,
  },
  white: {
    src: "/images/logos/utsc-logo-white.svg",
    width: 200,
    height: 60,
  },
  fallback: {
    src: "/images/logos/utsc-logo.png",
    width: 400,
    height: 120,
  },
} as const;

// Contact information
export const CONTACT_INFO = {
  email: "hiss@utsc.utoronto.ca", // Update with actual email
  address: {
    line1: "University of Toronto Scarborough",
    line2: "1265 Military Trail",
    city: "Scarborough",
    province: "Ontario",
    postalCode: "M1C 1A4",
    country: "Canada",
  },
} as const;
