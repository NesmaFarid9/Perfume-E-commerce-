"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";
import {
  PRODUCT_PRICE_MAX,
  PRODUCT_PRICE_MIN,
} from "@/features/products/utils/product.utils";

type FilterOption = {
  id: string;
  label: string;
};

type CheckboxTone = "gold" | "ink";

const CATEGORIES: FilterOption[] = [
  { id: "pure-extractions", label: "Pure Extractions" },
  { id: "private-reserve", label: "Private Reserve" },
  { id: "atelier-oils", label: "Atelier Oils" },
  { id: "discovery-vault", label: "Discovery Vault" },
];

const SCENT_FAMILIES: FilterOption[] = [
  { id: "floral", label: "Floral" },
  { id: "woody", label: "Woody" },
  { id: "oriental", label: "Oriental" },
  { id: "fresh", label: "Fresh" },
];

const OCCASIONS: FilterOption[] = [
  { id: "personal-use", label: "Personal Use" },
  { id: "wedding", label: "Wedding" },
  { id: "gift-sets", label: "Gift Sets" },
  { id: "birthday", label: "Birthday" },
];

function FilterCheckbox({
  option,
  checked,
  tone,
  onChange,
}: {
  option: FilterOption;
  checked: boolean;
  tone: CheckboxTone;
  onChange: () => void;
}) {
  return (
    <label className="flex w-full cursor-pointer items-center gap-2.5">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
      />
      <span
        className={cn(
          "size-4 shrink-0 rounded-[2px] border border-solid border-[#ebe6de]",
          checked && tone === "gold" && "bg-[#c5a880]",
          checked && tone === "ink" && "bg-[#1a1a1a]",
          !checked && "bg-white",
        )}
      />
      <span className="text-[13px] font-normal whitespace-nowrap text-[#1a1a1a]">
        {option.label}
      </span>
    </label>
  );
}

function FilterBlock({
  title,
  options,
  selected,
  tone,
  onToggle,
}: {
  title: string;
  options: FilterOption[];
  selected: string[];
  tone: CheckboxTone;
  onToggle: (id: string) => void;
}) {
  return (
    <div className="flex w-full flex-col items-start gap-4">
      <p className="text-[12px] font-bold uppercase whitespace-nowrap text-[#1a1a1a]">
        {title}
      </p>
      <div className="flex w-full flex-col items-start gap-3">
        {options.map((option) => (
          <FilterCheckbox
            key={option.id}
            option={option}
            tone={tone}
            checked={selected.includes(option.id)}
            onChange={() => onToggle(option.id)}
          />
        ))}
      </div>
    </div>
  );
}

function PriceRangeSlider({
  minPrice,
  maxPrice,
  onChange,
}: {
  minPrice: number;
  maxPrice: number;
  onChange: (minPrice: number, maxPrice: number) => void;
}) {
  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice);

  useEffect(() => {
    setLocalMin(minPrice);
    setLocalMax(maxPrice);
  }, [maxPrice, minPrice]);

  const span = PRODUCT_PRICE_MAX - PRODUCT_PRICE_MIN;
  const minPct = ((localMin - PRODUCT_PRICE_MIN) / span) * 100;
  const maxPct = ((localMax - PRODUCT_PRICE_MIN) / span) * 100;

  const commit = (nextMin: number, nextMax: number) => {
    const clampedMin = Math.min(nextMin, nextMax);
    const clampedMax = Math.max(nextMin, nextMax);
    setLocalMin(clampedMin);
    setLocalMax(clampedMax);
    onChange(clampedMin, clampedMax);
  };

  return (
    <div className="flex w-full flex-col items-start gap-4">
      <p className="text-[12px] font-bold uppercase whitespace-nowrap text-[#1a1a1a]">
        Price Range
      </p>
      <div className="flex w-full max-w-[260px] flex-col items-start gap-3 lg:max-w-none">
        <div className="relative flex h-4 w-full items-center">
          <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 bg-[#ebe6de]" />
          <div
            className="absolute top-1/2 h-1 -translate-y-1/2 bg-[#c5a880]"
            style={{ left: `${minPct}%`, width: `${Math.max(maxPct - minPct, 0)}%` }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icons/slider-handle.svg"
            alt=""
            width={16}
            height={16}
            className="pointer-events-none absolute top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${minPct}%` }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icons/slider-handle.svg"
            alt=""
            width={16}
            height={16}
            className="pointer-events-none absolute top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${maxPct}%` }}
          />
          <input
            type="range"
            min={PRODUCT_PRICE_MIN}
            max={PRODUCT_PRICE_MAX}
            step={1}
            value={localMin}
            aria-label="Minimum price"
            className="absolute inset-0 z-[2] h-4 w-full cursor-pointer appearance-none bg-transparent [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-transparent [&::-moz-range-track]:bg-transparent [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-[2] [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-transparent"
            style={{ zIndex: localMin > PRODUCT_PRICE_MAX - 40 ? 4 : 2 }}
            onChange={(event) => {
              const nextMin = Math.min(Number(event.target.value), localMax);
              commit(nextMin, localMax);
            }}
          />
          <input
            type="range"
            min={PRODUCT_PRICE_MIN}
            max={PRODUCT_PRICE_MAX}
            step={1}
            value={localMax}
            aria-label="Maximum price"
            className="absolute inset-0 z-[3] h-4 w-full cursor-pointer appearance-none bg-transparent [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-transparent [&::-moz-range-track]:bg-transparent [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-[3] [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-transparent"
            onChange={(event) => {
              const nextMax = Math.max(Number(event.target.value), localMin);
              commit(localMin, nextMax);
            }}
          />
        </div>
        <div className="flex w-full items-start justify-between text-[12px] font-normal whitespace-nowrap text-[#1a1a1a]">
          <p>${localMin}</p>
          <p>${localMax}</p>
        </div>
      </div>
    </div>
  );
}

type ProductFiltersProps = {
  categories: string[];
  scentFamilies: string[];
  occasions: string[];
  minPrice: number;
  maxPrice: number;
  hasActiveFilters: boolean;
  onToggleCategory: (id: string) => void;
  onToggleScentFamily: (id: string) => void;
  onToggleOccasion: (id: string) => void;
  onPriceChange: (minPrice: number, maxPrice: number) => void;
  onReset: () => void;
};

export function ProductFilters({
  categories,
  scentFamilies,
  occasions,
  minPrice,
  maxPrice,
  hasActiveFilters,
  onToggleCategory,
  onToggleScentFamily,
  onToggleOccasion,
  onPriceChange,
  onReset,
}: ProductFiltersProps) {
  const [open, setOpen] = useState(false);
  const selectedCount =
    categories.length +
    scentFamilies.length +
    occasions.length +
    (minPrice !== PRODUCT_PRICE_MIN || maxPrice !== PRODUCT_PRICE_MAX ? 1 : 0);

  return (
    <aside className="w-full shrink-0 lg:w-[260px]">
      <button
        type="button"
        className="flex w-full items-center justify-between rounded border border-solid border-[#ebe6de] bg-white px-4 py-3 text-[12px] font-semibold uppercase text-[#1a1a1a] lg:hidden"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <span>
          Filters{selectedCount > 0 ? ` (${selectedCount})` : ""}
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icons/chevron-down.svg"
          alt=""
          width={14}
          height={14}
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>
      <div
        className={cn(
          "flex-col items-start gap-8",
          open ? "mt-6 flex" : "hidden",
          "lg:mt-0 lg:flex",
        )}
      >
        <FilterBlock
          title="Category"
          options={CATEGORIES}
          selected={categories}
          tone="gold"
          onToggle={onToggleCategory}
        />
        <div className="h-px w-full bg-[#ebe6de]" />
        <FilterBlock
          title="Scent Family"
          options={SCENT_FAMILIES}
          selected={scentFamilies}
          tone="ink"
          onToggle={onToggleScentFamily}
        />
        <div className="h-px w-full bg-[#ebe6de]" />
        <FilterBlock
          title="Occasion"
          options={OCCASIONS}
          selected={occasions}
          tone="ink"
          onToggle={onToggleOccasion}
        />
        <div className="h-px w-full bg-[#ebe6de]" />
        <PriceRangeSlider
          minPrice={minPrice}
          maxPrice={maxPrice}
          onChange={onPriceChange}
        />
        {hasActiveFilters ? (
          <button
            type="button"
            className="text-[12px] font-semibold uppercase text-[#c5a880]"
            onClick={onReset}
          >
            Clear filters
          </button>
        ) : null}
      </div>
    </aside>
  );
}
