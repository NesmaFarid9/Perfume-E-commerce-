"use client";

import Link from "next/link";
import { Suspense, useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CartNavLink } from "@/features/cart";
import { productPaths } from "@/features/products";
import { cn } from "@/lib/utils/cn";

const NAV_LINKS = [
  { label: "Home",        href: productPaths.list },
  { label: "Shop",        href: productPaths.list },
  { label: "Categories",  href: productPaths.list },
  { label: "The Atelier", href: "#atelier" },
];

function SearchForm({ className }: { className?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(
    () => searchParams.get("search") ?? ""
  );

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(searchParams.get("search") ?? "");
  }, [searchParams]);

  const commit = (v: string) => {
    const trimmed = v.trim();

    const params = new URLSearchParams(searchParams.toString());

    if (trimmed) {
      params.set("search", trimmed);
    } else {
      params.delete("search");
    }

    params.delete("page");

    const query = params.toString();

    router.replace(
      query ? `${productPaths.list}?${query}` : productPaths.list
    );
  };

  const handleChange = (v: string) => {
    setValue(v);
    commit(v);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    commit(value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setValue("");
      commit("");
    }
  };

  return (
    <form onSubmit={onSubmit} role="search" className={className}>
      <div className="flex items-center gap-1.5 rounded-[50px] border border-[#EBE6DE] bg-white px-3 py-[7px]">
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#605A54"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <input
          ref={inputRef}
          type="search"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Search fragrances..."
          aria-label="Search fragrances"
          className="w-[148px] bg-transparent text-[12px] font-normal text-[#605A54] placeholder-[#9e9890] outline-none [&::-webkit-search-cancel-button]:hidden"
        />
      </div>
    </form>
  );
}

// Inline mobile search bar (used inside the slide-down panel)
function MobileSearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(
    () => searchParams.get("search") ?? ""
  );

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(searchParams.get("search") ?? "");
  }, [searchParams]);

  const commit = (v: string) => {
    const trimmed = v.trim();

    const params = new URLSearchParams(searchParams.toString());

    if (trimmed) {
      params.set("search", trimmed);
    } else {
      params.delete("search");
    }

    params.delete("page");

    const query = params.toString();

    router.replace(
      query ? `${productPaths.list}?${query}` : productPaths.list
    );
  };

  const handleChange = (v: string) => {
    setValue(v);
    commit(v);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    commit(value);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setValue("");
      commit("");
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      role="search"
      className="flex items-center gap-3 px-5 py-3 sm:px-8"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#9e9890"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>

      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Search fragrances..."
        aria-label="Search fragrances"
        className="min-w-0 flex-1 bg-transparent text-[13px] text-[#1a1a1a] placeholder-[#9e9890] outline-none [&::-webkit-search-cancel-button]:hidden"
      />
    </form>
  );
}
// ─── Main Header ────────────────────────────────────────────────────────
export function Header() {
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">

        {/* ── Announcement bar ── */}
        <div className="flex h-[39px] w-full items-center justify-center bg-[#1a1a1a]">
          <p className="px-4 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
            Complimentary signature gift wrapping on all orders above $150
          </p>
        </div>

        {/* ── Main nav ── */}
        <div className="relative flex h-[72px] w-full items-center border-b border-[#ebe6de] bg-[#faf8f5] px-5 sm:px-8 md:px-10 lg:px-16">

          {/* LEFT — nav links */}
          <nav aria-label="Main navigation" className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "whitespace-nowrap text-[13px] font-[family-name:var(--font-manrope)] uppercase tracking-[0.13em] transition-colors hover:cursor-pointer hover:text-[#1a1a1a]",
                  i === 0
                    ? "font-bold text-[#1a1a1a]"
                    : "font-medium text-[#605a54]",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CENTER — logo (absolutely centred on all breakpoints) */}
          <Link
            href={productPaths.list}
            onClick={closeMenu}

            className="absolute left-1/2 -translate-x-1/2 select-none font-[family-name:var(--font-instrument-serif)] text-[38px] font-normal tracking-[0.25em] text-[#1a1a1a] transition-colors hover:cursor-pointer hover:text-[#605a54]"
          >
            ODORATUS
          </Link>

          {/* RIGHT — search + cart + account */}
          <div className="ml-auto flex items-center gap-4">

            {/* Desktop search — wrapped in Suspense */}
            <Suspense fallback={
              <div className="hidden w-[188px] lg:block" />
            }>
              <SearchForm className="hidden lg:block" />
            </Suspense>

            {/* Mobile search toggle */}
            <button
              type="button"
              aria-label="Open search"
              onClick={() => setSearchOpen((o) => !o)}
              className="text-[#605a54] transition-colors hover:cursor-pointer hover:text-[#1a1a1a] lg:hidden"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* Cart */}
            <CartNavLink />

            {/* Hamburger — mobile only */}
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((o) => !o)}
              className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] hover:cursor-pointer lg:hidden"
            >
              <span className={cn("block h-px w-5 bg-[#1a1a1a] transition-transform duration-300", menuOpen && "translate-y-[6px] rotate-45")} />
              <span className={cn("block h-px w-5 bg-[#1a1a1a] transition-opacity duration-300", menuOpen && "opacity-0")} />
              <span className={cn("block h-px w-5 bg-[#1a1a1a] transition-transform duration-300", menuOpen && "-translate-y-[6px] -rotate-45")} />
            </button>
          </div>
        </div>

        {/* ── Mobile search panel ── */}
        <div
          className={cn(
            "overflow-hidden border-b border-[#ebe6de] bg-[#faf8f5] transition-all duration-200 lg:hidden",
            searchOpen ? "max-h-20 opacity-100" : "max-h-0 opacity-0",
          )}
          aria-hidden={!searchOpen}
        >
          <Suspense fallback={null}>
            <MobileSearchForm />
          </Suspense>
        </div>

     {/* ── Mobile nav menu ── */}
<div
  id="mobile-menu"
  className={cn(
    "overflow-hidden border-b border-[#ebe6de] bg-[#faf8f5] transition-all duration-300 lg:hidden",
    menuOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0",
  )}
  aria-hidden={!menuOpen}
>
  <nav
    className="flex flex-col items-center justify-center px-5 py-5 sm:px-8"
    aria-label="Mobile navigation"
  >
    {NAV_LINKS.map((link, i) => (
      <Link
        key={link.label}
        href={link.href}
        onClick={closeMenu}
        className={cn(
          "flex w-full items-center justify-center py-3 text-center font-[family-name:var(--font-manrope)] text-[13px] uppercase tracking-[0.13em] transition-colors hover:cursor-pointer hover:text-[#1a1a1a]",
          i === 0
            ? "font-bold text-[#1a1a1a]"
            : "font-medium text-[#605a54]",
        )}
      >
        {link.label}
      </Link>
    ))}
  </nav>
</div>

      </header>

      {/* Spacer — announcement 39px + nav 68px = 107px */}
      <div className="h-[107px]" aria-hidden="true" />
    </>
  );
}
