
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, firestore } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Check for admin role
        const userDocRef = doc(firestore, "users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists() && userDoc.data().role === "admin") {
          setIsAdmin(true);
        } else {
          // Redirect non-admins
          router.push("/");
        }
      } else {
        // Redirect logged-out users
        router.push("/");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-xl">Loading, please wait...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!isAdmin) {
    // This is a fallback, the redirect should have already happened.
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-4xl font-headline font-bold text-primary mb-8">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder for admin actions */}
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Manage Projects</h2>
            <p className="text-muted-foreground mb-4">Add, edit, or delete portfolio projects.</p>
            <Button>Go to Projects</Button>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Manage Gallery</h2>
            <p className="text-muted-foreground mb-4">Update the images in the main gallery.</p>
            <Button>Go to Gallery</Button>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Manage Videos</h2>
            <p className="text-muted-foreground mb-4">Add or remove sample videos.</p>
            <Button>Go to Videos</Button>
          </div>
           <div className="bg-card p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">View Bookings</h2>
            <p className="text-muted-foreground mb-4">See all client bookings and invoices.</p>
            <Button>View Bookings</Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

