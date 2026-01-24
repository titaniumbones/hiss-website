# Calendar Integration Setup

The HISS Hub website supports automatic calendar integration from Outlook via ICS feed.

## Features

- 📅 Automatic event fetching from Outlook calendar
- ⏰ Hourly updates (cached for 1 hour)
- 🎯 Smart event filtering (upcoming events only)
- 📍 Location, time, and description display
- 🔗 Links to event details
- 🏷️ "Today" and "This Week" badges
- 📱 Responsive design

## Setup Instructions

### 1. Get Your Outlook Calendar ICS URL

1. Open your **Outlook Calendar** (web or desktop)
2. Navigate to **Calendar** → **Share**
3. Click **Publish Calendar**
4. Copy the **ICS URL** (should look like: `https://outlook.office365.com/owa/calendar/.../calendar.ics`)

### 2. Configure Environment Variable

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_CALENDAR_ICS_URL=https://outlook.office365.com/owa/calendar/your-calendar-id/calendar.ics
```

**Important:** Use `.env.local` (not `.env`) so the file is git-ignored and your calendar URL stays private.

### 3. Restart Development Server

```bash
npm run dev
```

Visit http://localhost:3000/calendar to see your events.

## Configuration Options

Edit `src/lib/constants.ts` to customize:

```typescript
export const CALENDAR_CONFIG = {
  icsUrl: process.env.NEXT_PUBLIC_CALENDAR_ICS_URL || "",
  maxEvents: 10, // Maximum number of events to display
} as const;
```

## Deployment

### Environment Variables

When deploying to Netlify or Vercel, add the environment variable:

**Name:** `NEXT_PUBLIC_CALENDAR_ICS_URL`
**Value:** Your ICS feed URL

### Cache Behavior

- Events are cached for **1 hour** (3600 seconds)
- Page revalidates every hour in production
- ISR (Incremental Static Regeneration) ensures fast load times

## Troubleshooting

### No Events Showing

1. **Check environment variable:**

   ```bash
   echo $NEXT_PUBLIC_CALENDAR_ICS_URL
   ```

2. **Verify ICS URL works:**

   ```bash
   curl -I "YOUR_ICS_URL"
   ```

   Should return `200 OK`

3. **Check browser console** for error messages

### Calendar Not Updating

- Wait 1 hour for cache to expire
- Or restart the dev server
- In production, trigger a rebuild

### TypeScript Errors

If you see type errors, ensure dependencies are installed:

```bash
npm install --save ical node-fetch
npm install --save-dev @types/ical
```

## Calendar Event Format

Events display:

- **Date badge** - Day and month with "Today"/"This Week" indicators
- **Title** - Event name
- **Time** - Start and end times
- **Location** - Physical or virtual location (if provided)
- **Description** - Event details (first 3 lines)
- **Link** - "More Details" button (if URL provided)

## File Structure

```
src/
├── lib/
│   ├── calendar.ts          # Calendar utilities and ICS parsing
│   └── constants.ts          # Configuration including CALENDAR_CONFIG
├── components/
│   └── CalendarEvent.tsx     # Event display component
├── app/
│   └── calendar/
│       └── page.tsx          # Calendar page with event fetching
└── styles/
    ├── components/
    │   └── _calendar-event.scss
    └── pages/
        └── _calendar.scss
```

## API Reference

### `fetchCalendarEvents(icsUrl: string)`

Fetches and parses ICS feed.

**Returns:** `Promise<CalendarEvent[]>`

### `getUpcomingEvents(events: CalendarEvent[], maxEvents: number)`

Filters to upcoming events only.

**Returns:** `CalendarEvent[]`

### `formatEventDate(date: Date)` / `formatEventTime(date: Date)`

Format dates/times for display.

**Returns:** `string`

## Security Notes

- **Never commit** `.env.local` to git
- ICS URLs should be **published calendars** (public or authenticated links)
- For private calendars, ensure URL access is restricted
- Consider using Outlook's **limited sharing** options

## Support

For issues or questions:

- Email: hiss@utsc.utoronto.ca
- See `README.md` for general project documentation
