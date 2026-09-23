"use client";

import { useMemo, useState, type ReactNode } from "react";
import { GiftWrappingToggle } from "@/features/products/components/GiftWrappingToggle";
import { ProductBreadcrumbs } from "@/features/products/components/ProductBreadcrumbs";
import { ProductDetails } from "@/features/products/components/ProductDetails";
import { ProductImages } from "@/features/products/components/ProductImages";
import { ProductOptions } from "@/features/products/components/ProductOptions";
import { RelatedProducts } from "@/features/products/components/RelatedProducts";
import { ScentAnatomy } from "@/features/products/components/ScentAnatomy";
import { useProduct } from "@/features/products/hooks/useProduct";
import { productPaths } from "@/features/products/paths";
import type { Product } from "@/features/products/types/product.types";
import { getSelectedUnitPrice } from "@/features/products/utils/product.utils";

export type ProductDetailsActionsContext = {
  product: Product;
  selectedOptions: Record<string, string>;
  quantity: number;
  unitPrice: number;
};

type ProductDetailsPageProps = {
  productId: string;
  actions?: (context: ProductDetailsActionsContext) => ReactNode;
};

export function ProductDetailsPage({
  productId,
  actions,
}: ProductDetailsPageProps) {
  const productQuery = useProduct(productId);
  const product = productQuery.data;
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});
  const [quantity, setQuantity] = useState(1);
  const [giftWrapping, setGiftWrapping] = useState(true);

  const resolvedOptions = useMemo(() => {
    if (!product) {
      return selectedOptions;
    }

    return {
      ...Object.fromEntries(
        product.options.map((option) => [
          option.id,
          selectedOptions[option.id] ?? option.defaultValue ?? option.values[0],
        ]),
      ),
      giftWrapping: giftWrapping ? "Yes" : "No",
    };
  }, [giftWrapping, product, selectedOptions]);

  const unitPrice = product
    ? getSelectedUnitPrice(product, resolvedOptions)
    : 0;

  if (productQuery.isLoading) {
    return <p className="px-4 py-8 text-sm text-[#605a54]">Loading product...</p>;
  }

  if (!product) {
    return <p className="px-4 py-8 text-sm text-[#605a54]">Product not found.</p>;
  }

  return (
    <section className="overflow-x-hidden bg-[#faf8f5] text-[#1a1a1a]">
      <ProductBreadcrumbs
        crumbs={[
          { label: "Home", href: productPaths.list },
          { label: "Shop", href: productPaths.list },
          { label: "Fragrances", href: productPaths.list },
          { label: product.name },
        ]}
      />
      <div className="flex w-full flex-col items-start gap-10 px-4 pb-16 sm:px-6 md:px-10 lg:flex-row lg:gap-16 lg:px-20 lg:pb-[100px]">
    
          <div className="flex w-full justify-center lg:justify-start">
        <ProductImages product={product} />
         </div>
        <div className="flex w-full flex-col items-start gap-8 lg:w-[560px] lg:shrink-0">
          <ProductDetails product={product} unitPrice={unitPrice} />
          <div className="h-px w-full bg-[#ebe6de]" />
          <ProductOptions
            product={product}
            selectedOptions={resolvedOptions}
            onChange={(optionId, value) =>
              setSelectedOptions((current) => ({
                ...current,
                [optionId]: value,
              }))
            }
          />
          <GiftWrappingToggle
            enabled={giftWrapping}
            onChange={setGiftWrapping}
          />
          <div className="flex w-full items-center gap-4">
            <div className="flex shrink-0 items-center gap-5 rounded border border-solid border-[#ebe6de] px-4 py-3.5">
              <button
                type="button"
                aria-label="Decrease quantity"
                className="text-[16px] font-normal text-[#605a54] hover:cursor-pointer"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
              >
                -
              </button>
              <span className="text-[14px] font-semibold text-[#1a1a1a]">
                {quantity}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                className="text-[16px] font-normal text-[#605a54] hover:cursor-pointer"
                onClick={() => setQuantity((current) => current + 1)}
              >
                +
              </button>
            </div>
            {actions?.({
              product,
              selectedOptions: resolvedOptions,
              quantity,
              unitPrice,
            })}
          </div>
          <div className="h-px w-full bg-[#ebe6de]" />
          <ScentAnatomy product={product} />
        </div>
      </div>
     
      <RelatedProducts productId={product.id} />
    </section>
  );
}
