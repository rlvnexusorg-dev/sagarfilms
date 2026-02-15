
"use client";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Instagram, Clock, Send } from "lucide-react";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="font-headline text-5xl font-bold text-primary mb-4">Let's Connect</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Ready to start your journey with us? Drop us a message or visit our studio for a coffee and a chat.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-card p-8 md:p-12 rounded-2xl shadow-xl border border-primary/5">
              <h2 className="font-headline text-3xl font-bold mb-8">Send an Inquiry</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="c-name">Your Name</Label>
                    <Input id="c-name" placeholder="John Doe" required className="bg-white" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="c-email">Email Address</Label>
                    <Input id="c-email" type="email" placeholder="john@example.com" required className="bg-white" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="c-subject">Subject</Label>
                  <Input id="c-subject" placeholder="Wedding Inquiry" required className="bg-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="c-message">Message</Label>
                  <Textarea id="c-message" placeholder="Tell us about your event..." className="min-h-[150px] bg-white" required />
                </div>
                <Button type="submit" className="w-full bg-primary py-7 text-lg font-bold group">
                  Send Message <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>

            {/* Contact Info & Map */}
            <div className="space-y-8">
              <div className="bg-primary text-primary-foreground p-8 md:p-12 rounded-2xl shadow-xl">
                <h2 className="font-headline text-3xl font-bold mb-8">Studio Information</h2>
                <div className="space-y-8">
                  <div className="flex items-start space-x-4">
                    <div className="bg-accent p-3 rounded-xl text-accent-foreground">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm opacity-60 uppercase tracking-widest font-bold mb-1">Call Us</p>
                      <p className="text-xl font-bold">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-accent p-3 rounded-xl text-accent-foreground">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm opacity-60 uppercase tracking-widest font-bold mb-1">Email Us</p>
                      <p className="text-xl font-bold">hello@sagarfilms.com</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="bg-accent p-3 rounded-xl text-accent-foreground">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm opacity-60 uppercase tracking-widest font-bold mb-1">Visit Studio</p>
                      <p className="text-xl font-bold leading-relaxed">
                        Studio 12, Heritage Mall,<br />
                        Near Gateway Circle, Mumbai
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-12 pt-8 border-t border-white/10 flex space-x-6">
                  <Instagram className="h-8 w-8 cursor-pointer hover:text-accent transition-colors" />
                  <Clock className="h-8 w-8 cursor-pointer hover:text-accent transition-colors" />
                </div>
              </div>

              {/* Mock Map Placeholder */}
              <div className="relative h-64 w-full rounded-2xl overflow-hidden border border-primary/10">
                <div className="absolute inset-0 bg-muted-foreground/10 flex items-center justify-center">
                  <MapPin className="h-12 w-12 text-primary opacity-20" />
                  <p className="absolute bottom-4 text-xs font-bold tracking-widest uppercase opacity-40">Interactive Studio Map</p>
                </div>
                {/* Normally we'd use a real map here, but for now it's a placeholder stylized like our theme */}
                <div className="absolute inset-0 bg-accent/5 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
