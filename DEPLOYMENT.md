# F&O Trading Platform - Render Deployment Guide

## Overview
This guide will help you deploy the F&O Trading Platform to Render with automatic CI/CD from GitHub.

## Prerequisites
- GitHub account
- Render account (free tier available)
- Git installed locally

## Quick Deployment Steps

### 1. Create GitHub Repository
1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `fo-trading-platform` 
3. Can be **Public or Private** (both work with Render)
4. **Do not** initialize with README, .gitignore, or license

### 2. Connect Local Repository
```bash
git remote add origin https://github.com/YOUR_USERNAME/fo-trading-platform.git
git branch -M main
git push -u origin main
```

### 3. Deploy to Render
1. Go to [Render](https://render.com) and sign in
2. Click "New +" → "Static Site"
3. Choose "GitHub" as your Git provider
4. Authorize Render to access your repositories
5. Select your `fo-trading-platform` repository
6. Render will automatically detect `render.yaml` configuration
7. Click "Create Static Site"

## Configuration Files

### render.yaml
The `render.yaml` file contains:
- Build and deployment configuration
- Security headers
- SPA routing rules
- Environment variables

### GitHub Actions
The `.github/workflows/deploy.yml` handles:
- Automated testing on pull requests and pushes
- Building the application for verification
- Uploading build artifacts for debugging

## Render Advantages over Netlify

✅ **Better Free Tier:**
- 750 hours/month (vs Netlify's 300 minutes/month for builds)
- More generous bandwidth limits
- Better performance optimization

✅ **Enhanced Features:**
- Superior build caching (faster deployments)
- Better Git integration
- Automatic PR preview deployments
- Global CDN included
- More flexible environment configuration

## Environment Variables

If you need to set environment variables:

1. In Render dashboard: Your service → Environment
2. Add your variables:
   - `NODE_ENV=production`
   - `REACT_APP_API_KEY=your_key`
3. Changes auto-trigger redeployment

## Custom Domain

To use a custom domain:

1. In Render dashboard: Settings → Custom Domains
2. Add your domain (e.g., `trading.yourdomain.com`)
3. Configure DNS records as instructed
4. SSL certificate is automatically provisioned

## Monitoring & Features

- **Real-time logs:** Available in Render dashboard
- **GitHub Actions:** Test results in repository Actions tab
- **Deploy status:** Visible in GitHub and Render
- **Preview deployments:** Automatic for pull requests
- **Rollback capability:** Easy rollback to previous versions

## Troubleshooting

### Build Fails
- Check build logs in Render dashboard
- Verify `render.yaml` configuration
- Test `npm run build` locally
- Check Node.js version compatibility

### GitHub Actions Issues
- Review workflow logs in Actions tab
- Check test failures
- Verify Node.js version in workflow

### Site Not Loading
- Check deployment status in Render dashboard
- Verify routing rules in `render.yaml`
- Check browser console for errors

## Automatic Deployments

🚀 **Every push to `main` branch:**
- Triggers GitHub Actions (runs tests)
- Automatically deploys to Render
- Updates live site with zero downtime

🔄 **Pull Request Workflow:**
- GitHub Actions run tests
- Render creates preview deployment
- Review changes before merging

## Performance Benefits

- **Global CDN:** Built-in worldwide content delivery
- **HTTP/2 & HTTP/3:** Modern protocol support  
- **Brotli compression:** Better than gzip
- **Smart caching:** Optimized for React SPAs

## Support

For issues:
1. Check Render documentation
2. Review GitHub Actions logs  
3. Test deployment locally first
4. Use Render's excellent support chat

Your F&O Trading Platform will be available at: `https://fo-trading-platform-xxxx.onrender.com`

## Migration from Netlify

If migrating from Netlify:
1. All existing GitHub setup remains the same
2. Simply connect repository to Render instead
3. `render.yaml` replaces `netlify.toml` functionality
4. Better performance and more generous free tier