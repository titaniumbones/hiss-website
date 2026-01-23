import { H1, H2, Paragraph } from "@/components/Typography";
import "../../styles/pages/_calendar.scss";

export const metadata = {
  title: "Calendar - HISS Hub",
  description: "View upcoming events and activities at the HISS Hub",
};

export default function CalendarPage() {
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
          <div className="calendar-page__placeholder">
            <H2>Calendar Integration Coming Soon</H2>
            <Paragraph>
              This page will display events from our Outlook calendar feed. The
              calendar integration will be implemented in the next phase of
              development.
            </Paragraph>
            <Paragraph>
              In the meantime, please check back regularly for updates on
              upcoming HISS Hub events, including:
            </Paragraph>
            <ul>
              <li>Research seminars and presentations</li>
              <li>Interdisciplinary workshops</li>
              <li>Collaborative research sessions</li>
              <li>Guest speaker events</li>
              <li>Community gatherings</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
