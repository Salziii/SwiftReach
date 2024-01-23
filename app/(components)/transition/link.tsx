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

{/* <Link href="/getting-started">
 <button className="w-full font-bold text-xl rounded-full py-3 transition transform cursor-pointer bg-body bg-transparent text-white border-2 border-white shadow-xl hover:scale-105 hover:shadow-2xl">
  Jetzt Skalieren 🚀
 </button>
</Link> */}
