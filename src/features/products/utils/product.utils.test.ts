import type { Product } from "@/features/products/types/product.types";
import {
  applyProductListQuery,
  filterProducts,
  parseProductListQuery,
  sortProducts,
} from "./product.utils";
import { formatPrice } from "./product.utils";

describe("formatPrice", () => {
  it("formats a USD amount", () => {
    expect(formatPrice(12.5)).toBe("$12.50");
  });
});

describe("parseProductListQuery", () => {
  it("reads list query values from search params", () => {
    expect(
      parseProductListQuery({
        search: "mug",
        category: "home",
        sort: "price-asc",
        page: "2",
        pageSize: "4",
      }),
    ).toEqual({
      search: "mug",
      category: "home",
      categories: ["home"],
      scentFamilies: undefined,
      occasions: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      sort: "price-asc",
      page: 2,
      pageSize: 4,
    });
  });

  it("reads repeated facet and inclusive price params", () => {
    expect(
      parseProductListQuery({
        category: ["pure-extractions", "atelier-oils"],
        scentFamily: "Floral",
        occasion: ["wedding", "gift-sets"],
        minPrice: "100",
        maxPrice: "400",
      }),
    ).toMatchObject({
      categories: ["pure-extractions", "atelier-oils"],
      scentFamilies: ["Floral"],
      occasions: ["wedding", "gift-sets"],
      minPrice: 100,
      maxPrice: 400,
    });
  });
});

const catalog: Product[] = [
  {
    id: "alpha",
    name: "Alpha Rose",
    description: "Floral",
    notes: "Floral",
    price: 100,
    images: [],
    category: "pure-extractions",
    scentFamily: "floral",
    occasion: "wedding",
    options: [],
  },
  {
    id: "beta",
    name: "Beta Wood",
    description: "Woody",
    notes: "Woody",
    price: 150,
    images: [],
    category: "pure-extractions",
    scentFamily: "Woody",
    occasion: ["personal-use", "Wedding"],
    options: [],
  },
  {
    id: "gamma",
    name: "Gamma Oud",
    description: "Oriental",
    notes: "Oriental",
    price: 400,
    images: [],
    category: "atelier-oils",
    scentFamily: "oriental",
    occasion: "gift-sets",
    options: [],
  },
  {
    id: "delta",
    name: "Delta Fresh",
    description: "Fresh",
    notes: "Fresh",
    price: 99,
    images: [],
    category: "private-reserve",
    scentFamily: "fresh",
    occasion: "birthday",
    options: [],
  },
  {
    id: "epsilon",
    name: "Epsilon Reserve",
    description: "Floral",
    notes: "Floral",
    price: 401,
    images: [],
    category: "private-reserve",
    scentFamily: "floral",
    occasion: "wedding",
    options: [],
  },
];

function ids(products: Product[]) {
  return products.map((product) => product.id);
}

describe("filterProducts", () => {
  it("returns the full in-range catalog when no facet filters are set", () => {
    expect(ids(filterProducts(catalog, {}))).toEqual(["alpha", "beta", "gamma"]);
  });

  it("filters by category", () => {
    expect(
      ids(filterProducts(catalog, { categories: ["atelier-oils"] })),
    ).toEqual(["gamma"]);
  });

  it("filters by scent family regardless of capitalization", () => {
    expect(
      ids(filterProducts(catalog, { scentFamilies: ["woody"] })),
    ).toEqual(["beta"]);
  });

  it("filters by occasion and includes products with multiple occasions", () => {
    expect(ids(filterProducts(catalog, { occasions: ["wedding"] }))).toEqual([
      "alpha",
      "beta",
    ]);
  });

  it("uses OR within a facet and AND across facets", () => {
    expect(
      ids(
        filterProducts(catalog, {
          categories: ["pure-extractions", "atelier-oils"],
          scentFamilies: ["floral", "woody"],
          occasions: ["wedding"],
        }),
      ),
    ).toEqual(["alpha", "beta"]);
  });

  it("includes prices at $100 and $400 and excludes values outside the range", () => {
    expect(
      ids(
        filterProducts(catalog, {
          minPrice: 100,
          maxPrice: 400,
        }),
      ),
    ).toEqual(["alpha", "beta", "gamma"]);
  });

  it("combines facets with the selected price range", () => {
    expect(
      ids(
        filterProducts(catalog, {
          categories: ["pure-extractions"],
          scentFamilies: ["floral"],
          occasions: ["wedding"],
          minPrice: 100,
          maxPrice: 400,
        }),
      ),
    ).toEqual(["alpha"]);
  });
});

describe("sortProducts", () => {
  it("sorts a copy by price and name without mutating the source", () => {
    const source = catalog.slice(0, 3);
    const original = [...source];

    expect(ids(sortProducts(source, "price-asc"))).toEqual([
      "alpha",
      "beta",
      "gamma",
    ]);
    expect(ids(sortProducts(source, "name-desc"))).toEqual([
      "gamma",
      "beta",
      "alpha",
    ]);
    expect(source).toEqual(original);
  });
});

describe("applyProductListQuery", () => {
  it("filters, sorts, then paginates", () => {
    const result = applyProductListQuery(catalog, {
      minPrice: 100,
      maxPrice: 400,
      sort: "price-asc",
      page: 1,
      pageSize: 2,
    });

    expect(ids(result.items)).toEqual(["alpha", "beta"]);
    expect(result.total).toBe(3);
  });
});
