import Image from 'next/image';

export default function BrandBanner() {
  const brandLogos = [
    { name: 'VERSACE', src: '/assets/logo/versace.png', width: 166, height: 33 },
    { name: 'ZARA', src: '/assets/logo/zara.png', width: 91, height: 38 },
    { name: 'GUCCI', src: '/assets/logo/gucci.png', width: 156, height: 36 },
    { name: 'PRADA', src: '/assets/logo/prada.png', width: 194, height: 32 },
    { name: 'Calvin Klein', src: '/assets/logo/calvin-klein.png', width: 207, height: 33 },
  ];

  return (
    <section id="brands" className="bg-black py-8 sm:py-11 text-white border-y border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-8 sm:gap-12 text-center">
          {brandLogos.map((brand) => (
            <div key={brand.name} className="relative flex items-center justify-center hover:opacity-80 transition-opacity">
              <Image
                src={brand.src}
                alt={`${brand.name} logo`}
                width={brand.width}
                height={brand.height}
                className="h-7 sm:h-9 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
