import { useAuthContext } from "@/context/AuthContext";
import { useState } from "react";
import { ApiError, loginUser, User } from "../../lib/types";
import API from "../../lib/axios";
import axios from "axios";
import toast from "react-hot-toast";


const useLogin = () => {
  const { setAuthUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const login = async (user: loginUser) => {
    setIsLoading(true)
    try {
        const { data } = await API.post("/auth/Login",user)
        if(!data){
            throw new Error(data.message)
        }

        setAuthUser(data)
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const errorData = error.response.data as ApiError;
        
        // Handle both string and object message formats
        if (typeof errorData.message === 'string') {
          error = errorData.message;
        } else {
          error = errorData.message.text || "An unaccepted error occurred";
        }
        toast.error(error)
      }
        console.error(error);
    }finally{
        setIsLoading(false)
    }
  }

  return {isLoading, login}
};

export default useLogin;
