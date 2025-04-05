"use client";

import { useState , useEffect} from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import api from "@/lib/api";
import { toast } from "sonner";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {useAuth} from "@/context/UserContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const SignUpSchema = z.object({
  email: z.string().email("Invalid email"),
});


export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { user , loading: authLoading} = useAuth();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  useEffect(() => {
    if (user) {
      router.replace("/dashboard");
    }
  }, [user]);

  if (authLoading || user) return null;

  const onSubmit = async (data: any) => {
    setLoading(true);
    console.log(data)
    try {
      const response = await api.post("/users/signin", data);
      console.log(response);
      toast.success("OTP sent Successfully");
      sessionStorage.setItem('emailForVerification', data.email);
      router.push("/verify-otp");
    } catch (err) {
      const error = err as { response?: { data?: { message?: string } }; message?: string };

      // ✅ Extract message properly
      const errorMessage = error.response?.data?.message || error.message || "Sign-up failed ❌";
      // console.error("API Error:", errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className={cn("flex flex-col h-[60svh] gap-16", className)} {...props}>
      <Card>
        <CardHeader className="flex flex-col gap-3">
          <CardTitle className="text-2xl">Signup or Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your existing account or Create a new Account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input {...register("email")} placeholder="Enter your Email" />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
              <Button type="submit"  disabled={loading} className="w-full">
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}