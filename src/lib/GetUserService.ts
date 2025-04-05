import { cookies } from 'next/headers';
import api from './api';
import axios from 'axios';


type User = {
  id: string;
  fullname: string;
  email: string;
  profilePicture?:string;
  username?:string;
  mobileNumber?:string;
  bio?:string;
  earnings?:number;
  blogs:Blog[];
  role: "user" | "admin";
  createdAt: Date;
}

type Blog = {
  _id: string;
  displayImage: string;
  title: string;
  slug: string;
  metaDescription: string;
  metaTitle:string;
  date: string;
  tags:string[];
  faq:[{
      question:string,
      answer:string
  }];
  author:{
    fullname: string;
    username: string;
    profilePicture: string;
    role: string;
  }
  content:[{
      type:string,
      value:any
  }]
};

export async function getUser(): Promise<User | null> {

    try {
        const cookieStore = await cookies();
        const cookieString = cookieStore
            .getAll()
            .map((c) => `${c.name}=${c.value}`)
            .join("; ");
        const response = await api.get("/users/details", {
            headers: {
                Cookie: cookieString,
            },
        });
  
      if (!response) {
        console.log("Failed to fetch user details")
      }
    //   console.log(response)
      return response?.data.data.givableUser
    } catch (err) {
        // console.log(err)
        if (axios.isAxiosError(err)) {
            let errror = err.response?.status;
            if(errror = 404){
                return null
            }
            console.error("API error:", err.response?.data || err.message);
        } else {
            console.error("Unexpected error:", err);
        }
        return null;  
  }
}


export async function getUserProfile(username:string): Promise<User | null> {

    try {
      const response = await api.get(`/blog/profile/${username}`);
      // console.log(response?.data.data.user);
      return response?.data.data.user;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
}