
"use client";

import { useState, useEffect } from "react";
import { addDays, format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Check, Calendar as CalendarIcon, Package, User, Download } from "lucide-react";
import jsPDF from "jspdf";

const packages = [
  { id: "basic", name: "Classic Story", price: "₹25,000", features: ["6 Hours Coverage", "200 Edited Photos", "3-min Highlight Reel"] },
  { id: "pro", name: "Cinematic Grandeur", price: "₹50,000", features: ["Full Day Coverage", "500 Edited Photos", "10-min Mini-Film", "Drone Shots"] },
  { id: "luxury", name: "Heritage Collection", price: "₹85,000", features: ["2 Days Coverage", "Unlimited Photos", "20-min Documentary", "Drone + BTS", "Premium Photo Album"] },
];

export function BookingForm() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [selectedPackage, setSelectedPackage] = useState("pro");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    eventType: "wedding",
    duration: "fullday",
  });

  // Fetch booked dates from the API when the component mounts
  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const response = await fetch("/api/bookings");
        const data = await response.json();
        // The API returns date strings, so we convert them to Date objects
        const dates = data.map((dateString: string) => new Date(dateString));
        setBookedDates(dates);
      } catch (error) {
        toast({ title: "Error", description: "Could not fetch booked dates.", variant: "destructive" });
      }
    };
    fetchBookedDates();
  }, []);

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };
  
  const handleSelectChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const generateInvoice = () => {
    const doc = new jsPDF();
    const selectedPkg = packages.find(p => p.id === selectedPackage);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Sagar Films Studio - Booking Invoice", 20, 20);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Invoice #${Date.now()}`, 20, 30);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 35);

    doc.line(20, 40, 190, 40);

    doc.setFontSize(14);
    doc.text("Bill To:", 20, 50);
    doc.setFontSize(12);
    doc.text(formData.name, 20, 57);
    doc.text(formData.email, 20, 62);
    doc.text(formData.phone, 20, 67);

    doc.text("Event Details:", 100, 50);
    doc.text(`Date: ${date ? format(date, "PPP") : 'N/A'}`, 100, 57);
    doc.text(`Location: ${formData.location}`, 100, 62);
    doc.text(`Type: ${formData.eventType}`, 100, 67);

    doc.line(20, 80, 190, 80);

    doc.setFontSize(14);
    doc.text("Booking Summary", 20, 90);
    doc.setFontSize(12);
    doc.text(`Package: ${selectedPkg?.name}`, 20, 97);
    doc.text(`Price: ${selectedPkg?.price}`, 20, 102);

    doc.line(20, 110, 190, 110);
    
    doc.setFontSize(16);
    doc.text(`Total: ${selectedPkg?.price}`, 140, 120);

    doc.setFontSize(10);
    doc.text("Thank you for your business!", 20, 140);

    return doc;
  };

  const handleBookingConfirm = async () => {
    if (!date) {
      toast({ title: "Error", description: "Please select a date.", variant: "destructive" });
      return;
    }

    // Save the new booking to the server
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: date.toISOString() }), // Send in ISO format
      });
      if (!response.ok) throw new Error("Failed to save booking.");

      // Add the new date to our local state to instantly update the UI
      setBookedDates(prev => [...prev, date]);
      toast({ title: "Booking Saved", description: "Your date has been reserved." });

    } catch (error) {
      toast({ title: "Booking Error", description: "Could not save your booking. Please try again.", variant: "destructive" });
      return; // Stop if booking fails
    }

    // Generate and download the invoice
    const pdf = generateInvoice();
    pdf.save("SagarFilms_Invoice.pdf");

    // Move to the final confirmation step
    setStep(4);
  };
  
  if (step === 4) {
    return (
      <div className="p-12 text-center animate-in fade-in zoom-in duration-500">
        <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Check className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="font-headline text-3xl font-bold text-primary mb-4">Thank You!</h2>
        <p className="text-muted-foreground mb-8">Your booking for {date ? format(date, "PPP") : 'your selected date'} has been confirmed. An invoice has been downloaded.</p>
        <Button onClick={() => window.location.href = '/'} className="bg-primary">Return Home</Button>
      </div>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl overflow-hidden">
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className="lg:w-1/3 bg-gray-50 dark:bg-gray-900 p-8 border-r border-gray-200 dark:border-gray-800">
          <h3 className="font-headline text-2xl font-bold mb-10 text-primary">Reservation Steps</h3>
          <div className="space-y-8">
            {[
              { id: 1, label: "Event Details", icon: CalendarIcon },
              { id: 2, label: "Package Selection", icon: Package },
              { id: 3, label: "Confirm & Pay", icon: User },
            ].map((s) => (
              <div key={s.id} className={`flex items-center space-x-4 transition-all duration-300 ${step >= s.id ? "opacity-100" : "opacity-40"}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${step >= s.id ? "bg-primary text-primary-foreground border-primary" : "border-gray-400 text-gray-400"}`}>
                  {step > s.id ? <Check className="h-5 w-5"/> : <s.icon className="h-5 w-5" />}
                </div>
                <span className={`font-medium ${step >= s.id ? "text-primary font-bold" : ""}`}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 lg:p-12">
            {step === 1 && (
              <div className="space-y-8 animate-in slide-in-from-right duration-300">
                <h2 className="font-headline text-2xl font-bold text-primary">When and What?</h2>
                <div className="grid md:grid-cols-2 gap-12 items-start">
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">Select your date</Label>
                    <Card className="overflow-hidden shadow-lg">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={[
                          ...bookedDates, // Disable dates fetched from the server
                          { before: addDays(new Date(), 1) } // Disable past dates
                        ]}
                        initialFocus
                        className="p-0"
                        classNames={{
                          root: "w-full",
                          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                          month: "space-y-4",
                          caption: "flex justify-center pt-4 relative items-center text-lg font-bold",
                          nav: "space-x-1 flex items-center",
                          head_row: "flex justify-evenly w-full mt-4 font-semibold",
                          row: "flex w-full mt-2 justify-evenly",
                          day: "h-10 w-10 text-center text-base p-0 relative aria-selected:opacity-100",
                          day_selected: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-full",
                          day_today: "bg-accent text-accent-foreground rounded-full",
                          day_outside: "text-muted-foreground opacity-50",
                          day_disabled: "bg-muted text-muted-foreground opacity-50 cursor-not-allowed line-through", // Updated style for booked dates
                        }}
                      />
                    </Card>
                  </div>
                  <div className="space-y-8">
                    <div className="space-y-4">
                      <Label className="text-lg font-semibold">Event Type</Label>
                      <Select defaultValue={formData.eventType} onValueChange={(v) => handleSelectChange("eventType", v)}>
                        <SelectTrigger className="py-6 text-lg"> 
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
                    <div className="space-y-4">
                      <Label className="text-lg font-semibold">Expected Duration</Label>
                      <RadioGroup defaultValue={formData.duration} onValueChange={(v) => handleSelectChange("duration", v)} className="space-y-3">
                        <Label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors has-[:checked]:bg-accent has-[:checked]:text-accent-foreground has-[:checked]:border-accent">
                          <RadioGroupItem value="halfday" id="half" />
                          <span>Half Day (4-6 Hours)</span>
                        </Label>
                        <Label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-accent/50 transition-colors has-[:checked]:bg-accent has-[:checked]:text-accent-foreground has-[:checked]:border-accent">
                          <RadioGroupItem value="fullday" id="full" />
                          <span>Full Day (8-12 Hours)</span>
                        </Label>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-8">
                  <Button type="button" onClick={handleNext} size="lg" className="px-10" disabled={!date}>Next Step</Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-in slide-in-from-right duration-300">
                <h2 className="font-headline text-2xl font-bold text-primary">Choose Your Package</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {packages.map((pkg) => (
                    <Card 
                      key={pkg.id} 
                      className={`cursor-pointer transition-all border-2 flex flex-col ${selectedPackage === pkg.id ? "border-primary ring-2 ring-primary/20 scale-105" : "hover:shadow-lg"}`}
                      onClick={() => setSelectedPackage(pkg.id)}
                    >
                      <CardContent className="p-6 flex flex-col flex-grow">
                        <div className="text-xl font-bold mb-2 font-headline">{pkg.name}</div>
                        <div className="text-3xl font-bold text-primary mb-4">{pkg.price}</div>
                        <ul className="space-y-2 text-sm text-muted-foreground flex-grow">
                          {pkg.features.map((f, i) => (
                            <li key={i} className="flex items-start">
                              <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      {selectedPackage === pkg.id && (
                        <div className="mt-auto p-3 bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest text-center">
                          Selected
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
                <div className="flex justify-between pt-8">
                  <Button type="button" variant="outline" onClick={handleBack}>Back</Button>
                  <Button type="button" onClick={handleNext} size="lg" className="px-10">Next Step</Button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8 animate-in slide-in-from-right duration-300">
                <h2 className="font-headline text-2xl font-bold text-primary">Your Contact Details</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <Input id="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} required className="py-6"/>
                  <Input id="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} required className="py-6"/>
                  <Input id="phone" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} required className="py-6"/>
                  <Input id="location" placeholder="Event Location (City, Venue)" value={formData.location} onChange={handleInputChange} required className="py-6"/>
                </div>
                <Card className="bg-gray-50 dark:bg-gray-900/50 p-6 border-l-4 border-primary">
                  <h4 className="font-bold mb-3">Booking Summary</h4>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Package:</span>
                    <span className="font-bold">{packages.find(p => p.id === selectedPackage)?.name}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="font-bold">{packages.find(p => p.id === selectedPackage)?.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-bold">{date ? format(date, "PPP") : 'N/A'}</span>
                  </div>
                </Card>
                <div className="flex justify-between pt-8">
                  <Button type="button" variant="outline" onClick={handleBack}>Back</Button>
                  <Button onClick={handleBookingConfirm} size="lg" className="px-10 bg-green-600 hover:bg-green-700" disabled={!formData.name || !formData.email || !formData.phone}>
                    <Download className="mr-2 h-5 w-5" />
                    Confirm & Download Invoice
                  </Button>
                </div>
              </div>
            )}
        </div>
      </div>
    </Card>
  );
}
