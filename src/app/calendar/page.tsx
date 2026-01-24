import { H1, H2, Paragraph } from "@/components/Typography";
import CalendarEvent from "@/components/CalendarEvent";
import {
  fetchCalendarEvents,
  getUpcomingEvents,
  CalendarEvent as CalendarEventType,
} from "@/lib/calendar";
import { CALENDAR_CONFIG } from "@/lib/constants";
import "../../styles/pages/_calendar.scss";

export const metadata = {
  title: "Calendar - HISS Hub",
  description: "View upcoming events and activities at the HISS Hub",
};

// Revalidate every hour
export const revalidate = 3600;

export default async function CalendarPage() {
  let events: CalendarEventType[] = [];
  let error: string | null = null;

  // Fetch calendar events if ICS URL is configured
  if (CALENDAR_CONFIG.icsUrl) {
    try {
      const allEvents = await fetchCalendarEvents(CALENDAR_CONFIG.icsUrl);
      events = getUpcomingEvents(allEvents, CALENDAR_CONFIG.maxEvents);
    } catch (err) {
      console.error("Failed to load calendar events:", err);
      error = "Unable to load calendar events. Please try again later.";
    }
  }

  return (
    <div className="calendar-page">
      <section className="calendar-page__header">
        <div className="calendar-page__container">
          <H1>Events Calendar</H1>
          <Paragraph lead>
            Stay connected with upcoming workshops, seminars, and collaborative
            events at the HISS Hub.
          </Paragraph>
        </div>
      </section>

      <section className="calendar-page__content">
        <div className="calendar-page__container">
          {!CALENDAR_CONFIG.icsUrl ? (
            <div className="calendar-page__placeholder">
              <H2>Calendar Setup Required</H2>
              <Paragraph>
                To display events, please configure the calendar ICS feed URL in
                your environment variables:
              </Paragraph>
              <pre className="calendar-page__code">
                NEXT_PUBLIC_CALENDAR_ICS_URL=your-ics-feed-url
              </pre>
              <Paragraph>
                <strong>How to get your Outlook ICS URL:</strong>
              </Paragraph>
              <ol>
                <li>Open your Outlook calendar</li>
                <li>Click Calendar &gt; Share</li>
                <li>Click &quot;Publish Calendar&quot;</li>
                <li>Copy the ICS URL</li>
                <li>
                  Add it to your <code>.env.local</code> file
                </li>
              </ol>
            </div>
          ) : error ? (
            <div className="calendar-page__error">
              <H2>Error Loading Events</H2>
              <Paragraph>{error}</Paragraph>
            </div>
          ) : events.length === 0 ? (
            <div className="calendar-page__empty">
              <H2>No Upcoming Events</H2>
              <Paragraph>
                There are no scheduled events at this time. Check back soon for
                upcoming workshops, seminars, and gatherings.
              </Paragraph>
            </div>
          ) : (
            <>
              <H2>Upcoming Events</H2>
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
