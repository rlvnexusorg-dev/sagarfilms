
"use client";

import Link from "next/link";
import { Camera, Menu, X, LogIn, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { AuthModal } from "@/components/auth-modal";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Packages", href: "/packages" },
  { name: "Booking", href: "/booking" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <Camera className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
          <span className="font-headline text-2xl font-bold tracking-tight text-primary">
            Sagar Films
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Hi, {user.displayName?.split(' ')[0] || user.email}</span>
              <Button onClick={handleSignOut} variant="outline" size="sm">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsAuthModalOpen(true)} variant="ghost" size="sm">
              <LogIn className="h-4 w-4 mr-2" />
              Login / Sign Up
            </Button>
          )}
          <Button asChild variant="default" className="bg-primary text-primary-foreground">
            <Link href="/booking">Book Session</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden border-t bg-background animate-in slide-in-from-top duration-300">
          <div className="flex flex-col space-y-4 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
             {user ? (
              <div className="flex flex-col space-y-4 pt-4 border-t">
                <span className="text-lg font-medium">Hi, {user.displayName?.split(' ')[0] || user.email}</span>
                <Button onClick={handleSignOut} variant="outline">
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button onClick={() => { setIsAuthModalOpen(true); setIsOpen(false); }} variant="outline">
                <LogIn className="h-5 w-5 mr-2" />
                Login / Sign Up
              </Button>
            )}
            <Button asChild className="w-full">
              <Link href="/booking" onClick={() => setIsOpen(false)}>
                Book Now
              </Link>
            </Button>
          </div>
        </div>
      )}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </nav>
  );
}
