# HUGSLinks LUXE — print supplier readiness

Current status: all supplier prices and SKUs UNVERIFIED. No real ordering.

## Request identical supplier quotes
Get all-in USD production cost and domestic shipping to NYC (ZIP 10001) for each configuration in data/luxe-print-variants.json. Ask both FinerWorks and theprintspace for material specs, turnaround, shipping, damage policy, and actual API SKU/options.

## Approval requirements
1. Swan's authorization for sale/reproduction of existing work and adoption of Golden Reflections documented.
2. Actual archival-size master file; currently displayed JPG is a web preview and must not automatically be used as press-ready artwork.
3. Real production + shipping + taxes/handling (if any) confirmed from a supplier response.
4. Sample physical print evaluated for color, frame, packaging and quality.
5. Authenticated admin, supplier API sandbox test, verified Stripe webhook, idempotent ordering, fulfillment tracking and refunds.

## Economics
For LUXE owned/adopted collections there is no *automatic third-party marketplace royalty split* in site calculations; underlying artist-rights agreements still govern. Contribution = retail - supplier printing - supplier freight - processor fee - damage reserve - any other variable costs. Do not advertise a projected margin as net profit.

## Frontend
/luxe/rooms.html now has independent per-room selectors and uses the verified Golden Reflections local image. Others remain explicit placeholders.
