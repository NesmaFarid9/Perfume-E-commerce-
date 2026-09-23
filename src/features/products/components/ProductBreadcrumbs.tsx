/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { productPaths } from "@/features/products/paths";

export type ProductBreadcrumb = {
  label: string;
  href?: string;
};

type ProductBreadcrumbsProps = {
  crumbs?: ProductBreadcrumb[];
};

const DEFAULT_CRUMBS: ProductBreadcrumb[] = [
  { label: "Home", href: productPaths.list },
  { label: "Shop", href: productPaths.list },
  { label: "All Fragrances" },
];

export function ProductBreadcrumbs({
  crumbs = DEFAULT_CRUMBS,
}: ProductBreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 px-4 py-6 sm:px-6 md:px-10 lg:px-20"
    >
      {crumbs.map((crumb, index) => {
        const isLast = index === crumbs.length - 1;

        return (
          <span key={`${crumb.label}-${index}`} className="flex items-center gap-2">
            {crumb.href && !isLast ? (
              <Link
                href={crumb.href}
                className="text-[12px] font-normal whitespace-nowrap text-[#605a54]"
              >
                {crumb.label}
              </Link>
            ) : (
              <span
                className={
                  isLast
                    ? "text-[12px] font-semibold whitespace-nowrap text-[#1a1a1a]"
                    : "text-[12px] font-normal whitespace-nowrap text-[#605a54]"
                }
              >
                {crumb.label}
              </span>
            )}
            {!isLast ? (
              <img src="/icons/chevron-right.svg" alt="" width={10} height={10} />
            ) : null}
          </span>
        );
      })}
    </nav>
  );
}
