# Vercel Deployment Guide

## Overview
This is a frontend-only React application. The backend has been removed as all data collection is now handled by Tally forms.

## Pre-Deployment Checklist
✅ Backend removed (admin dashboard and APIs no longer needed)
✅ All API calls removed from frontend
✅ Tally forms integrated for:
   - Waitlist collection (Form ID: VLElMM)
   - Checkout shipping information (Form ID: 7RlDV0)
✅ Build tested successfully
✅ vercel.json configured for SPA routing

## Deployment Instructions

### Option 1: Deploy via Vercel CLI
1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Navigate to frontend directory:
   ```bash
   cd /app/frontend
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Follow the prompts:
   - Set project name
   - Confirm framework preset: Create React App
   - Confirm build settings (defaults should work)

### Option 2: Deploy via Vercel Dashboard
1. Go to https://vercel.com/new
2. Import your Git repository
3. Set the following:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `yarn build`
   - **Output Directory**: `build`

### Option 3: Deploy from GitHub
1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will auto-detect settings and deploy

## Build Configuration
The app uses the following build setup:
- **Package Manager**: Yarn
- **Build Command**: `yarn build` (uses CRACO)
- **Output Directory**: `build`
- **Framework**: Create React App with CRACO

## Environment Variables
No environment variables are required for production deployment. The app is fully static.

## Important Notes
- All routes are handled client-side (SPA routing via React Router)
- The `vercel.json` file ensures all routes redirect to `index.html`
- Data collection is handled externally by Tally
- No backend or database required

## Troubleshooting

### 404 Errors on Routes
If you see 404 errors when accessing routes directly (e.g., `/store`), ensure `vercel.json` is present in the frontend directory with proper rewrite rules.

### Build Fails
- Ensure all dependencies are installed: `yarn install`
- Check Node.js version (should be 16.x or higher)
- Review build logs for specific errors

## Testing Locally
To test the production build locally:
```bash
cd /app/frontend
yarn build
npx serve -s build
```

Then visit http://localhost:3000

## Post-Deployment Verification
After deployment, test the following:
1. ✅ Landing page loads
2. ✅ Password entry works (navigates to store)
3. ✅ Store products display
4. ✅ Add to cart functionality
5. ✅ Cart page works
6. ✅ Checkout page (Tally form loads)
7. ✅ Confirmation page displays
8. ✅ Waitlist button opens Tally popup

## Data Collection
All form submissions are now handled by Tally:
- **Waitlist Data**: Access via Tally dashboard (Form VLElMM)
- **Order Data**: Access via Tally dashboard (Form 7RlDV0)

No admin dashboard needed - all data is managed directly in Tally.
