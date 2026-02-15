
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Camera, Video, Calendar, Sparkles } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";

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

const testimonials = [
  {
    name: "Aman & Priya",
    text: "Sagar Films made our wedding look like a Bollywood movie. Every frame was filled with emotion.",
    rating: 5,
  },
  {
    name: "Rohan Verma",
    text: "Professional, punctual, and incredibly creative. The birthday highlight video was the star of the show.",
    rating: 5,
  },
  {
    name: "Sneha Kapur",
    text: "The pre-wedding shoot was so comfortable and the results were beyond our expectations!",
    rating: 5,
  },
];

export default function Home() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-wedding');

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
        <Image
          src={heroImg?.imageUrl || ""}
          alt="Hero Wedding"
          fill
          className="object-cover brightness-[0.4]"
          priority
          data-ai-hint="wedding photography"
        />
        <div className="relative z-10 text-center text-primary-foreground px-4 animate-fade-in">
          <h1 className="font-headline text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Moments Frozen in <span className="text-accent italic">Elegance</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto font-body font-light opacity-90">
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

      {/* Testimonials */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl font-bold mb-4">Client Stories</h2>
            <p className="opacity-80">What our happy couples and clients say</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="bg-white/5 p-8 rounded-lg border border-white/10 backdrop-blur-sm">
                <div className="flex mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="italic mb-6 opacity-90 text-lg leading-relaxed">"{t.text}"</p>
                <div className="font-bold text-accent">— {t.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
