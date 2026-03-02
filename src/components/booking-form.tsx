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
import { 
  Check, 
  Calendar as CalendarIcon, 
  Package, 
  User, 
  Download, 
  ArrowRight, 
  PartyPopper,
  Camera,
  Clock,
  Image,
  Film,
  Award,
  Sparkles,
  Mail,
  Phone,
  UserCircle
} from "lucide-react";
import jsPDF from "jspdf";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const packages = [
  { 
    id: "basic", 
    name: "Classic Story", 
    price: "₹25,000", 
    features: ["6 Hours Coverage", "200 Edited Photos", "3-min Highlight Reel"],
    icon: Camera,
    color: "blue",
    popular: false
  },
  { 
    id: "pro", 
    name: "Cinematic Grandeur", 
    price: "₹50,000", 
    features: ["Full Day Coverage", "500 Edited Photos", "10-min Mini-Film", "Drone Shots"],
    icon: Film,
    color: "purple",
    popular: true
  },
  { 
    id: "luxury", 
    name: "Heritage Collection", 
    price: "₹85,000", 
    features: ["2 Days Coverage", "Unlimited Photos", "20-min Documentary", "Drone + BTS", "Premium Photo Album"],
    icon: Award,
    color: "amber",
    popular: false
  },
];

const formatPrice = (price: string) => {
  return price.replace('₹', '');
};

export function BookingForm() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [selectedPackage, setSelectedPackage] = useState("pro");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({ name: false, email: false, phone: false });

  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const response = await fetch("/api/bookings");
        const data = await response.json();
        setBookedDates(data.map((d: string) => new Date(d)));
      } catch (error) {
        toast({ 
          title: "Error", 
          description: "Could not fetch schedule. Please refresh the page.", 
          variant: "destructive" 
        });
      }
    };
    fetchBookedDates();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^[0-9]{10}$/.test(phone);
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      validateEmail(formData.email) &&
      validatePhone(formData.phone)
    );
  };

  const handleBookingConfirm = async () => {
    if (!date || !isFormValid()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          date: date.toISOString(),
          ...formData,
          package: selectedPackage 
        }),
      });
      
      if (!response.ok) throw new Error("Booking failed.");

      setBookedDates(prev => [...prev, date]);
      toast({ 
        title: "Success!", 
        description: `Your booking for ${format(date, "PPP")} is confirmed.`,
        className: "bg-green-50 border-green-200",
      });
      
      setIsConfirmed(true);
    } catch (error) {
      toast({ 
        title: "Error", 
        description: "Could not save your booking. Please try again.", 
        variant: "destructive" 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedPkg = packages.find(p => p.id === selectedPackage);

  if (isConfirmed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-full max-w-4xl mx-auto shadow-2xl border-0 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-background">
          <CardContent className="p-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <div className="relative inline-block">
                <PartyPopper className="w-20 h-20 text-primary mx-auto mb-6" />
                <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-4xl font-bold font-headline text-primary mb-4">
                Booking Confirmed! 🎉
              </h2>
              
              <div className="flex justify-center mb-6">
                <Avatar className="h-20 w-20 border-4 border-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                    {formData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              <p className="text-muted-foreground text-lg mb-2">
                Thank you, <span className="font-bold text-primary">{formData.name}</span>!
              </p>
              
              <div className="bg-primary/5 rounded-lg p-4 mb-6 max-w-md mx-auto">
                <p className="text-sm text-muted-foreground mb-1">Your session date</p>
                <p className="font-bold text-2xl text-primary">
                  {date ? format(date, "PPPP") : ""}
                </p>
              </div>
              
              <p className="text-muted-foreground mb-8">
                A confirmation email has been sent to <span className="font-medium">{formData.email}</span>
              </p>
              
              <div className="flex gap-4 justify-center">
                <Button onClick={() => window.location.reload()} size="lg" variant="outline">
                  Book Another Session
                </Button>
                <Button onClick={() => window.print()} size="lg" variant="ghost">
                  <Download className="mr-2 h-4 w-4" />
                  Save Confirmation
                </Button>
              </div>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full max-w-6xl mx-auto shadow-2xl border-0 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Left Panel: Calendar */}
          <div className="p-8 lg:p-10 bg-gradient-to-br from-primary/5 via-background to-background">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="font-headline text-3xl lg:text-4xl text-primary flex items-center gap-3">
                <CalendarIcon className="h-8 w-8" />
                Select a Date
              </CardTitle>
              <p className="text-muted-foreground mt-2">
                Choose your preferred date for the photoshoot
              </p>
            </CardHeader>
            
            <div className="mt-6">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={[{ before: new Date() }, ...bookedDates]}
                className="rounded-md"
                classNames={{
                  day_selected: "bg-primary text-primary-foreground hover:bg-primary/90 focus:bg-primary",
                  day_today: "bg-accent/50 text-accent-foreground font-bold",
                  day_disabled: "text-muted-foreground/30 line-through cursor-not-allowed",
                  day: "h-12 w-12 p-0 font-normal aria-selected:opacity-100 hover:bg-primary/10 transition-colors",
                }}
                components={{
                  Day: ({ date: dayDate, ...props }) => {
                    const isBooked = bookedDates.some(bookedDate => isSameDay(bookedDate, dayDate));
                    const isSelected = date && isSameDay(dayDate, date);
                    return (
                      <div
                        {...props}
                        className={`
                          ${props.className} relative
                          ${isBooked ? 'text-red-500/50' : ''}
                          ${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''}
                        `}
                      >
                        {dayDate.getDate()}
                        {isBooked && (
                          <div className="absolute bottom-1 left-1/2 -translate-x-1/2">
                            <Badge variant="destructive" className="h-1.5 w-1.5 p-0 rounded-full" />
                          </div>
                        )}
                      </div>
                    );
                  }
                }}
              />
            </div>
            
            <div className="mt-6 flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <span className="text-muted-foreground">Booked</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-primary rounded-full"></div>
                <span className="text-muted-foreground">Selected</span>
              </div>
            </div>
          </div>

          {/* Right Panel: Booking Details */}
          <div className="p-8 lg:p-10">
            <AnimatePresence mode="wait">
              {!date ? (
                <motion.div
                  key="no-date"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full min-h-[400px] text-center"
                >
                  <div className="relative">
                    <CalendarIcon className="w-32 h-32 text-primary/20 mb-6" />
                    <Sparkles className="w-8 h-8 text-yellow-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <h3 className="font-headline text-2xl text-gray-700 mb-2">
                    Your Schedule Awaits
                  </h3>
                  <p className="text-muted-foreground max-w-sm">
                    Select a date from the calendar to begin your booking process and capture your special moments.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="with-date"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="font-headline text-3xl text-primary mb-1">
                      Complete Your Booking
                    </h3>
                    <div className="flex items-center gap-2 bg-primary/10 p-3 rounded-lg">
                      <CalendarIcon className="h-5 w-5 text-primary" />
                      <p className="font-medium">
                        Selected: <span className="text-primary font-bold">{format(date, "PPPP")}</span>
                      </p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  {/* Package Selection */}
                  <div className="space-y-4">
                    <Label className="font-headline text-xl flex items-center gap-2">
                      <Package className="h-5 w-5" />
                      Choose Your Package
                    </Label>
                    
                    <RadioGroup 
                      value={selectedPackage} 
                      onValueChange={setSelectedPackage} 
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      {packages.map(pkg => {
                        const Icon = pkg.icon;
                        const isSelected = selectedPackage === pkg.id;
                        return (
                          <Label
                            key={pkg.id}
                            className={`
                              relative border-2 rounded-xl p-4 cursor-pointer
                              transition-all duration-200 overflow-hidden
                              ${isSelected 
                                ? `border-${pkg.color}-500 bg-${pkg.color}-50/50 shadow-lg` 
                                : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                              }
                            `}
                          >
                            {pkg.popular && (
                              <Badge className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white border-0">
                                Most Popular
                              </Badge>
                            )}
                            
                            <RadioGroupItem value={pkg.id} className="sr-only" />
                            
                            <div className="flex items-start gap-3">
                              <div className={`
                                p-2 rounded-lg
                                ${isSelected ? `bg-${pkg.color}-100` : 'bg-gray-100'}
                              `}>
                                <Icon className={`h-5 w-5 text-${pkg.color}-600`} />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-bold text-lg">{pkg.name}</h4>
                                <p className={`font-bold text-2xl text-${pkg.color}-600`}>
                                  {pkg.price}
                                </p>
                              </div>
                            </div>
                            
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute bottom-2 right-2"
                              >
                                <Check className={`h-5 w-5 text-${pkg.color}-600`} />
                              </motion.div>
                            )}
                          </Label>
                        );
                      })}
                    </RadioGroup>
                    
                    <div className="mt-4">
                      <Select onValueChange={setSelectedPackage} defaultValue={selectedPackage}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="View all packages..." />
                        </SelectTrigger>
                        <SelectContent>
                          {packages.map(pkg => (
                            <SelectItem key={pkg.id} value={pkg.id}>
                              <div className="flex justify-between items-center w-full">
                                <span>{pkg.name}</span>
                                <span className="font-bold text-primary ml-4">{pkg.price}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {selectedPkg && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="bg-primary/5 rounded-lg p-4"
                      >
                        <h5 className="font-semibold mb-2 flex items-center gap-2">
                          <Award className="h-4 w-4" />
                          Package Features:
                        </h5>
                        <ul className="grid grid-cols-2 gap-2">
                          {selectedPkg.features.map((feature, index) => (
                            <li key={index} className="text-sm flex items-center gap-1">
                              <Check className="h-3 w-3 text-green-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </div>
                  
                  <Separator />
                  
                  {/* Personal Details */}
                  <div className="space-y-4">
                    <Label className="font-headline text-xl flex items-center gap-2">
                      <UserCircle className="h-5 w-5" />
                      Your Details
                    </Label>
                    
                    <div className="space-y-4">
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="name"
                          placeholder="Full Name"
                          value={formData.name}
                          onChange={handleInputChange}
                          onBlur={() => handleBlur('name')}
                          className="pl-10"
                          required
                        />
                        {touched.name && !formData.name && (
                          <p className="text-xs text-red-500 mt-1">Name is required</p>
                        )}
                      </div>
                      
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={handleInputChange}
                          onBlur={() => handleBlur('email')}
                          className="pl-10"
                          required
                        />
                        {touched.email && !validateEmail(formData.email) && (
                          <p className="text-xs text-red-500 mt-1">Valid email is required</p>
                        )}
                      </div>
                      
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          placeholder="Phone Number (10 digits)"
                          value={formData.phone}
                          onChange={handleInputChange}
                          onBlur={() => handleBlur('phone')}
                          className="pl-10"
                          maxLength={10}
                          required
                        />
                        {touched.phone && !validatePhone(formData.phone) && (
                          <p className="text-xs text-red-500 mt-1">Valid 10-digit phone number is required</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <CardFooter className="px-0 pb-0 pt-6">
                    <Button
                      onClick={handleBookingConfirm}
                      size="lg"
                      className="w-full text-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary"
                      disabled={!isFormValid() || isSubmitting}
                    >
                      {isSubmitting ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles className="h-5 w-5" />
                        </motion.div>
                      ) : (
                        <>
                          Confirm Booking for {selectedPkg?.price}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                    
                    <p className="text-xs text-center text-muted-foreground mt-4">
                      By confirming, you agree to our terms and conditions. We'll send you a confirmation email with further details.
                    </p>
                  </CardFooter>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}