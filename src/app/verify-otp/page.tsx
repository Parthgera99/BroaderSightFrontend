// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/context/UserContext";
// import { toast } from "sonner";
// import api from "@/lib/api";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {InputOTP,InputOTPGroup,InputOTPSlot} from "@/components/ui/input-otp"



// export default function OtpForm() {
//   const router = useRouter();
//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const {fetchUser,} = useAuth();

//   // useEffect(() => {
//   //   if (!authLoading && user) {
//   //     router.replace("/dashboard");
//   //   }
//   // }, [user, authLoading, router]);

  
//   // if(authLoading){
//   //   return <div>Loading...</div>;
//   // }

//   useEffect(() => {
//     const email = sessionStorage.getItem('emailForVerification'); 
//     if (!email) {
//       router.push("/sign-in"); // Redirect to sign-in if email is missing
//     }
//   }, []);

//   useEffect(() => {
//     if (otp.length === 6) {
//       handleSubmit();
//     }
//   }, [otp]);

//   const handleSubmit = async (event?: React.FormEvent) => {
//     if (event) event.preventDefault();
//     if (loading) return; 

//     if (otp.length !== 6) {
//       toast.error("Please enter a 6-digit OTP.");
//       return;
//     }

//     setLoading(true);
//     setError("");


//     try {
//       const email = sessionStorage.getItem('emailForVerification');  // Retrieve the stored email from session storage
//       const response = await api.post("/users/verifyotp", { email,otp });
//       toast.success("OTP verified successfully!");
//       if (response.data.success) {
//         await fetchUser();
//           router.replace("/dashboard"); // Otherwise, go to dashboard
//       } else {
//         setError("Invalid OTP. Try again.");
//       }
//       // Handle successful verification (e.g., redirect or update UI)
//     } catch (error) {
//       toast.error("OTP verification failed. Please try again.");
//       setError("Something went wrong. Please try again.");
//       // Handle error (e.g., display error message)
//     } finally{
//         setLoading(false)
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <Card className="w-[350px] p-6">
//         <CardHeader>
//           <CardTitle className="text-center text-xl">Enter OTP</CardTitle>
//         </CardHeader>
//         <CardContent className="flex flex-col items-center gap-4">
            
//         <InputOTP maxLength={6} value={otp} onChange={setOtp}>
//             <InputOTPGroup>
//                 {[...Array(6)].map((_, i) => (
//                     <InputOTPSlot key={i} index={i} />
//                 ))}
//             </InputOTPGroup>
//         </InputOTP>
        
//         {error && <p className="text-red-500 mt-2">{error}</p>}

//         <Button onClick={handleSubmit} disabled={loading} className="w-full">
//             {loading ? "Verifying..." : "Verify OTP"}
//         </Button>

//         </CardContent>
//       </Card>
//     </div>
//   );
// }




"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/UserContext";
import { toast } from "sonner";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export default function OtpForm() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { fetchUser, user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading) {
      if (user) {
        router.replace("/dashboard"); // Prevent logged-in users from accessing this page
      } else if (!sessionStorage.getItem("emailForVerification")) {
        router.replace("/sign-in"); // If no email exists, force the user to sign in
      }
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (otp.length === 6) {
      handleSubmit();
    }
  }, [otp]);

  const handleSubmit = async (event?: React.FormEvent) => {
    if (event) event.preventDefault();
    if (loading || otp.length !== 6) return;

    setLoading(true);
    setError("");

    try {
      const email = sessionStorage.getItem("emailForVerification");
      const response = await api.post("/users/verifyotp", { email, otp });

      if (response.data.success) {
        toast.success("OTP verified successfully!");
        await fetchUser(); // Fetch latest user data
        router.replace("/dashboard");
      } else {
        setError("Invalid OTP. Try again.");
      }
    } catch (error) {
      toast.error("OTP verification failed. Please try again.");
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // **Prevent rendering if user is still being determined**
  if (authLoading || user) return null;

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
          <div className="text-xs text-gray-500 ">
            Note:
            <p className="text-xs text-yellow-500">Please check the Spam folder if email not visible.</p>
          </div>

          {error && <p className="text-red-500 mt-2">{error}</p>}

          <Button onClick={handleSubmit} disabled={loading} className="w-full">
            {loading ? "Verifying..." : "Verify OTP"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
