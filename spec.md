# SKR Haven

## Current State
New project. Empty backend and no frontend UI yet.

## Requested Changes (Diff)

### Add
- Full daily-essentials e-commerce storefront called "SKR Haven"
- Product catalog with categories: Groceries, Household, Personal Care, Pet Care, Electronics
- Product browsing with search, category filtering
- Product cards with name, price, image, rating, add-to-cart
- Shopping cart (client-side state)
- Hero section with CTA
- Featured Categories, Trending Now, Weekly Deals, Bestsellers sections
- Newsletter subscription band
- Footer with links and branding
- Sample products for each category including pet care items

### Modify
- N/A (new project)

### Remove
- N/A

## Implementation Plan
1. Backend: Products actor with catalog data (name, price, category, rating, description), getProducts, getProductsByCategory, searchProducts queries
2. Frontend: Full SKR Haven UI matching design preview — header with nav/search/cart, hero, category tiles, product grids, newsletter, footer
3. Cart state managed client-side in React
4. Sample data seeded in backend with ~30 products across all categories including pet care
