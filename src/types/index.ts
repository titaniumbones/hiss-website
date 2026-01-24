// Shared TypeScript types for the application

export interface NavigationItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  location?: string;
  description?: string;
  url?: string;
}

export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
}

export interface ContentMetadata {
  title: string;
  description: string;
  lastUpdated?: string;
  keywords?: string[];
  [key: string]: unknown;
}

export interface MarkdownContent {
  slug: string;
  metadata: ContentMetadata;
  rawContent: string;
  htmlContent: string;
}

export interface ContentSection {
  id: string;
  heading: string;
  content: string;
}
