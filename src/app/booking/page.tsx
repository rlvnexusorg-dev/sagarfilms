
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BookingForm } from "@/components/booking-form";

export default function BookingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h1 className="font-headline text-5xl font-bold text-primary mb-4">Book Your Date</h1>
            <p className="text-muted-foreground text-lg">
              Check availability and reserve your slot. We'll follow up with a detailed consultation.
            </p>
          </div>
          
          <div className="bg-card rounded-2xl shadow-2xl border border-primary/5 overflow-hidden">
            <BookingForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
