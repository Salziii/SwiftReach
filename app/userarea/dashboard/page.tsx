"use client";

import { Card } from "@/components/ui/card";
import {
 ResizableHandle,
 ResizablePanel,
 ResizablePanelGroup,
} from "@/components/ui/resizable";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import axios from "axios";
import {
 ArcElement,
 CategoryScale,
 Chart as ChartJS,
 Filler,
 Legend,
 LineElement,
 LinearScale,
 PointElement,
 Title,
 Tooltip,
} from "chart.js";
import { CircleDollarSignIcon, PiggyBank } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Doughnut, Line } from "react-chartjs-2";
import { BsCursor, BsFunnel } from "react-icons/bs";
import { FaMoneyBill1Wave } from "react-icons/fa6";
import { IoWarningOutline } from "react-icons/io5";
import { ThreeDot } from "react-loading-indicators";
import { toast } from "sonner";
import { AccountButton } from "./(components)/AccountButton";
import Infos from "./(components)/infos";
import Meetings from "./(components)/meetings";
import Steps from "./(components)/steps";

ChartJS.register(
 CategoryScale,
 LinearScale,
 PointElement,
 LineElement,
 ArcElement,
 Title,
 Tooltip,
 Filler,
 Legend,
 Tooltip,
 Legend
);

const infos = [
 {
  title: "Klicks",
  data: 1348,
  lastData: 103,
  unit: "",
  betterMore: true,
  icon: <BsCursor size={38} />,
 },
 {
  title: "Conversions",
  data: 312,
  lastData: 15,
  unit: "",
  betterMore: true,
  icon: <BsFunnel size={38} />,
 },
 {
  title: "Ausgaben",
  data: 445,
  lastData: 475,
  unit: "€",
  betterMore: false,
  icon: <PiggyBank size={38} />,
 },
 {
  title: "Einnahmen",
  data: 7840,
  lastData: 1600,
  unit: "€",
  betterMore: true,
  icon: <CircleDollarSignIcon size={38} />,
 },
 {
  title: "ROI",
  data: 16.6,
  lastData: 8.6,
  unit: "",
  betterMore: true,
  icon: <FaMoneyBill1Wave size={38} />,
 },
];

export default function Dashboard() {
 const [account, setAccount] = useState<any | undefined>();

 const init = useRef<boolean>(false);

 useEffect(() => {
  (async () => {
   setAccount((await axios.get("/api/accounts/account")).data);
   if (!init.current) {
    init.current = true;
    toast.warning("Dashboard - Version Alpha", {
     description: "Demo Data Is Used | Please Report Bugs",
    });
   }
  })();
 }, []);

 return (
  <TooltipProvider>
   <ResizablePanelGroup direction="horizontal" className="w-screen h-screen">
    <ResizablePanel
     minSize={12}
     maxSize={30}
     defaultSize={20}
     style={{ boxShadow: "0px 0px 15px 0px black" }}
    >
     <div className="flex flex-col h-screen bg-popover">
      <div className="w-full flex justify-center bg-primary-foreground gap-4">
       <div className="flex flex-col justify-center">
       <IoWarningOutline size={64} />
       </div>
       <div className="flex flex-col justify-center">
        <p className="font-bold">
         Dashboard - Alpha Version
        </p>
        <p>Demo Date Is Used!</p>
        <p>Report Bugs Please!</p>
       </div>
      </div>
     </div>
    </ResizablePanel>
    <ResizableHandle className="opacity-75" />
    <ResizablePanel>
     <div className="h-full w-full">
      {account ? (
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
        <Infos infos={infos} />
        <div className="mt-6 w-full grid grid-cols-3 gap-6">
         <Steps steps={account.company.steps} />
         <Meetings meetings={account.meetings} />
        </div>
        <div className="mt-6 w-full flex gap-6">
         <Card className="h-[500px] w-2/3 py-4 px-2 flex justify-center">
          <Line
           options={{
            responsive: true,
            aspectRatio: 2,
            plugins: {
             legend: {
              display: false,
             },
             title: {
              display: false,
             },
            },
           }}
           data={{
            labels: ["", "", "", "", "", "", "", "", "", "", "", ""],
            datasets: [
             {
              tension: 0.25,
              fill: true,
              data: [
               "January",
               "February",
               "March",
               "April",
               "May",
               "June",
               "July",
               "August",
               "September",
               "Oktober",
               "November",
               "Dezember",
              ].map(() => 100 * Math.random()),
              borderColor: "#b133ce",
              backgroundColor: "rgba(120, 45, 172, 0.5)",
             },
            ],
           }}
          />
         </Card>
         <Card className="h-[500px] w-1/3 py-4 px-2 flex justify-center">
          <Doughnut
           data={{
            datasets: [
             {
              data: [
               9 * Math.random() + 1,
               9 * Math.random() + 1,
               9 * Math.random() + 1,
               9 * Math.random() + 1,
               9 * Math.random() + 1,
               9 * Math.random() + 1,
               9 * Math.random() + 1,
               9 * Math.random() + 1,
              ],
              backgroundColor: [
               "rgba(120, 45, 172, 0.5)",
               "rgba(177, 51, 206, 0.5)",
              ],
              borderWidth: 0
             },
            ],
           }}
          />
         </Card>
        </div>
       </div>
      ) : (
       <div className="w-full h-full flex justify-center">
        <div className="flex flex-col justify-center">
         <ThreeDot color="#b133ce" size="large" />
        </div>
       </div>
      )}
     </div>
    </ResizablePanel>
   </ResizablePanelGroup>
  </TooltipProvider>
 );
}

{
 /* <Drawer >
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
</Drawer> */
}
