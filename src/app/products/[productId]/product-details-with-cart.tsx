"use client";

import { AddToCartButton } from "@/features/cart";
import { ProductDetailsPage } from "@/features/products";

type ProductDetailsWithCartProps = {
  productId: string;
};

export function ProductDetailsWithCart({
  productId,
}: ProductDetailsWithCartProps) {
  return (
    <ProductDetailsPage
      productId={productId}
      actions={({ product, selectedOptions, quantity, unitPrice }) => (
        <AddToCartButton
          productId={product.id}
          name={product.name}
          price={unitPrice}
          image={product.images[0]}
          selectedOptions={selectedOptions}
          quantity={quantity}
        />
      )}
    />
  );
}
