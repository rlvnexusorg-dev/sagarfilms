
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Check, Info } from "lucide-react";
import Link from "next/link";

const fullPackages = [
  {
    name: "Classic Wedding",
    price: "₹45,000",
    popular: false,
    features: [
      "1 Professional Photographer",
      "1 Cinematographer",
      "Full day coverage",
      "300 Edited High-Res Photos",
      "5-min Cinematic Highlight Film",
      "Raw Footage on request"
    ]
  },
  {
    name: "Grand Celebration",
    price: "₹95,000",
    popular: true,
    features: [
      "2 Professional Photographers",
      "2 Cinematographers",
      "Multi-day coverage (2 days)",
      "Unlimited Edited Photos",
      "15-min Mini-Documentary",
      "Teaser Video (60 secs)",
      "Drone Cinematography",
      "Premium Coffee Table Album"
    ]
  },
  {
    name: "Imperial Royalty",
    price: "₹1,50,000",
    popular: false,
    features: [
      "3 Photographers + 3 Cinematographers",
      "All Pre-wedding + Wedding events",
      "4K Ultra HD Production",
      "Signature Cinematic Film (30 min)",
      "Same-day Edit Teaser",
      "Elite Hand-crafted Leather Album",
      "Crane & Gimbal setups",
      "Post-wedding Romantic session"
    ]
  }
];

export default function PackagesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="font-headline text-5xl font-bold text-primary mb-4">Our Packages</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose from our curated collections or talk to us for a custom package tailored to your unique vision.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {fullPackages.map((pkg, idx) => (
              <div 
                key={idx} 
                className={`relative flex flex-col p-8 rounded-2xl border transition-all duration-300 ${
                  pkg.popular 
                  ? "bg-primary text-primary-foreground border-accent scale-105 shadow-2xl z-10" 
                  : "bg-card border-primary/10 hover:border-primary/30 shadow-xl"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                    Most Popular
                  </div>
                )}
                <h3 className="font-headline text-3xl font-bold mb-2">{pkg.name}</h3>
                <div className="text-4xl font-bold mb-8 flex items-baseline">
                  {pkg.price}
                  <span className="text-sm font-normal opacity-60 ml-2">Starting at</span>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  {pkg.features.map((feat, i) => (
                    <li key={i} className="flex items-start">
                      <Check className={`h-5 w-5 mr-3 mt-1 shrink-0 ${pkg.popular ? "text-accent" : "text-primary"}`} />
                      <span className="opacity-90">{feat}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild size="lg" className={`w-full font-bold py-6 text-lg rounded-xl ${
                  pkg.popular 
                  ? "bg-accent text-accent-foreground hover:bg-accent/90" 
                  : "bg-primary text-primary-foreground"
                }`}>
                  <Link href="/booking">Select Package</Link>
                </Button>
              </div>
            ))}
          </div>

          <div className="bg-accent/10 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-accent/20">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-accent text-accent-foreground p-2 rounded-lg">
                  <Info className="h-6 w-6" />
                </div>
                <h2 className="font-headline text-2xl font-bold">Need something custom?</h2>
              </div>
              <p className="text-muted-foreground text-lg">
                Whether it's a small intimate gathering or a month-long destination shoot, we can build a package that fits your needs and budget perfectly.
              </p>
            </div>
            <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/10 px-10 py-7 text-xl font-bold">
              <Link href="/contact">Custom Quote</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
