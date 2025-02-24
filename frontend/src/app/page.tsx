"use client"
import Navgation from "@/components/Shared/Navagation/Navgation";
import Conversation from "@/components/Shared/Conversation/Conversation";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loader from "@/components/Shared/Loader";
export default function Home() {

  const { authUser, isLoading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push("/login"); // Redirect if not logged in
    }
  }, [authUser, isLoading, router]);

  if(isLoading) return <div className="h-screen w-screen flex justify-center items-center"><Loader /></div>

  return ( 
    <>
           <div className="flex relative">
           <Navgation />
           <Conversation />
           </div>
    </>
   );
}
