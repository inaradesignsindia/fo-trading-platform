# Deployment Guide: F&O Trading Platform to Netlify

## Prerequisites
- GitHub account
- Netlify account (free tier available)
- Node.js 18+ installed locally

## Step 1: Push to GitHub

1. Create a new repository on GitHub:
   - Go to https://github.com/new
   - Repository name: `fo-trading-platform` (or your preferred name)
   - Make it Public or Private as needed
   - Do NOT initialize with README (we already have one)

2. Add GitHub as remote and push:
```bash
cd c:\Users\anees\Desktop\NuralML_Dev
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Step 2: Connect to Netlify

### Method 1: Netlify Dashboard (Recommended)

1. Log in to [Netlify](https://app.netlify.com)
2. Click "New site from Git"
3. Choose GitHub and authorize Netlify access
4. Select your `fo-trading-platform` repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `build`
   - **Branch**: `main`
6. Click "Deploy site"

### Method 2: Netlify CLI

1. Install Netlify CLI globally:
```bash
npm install -g netlify-cli
```

2. Login to Netlify:
```bash
netlify login
```

3. Link your project to a new Netlify site:
```bash
netlify init
```

4. Deploy to production:
```bash
npm run build
netlify deploy --prod --dir=build
```

## Step 3: Configure GitHub Actions CI/CD (Optional)

To enable automatic deployments when you push to GitHub:

1. In your Netlify dashboard, go to:
   - Site settings → Build & deploy → Environment variables

2. Add these environment variables:
   - `NETLIFY_AUTH_TOKEN`: Get from https://app.netlify.com/user/applications/personal
   - `NETLIFY_SITE_ID`: Found in Site settings → General → Site information

3. In your GitHub repository, go to:
   - Settings → Secrets and variables → Actions

4. Add repository secrets:
   - `NETLIFY_AUTH_TOKEN`: (value from step 2)
   - `NETLIFY_SITE_ID`: (value from step 2)

Now every push to the `main` branch will automatically build and deploy your site!

## Step 4: Custom Domain (Optional)

1. In Netlify dashboard: Site settings → Domain management
2. Add custom domain
3. Follow DNS configuration instructions
4. Enable HTTPS (automatic with Let's Encrypt)

## Step 5: Environment Variables

For production environment variables:

1. In Netlify dashboard: Site settings → Environment variables
2. Add your production environment variables:
   - `REACT_APP_API_URL`
   - `REACT_APP_WEBSOCKET_URL`
   - Any other environment-specific variables

## Quick Commands Reference

```bash
# Local development
npm start

# Build for production
npm run build

# Run tests
npm test

# Deploy manually (after netlify CLI setup)
netlify deploy --prod --dir=build

# Check deployment status
netlify status
```

## Troubleshooting

### Build Fails
- Check that all dependencies are in `package.json`
- Verify Node.js version compatibility (18+)
- Check for syntax errors in your React code

### Deploy Succeeds but Site Shows Errors
- Check browser console for JavaScript errors
- Verify all relative paths are correct
- Check that environment variables are set in Netlify

### 404 on Page Refresh
- Ensure `netlify.toml` has the redirect rule (already included)
- This handles SPA routing for React Router

## Production Checklist

- [ ] All environment variables configured
- [ ] Custom domain configured (if needed)
- [ ] HTTPS enabled
- [ ] Build pipeline working
- [ ] Tests passing
- [ ] Performance optimization done
- [ ] Security headers configured (included in netlify.toml)

## Live Site

After deployment, your trading platform will be available at:
- Default: `https://YOUR_SITE_NAME.netlify.app`
- Custom domain: `https://yourdomain.com`

The site will automatically deploy on every push to the main branch!