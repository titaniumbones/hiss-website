# Deployment Testing Checklist

Use this checklist to verify the deployment is working correctly.

## Pre-Deployment Checks

- [ ] All code committed and pushed to `main` branch
- [ ] Local build successful: `npm run build`
- [ ] No TypeScript errors: `npm run lint`
- [ ] Code formatted: `npm run format:check`
- [ ] All tests passing (when implemented)
- [ ] Environment variables documented in `.env.example`

## Netlify Setup

- [ ] Netlify account created
- [ ] GitHub repository connected
- [ ] Build settings configured (should auto-detect from netlify.toml)
- [ ] Environment variables added in Netlify dashboard:
  - [ ] `NEXT_PUBLIC_SITE_URL`
  - [ ] `NEXT_PUBLIC_CALENDAR_ICS_URL` (optional)
- [ ] Build & deploy settings verified
- [ ] Deploy notifications configured

## First Deployment Test

- [ ] Initial deployment triggered
- [ ] Build logs show no errors
- [ ] Site accessible at Netlify subdomain URL
- [ ] All pages load correctly:
  - [ ] Home page
  - [ ] Calendar page
  - [ ] About page
  - [ ] Contact page
- [ ] Navigation works between pages
- [ ] Mobile menu functions correctly
- [ ] Department links work
- [ ] Footer displays correctly
- [ ] No console errors in browser

## Functionality Testing

### Homepage

- [ ] Hero section displays
- [ ] Founding departments grid renders
- [ ] All department links work
- [ ] Mission section displays
- [ ] CTA buttons navigate correctly

### Calendar Page

- [ ] Page loads without errors
- [ ] If no ICS URL: Setup instructions display
- [ ] If ICS URL configured: Events display correctly
- [ ] Event cards render properly
- [ ] Date badges show correct dates
- [ ] "Today" and "This Week" badges appear when appropriate
- [ ] Event links work
- [ ] Responsive design works on mobile

### About Page

- [ ] Mission and vision sections display
- [ ] Founding departments list renders
- [ ] Department links work
- [ ] Activities grid displays

### Contact Page

- [ ] Contact information displays
- [ ] Email link works
- [ ] Address formatted correctly
- [ ] Quick links navigate properly

### Responsive Design

- [ ] Desktop view (1024px+) looks good
- [ ] Tablet view (768px-1023px) looks good
- [ ] Mobile view (< 768px) looks good
- [ ] Mobile menu opens and closes
- [ ] All content readable on small screens

## Performance Testing

- [ ] Lighthouse score run
  - [ ] Performance > 90
  - [ ] Accessibility > 90
  - [ ] Best Practices > 90
  - [ ] SEO > 90
- [ ] Page load time < 2 seconds
- [ ] Images optimized and loading
- [ ] No render-blocking resources

## PR Preview Testing

- [ ] Create test PR
- [ ] Netlify automatically builds preview
- [ ] Preview URL appears in PR comments
- [ ] GitHub status check passes
- [ ] Preview site functions correctly
- [ ] Changes visible in preview
- [ ] Merge PR
- [ ] Production deploys automatically

## Custom Domain Setup

- [ ] Custom domain added in Netlify
- [ ] DNS configured with UTSC IT
- [ ] DNS propagation verified: `dig hiss.utsc.utoronto.ca`
- [ ] SSL certificate provisioned
- [ ] HTTPS works correctly
- [ ] HTTP redirects to HTTPS
- [ ] www subdomain handled (if applicable)

## Security Headers

Check headers using browser dev tools or curl:

```bash
curl -I https://hiss.utsc.utoronto.ca
```

Verify headers:

- [ ] `X-Frame-Options: DENY`
- [ ] `X-Content-Type-Options: nosniff`
- [ ] `Referrer-Policy: strict-origin-when-cross-origin`
- [ ] `Permissions-Policy` configured
- [ ] `Strict-Transport-Security` (HSTS) enabled

## Caching

- [ ] Static assets cache for 1 year
- [ ] HTML not cached (always fresh)
- [ ] Calendar page revalidates hourly

## Monitoring Setup

- [ ] Netlify Analytics enabled (optional)
- [ ] Google Analytics integrated (optional)
- [ ] Error tracking configured (optional)
- [ ] Uptime monitoring set up (optional)

## Documentation

- [ ] Deployment process documented
- [ ] Environment variables documented
- [ ] Rollback procedure documented
- [ ] Team members have access to Netlify
- [ ] Emergency contacts identified

## Calendar Integration (If Configured)

- [ ] ICS URL accessible from Netlify servers
- [ ] Events fetching successfully
- [ ] Events display with correct formatting
- [ ] Dates and times accurate
- [ ] Location information shows
- [ ] Event links work
- [ ] Cache revalidation working (check after 1 hour)

## Edge Cases

- [ ] 404 page displays for invalid routes
- [ ] Error boundary catches JavaScript errors
- [ ] No calendar ICS URL: Shows setup instructions
- [ ] Calendar has no events: Shows empty state
- [ ] Long event titles display correctly
- [ ] Events without descriptions work
- [ ] Events without locations work

## Rollback Test

- [ ] Identify previous working deployment
- [ ] Click "Publish deploy" on previous version
- [ ] Verify site rolls back instantly
- [ ] Redeploy current version

## Load Testing (Optional)

- [ ] Site handles concurrent users
- [ ] No performance degradation under load
- [ ] Calendar page remains responsive

## Accessibility Testing

- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Color contrast meets WCAG AA
- [ ] Focus indicators visible
- [ ] Alt text on images
- [ ] Semantic HTML structure

## Browser Testing

Test in major browsers:

- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

## Final Verification

- [ ] All features working in production
- [ ] No console errors or warnings
- [ ] Analytics tracking (if enabled)
- [ ] Uptime monitoring active
- [ ] Team notified of deployment
- [ ] Documentation updated with production URL

## Post-Deployment

- [ ] Monitor for 24 hours
- [ ] Check error logs
- [ ] Verify analytics data coming in
- [ ] Test calendar updates (wait 1 hour)
- [ ] Verify SSL certificate auto-renewal scheduled

## Notes

Use this space to record any issues or observations during deployment:

```
Date: ___________
Deployed by: ___________
Issues found:


Resolved:


```
