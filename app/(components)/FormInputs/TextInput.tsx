import React, { HTMLInputTypeAttribute } from "react";

type TextInputProps = {
 label: string;
 placeholder?: string;
 value: string;
 set: (value:any) => any;
 error: string;
 type?: HTMLInputTypeAttribute | undefined
};

export const TextInput = ({
 label,
 placeholder,
 value,
 set,
 error,
 type
}: TextInputProps) => {
 return (
  <div className="w-full flex flex-col gap-1">
   { error ? <p className="text-[20px] text-red-500">{error}</p> : <p className="text-[20px] text-white">{label}</p> }
   <input
    type={type ?? "text"}
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
