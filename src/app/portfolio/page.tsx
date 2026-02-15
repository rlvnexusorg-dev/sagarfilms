
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PortfolioGrid } from "@/components/portfolio-grid";
import { PlaceHolderImages } from "@/lib/placeholder-images";

export default function PortfolioPage() {
  const portfolioItems = PlaceHolderImages.filter(img => img.id.startsWith('portfolio-'));

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow py-16 container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="font-headline text-5xl font-bold text-primary mb-4">Our Masterpieces</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Browse through our collection of memories. Our AI assistant helps categorize these moments so you can find inspiration for your own event.
          </p>
        </div>
        
        <PortfolioGrid initialItems={portfolioItems} />
      </main>
      <Footer />
    </div>
  );
}
