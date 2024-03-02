"use client";

import { animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { BsArrowDownCircle } from "react-icons/bs";

export default function ScrollHint() {

 const iconRef = useRef<HTMLDivElement | null>(null);
 
 useEffect(() => {
   animate(iconRef.current!, { opacity: [0, 1, 0] }, { duration: 3.25, repeat: Infinity })
 }, []);

 return (<div className="absolute mb-12 bottom-0 w-screen flex justify-center"> 
  <div ref={iconRef}>
   <BsArrowDownCircle size={50} />
  </div>
 </div>);
}
