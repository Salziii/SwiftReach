import { Metadata } from "next";
import Forms from "./Forms";

export const metadata: Metadata = {
 title: "Getting Started",
};

export default () => {
 return (
  <article className="h-[100vh] flex flex-col justify-center">
   <div className="h-5/6 w-full flex">
    <Forms />
   </div>
  </article>
 );
};
