
"use client";

import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAllTestimonials, type Testimonial } from '@/data/content';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { Quote } from 'lucide-react';

export function ClientTestimonialsSection() {
  const testimonials = getAllTestimonials();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0); // 1-indexed for display logic
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback((index: number) => {
    api?.scrollTo(index);
  }, [api]);

  useEffect(() => {
    if (!api) {
      return;
    }
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() + 1);
    };
    const onInitOrReInit = () => {
      setScrollSnaps(api.scrollSnapList());
      setCurrent(api.selectedScrollSnap() + 1);
    };
    api.on("select", onSelect);
    api.on("reInit", onInitOrReInit);
    onInitOrReInit();
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onInitOrReInit);
    };
  }, [api]);

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Hear From Our Valued Clients</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover why businesses trust Bertera Niaga Global for their premium coffee needs.
          </p>
        </div>

        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: testimonials.length > 1,
          }}
          className="w-full max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="pl-2 md:pl-4 basis-full">
                <div className="p-1 h-full">
                  <Card className="h-full flex flex-col overflow-hidden shadow-lg bg-background">
                    <CardHeader className="flex-row items-center gap-4 pb-2">
                      {testimonial.clientImageUrl && (
                        <Avatar className="h-16 w-16 border-2 border-primary">
                          <AvatarImage src={testimonial.clientImageUrl} alt={testimonial.clientName} data-ai-hint={testimonial.clientImageHint} />
                          <AvatarFallback>{testimonial.clientName.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <CardTitle className="text-lg text-primary">{testimonial.clientName}</CardTitle>
                        {testimonial.clientCompany && (
                          <p className="text-sm text-muted-foreground">
                            {testimonial.clientTitle ? `${testimonial.clientTitle}, ` : ''}
                            {testimonial.clientCompany}
                          </p>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow pt-4 relative"> {/* Added relative for icon positioning */}
                      <Quote className="absolute top-3 left-3 h-5 w-5 text-accent opacity-60" /> {/* Adjusted icon position and style */}
                      <blockquote className="pl-10 italic text-foreground/80"> {/* Removed border, added padding for icon */}
                        <p>{testimonial.testimonialText}</p>
                      </blockquote>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {testimonials.length > 1 && (
            <>
              <CarouselPrevious className="hidden sm:flex left-[-50px]" />
              <CarouselNext className="hidden sm:flex right-[-50px]" />
            </>
          )}
        </Carousel>

        {scrollSnaps.length > 1 && (
          <div className="flex justify-center items-center space-x-2 pt-6">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={cn(
                  "h-2.5 w-2.5 rounded-full transition-all duration-300 ease-in-out",
                  index === current - 1
                    ? "bg-primary scale-125 ring-2 ring-primary/70 ring-offset-2 ring-offset-background"
                    : "bg-muted hover:bg-primary/60"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
    

    