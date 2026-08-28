const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to read data
const getData = () => {
  const filePath = path.join(__dirname, 'data', 'products.json');
  const rawData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(rawData);
};

// GET /api/products - Get all products with optional filters & sorting
app.get('/api/products', (req, res) => {
  try {
    const data = getData();
    let products = [...data.products];

    const { category, style, minPrice, maxPrice, search, sortBy, isNewArrival, isTopSelling } = req.query;

    if (category && category !== 'All') {
      products = products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
    }

    if (style && style !== 'All') {
      products = products.filter((p) => p.style.toLowerCase() === style.toLowerCase());
    }

    if (minPrice) {
      products = products.filter((p) => p.price >= Number(minPrice));
    }

    if (maxPrice) {
      products = products.filter((p) => p.price <= Number(maxPrice));
    }

    if (search) {
      const query = search.toLowerCase();
      products = products.filter(
        (p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
      );
    }

    if (isNewArrival === 'true') {
      products = products.filter((p) => p.isNewArrival);
    }

    if (isTopSelling === 'true') {
      products = products.filter((p) => p.isTopSelling);
    }

    // Sorting
    if (sortBy === 'price-low') {
      products.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      products.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      products.sort((a, b) => (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0));
    } else if (sortBy === 'most-popular') {
      products.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// GET /api/products/new-arrivals
app.get('/api/products/new-arrivals', (req, res) => {
  try {
    const data = getData();
    const newArrivals = data.products.filter((p) => p.isNewArrival);
    res.json({ success: true, count: newArrivals.length, data: newArrivals });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// GET /api/products/top-selling
app.get('/api/products/top-selling', (req, res) => {
  try {
    const data = getData();
    const topSelling = data.products.filter((p) => p.isTopSelling);
    res.json({ success: true, count: topSelling.length, data: topSelling });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// GET /api/products/:id - Get product details by ID or Slug
app.get('/api/products/:id', (req, res) => {
  try {
    const data = getData();
    const { id } = req.params;
    const product = data.products.find((p) => p.id === id || p.slug === id);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// GET /api/products/:id/related - Get related products
app.get('/api/products/:id/related', (req, res) => {
  try {
    const data = getData();
    const { id } = req.params;
    const current = data.products.find((p) => p.id === id || p.slug === id);

    let related = [];
    if (current) {
      related = data.products.filter(
        (p) => p.category === current.category && p.id !== current.id
      ).slice(0, 4);
    }
    if (related.length === 0) {
      related = data.products.filter((p) => p.id !== id).slice(0, 4);
    }

    res.json({ success: true, count: related.length, data: related });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// GET /api/reviews - Get customer reviews
app.get('/api/reviews', (req, res) => {
  try {
    const data = getData();
    res.json({ success: true, count: data.reviews.length, data: data.reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Express API Server running on port ${PORT}`);
});
