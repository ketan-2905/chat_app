"use client";
import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  ValidationRule,
} from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useRef, useState } from "react";

interface InputProps {
  id: string;
  label: string;
  type: string;
  disabled: boolean;
  required: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  className?: string;
}
const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  required,
  register,
  errors,
  className,
}) => {

  const [isPassword, setIsPassword] = useState(type === "password")
  return (
    <div className="w-full">
      <div className={`relative text-copy-primary  ${className}`}>
      <input
        id={id}
        type={isPassword ? type:"text"}
        required={required}
        disabled={disabled}   
        placeholder=" "
        {...register(id)}
        className={`peer w-full px-4 py-2 rounded-md outline-none border-[1px] bg-background transition ${
          errors[id]
            ? "border-red-500 focus:border-red-500"
            : "border-zinc-500 focus:border-blue-400"
        } disabled:opacity-70 disabled:cursor-not-allowed`}
      />
      <label className={`absolute bg-background text-sm px-1 top-2 left-4 z-[1] duration-100 -translate-y-5 transform origin-[0px] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 ${
          errors[id] ? "text-red-500" : "text-zinc-500"
        }`}
        htmlFor={id}>
        {label}
      </label>
      {type === "password"? 
      <div onClick={() => setIsPassword((isPassword) => !isPassword)} className="absolute top-1/2 left-[90%] transform -translate-y-1/2 ">
        {isPassword ? <Eye className="h-4 w-4" />:<EyeOff className="h-4 w-4" />}
      </div>
      : 
      null}  
    </div>
    {errors[id] && <p className="text-red-600 text-sm">{String(errors[id]?.message)}</p>}
    </div>
  );
};

export default Input;
