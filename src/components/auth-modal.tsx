
"use client";

import { useState } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup,
  sendPasswordResetEmail
} from "firebase/auth";
import { auth, firestore } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Mail } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
        <path fill="currentColor" d="M488 261.8C488 403.3 381.5 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-69.8 69.8C324.9 110.2 289.1 96 248 96c-88.8 0-160.1 71.3-160.1 160s71.3 160 160.1 160c98.1 0 139.6-70.2 145.1-105.2H248v-69.1h236.3c2.4 12.7 3.7 26.1 3.7 40.8z"></path>
    </svg>
);

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const resetState = () => {
      setError(null);
      setMessage(null);
      setEmail('');
      setPassword('');
  }

  const handleClose = () => {
      resetState();
      onClose();
  }

  const handleAuthAction = async () => {
    resetState();
    if (!email || !password) {
        setError("Please enter both email and password.");
        return;
    }
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(firestore, "users", userCredential.user.uid), {
          email: userCredential.user.email,
          role: "user",
        });
      }
      handleClose();
    } catch (err: any) {
      setError(err.message.replace("Firebase: ", ""));
    }
  };

  const handleGoogleSignIn = async () => {
    resetState();
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userDocRef = doc(firestore, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        await setDoc(userDocRef, { email: user.email, role: "user", displayName: user.displayName, photoURL: user.photoURL });
      }
      handleClose();
    } catch (err: any) {
      setError(err.message.replace("Firebase: ", ""));
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setError("Please enter your email to reset your password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link sent! Check your inbox.");
      setError(null);
    } catch (err: any) {
      setError(err.message.replace("Firebase: ", ""));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md p-0">
        <Card className="border-none shadow-none">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">{isLogin ? "Welcome Back" : "Create an Account"}</CardTitle>
              <CardDescription>
                {isLogin ? "Sign in to continue to your account." : "Fill in the details below to join us."}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Authentication Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {message && (
                <Alert>
                  <Mail className="h-4 w-4" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              )}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              {isLogin && (
                <div className="text-right">
                    <Button onClick={handlePasswordReset} variant="link" className="px-0 text-xs">
                        Forgot password?
                    </Button>
                </div>
              )}
              <Button onClick={handleAuthAction} className="w-full">
                {isLogin ? "Login" : "Create Account"}
              </Button>
              <div className="relative my-2">
                <Separator />
                <span className="absolute left-1/2 -translate-x-1/2 -top-3 bg-card px-2 text-muted-foreground text-sm">OR</span>
              </div>
              <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
                <GoogleIcon /> Continue with Google
              </Button>
            </CardContent>
            <CardFooter className="flex justify-center text-sm">
                <p>{isLogin ? "Don't have an account?" : "Already have an account?"}</p>
                <Button variant="link" className="ml-1 px-1" onClick={() => { setIsLogin(!isLogin); resetState(); }}>
                    {isLogin ? "Sign up" : "Login"}
                </Button>
            </CardFooter>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
