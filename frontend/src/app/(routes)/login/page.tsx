"use client"
import LoginForm from "@/components/Login/LoginForm";
import Poster from "@/components/Shared/Poster";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const { authUser, isLoading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && authUser) {
      router.push("/"); // Redirect if not logged in
    }
  }, [authUser, isLoading, router]);
  return (
    <div className={`h-full w-full flex light`}>
      <Poster />
      <LoginForm />
    </div>
  );
}
