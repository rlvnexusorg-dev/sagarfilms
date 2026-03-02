
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BookingForm } from "@/components/booking-form";

export default function BookingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 md:p-8">
        <BookingForm />
      </main>
      <Footer />
    </div>
  );
}
