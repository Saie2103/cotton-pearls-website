"use client";

import Link from "next/link";
import { useState } from "react";
import CartDrawer from "./CartDrawer";

const NAV_LINKS = [
  { label: "Kurtis", href: "/collections/kurtis" },
  { label: "Coord Sets", href: "/collections/coord-sets" },
  { label: "Suits", href: "/collections/suits" },
  { label: "New Drop", href: "/collections/new-drop" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <>
      <header className="sticky top-[30px] z-40 bg-pearl-white/95 backdrop-blur border-b border-indigo/15">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Mobile menu toggle */}
          <button
            className="lg:hidden p-2 -ml-2"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="block w-6 h-[1.5px] bg-indigo mb-1.5" />
            <span className="block w-6 h-[1.5px] bg-indigo" />
          </button>

          <Link
            href="/"
            className="font-display text-xl tracking-tightest uppercase"
          >
            Cotton Pearls
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-display text-xs uppercase tracking-widest hover:text-mint-dim transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button aria-label="Search" className="hidden sm:block p-2">
              <SearchIcon />
            </button>
            <Link href="/account" aria-label="Account" className="p-2">
              <AccountIcon />
            </Link>
            <button
              aria-label={`Open cart`}
              className="relative p-2"
              onClick={() => setCartOpen(true)}
            >
              <BagIcon />
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="lg:hidden border-t border-indigo/15 px-4 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-display text-sm uppercase tracking-widest"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </header>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="8.5" cy="8.5" r="6" stroke="#0F1B29" strokeWidth="1.4" />
      <path d="M17 17L13 13" stroke="#0F1B29" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function AccountIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="6.5" r="3.5" stroke="#0F1B29" strokeWidth="1.4" />
      <path d="M3 17c1.2-3.5 4-5 7-5s5.8 1.5 7 5" stroke="#0F1B29" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M5 7h10l-.7 9.2a1 1 0 01-1 .8H6.7a1 1 0 01-1-.8L5 7z" stroke="#0F1B29" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M7.5 7V5.5a2.5 2.5 0 015 0V7" stroke="#0F1B29" strokeWidth="1.4" />
    </svg>
  );
}
