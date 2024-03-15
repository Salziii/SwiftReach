"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from "axios";
import { useEffect, useState } from "react";
import { ThreeDot } from "react-loading-indicators";
import Image from "next/image";

const randomImage = (quality: number = 1000, uid?: string) => {
 return `https://i.pravatar.cc/${quality}${uid ? "?u=" + uid : ""}`;
};

export default function Companys() {

 const [meetings, setMeetings] = useState<any[] | undefined>();

 useEffect(() => {
  (async () => {
   setMeetings((await axios.get("/api/admin/meetings")).data);
  })();
 }, []);

 return meetings ? <ScrollArea className="w-full h-[400px] mt-4">
  <div className="px-3 flex flex-col gap-2">
   {meetings
    ?.sort(
     (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
    )
    .sort((a) => (new Date(a.end) <= new Date() ? 1 : -1))
    .map((meeting, i) =>
     (() => {
      const started = new Date(meeting.start) <= new Date();
      const ended = new Date(meeting.end) <= new Date();

      return (
       <div key={i} className="w-full h-24 select-none cursor-pointer">
        <Drawer>
         <DrawerTrigger asChild>
          <div className="bg-background border w-full h-full rounded-xl shadow-sm flex">
           <div
            className={`w-[15%] min-w-48 flex flex-col justify-center border-r-2 my-2 ${ended ? "opacity-50" : ""
             }`}
           >
            <h1 className="w-full flex justify-center text-3xl font-bold">
             {new Date(meeting.start).toLocaleString("default", {
              hour: "2-digit",
              minute: "2-digit",
             })}
            </h1>
            <h1 className="w-full flex justify-center text-xl">
             {new Date(meeting.start).toLocaleString("default", {
              day: "numeric",
              month: "long",
             })}
            </h1>
           </div>
           <div className="w-[75%] flex flex-col gap-1 justify-center ml-5">
            <h1 className="text-xl font-bold">{meeting.label}</h1>
            <div className="flex gap-1">
             {meeting.members.map((member: any, i: number) => (
              <div
               key={i}
               className="flex gap-1 bg-card pl-[2px] pr-2 rounded-full h-7"
              >
               <div className="flex flex-col justify-center">
                <div className="h-[24px] w-[24px] rounded-full border overflow-hidden">
                 <Image
                  width={24}
                  height={24}
                  alt=""
                  // loader={() => randomImage()}
                  src={randomImage(1000, member.email)}
                 />
                </div>
               </div>
               <div className="flex flex-col justify-center">
                {member.name}
               </div>
              </div>
             ))}
            </div>
           </div>
           <div className="w-[15%] min-w-48 flex flex-col justify-center">
            <div className="w-full flex justify-center px-5">
             {(() => {
              if (started && !ended)
               return (
                <a
                 href={meeting.link}
                 className="h-12 w-full rounded-xl bg-card border flex flex-col justify-center transition-all shadow-2xl hover:shadow-md hover:-translate-y-1"
                >
                 <div className="w-full flex justify-center gap-[6px]">
                  <div className="flex flex-col justify-center">
                   <div className="h-4 w-4 rounded-full bg-green-500" />
                  </div>
                  <h1 className="flex flex-col justify-center text-lg font-bold">
                   Join
                  </h1>
                 </div>
                </a>
               );

              if (!started)
               return (
                <a
                 href={meeting.link}
                 className="h-12 w-full rounded-xl bg-card border flex flex-col justify-center transition-all shadow-2xl hover:shadow-md hover:-translate-y-1"
                >
                 <div className="w-full flex justify-center gap-[6px]">
                  <div className="flex flex-col justify-center">
                   <div className="h-4 w-4 rounded-full bg-orange-500" />
                  </div>
                  <h1 className="flex flex-col justify-center text-lg font-bold">
                   Waiting...
                  </h1>
                 </div>
                </a>
               );

              if (ended)
               return (
                <div className="h-12 w-full rounded-xl bg-card border flex flex-col justify-center shadow-2xl">
                 <div className="w-full flex justify-center gap-[6px]">
                  <div className="flex flex-col justify-center">
                   <div className="h-4 w-4 rounded-full bg-gray-500" />
                  </div>
                  <h1 className="flex flex-col justify-center text-lg font-bold">
                   Done
                  </h1>
                 </div>
                </div>
               );
             })()}
            </div>
           </div>
          </div>
         </DrawerTrigger>
         <DrawerContent className="border outline-none">
          <div className="w-full">
           <DrawerHeader>
            <DrawerTitle className="w-full flex justify-center">
             {meeting.label}
            </DrawerTitle>
            <DrawerDescription className="w-full flex justify-center">
             am{" "}
             {new Date(meeting.start).toLocaleString("default", {
              hour: "2-digit",
              minute: "2-digit",
              day: "numeric",
              month: "long",
              year: "numeric",
             })}{" "}
             bis{" "}
             {new Date(meeting.end).toLocaleString("default", {
              hour: "2-digit",
              minute: "2-digit",
             })}
            </DrawerDescription>
           </DrawerHeader>
           <div className="h-[600px]"></div>
           <DrawerFooter></DrawerFooter>
          </div>
         </DrawerContent>
        </Drawer>
       </div>
      );
     })()
    )}
  </div>
 </ScrollArea>
  : <div className="w-full h-full flex justify-center">
   <div className="flex flex-col justify-center">
    <ThreeDot color="#b133ce" size="large" />
   </div>
  </div>
}