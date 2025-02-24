import { useAuthContext } from "@/context/AuthContext";
import { useState } from "react";
import { User } from "../../lib/types";
import API from "../../lib/axios";


const useLogout = () => {
  const { setAuthUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  

  const logout = async () => {
    setIsLoading(true)
    try {
        const { data } = await API.post("auth/logout")
        if(!data){
            throw new Error(data.message)
        }

        setAuthUser(null)
        
    } catch (error: any) {
        console.error(error);
    }finally{
        setIsLoading(false)
    }
  }

  return {isLoading, logout}
};

export default useLogout;
