"use client";

import {
 ResizableHandle,
 ResizablePanel,
 ResizablePanelGroup,
} from "@/components/ui/resizable";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Home, Mail, Users2 } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";
import { BsBuilding } from "react-icons/bs";

const pages: { label: string; icon: ReactNode; ref: string; }[] = [
 { label: "Home", icon: <Home size={32} />, ref: "/admin/dashboard" },
 { label: "Unternehmen", icon: <BsBuilding size={32} />, ref: "/admin/companys" },
 { label: "Emails", icon: <Mail size={32} />, ref: "/admin/emails" },
 { label: "Meetings", icon: <Users2 size={32} />, ref: "/admin/meetings" },
]

export default function Template({ children }: { children: React.ReactNode }) {

 return <TooltipProvider>
  <ResizablePanelGroup direction="horizontal" className="w-screen min-h-screen">
   <ResizablePanel
    minSize={17.5}
    maxSize={25}
    defaultSize={25}
    className="max-w-[25%]"
    style={{ boxShadow: "0px 0px 15px 0px black" }}
   >
    <div className="flex flex-col h-full bg-popover">
     <div className="w-full flex justify-center py-4 border-b bg-body">
      <div className="flex">
       <Image src="/logo.png" alt="logo" width={75} height={75} />
       <div className="h-full w-full p-2 flex flex-col justify-center">
        <h1 className="font-bold text-2xl">SwiftReach</h1>
        <h2 className="font-bold text-lg">In a Swift, Reach new Horizons!</h2>
       </div>
      </div>
     </div>
     {
      pages.map((page: any, i) => (
       <a key={i} href={page.ref} className="w-full px-4 py-3 flex gap-4 border-b hover:bg-muted">
        <div className="flex flex-col justify-center">
         {page.icon}
        </div>
        <div className="h-full flex flex-col justify-center">
         <h1 className="font-bold text-xl">{page.label}</h1>
        </div>
       </a>
      ))
     }
    </div>
   </ResizablePanel>
   <ResizableHandle className="opacity-75" />
   <ResizablePanel>
    <div className="h-full w-full">
     {children}
    </div>
   </ResizablePanel>
  </ResizablePanelGroup>
 </TooltipProvider>

}
