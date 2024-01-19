"use client";

export default function Stop({ children, stop }:{ children:any, stop:any}) {

 return <div className="flex 2xl:justify-start w-screen" id="root">
  <div className="w-1/2">
  {children}
  </div>
  <div className="w-1/2 h-screen" data-scroll data-scroll-sticky data-scroll-target="#root">
   {stop}
  </div>
 </div>

}
