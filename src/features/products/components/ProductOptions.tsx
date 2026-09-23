"use client";

import { Select } from "@/components/ui/Select";
import { cn } from "@/lib/utils/cn";
import type { Product } from "@/features/products/types/product.types";
import { formatWholePrice } from "@/features/products/utils/product.utils";

type ProductOptionsProps = {
  product: Product;
  selectedOptions: Record<string, string>;
  onChange: (optionId: string, value: string) => void;
};

/** US-04: selectable product options. */
export function ProductOptions({
  product,
  selectedOptions,
  onChange,
}: ProductOptionsProps) {
  if (product.options.length === 0) {
    return null;
  }

  return (
    <div className="flex w-full flex-col gap-8">
      {product.options.map((option) => {
        const selected = selectedOptions[option.id] ?? option.values[0];

        if (option.prices) {
          return (
            <div key={option.id} className="flex w-full flex-col items-start gap-3">
              <p className="text-[12px] font-bold uppercase text-[#1a1a1a]">
                {option.name}
              </p>
              <div className="flex w-full items-start gap-3">
                {option.values.map((value) => {
                  const isSelected = selected === value;

                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => onChange(option.id, value)}
                      className={cn(
                        "flex min-w-0 flex-1 flex-col items-center gap-1 rounded p-3",
                        isSelected
                          ? "border-2 border-solid border-[#1a1a1a] bg-white"
                          : "border border-solid border-[#ebe6de]",
                      )}
                    >
                      <span
                        className={cn(
                          "text-[14px] text-[#1a1a1a]",
                          isSelected ? "font-bold" : "font-medium",
                        )}
                      >
                        {value}
                      </span>
                      <span className="text-[11px] font-normal text-[#605a54]">
                        {formatWholePrice(option.prices?.[value] ?? 0)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        }

        return (
          <label key={option.id} className="block">
            <span className="mb-1 block text-sm font-medium">{option.name}</span>
            <Select
              value={selected}
              onChange={(event) => onChange(option.id, event.target.value)}
            >
              {option.values.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </Select>
          </label>
        );
      })}
    </div>
  );
}
