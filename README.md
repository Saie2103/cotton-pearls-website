# Cotton Pearls — Storefront

Custom Next.js storefront for Cotton Pearls, reading products/inventory
straight from Shopify via the Storefront API. Shopify stays the system of
record for products, orders, and stock — this app is purely the customer-facing
layer.

## What's built in this pass

- Project scaffold: Next.js 14 (App Router) + TypeScript + Tailwind, with the
  brand's color/type tokens encoded in `tailwind.config.ts`.
- Shopify Storefront API client + typed GraphQL queries (`lib/shopify/`).
- **Homepage** (`app/page.tsx`): hero drop section, dynamic collection grid,
  Shop the Look section (UI ready, needs an Instagram feed wired in — see below).
- **PLP** (`app/collections/[handle]/page.tsx`): server-rendered, URL-driven
  filters (category/size/fabric/price), sorting, "Load More" pagination,
  "Only X Left" stock badges.
- Sticky announcement bar + header + slide-out AJAX cart drawer with a free
  shipping milestone bar (UI complete; cart mutations still need wiring —
  see below).

## What's NOT built yet (next passes)

- **PDP** (product detail page) — image gallery, variant swatches, sizing
  guide modal, COD pincode checker, accordions.
- **Cart API wiring** — the drawer UI is done, but `cartCreate` /
  `cartLinesAdd` / `cartLinesUpdate` mutations aren't connected yet. Tell me
  when you want this and I'll wire it with a `CartContext` provider.
- **Checkout handoff** — once cart is wired, checkout is just a redirect to
  the `checkoutUrl` Shopify's Cart API returns (this is where Razorpay/COD
  actually run, inside Shopify's own checkout).
- **OTP phone login** — handled by a Shopify Customer Accounts app, not
  custom code; needs to be enabled in Shopify Admin.
- Footer, account pages, search.

## 1. Shopify setup (do this first)

1. In **Shopify Admin → Settings → Apps and sales channels → Develop apps**,
   create a custom app and enable **Storefront API** access. Copy the
   Storefront API access token.
2. Create these **collections** in Shopify Admin (handles matter — the code
   references them directly):
   - `new-drop` — used for the homepage hero. Add products here weekly.
   - `kurtis`, `coord-sets`, `suits` — your three core categories.
3. For filters to work (Size, Fabric, Price), make sure:
   - **Size** and **Color** are set up as real product **options** (Shopify
     Admin → product → Variants), not just tags.
   - Add a **Fabric** metafield or use tags like `fabric:cotton-mulmul` —
     Shopify auto-generates filters from options, and from tags/metafields
     you mark as filterable in **Settings → Filters**, if you're on a plan
     with Search & Discovery.
4. Install these Shopify Apps from the App Store (native integrations, no
   custom code needed):
   - **Razorpay** (payment gateway)
   - **Shiprocket** (shipping + WhatsApp tracking)

## 2. Run the project locally

```bash
npm install
cp .env.example .env.local
# then fill in SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN
npm run dev
```

Visit `http://localhost:3000`.

## 3. Swapping in Clash Display (optional)

The brief allows **Syne** or **Clash Display** for headings. Syne is wired up
by default because it's on Google Fonts and works with zero setup. Clash
Display is a Fontshare font and needs self-hosting:

1. Download the woff2 files from fontshare.com/fonts/clash-display.
2. Place them in `public/fonts/`.
3. In `app/layout.tsx`, replace the `Syne` import with `next/font/local`
   pointing at those files, keeping the `variable: "--font-display"` name
   the same — nothing else in the codebase needs to change.

## 4. Wiring Shop the Look

Two realistic options, in order of effort:

- **Simplest**: manually update the `PLACEHOLDER_LOOKS` array in
  `components/home/ShopTheLook.tsx` with image URLs + linked product handles
  each week, alongside your Friday drop.
- **Automated**: connect a service like Foursixty or Taggbox (both have
  Shopify apps) that pulls tagged Instagram posts automatically — ask me to
  wire the embed once you've picked one.

## 5. Deployment

This is a standard Next.js app — deploys cleanly to **Vercel** (recommended,
same team that builds Next.js) with zero config. Push this folder to a GitHub
repo, import it in Vercel, and add the two env vars from `.env.local` in the
Vercel project settings.

## Project structure

```
cotton-pearls/
├── app/
│   ├── layout.tsx              # fonts, header, announcement bar
│   ├── page.tsx                 # homepage
│   ├── globals.css              # brand tokens as CSS/Tailwind
│   └── collections/[handle]/
│       └── page.tsx             # PLP
├── components/
│   ├── layout/                  # AnnouncementBar, Header, CartDrawer
│   ├── home/                    # Hero, CollectionGrid, ShopTheLook
│   ├── plp/                     # ProductCard, ProductGrid, FilterSidebar, SortDropdown
│   └── ui/                      # StockBadge
├── lib/
│   ├── shopify/
│   │   ├── client.ts             # Storefront API GraphQL client
│   │   ├── queries.ts            # all GraphQL queries live here
│   │   ├── index.ts              # typed fetch functions
│   │   ├── actions.ts            # server action for PLP "Load More"
│   │   └── types.ts              # shared TS types + stock-status logic
│   └── format.ts                 # INR currency formatting
├── .env.example
└── tailwind.config.ts            # brand color/type tokens
```
