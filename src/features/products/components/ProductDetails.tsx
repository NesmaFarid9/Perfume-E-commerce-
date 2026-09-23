/* eslint-disable @next/next/no-img-element */
import type { Product } from "@/features/products/types/product.types";
import {
  formatFacetLabel,
  formatWholePrice,
} from "@/features/products/utils/product.utils";

type ProductDetailsProps = {
  product: Product;
  unitPrice: number;
};

/** US-04: product information. */
export function ProductDetails({ product, unitPrice }: ProductDetailsProps) {
  return (
    <div className="flex w-full flex-col items-start gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-[#f2ede4] px-2.5 py-1 text-[11px] font-semibold uppercase whitespace-nowrap text-[#1a1a1a]">
          Scent Family: {formatFacetLabel(product.scentFamily)}
        </span>
        <span className="rounded-full bg-[#f4f0eb] px-2.5 py-1 text-[11px] font-semibold uppercase whitespace-nowrap text-[#605a54]">
          Occasion: {formatFacetLabel(product.occasion)}
        </span>
      </div>
      <h1 className="font-[family-name:var(--font-instrument-serif)] text-[36px] leading-tight text-[#1a1a1a] sm:text-[48px] sm:leading-normal">
        {product.name}
      </h1>
      <div className="flex w-full items-center justify-between gap-4">
        <p className="text-[24px] font-semibold whitespace-nowrap text-[#1a1a1a]">
          {formatWholePrice(unitPrice)}
        </p>
        <div className="flex items-center gap-1.5">
          <img src="/icons/status-dot.svg" alt="" width={8} height={8} />
          <p className="text-[13px] font-semibold whitespace-nowrap text-[#10b981]">
            Available in Atelier
          </p>
        </div>
      </div>
    </div>
  );
}
