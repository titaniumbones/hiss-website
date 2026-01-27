# Content Editing Guide

This guide explains how to edit website content without touching code. All content is stored in YAML and Markdown files in the `content/` directory.

## Quick Reference

| Content Type  | File Location                   | Format                         |
| ------------- | ------------------------------- | ------------------------------ |
| Site settings | `content/data/site.yaml`        | YAML                           |
| Navigation    | `content/data/navigation.yaml`  | YAML                           |
| Departments   | `content/data/departments.yaml` | YAML                           |
| Contact info  | `content/data/contact.yaml`     | YAML                           |
| Footer        | `content/data/footer.yaml`      | YAML                           |
| Page content  | `content/pages/*.md`            | Markdown with YAML frontmatter |

## Editing YAML Files

### Site Configuration (`content/data/site.yaml`)

Controls site-wide settings like name, description, and logo paths.

```yaml
name: "HISS Hub"
fullName: "Humanities & Interpretive Social Sciences Hub"
description: "Humanities and Interpretive Social Sciences Research Hub at UTSC"
url: "https://hiss.utsc.utoronto.ca"
```

**Fields:**

- `name` - Short site name (used in footer, meta tags)
- `fullName` - Full display name
- `description` - Site description for SEO
- `url` - Production URL

### Navigation (`content/data/navigation.yaml`)

Controls both main site navigation and the UTSC Quick Links bar.

```yaml
# Main navigation (appears in header)
main:
  - label: "Home"
    href: "/"
  - label: "Calendar"
    href: "/calendar"

# UTSC Quick Links bar (top of page)
utscQuickLinks:
  - label: "Acorn"
    href: "https://acorn.utoronto.ca"
```

**To add a new nav item:**

```yaml
main:
  - label: "Resources" # Display text
    href: "/resources" # Link URL
```

### Departments (`content/data/departments.yaml`)

Lists the founding departments displayed on home and about pages.

```yaml
departments:
  - name: "Anthropology"
    url: "https://www.utsc.utoronto.ca/anthropology/"
  - name: "English"
    url: "https://www.utsc.utoronto.ca/engdept/"
```

### Contact Information (`content/data/contact.yaml`)

```yaml
email: "hiss@utsc.utoronto.ca"

address:
  line1: "University of Toronto Scarborough"
  line2: "1265 Military Trail"
  city: "Scarborough"
  province: "Ontario"
  postalCode: "M1C 1A4"
  country: "Canada"
```

### Footer Configuration (`content/data/footer.yaml`)

```yaml
aboutDescription: "A research hub fostering..."

quickLinks:
  heading: "Quick Links"
  links:
    - label: "View Events"
      href: "/calendar"
    - label: "UTSC Home"
      href: "https://www.utsc.utoronto.ca"
      external: true # Opens in new tab

institutionalLinks:
  - label: "Accessibility"
    href: "https://www.utoronto.ca/accessibility"
```

## Editing Page Content

Page content uses Markdown files with YAML frontmatter. The frontmatter (between `---` markers) contains metadata and labels, while the body contains the actual content.

### File Structure

```
content/pages/
├── home.md      # Homepage
├── about.md     # About page
├── calendar.md  # Calendar page
└── contact.md   # Contact page
```

### Frontmatter Fields

Each page has different frontmatter fields. Here's the general pattern:

```markdown
---
title: "Page Title - HISS Hub" # Browser tab title
description: "Page description for SEO" # Meta description
pageTitle: "Visible Page Title" # H1 heading on page
headerSubtitle: "Subtitle text" # Lead paragraph
sectionHeading: "Section Name" # Section headings
---

## section-id

Content for this section goes here.
```

### Section IDs

Sections in markdown are identified by their heading ID. The heading text becomes the ID:

```markdown
## mission

This text appears under the "Our Mission" heading.

## activities-intro

This text introduces the activities section.
```

**Important:** Section IDs must match what the code expects. Don't rename sections without checking the page component.

### Home Page (`content/pages/home.md`)

```yaml
---
title: "HISS - Humanities & Interpretive Social Sciences Hub"
heroTitle: "Humanities & Interpretive Social Sciences Hub"
heroSubtitle: "Fostering cross-disciplinary community..."
welcomeHeading: "Welcome to HISS Hub"
departmentsHeading: "Founding Departments"
missionHeading: "Our Mission"
ctaHeading: "Get Involved"
buttons:
  viewEvents:
    label: "View Events"
    href: "/calendar"
  learnMore:
    label: "Learn More"
    href: "/about"
---
```

**Sections used:** `intro`, `departments-intro`, `mission-*`, `cta-intro`

### About Page (`content/pages/about.md`)

```yaml
---
title: "About - HISS Hub"
pageTitle: "About HISS Hub"
headerSubtitle: "Building bridges across disciplines..."
missionHeading: "Our Mission"
departmentsHeading: "Founding Departments"
activitiesHeading: "Our Activities"
---
```

**Sections used:** `mission`, `vision`, `founding-intro`, `activity-*`

### Contact Page (`content/pages/contact.md`)

```yaml
---
title: "Contact - HISS Hub"
pageTitle: "Contact Us"
headerSubtitle: "We'd love to hear from you..."
contactHeading: "Contact Information"
emailLabel: "Email"
addressLabel: "Address"
connectLabel: "Connect With Us"
messageHeading: "Send Us a Message"
quickLinksHeading: "Quick Links"
quickLinks:
  - label: "View Events Calendar"
    href: "/calendar"
---
```

**Sections used:** `connect-intro`, `message-intro`

### Calendar Page (`content/pages/calendar.md`)

```yaml
---
title: "Calendar - HISS Hub"
pageTitle: "Events Calendar"
headerSubtitle: "Stay connected with upcoming workshops..."
upcomingHeading: "Upcoming Events"
setupRequired:
  heading: "Calendar Setup Required"
  intro: "To display events..."
emptyState:
  heading: "No Upcoming Events"
  message: "There are no scheduled events..."
---
```

## Adding Mission/Activity Items

Mission and activity items follow a naming pattern:

```markdown
## mission-community-building

### Community Building

We create spaces for faculty to connect...

## mission-research-seminars

### Research Seminars

Regular seminars featuring faculty research...
```

The pattern is: `## prefix-item-name` followed by `### Display Heading` and content.

## Workflow

1. **Edit content files** in `content/` directory
2. **Preview locally** with `npm run dev`
3. **Commit changes** with git
4. **Deploy** - Netlify builds automatically on push

## Tips

- Always quote YAML strings that contain colons or special characters
- Use `external: true` for links that should open in new tabs
- Test locally before pushing changes
- Keep section IDs consistent with existing patterns
