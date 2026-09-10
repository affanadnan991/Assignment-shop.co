import { NextResponse } from 'next/server';
import productsData from '@/data/products.json';
import { Product } from '@/types';

export async function GET() {
  try {
    const products: Product[] = productsData.products as Product[];
    const topSelling = products.filter((p) => p.isTopSelling);
    return NextResponse.json({ success: true, count: topSelling.length, data: topSelling });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Server Error', error: error.message },
      { status: 500 }
    );
  }
}
