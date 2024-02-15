"use client";

import useAsyncEffect from "@/lib/asyncEffect";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function GoogleLogin () {
 
 const router = useRouter()

 useAsyncEffect(async () => {
  const res = await axios.get("/api/auth/google/url")
  router.replace(res!.data.authUrl)
 }, [])

 return <></>;

}
