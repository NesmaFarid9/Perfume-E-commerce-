/* eslint-disable @next/next/no-img-element */

type ProductPaginationProps = {
  page: number;
  pageSize: number;
  total: number;
  onPageChange?: (page: number) => void;
};

export function ProductPagination({
  page,
  pageSize,
  total,
  onPageChange,
}: ProductPaginationProps) {
  if (total === 0) {
    return null;
  }

  const pageCount = Math.max(1, Math.ceil(total / pageSize));

  return (
    <div className="flex w-full items-center justify-center gap-4 pt-8 lg:pt-10">
      <button
        type="button"
        className="rounded border border-solid border-[#ebe6de] p-3 disabled:opacity-40 hover:cursor-pointer"
        disabled={page <= 1}
        aria-label="Previous page"
        onClick={() => onPageChange?.(page - 1)}
      >
        <img src="/icons/arrow-left.svg" alt="" width={14} height={14} />
      </button>
      <p className="text-[13px] font-normal whitespace-nowrap text-[#605a54]">
        Page {page} of {pageCount}
      </p>
      <button
        type="button"
        className="rounded border border-solid border-[#ebe6de] bg-[#1a1a1a] p-3 hover:cursor-pointer "
        // disabled={page >= pageCount}
        aria-label="Next page"
        onClick={() => onPageChange?.(page + 1)}
      >
        <img src="/icons/arrow-right.svg" alt="" width={14} height={14} />
      </button>
    </div>
  );
}
