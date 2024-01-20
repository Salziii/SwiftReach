import { useEffect, useRef } from "react";
import { TimelineDefinition, timeline } from "motion";
import Image from "next/image";
import { RotateMotion } from "@/app/(components)/motion";

export default function Loader() {
 const loaderRef = useRef<HTMLDivElement | null>(null);
 const imageRef = useRef<HTMLDivElement | null>(null);

 useEffect(() => {
  timeline(
   [
    [imageRef.current, { scale: "0" }, { at: 0.35 }],
    [imageRef.current, { opacity: "0" }, { at: 0.6 }],
    [loaderRef.current, { y: "-100vh" }, { at: 0.65 }]
   ] as TimelineDefinition,
   {
    defaultOptions: { easing: [0.75, 0, 0.2, 1], duration: 1, delay: 0 },
   }
  );
 }, []);

 return (
  <div
   className="fixed hidden lg:flex justify-center bg-background left-0 right-0 bottom-0 top-0 w-screen h-screen z-50 overflow-y-hidden max-h-full"
   ref={loaderRef}
  >
   <div className="h-full flex flex-col justify-center" ref={imageRef}>
    <RotateMotion className="w-full flex justify-center">
     <Image src="/logo.png" alt="" width={400} height={400} className="w-36" />
    </RotateMotion>
   </div>
  </div>
 );
}
