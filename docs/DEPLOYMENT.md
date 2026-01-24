# Deployment Guide

This guide covers deploying the HISS Hub website to Netlify with continuous deployment from GitHub.

## Prerequisites

- GitHub repository with the project code
- Netlify account (free tier works fine)
- Access to repository settings (for webhook configuration)

## Netlify Setup

### 1. Create Netlify Site

1. Go to [netlify.com](https://netlify.com) and sign in
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** as your Git provider
4. Authorize Netlify to access your GitHub account
5. Select the `hiss-website` repository

### 2. Configure Build Settings

Netlify should auto-detect the settings from `netlify.toml`, but verify:

- **Base directory:** (leave empty)
- **Build command:** `npm run build`
- **Publish directory:** `.next`
- **Node version:** 20

### 3. Configure Environment Variables

In Netlify dashboard → **Site settings** → **Environment variables**, add:

#### Required Variables

```
NEXT_PUBLIC_SITE_URL=https://your-site-name.netlify.app
```

#### Optional Variables

```
NEXT_PUBLIC_CALENDAR_ICS_URL=https://outlook.office365.com/owa/calendar/.../calendar.ics
```

**Important:** Set these for both **Production** and **Deploy previews** contexts.

### 4. Deploy Settings

#### Build & Deploy

- **Branch:** `main` (or your default branch)
- **Deploy contexts:**
  - ✅ Production: `main` branch
  - ✅ Deploy previews: All pull requests
  - ✅ Branch deploys: (optional) other branches

#### Deploy Notifications

Configure notifications in **Site settings** → **Build & deploy** → **Deploy notifications**:

- Email notifications for deploy failures
- Slack/Discord webhooks (optional)
- GitHub commit status checks (automatic)

## Custom Domain Setup

### Using UTSC Domain (hiss.utsc.utoronto.ca)

1. In Netlify → **Domain settings** → **Add custom domain**
2. Enter: `hiss.utsc.utoronto.ca`
3. Netlify will provide DNS instructions
4. Contact UTSC IT to configure DNS:
   - Add `CNAME` record pointing to your Netlify subdomain
   - Or use Netlify DNS (requires nameserver change)

#### DNS Configuration

**Option A: CNAME (Recommended)**

```
Type: CNAME
Name: hiss
Value: your-site-name.netlify.app
TTL: 3600
```

**Option B: A Record**

```
Type: A
Name: hiss
Value: 75.2.60.5 (Netlify load balancer)
```

### SSL Certificate

Netlify provides free SSL via Let's Encrypt:

1. After domain is verified, go to **HTTPS** settings
2. Click **"Verify DNS configuration"**
3. Click **"Provision certificate"**
4. Certificate will auto-renew every 90 days

## Environment-Specific Configuration

### Production

Deployed from `main` branch with production environment variables.

**URL:** `https://hiss.utsc.utoronto.ca`

### Deploy Previews (PR Previews)

- Every pull request gets a unique preview URL
- Format: `https://deploy-preview-[PR#]--your-site-name.netlify.app`
- Perfect for reviewing changes before merging
- Environment variables from **Deploy previews** context

### Branch Deploys

Optional branches can be deployed to:

- Format: `https://[branch-name]--your-site-name.netlify.app`
- Enable in **Site settings** → **Build & deploy** → **Branches**

## Deployment Workflow

### Standard Deployment

```bash
# 1. Make changes locally
git add .
git commit -m "Your changes"

# 2. Push to GitHub
git push origin main

# 3. Netlify automatically:
#    - Detects the push
#    - Runs npm run build
#    - Deploys to production
#    - Updates DNS
```

### Deploy Preview Workflow

```bash
# 1. Create feature branch
git checkout -b feature/new-feature

# 2. Make changes and push
git add .
git commit -m "Add new feature"
git push origin feature/new-feature

# 3. Create pull request on GitHub
# 4. Netlify automatically creates deploy preview
# 5. Review changes at preview URL
# 6. Merge PR when ready
# 7. Netlify deploys to production
```

## Build Configuration

### netlify.toml

The `netlify.toml` file in the project root configures:

- Build command and publish directory
- Node.js version
- Next.js plugin
- Security headers
- Cache headers for static assets
- Context-specific settings

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

## Monitoring & Debugging

### Build Logs

View build logs in Netlify dashboard:

1. Go to **Deploys** tab
2. Click on any deploy
3. View build log output

### Common Build Issues

#### Build Fails: "Command failed with exit code 1"

Check build log for:

- TypeScript errors: `npm run build` locally
- Missing dependencies: `npm install`
- Environment variables not set

#### Site Loads But Has Errors

- Check browser console for errors
- Verify environment variables are set
- Check if calendar ICS URL is accessible

#### Slow Build Times

- Review dependencies
- Check for large files in repository
- Consider using Netlify build plugins for caching

### Analytics

Netlify provides basic analytics:

- **Analytics** tab shows page views, unique visitors
- Upgrade to Netlify Analytics for detailed metrics
- Or integrate Google Analytics (add to `layout.tsx`)

## Performance Optimization

### Next.js ISR (Incremental Static Regeneration)

The site uses ISR for the calendar page:

- Static pages generated at build time
- Calendar page revalidates every hour
- Fast load times with fresh content

### Caching Strategy

Headers configured in `netlify.toml`:

- **Static assets** (JS/CSS/images): 1 year cache
- **HTML pages**: No cache (always fresh)
- **Calendar data**: 1 hour cache

## Security

### Headers

Security headers configured in `netlify.toml`:

- `X-Frame-Options: DENY` - Prevents clickjacking
- `X-Content-Type-Options: nosniff` - Prevents MIME sniffing
- `Referrer-Policy` - Controls referrer information
- `Permissions-Policy` - Restricts browser features

### Environment Variables

- Never commit `.env.local` to git
- Store sensitive values in Netlify dashboard
- Use `NEXT_PUBLIC_` prefix for client-side variables

## Rollback

If a deployment has issues:

1. Go to **Deploys** tab in Netlify
2. Find last working deployment
3. Click **"..."** menu → **"Publish deploy"**
4. Site instantly rolls back
5. Fix issue in code
6. Deploy again when ready

## CI/CD Integration

### GitHub Integration

Automatic:

- ✅ Commit status checks on PRs
- ✅ Deploy preview links in PR comments
- ✅ Auto-deploy on merge to main

### Manual Deploys

Deploy without git push:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Link to site
netlify link

# Deploy to production
netlify deploy --prod

# Or deploy preview
netlify deploy
```

## Troubleshooting

### Cannot Access Site

1. Check DNS configuration in domain registrar
2. Verify custom domain in Netlify settings
3. Wait for DNS propagation (up to 48 hours)
4. Use `dig hiss.utsc.utoronto.ca` to check DNS

### Environment Variable Not Working

1. Verify variable name in Netlify dashboard
2. Check if variable has `NEXT_PUBLIC_` prefix (if used client-side)
3. Redeploy site after changing variables
4. Check build logs for environment variable values

### Calendar Not Showing Events

1. Verify `NEXT_PUBLIC_CALENDAR_ICS_URL` is set
2. Check if ICS URL is accessible from Netlify servers
3. Test ICS URL with curl: `curl -I "URL"`
4. Check browser console for errors

## Cost Estimates

### Netlify Free Tier

Includes:

- 100 GB bandwidth/month
- 300 build minutes/month
- Automatic HTTPS
- Deploy previews
- Form handling (bonus)

**Estimated for HISS Hub:**

- ~1-2 GB bandwidth/month (low traffic)
- ~10 build minutes/month (5-10 deploys)
- **Cost: $0/month** ✅

### If Exceeding Free Tier

Netlify Pro ($19/month):

- 400 GB bandwidth
- Unlimited build minutes
- Advanced analytics
- Role-based access control

## Support

For deployment issues:

- **Netlify Status:** [netlifystatus.com](https://netlifystatus.com)
- **Netlify Support:** [netlify.com/support](https://netlify.com/support)
- **Documentation:** [docs.netlify.com](https://docs.netlify.com)
- **Community:** [answers.netlify.com](https://answers.netlify.com)

## Checklist

### Initial Setup

- [ ] Create Netlify account
- [ ] Connect GitHub repository
- [ ] Configure build settings
- [ ] Add environment variables
- [ ] Deploy to test URL
- [ ] Verify site works

### Custom Domain

- [ ] Add custom domain in Netlify
- [ ] Configure DNS with UTSC IT
- [ ] Verify DNS propagation
- [ ] Provision SSL certificate
- [ ] Test HTTPS access

### Optimization

- [ ] Enable deploy previews
- [ ] Configure branch deploys (optional)
- [ ] Set up deploy notifications
- [ ] Review security headers
- [ ] Test performance
- [ ] Set up monitoring

### Documentation

- [ ] Document environment variables
- [ ] Share preview workflow with team
- [ ] Document rollback procedure
- [ ] Add deployment section to README
