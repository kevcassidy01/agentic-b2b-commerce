# The Conversational Storefront

A Coca-Cola-inspired, unofficial B2B commerce concept for a convenience-store owner. Three interactive steel threads: new-store assortment and negotiated quote; manager-to-owner agent approvals; learned replenishment and recurring auto-orders.

The conversation is the primary UI. Agent-to-agent exchanges, quotes, approvals, and schedules appear inline. Use the journey selector and action buttons; View storyboard reveals the narrative.

## Run

Open `.agents/artifacts/index.html` in a browser, or serve `.agents/artifacts/` with any static web server. No dependencies, credentials or build step required.

## Limitations

All products, prices, local sales insights, accounts, approvals, and agent exchanges are simulated. No Coca-Cola data or services are connected. No real purchases or scheduled jobs execute. State is session-local and resets when switching journeys or refreshing. Text entry is limited to scripted actions; buttons are the authoritative demo path. Not affiliated with or endorsed by The Coca-Cola Company.

## Publishing

GitHub Actions publishes `.agents/artifacts/` to GitHub Pages on pushes to `main`. Enable GitHub Pages with GitHub Actions as the source.
