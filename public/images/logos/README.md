# Logo Files

## Required Logos

### UTSC Logo

Place the official University of Toronto Scarborough logo files in this directory:

**Required files:**

- `utsc-logo.svg` (primary, preferred format)
- `utsc-logo-white.svg` (for dark backgrounds)
- `utsc-logo.png` (fallback, high-resolution)

**Where to obtain:**

- Official U of T Brand Portal: https://brand.utoronto.ca/
- UTSC Communications Office
- Contact: UTSC trademark/branding department

**Usage requirements:**

- Logo is copyrighted and protected under international copyright laws
- Prior written permission required for reproduction
- Must maintain proper clearspace (minimum 1x height of logo)
- Do not modify, distort, or recolor
- Use official color versions only

### Alternative Sources (for reference only)

These should only be used for placeholder/development purposes:

- [SeekLogo UTSC](https://seeklogo.com/vector-logo/433428/utsc)
- [CDNLogo UTSC](https://cdnlogo.com/logo/utsc_109148.html)
- [Brandfetch UofT](https://brandfetch.com/utoronto.ca)

## Logo Component Usage

```tsx
import Image from "next/image";

<Image
  src="/images/logos/utsc-logo.svg"
  alt="University of Toronto Scarborough"
  width={200}
  height={60}
  priority
/>;
```

## Accessibility

- Always include descriptive alt text
- Ensure sufficient contrast on backgrounds
- Maintain minimum size for legibility
