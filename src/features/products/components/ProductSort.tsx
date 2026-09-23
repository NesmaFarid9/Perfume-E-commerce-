"use client";

import { useEffect, useRef, useState } from "react";
import type { ProductSort } from "@/features/products/types/product.types";
import { cn } from "@/lib/utils/cn";

type ProductSortControlProps = {
  value?: ProductSort;
  availableCount: number;
  onChange?: (value: ProductSort) => void;
};

const SORT_OPTIONS: Array<{ value: ProductSort; label: string }> = [
  { value: "price-desc", label: "Price: High to Low" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
];

export function ProductSortControl({
  value = "price-desc",
  availableCount,
  onChange,
}: ProductSortControlProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLLabelElement>(null);
  const selected =
    SORT_OPTIONS.find((option) => option.value === value) ?? SORT_OPTIONS[0];

  useEffect(() => {
    if (!open) {
      return;
    }

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="flex w-full flex-col gap-3 border-b border-solid border-[#ebe6de] pb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <p className="text-[12px] font-normal uppercase text-[#605a54]">
        {availableCount} fragrances available
      </p>
      <label ref={rootRef} className="relative flex shrink-0 items-center gap-2">
        <span className="text-[12px] font-semibold whitespace-nowrap text-[#1a1a1a]">
          Sort by:
        </span>
        <button
          type="button"
          aria-label="Sort products"
          aria-haspopup="listbox"
          aria-expanded={open}
          className="cursor-pointer appearance-none bg-transparent pr-5 text-left text-[12px] font-semibold whitespace-nowrap text-[#c5a880] outline-none"
          onClick={() => setOpen((current) => !current)}
        >
          {selected.label}
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icons/chevron-down.svg"
          alt=""
          width={14}
          height={14}
          className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2"
        />
        {open ? (
          <ul
            role="listbox"
            aria-label="Sort products"
            className="absolute right-0 top-[calc(100%+10px)] z-50 min-w-[220px] overflow-hidden rounded-lg border border-solid border-[#ebe6de] bg-white py-1.5 shadow-[0_12px_32px_rgba(26,26,26,0.12)]"
          >
            {SORT_OPTIONS.map((option) => {
              const isSelected = option.value === selected.value;

              return (
                <li key={option.value} role="option" aria-selected={isSelected}>
                  <button
                    type="button"
                    className={cn(
                      "flex w-full items-center justify-between px-3.5 py-2.5 text-left text-[13px] transition-colors",
                      isSelected
                        ? "bg-[#faf8f5] font-semibold text-[#1a1a1a]"
                        : "font-normal text-[#605a54] hover:bg-[#faf8f5] hover:text-[#1a1a1a]",
                    )}
                    onClick={() => {
                      onChange?.(option.value);
                      setOpen(false);
                    }}
                  >
                    <span>{option.label}</span>
                    {isSelected ? (
                      <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#c5a880]">
                        Selected
                      </span>
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </label>
    </div>
  );
}
