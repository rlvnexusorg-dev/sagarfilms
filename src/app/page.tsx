
"use client";

import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Video, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { ReviewsSection } from "@/components/reviews";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const services = [
  {
    title: "Wedding Cinema",
    icon: Camera,
    description: "Cinematic storytelling of your most precious day with high-end production.",
  },
  {
    title: "Pre-Wedding",
    icon: Video,
    description: "Personalized romantic shoots at exotic locations to celebrate your bond.",
  },
  {
    title: "Event Shoots",
    icon: Sparkles,
    description: "Capturing Haldi, Birthdays, and Ceremonies with candid perfection.",
  },
];

const heroImages = PlaceHolderImages.filter(img => img.id.includes('carousel-') || img.id === 'hero-wedding');

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section with Carousel */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        <div className="embla h-full" ref={emblaRef}>
          <div className="embla__container h-full flex">
            {heroImages.map((image, index) => (
              <div key={index} className="embla__slide flex-[0_0_100%] min-w-0 h-full relative">
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  priority={index === 0}
                  className="object-cover"
                  data-ai-hint={image.imageHint}
                />
                <div className="absolute inset-0 bg-black/50"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center text-primary-foreground px-4 max-w-4xl animate-fade-in">
            <h1 className="font-headline text-5xl md:text-7xl font-bold mb-6 tracking-tight drop-shadow-lg">
              Moments Frozen in <span className="text-accent italic">Elegance</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto font-body font-light opacity-90 drop-shadow-md">
              Premier photography and cinematic videography studio specializing in grand weddings and intimate ceremonies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-8 py-6 text-lg">
                <Link href="/booking">Book Your Date</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-white/10 px-8 py-6 text-lg">
                <Link href="/portfolio">View Portfolio</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Carousel Controls */}
        <button 
          onClick={scrollPrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 p-3 rounded-full text-white transition-all hidden md:block"
        >
          <ChevronLeft className="h-8 w-8" />
        </button>
        <button 
          onClick={scrollNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/50 p-3 rounded-full text-white transition-all hidden md:block"
        >
          <ChevronRight className="h-8 w-8" />
        </button>
      </section>

      {/* Services Preview */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl font-bold text-primary mb-4">Our Expertise</h2>
            <div className="h-1 w-20 bg-accent mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <Card key={idx} className="border-none shadow-xl hover:shadow-2xl transition-shadow bg-card overflow-hidden group">
                <CardContent className="p-8 text-center">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <service.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-headline text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <ReviewsSection />

      {/* CTA Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-8">Ready to Capture Your Story?</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Our dates fill up fast, especially during wedding season. Contact us today to check availability.
          </p>
          <Button asChild size="lg" className="bg-primary text-primary-foreground px-10 py-7 text-xl font-bold rounded-full">
            <Link href="/contact">Get a Free Quote</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
