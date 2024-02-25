import { Crown, LineChart, Rocket } from "lucide-react";
import Image from "next/image";
import { GoGoal } from "react-icons/go";
import { FaPeopleRoof } from "react-icons/fa6";
import { LuBrain } from "react-icons/lu";
import { FaRegHandshake } from "react-icons/fa";

export default function SecondSection() {
 return (
  <div className="w-full h-full flex flex-col justify-center">
   <div className="w-full flex justify-center">
    <Image
     className="mb-2"
     src="/strategy/1.webp"
     width={500}
     height={500}
     alt=""
    />
   </div>
   <h2 className="mt-2 w-full flex justify-center font-bold text-3xl bg-gradient-to-r from-[#00BCE8] to-[#0B88A8] text-transparent bg-clip-text">
    Schritt 1
   </h2>
   <h1 className="w-full flex justify-center font-bold text-5xl">
    Discovery Call
   </h1>
   <h3 className="mt-2 w-full flex justify-center text-secondary-foreground font-bold text-2xl">
    ~ 20 min
   </h3>
   <div className="flex justify-center mt-8">
    <div className="flex flex-col gap-4">
     <div className="flex justify-center">
      <span className="flex flex-col justify-center pr-2">
       <div>
        <FaPeopleRoof size={32} className="text-secondary-foreground" />
       </div>
      </span>
      <p
       className="flex flex-col justify-center text-xl font-semibold"
      >
       Vorstellung
      </p>
     </div>
     <div className="flex justify-center">
      <span className="flex flex-col justify-center pr-2">
       <div>
        <GoGoal size={32} className="text-secondary-foreground" />
       </div>
      </span>
      <p
       className="flex flex-col justify-center text-xl font-semibold"
      >
       Ziel Identifikation
      </p>
     </div>
     <div className="flex justify-center">
      <span className="flex flex-col justify-center pr-2">
       <div>
        <FaRegHandshake size={32} className="text-secondary-foreground" />
       </div>
      </span>
      <p
       className="flex flex-col justify-center text-xl font-semibold"
      >
       Kompatibilitätsprüfung
      </p>
     </div>
     <div className="flex justify-center">
      <span className="flex flex-col justify-center pr-2">
       <div>
        <LuBrain size={32} className="text-secondary-foreground" />
       </div>
      </span>
      <p
       className="flex flex-col justify-center text-xl font-semibold"
      >
       Bedürfniss Identifikation
      </p>
     </div>
     <div className="flex justify-center">
      <span className="flex flex-col justify-center pr-2">
       <div>
        <Crown size={32} className="text-secondary-foreground" />
       </div>
      </span>
      <p
       className="flex flex-col justify-center text-xl font-semibold"
      >
       Servicepräsentation
      </p>
     </div>
     <div className="flex justify-center">
      <span className="flex flex-col justify-center pr-2">
       <div>
        <LineChart size={32} className="text-secondary-foreground" />
       </div>
      </span>
      <p
       className="flex flex-col justify-center text-xl font-semibold"
      >
       Budget- & Zeitinvest
      </p>
     </div>
     <div className="flex justify-center">
      <span className="flex flex-col justify-center pr-2">
       <div>
        <Rocket size={32} className="text-secondary-foreground" />
       </div>
      </span>
      <p
       className="flex flex-col justify-center text-xl font-semibold"
      >
       Nächste Schritte
      </p>
     </div>
    </div>
   </div>
  </div>
 );
}
