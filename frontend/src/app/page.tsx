"use client"
import Navgation from "@/components/Shared/Navagation/Navgation";
import Conversation from "@/components/Shared/Conversation/Conversation";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Home() {

  const { authUser, isLoading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push("/login"); // Redirect if not logged in
    }
  }, [authUser, isLoading, router]);

  if(isLoading) return null

  return ( 
    <>
           <div className="flex">
           <Navgation />
           <Conversation />
           </div>
    </>
   );
}
