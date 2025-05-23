import React from 'react'
import api from '@/lib/api';
import { useState , useEffect} from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from './ui/input';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

function DialogForInfo({openModal, setOpenModal}:any) {
    const { user, isAuthenticated, isAdmin, loading, fetchUser, logout } = useAuth();
    const [username, setUsername] = useState("");
    const [fullname, setFullname] = useState("");
    const [saving, setSaving] = useState(false);
    const router = useRouter();
    const [isProfileComplete, setIsProfileComplete] = useState(!!user?.fullname && !!user?.username);

  useEffect(() => {
    setIsProfileComplete(!!user?.fullname && !!user?.username);
  }, [user]);

    const handleSave = async () => {
        if (!username.trim() || !fullname.trim()) {
          alert("Both fields are required!");
          return;
        }
  
        setSaving(true);
  
        try {
          const response = await api.post("/users/update", { username, fullname }, { withCredentials: true });
          console.log(response);
          await fetchUser(); // Refresh user data
          setOpenModal(false); // Close modal after saving
          router.push("/dashboard"); // Ensure re-render
        } catch (err) {
          if(error){
            toast.error("Username already exists, try again!");
          } else {
            toast.error("Error updating profile, try again!");
          }
        } finally {
          setSaving(false);
        }
  
      }

      // const checkUsername = async () => {
      //   if (!username.trim() || !fullname.trim()) {
      //     alert("Both fields are required!");
      //     return;
      //   }
  
      //   setSaving(true);
  
      //   try {
      //     const response = await api.post("/users/update", { username, fullname });
      //     console.log(response);
      //     await fetchUser(); // Refresh user data
      //     setOpenModal(false); // Close modal after saving
      //     router.push("/dashboard"); // Ensure re-render
      //   } catch (error) {
      //     alert("Error updating profile, try again!");
      //   } finally {
      //     setSaving(false);
      //   }
  
      // }

      const [error, setError] = useState<string | null>(null);
      const [isChecking, setIsChecking] = useState(false);

      useEffect(() => {
          if (!username) {
            setError(null);
            return;
          }
      
          const checkusername = async () => {
            setIsChecking(true);
            try {
              const response = await api.post(`/users/check-username/${username}`);
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
        }, [username]);

  return (
    <div>
        <Dialog open={!isProfileComplete} >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Complete Your Profile</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <Input  type="text"
              placeholder="Full Name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}/>
            <Input  type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}/>
              
              {error && <p className="h-4 text-sm text-red-500 h-4">{error}</p>}

            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save & Continue"} {isChecking ?
                <Loader2 className="w-4 h-4 animate-spin dark:text-zinc-800 " />
                : <div className='w-4 h-4'></div>
                }
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default DialogForInfo