# WonderKids — Next.js Full Rebuild Design

## Overview

Complete rebuild of the WonderKids children's toy store as a Next.js 15 application. Inspired by ToysRUs but 100X more fun — an "Animated Playground" aesthetic with rich motion, cartoon illustrations, floating toy decorations, and a colorful, immersive experience. All prices in Indian Rupees (INR).

## Tech Stack

- **Framework:** Next.js 15 (App Router, Server Components, file-based routing)
- **Styling:** Tailwind CSS 4 + CSS custom properties
- **Animations:** Framer Motion (page transitions, scroll reveals, floating elements, parallax)
- **Icons:** Lucide React
- **Images:** AI-generated via nanobanana2 (products, categories, banners, mascot, backgrounds)
- **State:** React Context for cart/wishlist
- **Fonts:** Nunito (headings), Inter (body), Baloo 2 (accent)
- **Deployment:** Vercel

## Route Structure

```
/                       → Home (hero, promos, featured, trending)
/shop                   → All products grid with filters
/shop/[category]        → Category page
/shop/product/[slug]    → Product detail page
/age/[ageGroup]         → Shop by Age
/brands                 → All brands
/brands/[brand]         → Brand page
/play                   → Play hub (DIY, demos, printables, games)
/play/[activity]        → Individual activity page
/birthday               → Birthday planner
/quiz                   → Gift finder quiz
/cart                   → Cart
/wishlist               → Wishlist
```

## Navigation & Layout

### Top Promotional Bar
Scrolling animated banner with rotating messages: "Free Shipping on Orders Over Rs.999" / "100% Safe & Certified Toys" / "2-Day Delivery Across India". Candy-colored gradient background with subtle floating star particles.

### Main Header (Desktop)
- Left: Animated cartoon bear mascot logo + "WonderKids" wordmark
- Center: Mega menu triggers — Shop by Category, Shop by Age, Shop by Brand, Play
- Right: Expandable search bar, Wishlist heart (count badge), Cart icon (count badge + bounce on add)

### Mega Menu (Desktop)
Full-width dropdown overlays with Framer Motion slide-down:
- **Shop by Category:** Multi-column grid with category illustrations, names, product counts
- **Shop by Age:** Age cards (0-2, 3-5, 6-8, 9-12, 13+) with illustrated characters per age
- **Shop by Brand:** Brand logo grid with hover effects
- **Play:** Activity previews with thumbnail illustrations

### Mobile Navigation
- Sticky bottom nav: Home, Categories, Play, Wishlist, Cart (animated active indicator)
- Hamburger menu: full-screen drawer with all nav sections
- Search: top sticky bar on scroll

### Footer
- 4-column layout: Shop, Customer Service, About WonderKids, Connect With Us
- Newsletter signup with confetti animation on subscribe
- Payment method icons, trust badges
- Illustrated toy silhouette border along the top

### Global Background Decorations
- Floating cartoon elements on page edges (stars, clouds, toy silhouettes) via CSS animations
- Soft gradient color shifts between sections
- All lightweight CSS + Framer Motion (no heavy canvas/WebGL)

## Home Page

1. **Hero Section** — Full-viewport parallax with layered illustrated background (clouds, stars, floating toys). Animated gradient headline: "India's Most Magical Toy Store". Two CTAs: "Shop Now" + "Take the Gift Quiz". Right side: rotating featured toy carousel. Cartoon bear mascot peeking from corner.

2. **Promotional Ticker** — Auto-scrolling horizontal strip with deals and announcements.

3. **Shop by Category Grid** — 2-row horizontal scroll (mobile), full grid (desktop). Illustrated category cards with hover lift + wiggle animation.

4. **Shop by Age Strip** — Horizontal row of age group cards with character illustrations: "0-2 Tiny Explorers" / "3-5 Little Adventurers" / "6-8 Big Dreamers" / "9-12 Super Builders" / "13+ Teen Creators".

5. **Trending Products Carousel** — Horizontal snap-scroll. Product cards with image, name, INR price, discount badge, rating, quick-add button. Hover: scale + shadow + "Add to Cart" slide-in.

6. **Featured Brands Strip** — Auto-scrolling infinite logo carousel (LEGO, Hot Wheels, Barbie, Disney, Marvel, Pokemon, Funskool, etc.). Click navigates to brand page.

7. **Birthday Planner Banner** — Full-width illustrated banner with confetti animation + CTA.

8. **Gift Quiz Banner** — Gradient banner with floating animated question marks + CTA.

9. **New Arrivals Grid** — 4-column product grid of latest additions.

10. **Trust / Values Section** — 4 animated cards: Safe & Certified, Eco-Friendly, Free Delivery Rs.999+, Easy Returns. Icons bounce in on scroll.

11. **Newsletter + Footer**

## Product Catalog

### Shop by Category (13 categories)
| Category | Example Subcategories |
|---|---|
| Action Figures & Playsets | Superheroes, Dinosaurs, Robots, Military |
| Arts & Crafts | Painting, Clay, Drawing, DIY Kits |
| Baby & Toddler | Rattles, Stacking, Soft Toys, Walkers |
| Building & Construction | Blocks, LEGO-style, Magnetic Tiles |
| Dolls & Accessories | Fashion Dolls, Baby Dolls, Dollhouses |
| Games & Puzzles | Board Games, Card Games, Puzzles |
| Learning & STEM | Science Kits, Coding, Educational |
| Outdoor & Sports | Cycles, Scooters, Sports, Water Play |
| Pretend Play | Kitchen, Doctor, Costumes, Playsets |
| Vehicles & RC | Cars, Trains, RC, Planes |
| Electronics & Gadgets | Tablets, Robots, Musical |
| Party & Celebrations | Birthday Kits, Return Gifts, Decorations |
| Kids Clothing | T-shirts, Dresses, Sets, Winter Wear |

### Shop by Age
- 0-2 years (Tiny Explorers)
- 3-5 years (Little Adventurers)
- 6-8 years (Big Dreamers)
- 9-12 years (Super Builders)
- 13+ years (Teen Creators)

### Shop by Brand
LEGO, Hot Wheels, Barbie, Disney, Marvel, Funskool, Toyshine, R for Rabbit, Fisher-Price, Nerf, Pokemon, Hasbro, Mattel, Chicco

### Product Cards
- Product image (nanobanana2), name, price in INR, original price strikethrough, discount %, star rating, quick "Add to Cart"
- Hover: subtle scale + shadow, "Add to Cart" animates in
- Badges: "Best Seller", "New", "Top Rated", "Premium"

### Product Detail Page
- Full-page layout (not modal)
- Large image gallery with zoom
- Price, discount, rating, reviews count
- Tabbed info: "Why Kids Love This" / "Benefits" / "Safety"
- Related products carousel
- Add to Cart + Add to Wishlist with animated feedback

## Play Section

### Play Hub (/play)
Illustrated hero with animated characters. Activity grid organized by type:
- **DIY Crafts** — Step-by-step tutorials with material lists and difficulty ratings
- **Toy Demos** — Product showcases with animated previews
- **Printables** — Downloadable coloring pages, mazes, worksheets
- **Mini Games** — Browser-based memory match, puzzle slider, coloring canvas
- **Learning Corner** — Fun facts, science experiments, story starters

Each card: illustrated thumbnail (nanobanana2), title, age range, difficulty badge, estimated time. Filterable by age group and activity type.

## Cart, Wishlist & Features

### Cart (/cart)
- Product list with images, names, INR prices, quantity stepper
- Remove with animated slide-out
- Coupon code input
- Order summary: subtotal, discount, delivery (free above Rs.999), total
- Empty state: cartoon bear with empty bag

### Wishlist (/wishlist)
- Product grid with "Move to Cart" and "Remove"
- Share wishlist (copy link)
- Empty state: cartoon bear with heart

### Gift Quiz (/quiz)
- Step-by-step animated wizard: Age → Interests → Budget → Occasion
- Animated progress bar
- Curated product recommendations with "Add All to Cart"

### Birthday Planner (/birthday)
- Step-by-step planner: Theme → Guest count → Budget → Add-ons
- Live party kit preview updating in real-time
- INR price breakdown
- Confetti on completion

### Search
- Expandable animated search bar
- Real-time filtered results
- Search by product, category, brand, age
- Recent + popular search suggestions

### Global UX
- Toast notifications with slide-in animation
- Responsive mobile-first design
- Skeleton loading shimmer states
- 404: cartoon bear lost in space + "Let's go home"

## Animation System

| Feature | Where | Technique |
|---|---|---|
| Floating toy silhouettes | Page backgrounds | CSS keyframe drift + rotation |
| Scroll-triggered reveals | All sections | Framer Motion whileInView fade-up/scale |
| Page transitions | Route changes | Framer Motion AnimatePresence slide/fade |
| Parallax hero layers | Home hero | Scroll-linked Y transforms |
| Particle confetti | Cart add, subscribe, birthday | CSS particle burst |
| Bouncing badges | Product cards | CSS infinite bounce |
| Hover micro-interactions | Cards, buttons, nav | Scale, shadow, color shifts |
| Cart count bounce | Header cart icon | Framer Motion spring |
| Mega menu reveal | Desktop nav | Height + opacity transition |
| Skeleton loaders | Product grids | Animated shimmer |

## Cartoon Bear Mascot

Friendly stylized cartoon bear (nanobanana2 generated) in multiple poses:
- Waving (hero section)
- Holding magnifying glass (search/empty states)
- Wearing party hat (birthday section)
- Reading a book (Play section)

## Color System

| Role | Color | Usage |
|---|---|---|
| Primary | #FF6B6B (Coral Red) | CTAs, active states, primary buttons |
| Secondary | #4ECDC4 (Teal) | Secondary buttons, accents |
| Accent 1 | #FFE66D (Sunny Yellow) | Promos, star ratings, sale badges |
| Accent 2 | #A78BFA (Soft Purple) | Play section, quiz, fantasy |
| Accent 3 | #34D399 (Mint Green) | Success states, eco badges |
| Dark | #1A1A2E | Headings, primary text, footer |
| Body Text | #636E72 | Paragraphs, descriptions |
| Background | #FFFBF5 (Warm Cream) | Page background |
| Surface | #FFFFFF | Cards, modals, inputs |
| Border | #F0E6D3 | Card borders, dividers |

## Typography

- **Headings:** Nunito — rounded, friendly, extrabold (800)
- **Body:** Inter — clean, readable at small sizes
- **Accent:** Baloo 2 — promo banners and hero text (sparingly)

## Design Tokens

- Border radius: 16px cards, 9999px buttons/pills, 24px large containers
- Shadows: soft multi-layered (0 4px 20px rgba(0,0,0,0.05) base, deeper on hover)
- Spacing: 8px base grid via Tailwind
