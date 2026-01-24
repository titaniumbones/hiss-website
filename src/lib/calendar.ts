// Calendar utilities for fetching and parsing ICS feeds

import ical from "ical";

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  location?: string;
  url?: string;
  organizer?: string;
}

/**
 * Fetch and parse ICS calendar feed
 * @param icsUrl - URL of the ICS feed
 * @returns Array of parsed calendar events
 */
export async function fetchCalendarEvents(
  icsUrl: string
): Promise<CalendarEvent[]> {
  if (!icsUrl) {
    console.warn("No ICS URL provided");
    return [];
  }

  try {
    // Fetch ICS data from URL
    const response = await fetch(icsUrl, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch calendar: ${response.statusText}`);
    }

    const icsData = await response.text();

    // Parse ICS data
    const parsedCal = ical.parseICS(icsData);

    // Convert to our CalendarEvent format
    const events: CalendarEvent[] = [];

    for (const [key, event] of Object.entries(parsedCal)) {
      if (event.type === "VEVENT") {
        // Only include events that have a start date
        if (!event.start) continue;

        // Handle organizer - can be string or object
        let organizerName: string | undefined;
        if (event.organizer) {
          if (typeof event.organizer === "string") {
            organizerName = event.organizer;
          } else if (
            typeof event.organizer === "object" &&
            "val" in event.organizer
          ) {
            organizerName = event.organizer.val;
          }
        }

        const calEvent: CalendarEvent = {
          id: event.uid || key,
          title: event.summary || "Untitled Event",
          description: event.description,
          start: new Date(event.start),
          end: event.end ? new Date(event.end) : new Date(event.start),
          location: event.location,
          url: event.url,
          organizer: organizerName,
        };

        events.push(calEvent);
      }
    }

    // Sort by start date (earliest first)
    events.sort((a, b) => a.start.getTime() - b.start.getTime());

    return events;
  } catch (error) {
    console.error("Error fetching calendar events:", error);
    return [];
  }
}

/**
 * Filter events to only include upcoming events
 * @param events - Array of calendar events
 * @param maxEvents - Maximum number of events to return
 * @returns Filtered array of upcoming events
 */
export function getUpcomingEvents(
  events: CalendarEvent[],
  maxEvents: number = 10
): CalendarEvent[] {
  const now = new Date();

  return events.filter((event) => event.start >= now).slice(0, maxEvents);
}

/**
 * Format date for display
 * @param date - Date to format
 * @returns Formatted date string
 */
export function formatEventDate(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

/**
 * Format time for display
 * @param date - Date to format
 * @returns Formatted time string
 */
export function formatEventTime(date: Date): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
}

/**
 * Check if event is happening today
 * @param date - Event date
 * @returns True if event is today
 */
export function isToday(date: Date): boolean {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

/**
 * Check if event is happening this week
 * @param date - Event date
 * @returns True if event is this week
 */
export function isThisWeek(date: Date): boolean {
  const today = new Date();
  const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  return date >= today && date <= weekFromNow;
}
