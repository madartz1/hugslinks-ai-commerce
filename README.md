# HUGSLinks AI Commerce — Netlify Starter

A deployable **demo**, not an operational dropshipping system. Separate from `hugslinks-updated`.

## Included
- Responsive HUGS Finds store: `public/index.html`
- Approval prototype: `public/admin.html`
- Example seeded product data: `data/products.json`
- Read-only Netlify Functions: `/.netlify/functions/products` and `/.netlify/functions/research-demo`
- Netlify config: `netlify.toml`

## Deploy
1. Create a **new** GitHub repository named `hugslinks-ai-commerce`.
2. Upload all project files **including `netlify.toml` and the `netlify/` folder to the repository root**.
3. Netlify > **Add new project > Import an existing project**, select the new repo.
4. Build command: leave blank. Publish directory: `public`. Functions directory: `netlify/functions` (already configured).
5. Deploy. Visit `/` for the storefront and `/admin.html` for the demo dashboard.

No API keys or Stripe variables are needed for this demo.

## Important limits
- The sample product prices, cost data, demand scores, and stock figures are fictional.
- Approval changes use browser `localStorage` only. They do **not** update the JSON file or API.
- `admin.html` is NOT protected by authentication. It must not be used for real supplier information or real admin actions.
- No real research, inventory sync, Stripe checkout, payments, or supplier ordering is implemented.
- Storefront has no functional checkout and cannot place an order.
- No direct AutoDS integration is claimed.

## Production next steps
1. Supabase Postgres tables for `product_candidates`, `products`, `supplier_variants`, `inventory_snapshots`, `orders`, `order_items`, `fulfillment_attempts`, `webhook_events`, and `audit_logs`.
2. Admin login with server-side authorization (not browser-only hiding).
3. Authorized product research feeds, terms-of-use-compliant photo sourcing and provenance.
4. Authenticated server-side admin approval API and publish/unpublish rules.
5. Supplier API validation, inventory & pricing sync, stale-stock purchase protection.
6. Stripe Checkout in Netlify Functions, verified webhooks, deduplication/idempotent fulfillment and refund handling.
7. Real order tests in sandbox, then controlled live rollout.

Never commit API secrets to your GitHub repository.
