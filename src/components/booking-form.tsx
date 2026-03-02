
"use client";

import { useState, useEffect } from "react";
import { addDays, format, isSameDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Calendar as CalendarIcon, ArrowRight, PartyPopper } from "lucide-react";

const packages = [
  { id: "basic", name: "Classic Story", price: "₹25,000", features: ["6 Hours Coverage", "200 Edited Photos", "3-min Highlight Reel"] },
  { id: "pro", name: "Cinematic Grandeur", price: "₹50,000", features: ["Full Day Coverage", "500 Edited Photos", "10-min Mini-Film", "Drone Shots"] },
  { id: "luxury", name: "Heritage Collection", price: "₹85,000", features: ["2 Days Coverage", "Unlimited Photos", "20-min Documentary", "Drone + BTS", "Premium Photo Album"] },
];

export function BookingForm() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [selectedPackage, setSelectedPackage] = useState("pro");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const response = await fetch("/api/bookings");
        const data = await response.json();
        setBookedDates(data.map((d: string) => new Date(d)));
      } catch (error) {
        toast({ title: "Error", description: "Could not fetch schedule.", variant: "destructive" });
      }
    };
    fetchBookedDates();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleBookingConfirm = async () => {
    if (!date) return;

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: date.toISOString() }),
      });
      if (!response.ok) throw new Error("Booking failed.");

      setBookedDates(prev => [...prev, date]);
      toast({ title: "Success!", description: `Date ${format(date, "PPP")} is booked.` });
      setIsConfirmed(true);
    } catch (error) {
      toast({ title: "Error", description: "Could not save your booking.", variant: "destructive" });
    }
  };

  const selectedPkg = packages.find(p => p.id === selectedPackage);

  if (isConfirmed) {
    return (
      <Card className="w-full max-w-4xl mx-auto shadow-xl animate-in fade-in-50 zoom-in-95">
        <CardContent className="p-12 text-center">
          <PartyPopper className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-3xl font-bold font-headline text-primary mb-4">Booking Confirmed!</h2>
          <p className="text-muted-foreground text-lg mb-2">Thank you, {formData.name}!</p>
          <p className="text-muted-foreground text-lg mb-8">Your session for <span className="font-bold text-primary">{date ? format(date, "PPP") : ""}</span> is locked in. We will contact you shortly.</p>
          <Button onClick={() => window.location.reload()} size="lg">Book Another Session</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-5xl mx-auto shadow-2xl overflow-hidden animate-in fade-in-50">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-8 border-r bg-gray-50/50">
          <CardHeader className="px-0 pt-0">
            <CardTitle className="font-headline text-3xl text-primary">Select a Date</CardTitle>
          </CardHeader>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={[{ before: new Date() }, ...bookedDates]}
            className="p-0 rounded-md"
            classNames={{
              day_selected: "bg-primary text-primary-foreground hover:bg-primary/90 focus:bg-primary",
              day_today: "bg-accent/50 text-accent-foreground",
              day_disabled: "text-muted-foreground/50 opacity-50",
            }}
            components={{
              DayContent: ({ day, ...props }) => {
                const dayDate = day?.date;
                const isBooked = dayDate ? bookedDates.some((bookedDate) => isSameDay(bookedDate, dayDate)) : false;
                return (
                  <div className="relative">
                    {dayDate?.getDate()}
                    {isBooked && (
                      <div className="absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-destructive" />
                    )}
                  </div>
                );
              },
            }}
          />
        </div>

        <div className="p-8 flex flex-col">
          {!date ? (
            <div className="flex flex-col items-center justify-center h-full text-center animate-in fade-in-50">
              <CalendarIcon className="w-24 h-24 text-gray-300 mb-4" />
              <h3 className="font-headline text-2xl text-gray-500">Your Schedule Awaits</h3>
              <p className="text-muted-foreground mt-2">Select a day on the calendar to begin your booking process.</p>
            </div>
          ) : (
            <div className="animate-in fade-in-50 space-y-6">
              <CardHeader className="px-0 pt-0">
                <CardTitle className="font-headline text-3xl text-primary">
                  Book for <span className="text-accent">{format(date, "PPP")}</span>
                </CardTitle>
              </CardHeader>
              
              <div className="space-y-4">
                <Label className="font-semibold text-lg">Choose Your Package</Label>
                <RadioGroup value={selectedPackage} onValueChange={setSelectedPackage} className="grid grid-cols-2 gap-4">
                  {packages.slice(0, 2).map(pkg => (
                    <Label key={pkg.id} className="border rounded-lg p-4 cursor-pointer has-[:checked]:bg-primary/10 has-[:checked]:border-primary transition-all">
                      <RadioGroupItem value={pkg.id} className="sr-only" />
                      <h4 className="font-bold text-lg">{pkg.name}</h4>
                      <p className="font-bold text-primary text-xl">{pkg.price}</p>
                    </Label>
                  ))}
                </RadioGroup>
                <Select onValueChange={setSelectedPackage} defaultValue={selectedPackage}>
                    <SelectTrigger><SelectValue placeholder="Or select other packages..." /></SelectTrigger>
                    <SelectContent>
                        {packages.map(pkg => <SelectItem key={pkg.id} value={pkg.id}>{pkg.name} - {pkg.price}</SelectItem>)}
                    </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label className="font-semibold text-lg">Your Details</Label>
                <div className="grid grid-cols-1 gap-4">
                  <Input id="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} required />
                  <Input id="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} required />
                  <Input id="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} required />
                </div>
              </div>

              <CardFooter className="px-0 pb-0 pt-6">
                <Button onClick={handleBookingConfirm} size="lg" className="w-full text-lg" disabled={!formData.name || !formData.email || !formData.phone}>
                  Confirm Booking for {selectedPkg?.price}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </CardFooter>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}
