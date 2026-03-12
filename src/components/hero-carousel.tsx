"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y, EffectFade } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import { cn } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=85";

export type HeroSlide = {
  _id: string;
  image: { _type: string; asset?: { _ref: string } };
  alt?: string | null;
};

type HeroCarouselProps = {
  slides: HeroSlide[];
};

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);

  const hasSlides = slides?.length > 0;
  const displaySlides = hasSlides
    ? slides
    : [{ _id: "fallback", image: null, alt: "" }];

  return (
    <section className="w-full overflow-hidden border-b border-border/80 bg-muted/20">
      <div className="relative w-full overflow-hidden">
        <Swiper
          onSwiper={setSwiperRef}
          onSlideChange={(s) => setActiveIndex(s.realIndex)}
          modules={[Autoplay, A11y, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={400}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={displaySlides.length > 1}
          a11y={{ enabled: true }}
          className="w-full"
        >
          {displaySlides.map((slide, i) => {
            const imageUrl = slide.image
              ? urlFor(slide.image).width(1200).height(750).url()
              : FALLBACK_IMAGE;
            return (
              <SwiperSlide key={slide._id}>
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={imageUrl}
                    alt={slide.alt ?? ""}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority={i === 0}
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        {displaySlides.length > 1 && (
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {displaySlides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => swiperRef?.slideTo(i)}
                className={cn(
                  "size-2.5 rounded-full transition-[transform,background-color] duration-200",
                  i === activeIndex
                    ? "bg-primary scale-100"
                    : "bg-white/70 hover:bg-white/85",
                )}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
