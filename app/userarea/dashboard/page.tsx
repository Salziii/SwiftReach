"use client";

import {
 ResizableHandle,
 ResizablePanel,
 ResizablePanelGroup,
} from "@/components/ui/resizable";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import axios from "axios";
import { useEffect, useState } from "react";
import { AccountButton } from "./(components)/AccountButton";
import Meetings from "./(components)/meetings";
import Steps from "./(components)/steps";

const steps = [
 { title: "Erwartbares", description: "Was in Zukunft zu erwarten ist", status: "finished", href: "/" },
 { title: "Erinnerungen", description: "Checkliste abarbeiten", status: "finished", href: "/" },
 { title: "Ads Manager Integration", description: "Werbemanager Daten überreichen", status: "finished", href: "/" },
 { title: "Euere Kunden", description: "Ziel Markt herausfinden", status: "finished", href: "/" },
 { title: "Strategie Session", description: "KickOff Call buchen", status: "pending", href: "/" },
 { title: "Liftoff", description: "Letzte Worte", status: "pending", href: "/" },
]

export default function Imprint() {

 const [account, setAccount] = useState<any>({})
 const [company, setCompany] = useState<any>({})

 useEffect(() => {
  (async () => {
   setAccount((await axios.get("/api/account")).data)
   setCompany((await axios.get("/api/company")).data)
  })();
 }, [])

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
     <div className="my-8 mx-12">
      <div className="flex justify-between">
       <div className="h-full">
        <h1 className="font-bold text-3xl">Willkommen zurück, {account.name === "$root" ? company.name : account.name}!</h1>
       </div>
       <div className="h-full flex justify-end">
        <AccountButton />
       </div>
      </div>
      <div className="mt-8 w-full grid grid-cols-3 gap-6">
       <Steps steps={steps} />
       <Meetings meetings={[]} />
      </div>
     </div>
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