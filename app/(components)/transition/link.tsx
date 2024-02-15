"use client";

import { useRouter } from "next/navigation";

import { animatePageOut } from "@/app/(components)/transition/animations";

export default function Link({ children, className, href }: { children: React.ReactNode, className?: string, href: string; }) {

 const router = useRouter()

 const handleClick = () => {
  animatePageOut(href, router);
 };

 return <button onClick={handleClick} className={className + " cursor-pointer"}>
  {children}
 </button>
}