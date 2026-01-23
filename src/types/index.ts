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
