import { NextResponse } from 'next/server';
import productsData from '@/data/products.json';
import { Review } from '@/types';

export async function GET() {
  try {
    const reviews: Review[] = productsData.reviews as Review[];
    return NextResponse.json({ success: true, count: reviews.length, data: reviews });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Server Error', error: error.message },
      { status: 500 }
    );
  }
}
