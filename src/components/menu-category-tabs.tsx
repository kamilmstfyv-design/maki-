"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { MenuCategory } from "@/sanity/queries/types";

const ALL_CATEGORY = { slug: "all", label: "All" } as const;

export type MenuCategorySlug = string;

type MenuCategoryTabsProps = {
  categories: { _id: string; slug: string | null; label: string }[];
};

export function MenuCategoryTabs({ categories }: MenuCategoryTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tabs = [
    ALL_CATEGORY,
    ...categories
      .filter((c): c is MenuCategory & { slug: string } => c.slug != null)
      .map((c) => ({ slug: c.slug!, label: c.label })),
  ];

  const currentCategory =
    searchParams.get("category") ?? tabs[0]?.slug ?? "all";

  const setCategory = useCallback(
    (slug: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("category", slug);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  if (tabs.length === 0) return null;

  return (
    <section className="sticky top-14 z-40 border-b border-border/80 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center gap-2">
          {tabs.map(({ slug, label }) => {
            const isActive = currentCategory === slug;
            return (
              <Button
                key={slug}
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => setCategory(slug)}
                className={cn(
                  "transition-[transform,color] duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.98]",
                  isActive &&
                    "ring-2 ring-primary ring-offset-2 ring-offset-background",
                )}
              >
                {label}
              </Button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
