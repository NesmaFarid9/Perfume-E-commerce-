"use client";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { ProductListQuery } from "@/features/products/types/product.types";
import {
  DEFAULT_PRODUCT_SORT,
  PRODUCT_PRICE_MAX,
  PRODUCT_PRICE_MIN,
  hasActiveProductFilters,
  productListHref,
  resolvedPriceRange,
} from "@/features/products/utils/product.utils";

function selectedCategories(query: ProductListQuery): string[] {
  if (query.categories?.length) {
    return query.categories;
  }

  return query.category ? [query.category] : [];
}

function toggleValue(values: string[], id: string) {
  return values.includes(id)
    ? values.filter((value) => value !== id)
    : [...values, id];
}

export function useProductFilters(query: ProductListQuery) {
  const router = useRouter();
  const pathname = usePathname();
  const categories = selectedCategories(query);
  const scentFamilies = query.scentFamilies ?? [];
  const occasions = query.occasions ?? [];
  const { minPrice, maxPrice } = resolvedPriceRange(query);

  const replaceQuery = useCallback(
    (next: ProductListQuery) => {
      router.replace(productListHref(pathname, next), { scroll: false });
    },
    [pathname, router],
  );

  const update = useCallback(
    (patch: Partial<ProductListQuery>) => {
      replaceQuery({
        ...query,
        ...patch,
        category: undefined,
        page: 1,
      });
    },
    [query, replaceQuery],
  );

  return {
    categories,
    scentFamilies,
    occasions,
    minPrice,
    maxPrice,
    hasActiveFilters: hasActiveProductFilters(query),
    toggleCategory: (id: string) =>
      update({ categories: toggleValue(categories, id) }),
    toggleScentFamily: (id: string) =>
      update({ scentFamilies: toggleValue(scentFamilies, id) }),
    toggleOccasion: (id: string) =>
      update({ occasions: toggleValue(occasions, id) }),
    setPriceRange: (nextMin: number, nextMax: number) =>
      update({
        minPrice: Math.min(nextMin, nextMax),
        maxPrice: Math.max(nextMin, nextMax),
      }),
    setPage: (page: number) =>
      replaceQuery({
        ...query,
        page,
      }),
    clearFilters: () =>
      replaceQuery({
        search: query.search,
        sort: query.sort ?? DEFAULT_PRODUCT_SORT,
        page: 1,
        pageSize: query.pageSize,
        minPrice: PRODUCT_PRICE_MIN,
        maxPrice: PRODUCT_PRICE_MAX,
      }),
  };
}
