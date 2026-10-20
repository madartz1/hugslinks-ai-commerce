# LUXE Gallery — Phase 1
This gallery lives at /luxe/ inside the separate hugslinks-ai-commerce repository.
The original https://hugslinks.com/luxe-collection has **not** been modified.

## Collections
- Swan the Artist: supplied/authorized Swan catalog only.
- HUGS AI Creations: selected artwork generated and commercially licensed by HUGSLinks.
- Community art voting/gallery is a separate future system; its proposed artist 60% / HUGSLinks 40% contribution split does not apply to this launch gallery.

## Why purchasing is disabled
No genuine artwork catalog, high-resolution source files, supplier price quote, approved print SKUs, verified printer API credentials or tested ordering workflow have been provided.
The placeholders are clearly labeled and cannot be bought. Do not hardcode presumed production prices as actual products.

## Planned product model
artworks: artwork_id, collection, artist, title, description, rights_attestation, archival_master_asset, web_preview_asset, approved.
variants: artwork_id, printer_id, printer_sku, size, medium, frame, production_cost, shipping_cost, currency, retail_price, active.
orders: internal_order_id, stripe_session_id, payment_status, fulfillment_state, printer_order_id, tracking.
A secure server-side admin is mandatory before allowing any upload or approval mutation.

## Economics
For Swan and HUGS-owned AI collections, no third-party artist revenue split in the site pricing model; respect underlying ownership/licensing agreements.
Calculate contribution as: retail - supplier production - shipping - processing - reserves.
Print vendor paid separately; never enable automated orders until tested and approved.

## Next integration steps
1. Import authorized Swan catalog and HUGS AI assets (web previews separate from high-res masters).
2. Add mockups to each artwork detail with sizes, stretched canvas and floating frames.
3. Receive written quotes and confirm API with FinerWorks/theprintspace.
4. Implement authenticated admin and durable database.
5. Stripe sandbox checkout -> verified webhook -> idempotent supplier order -> tracking and exceptions.
6. Link gallery from the main site only after review.
