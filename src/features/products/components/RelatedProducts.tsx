"use client";

import { ProductCard } from "@/features/products/components/ProductCard";
import { useProducts } from "@/features/products/hooks/useProducts";

type RelatedProductsProps = {
  productId: string;
};

const FEATURED_COMPANION_IDS = [
  "fleur-de-lune",
  "noir-cocoon",
  "sol-dor",
  "rose-absolute",
];

export function RelatedProducts({ productId }: RelatedProductsProps) {
  const productsQuery = useProducts({ pageSize: 20 });
  const companions = (productsQuery.data?.items ?? [])
    .filter((product) => product.id !== productId)
    .sort((left, right) => {
      const leftIndex = FEATURED_COMPANION_IDS.indexOf(left.id);
      const rightIndex = FEATURED_COMPANION_IDS.indexOf(right.id);
      const leftRank = leftIndex === -1 ? FEATURED_COMPANION_IDS.length : leftIndex;
      const rightRank =
        rightIndex === -1 ? FEATURED_COMPANION_IDS.length : rightIndex;

      return leftRank - rightRank;
    })
    .slice(0, 4);

  if (productsQuery.isLoading || companions.length === 0) {
    return null;
  }

  return (
    <section className="flex w-full flex-col items-start gap-8 bg-[#f4f0eb] px-4 py-16 sm:gap-12 sm:px-6 md:px-10 lg:px-20 lg:py-[100px]">
      <div className="flex w-full flex-col items-center gap-3 text-center">
        <h2 className="w-full font-[family-name:var(--font-instrument-serif)] text-[36px] text-[#1a1a1a] sm:text-[48px]">
          Olfactory Companions
        </h2>
        <p className="w-full text-[14px] font-normal uppercase text-[#605a54]">
          Fragrances of synonymous sophistication
        </p>
      </div>
      <div className="grid w-full grid-cols-1 items-start gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {companions.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
