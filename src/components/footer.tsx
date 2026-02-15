
import { Camera, Mail, MapPin, Phone, Instagram, Facebook, Youtube } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Camera className="h-8 w-8" />
            <span className="font-headline text-2xl font-bold">Sagar Films</span>
          </div>
          <p className="text-primary-foreground/80 leading-relaxed">
            Capturing the rhythm of your life through cinematic storytelling and timeless photography.
          </p>
          <div className="flex space-x-4 pt-4">
            <Instagram className="h-5 w-5 cursor-pointer hover:text-accent" />
            <Facebook className="h-5 w-5 cursor-pointer hover:text-accent" />
            <Youtube className="h-5 w-5 cursor-pointer hover:text-accent" />
          </div>
        </div>

        <div>
          <h4 className="font-headline text-xl font-bold mb-6">Quick Links</h4>
          <ul className="space-y-3">
            <li><Link href="/portfolio" className="hover:text-accent">Our Portfolio</Link></li>
            <li><Link href="/packages" className="hover:text-accent">Packages</Link></li>
            <li><Link href="/booking" className="hover:text-accent">Book a Session</Link></li>
            <li><Link href="/contact" className="hover:text-accent">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-headline text-xl font-bold mb-6">Contact Info</h4>
          <ul className="space-y-4">
            <li className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-accent" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-accent" />
              <span>hello@sagarfilms.com</span>
            </li>
            <li className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-accent" />
              <span>Studio 12, Heritage Mall, Mumbai</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-headline text-xl font-bold mb-6">Studio Hours</h4>
          <ul className="space-y-2 text-primary-foreground/80">
            <li>Mon - Sat: 10:00 AM - 8:00 PM</li>
            <li>Sunday: By Appointment Only</li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/60">
        <p>&copy; {new Date().getFullYear()} Sagar Films Studio. All rights reserved.</p>
      </div>
    </footer>
  );
}
