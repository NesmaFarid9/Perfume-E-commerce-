import { apiGet } from "@/lib/api/client";
import type {
  Product,
  ProductListQuery,
  ProductListResult,
} from "@/features/products/types/product.types";
import type { ProductsService } from "@/features/products/services/products.service";
import { serializeProductListQuery } from "@/features/products/utils/product.utils";

function toQueryString(query: ProductListQuery): string {
  const serialized = serializeProductListQuery(query);
  return serialized ? `?${serialized}` : "";
}

/**
 * HTTP catalog client. Not used while NEXT_PUBLIC_USE_MOCK_API is true.
 */
export const httpProductsService: ProductsService = {
  async list(query) {
    return apiGet<ProductListResult>(`/products${toQueryString(query)}`);
  },

  async getById(id) {
    return apiGet<Product>(`/products/${id}`);
  },
};
