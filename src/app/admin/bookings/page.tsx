
"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function AdminBookingsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center">
        <h1 className="text-4xl font-headline font-bold text-primary">Coming Soon</h1>
      </main>
      <Footer />
    </div>
  );
}
