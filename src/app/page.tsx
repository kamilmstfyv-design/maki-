import { Suspense } from "react";
import { HeroCarousel } from "@/components/hero-carousel";
import { Header } from "@/components/header";
import { MenuCategoryTabs } from "@/components/menu-category-tabs";
import { MenuGrid } from "@/components/menu-grid";
import { getSanityClient } from "@/sanity/lib/client";
import {
  categoriesQuery,
  heroSlidesQuery,
  productsQuery,
} from "@/sanity/queries/menu";

// Revalidate periodically so Sanity updates show up without redeploy
export const revalidate = 30;

export default async function Home() {
  const client = getSanityClient();

  const [categories, products, heroSlides] = client
    ? await Promise.all([
        client.fetch(categoriesQuery),
        client.fetch(productsQuery),
        client.fetch(heroSlidesQuery),
      ])
    : [[], [], []];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <HeroCarousel slides={heroSlides} />
      <Suspense fallback={<div className="h-14" />}>
        <MenuCategoryTabs categories={categories} />
      </Suspense>
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-8">
        <Suspense fallback={null}>
          <MenuGrid products={products} categories={categories} />
        </Suspense>
      </main>
      <footer className="w-full border-t border-border/80 py-6">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground sm:px-6">
          © Maki Café
        </div>
      </footer>
    </div>
  );
}
