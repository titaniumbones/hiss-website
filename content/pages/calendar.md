---
title: "Calendar - HISS Hub"
description: "View upcoming events and activities at the HISS Hub"
pageTitle: "Events Calendar"
headerSubtitle: "Stay connected with upcoming workshops, seminars, and collaborative events at the HISS Hub."
upcomingHeading: "Upcoming Events"
setupRequired:
  heading: "Calendar Setup Required"
  intro: "To display events, please configure the calendar ICS feed URL in your environment variables:"
  codeExample: "NEXT_PUBLIC_CALENDAR_ICS_URL=your-ics-feed-url"
  stepsIntro: "How to get your Outlook ICS URL:"
  steps:
    - "Open your Outlook calendar"
    - "Click Calendar > Share"
    - "Click \"Publish Calendar\""
    - "Copy the ICS URL"
    - "Add it to your .env.local file"
errorState:
  heading: "Error Loading Events"
emptyState:
  heading: "No Upcoming Events"
  message: "There are no scheduled events at this time. Check back soon for upcoming workshops, seminars, and gatherings."
---
