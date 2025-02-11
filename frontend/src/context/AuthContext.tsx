"use client";
import API from "../../lib/axios";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthType = {
  id: string;
  userName: string;
  fullName: string;
  profileImageSrc: string;
};

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
  return useContext(AuthContext)
} 

export const AuthContextprovider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [authUser, setAuthUser] = useState<AuthType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
        try {
          const user = await API.get("auth/me")
          if(!user.data){
            throw new Error(user.data.message)
          }
          setAuthUser(user.data)
        } catch (error) {
          console.error(error)
        }finally{
          setIsLoading(false)
        }
    }

    fetchUser()
  },[])

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
