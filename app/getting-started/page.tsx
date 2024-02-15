import Footer from "../(components)/footer";
import Forms from "./Forms";
import SmoothScroll from "@/lib/hooks/SmoothScroll";

export default function GettingStarted() {

 // WENN loggedIn: auf / schicken + Toast (Du bist bereits in einer Company)

 return <SmoothScroll>
  <article className="h-screen flex flex-col justify-center">
   <div className="h-5/6 w-full flex">
    <Forms />
   </div>
  </article>
 </SmoothScroll>
};
