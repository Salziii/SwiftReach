import Link from "@/app/(components)/transition/link";

export default function StartButton({ children, className }: { children: string, className?:string }) {

 return <Link href="/getting-started">
 <div className={"w-full min-w-[500px] font-bold text-xl rounded-full py-3 transition transform cursor-pointer bg-transparent text-white border-2 border-white shadow-xl hover:scale-105 hover:shadow-2xl " + className}>
  {children}
 </div>
</Link>
}
