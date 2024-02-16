import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
 Dialog,
 DialogClose,
 DialogContent,
 DialogDescription,
 DialogFooter,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@radix-ui/react-scroll-area"
import { Check, CheckCircle2, CopyIcon, LineChart } from "lucide-react"

export default function Steps({ steps }: { steps: any[] }) {
 return <Card className="h-full py-4 px-2" >
  <div className="flex gap-2 px-4">
   <div className="flex flex-col justify-center"><LineChart /></div>
   <h1 className="font-semibold text-xl flex flex-col justify-center">
    Getting Started
   </h1>
  </div>
  <ScrollArea className="w-full h-[400px] mt-4" >
   <div className="px-3 flex flex-col gap-2">
    {
     steps.map((step, i) => (
      <Dialog>
       <DialogTrigger asChild>
        <div className="w-full h-[60px] bg-muted rounded-lg shadow-sm flex cursor-default select-none" >
         <div className="flex flex-col justify-center mr-2 ml-3">
          <div className="flex justify-center">
           <div className="flex flex-col justify-center">
            {
             (step.status === "finished")
              ? <CheckCircle2 size={34} className="text-green-500" />
              : <Check size={34} className="text-orange-500" />
            }
           </div>
          </div>
         </div>
         <div className="flex flex-col justify-center w-full h-full">
          <h1 className="text-lg font-semibold">
           {step.title}
          </h1>
          <h2 className="text-sm font-normal text-muted-foreground">
           {step.description}
          </h2>
         </div>
        </div>
       </DialogTrigger>
       <DialogContent className="sm:max-w-7xl">
        <DialogHeader>
         <DialogTitle>{step.title}</DialogTitle>
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
     ))
    }
   </div>
  </ScrollArea>
 </Card>
}
