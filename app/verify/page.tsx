"use client";

import axios, { AxiosError } from "axios";
import { Hash, createHash } from "crypto";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import bcrypt from "bcrypt";
import { toast } from "sonner";
import { hash } from "@/lib/crypto";
import { TextInput } from "../(components)/FormInputs/TextInput";

export default function Verify() {
 const router = useRouter();
 const searchParams = useSearchParams();

 const email = searchParams.get("email");
 const verificationCode = searchParams.get("verificationCode");

 const [password, setPassword] = useState<string>("");
 const [passwordError, setPasswordError] = useState<boolean>(false);

 useEffect(() => {
  (async () => {
   try {
    await axios.put("/api/accounts/account/verify", {
     email: email,
     verificationCode: verificationCode,
    });
   } catch (err) {
    if (err instanceof AxiosError && err.response?.status === 409) // ! WARNING - UNSTABLE - BREAKS IF API STATUS CODE CHANGES
     router.push("/userarea");
   }
  })();
 }, []);

 async function verify() {
  if (!password) {
   toast.warning("Whoops", { description: "Provide A Password!" });
   setPasswordError(true);
   return;
  }

  try {
   await axios.put("/api/accounts/account/verify", {
    email: email,
    verificationCode: verificationCode,
    password: await hash(password),
   });
   router.push("/userarea");
  } catch (err) {
   console.error(err);
   if (err instanceof AxiosError) {
    toast.warning("Whoops", { description: err.response?.data.error });
   }
  }
 }

 return (
  <div className="h-screen w-screen flex flex-col justify-center">
   <div className="flex justify-center">
    <div className="w-1/5 flex flex-col gap-4">
     <TextInput
      type="password"
      error={passwordError}
      label="Passwort"
      set={setPassword}
      placeholder="****"
      value={password}
     />
     <div className="flex justify-center">
      <button
       onClick={verify}
       className="px-10 py-3 font-medium text-base border-solid border-2 rounded-full border-white text-white bg-transparent hover:opacity-60 hover:cursor-pointer"
      >
       Done
      </button>
     </div>
    </div>
   </div>
  </div>
 );
}
