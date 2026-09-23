import type { Product } from "@/features/products/types/product.types";

type ScentAnatomyProps = {
  product: Product;
};

export function ScentAnatomy({ product }: ScentAnatomyProps) {
  const layers = product.scentAnatomy
    ? [
        { label: "Top Notes", value: product.scentAnatomy.topNotes },
        { label: "Heart Notes", value: product.scentAnatomy.heartNotes },
        { label: "Base Notes", value: product.scentAnatomy.baseNotes },
      ]
    : [];

  return (
    <div className="flex w-full flex-col items-start gap-5">
      <h2 className="font-[family-name:var(--font-instrument-serif)] text-[32px] text-[#1a1a1a]">
        Scent Anatomy
      </h2>
      <p className="text-[14px] leading-[1.6] font-normal text-[#605a54]">
        {product.description}
      </p>
      {layers.length > 0 ? (
        <div className="flex w-full flex-col items-start gap-3">
          {layers.map((layer) => (
            <div
              key={layer.label}
              className="flex w-full items-start justify-between gap-4 border-b border-solid border-[#ebe6de] py-2"
            >
              <p className="text-[12px] font-bold uppercase text-[#1a1a1a]">
                {layer.label}
              </p>
              <p className="text-right text-[13px] font-normal text-[#605a54]">
                {layer.value}
              </p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
