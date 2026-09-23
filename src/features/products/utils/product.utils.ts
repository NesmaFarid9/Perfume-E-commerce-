import type {
  Product,
  ProductListQuery,
  ProductListResult,
  ProductSearchParams,
  ProductSort,
} from "@/features/products/types/product.types";

export const PRODUCT_PRICE_MIN = 100;
export const PRODUCT_PRICE_MAX = 400;
export const DEFAULT_PRODUCT_SORT: ProductSort = "price-desc";
export const DEFAULT_PRODUCT_PAGE_SIZE = 6;

const SORT_VALUES: ProductSort[] = [
  "name-asc",
  "name-desc",
  "price-asc",
  "price-desc",
];

function firstValue(
  value: string | string[] | undefined,
): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

function allValues(value: string | string[] | undefined): string[] {
  if (value == null) {
    return [];
  }

  const parts = Array.isArray(value) ? value : [value];

  return parts
    .flatMap((part) => part.split(","))
    .map((part) => part.trim())
    .filter(Boolean);
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

export function formatWholePrice(amount: number): string {
  return `$${amount}`;
}

export function formatFacetLabel(value: string | string[]): string {
  const values = Array.isArray(value) ? value : [value];

  return values
    .map((item) =>
      item
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" "),
    )
    .join(", ");
}

export function getSelectedUnitPrice(
  product: {
    price: number;
    options: Array<{
      id: string;
      prices?: Record<string, number>;
    }>;
  },
  selectedOptions: Record<string, string>,
): number {
  for (const option of product.options) {
    const selected = selectedOptions[option.id];
    const priced = selected ? option.prices?.[selected] : undefined;

    if (typeof priced === "number") {
      return priced;
    }
  }

  return product.price;
}

export function normalizeFacetValue(value: string): string {
  return value.trim().toLowerCase().replace(/[\s_]+/g, "-");
}

function facetValues(value: unknown): string[] {
  if (value == null) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.flatMap(facetValues);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);
  }

  if (typeof value === "object") {
    const record = value as Record<string, unknown>;
    const nested = record.slug ?? record.id ?? record.name ?? record.label;
    return facetValues(nested);
  }

  return [];
}

function matchesSelectedFacets(
  productValue: unknown,
  selected: string[] | undefined,
): boolean {
  if (!selected?.length) {
    return true;
  }

  const normalizedProductValues = facetValues(productValue).map(
    normalizeFacetValue,
  );
  const normalizedSelected = selected.map(normalizeFacetValue);

  return normalizedSelected.some((value) =>
    normalizedProductValues.includes(value),
  );
}

function selectedCategories(query: ProductListQuery): string[] {
  if (query.categories?.length) {
    return query.categories;
  }

  return query.category ? [query.category] : [];
}

export function parseProductListQuery(
  searchParams: ProductSearchParams,
): ProductListQuery {
  const search = firstValue(searchParams.search)?.trim();
  const categories = allValues(searchParams.category);
  const scentFamilies = allValues(
    searchParams.scentFamily ?? searchParams.scentFamilies,
  );
  const occasions = allValues(searchParams.occasion ?? searchParams.occasions);
  const sortValue = firstValue(searchParams.sort);
  const pageValue = Number(firstValue(searchParams.page));
  const pageSizeValue = Number(firstValue(searchParams.pageSize));
  const minPriceValue = Number(firstValue(searchParams.minPrice));
  const maxPriceValue = Number(firstValue(searchParams.maxPrice));

  const minPrice =
    Number.isFinite(minPriceValue) && minPriceValue > 0
      ? Math.min(PRODUCT_PRICE_MAX, Math.max(PRODUCT_PRICE_MIN, minPriceValue))
      : undefined;
  const maxPrice =
    Number.isFinite(maxPriceValue) && maxPriceValue > 0
      ? Math.min(PRODUCT_PRICE_MAX, Math.max(PRODUCT_PRICE_MIN, maxPriceValue))
      : undefined;

  return {
    search: search || undefined,
    category: categories[0],
    categories: categories.length ? categories : undefined,
    scentFamilies: scentFamilies.length ? scentFamilies : undefined,
    occasions: occasions.length ? occasions : undefined,
    minPrice,
    maxPrice,
    sort: SORT_VALUES.includes(sortValue as ProductSort)
      ? (sortValue as ProductSort)
      : undefined,
    page: Number.isFinite(pageValue) && pageValue > 0 ? pageValue : 1,
    pageSize:
      Number.isFinite(pageSizeValue) && pageSizeValue > 0
        ? pageSizeValue
        : DEFAULT_PRODUCT_PAGE_SIZE,
  };
}

export function serializeProductListQuery(query: ProductListQuery): string {
  const params = new URLSearchParams();
  const categories = selectedCategories(query);

  if (query.search) {
    params.set("search", query.search);
  }

  for (const category of categories) {
    params.append("category", category);
  }

  for (const scentFamily of query.scentFamilies ?? []) {
    params.append("scentFamily", scentFamily);
  }

  for (const occasion of query.occasions ?? []) {
    params.append("occasion", occasion);
  }

  if (
    typeof query.minPrice === "number" &&
    query.minPrice !== PRODUCT_PRICE_MIN
  ) {
    params.set("minPrice", String(query.minPrice));
  }

  if (
    typeof query.maxPrice === "number" &&
    query.maxPrice !== PRODUCT_PRICE_MAX
  ) {
    params.set("maxPrice", String(query.maxPrice));
  }

  if (query.sort && query.sort !== DEFAULT_PRODUCT_SORT) {
    params.set("sort", query.sort);
  }

  if (query.page && query.page > 1) {
    params.set("page", String(query.page));
  }

  if (query.pageSize && query.pageSize !== DEFAULT_PRODUCT_PAGE_SIZE) {
    params.set("pageSize", String(query.pageSize));
  }

  return params.toString();
}

export function productListHref(
  pathname: string,
  query: ProductListQuery,
): string {
  const serialized = serializeProductListQuery(query);
  return serialized ? `${pathname}?${serialized}` : pathname;
}

export function filterProducts(
  products: Product[],
  query: ProductListQuery,
): Product[] {
  const categories = selectedCategories(query);
  const minPrice = query.minPrice ?? PRODUCT_PRICE_MIN;
  const maxPrice = query.maxPrice ?? PRODUCT_PRICE_MAX;

  return products.filter((product) => {
    if (!matchesSelectedFacets(product.category, categories)) {
      return false;
    }

    if (!matchesSelectedFacets(product.scentFamily, query.scentFamilies)) {
      return false;
    }

    if (!matchesSelectedFacets(product.occasion, query.occasions)) {
      return false;
    }

    if (product.price < minPrice || product.price > maxPrice) {
      return false;
    }

    if (query.search) {
      const haystack = `${product.name} ${product.description} ${product.notes}`.toLowerCase();
      if (!haystack.includes(query.search.toLowerCase())) {
        return false;
      }
    }

    return true;
  });
}

export function sortProducts(
  products: Product[],
  sort: ProductSort = DEFAULT_PRODUCT_SORT,
): Product[] {
  const sorted = [...products];

  sorted.sort((left, right) => {
    switch (sort) {
      case "price-asc":
        return left.price - right.price || left.name.localeCompare(right.name);
      case "price-desc":
        return right.price - left.price || left.name.localeCompare(right.name);
      case "name-asc":
        return left.name.localeCompare(right.name);
      case "name-desc":
        return right.name.localeCompare(left.name);
      default:
        return 0;
    }
  });

  return sorted;
}

export function applyProductListQuery(
  products: Product[],
  query: ProductListQuery,
): ProductListResult {
  const filtered = filterProducts(products, query);
  const sorted = sortProducts(filtered, query.sort ?? DEFAULT_PRODUCT_SORT);
  const page = query.page && query.page > 0 ? query.page : 1;
  const pageSize =
    query.pageSize && query.pageSize > 0
      ? query.pageSize
      : DEFAULT_PRODUCT_PAGE_SIZE;
  const start = (page - 1) * pageSize;

  return {
    items: sorted.slice(start, start + pageSize),
    total: sorted.length,
    page,
    pageSize,
  };
}

export function hasActiveProductFilters(query: ProductListQuery): boolean {
  return Boolean(
    selectedCategories(query).length ||
      query.scentFamilies?.length ||
      query.occasions?.length ||
      (typeof query.minPrice === "number" &&
        query.minPrice !== PRODUCT_PRICE_MIN) ||
      (typeof query.maxPrice === "number" &&
        query.maxPrice !== PRODUCT_PRICE_MAX),
  );
}

export function resolvedPriceRange(query: ProductListQuery): {
  minPrice: number;
  maxPrice: number;
} {
  return {
    minPrice: query.minPrice ?? PRODUCT_PRICE_MIN,
    maxPrice: query.maxPrice ?? PRODUCT_PRICE_MAX,
  };
}
