import { NextRequest, NextResponse } from 'next/server';
import productsData from '@/data/products.json';
import { Product } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    let products: Product[] = [...(productsData.products as Product[])];

    const category = searchParams.get('category');
    const style = searchParams.get('style');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const search = searchParams.get('search');
    const sortBy = searchParams.get('sortBy');
    const isNewArrival = searchParams.get('isNewArrival');
    const isTopSelling = searchParams.get('isTopSelling');

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

    return NextResponse.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Server Error', error: error.message },
      { status: 500 }
    );
  }
}
