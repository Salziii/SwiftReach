"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function GoogleLogin() {

 const router = useRouter()

 useEffect(() => {
  (async () => {
   const res = await axios.get("/api/auth/google/url")
   router.replace(res!.data.authUrl)
  })()
 })

 return <></>;

}
