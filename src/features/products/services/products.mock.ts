import { mockProducts } from "@/features/products/services/products.mock-data";
import type { ProductsService } from "@/features/products/services/products.service";
import { applyProductListQuery } from "@/features/products/utils/product.utils";

/**
 * In-memory catalog used while no backend exists.
 */
export const mockProductsService: ProductsService = {
  async list(query) {
    return applyProductListQuery(mockProducts, query);
  },

  async getById(id) {
    return mockProducts.find((product) => product.id === id) ?? null;
  },
};
