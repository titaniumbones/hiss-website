// Application constants

export const SITE_NAME = "HISS Hub";
export const SITE_DESCRIPTION =
  "Humanities and Interpretive Social Sciences Research Hub at UTSC";

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
