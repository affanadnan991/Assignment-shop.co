import { NextRequest, NextResponse } from 'next/server';
import productsData from '@/data/products.json';
import { Product } from '@/types';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const products: Product[] = productsData.products as Product[];
    const current = products.find((p) => p.id === id || p.slug === id);

    let related: Product[] = [];
    if (current) {
      related = products
        .filter((p) => p.category === current.category && p.id !== current.id)
        .slice(0, 4);
    }
    if (related.length === 0) {
      related = products.filter((p) => p.id !== id).slice(0, 4);
    }

    return NextResponse.json({ success: true, count: related.length, data: related });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: 'Server Error', error: error.message },
      { status: 500 }
    );
  }
}
