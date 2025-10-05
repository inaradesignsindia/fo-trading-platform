# Render Deployment Setup & GitHub CI/CD

## Step 1: Create GitHub Repository

1. **Go to GitHub.com** and sign in to your account
2. **Click "New repository"** (green button)
3. **Repository Settings:**
   - Repository name: `fo-trading-platform`
   - Description: `F&O Trading Platform - React Web Application`
   - Set to **Public** or **Private** (both work with Render)
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

## Step 3: Deploy to Render

1. **Go to [render.com](https://render.com)** and sign up/sign in
2. **Click "New +" → "Static Site"**
3. **Connect to Git provider:** Select "GitHub"
4. **Authorize Render** to access your GitHub repositories
5. **Select your repository:** `fo-trading-platform`

## Step 4: Configure Render Deployment Settings

**Render will automatically detect your `render.yaml` file, but you can also configure manually:**

### Manual Configuration (if needed):

- **Name:** `fo-trading-platform`
- **Branch:** `main`
- **Root Directory:** ` ` (leave blank)
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `build`

### Advanced Settings:

- **Auto Deploy:** `Yes` (deploys automatically on GitHub pushes)
- **Pull Request Previews:** `Enabled` (optional)

## Step 5: Environment Variables (Optional)

If your app requires environment variables:

1. **In Render Dashboard:** Go to your service → Environment
2. **Add variables:**
   - `NODE_ENV=production`
   - `REACT_APP_API_URL=your_api_url` (if needed)
   - `REACT_APP_VERSION=1.0.0`

## Step 6: Custom Domain (Optional)

1. **In Render Dashboard:** Go to Settings → Custom Domains
2. **Add your domain** (e.g., `trading.yourdomain.com`)
3. **Follow DNS configuration** instructions
4. **SSL Certificate** is automatically provisioned

## Automatic Deployments

✅ **Configured GitHub Actions will:**

- Run tests on every push and PR
- Build the application to verify it compiles
- Upload build artifacts for debugging
- Provide status updates on PRs

✅ **Render will automatically:**

- Deploy on every push to `main` branch
- Create preview deployments for PRs (if enabled)
- Provide deployment status and logs
- Handle SSL certificates and CDN

## Your Live Site

After deployment completes:

- **Site URL:** `https://fo-trading-platform-xxxx.onrender.com`
- **Custom domain:** (if configured)
- **SSL Certificate:** Automatically provisioned
- **Global CDN:** Built-in for fast worldwide access

## Render vs Netlify Advantages

✅ **Render Benefits:**

- **Better performance** for React apps
- **More generous free tier** (750 hours/month)
- **Integrated backend services** (if you need APIs later)
- **Better Git integration** (automatic deploys, PR previews)
- **Superior build caching** (faster deployments)
- **More flexible environment configuration**

## Troubleshooting

**Build fails on Render?**

- Check the build logs in Render dashboard
- Verify `package.json` has correct dependencies
- Ensure `npm run build` works locally
- Check the `render.yaml` configuration

**GitHub Actions failing?**

- Check Actions tab in GitHub repository
- Verify Node.js version compatibility
- Review test failures in the workflow logs

**Want to update the site?**

- Push changes to the `main` branch
- Render will automatically rebuild and deploy
- Check deployment progress in Render dashboard

## Deployment Status

You can monitor deployments:

- **Render Dashboard:** Real-time build and deploy logs
- **GitHub Actions:** Test results and build verification
- **GitHub Repository:** Deployment status badges

## Advanced Features

**Preview Deployments:**

- Every PR can get its own preview URL
- Perfect for reviewing changes before merging
- Automatically updated when PR is updated

**Rollback Capability:**

- Easy rollback to previous deployments
- Zero-downtime deployments
- Deployment history and logs
