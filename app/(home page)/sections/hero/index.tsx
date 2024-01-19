import Image from "next/image";
import { Eye, LineChartIcon, PiggyBank, PiggyBankIcon, Ruler, Users2 } from "lucide-react";
import { DefaultMotion, FlyInMotion } from "@/app/(components)/motion";
import StartButton from "@/app/(home page)/(comonents)/StartButton";
import { TypeAnimation } from 'react-type-animation';

export default function Hero() {
 return (
  <section
   className="flex flex-col xl:flex-row justify-start w-full h-screen"
  >
   <div className="w-1/2 flex flex-col justify-center">
    <DefaultMotion>
     <Image
      className="block md:hidden xl:block h-full w-full scale-90"
      src="/hero.ig-phone.webp"
      alt=""
      height={4167}
      width={4167}
      priority
     />
    </DefaultMotion>
   </div>
   <div className="pt-0 sm:pt-10 md:pt-32 xl:pt-0 w-full xl:w-1/2 flex justify-center">
    <div className="flex flex-col justify-center max-w-3xl">
     <FlyInMotion className="mb-8 font-bold text-2xl md:text-5xl">
      <span className="mr-4">Ihre Werbung auf</span>
      <TypeAnimation 
       sequence={[
        'Facebook', 2000,
        'Instagram', 2000,
        'YouTube', 2000,
        'TikTok', 2000,
        'Google', 2000,
        'Pinterest', 2000
       ]}
       speed={25}
       className='bg-gradient-to-r from-primary-foreground to-secondary-foreground inline-block text-transparent bg-clip-text'
       wrapper='span'
       repeat={Infinity}
     />
     </FlyInMotion>
     <FlyInMotion delay={0.05} className="pb-6 font-normal text-xl md:text-2xl">
      Wir verhelfen Ihrem Unternehmen, durch bezahlte Werbung auf
     </FlyInMotion>
     <div className="text-2xl md:text-3xl pb-6">
      <FlyInMotion delay={0.1} className="flex pb-2">
       <span className="flex flex-col justify-center pr-3">
        <Users2 size={45} className="pr-2 text-secondary-foreground" />
       </span>
       <p className="flex flex-col justify-center">Gezielte Zielgruppenansprache</p>
      </FlyInMotion>
      <FlyInMotion delay={0.2} className="flex pb-2">
       <span className="flex flex-col justify-center pr-3">
        <Eye size={45} className="pr-2 text-secondary-foreground" />
       </span>
       <p className="flex flex-col justify-center">Erhöhte Online-Präsenz</p>
      </FlyInMotion>
      <FlyInMotion delay={0.3} className="flex pb-2">
       <span className="flex flex-col justify-center pr-3">
        <PiggyBank size={45} className="pr-2 text-secondary-foreground" />
       </span>
       <p className="flex flex-col justify-center">
        Maximalen ROI 
       </p>
      </FlyInMotion>
      <FlyInMotion delay={0.4} className="flex pb-2">
       <span className="flex flex-col justify-center pr-3">
        <Ruler size={45} className="pr-2 text-secondary-foreground" />
       </span>
       <p className="flex flex-col justify-center">
        Messbare Auswirkung
       </p>
      </FlyInMotion>
      <FlyInMotion delay={0.5} className="flex pb-2">
       <span className="flex flex-col justify-center pr-3">
        <LineChartIcon size={45} className="pr-2 text-secondary-foreground" />
       </span>
       <p className="flex flex-col justify-center">
        Schnelle Ergebnisse
       </p>
      </FlyInMotion>
     </div>
     <DefaultMotion delay={0.5}>
     <StartButton>Jetzt Skalieren 🚀</StartButton>
     </DefaultMotion>
    </div>
   </div>
  </section>
 );
}
