import {
  CalendarEvent as CalendarEventType,
  formatEventDate,
  formatEventTime,
  isToday,
  isThisWeek,
} from "@/lib/calendar";

interface CalendarEventProps {
  event: CalendarEventType;
}

export default function CalendarEvent({ event }: CalendarEventProps) {
  const eventDate = formatEventDate(event.start);
  const startTime = formatEventTime(event.start);
  const endTime = formatEventTime(event.end);
  const today = isToday(event.start);
  const thisWeek = isThisWeek(event.start);

  return (
    <article className="calendar-event">
      <div className="calendar-event__date">
        <div className="calendar-event__day">{event.start.getDate()}</div>
        <div className="calendar-event__month">
          {event.start.toLocaleDateString("en-US", { month: "short" })}
        </div>
        {today && <div className="calendar-event__badge">Today</div>}
        {!today && thisWeek && (
          <div className="calendar-event__badge calendar-event__badge--week">
            This Week
          </div>
        )}
      </div>

      <div className="calendar-event__details">
        <h3 className="calendar-event__title">{event.title}</h3>

        <div className="calendar-event__meta">
          <div className="calendar-event__time">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>
              {startTime} - {endTime}
            </span>
          </div>

          {event.location && (
            <div className="calendar-event__location">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{event.location}</span>
            </div>
          )}
        </div>

        {event.description && (
          <p className="calendar-event__description">{event.description}</p>
        )}

        {event.url && (
          <a
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="calendar-event__link"
          >
            More Details →
          </a>
        )}
      </div>
    </article>
  );
}
