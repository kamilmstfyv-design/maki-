"use client";

import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href="/"
            className="relative inline-flex items-center rounded-full bg-card p-1 shadow-sm shadow-black/5 ring-1 ring-border/60 transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            aria-label="Maki Kahvaltı"
          >
            <Image
              src="/Gemini_Generated_Image_3wqu1g3wqu1g3wqu.png"
              alt="Maki Kahvaltı"
              width={100}
              height={100}
              className="h-10 w-10 rounded-full object-cover"
              priority
            />
          </Link>

          <span className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <span className="tracking-wide">Fresh</span>
            <span className="text-border">•</span>
            <span className="tracking-wide">Fast</span>
            <span className="text-border">•</span>
            <span className="tracking-wide">Delicious</span>
          </span>
          <span className="sm:hidden truncate text-xs font-medium tracking-wide text-muted-foreground">
            Fresh • Fast • Delicious
          </span>
        </div>
      </div>
      <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-70" />
    </header>
  );
}
