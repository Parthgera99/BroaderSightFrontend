"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { toast } from "sonner";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {InputOTP,InputOTPGroup,InputOTPSlot} from "@/components/ui/input-otp"



export default function OtpForm() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const email = sessionStorage.getItem('emailForVerification'); 
    if (!email) {
      router.push("/sign-in"); // Redirect to sign-in if email is missing
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (otp.length !== 6) {
      toast.error("Please enter a 6-digit OTP.");
      return;
    }

    setLoading(true);
    setError("");


    try {
      const email = sessionStorage.getItem('emailForVerification');  // Retrieve the stored email from session storage  
      const response = await api.post("/users/verifyotp", { email,otp });
      console.log(response)
      toast.success("OTP verified successfully!");
      if (response.data.success) {
        router.push("/dashboard"); // Redirect to dashboard
      } else {
        setError("Invalid OTP. Try again.");
      }
      // Handle successful verification (e.g., redirect or update UI)
    } catch (error) {
      toast.error("OTP verification failed. Please try again.");
      setError("Something went wrong. Please try again.");
      // Handle error (e.g., display error message)
    } finally{
        setLoading(false)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Card className="w-[350px] p-6">
        <CardHeader>
          <CardTitle className="text-center text-xl">Enter OTP</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
            
        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
                {[...Array(6)].map((_, i) => (
                    <InputOTPSlot key={i} index={i} />
                ))}
            </InputOTPGroup>
        </InputOTP>
        
        {error && <p className="text-red-500 mt-2">{error}</p>}

        <Button onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? "Verifying..." : "Verify OTP"}
        </Button>

        </CardContent>
      </Card>
    </div>
  );
}
