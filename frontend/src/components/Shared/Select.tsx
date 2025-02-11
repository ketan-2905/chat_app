"use client"
import {UseFormRegister,FieldErrors, FieldValues} from "react-hook-form"
interface SelectProps{
    id: string
    options: string[]
    className?: string
    errors: FieldErrors
    register:UseFormRegister<FieldValues>
}

const Select: React.FC<SelectProps> = ({ options,className, id, errors, register}) => {
  return (
    <div className={`relative text-copy-primary  flex gap-2 justify-center items-center ${className}`}>
        <label className="" htmlFor={id}>Gender</label>
        <select {...register(id)} id={id} className={`peer w-full px-4 py-2 rounded-md outline-none border-[1px] bg-background transition ${
          errors[id]
            ? "border-red-500 focus:border-red-500"
            : "border-zinc-500 focus:border-blue-400"
        } disabled:opacity-70 disabled:cursor-not-allowed`}>
            {options.map((option) => 
            <option key={option} className="w-full px-4 py-2 rounded-md outline-none border-[1px] bg-background">
                {option}
            </option>
            )}
        </select>
        
  </div>
  )
}

export default Select
