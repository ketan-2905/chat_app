"use client";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import Input from "../Shared/Input";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useLogin from "@/hooks/useLogin";

const schema = z.object({
  userName: z.string().nonempty("Username required"),
  password: z.string().nonempty("Password required"),
});
const inputFields = [
  {
    id: "userName",
    type: "text",
    label: "User Name",
    required: true,
  },
  {
    id: "password",
    type: "password",
    label: "Password",
    required: true,
  },
];

const LoginForm = () => {
  const {isLoading, login} = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FieldValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const user = {
          userName: data.userName,
          password: data.password,
        };
    
        login(user);
        reset()
  };

  return (
    <div className="w-[100%]  md:w-[50%] h-screen flex flex-col gap-2 justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 justify-center items-center px-3"
      >
        <div className="w-full flex flex-col gap-1 justify-center items-start px-2">
          <h1 className="text-copy-primary">Login into account</h1>
          <h2 className="text-copy-secondary">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="underline-offset-1 underline text-sky-700"
            >
              Sign Up
            </a>
          </h2>
        </div>
        {inputFields.map((inputField) => {
          return (
            <Input
              key={inputField.id}
              id={inputField.id}
              type={inputField.type}
              label={inputField.label}
              register={register}
              disabled={isLoading}
              required={true}
              errors={errors}
              className="w-full"
            />
          );
        })}
        <div className=" w-full flex">
          <button
            type="submit"
            className={`w-full cursor-pointer text-slate-50 px-4 py-2 rounded-md outline-none border-[1px] bg-button-background flex  justify-center items-center`}
          >
            {isLoading ? <div className="w-7 h-7 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
  :"Sign In/Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
