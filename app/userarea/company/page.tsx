"use client";

import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react"
import { VT323 } from "next/font/google";
import { useSearchParams } from "next/navigation";

const font = VT323({
 subsets: ["latin"],
 weight: "400",
});

export default function Company() {

 const searchparams = useSearchParams()

 const [loading, setLoading] = useState<boolean>(false)
 const [error, setError] = useState<string | undefined>(undefined)
 const [company, setCompany] = useState<any>({})

 useEffect(() => {
  (async () => {
   setLoading(true)
   try {
    setCompany((await axios.get("/api/company?" + searchparams)).data)
   } catch (error) {
    if (error instanceof AxiosError) setError(error.response?.data.error)
    console.error(error)
   }
   setLoading(false)
  })()
 })

 return error ? error : loading ? <div>Loading...</div> : <div className={font.className + " w-screen h-screen bg-background font-bold text-3xl"}>
  id: {company.id} <br /> name: {company.name} <br /> contact email: {company.contactEmail}
 </div>
}
