# FinerWorks integration checklist

Official documentation: https://v2.api.finerworks.com/Documentation

## FinerWorks account
1. Sign up or log in and complete the business profile and billing profile.
2. Generate your web_api_key and app_key in the FinerWorks account.
3. Keep the app key in FinerWorks **test mode** for development.
4. Get a real SKU for a print product to use with get_product_details.

## Netlify environment variables
Add to the NEW HUGSLinks commerce Netlify site, scoped to Functions:
- FINERWORKS_WEB_API_KEY
- FINERWORKS_APP_KEY
- FINERWORKS_TEST_SKU
- HUGS_COMMERCE_ADMIN_TEST_TOKEN (long, randomly generated secret)

Never put secrets in this repository, in a public webpage, or into a chat message.
Redeploy after setting environment variables.

## Private diagnostic
POST /.netlify/functions/finerworks-connection
Send header x-hugs-admin-test-token containing your secret test token.
This endpoint calls the read-only v2 get_product_details route and returns minimal connection status.
Do not expose the token in browser code. It is for private testing only.

## Not yet enabled
No supplier orders, customer payments, quote/price sync, production file uploads or live checkout.
Before those, validate actual product codes, master files, sample quality, shipping rates, admin authentication and Stripe webhooks. Use supplier test mode for the complete order flow before any real orders.
