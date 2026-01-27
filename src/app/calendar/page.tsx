import { H1, H2, Paragraph } from "@/components/Typography";
import CalendarEvent from "@/components/CalendarEvent";
import {
  fetchCalendarEvents,
  getUpcomingEvents,
  CalendarEvent as CalendarEventType,
} from "@/lib/calendar";
import { getCalendarConfig } from "@/lib/content";
import { getPageContent } from "@/lib/markdown";
import "../../styles/pages/_calendar.scss";

// Define the expected frontmatter structure
interface CalendarMetadata {
  title: string;
  description: string;
  pageTitle: string;
  headerSubtitle: string;
  upcomingHeading: string;
  setupRequired: {
    heading: string;
    intro: string;
    codeExample: string;
    stepsIntro: string;
    steps: string[];
  };
  errorState: {
    heading: string;
  };
  emptyState: {
    heading: string;
    message: string;
  };
}

export async function generateMetadata() {
  const content = await getPageContent("calendar");
  return {
    title: content?.metadata.title || "Calendar - HISS Hub",
    description:
      content?.metadata.description ||
      "View upcoming events and activities at the HISS Hub",
  };
}

// Revalidate every hour
export const revalidate = 3600;

export default async function CalendarPage() {
  const content = await getPageContent("calendar");
  const calendarConfig = getCalendarConfig();

  let events: CalendarEventType[] = [];
  let error: string | null = null;

  // Fetch calendar events if ICS URL is configured
  if (calendarConfig.icsUrl) {
    try {
      const allEvents = await fetchCalendarEvents(calendarConfig.icsUrl);
      events = getUpcomingEvents(allEvents, calendarConfig.maxEvents);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error("Failed to load calendar events:", errorMessage, err);
      error = "Unable to load calendar events. Please try again later.";
    }
  }

  // Use metadata from content or fall back to defaults
  const metadata = (content?.metadata || {}) as unknown as CalendarMetadata;
  const pageTitle = metadata.pageTitle || "Events Calendar";
  const headerSubtitle =
    metadata.headerSubtitle ||
    "Stay connected with upcoming workshops, seminars, and collaborative events at the HISS Hub.";
  const upcomingHeading = metadata.upcomingHeading || "Upcoming Events";
  const setupRequired = metadata.setupRequired || {
    heading: "Calendar Setup Required",
    intro:
      "To display events, please configure the calendar ICS feed URL in your environment variables:",
    codeExample: "NEXT_PUBLIC_CALENDAR_ICS_URL=your-ics-feed-url",
    stepsIntro: "How to get your Outlook ICS URL:",
    steps: [
      "Open your Outlook calendar",
      'Click Calendar > Share',
      'Click "Publish Calendar"',
      "Copy the ICS URL",
      "Add it to your .env.local file",
    ],
  };
  const errorState = metadata.errorState || { heading: "Error Loading Events" };
  const emptyState = metadata.emptyState || {
    heading: "No Upcoming Events",
    message:
      "There are no scheduled events at this time. Check back soon for upcoming workshops, seminars, and gatherings.",
  };

  return (
    <div className="calendar-page">
      <section className="calendar-page__header">
        <div className="calendar-page__container">
          <H1>{pageTitle}</H1>
          <Paragraph lead>{headerSubtitle}</Paragraph>
        </div>
      </section>

      <section className="calendar-page__content">
        <div className="calendar-page__container">
          {!calendarConfig.icsUrl ? (
            <div className="calendar-page__placeholder">
              <H2>{setupRequired.heading}</H2>
              <Paragraph>{setupRequired.intro}</Paragraph>
              <pre className="calendar-page__code">{setupRequired.codeExample}</pre>
              <Paragraph>
                <strong>{setupRequired.stepsIntro}</strong>
              </Paragraph>
              <ol>
                {setupRequired.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          ) : error ? (
            <div className="calendar-page__error">
              <H2>{errorState.heading}</H2>
              <Paragraph>{error}</Paragraph>
            </div>
          ) : events.length === 0 ? (
            <div className="calendar-page__empty">
              <H2>{emptyState.heading}</H2>
              <Paragraph>{emptyState.message}</Paragraph>
            </div>
          ) : (
            <>
              <H2>{upcomingHeading}</H2>
              <div className="calendar-page__events">
                {events.map((event) => (
                  <CalendarEvent key={event.id} event={event} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
