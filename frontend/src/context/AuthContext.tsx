"use client";
import axios from "axios";
import API from "../../lib/axios";
import { ApiError, AuthUser } from "../../lib/types";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthType = AuthUser;

type AuthContextType = {
  authUser: AuthType | null;
  setAuthUser: Dispatch<SetStateAction<AuthType | null>>;
  isLoading: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  authUser: null,
  setAuthUser: () => {},
  isLoading: true,
});

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextprovider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [authUser, setAuthUser] = useState<AuthType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await API.get("/auth/me");
        if (!user.data) {
          throw new Error(user.data.message);
        }
        setAuthUser(user.data);
      } catch (error: any) {
        if (axios.isAxiosError(error) && error.response?.data) {
          console.log(error)
          let erromsg ="" 
          const errorData = error.response.data as ApiError;
          
          // Handle both string and object message formats
          if (typeof errorData.message === 'string') {
            erromsg = errorData.message;
          } else {
            erromsg = "An unknown error occurred";
          }
          console.error(erromsg);
        }
        console.error(error);

      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
