# Project Structure

## Directory Organization

```
hiss-website/
├── .beads/                 # Issue tracking database
├── src/
│   ├── app/               # Next.js app router pages
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   ├── components/        # Reusable React components
│   ├── styles/           # SASS stylesheets
│   │   ├── abstracts/    # Variables, mixins, functions
│   │   ├── base/         # Reset, typography
│   │   ├── layout/       # Header, footer, navigation
│   │   ├── components/   # Component-specific styles
│   │   ├── pages/        # Page-specific styles
│   │   └── main.scss     # Main SCSS entry point
│   ├── lib/              # Utility functions and helpers
│   │   └── constants.ts  # Application constants
│   └── types/            # TypeScript type definitions
│       └── index.ts      # Shared types
├── public/               # Static assets (images, fonts, etc.)
├── .eslintrc.json        # ESLint configuration
├── .prettierrc.json      # Prettier configuration
├── next.config.ts        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── package.json          # Project dependencies

## Key Files

- **src/app/layout.tsx**: Root layout with metadata and global imports
- **src/app/page.tsx**: Home page component
- **src/styles/main.scss**: Main stylesheet with imports
- **src/types/index.ts**: Shared TypeScript interfaces
- **src/lib/constants.ts**: Application-wide constants

## Naming Conventions

- **Components**: PascalCase (e.g., `Navigation.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Types**: PascalCase interfaces (e.g., `NavigationItem`)
- **Constants**: UPPER_SNAKE_CASE for constants, camelCase for objects
- **SCSS files**: kebab-case with underscore prefix for partials (e.g., `_variables.scss`)

## Import Aliases

TypeScript path alias `@/*` maps to `src/*`:
```typescript
import { SITE_NAME } from "@/lib/constants";
import type { NavigationItem } from "@/types";
```

## Styling Approach

- **Tailwind CSS**: Utility classes for rapid prototyping
- **SASS/SCSS**: Custom styles following UofT brand guidelines
- **CSS Modules**: Component-scoped styles (when needed)
- **Global styles**: Base reset, typography, and UofT brand variables

## Development Workflow

1. Run `npm run dev` to start development server
2. Run `npm run lint` to check for linting errors
3. Run `npm run format` to format code with Prettier
4. Run `npm run build` to create production build
