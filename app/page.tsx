import Image from "next/image";
import Header from "./(components)/header/Header";
import Video from "next-video";

export default function Home() {
 return (
  <>
   <Header />
   <div>
    <section className="flex justify-center w-screen h-screen" id="hero">
     <div className="w-1/2">

     </div>
     <div className="w-1/2 flex flex-col justify-center">
      <Image src="/hero_phone.png" alt="" height={1024} width={849} />
     </div>
     
    </section>
   </div>
  </>
 );
}
