# GitHub Repository Setup & Netlify Deployment

## Step 1: Create GitHub Repository

1. **Go to GitHub.com** and sign in to your account
2. **Click "New repository"** (green button)
3. **Repository Settings:**
   - Repository name: `fo-trading-platform`
   - Description: `F&O Trading Platform - React Web Application`
   - Set to **Public** (required for free Netlify deployment)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)

4. **Copy the repository URL** (should look like: `https://github.com/yourusername/fo-trading-platform.git`)

## Step 2: Connect Local Project to GitHub

Run these commands in PowerShell:

```powershell
# Navigate to project directory
Set-Location "c:\Users\anees\Desktop\NuralML_Dev"

# Add GitHub remote (replace with your actual GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/fo-trading-platform.git

# Rename branch to main (modern standard)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 3: Deploy to Netlify

1. **Go to [netlify.com](https://netlify.com)** and sign up/sign in
2. **Click "Add new site" → "Import an existing project"**
3. **Connect to Git provider:** Select "GitHub"
4. **Authorize Netlify** to access your GitHub repositories
5. **Select your repository:** `fo-trading-platform`
6. **Deploy settings:**
   - Branch to deploy: `main`
   - Build command: `npm run build`
   - Publish directory: `build`
   - **Click "Deploy site"**

## Step 4: Configure Custom Domain (Optional)

1. **In Netlify dashboard:** Go to Site settings → Domain management
2. **Add custom domain** or use the provided `.netlify.app` subdomain
3. **Enable HTTPS** (automatic with Netlify)

## Step 5: Verify GitHub Actions CI/CD

After pushing to GitHub:

1. **Go to your GitHub repository**
2. **Click "Actions" tab**
3. **Verify the workflow runs automatically** on each push
4. **Check workflow status** - should show green checkmarks

## Environment Variables (If Needed)

If your app requires environment variables:

1. **In Netlify:** Site settings → Environment variables
2. **Add variables:**
   - `REACT_APP_API_URL=your_api_url`
   - `REACT_APP_BROKER_KEY=your_key`

## Automatic Deployments

✅ **Configured GitHub Actions will:**
- Run tests on every push
- Build the application
- Deploy to Netlify automatically
- Send notifications on deployment status

## Your Live Site

After deployment completes:
- **Site URL:** `https://your-site-name.netlify.app`
- **Custom domain:** (if configured)
- **SSL Certificate:** Automatically provisioned

## Troubleshooting

**Build fails?**
- Check the build logs in Netlify
- Verify all dependencies in `package.json`
- Ensure `npm run build` works locally

**GitHub Actions failing?**
- Check Actions tab in GitHub
- Verify `NETLIFY_AUTH_TOKEN` and `NETLIFY_SITE_ID` secrets are set

**Want to update the site?**
- Just push changes to the `main` branch
- Netlify will automatically rebuild and deploy