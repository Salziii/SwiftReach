"use client";

import {
 ResizableHandle,
 ResizablePanel,
 ResizablePanelGroup,
} from "@/components/ui/resizable";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import axios from "axios";
import { CircleDollarSignIcon, InfinityIcon, PiggyBank } from "lucide-react";
import { useEffect, useState } from "react";
import { BsCursor, BsFunnel } from "react-icons/bs";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { AccountButton } from "./(components)/AccountButton";
import Meetings from "./(components)/meetings";
import Steps from "./(components)/steps";
import Infos from "./(components)/infos";
import { ThreeDot } from "react-loading-indicators";
import { Card } from "@/components/ui/card";

const infos = [
 { title: "Klicks", data: 1348, lastData: 103, unit: "", betterMore: true, icon: <BsCursor size={38} /> },
 { title: "Conversions", data: 312, lastData: 15, unit: "", betterMore: true, icon: <BsFunnel size={38} /> },
 { title: "Ausgaben", data: 445, lastData: 475, unit: "€", betterMore: false, icon: <PiggyBank size={38} /> },
 { title: "Einnahmen", data: 7840, lastData: 1600, unit: "€", betterMore: true, icon: <CircleDollarSignIcon size={38} /> },
 { title: "ROI", data: 16.6, lastData: 8.6, unit: "", betterMore: true, icon: <FaMoneyBill1Wave size={38} /> }
]

export default function Dashboard() {

 const [account, setAccount] = useState<any | undefined>()

 useEffect(() => {
  (async () => {
    setAccount((await axios.get("/api/account?depth=3")).data)
    console.log(account)
  })();
 })

 return <TooltipProvider>
  <ResizablePanelGroup
   direction="horizontal"
   className="w-screen h-screen"
  >
   <ResizablePanel minSize={10} maxSize={30} defaultSize={20} style={{ boxShadow: "0px 0px 15px 0px black" }} >
    <div className="flex h-screen bg-popover" />
   </ResizablePanel>
   <ResizableHandle className="opacity-75" />
   <ResizablePanel>
    <div className="h-full w-full">
     {
      account
       ? <div className="my-8 mx-12">
        <div className="flex justify-between">
         <div className="h-full">
          <h1 className="font-bold text-3xl">Willkommen zurück, {account.name}!</h1>
         </div>
         <div className="h-full flex justify-end">
          <AccountButton account={account} />
         </div>
        </div>
        <Infos infos={infos} />
        <div className="mt-6 w-full grid grid-cols-3 gap-6">
         <Steps steps={account.company.steps} />
         <Meetings meetings={account.meetings} />
        </div>
        <div className="mt-6 w-full grid grid-cols-3 gap-6">
        <Card className="h-[500px] col-span-2 py-4 px-2" >
          
        </Card>
        </div>
       </div>
       : <div className="w-full h-full flex justify-center">
        <div className="flex flex-col justify-center">
         <ThreeDot color="#b133ce" size="large" />
        </div>
       </div>
     }
    </div>
   </ResizablePanel>
  </ResizablePanelGroup>
 </TooltipProvider>
}

{/* <Drawer >
<DrawerTrigger asChild>
 <ContextMenu>
  <ContextMenuTrigger className="w-full h-24">
   <Skeleton className="w-full h-full rounded-lg shadow-sm" />

  </ContextMenuTrigger>
  <ContextMenuContent className="w-64">
   <ContextMenuLabel inset>{i + 1}nd Meeting</ContextMenuLabel>
   <ContextMenuSeparator />
   <ContextMenuItem inset>
    Back
   </ContextMenuItem>
   <ContextMenuItem inset disabled>
    Forward
   </ContextMenuItem>
   <ContextMenuItem inset>
    Reload
   </ContextMenuItem>
   <ContextMenuSub>
    <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
    <ContextMenuSubContent className="w-48">
     <ContextMenuItem>
      Save Page As...
     </ContextMenuItem>
     <ContextMenuItem>Create Shortcut...</ContextMenuItem>
     <ContextMenuItem>Name Window...</ContextMenuItem>
     <ContextMenuSeparator />
     <ContextMenuItem>Developer Tools</ContextMenuItem>
    </ContextMenuSubContent>
   </ContextMenuSub>
   <ContextMenuSeparator />
   <ContextMenuCheckboxItem checked>
    Show Bookmarks Bar
   </ContextMenuCheckboxItem>
   <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
   <ContextMenuSeparator />
   <ContextMenuRadioGroup value="pedro">
    <ContextMenuRadioItem value="pedro">
     Pedro Duarte
    </ContextMenuRadioItem>
    <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
   </ContextMenuRadioGroup>
  </ContextMenuContent>
 </ContextMenu>
</DrawerTrigger>
<DrawerContent className="border-none">
 <div className="w-full">
  <DrawerHeader>
   <DrawerTitle className="w-full flex justify-center">Discovery Call - Meeting</DrawerTitle>
   <DrawerDescription className="w-full flex justify-center">am {new Date().toLocaleDateString("default", { hour: "2-digit", minute: "2-digit", day: "numeric", month: "long", year: "numeric" })}</DrawerDescription>
  </DrawerHeader>
  <div className="h-96"></div>
  <DrawerFooter>

  </DrawerFooter>
 </div>
</DrawerContent>
</Drawer> */}