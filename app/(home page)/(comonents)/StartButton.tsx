"use client";

import { useEffect, useState } from "react";
import { PopupButton } from "react-calendly";

export default function StartButton({ children, className }: { children: string, className?:string }) {
 const [el, setEl] = useState<HTMLElement | null>(null);

 useEffect(() => {
  if (document) setEl(document.getElementById("button"));
 }, []);

 return (
  <div id="button">
   {el ? (
    <PopupButton
     url="https://calendly.com/administration-_b0/discovery-call"
     rootElement={el}
     text={children}
     pageSettings={{
      backgroundColor: "272727",
      hideEventTypeDetails: false,
      hideLandingPageDetails: false,
      primaryColor: "B133CE",
      textColor: "f8fafc",
      hideGdprBanner: true
     }}
     className={"w-full font-bold text-xl rounded-full py-3 transition transform cursor-pointer bg-transparent text-white border-2 border-white shadow-xl hover:scale-105 hover:shadow-2xl " + className}
    />
   ) : (
    <></>
   )}
  </div>
 );
}

{/* <Link href="/getting-started">
 <button className="w-full font-bold text-xl rounded-full py-3 transition transform cursor-pointer bg-body bg-transparent text-white border-2 border-white shadow-xl hover:scale-105 hover:shadow-2xl">
  Jetzt Skalieren 🚀
 </button>
</Link> */}
