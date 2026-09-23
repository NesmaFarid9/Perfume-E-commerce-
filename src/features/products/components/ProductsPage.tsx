"use client";

import { ProductBreadcrumbs } from "@/features/products/components/ProductBreadcrumbs";
import { ProductFilters } from "@/features/products/components/ProductFilters";
import { ProductGrid } from "@/features/products/components/ProductGrid";
import { ProductPagination } from "@/features/products/components/ProductPagination";
import { ProductSortControl } from "@/features/products/components/ProductSort";
import { useProductFilters } from "@/features/products/hooks/useProductFilters";
import { useProductSort } from "@/features/products/hooks/useProductSort";
import { useProducts } from "@/features/products/hooks/useProducts";
import type { ProductSearchParams } from "@/features/products/types/product.types";
import {
  DEFAULT_PRODUCT_PAGE_SIZE,
  parseProductListQuery,
} from "@/features/products/utils/product.utils";

type ProductsPageProps = {
  searchParams: ProductSearchParams;
};

export function ProductsPage({ searchParams }: ProductsPageProps) {
  const query = parseProductListQuery(searchParams);
  const productsQuery = useProducts(query);
  const filters = useProductFilters(query);
  const sorting = useProductSort(query);
  const total = productsQuery.data?.total ?? 0;
  const page = productsQuery.data?.page ?? query.page ?? 1;
  const pageSize =
    productsQuery.data?.pageSize ?? query.pageSize ?? DEFAULT_PRODUCT_PAGE_SIZE;

  return (
    <section className="overflow-x-hidden bg-[#faf8f5] text-[#1a1a1a]">
      <ProductBreadcrumbs />
      <div className="flex w-full flex-col items-start px-4 pb-8 sm:px-6 md:px-10 lg:px-20 lg:pb-10">
        <h1 className="w-full font-[family-name:var(--font-instrument-serif)] text-[40px] leading-tight text-[#1a1a1a] sm:text-[52px] lg:text-[64px] lg:leading-normal">
          All Fragrances
        </h1>
        <p className="mt-2 w-full text-[14px] font-normal text-[#605a54] sm:mt-0">
          Cultivated formulations curated to command atmospheric space.
        </p>
      </div>
      <div className="flex flex-col items-stretch gap-8 px-4 pb-16 sm:px-6 md:px-10 lg:flex-row lg:items-start lg:gap-12 lg:px-20 lg:pb-[100px]">
        <ProductFilters
          categories={filters.categories}
          scentFamilies={filters.scentFamilies}
          occasions={filters.occasions}
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          hasActiveFilters={filters.hasActiveFilters}
          onToggleCategory={filters.toggleCategory}
          onToggleScentFamily={filters.toggleScentFamily}
          onToggleOccasion={filters.toggleOccasion}
          onPriceChange={filters.setPriceRange}
          onReset={filters.clearFilters}
        />
        <div className="flex min-w-0 flex-1 flex-col items-start gap-6">
          <ProductSortControl
            value={sorting.sort}
            availableCount={total}
            onChange={sorting.setSort}
          />
          <ProductGrid
            products={productsQuery.data?.items ?? []}
            isLoading={productsQuery.isLoading}
            onClearFilters={
              filters.hasActiveFilters ? filters.clearFilters : undefined
            }
          />
          <ProductPagination
            page={page}
            pageSize={pageSize}
            total={total}
            onPageChange={filters.setPage}
          />
        </div>
      </div>
    </section>
  );
}
