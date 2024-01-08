import { DefaultMotion } from "@/app/(components)/motion";
import Image from "next/image";

export default function RightSide() {
 return (
  <div className="h-full w-full flex flex-col justify-center">
   <DefaultMotion className="flex justify-center">
    <Image
     id="img"
     className="block md:hidden xl:block h-full w-full scale-75"
     src="/offer.fb-phone.png"
     alt=""
     height={4167}
     width={4167}
    />
   </DefaultMotion>
  </div>
 );
}
