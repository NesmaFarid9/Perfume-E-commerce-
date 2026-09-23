"use client";

import Link from "next/link";
import { productPaths } from "@/features/products";

const FOOTER_COLUMNS = [
  {
    heading: "COLLECTIONS",
    links: [
      { label: "La Maison", href: productPaths.list },
      { label: "Private Reserve", href: productPaths.list },
      { label: "Scented Candles", href: productPaths.list },
      { label: "Discovery Sets", href: productPaths.list },
    ],
  },
  {
    heading: "CUSTOMER CARE",
    links: [
      { label: "Olfactory Consultation", href: "#consultation" },
      { label: "Shipping & Returns", href: "#shipping" },
      { label: "Atelier Appointments", href: "#appointments" },
      { label: "Care Guide", href: "#guide" },
    ],
  },
  {
    heading: "ABOUT US",
    links: [
      { label: "Our Philosophy", href: "#about" },
      { label: "Sourcing Standards", href: "#sourcing" },
      { label: "Sustainability Commitments", href: "#sustainability" },
      { label: "Journal", href: "#journal" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="w-full bg-[#191919] text-[#f4f1eb]">
      {/* Main Footer */}
      <div className="mx-auto flex min-h-[300px] w-full max-w-[1920px] flex-col px-[7%] pt-[105px] pb-[80px] lg:flex-row lg:justify-between">
        {/* Brand */}
        <div className="w-full lg:w-[520px]">
          <Link
            href={productPaths.list}
            className="inline-block font-[family-name:var(--font-instrument-serif)] text-[48px] leading-none tracking-[0.20em] text-[#f4f1eb] transition-colors hover:text-[#c5a880] xl:text-[52px]"
          >
            ODORATUS
          </Link>

          <p className="mt-[38px] max-w-[500px] text-[15px] leading-[1.8] text-[#aaa7a2] xl:text-[16px]">
            An independent olfactory house cultivating slow-luxury liquid
            narratives. Every bottle is hand-poured in small batches using
            sustainably sourced botanicals.
          </p>

          {/* Social Icons */}
          <div className="mt-[30px] flex items-center gap-4">
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#303030] text-[#f4f1eb] transition-all hover:bg-[#c5a880] hover:text-[#191919]"
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r="0.7"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </a>

            {/* X */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#303030] text-[#f4f1eb] transition-all hover:bg-[#c5a880] hover:text-[#191919]"
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.857L1.5 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#303030] text-[#f4f1eb] transition-all hover:bg-[#c5a880] hover:text-[#191919]"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M14 8h3V4h-3c-3.314 0-5 1.686-5 5v3H6v4h3v8h4v-8h3l1-4h-4V9c0-.552.448-1 1-1z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Columns */}
        <div className="mt-16 grid w-full grid-cols-1 gap-12 sm:grid-cols-3 lg:mt-0 lg:w-[58%] lg:gap-16 xl:w-[56%]">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.heading}>
              <h3 className="mb-[28px] text-[13px] font-medium tracking-[-0.01em] text-[#c5a880] xl:text-[14px]">
                {column.heading}
              </h3>

              <ul className="space-y-[25px]">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-[#aaa7a2] transition-colors hover:text-[#f4f1eb] xl:text-[16px]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="mx-[7%] border-t border-[#353535]" />

      {/* Bottom */}
      <div className="mx-auto flex w-full max-w-[1920px] flex-col items-start justify-between gap-5 px-[7%] py-[28px] sm:flex-row sm:items-center">
        <p className="text-[13px] text-[#77736e]">
          © 2026 Odoratus. All rights reserved.
        </p>

        <div className="flex items-center gap-[10px]">
          <span className="mr-2 text-[12px] text-[#77736e]">
            SECURED CHECKOUT VIA
          </span>

          {["VISA", "MASTERCARD", "AMEX"].map((badge) => (
            <span
              key={badge}
              className="rounded-[4px] border border-[#3b3b3b] px-[10px] py-[5px] text-[10px] font-medium text-[#77736e]"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}