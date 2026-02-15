
"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Check, Calendar as CalendarIcon, Package, User, Clock } from "lucide-react";

const packages = [
  { id: "basic", name: "Classic Story", price: "₹25,000", features: ["6 Hours Coverage", "200 Edited Photos", "3-min Highlight Reel"] },
  { id: "pro", name: "Cinematic Grandeur", price: "₹50,000", features: ["Full Day Coverage", "500 Edited Photos", "10-min Mini-Film", "Drone Shots"] },
  { id: "luxury", name: "Heritage Collection", price: "₹85,000", features: ["2 Days Coverage", "Unlimited Photos", "20-min Documentary", "Drone + BTS", "Premium Photo Album"] },
];

export function BookingForm() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedPackage, setSelectedPackage] = useState("pro");
  const [step, setStep] = useState(1);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Booking Submitted!",
      description: "We've received your request and will generate your automated invoice shortly.",
    });
    setStep(4); // Success step
  };

  if (step === 4) {
    return (
      <div className="p-12 text-center animate-in fade-in zoom-in duration-500">
        <div className="bg-accent/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="h-10 w-10 text-accent" />
        </div>
        <h2 className="font-headline text-3xl font-bold text-primary mb-4">Thank You!</h2>
        <p className="text-muted-foreground mb-8">Your booking for {date?.toLocaleDateString()} has been received. Our team will contact you within 24 hours.</p>
        <Button onClick={() => window.location.href = '/'} className="bg-primary">Return Home</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Progress Sidebar */}
      <div className="lg:w-1/3 bg-primary p-8 text-primary-foreground hidden lg:block">
        <h3 className="font-headline text-2xl font-bold mb-10">Reservation</h3>
        <div className="space-y-8">
          {[
            { id: 1, label: "Event Type & Date", icon: CalendarIcon },
            { id: 2, label: "Choose Package", icon: Package },
            { id: 3, label: "Contact Details", icon: User },
          ].map((s) => (
            <div key={s.id} className={`flex items-center space-x-4 ${step >= s.id ? "opacity-100" : "opacity-40"}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= s.id ? "border-accent bg-accent text-accent-foreground" : "border-white/30"}`}>
                <s.icon className="h-5 w-5" />
              </div>
              <span className="font-medium">{s.label}</span>
            </div>
          ))}
        </div>
        <div className="mt-20 pt-10 border-t border-white/10">
          <p className="text-sm opacity-60">Selected Date:</p>
          <p className="font-bold text-accent">{date?.toLocaleDateString() || "Not selected"}</p>
        </div>
      </div>

      <div className="flex-1 p-8 lg:p-12">
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="space-y-8 animate-in slide-in-from-right duration-300">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <Label className="text-lg font-bold">Select Date</Label>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border shadow-sm bg-white"
                  />
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-lg font-bold">Event Type</Label>
                    <Select defaultValue="wedding">
                      <SelectTrigger>
                        <SelectValue placeholder="What are we shooting?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wedding">Wedding</SelectItem>
                        <SelectItem value="prewedding">Pre-Wedding</SelectItem>
                        <SelectItem value="haldi">Haldi / Ceremony</SelectItem>
                        <SelectItem value="birthday">Birthday</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-lg font-bold">Expected Duration</Label>
                    <RadioGroup defaultValue="fullday">
                      <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent/5 transition-colors">
                        <RadioGroupItem value="halfday" id="half" />
                        <Label htmlFor="half">Half Day (4-6 Hours)</Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent/5 transition-colors">
                        <RadioGroupItem value="fullday" id="full" />
                        <Label htmlFor="full">Full Day (8-12 Hours)</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
              <div className="flex justify-end pt-8">
                <Button type="button" onClick={handleNext} className="px-10 bg-primary">Next Step</Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in slide-in-from-right duration-300">
              <Label className="text-2xl font-bold font-headline block text-primary">Choose Your Package</Label>
              <div className="grid md:grid-cols-3 gap-4">
                {packages.map((pkg) => (
                  <Card 
                    key={pkg.id} 
                    className={`cursor-pointer transition-all border-2 ${selectedPackage === pkg.id ? "border-accent ring-2 ring-accent/20 scale-105" : "hover:border-primary/20"}`}
                    onClick={() => setSelectedPackage(pkg.id)}
                  >
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="text-xl font-bold mb-2 font-headline">{pkg.name}</div>
                      <div className="text-2xl font-bold text-accent mb-4">{pkg.price}</div>
                      <ul className="space-y-2 flex-grow">
                        {pkg.features.map((f, i) => (
                          <li key={i} className="text-sm flex items-start text-muted-foreground">
                            <Check className="h-4 w-4 text-accent mr-2 mt-0.5 shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      {selectedPackage === pkg.id && <div className="mt-4 text-accent font-bold text-center text-xs uppercase tracking-widest">Selected</div>}
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="flex justify-between pt-8">
                <Button type="button" variant="outline" onClick={handleBack}>Back</Button>
                <Button type="button" onClick={handleNext} className="px-10 bg-primary">Next Step</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in slide-in-from-right duration-300">
              <Label className="text-2xl font-bold font-headline block text-primary">Contact Details</Label>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="+91 XXXXX XXXXX" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Event Location</Label>
                  <Input id="location" placeholder="City, Venue Name" required />
                </div>
              </div>
              <div className="bg-muted p-6 rounded-lg border border-dashed border-primary/20">
                <h4 className="font-bold mb-2">Booking Summary</h4>
                <div className="flex justify-between text-sm mb-1">
                  <span>Package: {packages.find(p => p.id === selectedPackage)?.name}</span>
                  <span className="font-bold">{packages.find(p => p.id === selectedPackage)?.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Date: {date?.toLocaleDateString()}</span>
                </div>
                <p className="text-[10px] text-muted-foreground mt-4 italic">* An automated invoice will be generated and sent to your email after confirmation.</p>
              </div>
              <div className="flex justify-between pt-8">
                <Button type="button" variant="outline" onClick={handleBack}>Back</Button>
                <Button type="submit" className="px-10 bg-accent text-accent-foreground hover:bg-accent/90">Confirm Booking</Button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
