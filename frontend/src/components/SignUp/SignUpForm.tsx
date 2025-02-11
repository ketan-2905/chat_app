"use client";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import Input from "../Shared/Input";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import RadioButtons from "../Shared/RadioButton";

const schema = z
  .object({
    firstName: z.string().min(3, "First Name must be at least 3 characters"),
    lastName: z.string().min(3, "Last Name be at least 3 characters"),
    userName: z.string().min(3, "User Name must be at least 3 characters"),
    email: z.string().email("Invalid email format"),
    age: z.coerce
      .number()
      .min(18, "Must be at least 18")
      .max(60, "Must be 60 or below"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/\d/, "Password must contain at least one number")
      .regex(
        /[!@#$%^&*]/,
        "Password must contain at least one number (!, @, #, $, %, ^, &, *)"
      )
      .regex(
        /^(?!.*[<>(){}]).*$/,
        "Password must NOT contain (<, >, (, ), {, }"
      ),
    confirmPassword: z.string(),
    gender: z.enum(["male", "female"], { message: "please select Gender" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

const inputFields = [
  {
    id: "userName",
    type: "text",
    label: "User Name",
    required: true,
  },
  {
    id: "email",
    type: "email",
    label: "Email",
    required: true,
  },
  {
    id: "password",
    type: "password",
    label: "Password",
    required: true,
  },
  {
    id: "confirmPassword",
    type: "password",
    label: "Confirm Password",
    required: true,
  },
];

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: zodResolver(schema),
  });

  const selectValue = watch("gender")

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <div className="w-[100%]  md:w-[50%] h-screen flex flex-col gap-2 justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 justify-center items-center px-3"
      >
        <div className="w-full flex flex-col gap-1 justify-center items-start px-2">
          <h1 className="text-copy-primary">Create an account</h1>
          <h2 className="text-copy-secondary">
            Already have an account?{" "}
            <a href="/login" className="underline-offset-1 underline text-sky-700">
              Sign In/Login
            </a>
          </h2>
        </div>
        <div className="flex gap-2 ">
          <Input
            id="firstName"
            type="text"
            label="First Name"
            register={register}
            disabled={isLoading}
            required={true}
            errors={errors}
          />

          <Input
            id="lastName"
            type="text"
            label="Last Name"
            register={register}
            disabled={isLoading}
            required={true}
            errors={errors}
          />
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
        <div className="w-full flex gap-2">
          <RadioButtons
            id="gender"
            label="Male"
            value="male"
            register={register}
            disabled={isLoading}
            selectValue={selectValue}
          />
          <RadioButtons
            id="gender"
            label="Female"
            value="female"
            register={register}
            disabled={isLoading}
            selectValue={selectValue}
          />
        </div>
        {errors?.["gender"] && (
          <p className="text-red-500">{String(errors["gender"]?.message)}</p>
        )}
        <div className=" w-full flex">
          <button
            onClick={handleSubmit(onSubmit)}
            className={`w-1/2 cursor-pointer text-slate-50 px-4 py-2 rounded-md outline-none border-[1px] bg-button-background`}
            type="submit"
          >
            Create Account ?
          </button>
          <a
            href="/login"
            className="w-1/2 text-sky-400 text-center cursor-pointer px-4 py-2 rounded-md outline-none border-[1px] bg-button-background"
          >
            Sign In/Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
