"use client";

import Link from "next/link";
import { useCart } from "@/features/cart/hooks/useCart";
import { cartPaths } from "@/features/cart/paths";

export function CartNavLink() {
  const { quantity } = useCart();

  return (
    <Link
      href={cartPaths.cart}
      aria-label={`Cart${quantity > 0 ? `, ${quantity} item${quantity !== 1 ? "s" : ""}` : ""}`}
      className="relative flex items-center text-[#605a54] transition-colors hover:cursor-pointer hover:text-[#1a1a1a]"
    >
      {/* Bag icon */}
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      {quantity > 0 && (
        <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#C5A880] text-[9px] font-bold text-white">
          {quantity}
        </span>
      )}
    </Link>
  );
}
