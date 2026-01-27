# Content Editing Guide

This directory contains markdown content files for the HISS Hub website. These files can be edited to update page content without changing the underlying code.

## File Structure

```
content/
└── pages/
    ├── home.md       - Home page content
    ├── about.md      - About page content
    └── contact.md    - Contact page content
```

## Markdown Format

Each content file consists of two parts:

### 1. Frontmatter (Metadata)

Frontmatter appears at the top of the file between `---` delimiters and contains page metadata:

```yaml
---
title: "Page Title"
description: "SEO description for search engines"
heroSubtitle: "Subtitle text that appears on the page"
lastUpdated: "2024-01-23" # Optional
keywords: ["keyword1", "keyword2"] # Optional
---
```

**Important Fields:**

- `title`: Used for browser tab title and SEO
- `description`: Used for search engine descriptions and social media previews
- Custom fields (like `heroSubtitle`): Used in specific page sections

### 2. Content Sections

After the frontmatter, content is organized into sections using heading IDs:

```markdown
## section-id

This is the content for this section. It can include **bold text**,
_italic text_, [links](https://example.com), and more.

## another-section

### Optional Subsection

More content here.
```

**How Section IDs Work:**

- Use `## section-id` to create reusable content sections
- The page code references these by ID (e.g., `intro`, `mission`, `vision`)
- Section IDs should use lowercase with hyphens (kebab-case)

## Common Content Patterns

### Simple Text Section

```markdown
## intro

This is a simple paragraph that will be displayed on the page.
It can span multiple lines.
```

### Blockquote Section

```markdown
## vision

> This will appear as a blockquote with special formatting.
```

### List of Items (Mission, Activities, etc.)

For structured items that appear as cards or grid items:

```markdown
## mission-collaborative-research

### Collaborative Research

We facilitate interdisciplinary research projects that draw on
diverse methodologies and theoretical frameworks.

## mission-community-building

### Community Building

We create spaces for faculty to connect, share ideas, and develop
new collaborations across departmental boundaries.
```

**Pattern:** Use `prefix-item-name` as the section ID, and the heading becomes the card title.

## Editing Content

### Step 1: Edit Markdown Files

1. Open the appropriate `.md` file in `content/pages/`
2. Make your changes to the content or metadata
3. Save the file

### Step 2: Preview Changes Locally

```bash
npm run dev
```

Then open http://localhost:3000 in your browser to see your changes.

### Step 3: Deploy Changes

Once you're satisfied with your changes:

```bash
git add content/
git commit -m "Update page content"
git push
```

The site will automatically rebuild and deploy on Netlify.

## Markdown Syntax Reference

### Text Formatting

```markdown
**Bold text**
_Italic text_
~~Strikethrough~~
`inline code`
```

### Links

```markdown
[Link text](https://example.com)
[Link with title](https://example.com "Hover text")
```

### Lists

```markdown
- Unordered list item
- Another item
  - Nested item

1. Ordered list item
2. Another item
```

### Headings

```markdown
## Heading 2

### Heading 3

#### Heading 4
```

**Note:** Use `##` (h2) for main sections, `###` (h3) for subsections.

## Best Practices

1. **Keep It Simple:** Write clear, concise content
2. **Use Semantic IDs:** Section IDs should describe the content (e.g., `intro`, `mission`, `contact-info`)
3. **Test Locally:** Always preview changes with `npm run dev` before committing
4. **Consistent Formatting:** Follow the existing patterns in each file
5. **Update Metadata:** Keep `lastUpdated` current when making significant changes

## Troubleshooting

### Content Not Appearing

- Check that the section ID matches what the page code expects
- Verify the frontmatter is properly formatted (valid YAML between `---` markers)
- Look for syntax errors in the markdown

### Build Errors

- Ensure all frontmatter fields use valid YAML syntax
- Check for unmatched quotes in metadata values
- Verify all section IDs are unique within the file

### Getting Help

If you encounter issues:

1. Check the Next.js build logs on Netlify
2. Test locally with `npm run dev` to see error messages
3. Review this guide for proper formatting examples

## Technical Details

### How It Works

1. **Markdown Files:** Content is stored in `.md` files in `content/pages/`
2. **Build Time:** Next.js reads these files during build
3. **Parsing:** `gray-matter` extracts frontmatter, `remark` converts markdown to HTML
4. **Rendering:** React components insert the HTML into the page structure

### File Locations

- Content files: `content/pages/*.md`
- Markdown utilities: `src/lib/markdown.ts`
- Page components: `src/app/*/page.tsx`
- Type definitions: `src/types/index.ts`

---

**Last Updated:** 2024-01-23
