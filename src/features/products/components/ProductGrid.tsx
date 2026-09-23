import { ProductCard } from "@/features/products/components/ProductCard";
import type { Product } from "@/features/products/types/product.types";

type ProductGridProps = {
  products: Product[];
  isLoading?: boolean;
  onClearFilters?: () => void;
};

export function ProductGrid({
  products,
  isLoading = false,
  onClearFilters,
}: ProductGridProps) {
  if (isLoading) {
    return <p className="text-sm text-[#605a54]">Loading products...</p>;
  }

  if (products.length === 0) {
    return (
      <div className="flex w-full flex-col items-start gap-4 rounded-lg bg-white p-8">
        <h2 className="font-[family-name:var(--font-instrument-serif)] text-[28px] text-[#1a1a1a]">
          No products found
        </h2>
        <p className="text-[14px] font-normal text-[#605a54]">
          Try adjusting your filters to see more fragrances.
        </p>
        {onClearFilters ? (
          <button
            type="button"
            className="rounded border border-solid border-[#ebe6de] px-4 py-3 text-[11px] font-semibold uppercase text-[#1a1a1a]"
            onClick={onClearFilters}
          >
            Clear filters
          </button>
        ) : null}
      </div>
    );
  }

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
