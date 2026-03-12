"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import type { MenuProduct } from "@/sanity/queries/types";

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80";

function formatPrice(price: number) {
  return `${price.toFixed(2)} ₺`;
}

type MenuGridProps = {
  products: MenuProduct[];
  categories: { _id: string; slug: string | null; label: string }[];
};

export function MenuGrid({ products, categories }: MenuGridProps) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") ?? "all";

  const filtered =
    categoryParam === "all"
      ? products
      : products.filter((p) => p.category?.slug === categoryParam);

  const currentLabel =
    categoryParam === "all"
      ? "All"
      : (categories.find((c) => c.slug === categoryParam)?.label ??
        categoryParam);

  return (
    <section id="menu" className="space-y-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
          {currentLabel}
        </h2>
        <p className="text-sm text-muted-foreground">
          Filter the menu by category.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => {
          const imageUrl = item.image
            ? urlFor(item.image).width(800).height(600).url()
            : PLACEHOLDER_IMAGE;

          return (
            <Card
              key={item._id}
              className="group overflow-hidden border-border/70 bg-card/95 transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md animate-in fade-in-50 duration-300"
            >
              <div className="relative mx-4 mb-4 overflow-hidden rounded-xl bg-muted">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-200 ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </div>
              <CardHeader className="px-4 pt-0">
                <CardTitle className="flex items-start justify-between gap-2 text-base sm:text-lg">
                  <span>{item.name}</span>
                  <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold text-secondary-foreground sm:text-sm">
                    {formatPrice(item.price)}
                  </span>
                </CardTitle>
                <CardDescription className="line-clamp-3 text-xs sm:text-sm">
                  {item.description ?? "—"}
                </CardDescription>
              </CardHeader>
              <CardContent className="px-4 pb-3 pt-0">
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground/80">
                  {item.category?.label ?? "—"}
                </p>
              </CardContent>
              <CardFooter className="flex justify-end px-4 pt-0"></CardFooter>
            </Card>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="py-8 text-center text-sm text-muted-foreground">
          No items in this category yet.
        </p>
      )}
    </section>
  );
}
