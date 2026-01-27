# CMS Integration RFP

## Request for Proposal: Headless CMS for HISS Hub Website

**Prepared by:** HISS Hub Technical Team
**Date:** January 2025
**Version:** 1.0

---

## Executive Summary

The HISS Hub website currently uses a git-based content management approach with YAML and Markdown files. While this works well for technical users, we are evaluating headless CMS options to enable non-technical staff to edit content without developer assistance.

This document outlines requirements, evaluates platform options, and recommends an integration approach.

---

## Current State

### Content Architecture

- **Framework:** Next.js 15 with static site generation
- **Hosting:** Netlify
- **Content storage:** Git repository (YAML + Markdown files)
- **Content types:**
  - Site configuration (YAML)
  - Navigation menus (YAML)
  - Page content (Markdown with frontmatter)
  - Calendar events (external Outlook ICS feed)

### Current Strengths

- Version control for all content changes
- Zero hosting costs for content
- Fast build times
- Full audit trail via git history

### Current Limitations

- Requires git knowledge to edit content
- No visual preview during editing
- No role-based access control
- No scheduled publishing

---

## Requirements

### Must Have (P0)

1. **Non-technical editing** - WYSIWYG or rich text editing for content
2. **Preview capability** - See changes before publishing
3. **Next.js integration** - Works with static site generation
4. **Netlify compatibility** - Triggers rebuilds on content change
5. **Version history** - Ability to revert changes
6. **Markdown support** - For existing page content

### Should Have (P1)

1. **Role-based access** - Admin, editor, reviewer roles
2. **Media management** - Image upload and optimization
3. **Draft/publish workflow** - Review before going live
4. **Content modeling** - Define structured content types
5. **API access** - For potential future integrations

### Nice to Have (P2)

1. **Scheduled publishing** - Publish at specific times
2. **Multi-language support** - For future expansion
3. **Content localization** - Different content per locale
4. **Audit logging** - Track who changed what
5. **SSO integration** - UofT authentication

---

## Platform Evaluation

### Option 1: Decap CMS (formerly Netlify CMS)

**Type:** Git-based (open source)
**Pricing:** Free

**Pros:**

- Free and open source
- Direct git integration (content stays in repo)
- Netlify Identity for auth
- Simple setup for Markdown content
- Full audit trail via git

**Cons:**

- Limited WYSIWYG capabilities
- No real-time collaboration
- Requires Netlify Identity setup
- Basic media handling

**Best for:** Teams comfortable with git-based workflow, budget-conscious

### Option 2: Tina CMS

**Type:** Git-based (commercial)
**Pricing:** Free tier, $99/mo for teams

**Pros:**

- Visual editing directly on page
- Git-backed content
- Real-time preview
- Modern React-based
- Good Next.js integration

**Cons:**

- Newer platform, smaller community
- Team features require paid plan
- Learning curve for setup

**Best for:** Visual-first editing with git backend

### Option 3: Sanity

**Type:** Headless API (commercial)
**Pricing:** Free tier (10K API requests/mo), $99/mo Growth

**Pros:**

- Flexible content modeling
- Real-time collaboration
- Excellent developer experience
- Rich media handling
- Portable Text for rich content

**Cons:**

- Content not in git
- API-based (requires integration work)
- Costs scale with usage
- Vendor lock-in for content

**Best for:** Complex content needs, real-time collaboration

### Option 4: Strapi

**Type:** Headless (self-hosted open source)
**Pricing:** Free (self-host), Cloud from $29/mo

**Pros:**

- Full control (self-hosted)
- Open source
- Customizable admin panel
- REST and GraphQL APIs

**Cons:**

- Requires hosting/maintenance
- More complex setup
- Database required
- Self-managed security

**Best for:** Full control requirements, technical teams

### Option 5: Contentful

**Type:** Headless API (commercial)
**Pricing:** Free tier, from $489/mo for teams

**Pros:**

- Enterprise-grade
- Excellent documentation
- Rich ecosystem
- Advanced workflows

**Cons:**

- Expensive at scale
- Content not in git
- Complex for simple sites
- Vendor lock-in

**Best for:** Enterprise needs, large teams

---

## Comparison Matrix

| Feature              | Decap | Tina      | Sanity    | Strapi   | Contentful |
| -------------------- | ----- | --------- | --------- | -------- | ---------- |
| **Pricing**          | Free  | Free-$99  | Free-$99  | Free-$29 | Free-$489  |
| **Git-backed**       | ✅    | ✅        | ❌        | ❌       | ❌         |
| **Visual editing**   | Basic | Excellent | Good      | Good     | Good       |
| **Real-time collab** | ❌    | Limited   | ✅        | ❌       | ✅         |
| **Self-host option** | N/A   | ❌        | ❌        | ✅       | ❌         |
| **Media handling**   | Basic | Good      | Excellent | Good     | Excellent  |
| **Setup complexity** | Low   | Medium    | Medium    | High     | Medium     |
| **Next.js support**  | Good  | Excellent | Excellent | Good     | Excellent  |

---

## Recommendations

### For HISS Hub: Decap CMS (Primary) or Tina CMS (Alternative)

**Rationale:**

1. **Budget** - Both have generous free tiers
2. **Git integration** - Maintains current version control workflow
3. **Simplicity** - HISS Hub has straightforward content needs
4. **Netlify compatibility** - Direct integration with existing hosting

### Recommended Approach

**Phase 1: Decap CMS (Immediate)**

- Add Decap CMS to existing site
- Configure for YAML/Markdown editing
- Use Netlify Identity for authentication
- Estimated effort: 1-2 days

**Phase 2: Evaluate Visual Editing (Future)**

- If visual editing becomes critical, evaluate Tina CMS
- Migrate if Decap proves insufficient
- Estimated effort: 3-5 days

---

## Integration Architecture

### Decap CMS Setup

```
┌─────────────────────────────────────────┐
│                 Users                    │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│           Decap CMS Admin               │
│         (/admin interface)              │
└─────────────────┬───────────────────────┘
                  │ Git API
                  ▼
┌─────────────────────────────────────────┐
│           GitHub Repository             │
│   content/data/*.yaml                   │
│   content/pages/*.md                    │
└─────────────────┬───────────────────────┘
                  │ Webhook
                  ▼
┌─────────────────────────────────────────┐
│            Netlify Build                │
│         (Static Site Gen)               │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│          Production Site                │
│      hiss.utsc.utoronto.ca             │
└─────────────────────────────────────────┘
```

### Required Files

```
public/
└── admin/
    ├── index.html    # Decap CMS entry point
    └── config.yml    # CMS configuration
```

### Sample Configuration

```yaml
# public/admin/config.yml
backend:
  name: git-gateway
  branch: main

media_folder: public/images
public_folder: /images

collections:
  - name: pages
    label: Pages
    files:
      - name: home
        label: Home Page
        file: content/pages/home.md
        fields:
          - { name: title, widget: string }
          - { name: heroTitle, widget: string }
          - { name: body, widget: markdown }

  - name: data
    label: Site Data
    files:
      - name: navigation
        label: Navigation
        file: content/data/navigation.yaml
        fields:
          - name: main
            widget: list
            fields:
              - { name: label, widget: string }
              - { name: href, widget: string }
```

---

## Cost Analysis

### Year 1 Costs

| Option          | Setup Cost | Annual Cost | Total Y1 |
| --------------- | ---------- | ----------- | -------- |
| Decap CMS       | $0         | $0          | **$0**   |
| Tina CMS (Free) | $0         | $0          | **$0**   |
| Tina CMS (Team) | $0         | $1,188      | $1,188   |
| Sanity (Free)   | $0         | $0          | **$0**   |
| Sanity (Growth) | $0         | $1,188      | $1,188   |
| Contentful      | $0         | $5,868      | $5,868   |

_Note: "Setup Cost" assumes internal development time, not external contractors._

---

## Migration Path

### From Current State to Decap CMS

1. **Add admin interface** (1 hour)
   - Create `public/admin/index.html`
   - Configure `public/admin/config.yml`

2. **Enable Netlify Identity** (30 min)
   - Enable in Netlify dashboard
   - Invite editors

3. **Test and refine** (2-4 hours)
   - Test each content type
   - Adjust widget configurations

4. **Documentation** (1-2 hours)
   - Update CONTENT_EDITING.md
   - Create admin user guide

### Rollback Plan

Since Decap CMS is git-based:

- All changes are git commits
- Can revert any change via git
- Remove `/admin` folder to disable CMS
- No data migration needed

---

## Decision Framework

| If...                          | Then consider...   |
| ------------------------------ | ------------------ |
| Budget is primary concern      | Decap CMS (free)   |
| Visual editing is critical     | Tina CMS           |
| Real-time collaboration needed | Sanity             |
| Full control required          | Strapi (self-host) |
| Enterprise requirements        | Contentful         |

---

## Next Steps

1. **Review this RFP** with stakeholders
2. **Decide on platform** based on budget and needs
3. **Implement Phase 1** (Decap CMS recommended)
4. **Gather feedback** from content editors
5. **Iterate** based on real-world usage

---

## Appendix: Resources

- [Decap CMS Documentation](https://decapcms.org/docs/)
- [Tina CMS Documentation](https://tina.io/docs/)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js CMS Guide](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Netlify Identity](https://docs.netlify.com/security/secure-access-to-sites/identity/)
