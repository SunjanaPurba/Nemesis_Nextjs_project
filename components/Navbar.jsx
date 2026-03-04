"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/#features", label: "Features" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/#about", label: "About" },
];

export default function Navbar() {
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[var(--border)] bg-[var(--bg-secondary)]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight transition hover:opacity-90"
        >
          <span className="gradient-text">ProStore</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[var(--text-muted)] transition hover:text-[var(--accent-start)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-start)]/30 focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)] rounded"
            >
              {link.label}
            </Link>
          ))}

          {status === "loading" ? (
            <div className="h-9 w-24 animate-pulse rounded bg-white/10" />
          ) : session ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 rounded-xl border border-[var(--border)] bg-white/5 px-3 py-2 text-sm font-medium text-[var(--text-primary)] transition hover:bg-white/10"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent-start)] to-[var(--accent-end)] font-semibold text-white">
                  {session.user?.name?.[0] || session.user?.email?.[0] || "?"}
                </span>
                <span className="max-w-[120px] truncate hidden sm:inline text-[var(--text-muted)]">
                  {session.user?.name || session.user?.email}
                </span>
                <svg className={`h-4 w-4 text-[var(--text-muted)] transition ${dropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl glass-card py-1 shadow-xl">
                  <div className="border-b border-[var(--border)] px-4 py-2">
                    <p className="text-xs text-[var(--text-muted)]">Signed in as</p>
                    <p className="truncate text-sm font-medium text-[var(--text-primary)]">
                      {session.user?.email}
                    </p>
                  </div>
                  <Link href="/dashboard/add-product" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-[var(--text-muted)] hover:bg-white/5 hover:text-[var(--accent-start)]">
                    Add Product
                  </Link>
                  <Link href="/dashboard/manage-products" onClick={() => setDropdownOpen(false)} className="block px-4 py-2 text-sm text-[var(--text-muted)] hover:bg-white/5 hover:text-[var(--accent-start)]">
                    Manage Products
                  </Link>
                  <button
                    onClick={() => { setDropdownOpen(false); signOut({ callbackUrl: "/" }); }}
                    className="w-full px-4 py-2 text-left text-sm text-[var(--danger)] hover:bg-red-500/10"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text-muted)] transition hover:bg-white/5 hover:text-[var(--text-primary)]">
                Login
              </Link>
              <Link href="/login?register=true" className="btn-accent rounded-xl px-4 py-2 text-sm font-semibold text-white">
                Register
              </Link>
            </div>
          )}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-lg p-2 text-[var(--text-muted)] md:hidden hover:bg-white/5"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-[var(--text-muted)] hover:bg-white/5 hover:text-[var(--accent-start)]">
                {link.label}
              </Link>
            ))}
            {session ? (
              <>
                <Link href="/dashboard/add-product" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-[var(--text-muted)] hover:bg-white/5">Add Product</Link>
                <Link href="/dashboard/manage-products" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-2 text-[var(--text-muted)] hover:bg-white/5">Manage Products</Link>
                <button onClick={() => { setMobileOpen(false); signOut({ callbackUrl: "/" }); }} className="rounded-lg px-3 py-2 text-left text-[var(--danger)]">Sign out</button>
              </>
            ) : (
              <div className="flex gap-2 pt-2">
                <Link href="/login" onClick={() => setMobileOpen(false)} className="flex-1 rounded-xl border border-[var(--border)] py-2 text-center text-sm font-medium">Login</Link>
                <Link href="/login?register=true" onClick={() => setMobileOpen(false)} className="btn-accent flex-1 rounded-xl py-2 text-center text-sm font-semibold text-white">Register</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
