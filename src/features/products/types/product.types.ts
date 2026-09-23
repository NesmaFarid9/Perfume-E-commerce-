export type ProductId = string;

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
  prices?: Record<string, number>;
  defaultValue?: string;
};

export type ScentAnatomy = {
  topNotes: string;
  heartNotes: string;
  baseNotes: string;
};

export type Product = {
  id: ProductId;
  name: string;
  description: string;
  notes: string;
  price: number;
  images: string[];
  category: string | string[];
  scentFamily: string | string[];
  occasion: string | string[];
  options: ProductOption[];
  scentAnatomy?: ScentAnatomy;
};

export type ProductSort =
  | "name-asc"
  | "name-desc"
  | "price-asc"
  | "price-desc";

export type ProductListQuery = {
  search?: string;
  category?: string;
  categories?: string[];
  scentFamilies?: string[];
  occasions?: string[];
  minPrice?: number;
  maxPrice?: number;
  sort?: ProductSort;
  page?: number;
  pageSize?: number;
};

export type ProductListResult = {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
};

export type ProductSearchParams = Record<
  string,
  string | string[] | undefined
>;
