"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { useEffect, useState } from "react";
import { ThreeDot } from "react-loading-indicators";

export default function Companys () {

 const [companys, setCompanys] = useState<any[] | undefined>();

 useEffect(() => {
  (async () => {
   setCompanys((await axios.get("/api/admin/companys")).data);
  })();
 }, []);

 return companys ? <ScrollArea className="w-full h-screen">
  <div className="px-3 flex flex-col gap-2 my-3">
   {companys
    .sort((a, b) => a.id - b.id)
    .map((company, i) =>
     <Dialog key={i}>
      <DialogTrigger asChild>
       <div className="bg-background border w-full h-full rounded-xl shadow-sm flex cursor-pointer select-none">
        {/* <div
         className="w-[15%] min-w-48 flex flex-col justify-center border-r-2 my-2"
        >
         <h1 className="w-full flex justify-center text-3xl font-bold">
          {new Date(email.date).toLocaleString("default", {
           hour: "2-digit",
           minute: "2-digit",
          })}
         </h1>
         <h1 className="w-full flex justify-center text-xl">
          {new Date(email.date).toLocaleString("default", {
           day: "numeric",
           month: "long",
          })}
         </h1>
        </div> */}
        <div className="w-full flex flex-col gap-1 justify-center m-5">
         <h1 className="text-xl font-bold">{company.name}</h1>
         <h2>{company.contactEmail} <span className="font-bold">|</span> {company.emailDomain}</h2>
        </div>
       </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-7xl">
       <DialogHeader>
        <DialogTitle>{company.id}</DialogTitle>
       </DialogHeader>
       <DialogFooter className="sm:justify-start">
        <div>
         <DialogClose asChild>
          <Button type="button" variant="outline">
           Close
          </Button>
         </DialogClose>
        </div>
       </DialogFooter>
      </DialogContent>
     </Dialog>
    )}
  </div>
 </ScrollArea>
  : <div className="w-full h-full flex justify-center">
   <div className="flex flex-col justify-center">
    <ThreeDot color="#b133ce" size="large" />
   </div>
  </div>
}