# HISS Hub Website

Official website for the **Humanities and Interpretive Social Sciences Research Hub** at the University of Toronto Scarborough.

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-site-id/deploy-status)](https://app.netlify.com/sites/your-site-name/deploys)

## 🎯 About

The HISS Hub fosters cross-disciplinary community and collaborative research among faculty at UTSC. The website showcases our activities, events, and connects scholars from six founding departments:

- Anthropology
- Department of Language Studies
- English
- Geography (Human Geography)
- Historical and Cultural Studies
- Arts, Culture, and Media

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/hiss-website.git
cd hiss-website

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📦 Technology Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** SASS/SCSS with UofT brand guidelines
- **Calendar:** ICS feed integration via node-ical
- **Deployment:** Netlify with continuous deployment
- **CI/CD:** GitHub Actions

## 🎨 Features

- ✅ UofT-compliant branding and design
- ✅ Responsive layout with mobile navigation
- ✅ Automatic calendar integration from Outlook ICS feeds
- ✅ Server-side rendering with ISR (1-hour cache)
- ✅ Comprehensive accessibility support
- ✅ PR preview deployments on Netlify
- ✅ Optimized performance (Lighthouse > 90)

## 📄 Pages

- **Home** - Introduction to HISS Hub with founding departments
- **Calendar** - Upcoming events with automatic updates
- **About** - Mission, vision, and activities
- **Contact** - Contact information and quick links

## ⚙️ Configuration

### Environment Variables

Create a `.env.local` file:

```bash
# Required
NEXT_PUBLIC_SITE_URL=https://hiss.utsc.utoronto.ca

# Optional - for calendar integration
NEXT_PUBLIC_CALENDAR_ICS_URL=https://outlook.office365.com/owa/calendar/.../calendar.ics
```

See `.env.example` for details.

### Calendar Setup

To display events from your Outlook calendar:

1. Get your ICS feed URL from Outlook
2. Add `NEXT_PUBLIC_CALENDAR_ICS_URL` to environment variables
3. Events will automatically refresh every hour

📖 **Full setup guide:** [docs/CALENDAR_SETUP.md](docs/CALENDAR_SETUP.md)

## 🚢 Deployment

### Netlify (Recommended)

The site is configured for automatic deployment to Netlify:

1. Connect your GitHub repository to Netlify
2. Netlify will auto-detect settings from `netlify.toml`
3. Add environment variables in Netlify dashboard
4. Deploy!

📖 **Full deployment guide:** [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)
📋 **Testing checklist:** [docs/DEPLOYMENT_CHECKLIST.md](docs/DEPLOYMENT_CHECKLIST.md)

### PR Previews

Every pull request automatically gets a preview deployment:

- Format: `deploy-preview-[PR#]--your-site-name.netlify.app`
- Full site functionality in isolated environment
- Perfect for reviewing changes before merging

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format with Prettier
npm run format:check # Check formatting
```

### Project Structure

```
hiss-website/
├── src/
│   ├── app/              # Next.js pages (App Router)
│   │   ├── page.tsx      # Home page
│   │   ├── calendar/     # Calendar page
│   │   ├── about/        # About page
│   │   └── contact/      # Contact page
│   ├── components/       # React components
│   ├── lib/              # Utilities and helpers
│   │   ├── calendar.ts   # Calendar integration
│   │   └── constants.ts  # App constants
│   ├── styles/           # SASS/SCSS styles
│   │   ├── abstracts/    # Variables, mixins, functions
│   │   ├── base/         # Reset, typography
│   │   ├── components/   # Component styles
│   │   ├── layout/       # Header, footer, navigation
│   │   └── pages/        # Page-specific styles
│   └── types/            # TypeScript types
├── docs/                 # Documentation
├── public/               # Static assets
└── netlify.toml          # Netlify configuration
```

## 📚 Documentation

- [Brand Guidelines](docs/BRAND_GUIDELINES.md) - UofT colors, typography, accessibility
- [Calendar Setup](docs/CALENDAR_SETUP.md) - ICS feed integration guide
- [Deployment Guide](docs/DEPLOYMENT.md) - Netlify deployment instructions
- [Deployment Checklist](docs/DEPLOYMENT_CHECKLIST.md) - Pre/post-deployment testing
- [Project Structure](PROJECT_STRUCTURE.md) - Detailed file organization

## 🎨 Design System

The site follows **UofT official brand guidelines**:

- **Primary Blue:** #1E3765 (PMS 655)
- **Accent Blue:** #007FA3 (PMS 633)
- **Typography:** Trade Gothic Next (with web-safe fallbacks)
- **Accessibility:** WCAG 2.1 AA compliant

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Make your changes
3. Run tests: `npm run lint && npm run build`
4. Commit: `git commit -m 'Add amazing feature'`
5. Push: `git push origin feature/amazing-feature`
6. Open a Pull Request

Pull requests automatically trigger preview deployments for review.

## 📧 Support

For questions or issues:

- **Email:** hiss@utsc.utoronto.ca
- **Issues:** [GitHub Issues](https://github.com/your-org/hiss-website/issues)

## 📝 License

Copyright © 2026 University of Toronto. All rights reserved.

## 🙏 Acknowledgments

- University of Toronto Brand Portal for design guidelines
- UTSC founding departments for collaboration and support
- Built with ❤️ for the HISS Hub community
