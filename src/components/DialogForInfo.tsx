import React from 'react'
import api from '@/lib/api';
import { useState , useEffect} from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/context/UserContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Input } from './ui/input';

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
          const response = await api.post("/users/update", { username, fullname });
          console.log(response);
          await fetchUser(); // Refresh user data
          setOpenModal(false); // Close modal after saving
          router.push("/dashboard"); // Ensure re-render
        } catch (error) {
          alert("Error updating profile, try again!");
        } finally {
          setSaving(false);
        }
  
      }


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

            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save & Continue"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default DialogForInfo