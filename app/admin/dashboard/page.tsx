"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { ThreeDot } from "react-loading-indicators";
import { AccountButton } from "../(components)/AccountButton";

export default function Dashboard() {

 const [account, setAccount] = useState<any | undefined>();

 useEffect(() => {
  (async () => {
   setAccount((await axios.get("/api/accounts/account")).data);
  })();
 }, []);

 return account ? (
  <div className="my-8 mx-12">
   <div className="flex justify-between">
    <div className="h-full">
     <h1 className="font-bold text-3xl">
      Willkommen zurück, {account.name}!
     </h1>
    </div>
    <div className="h-full flex justify-end">
     <AccountButton account={account} />
    </div>
   </div>
   <div className="mt-6 w-full grid grid-cols-3 gap-6">
   </div>
  </div>
 ) : (
  <div className="w-full h-full flex justify-center">
   <div className="flex flex-col justify-center">
    <ThreeDot color="#b133ce" size="large" />
   </div>
  </div>
 )
}