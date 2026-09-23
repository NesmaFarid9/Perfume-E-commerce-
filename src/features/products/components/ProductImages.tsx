"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";
import type { Product } from "@/features/products/types/product.types";

type ProductImagesProps = {
  product: Product;
};

/** US-04: product image gallery. */
export function ProductImages({ product }: ProductImagesProps) {
  const mainImage = product.images[0];
  const thumbnails = product.images.slice(0, 4);
  const [selectedImage, setSelectedImage] = useState(mainImage);
  const [selectedThumb, setSelectedThumb] = useState(thumbnails[0]);

  if (!mainImage) {
    return (
      <div className="flex h-80 min-w-0 flex-1 items-center justify-center rounded-lg bg-[#ebe6de] text-[#605a54]">
        No product images yet
      </div>
    );
  }

  return (
    <div className="flex min-w-0 flex-1 flex-col items-start gap-4">
      <div className="relative h-[320px] w-full aspect-square overflow-hidden rounded-lg sm:h-[480px] lg:h-[600px]">
        <Image
          src={selectedImage}
          alt={product.name}
          fill
          className="rounded-lg object-cover"
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority
        />
      </div>
      {thumbnails.length > 0 ? (
        <div className="flex w-full items-start gap-4">
          {thumbnails.map((thumb) => {
            const isSelected = selectedThumb === thumb;

            return (
              <button
                key={thumb}
                type="button"
                aria-label={`View ${product.name} image`}
                aria-pressed={isSelected}
                className={cn(
                  "relative h-[88px] min-w-0 flex-1 overflow-hidden rounded sm:h-[120px] hover:cursor-pointer",
                  isSelected && "border-2 border-solid border-[#c5a880]",
                )}
                onClick={() => {
                  setSelectedImage(thumb);
                  setSelectedThumb(thumb);
                }}
              >
                <Image
                  src={thumb}
                  alt=""
                  fill
                  className="rounded object-cover"
                  sizes="20vw"
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
