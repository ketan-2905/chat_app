"use client";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface RadioButtonProps {
  id: string;
  value: string;
  label: string;
  disabled: boolean;
  register: UseFormRegister<FieldValues>;
  selectValue : string;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  id,
  value,
  label,
  disabled,
  register,
  selectValue
}) => {
  return (
    <label className="w-full flex items-center gap-2 cursor-pointer">
      <input
        id={value}
        type="radio"
        value={value}
        {...register(id)}
        className="hidden"
        disabled={disabled}
      />
      <div
        className={`w-full text-center px-4 py-2 border-[1px] border-zinc-500   rounded-md text-copy-primary ${
          disabled ? "bg-gray-300" : "cursor-pointer"
        }
        ${selectValue === value ? "bg-cta-active":"bg-background"}
        `}
      >
        {label}
      </div>
    </label>
  );
};

export default RadioButton;

