import Image from "next/image";
import { Eye, LineChartIcon, PiggyBank, Ruler, Users2 } from "lucide-react";
import StartButton from "@/app/(home page)/(comonents)/StartButton";
import { TypeAnimation } from "react-type-animation";
import ScrollHint from "../../(comonents)/ScrollHint";

export default function Hero() {
 return (
  <section className="w-full h-screen shadow-inner-b z-30" data-scroll-section>
   <ScrollHint />
   <div
    className="flex flex-col xl:flex-row justify-start"
    data-scroll
    data-scroll-speed="-5"
   >
    <div
     className="w-1/2 flex flex-col justify-center"
     data-scroll
     data-scroll-speed="3"
     data-scroll-direction="horizontal"
    >
     <Image
      className="block md:hidden xl:block h-full w-full scale-90"
      src="/hero.ig-phone.webp"
      alt=""
      height={4167}
      width={4167}
      priority
     />
    </div>
    <div
     className="pt-0 sm:pt-10 md:pt-32 xl:pt-0 w-full xl:w-1/2 flex justify-center"
     data-scroll
     data-scroll-speed="-3"
     data-scroll-direction="horizontal"
    >
     <div className="flex flex-col justify-center max-w-3xl">
      <div className="mb-8 font-bold text-2xl md:text-5xl">
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
      <div className="pb-6 font-normal text-xl md:text-2xl">
       Wir verhelfen Ihrem Unternehmen, durch bezahlte Werbung auf
      </div>
      <div className="text-2xl md:text-3xl pb-6">
       <div className="flex pb-2">
        <span className="flex flex-col justify-center pr-3">
         <Users2 size={45} className="pr-2 text-secondary-foreground" />
        </span>
        <p className="flex flex-col justify-center">
         Gezielte Zielgruppenansprache
        </p>
       </div>
       <div className="flex pb-2">
        <span className="flex flex-col justify-center pr-3">
         <Eye size={45} className="pr-2 text-secondary-foreground" />
        </span>
        <p className="flex flex-col justify-center">Erhöhte Online-Präsenz</p>
       </div>
       <div className="flex pb-2">
        <span className="flex flex-col justify-center pr-3">
         <PiggyBank size={45} className="pr-2 text-secondary-foreground" />
        </span>
        <p className="flex flex-col justify-center">Maximalen ROI</p>
       </div>
       <div className="flex pb-2">
        <span className="flex flex-col justify-center pr-3">
         <Ruler size={45} className="pr-2 text-secondary-foreground" />
        </span>
        <p className="flex flex-col justify-center">Messbare Auswirkung</p>
       </div>
       <div className="flex pb-2">
        <span className="flex flex-col justify-center pr-3">
         <LineChartIcon size={45} className="pr-2 text-secondary-foreground" />
        </span>
        <p className="flex flex-col justify-center">Schnelle Ergebnisse</p>
       </div>
      </div>
      <StartButton>Jetzt Skalieren 🚀</StartButton>
     </div>
    </div>
   </div>
  </section>
 );
}
