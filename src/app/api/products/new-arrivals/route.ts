import { NextResponse } from 'next/server';
import productsData from '@/data/products.json';
import { Product } from '@/types';

export async function GET() {
  try {
    const products: Product[] = productsData.products as Product[];
    const newArrivals = products.filter((p) => p.isNewArrival);
    return NextResponse.json({ success: true, count: newArrivals.length, data: newArrivals });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Server Error', error: error.message },
      { status: 500 }
    );
  }
}
