"use client";

import { hash } from "@/lib/crypto";
import axios, { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { TextInput } from "../(components)/FormInputs/TextInput";
import { getRole } from "../(components)/Auth";

export default function Verify() {

  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email");
  const verificationCode = searchParams.get("verificationCode");



  const [password, setPassword] = useState<string>("")
  const [passwordError, setPasswordError] = useState<string>("")

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
  });

  const validatePassword = (password: string) => {
    if (password.length < 8) setPasswordError("Password must be at least 8 characters long")
    else setPasswordError("")
    setPassword(password)
  }

  const submit = async () => {
    if (!password) {
      toast.warning("Whoops", { description: "Provide A Password!" });
      return;
    }

    try {

      await axios.put("/api/accounts/account/verify", {
        email: email,
        password: password,
        verificationCode: verificationCode
      });

      const role = await getRole()

      if (role === "EMPLOYEE") router.push("/admin");
      if (role === "USER") router.push("/userarea");

    } catch (err) {
      console.error(err);
      if (err instanceof AxiosError) {
        toast.warning("Whoops", { description: err.response?.data.error });
      }
    }
  }

  return <div className="w-screen h-screen flex justify-center">
    <div className="w-1/2 h-full flex flex-col justify-center">
      <div className="w-full bg-background rounded-3xl px-12 py-8 shadow-xl flex flex-col gap-2">
        <h1 className="w-full font-bold text-4xl">Verify</h1>
        <h2 className="w-full text-xl mb-4">Currently only accessible to SwiftReach employees!</h2>
        <TextInput label="Password" key={2} type="password" placeholder="****" value={password} set={validatePassword} error={passwordError} />
        <div className="w-full flex justify-end mt-4">
          <button onClick={submit} className="py-2 border px-8 text-xl rounded-md shadow-xl transition-all duration-150 hover:scale-105 hover:shadow-md hover:-translate-y-1">Next</button>
        </div>
      </div>
    </div>
  </div>

}
