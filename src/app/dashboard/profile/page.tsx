"use client"
import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/UserContext';
import { Loader2, Pencil, User2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import api from '@/lib/api';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import axios from 'axios';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';



function page() {
  const { user, isAuthenticated, isAdmin, loading, fetchUser, logout } = useAuth(); 
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [saving, setSaving] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    fullname: "",
    bio: "",
    mobileNumber: ""
  });
  const [emailModal, setEmailModal] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [loader, setLoader] = useState(false);
  const [otp, setOtp] = useState("");
  const [verifyingOTP, setVerifyingOTP] = useState(false);

  const [logoutModal, setLogoutModal] = useState(false);

  const verifyOTP = async () => {
    setVerifyingOTP(true);

    try {
      const response = await api.post(`/users/verifyotp`, { email : user?.email,  otp, newEmail : email });
      console.log(response)
      toast.success("Email updated successfully!");
      await fetchUser(); // Refresh user data
      setOtpModal(false);
      setEmail("");
      setOtp("");

    } catch (err) {
      let errorMessage = "An unexpected error occurred";

      if (axios.isAxiosError(err) && err.response) {
        errorMessage = err.response.data.message || "Something went wrong";
      }
      toast.error(errorMessage);
    }
  }

  const handleEmailChange = async (e: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation regex
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      toast.error("Please enter a valid email address");
      return;
    } else {
      setEmailError("");
    }

    try {
      setLoader(true);
      const response = await api.post(`/users/update-email`, { email }, { withCredentials: true });
      setEmailModal(false);
      setOtpModal(true);
      setLoader(false);
      console.log(response)
    } catch (err:unknown) {
      let errorMessage = "An unexpected error occurred";
      
      // Check if the error is an instance of Error
      if (axios.isAxiosError(err) && err.response) {
        errorMessage = err.response.data.message || "Something went wrong";
      }
      
      setLoader(false);
      toast.error(errorMessage);
    }
  };

  const logoutFn = () => {
    logout();
    setLogoutModal(false);
  };

  const changeEmail = () => {
    setEmailModal(true);
  };


  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const MAX_FILE_SIZE = 8 * 1024 * 1024; // 5MB

  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Trigger file selection
  };


  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("profilePicture", file);

    if (file.size > MAX_FILE_SIZE) {
      toast.error("Please upload an image with size less than 8MB.");
      return;
    }

    setUploading(true);

    try {
      console.log(file)
      const response = await api.post(`/users/updateprofilepicture`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }, );

      console.log(response);
      await fetchUser();
      toast.success("Image updated successfully!");

    } catch (error) {
      toast.error("Image update failed");
    } finally {
      setUploading(false);
    }
  };
  

  useEffect(() => {
    fetchUser().finally(() => {
      setCheckingAuth(false);
    });
  }, []);

  useEffect(() => {
    if (user) {
      setUserData({
        username: user.username || "",
        fullname: user.fullname || "",
        bio: user.bio || "",
        mobileNumber: user.mobileNumber || "",
      });
    }
  }, [user]);

   useEffect(() => {
      if ( !checkingAuth && !loading && !user) {
        router.replace("/sign-in"); 
      }
    }, [user, loading, checkingAuth, router]);

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!userData.username.trim() || !userData.fullname.trim()) {
        alert("Both fields are required!");
        return;
      }

      setSaving(true);

      try {
        const response = await api.post("/users/update", { username: userData.username, fullname: userData.fullname, bio: userData.bio, mobileNumber: userData.mobileNumber }, { withCredentials: true });
        console.log(response);
        await fetchUser(); // Refresh user data
        toast.success("Profile updated successfully!");
      } catch (err) {
        if(error){
          toast.error("Username already exists, try again!");
        } else {
          console.log(err)
          toast.error("Error updating profile, try again!");
        }
      } finally {
        setSaving(false);
      }

    }

    
    useEffect(() => {
      if (!userData.username) {
        setError(null);
        return;
      }
      
      const checkusername = async () => {
        setIsChecking(true);
        try {
          const response = await api.post(`/users/check-username/${userData.username}` , {user : user});
          console.log(response)
          if (response.data.data.exists) {
            setError("This username already exists. Please choose another.");
          } else {
            setError(null);
          }
        } catch (error) {
          console.error("Error checking title:", error);
          setError("Error checking title. Try again.");
        }
        setIsChecking(false);
      };
      
      // Debounce the API call (wait 500ms after user stops typing)
      const timeout = setTimeout(checkusername, 500);
      
      return () => clearTimeout(timeout);
    }, [userData.username]);
    
    
    const handleChange = (e:any) => {
      const { name, value } = e.target;
      setUserData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };
    
    if(checkingAuth || loading || !user || uploading){
      return (
      <div className='w-[700px] h-[700px] flex flex-col gap-8 mx-auto my-16'>
        <Skeleton className='w-32 h-10 mb-4'/>
        <Skeleton className='w-[120px] h-[120px] rounded-full mb-2'/>
        <div className='w-[550px] flex flex-col gap-2'>
          <Skeleton className='w-16 h-6 rounded-xl'/>
          <Skeleton className='w-full h-10 rounded-2xl'/>
        </div>
        <div className='w-[550px] flex flex-col gap-2'>
          <Skeleton className='w-24 h-6 rounded-xl'/>
          <Skeleton className='w-full h-10 rounded-2xl'/>
        </div>
        <div className='w-[550px] flex flex-col gap-2'>
          <Skeleton className='w-24 h-6 rounded-xl'/>
          <Skeleton className='w-[80%] h-10 rounded-2xl'/>
        </div>
      </div>
      );
    }


  return (
    <div className='w-[700px] 2xl:w-[850px] max-lg:w-full max-lg:px-16 max-sm:px-6 flex flex-col gap-8 mx-auto my-16'>
        <h1 className='text-4xl mb-4 font-bold text-purple-700 dark:text-purple-300 max-sm:text-center font-montserrat'>Profile</h1>
        {/* Image  */}
        <input type="file" ref={fileInputRef} accept="image/*" onChange={handleImageUpload} className="hidden" />
        <div onClick={handleButtonClick} className='cursor-pointer max-sm:mx-auto group relative w-[120px] h-[120px] rounded-full bg-purple-500'>
          {user.profilePicture ? 
              <img src={user.profilePicture} className='w-[120px] h-[120px] object-cover group-hover:opacity-50 duration-300 rounded-full border'/>
          : 
            <div className='w-[120px] h-[120px] rounded-full flex justify-center items-center border bg-purple-500'>
              <User2 className='w-10 h-10 group-hover:opacity-50 duration-300 text-zinc-800 dark:text-zinc-100'/>
            </div>
          }
          <div className='absolute inset-0 flex items-center justify-center'>
            <Pencil className='w-6 h-6 opacity-0 group-hover:opacity-100 text-zinc-700 dark:text-zinc-100 duration-300'/>
          </div>
        </div>
        
        {/* Email  */}
        <div className='flex flex-col gap-2'>
          <p className='text-lg font-normal dark:text-zinc-100 text-zinc-700'>Email</p>
          <div className='py-2 px-6 w-[550px] 2xl:w-[650px] max-sm:w-full flex justify-between items-center bg-zinc-100 dark:bg-zinc-600 rounded-2xl'>
            <h2 className='text-lg max-sm:text-base text-zinc-400 dark:text-zinc-400 font-semibold font-montserrat'>{user.email}</h2>
            <div className='cursor-pointer rounded-xl bg-zinc-200 dark:bg-zinc-700 hover:dark:bg-purple-700 hover:bg-purple-300 duration-300 p-2 max-sm:hidden' onClick={ changeEmail }>
              <Pencil className='w-6 h-6 text-zinc-700 dark:text-zinc-100'/>
            </div>
          </div>
          <p className='self-end text-zinc-700 dark:text-zinc-100 text-sm font-normal sm:hidden flex gap-2 bg-zinc-200 dark:bg-zinc-700 py-1 px-2 w-fit rounded-lg' onClick={ changeEmail }>Edit <Pencil className='w-4 h-4 text-zinc-700 dark:text-zinc-100'/></p>
        </div>
       {/* Other Info  */}
    <form onSubmit={handleSave} className='flex flex-col gap-8'>
      {/* Full Name */}
      <div className='flex flex-col gap-2'>
        <label className='text-lg dark:text-zinc-100 text-zinc-700 font-medium' htmlFor='fullname'>Full Name</label>
        <input 
          className='py-2 text-lg max-sm:text-base px-6 dark:bg-zinc-800 bg-zinc-200 text-zinc-700 dark:text-zinc-200 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-700 w-[550px] 2xl:w-[650px] max-sm:w-[90%] rounded-2xl' 
          type="text" 
          id="fullname"
          placeholder="Full Name" 
          value={userData.fullname} 
          required
          name='fullname' 
          onChange={handleChange} 
          minLength={3}
          maxLength={30}
        />
      </div>

      {/* Username */}
      <div className='flex flex-col gap-2'>
        <label className='text-lg font-medium dark:text-zinc-100 text-zinc-700' htmlFor='username'>Username</label>
        <input 
          className='py-2 text-lg max-sm:text-base px-6 dark:bg-zinc-800 bg-zinc-200 text-zinc-700 dark:text-zinc-200 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-700 w-[450px] 2xl:w-[550px] max-sm:w-[80%] rounded-2xl' 
          type="text" 
          id="username"
          placeholder="Username" 
          value={userData.username} 
          name='username' 
          onChange={handleChange} 
          required
          minLength={3}
          maxLength={20}
        />
        {isChecking &&
                <Loader2 className="w-4 h-4 animate-spin dark:text-zinc-800 " />
                }
        {error && <p className="h-4 text-sm text-red-500 h-4">{error}</p>}
      </div>

      {/* Bio */}
      <div className='flex flex-col gap-2'>
        <label className='text-lg font-medium dark:text-zinc-100 text-zinc-700' htmlFor='bio'>Bio</label>
        <textarea 
          className='py-2 text-lg max-sm:text-base px-6 dark:bg-zinc-800 bg-zinc-200 text-zinc-700 dark:text-zinc-200 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-700 w-[700px] 2xl:w-[850px] max-sm:w-full max-lg:w-[550px] rounded-2xl' 
          id="bio"
          placeholder="Bio" 
          value={userData.bio} 
          name='bio' 
          onChange={handleChange} 
          maxLength={200}
          rows={3}
        />
      </div>

      {/* Mobile Number */}
      <div className='flex flex-col gap-2'>
        <label className='text-lg font-medium dark:text-zinc-100 text-zinc-700' htmlFor='mobileNumber'>Mobile Number</label>
        <input 
          className='py-2 text-lg max-sm:text-base px-6 dark:bg-zinc-800 bg-zinc-200 text-zinc-700 dark:text-zinc-200 border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-700 w-[450px] 2xl:w-[550px] max-sm:w-[90%] rounded-2xl' 
          type="tel" 
          id="mobileNumber"
          placeholder="Mobile Number" 
          value={userData.mobileNumber} 
          name='mobileNumber' 
          onChange={handleChange} 
          pattern="^\d{10}$"
          title='Mobile number should be 10 digits'
        />
      </div>

      <button type='submit' disabled={saving} className='border border-input dark:bg-green-700 bg-green-300 shadow-sm dark:text-zinc-50 text-zinc-700 font-semibold dark:hover:bg-purple-700 hover:bg-purple-200 text-base duration-300 px-4 py-2 rounded-2xl w-[200px] max-sm:mx-auto'>
        Save Changes
      </button>
    </form>

    <div className="h-[1px] mt-8 w-full bg-zinc-200 dark:bg-zinc-800">
        {/* Divider  */}
    </div>

    <Button className='w-fit' onClick={() => setLogoutModal(true)} variant={"destructive"}>Logout</Button>


    <Dialog open={emailModal} onOpenChange={setEmailModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter New Email</DialogTitle>
        </DialogHeader>
        <div>
          <Input type="email" placeholder="New Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {emailError && <p style={{ color: "red" }}>{emailError}</p>}
        </div>
        <div className="flex justify-end gap-4">
          <Button onClick={() => setEmailModal(false)} variant="outline">Cancel</Button>
          <Button onClick={() => handleEmailChange(email)} variant="unselected" disabled={loader} className='dark:bg-green-700 bg-green-300'>{loader ? <Loader2 className="w-4 h-4 animate-spin dark:text-zinc-50 text-zinc-950"></Loader2> : "Continue"}</Button>
        </div>
      </DialogContent>
    </Dialog>

    <Dialog open={otpModal}>
      <DialogContent className='flex flex-col items-center'>
        <DialogHeader>
          <DialogTitle>Enter OTP</DialogTitle>
        </DialogHeader>
        <div className='text-center self-center'>
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              {[...Array(6)].map((_, i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
        <div className="flex justify-end gap-4">
          <Button onClick={verifyOTP} disabled={verifyingOTP} className="w-full">
            {verifyingOTP ? <Loader2 className="w-4 h-4 animate-spin dark:text-zinc-50 text-zinc-950"></Loader2> : "Verify OTP"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>

    <Dialog open={logoutModal} onOpenChange={setLogoutModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Logout</DialogTitle>
        </DialogHeader>
        <p>Are you sure you want to Logout?</p>
        <div className="flex justify-end gap-4">
          <Button onClick={() => setLogoutModal(false)} variant="outline">Cancel</Button>
          <Button onClick={logoutFn} variant="destructive">Logout</Button>
        </div>
      </DialogContent>
    </Dialog>

    </div>
  )
}

export default page