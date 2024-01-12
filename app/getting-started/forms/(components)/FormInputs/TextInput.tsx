import React from "react";

type TextInputProps = {
 label: string;
 placeholder?: string;
 value: string;
 set: React.Dispatch<React.SetStateAction<string>>;
 error: boolean;
};

export const TextInput = ({
 label,
 placeholder,
 value,
 set,
 error,
}: TextInputProps) => {
 return (
  <div className="w-full flex flex-col gap-1">
   <p className="text-[20px] text-white">{label}</p>
   <input
    type="text"
    placeholder={placeholder ?? ""}
    value={value}
    onChange={(e) => set(e.target.value)}
    className={`bg-transparent border-2 rounded-lg p-2 shadow-lg text-[18px] lg:text-[22px] ${
     error ? "border-red-500" : ""
    }`}
   />
  </div>
 );
};
