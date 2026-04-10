# WonderKids Next.js Rebuild — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild WonderKids as a Next.js 15 app with animated playground aesthetic, ToysRUs-inspired navigation (Shop by Category/Age/Brand + Play), expanded 100+ product catalog, cartoon bear mascot, and all prices in INR.

**Architecture:** Next.js 15 App Router with Server Components for SEO, Client Components for interactivity. Data layer is static JS (no database). Framer Motion for all animations. Tailwind CSS 4 for styling. Images generated via nanobanana2.

**Tech Stack:** Next.js 15, React 19, Tailwind CSS 4, Framer Motion, Lucide React, Vercel deployment

---

## Phase 1: Project Scaffolding & Foundation

### Task 1.1: Initialize Next.js 15 Project

**Files:**
- Create: `next-app/` (entire new directory)

**Step 1: Create Next.js app**

```bash
cd "/Users/abhijeeth/Documents/Children toys website"
npx create-next-app@latest next-app --app --tailwind --eslint --src-dir --import-alias "@/*" --no-turbopack --yes
```

**Step 2: Install dependencies**

```bash
cd next-app
npm install framer-motion lucide-react
```

**Step 3: Verify it runs**

```bash
npm run dev
```
Expected: App running on localhost:3000

**Step 4: Commit**

```bash
git add next-app/
git commit -m "feat: scaffold Next.js 15 project with Tailwind, Framer Motion, Lucide"
```

---

### Task 1.2: Configure Tailwind Theme & Global Styles

**Files:**
- Modify: `next-app/src/app/globals.css`
- Modify: `next-app/tailwind.config.ts` (or `next-app/src/app/layout.tsx` for Tailwind v4)

**Step 1: Set up color tokens, fonts, and base styles**

Configure the Tailwind theme with our design system:
- Colors: primary (#FF6B6B), secondary (#4ECDC4), accent-yellow (#FFE66D), accent-purple (#A78BFA), accent-green (#34D399), dark (#1A1A2E), body (#636E72), cream (#FFFBF5), border (#F0E6D3)
- Fonts: Nunito (headings), Inter (body), Baloo 2 (accent)
- Border radius tokens: card (16px), pill (9999px), container (24px)
- Shadow tokens: soft, medium, heavy

**Step 2: Add Google Fonts in layout.tsx**

Import Nunito, Inter, and Baloo_2 from `next/font/google`. Apply Inter as body default, expose Nunito and Baloo_2 as CSS variables.

**Step 3: Set global styles**

In `globals.css`:
- Set `body` background to `#FFFBF5`
- Add `hide-scrollbar` utility class
- Add floating animation keyframes (`float`, `drift`, `bounce-subtle`)
- Add shimmer/skeleton loading animation

**Step 4: Verify** — restart dev server, confirm cream background and fonts load.

**Step 5: Commit**

```bash
git commit -m "feat: configure Tailwind theme with WonderKids design tokens and fonts"
```

---

### Task 1.3: Create Data Layer — Products, Categories, Brands, Ages

**Files:**
- Create: `next-app/src/data/categories.ts`
- Create: `next-app/src/data/products.ts`
- Create: `next-app/src/data/brands.ts`
- Create: `next-app/src/data/ages.ts`
- Create: `next-app/src/data/activities.ts`
- Create: `next-app/src/lib/utils.ts`

**Step 1: Create categories data**

13 categories with fields: `id`, `name`, `slug`, `icon` (Lucide icon name), `color`, `gradient`, `image` (path for nanobanana2 image), `subcategories[]`, `productCount`.

Categories: Action Figures & Playsets, Arts & Crafts, Baby & Toddler, Building & Construction, Dolls & Accessories, Games & Puzzles, Learning & STEM, Outdoor & Sports, Pretend Play, Vehicles & RC, Electronics & Gadgets, Party & Celebrations, Kids Clothing.

**Step 2: Create products data**

Expand to ~100 products spread across all 13 categories (~7-8 per category). Each product has: `id`, `slug`, `categoryId`, `name`, `description`, `price` (INR), `originalPrice`, `rating`, `reviewCount`, `image`, `discount`, `badge`, `brand`, `ageRange`, `highlights[]`, `benefits[]`, `safety[]`, `tags[]`.

Port the existing 30 products from `react-app/src/data/products.js` and add ~70 new ones.

**Step 3: Create brands data**

14 brands: LEGO, Hot Wheels, Barbie, Disney, Marvel, Funskool, Toyshine, R for Rabbit, Fisher-Price, Nerf, Pokemon, Hasbro, Mattel, Chicco. Each has: `id`, `slug`, `name`, `logo` (image path), `description`, `color`.

**Step 4: Create ages data**

5 age groups: 0-2 (Tiny Explorers), 3-5 (Little Adventurers), 6-8 (Big Dreamers), 9-12 (Super Builders), 13+ (Teen Creators). Each has: `id`, `slug`, `label`, `subtitle`, `ageRange`, `image`, `color`.

**Step 5: Create activities data**

~15 play activities across 5 types: DIY Crafts, Toy Demos, Printables, Mini Games, Learning Corner. Each has: `id`, `slug`, `title`, `type`, `ageRange`, `difficulty`, `duration`, `image`, `description`.

**Step 6: Create utility functions**

In `lib/utils.ts`: `getProductsByCategory()`, `getProductsByBrand()`, `getProductsByAge()`, `getProductBySlug()`, `getCategoryBySlug()`, `getBrandBySlug()`, `getFeaturedProducts()`, `getNewArrivals()`, `getTrendingProducts()`, `formatPrice()` (formats number as "₹X,XXX"), `cn()` (Tailwind class merge helper).

**Step 7: Commit**

```bash
git commit -m "feat: create expanded data layer with 100+ products, 13 categories, brands, ages, activities"
```

---

### Task 1.4: Create Store Context (Cart + Wishlist)

**Files:**
- Create: `next-app/src/context/StoreContext.tsx`
- Create: `next-app/src/context/StoreProvider.tsx`

**Step 1: Create StoreContext**

Port and upgrade from `react-app/src/context/StoreContext.jsx`:
- Same API: `cart`, `wishlist`, `addToCart`, `removeFromCart`, `updateQty`, `toggleWishlist`, `isWishlisted`, `getCartTotal`, `getCartCount`, `showToast`
- Add: `getWishlistCount()`, `clearCart()`, `toast` state
- localStorage persistence for cart and wishlist
- Must be a Client Component ("use client")

**Step 2: Create StoreProvider wrapper**

Client Component that wraps children in StoreContext.Provider.

**Step 3: Wire into root layout**

In `next-app/src/app/layout.tsx`, wrap `{children}` with `<StoreProvider>`.

**Step 4: Commit**

```bash
git commit -m "feat: add StoreContext with cart, wishlist, and toast state management"
```

---

## Phase 2: Layout Shell — Header, Footer, Navigation

### Task 2.1: Promotional Top Bar

**Files:**
- Create: `next-app/src/components/layout/PromoBar.tsx`

**Step 1: Build PromoBar component**

Client Component with auto-scrolling promotional messages:
- Messages: "Free Shipping on Orders Over ₹999", "100% Safe & Certified Toys", "2-Day Delivery Across India", "Easy 7-Day Returns"
- Candy gradient background (warm coral → yellow → teal)
- Subtle floating star particles (CSS pseudo-elements with `float` animation)
- Auto-rotate messages every 4 seconds with Framer Motion `AnimatePresence` fade transition
- Height: 36px, small text, centered

**Step 2: Commit**

```bash
git commit -m "feat: add animated promotional top bar with rotating messages"
```

---

### Task 2.2: Desktop Header with Mega Menu

**Files:**
- Create: `next-app/src/components/layout/Header.tsx`
- Create: `next-app/src/components/layout/MegaMenu.tsx`
- Create: `next-app/src/components/layout/SearchBar.tsx`

**Step 1: Build Header**

Client Component:
- Sticky top (below PromoBar), glassmorphism background (blur + translucent cream)
- Left: Mascot logo (cartoon bear emoji placeholder until nanobanana2 image) + "WonderKids" wordmark in Nunito extrabold, "Kids" in coral
- Center (desktop only): 4 mega menu triggers — "Shop by Category", "Shop by Age", "Shop by Brand", "Play". Each is a button that opens its mega menu panel on hover/click
- Right: SearchBar component, Wishlist icon (Heart from Lucide, with count badge), Cart icon (ShoppingCart from Lucide, with count badge + Framer Motion spring bounce on count change), Hamburger (mobile only)

**Step 2: Build MegaMenu**

Client Component that receives `activeMenu` prop:
- Full-width dropdown positioned absolutely below header
- Framer Motion: slide down + fade in (height auto-animate, opacity 0→1)
- Overlay backdrop (semi-transparent)
- **Category panel:** 3-4 column grid of category cards (icon + name + count)
- **Age panel:** 5 age group cards with illustrations
- **Brand panel:** Logo grid (3-4 columns)
- **Play panel:** 2-column layout with activity type cards + featured activities
- Close on click outside, Escape key, or mouse leave (with 200ms delay)

**Step 3: Build SearchBar**

Client Component:
- Collapsed: magnifying glass icon button
- Expanded (on click): full input with animated width expansion (Framer Motion layout)
- Input with placeholder "Search toys, categories, brands..."
- Real-time filter: searches products by name, category, brand, tags
- Dropdown results panel with product thumbnails, names, prices
- Max 6 results shown + "See all results" link
- Close on blur/Escape

**Step 4: Commit**

```bash
git commit -m "feat: add desktop header with mega menu, search bar, cart/wishlist icons"
```

---

### Task 2.3: Mobile Navigation

**Files:**
- Create: `next-app/src/components/layout/BottomNav.tsx`
- Create: `next-app/src/components/layout/MobileDrawer.tsx`

**Step 1: Build BottomNav**

Client Component (visible only on mobile):
- Sticky bottom bar, 5 items: Home, Categories, Play, Wishlist, Cart
- Lucide icons: Home, Grid3X3, Gamepad2, Heart, ShoppingCart
- Active item: coral color + animated dot indicator below icon (Framer Motion `layoutId` for smooth slide)
- Cart shows count badge

**Step 2: Build MobileDrawer**

Client Component:
- Full-screen slide-in drawer from right (Framer Motion)
- Sections: Shop by Category (accordion), Shop by Age (list), Shop by Brand (list), Play (list)
- Each section is collapsible with smooth height animation
- Close button, overlay backdrop

**Step 3: Commit**

```bash
git commit -m "feat: add mobile bottom nav and full-screen navigation drawer"
```

---

### Task 2.4: Footer

**Files:**
- Create: `next-app/src/components/layout/Footer.tsx`
- Create: `next-app/src/components/layout/Newsletter.tsx`

**Step 1: Build Newsletter section**

Client Component:
- Dark background (#1A1A2E → #2C2C54 gradient)
- "Get Magical Offers" heading
- Email input + "Subscribe" button in a rounded pill container
- On subscribe: confetti particle burst animation (CSS-only, 20-30 particles)
- Toast confirmation

**Step 2: Build Footer**

Server Component:
- Illustrated toy silhouette border along the top (CSS clip-path or SVG wave)
- 4-column grid:
  - **Shop:** Category links, age group links, brands
  - **Customer Service:** Shipping & Delivery, Returns & Exchange, FAQ, Contact Us
  - **About WonderKids:** Our Story, Safety Promise, Eco Commitment, Careers
  - **Connect:** Social media icon links, App download badges
- Payment icons row: Visa, Mastercard, UPI, GPay, Paytm
- Trust badges: BIS Certified, Eco-Friendly, Secure Payments
- Copyright: "© 2026 WonderKids. All rights reserved."
- Bottom padding on mobile to account for BottomNav

**Step 3: Commit**

```bash
git commit -m "feat: add footer with newsletter, 4-column links, trust badges"
```

---

### Task 2.5: Assemble Root Layout

**Files:**
- Modify: `next-app/src/app/layout.tsx`

**Step 1: Wire all layout components together**

```tsx
<StoreProvider>
  <PromoBar />
  <Header />
  <main>{children}</main>
  <Footer />
  <BottomNav />
  <Toast />
</StoreProvider>
```

Add Framer Motion `AnimatePresence` wrapper around `{children}` for page transitions.

**Step 2: Add page transition wrapper**

Create `next-app/src/components/PageTransition.tsx` — wraps page content with Framer Motion fade + slight Y slide on mount/unmount.

**Step 3: Verify** — run dev server, navigate between pages, confirm header/footer/nav all render, mega menu opens, mobile nav works.

**Step 4: Commit**

```bash
git commit -m "feat: assemble root layout with all shell components and page transitions"
```

---

## Phase 3: Shared Components

### Task 3.1: Product Card Component

**Files:**
- Create: `next-app/src/components/ProductCard.tsx`

**Step 1: Build ProductCard**

Client Component. Port and upgrade from `react-app/src/components/ProductCard.jsx`:
- Next.js `<Image>` component for product image (with blur placeholder)
- Wishlist heart toggle (top-right, animated scale on toggle)
- Badge (top-left): "Best Seller" / "New" / "Top Rated" / "Premium" with subtle CSS bounce
- Category tag, product name, star rating with review count
- Price: `₹{price}` bold + `₹{originalPrice}` strikethrough + `{discount}% off` in green
- "Add to Cart" button: full-width, coral background, hover opacity, Framer Motion `whileTap` scale
- Card hover: `translateY(-6px)`, shadow deepens, subtle scale(1.02)
- Click card → navigates to `/shop/product/{slug}`

**Step 2: Commit**

```bash
git commit -m "feat: add ProductCard component with animations and wishlist toggle"
```

---

### Task 3.2: Category Card Component

**Files:**
- Create: `next-app/src/components/CategoryCard.tsx`

**Step 1: Build CategoryCard**

Client Component:
- Rounded card with category gradient background
- Category illustration image (nanobanana2) with Next.js `<Image>`
- Category name (white, bold) + product count
- Hover: card lifts (`translateY(-4px)`), subtle wiggle animation on illustration, gradient border glow appears
- Click → navigates to `/shop/{category-slug}`
- Framer Motion `whileInView` fade-up on scroll

**Step 2: Commit**

```bash
git commit -m "feat: add CategoryCard component with hover animations"
```

---

### Task 3.3: Shared UI Components

**Files:**
- Create: `next-app/src/components/ui/SectionHeader.tsx`
- Create: `next-app/src/components/ui/ProductCarousel.tsx`
- Create: `next-app/src/components/ui/FloatingElements.tsx`
- Create: `next-app/src/components/ui/Skeleton.tsx`
- Create: `next-app/src/components/ui/Badge.tsx`
- Create: `next-app/src/components/ui/Toast.tsx`
- Create: `next-app/src/components/ui/EmptyState.tsx`

**Step 1: Build SectionHeader**

Server Component: Subtitle (coral, uppercase, tracked), Title (Nunito extrabold), optional description. Used on every section of every page.

**Step 2: Build ProductCarousel**

Client Component: Horizontal snap-scroll container with product cards. Optional "See All" link button. Handles overflow, hide-scrollbar, snap alignment.

**Step 3: Build FloatingElements**

Client Component: Renders absolutely-positioned toy silhouettes/stars/clouds on page margins. CSS `float` and `drift` animations with randomized delays. Configurable density and element set. Used on page backgrounds globally.

**Step 4: Build Skeleton**

ProductCard skeleton, CategoryCard skeleton, generic rectangle/circle skeletons with shimmer animation.

**Step 5: Build Badge, Toast, EmptyState**

- Badge: colored pill with optional bounce animation
- Toast: slide-in notification (port from existing, upgrade with Framer Motion)
- EmptyState: cartoon bear illustration + message + CTA button. Used for empty cart, empty wishlist, no search results, 404.

**Step 6: Commit**

```bash
git commit -m "feat: add shared UI components — SectionHeader, ProductCarousel, FloatingElements, Skeleton, Badge, Toast, EmptyState"
```

---

## Phase 4: Home Page

### Task 4.1: Hero Section

**Files:**
- Create: `next-app/src/app/page.tsx` (home page)
- Create: `next-app/src/components/home/Hero.tsx`

**Step 1: Build Hero**

Client Component:
- Full viewport height (minus header)
- Multi-layer parallax background: layer 1 (gradient sky), layer 2 (clouds, CSS), layer 3 (floating toy illustrations), layer 4 (stars/sparkles)
- Parallax: each layer transforms Y at different scroll rates using Framer Motion `useScroll` + `useTransform`
- Left column: badge ("500+ Happy Families"), headline with animated gradient text ("India's Most Magical Toy Store"), description, two CTA buttons (Shop Now → /shop, Find My Toy → /quiz), stats row (2000+ Products, 13 Worlds, 4.9 Rating)
- Right column: Featured product showcase — auto-cycling carousel of 3-4 product images with Framer Motion `AnimatePresence` crossfade. Rounded container with gradient background.
- Cartoon bear mascot peeking from bottom-right corner (image placeholder until nanobanana2)
- Floating label badges around the showcase: "Space Adventure", "Birthday Planner", "Creative Art" (hidden on mobile)

**Step 2: Wire into home page**

`page.tsx` imports Hero and renders it as the first section.

**Step 3: Commit**

```bash
git commit -m "feat: add parallax hero section with animated headline and product showcase"
```

---

### Task 4.2: Home Page Remaining Sections

**Files:**
- Create: `next-app/src/components/home/PromoTicker.tsx`
- Create: `next-app/src/components/home/CategoryGrid.tsx`
- Create: `next-app/src/components/home/AgeStrip.tsx`
- Create: `next-app/src/components/home/TrendingProducts.tsx`
- Create: `next-app/src/components/home/BrandStrip.tsx`
- Create: `next-app/src/components/home/BirthdayBanner.tsx`
- Create: `next-app/src/components/home/QuizBanner.tsx`
- Create: `next-app/src/components/home/NewArrivals.tsx`
- Create: `next-app/src/components/home/TrustSection.tsx`
- Modify: `next-app/src/app/page.tsx`

**Step 1: Build PromoTicker** — auto-scrolling horizontal strip with CSS `@keyframes` infinite scroll. Promotional messages with emoji.

**Step 2: Build CategoryGrid** — responsive grid (2 cols mobile → 5 cols desktop) of CategoryCard components. Framer Motion staggered `whileInView` reveal.

**Step 3: Build AgeStrip** — horizontal row of 5 age group cards. Each card: illustrated character, age range, subtitle. Click → `/age/{slug}`.

**Step 4: Build TrendingProducts** — SectionHeader ("Trending Now") + ProductCarousel with trending products. "See All →" link to `/shop`.

**Step 5: Build BrandStrip** — infinite auto-scrolling brand logo carousel. CSS animation loop. Click logo → `/brands/{slug}`.

**Step 6: Build BirthdayBanner** — full-width rounded banner, coral→orange gradient, confetti CSS animation, CTA to `/birthday`.

**Step 7: Build QuizBanner** — purple gradient banner, floating animated question marks, CTA to `/quiz`.

**Step 8: Build NewArrivals** — SectionHeader + 4-column product grid of new products.

**Step 9: Build TrustSection** — 4 value cards (Safe, Eco, Delivery, Returns) with Framer Motion `whileInView` bounce-in on icons.

**Step 10: Assemble home page** — Stack all sections in `page.tsx` with FloatingElements in background.

**Step 11: Commit**

```bash
git commit -m "feat: complete home page with all sections — categories, age, trending, brands, banners, trust"
```

---

## Phase 5: Shop Pages

### Task 5.1: All Products Page (/shop)

**Files:**
- Create: `next-app/src/app/shop/page.tsx`
- Create: `next-app/src/components/shop/ProductGrid.tsx`
- Create: `next-app/src/components/shop/Filters.tsx`

**Step 1: Build Filters sidebar/bar**

Client Component:
- Category filter (checkbox list)
- Age range filter (checkbox list)
- Brand filter (checkbox list)
- Price range filter (min/max inputs in ₹)
- Sort dropdown: Featured, Price Low→High, Price High→Low, Rating, Newest
- Mobile: filters in a slide-up bottom sheet
- Desktop: left sidebar

**Step 2: Build ProductGrid**

Client Component: Responsive grid (2 cols mobile → 4 cols desktop) of ProductCard components. Accepts filtered/sorted product array. Framer Motion `layout` prop for smooth reflow on filter change.

**Step 3: Build shop page**

SectionHeader, Filters + ProductGrid side by side. URL query params for active filters (for shareable links).

**Step 4: Commit**

```bash
git commit -m "feat: add /shop page with product grid, filters, and sorting"
```

---

### Task 5.2: Category Page (/shop/[category])

**Files:**
- Create: `next-app/src/app/shop/[category]/page.tsx`

**Step 1: Build category page**

- Dynamic route using category slug
- Category hero: gradient background, category illustration, name, description, product count
- Subcategory pills (horizontal scrollable row)
- ProductGrid filtered to this category
- Same Filters component (without category filter)
- `generateStaticParams` for SSG of all 13 categories
- `generateMetadata` for SEO title/description per category

**Step 2: Commit**

```bash
git commit -m "feat: add dynamic category pages with hero, subcategory filters, product grid"
```

---

### Task 5.3: Product Detail Page (/shop/product/[slug])

**Files:**
- Create: `next-app/src/app/shop/product/[slug]/page.tsx`
- Create: `next-app/src/components/product/ProductGallery.tsx`
- Create: `next-app/src/components/product/ProductInfo.tsx`
- Create: `next-app/src/components/product/ProductTabs.tsx`
- Create: `next-app/src/components/product/RelatedProducts.tsx`

**Step 1: Build ProductGallery**

Client Component: Large main image with zoom-on-hover effect. Thumbnail strip below for multiple images (if available). Framer Motion image crossfade.

**Step 2: Build ProductInfo**

Client Component: Brand name, product name (Nunito extrabold), star rating with review count, price block (₹ current, ₹ original strikethrough, % off badge), short description, quantity selector, "Add to Cart" button (large, animated), "Add to Wishlist" button, delivery info ("Free delivery above ₹999").

**Step 3: Build ProductTabs**

Client Component: Three tabs — "Why Kids Love This", "Benefits", "Safety". Each tab shows the corresponding array from product data as a styled list with check icons. Framer Motion `AnimatePresence` for tab content transitions.

**Step 4: Build RelatedProducts**

ProductCarousel showing products from the same category (excluding current product).

**Step 5: Assemble product page**

2-column layout (gallery left, info right on desktop). Tabs below. Related products below that. Breadcrumb nav at top: Home > Category > Product. `generateStaticParams` + `generateMetadata`.

**Step 6: Commit**

```bash
git commit -m "feat: add product detail page with gallery, info, tabs, related products"
```

---

### Task 5.4: Shop by Age (/age/[ageGroup])

**Files:**
- Create: `next-app/src/app/age/[ageGroup]/page.tsx`

**Step 1: Build age group page**

- Age group hero with illustrated character, age range, subtitle
- ProductGrid filtered by age range
- Sidebar filters (category, brand, price)
- `generateStaticParams` for 5 age groups

**Step 2: Commit**

```bash
git commit -m "feat: add Shop by Age pages with filtered product grids"
```

---

### Task 5.5: Brand Pages (/brands, /brands/[brand])

**Files:**
- Create: `next-app/src/app/brands/page.tsx`
- Create: `next-app/src/app/brands/[brand]/page.tsx`

**Step 1: Build brands index page**

Grid of brand cards with logos, names, product counts. Click → brand detail page.

**Step 2: Build brand detail page**

- Brand hero: logo, name, description, brand color accent
- ProductGrid filtered by brand
- `generateStaticParams` for all brands

**Step 3: Commit**

```bash
git commit -m "feat: add brands index and individual brand pages"
```

---

## Phase 6: Play Section

### Task 6.1: Play Hub & Activity Pages

**Files:**
- Create: `next-app/src/app/play/page.tsx`
- Create: `next-app/src/app/play/[activity]/page.tsx`
- Create: `next-app/src/components/play/ActivityCard.tsx`

**Step 1: Build ActivityCard**

Rounded card with illustrated thumbnail, title, type badge (color-coded), age range, difficulty dots, duration. Hover lift + shadow. Click → `/play/{slug}`.

**Step 2: Build Play hub page**

- Illustrated hero with animated characters
- Filter row: activity type buttons (All, DIY, Demos, Printables, Games, Learning) + age filter
- Grid of ActivityCards
- Framer Motion staggered reveal

**Step 3: Build activity detail page**

- Activity image/illustration hero
- Title, type, age range, difficulty, duration
- Content body (markdown-style: steps for DIY, description for demos, download link for printables, embedded game for mini games)
- Related activities
- `generateStaticParams` + `generateMetadata`

**Step 4: Commit**

```bash
git commit -m "feat: add Play hub with activity cards, filters, and detail pages"
```

---

## Phase 7: Interactive Features

### Task 7.1: Gift Quiz

**Files:**
- Create: `next-app/src/app/quiz/page.tsx`
- Create: `next-app/src/components/quiz/QuizWizard.tsx`

**Step 1: Build QuizWizard**

Client Component — multi-step animated wizard:
- Step 1: Child's age (5 age group buttons with illustrations)
- Step 2: Interests (multi-select grid: Space, Animals, Art, Building, Fantasy, Vehicles, Sports, Music)
- Step 3: Budget range (₹500-1000, ₹1000-2000, ₹2000-3500, ₹3500+)
- Step 4: Occasion (Birthday, Just Because, Festival, Achievement)
- Each step: Framer Motion slide transition, animated progress bar at top
- Results page: filtered product recommendations (max 8), "Add All to Cart" button, "Retake Quiz" link

**Step 2: Commit**

```bash
git commit -m "feat: add Gift Quiz with animated multi-step wizard and recommendations"
```

---

### Task 7.2: Birthday Planner

**Files:**
- Create: `next-app/src/app/birthday/page.tsx`
- Create: `next-app/src/components/birthday/PlannerWizard.tsx`

**Step 1: Build PlannerWizard**

Client Component — step-by-step planner:
- Step 1: Choose theme (Space, Jungle, Princess, Superhero, Ocean, Art Party)
- Step 2: Guest count (stepper: 5-50)
- Step 3: Budget per child (₹100, ₹200, ₹300, ₹500)
- Step 4: Add-ons (checkboxes: Cake, Decorations, Return Gifts, Games Kit, Costumes)
- Live preview sidebar: party kit summary updating in real-time as selections change
- Price breakdown in ₹ at each step
- Final step: confetti animation + "Add Party Kit to Cart" CTA

**Step 2: Commit**

```bash
git commit -m "feat: add Birthday Planner with step-by-step wizard and live preview"
```

---

### Task 7.3: Cart Page

**Files:**
- Create: `next-app/src/app/cart/page.tsx`

**Step 1: Build Cart page**

Client Component:
- Product list: image, name, price (₹), quantity stepper (+/-), remove button
- Remove: Framer Motion animated slide-out + height collapse
- Coupon code input field with "Apply" button
- Order summary card (sticky on desktop): Subtotal, Discount, Delivery (free above ₹999, else ₹49), Total
- "Continue Shopping" link + "Proceed to Checkout" CTA
- Empty state: EmptyState component with cartoon bear

**Step 2: Commit**

```bash
git commit -m "feat: add Cart page with quantity management, coupon input, order summary"
```

---

### Task 7.4: Wishlist Page

**Files:**
- Create: `next-app/src/app/wishlist/page.tsx`

**Step 1: Build Wishlist page**

Client Component:
- Product grid of wishlisted items (using ProductCard with "Move to Cart" variant)
- "Move to Cart" and "Remove" actions per item
- Share wishlist button (copies URL to clipboard, toast confirmation)
- Empty state: EmptyState with cartoon bear + heart

**Step 2: Commit**

```bash
git commit -m "feat: add Wishlist page with move-to-cart and share functionality"
```

---

## Phase 8: Polish & 404

### Task 8.1: 404 Page & Loading States

**Files:**
- Create: `next-app/src/app/not-found.tsx`
- Create: `next-app/src/app/loading.tsx`

**Step 1: Build 404 page**

- Cartoon bear floating in space illustration
- "Oops! This page got lost in space" heading
- "Let's go home" button → `/`
- Floating stars/planets CSS animation in background

**Step 2: Build loading page**

Full-page skeleton with shimmer animation matching the home page layout.

**Step 3: Commit**

```bash
git commit -m "feat: add 404 page with space bear and global loading skeleton"
```

---

### Task 8.2: SEO Metadata & Sitemap

**Files:**
- Modify: `next-app/src/app/layout.tsx` (default metadata)
- Create: `next-app/src/app/sitemap.ts`
- Create: `next-app/src/app/robots.ts`

**Step 1: Add default metadata**

Title: "WonderKids — India's Most Magical Toy Store", description, Open Graph image, theme color.

**Step 2: Create sitemap**

Dynamic sitemap including all static pages + all product pages + all category pages + all brand pages + all age pages.

**Step 3: Create robots.txt**

Allow all crawlers, point to sitemap.

**Step 4: Commit**

```bash
git commit -m "feat: add SEO metadata, sitemap, and robots.txt"
```

---

## Phase 9: Image Generation

### Task 9.1: Generate All Images via nanobanana2

**Files:**
- Generate images into: `next-app/public/images/`

**Step 1: Generate mascot images**

Cartoon bear mascot in 4 poses: waving, magnifying glass, party hat, reading book. Style: friendly, round, colorful, big eyes.

**Step 2: Generate category illustrations**

13 category hero illustrations matching each category theme.

**Step 3: Generate product images**

~100 product images. Style: clean product shots on white/gradient backgrounds.

**Step 4: Generate brand logos**

14 stylized brand logo placeholders.

**Step 5: Generate age group illustrations**

5 character illustrations representing each age group.

**Step 6: Generate activity illustrations**

~15 activity thumbnails for the Play section.

**Step 7: Generate background decorations**

Toy silhouettes, clouds, stars for floating background elements.

**Step 8: Generate banners**

Hero background layers, birthday banner, quiz banner illustrations.

**Step 9: Commit**

```bash
git commit -m "feat: add all AI-generated images — mascot, categories, products, brands, backgrounds"
```

---

## Phase 10: Build & Deploy

### Task 10.1: Production Build & Vercel Deploy

**Step 1: Run production build**

```bash
cd next-app
npm run build
```

Fix any build errors.

**Step 2: Test production build locally**

```bash
npm run start
```

Verify all pages render, navigation works, animations play, images load.

**Step 3: Deploy to Vercel**

```bash
npx vercel --prod
```

**Step 4: Configure CNAME** (if custom domain)

**Step 5: Final commit**

```bash
git commit -m "feat: production build verified and deployed to Vercel"
```

---

## Summary

| Phase | Tasks | What It Delivers |
|-------|-------|-----------------|
| 1 | 1.1-1.4 | Next.js project, theme, data layer, state management |
| 2 | 2.1-2.5 | Complete layout shell — header, mega menu, mobile nav, footer |
| 3 | 3.1-3.3 | Reusable components — ProductCard, CategoryCard, UI primitives |
| 4 | 4.1-4.2 | Complete animated home page |
| 5 | 5.1-5.5 | All shop pages — products, categories, product detail, age, brands |
| 6 | 6.1 | Play section with activities |
| 7 | 7.1-7.4 | Interactive features — quiz, birthday planner, cart, wishlist |
| 8 | 8.1-8.2 | Polish — 404, loading states, SEO |
| 9 | 9.1 | All AI-generated images via nanobanana2 |
| 10 | 10.1 | Production build & Vercel deployment |
