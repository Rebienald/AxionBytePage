# Vercel Web Analytics Setup Guide for AxionByte

This guide explains how Vercel Web Analytics has been integrated into the AxionByte project and how to enable it.

## What is Vercel Web Analytics?

Vercel Web Analytics is a privacy-first analytics solution that tracks visitor data and page views on your website without requiring external cookies or identifying information.

## Current Implementation

The AxionByte project uses the **HTML implementation** of Vercel Web Analytics, which is suitable for static HTML/CSS/JavaScript projects.

### Implementation Details

The analytics script has been added to the `<head>` section of `index.html`:

```html
<!-- Vercel Web Analytics -->
<script>
    window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
</script>
<script defer src="/_vercel/insights/script.js"></script>
```

**Key Points:**
- The first script creates a queue for analytics events that might fire before the main script loads
- The second script (deferred) loads the actual analytics tracking script
- No npm package installation is required for this approach
- This implementation works directly with Vercel's infrastructure when deployed

## Prerequisites

To use Vercel Web Analytics with this project, you need:

1. **A Vercel Account** - [Sign up for free](https://vercel.com/signup) if you don't have one
2. **A Vercel Project** - [Create a new project](https://vercel.com/new) or connect your existing GitHub repository
3. **Vercel CLI (Optional)** - For local testing and deployment:
   ```bash
   npm install -g vercel
   ```

## Enabling Web Analytics

### Step 1: Enable in Vercel Dashboard

1. Go to the [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your AxionByte project
3. Click the **Analytics** tab
4. Click **Enable** to activate Web Analytics

> **Note:** Enabling Web Analytics will add new routes (`/_vercel/insights/*`) after your next deployment.

### Step 2: Deploy Your Project

Deploy your project to Vercel using one of these methods:

**Option A: Using Git Integration (Recommended)**
1. Connect your GitHub repository to Vercel
2. Push changes to your `main` branch
3. Vercel automatically deploys your latest commits

**Option B: Using Vercel CLI**
```bash
vercel deploy
```

## Verifying the Implementation

Once deployed, you can verify that analytics is working:

1. Visit your deployed website
2. Open your browser's **Network** tab (F12 → Network)
3. Look for requests to `/_vercel/insights/view`
4. You should see successful requests (200 status)

## Viewing Your Analytics Data

After deployment and once users have visited your site:

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your AxionByte project
3. Click the **Analytics** tab
4. View your visitor analytics and page view data

> **Note:** It may take a few hours for initial data to appear in the dashboard.

## Custom Events (Pro/Enterprise Plans)

Users on Pro and Enterprise Vercel plans can track custom events like button clicks or form submissions. To learn more, see the [Custom Events Documentation](/docs/analytics/custom-events).

## Troubleshooting

### Analytics Data Not Showing

If you don't see any analytics data:

1. **Check deployment status** - Ensure your project is deployed to Vercel
2. **Wait for data collection** - Initial data may take several hours to appear
3. **Verify network requests** - Check browser Network tab for `/_vercel/insights/view` requests
4. **Check Vercel Analytics is enabled** - Confirm it's enabled in the project settings

### Script Not Loading

If the analytics script isn't loading:

1. Open browser DevTools Console (F12)
2. Check for any CORS or script loading errors
3. Ensure you're accessing the deployed Vercel URL (not localhost)
4. Verify the domain is correctly configured in Vercel

## Additional Resources

- [Vercel Analytics Documentation](https://vercel.com/docs/analytics)
- [Privacy & Compliance](https://vercel.com/docs/analytics/privacy-policy)
- [Filtering Data](https://vercel.com/docs/analytics/filtering)
- [Custom Events](https://vercel.com/docs/analytics/custom-events)
- [Pricing & Limits](https://vercel.com/docs/analytics/limits-and-pricing)

## Next Steps

1. Enable Web Analytics in your Vercel project dashboard
2. Deploy your project to Vercel
3. Monitor your analytics data in the dashboard
4. Consider upgrading to Pro plan if you need custom event tracking
