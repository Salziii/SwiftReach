"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { ThreeDot } from "react-loading-indicators";

export default function Dashboard() {

 const [account, setAccount] = useState<any | undefined>();

 useEffect(() => {
  (async () => {
   setAccount((await axios.get("/api/accounts/account")).data);
  })();
 }, []);

 return <div className="w-full h-full flex justify-center">
  <div className="flex flex-col justify-center">
   <ThreeDot color="#b133ce" size="large" />
  </div>
 </div>
}