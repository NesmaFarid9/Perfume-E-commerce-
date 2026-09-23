"use client";

import { useCart } from "@/features/cart/hooks/useCart";
import type { AddToCartInput } from "@/features/cart/types/cart.types";
import { formatWholePrice } from "@/features/products/utils/product.utils";

type AddToCartButtonProps = AddToCartInput & {
  quantity?: number;
  label?: string;
};

export function AddToCartButton({
  quantity = 1,
  label,
  ...props
}: AddToCartButtonProps) {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      className="flex min-w-0 flex-1 items-center justify-center rounded py-4 text-[13px] font-bold uppercase text-white bg-[#1a1a1a] hover:cursor-pointer"
      onClick={() => addItem(props, quantity)}
    >
      {label ?? `Add to Cart / ${formatWholePrice(props.price)}`}
    </button>
  );
}
