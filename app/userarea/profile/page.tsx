"use client";

import axios, { AxiosError } from "axios";
import { useState } from "react"
import useAsyncEffect from "@/lib/asyncEffect";
import { VT323 } from "next/font/google";
import { useSearchParams } from "next/navigation";

const font = VT323({
 subsets: ["latin"],
 weight: "400",
});

export default function Imprint() {

 const searchparams = useSearchParams()

 const [loading, setLoading] = useState<boolean>(false)
 const [account, setAccount] = useState<any>({})
 const [error, setError] = useState<string | undefined>(undefined)

 useAsyncEffect(async () => {
  setLoading(true)
  try {
   setAccount((await axios.get("/api/account?" + searchparams)).data)
  } catch (error) {
   if (error instanceof AxiosError) setError(error.response?.data.error)
   console.error(error)
  }
  setLoading(false)
 }, [])

 return error ? error : loading ? <div>Loading...</div> : <div className={font.className + " w-screen h-screen bg-background font-bold text-3xl"}>
 id: {account.id} <br /> name: {account.name} <br /> email: {account.email} <br /> company: {account.company} 
</div>
}
