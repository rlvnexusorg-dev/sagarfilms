
"use client";

import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Star } from 'lucide-react';

interface Review {
  id?: string;
  name: string;
  review: string;
  rating: number;
  createdAt: Date;
}

function ReviewForm({ onReviewAdded }: { onReviewAdded: (review: Review) => void }) {
  const [name, setName] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !review || rating < 1) {
      toast({ title: "Please fill all fields and provide a rating.", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      const newReview: Omit<Review, 'id'> = { name, review, rating, createdAt: new Date() };
      const docRef = await addDoc(collection(firestore, 'reviews'), newReview);
      onReviewAdded({ id: docRef.id, ...newReview });
      setName('');
      setReview('');
      setRating(5);
      toast({ title: "Thank you for your review!" });
    } catch (error) {
      console.error("Error adding review: ", error);
      toast({ title: "Failed to submit review.", variant: "destructive" });
    }
    setIsSubmitting(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardContent className="p-8">
        <h3 className="text-2xl font-bold font-headline text-primary mb-6">Leave a Review</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="py-6"
          />
          <Textarea
            placeholder="Share your experience..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
            rows={4}
          />
          <div className="space-y-2">
            <label className="font-medium">Rating</label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-8 h-8 cursor-pointer transition-colors ${rating >= star ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full py-6 text-lg">
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const q = query(collection(firestore, 'reviews'), orderBy('createdAt', 'desc'), limit(5));
        const querySnapshot = await getDocs(q);
        const fetchedReviews = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Review));
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Error fetching reviews: ", error);
      }
      setIsLoading(false);
    };
    fetchReviews();
  }, []);

  const handleReviewAdded = (newReview: Review) => {
    setReviews([newReview, ...reviews]);
  }

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl font-bold text-primary">What Our Clients Say</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-4">
            Hear from couples who trusted us to capture their special day.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            {isLoading ? (
              <p>Loading reviews...</p>
            ) : reviews.length > 0 ? (
              reviews.map((review) => (
                <Card key={review.id} className="p-6 shadow-lg">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-bold text-lg">{review.name}</p>
                        <div className="flex items-center">
                          {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />)}
                          {[...Array(5 - review.rating)].map((_, i) => <Star key={i} className="w-5 h-5 text-gray-300" />)}
                        </div>
                      </div>
                      <p className="text-muted-foreground italic">\"{review.review}\"</p>
                    </div>
                  </div>
                </Card>
              ))
            ) : (
              <p>No reviews yet. Be the first to leave one!</p>
            )}
          </div>
          <ReviewForm onReviewAdded={handleReviewAdded} />
        </div>
      </div>
    </section>
  );
}
