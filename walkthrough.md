# Walkthrough - Express Backend REST API Integration

We have successfully initialized an Express.js backend project and refactored the Next.js frontend to dynamically fetch products and customer reviews via REST APIs instead of using hardcoded frontend mock data.

## 1. Created Express Backend (`server/`)

- **[server/package.json](file:///c:/Users/Hp/OneDrive/Desktop/Assignment/shop.co/server/package.json)**: Configured Express backend with `express`, `cors`, and `dotenv`.
- **[server/data/products.json](file:///c:/Users/Hp/OneDrive/Desktop/Assignment/shop.co/server/data/products.json)**: Migrated product catalog and customer review data into backend JSON storage.
- **[server/index.js](file:///c:/Users/Hp/OneDrive/Desktop/Assignment/shop.co/server/index.js)**: Developed REST API endpoints:
  - `GET /api/products`: Supports category, style, minPrice, maxPrice, search, and sorting.
  - `GET /api/products/new-arrivals`: Returns new arrival products.
  - `GET /api/products/top-selling`: Returns top selling products.
  - `GET /api/products/:id`: Returns single product by ID or slug.
  - `GET /api/products/:id/related`: Returns related products.
  - `GET /api/reviews`: Returns customer reviews.

## 2. Updated Next.js Frontend (`src/`)

- **[.env.local](file:///c:/Users/Hp/OneDrive/Desktop/Assignment/shop.co/.env.local)**: Added `NEXT_PUBLIC_API_URL=http://localhost:5000`.
- **[src/services/productService.ts](file:///c:/Users/Hp/OneDrive/Desktop/Assignment/shop.co/src/services/productService.ts)**: Replaced mock resolutions with standard `fetch` API calls targeting Express REST endpoints.
- **[src/store/slices/productSlice.ts](file:///c:/Users/Hp/OneDrive/Desktop/Assignment/shop.co/src/store/slices/productSlice.ts)**: Updated Redux store slice to initialize empty state and handle API dispatching.
- **[src/app/page.tsx](file:///c:/Users/Hp/OneDrive/Desktop/Assignment/shop.co/src/app/page.tsx)**: Home page now fetches New Arrivals and Top Selling products asynchronously from Express APIs.
- **[src/app/shop/page.tsx](file:///c:/Users/Hp/OneDrive/Desktop/Assignment/shop.co/src/app/shop/page.tsx)**: Shop catalog page fetches filtered and sorted products dynamically from API.
- **[src/app/products/[id]/page.tsx](file:///c:/Users/Hp/OneDrive/Desktop/Assignment/shop.co/src/app/products/[id]/page.tsx)**: Product details and reviews are fetched dynamically.
- **[src/components/home/CustomerReviews.tsx](file:///c:/Users/Hp/OneDrive/Desktop/Assignment/shop.co/src/components/home/CustomerReviews.tsx)**: Customer reviews component fetches reviews from backend.
- **[src/data/mockProducts.ts](file:///c:/Users/Hp/OneDrive/Desktop/Assignment/shop.co/src/data/mockProducts.ts)**: Deprecated hardcoded frontend mock data array.

---

## 3. Verification & Results

- **TypeScript Compilation**: Executed `npx tsc --noEmit` — 0 errors.
- **Backend API Server**: Tested endpoints (`http://localhost:5000/api/products`) — returned 200 OK with formatted JSON payload.
