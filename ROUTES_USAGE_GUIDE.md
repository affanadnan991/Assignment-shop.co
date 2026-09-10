# Backend Routes - Complete Usage Guide

## ✅ **All Routes Are Already Connected!**

### 1. **New Arrivals** 
- **Backend Route**: `GET /api/products/new-arrivals`
- **Service Method**: `productService.getNewArrivals()`
- **Used In**: [src/app/page.tsx](src/app/page.tsx#L10) (Home page)
- **Component**: [ProductGridSection](src/components/home/ProductGridSection.tsx)
```typescript
const newArrivals = await productService.getNewArrivals();
<ProductGridSection title="NEW ARRIVALS" products={newArrivals} />
```

---

### 2. **Top Selling Products**
- **Backend Route**: `GET /api/products/top-selling`
- **Service Method**: `productService.getTopSelling()`
- **Used In**: [src/app/page.tsx](src/app/page.tsx#L11) (Home page)
- **Component**: [ProductGridSection](src/components/home/ProductGridSection.tsx)
```typescript
const topSelling = await productService.getTopSelling();
<ProductGridSection title="TOP SELLING" products={topSelling} />
```

---

### 3. **All Products with Filters & Sorting**
- **Backend Route**: `GET /api/products?category=&style=&minPrice=&maxPrice=&search=&sortBy=`
- **Service Method**: `productService.getProducts(params)`
- **Used In**: [src/app/shop/page.tsx](src/app/shop/page.tsx#L25)
- **Features**: 
  - Filter by category
  - Filter by style
  - Filter by price range
  - Search products
  - Sort by (price-low, price-high, newest, most-popular)
```typescript
const data = await productService.getProducts({
  category: filter.category,
  style: filter.style,
  minPrice: filter.minPrice,
  maxPrice: filter.maxPrice,
  search: filter.searchQuery,
  sortBy: filter.sortBy,
});
```

---

### 4. **Single Product Details**
- **Backend Route**: `GET /api/products/:id`
- **Service Method**: `productService.getProductById(idOrSlug)`
- **Used In**: [src/app/products/[id]/page.tsx](src/app/products/[id]/page.tsx#L35)
- **Component**: Product detail page with images, colors, sizes, reviews
```typescript
const product = await productService.getProductById(id);
```

---

### 5. **Related Products**
- **Backend Route**: `GET /api/products/:id/related`
- **Service Method**: `productService.getRelatedProducts(category, currentId)`
- **Used In**: [src/app/products/[id]/page.tsx](src/app/products/[id]/page.tsx#L41)
- **Shows**: 4 products from same category
```typescript
const related = await productService.getRelatedProducts(prod.category, prod.id);
```

---

### 6. **Customer Reviews**
- **Backend Route**: `GET /api/reviews`
- **Service Method**: `productService.getReviews()`
- **Used In**: 
  - [src/app/page.tsx](src/app/page.tsx#L23) (Home page reviews section)
  - [src/app/products/[id]/page.tsx](src/app/products/[id]/page.tsx#L40) (Product detail page)
  - [src/components/home/CustomerReviews.tsx](src/components/home/CustomerReviews.tsx#L15)
```typescript
const reviews = await productService.getReviews();
```

---

## 🎯 **How Routes Work - Complete Flow**

### Home Page (src/app/page.tsx)
```
Hero Banner
   ↓
Brand Banner
   ↓
NEW ARRIVALS (from /api/products/new-arrivals)
   ↓
TOP SELLING (from /api/products/top-selling)
   ↓
Browse by Style
   ↓
Customer Reviews (from /api/reviews)
```

### Shop Page (src/app/shop/page.tsx)
```
User selects filters/search
   ↓
Calls getProducts() with params
   ↓
Backend filters data (/api/products?...)
   ↓
Shows filtered products in grid
```

### Product Detail Page (src/app/products/[id]/page.tsx)
```
User clicks a product
   ↓
Fetches product details (/api/products/:id)
   ↓
Fetches related products (/api/products/:id/related)
   ↓
Fetches all reviews (/api/reviews)
   ↓
Displays: Product info + Related products + Reviews
```

---

## ✨ **Summary - Kya Kya Ho Raha Hai**

| Route | Status | Where Used |
|-------|--------|-----------|
| GET /api/products | ✅ Used | Shop page (with filters) |
| GET /api/products/new-arrivals | ✅ Used | Home page |
| GET /api/products/top-selling | ✅ Used | Home page |
| GET /api/products/:id | ✅ Used | Product detail page |
| GET /api/products/:id/related | ✅ Used | Product detail page |
| GET /api/reviews | ✅ Used | Home + Product page |

**Sab kuch connect ho chuka hai!** ✨

---

## 🚀 **How to Test Everything**

### Terminal 1 - Start Backend
```bash
cd server
npm start
```

### Terminal 2 - Start Frontend
```bash
npm run dev
```

### Then Visit:
- **Home**: http://localhost:3000 (New Arrivals + Top Selling)
- **Shop**: http://localhost:3000/shop (All products with filters)
- **Product**: http://localhost:3000/products/[product-id] (Details + Related)

---

## 🔍 **Verify Everything is Working**

### Check Backend is Running:
```bash
curl http://localhost:5000/api/products
curl http://localhost:5000/api/products/new-arrivals
curl http://localhost:5000/api/reviews
```

### Check Frontend Calls:
- Open browser DevTools (F12)
- Go to Network tab
- Navigate pages
- You'll see requests like:
  - `GET /api/products`
  - `GET /api/products/new-arrivals`
  - `GET /api/reviews`
  - etc.

---

**Aapka project bilkul theek hai! Sab routes properly connect ho chuke hain!** 🎉
