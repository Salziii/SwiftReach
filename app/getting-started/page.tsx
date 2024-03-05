import SmoothScroll from "@/lib/hooks/SmoothScroll";
import Forms from "./Forms";

export default function GettingStarted() {
 return <SmoothScroll>
  <article className="h-screen flex flex-col justify-center">
   <div className="min-h-[80%] w-full flex">
    <Forms />
   </div>
  </article>
 </SmoothScroll>
};
