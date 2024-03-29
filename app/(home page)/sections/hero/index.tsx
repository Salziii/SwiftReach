import Image from "next/image";
import { Eye, LineChartIcon, PiggyBank, Ruler, Users2 } from "lucide-react";
import StartButton from "@/app/(home page)/(components)/StartButton";
import { TypeAnimation } from "react-type-animation";
import ScrollHint from "../../(components)/ScrollHint";

export default function Hero() {
 return (
  <section className="w-screen h-screen shadow-inner-b z-30" data-scroll-section>
   <ScrollHint />
   <div
    className="flex flex-col lg:flex-row justify-start"
    data-scroll
    data-scroll-speed="-5"
   >
    <div
     className="w-full flex flex-row justify-center"
     data-scroll
     data-scroll-speed="3"
     data-scroll-direction="horizontal"
    >
     <Image
      className="block h-full w-full scale-90"
      src="/hero/2.webp"
      alt=""
      height={1046}
      width={885}
      priority
     />
    </div>
    <div
     className="pt-0 w-full flex justify-center"
     data-scroll
     data-scroll-speed="-3"
     data-scroll-direction="horizontal"
    >
     <div className="flex flex-col justify-center max-w-3xl">
      <div className="mb-4 font-bold text-4xl">
       <span className="mr-4">Ihre Werbung auf</span>
       <TypeAnimation
        sequence={[
         "Facebook",
         2000,
         "Instagram",
         2000,
         "YouTube",
         2000,
         "TikTok",
         2000,
         "Google",
         2000,
         "Pinterest",
         2000,
        ]}
        speed={25}
        className="bg-gradient-to-r from-primary-foreground to-secondary-foreground text-transparent bg-clip-text"
        wrapper="span"
        repeat={Infinity}
       />
      </div>
      <div className="pb-4 font-normal text-xl">
       Wir verhelfen Ihrem Unternehmen, durch bezahlte Werbung auf
      </div>
      <div className="text-2xl pb-6">
       <div className="flex">
        <span className="flex flex-col justify-center pr-3">
         <Users2 size={45} className="pr-2 text-secondary-foreground" />
        </span>
        <p className="flex flex-col justify-center">
         Gezielte Zielgruppenansprache
        </p>
       </div>
       <div className="flex">
        <span className="flex flex-col justify-center pr-3">
         <Eye size={45} className="pr-2 text-secondary-foreground" />
        </span>
        <p className="flex flex-col justify-center">Erhöhte Online-Präsenz</p>
       </div>
       <div className="flex">
        <span className="flex flex-col justify-center pr-3">
         <PiggyBank size={45} className="pr-2 text-secondary-foreground" />
        </span>
        <p className="flex flex-col justify-center">Maximalen ROI</p>
       </div>
       <div className="flex">
        <span className="flex flex-col justify-center pr-3">
         <Ruler size={45} className="pr-2 text-secondary-foreground" />
        </span>
        <p className="flex flex-col justify-center">Messbare Auswirkung</p>
       </div>
       <div className="flex">
        <span className="flex flex-col justify-center pr-3">
         <LineChartIcon size={45} className="pr-2 text-secondary-foreground" />
        </span>
        <p className="flex flex-col justify-center">Schnelle Ergebnisse</p>
       </div>
      </div>
      <StartButton className="bg-transparent">Jetzt Skalieren 🚀</StartButton>
     </div>
    </div>
   </div>
  </section>
 );
}
