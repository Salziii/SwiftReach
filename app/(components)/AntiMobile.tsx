"use client";

import useWindowSize from "@/lib/hooks/useWindowSize";

export default function AntiMobile({ children }: { children: React.ReactNode }) {

 const size = useWindowSize()

 if (size.width! < 1750) return <div className="w-screen h-screen flex flex-col justify-center">
  <div className="w-full">
   <h1 className="flex justify-center font-bold text-6xl mb-10">
    ( ͡° ͜ʖ ͡° )
   </h1>
   <h1 className="flex justify-center font-bold text-2xl sm:text-4xl md:text-5xl lg:text-6xl">
    Sorry, die Website ist zu massiv
   </h1>
   <h2 className="flex justify-center font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl">
    Kaufen Sie einen größeren Bildschrim
   </h2>
   <h3 className="flex justify-center font-bold text-md sm:text-lg md:text-xl lg:text-2xl">
    (oder benutzen Sie ihren Computer)
   </h3>
  </div>
 </div>

 return children;

}