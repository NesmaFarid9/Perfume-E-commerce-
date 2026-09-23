"use client";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import type {
  ProductListQuery,
  ProductSort,
} from "@/features/products/types/product.types";
import {
  DEFAULT_PRODUCT_SORT,
  productListHref,
} from "@/features/products/utils/product.utils";

export function useProductSort(query: ProductListQuery) {
  const router = useRouter();
  const pathname = usePathname();
  const sort = query.sort ?? DEFAULT_PRODUCT_SORT;

  const setSort = useCallback(
    (value: ProductSort) => {
      router.replace(
        productListHref(pathname, {
          ...query,
          sort: value,
          page: 1,
        }),
        { scroll: false },
      );
    },
    [pathname, query, router],
  );

  return {
    sort,
    setSort,
  };
}
