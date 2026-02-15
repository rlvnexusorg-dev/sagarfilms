
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BookingForm } from "@/components/booking-form";

export default function BookingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow py-16 container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="font-headline text-5xl font-bold text-primary mb-4">Book Your Session</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Let's create something beautiful together. Fill out the form below to secure your date.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <BookingForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
