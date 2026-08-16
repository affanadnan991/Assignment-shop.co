import Hero from "@/components/home/Hero";
import BrandBanner from "@/components/home/BrandBanner";
import ProductGridSection from "@/components/home/ProductGridSection";
import BrowseByStyle from "@/components/home/BrowseByStyle";
import CustomerReviews from "@/components/home/CustomerReviews";
import { MOCK_PRODUCTS } from "@/data/mockProducts";

export default function Home() {
  const newArrivals = MOCK_PRODUCTS.filter((p) => p.isNewArrival);
  const topSelling = MOCK_PRODUCTS.filter((p) => p.isTopSelling);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Brands Banner */}
      <BrandBanner />

      {/* 3. New Arrivals */}
      <ProductGridSection title="NEW ARRIVALS" products={newArrivals} />

      {/* 4. Top Selling */}
      <ProductGridSection title="TOP SELLING" products={topSelling} />

      {/* 5. Browse By Dress Style */}
      <BrowseByStyle />

      {/* 6. Happy Customers Reviews */}
      <CustomerReviews />
    </div>
  );
}
