# Frontend-Backend Separation Guide

## ✅ Current Setup (Already Good!)

You've already done the hard part! Here's what's working:

### Structure
```
shop.co/
├── server/                    # Backend (Express.js)
│   ├── index.js              # API server
│   ├── package.json
│   └── data/
│       └── products.json
└── src/                       # Frontend (Next.js)
    ├── services/
    │   └── productService.ts  # API calls to backend
    └── components/            # UI components
```

### Communication Flow
- **Frontend** calls `http://localhost:5000/api/products` (defined in `productService.ts`)
- **Backend** handles requests with filtering, sorting, and search
- **CORS** enabled for cross-origin requests

---

## 🎯 Best Practices (Current Implementation)

### 1. **Environment Variables** ✅ Already Using
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```
- Frontend knows backend URL via env variable
- Can change per environment (dev/prod)

### 2. **API Service Layer** ✅ Already Using
```typescript
// src/services/productService.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
```
- Single source for API calls
- Easy to modify API endpoints
- Centralized error handling

### 3. **Backend API Routes** ✅ Already Using
```
GET  /api/products              - Get all products
GET  /api/products/:idOrSlug    - Get single product
POST /api/cart                  - Add to cart
GET  /api/cart                  - Get cart items
```

---

## 📋 How to Run Both Simultaneously

### Option 1: Two Terminals (Recommended for Development)

**Terminal 1 - Backend:**
```bash
cd server
npm start
```
- Runs on `http://localhost:5000`
- Auto-reloads with nodemon

**Terminal 2 - Frontend:**
```bash
npm run dev
```
- Runs on `http://localhost:3000`
- Calls backend at `http://localhost:5000`

### Option 2: Run Both with npm concurrently
Install in root:
```bash
npm install -D concurrently
```

Update root `package.json`:
```json
{
  "scripts": {
    "dev": "concurrently \"cd server && npm start\" \"npm run dev\""
  }
}
```

Then run:
```bash
npm run dev
```

---

## 🔧 Additional Improvements (Optional)

### 1. Add `.env.local` for Frontend
Create `c:\Users\Hp\OneDrive\Desktop\Assignment\shop.co\.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 2. Add `.env` for Backend
Create `c:\Users\Hp\OneDrive\Desktop\Assignment\shop.co\server\.env`:
```env
PORT=5000
NODE_ENV=development
```

### 3. Update Backend `index.js` to use env
```javascript
require('dotenv').config();
const PORT = process.env.PORT || 5000;
```

### 4. Add Request/Response Logging (Backend)
```javascript
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});
```

---

## 🚀 Production Deployment

### Option A: Separate Hosting
- Backend: Deploy to **Vercel**, **Render**, or **Railway**
- Frontend: Deploy to **Vercel**
- Update `NEXT_PUBLIC_API_URL` to production backend URL

### Option B: Same Server
- Build Next.js: `npm run build`
- Serve static from Express: 
```javascript
app.use(express.static('out')); // Next.js static export
app.use(express.static('.next/static'));
```

---

## ✨ Summary

You're already following best practices! To ensure complete separation:

1. ✅ Keep `server/` and `src/` separate folders
2. ✅ Use environment variables for API URL
3. ✅ Use service layer for API calls (`productService.ts`)
4. ✅ Never import backend code into frontend
5. ✅ Always communicate via HTTP/REST APIs
6. ✅ Frontend is platform-agnostic (works with any backend)

**Your setup is production-ready!** 🎉
