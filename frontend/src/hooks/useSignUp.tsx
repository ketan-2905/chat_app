import { useAuthContext } from "@/context/AuthContext";
import { useState } from "react";
import { ApiError, User } from "../../lib/types";
import API from "../../lib/axios";
import axios from "axios";
import toast from "react-hot-toast";


const useSignUp = () => {
  const { setAuthUser } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  let error;

  const signUp = async (user: User) => {
    setIsLoading(true)
    try {
        const { data } = await API.post("auth/signup",user)
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

  return {isLoading, signUp}
};

export default useSignUp;
