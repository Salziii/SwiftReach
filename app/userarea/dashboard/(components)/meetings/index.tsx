import { Card } from "@/components/ui/card"
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { Tooltip, TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip"
import { PlusCircle, Users2 } from "lucide-react"

export default function Meetings({ meetings }: { meetings: any[] }) {
 return <Card className="h-full col-span-2 py-4 px-2" >
  <div className="flex justify-between px-4">
   <div className="flex gap-2">
    <div className="flex flex-col justify-center"><Users2 size={22} /></div>
    <h1 className="font-semibold text-xl flex flex-col justify-center">Meetings</h1>
   </div>
   <div className="flex flex-col justify-center">
    <Tooltip>
     <TooltipTrigger asChild>
      <PlusCircle size={24} color="white" className="hover:opacity-75 hover:cursor-pointer" />
     </TooltipTrigger>
     <TooltipContent>
      <p className="bg-background py-1 px-2 border rounded-sm">Meeting vereinbaren</p>
     </TooltipContent>
    </Tooltip>
   </div>
  </div>
  <ScrollArea className="w-full h-[400px] mt-4" >
   <div className="px-3 flex flex-col gap-2">
    {
     [...Array(20)].map((_, i) => (
      <div className="w-full h-24">
       <Drawer >
        <DrawerTrigger asChild>
         <Skeleton className="w-full h-full rounded-xl shadow-sm" />
        </DrawerTrigger>
        <DrawerContent className="border outline-none">
         <div className="w-full">
          <DrawerHeader>
           <DrawerTitle className="w-full flex justify-center">Discovery Call {i} - Meeting</DrawerTitle>
           <DrawerDescription className="w-full flex justify-center">am {new Date().toLocaleDateString("default", { hour: "2-digit", minute: "2-digit", day: "numeric", month: "long", year: "numeric" })}</DrawerDescription>
          </DrawerHeader>
          <div className="h-[600px]"></div>
          <DrawerFooter>
          </DrawerFooter>
         </div>
        </DrawerContent>
       </Drawer>
      </div>
     ))
    }
   </div>
  </ScrollArea>
 </Card>
}
