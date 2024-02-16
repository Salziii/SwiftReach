import SmoothScroll from "@/lib/hooks/SmoothScroll";
import Forms from "./Forms";

export default function GettingStarted() {
 return <SmoothScroll>
  <article className="h-screen flex flex-col justify-center">
   <div className="h-5/6 w-full flex">
    <Forms />
   </div>
  </article>
 </SmoothScroll>
};
