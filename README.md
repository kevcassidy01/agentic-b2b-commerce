# The Conversational Storefront

A Coca-Cola-inspired, unofficial B2B commerce concept for a convenience-store owner. Three interactive steel threads: new-store assortment and negotiated quote; manager-to-owner agent approvals; learned replenishment and recurring auto-orders.

The conversation is the primary UI. Agent-to-agent exchanges, quotes, approvals, and schedules appear inline. Use the journey selector and action buttons; View storyboard reveals the narrative.

## Expanded Storefront

Category navigation opens full catalog pages with brand, sugar, packaging, size, availability and case-price facets, removable filters, search and sorting. Product cards offer quick case ordering, RFQ and links to multi-format product details. Product detail pages include assortment grids, line totals, suggested quantities, stock limits and related products. The catalog contains ten fictional product families and 38 formats.

Quick orders save a demo cart in this browser's local storage. My Cart supports reviewing and removing draft lines. RFQs are session-only simulations; no requests are sent. The purchasing approval link opens the separate scripted storyline, not an approval flow for the actual catalog basket.

## Run

Open `.agents/artifacts/index.html` in a browser, or serve `.agents/artifacts/` with any static web server. No dependencies, credentials or build step required.

## Limitations

All products, prices, local sales insights, accounts, approvals, and agent exchanges are simulated. No Coca-Cola data or services are connected. No real purchases or scheduled jobs execute. State is session-local and resets when switching journeys or refreshing. Text entry is limited to scripted actions; buttons are the authoritative demo path. Not affiliated with or endorsed by The Coca-Cola Company.

## Publishing

GitHub Pages serves the root of the `gh-pages` branch. Publish the latest artifacts after committing changes on `main`:

```sh
git subtree split --prefix=.agents/artifacts -b site-publish-next
git push origin site-publish-next:gh-pages
```

Use a fresh temporary branch name for each publish. Source files remain on `main`; `gh-pages` contains only the static website.
