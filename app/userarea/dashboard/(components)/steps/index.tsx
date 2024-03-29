import { RotateMotion } from "@/app/(components)/motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
 Dialog,
 DialogClose,
 DialogContent,
 DialogFooter,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { CheckCircle2, Circle, CircleDashed, LineChart } from "lucide-react";
import Form from "./Form";
import F1 from "./forms/1";
import F2 from "./forms/2";
import F3 from "./forms/3";
import F4 from "./forms/4";
import F5 from "./forms/5";
import F6 from "./forms/6";

const forms = [
 <F1 key={1} />,
 <F2 key={2} />,
 <F3 key={3} />,
 <F4 key={4} />,
 <F5 key={5} />,
 <F6 key={6} />,
];

function StepCard({ step }: { step: any }) {
 return (
  <div className="w-full h-full">
   <div
    className={`w-full h-[60px] bg-muted rounded-lg shadow-sm flex ${
     step.status === "PENDING" ? "cursor-default" : "cursor-pointer"
    } select-none`}
   >
    <div className="flex flex-col justify-center mr-2 ml-3">
     <div className="flex justify-center">
      <div className="flex flex-col justify-center text-secondary-foreground">
       {(() => {
        switch (step.status) {
         case "COMPLETE":
          return (
           <RotateMotion>
            <CheckCircle2 size={34} />
           </RotateMotion>
          );
         case "AVAILABLE":
          return (
           <RotateMotion>
            <Circle size={33} />
           </RotateMotion>
          );
         default:
          return (
           <RotateMotion>
            <CircleDashed size={33} />
           </RotateMotion>
          );
        }
       })()}
      </div>
     </div>
    </div>
    <div
     className={`flex flex-col justify-center w-full h-full ${
      step.status === "PENDING" ? "animate-pulse" : ""
     }`}
    >
     <h1 className="text-lg font-semibold">{step.step.label}</h1>
     <h2 className="text-sm font-normal text-muted-foreground">
      {step.step.description}
     </h2>
    </div>
   </div>
  </div>
 );
}

export default function Steps({ steps }: { steps: any[] }) {
 return (
  <Card className="h-full py-4 px-2">
   <div className="flex justify-between px-4">
    <div className="flex gap-2">
     <div className="flex flex-col justify-center">
      <LineChart />
     </div>
     <h1 className="font-semibold text-xl flex flex-col justify-center">
      Getting Started
     </h1>
    </div>
    <div className="flex flex-col justify-center text-xl font-bold">
     {steps.filter((step: any) => step.status === "COMPLETE").length} /{" "}
     {steps.length}
    </div>
   </div>
   <ScrollArea className="w-full h-[400px] mt-4">
    <div className="px-3 flex flex-col gap-2">
     {steps
      .sort((a, b) => a.step.id - b.step.id)
      .map((step, i) =>
       step.status !== "PENDING" ? (
        <Dialog key={i}>
         <DialogTrigger asChild>
          <div className="w-full h-full">
           <StepCard step={step} />
          </div>
         </DialogTrigger>
         <DialogContent className="sm:max-w-7xl">
          <DialogHeader>
           <DialogTitle>{step.step.label}</DialogTitle>
          </DialogHeader>
          <Form video={step.step.videoId}>{forms[i]}</Form>
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
       ) : (
        <StepCard key={i} step={step} />
       )
      )}
    </div>
   </ScrollArea>
  </Card>
 );
}
