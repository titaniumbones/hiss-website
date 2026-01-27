/**
 * Content loading utilities for YAML data files
 *
 * This module provides typed access to all site content stored in YAML files.
 * All content that was previously in constants.ts is now loaded from:
 * - content/data/site.yaml
 * - content/data/navigation.yaml
 * - content/data/departments.yaml
 * - content/data/contact.yaml
 */

import fs from "fs";
import path from "path";
import yaml from "js-yaml";

const DATA_DIR = path.join(process.cwd(), "content", "data");

// =============================================================================
// Type Definitions
// =============================================================================

export interface SiteConfig {
  name: string;
  fullName: string;
  description: string;
  url: string;
  organization: {
    name: string;
    shortName: string;
    url: string;
  };
  logo: {
    default: { src: string; width: number; height: number };
    white: { src: string; width: number; height: number };
    fallback: { src: string; width: number; height: number };
  };
  calendar: {
    maxEvents: number;
  };
  analytics?: {
    gtmId?: string;
  };
}

export interface NavigationItem {
  label: string;
  href: string;
}

export interface NavigationConfig {
  main: NavigationItem[];
  utscQuickLinks: NavigationItem[];
}

export interface Department {
  name: string;
  url: string;
}

export interface DepartmentsConfig {
  departments: Department[];
}

export interface ContactConfig {
  email: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };
  officeHours?: {
    days: string;
    hours: string;
  };
  social?: {
    twitter?: string;
    linkedin?: string;
  };
}

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface FooterConfig {
  aboutDescription: string;
  quickLinks: {
    heading: string;
    links: FooterLink[];
  };
  institutionalLinks: FooterLink[];
  copyright: {
    organization: string;
    startYear: number;
  };
}

// =============================================================================
// Content Caching
// =============================================================================

// Simple in-memory cache for content (cleared on server restart)
const contentCache = new Map<string, unknown>();

function loadYamlFile<T>(filename: string): T {
  const cacheKey = filename;

  // Return cached content if available
  if (contentCache.has(cacheKey)) {
    return contentCache.get(cacheKey) as T;
  }

  const filePath = path.join(DATA_DIR, filename);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Content file not found: ${filePath}`);
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const data = yaml.load(fileContents) as T;

  // Cache the result
  contentCache.set(cacheKey, data);

  return data;
}

// =============================================================================
// Content Getters
// =============================================================================

/**
 * Get site configuration
 */
export function getSiteConfig(): SiteConfig {
  return loadYamlFile<SiteConfig>("site.yaml");
}

/**
 * Get navigation configuration (main nav + UTSC quick links)
 */
export function getNavigation(): NavigationConfig {
  return loadYamlFile<NavigationConfig>("navigation.yaml");
}

/**
 * Get main navigation items only
 */
export function getMainNavigation(): NavigationItem[] {
  return getNavigation().main;
}

/**
 * Get UTSC quick links
 */
export function getUtscQuickLinks(): NavigationItem[] {
  return getNavigation().utscQuickLinks;
}

/**
 * Get founding departments
 */
export function getDepartments(): Department[] {
  const config = loadYamlFile<DepartmentsConfig>("departments.yaml");
  return config.departments;
}

/**
 * Get contact information
 */
export function getContactInfo(): ContactConfig {
  return loadYamlFile<ContactConfig>("contact.yaml");
}

/**
 * Get footer configuration
 */
export function getFooterConfig(): FooterConfig {
  return loadYamlFile<FooterConfig>("footer.yaml");
}

// =============================================================================
// Convenience Exports (for backward compatibility during migration)
// =============================================================================

/**
 * Get site name
 */
export function getSiteName(): string {
  return getSiteConfig().name;
}

/**
 * Get site full name
 */
export function getSiteFullName(): string {
  return getSiteConfig().fullName;
}

/**
 * Get site description
 */
export function getSiteDescription(): string {
  return getSiteConfig().description;
}

/**
 * Get logo configuration
 */
export function getLogoConfig(): SiteConfig["logo"] {
  return getSiteConfig().logo;
}

/**
 * Get calendar configuration
 */
export function getCalendarConfig(): SiteConfig["calendar"] & {
  icsUrl: string;
} {
  const config = getSiteConfig().calendar;
  return {
    ...config,
    icsUrl: process.env.NEXT_PUBLIC_CALENDAR_ICS_URL || "",
  };
}

/**
 * Get analytics configuration (GTM ID)
 */
export function getAnalyticsConfig(): SiteConfig["analytics"] {
  return getSiteConfig().analytics || {};
}

// =============================================================================
// Cache Management
// =============================================================================

/**
 * Clear the content cache (useful for development or content updates)
 */
export function clearContentCache(): void {
  contentCache.clear();
}
