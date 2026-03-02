
"use client";

import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Video, Sparkles } from "lucide-react";
import { ReviewsSection } from "@/components/reviews";

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

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section with Video Background Only */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        {/* YouTube Background Video */}
        <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
          <iframe
            className="w-full h-full scale-150"
            src="https://www.youtube.com/embed/Gv5ioB0fS60?autoplay=1&mute=1&loop=1&playlist=Gv5ioB0fS60&controls=0&showinfo=0&rel=0&modestbranding=1"
            title="Sagar Films Showreel"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>

        {/* Black Overlay for readability */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>

        {/* Hero Content Overlay */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center text-primary-foreground px-4 max-w-4xl animate-fade-in">
            <h1 className="font-headline text-5xl md:text-7xl font-bold mb-6 tracking-tight drop-shadow-lg">
              Moments Frozen in <span className="text-accent italic">Elegance</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto font-body font-light opacity-90 drop-shadow-md">
              Sagar Films Studio: High-end cinematic videography and photography for your most sacred moments.
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
