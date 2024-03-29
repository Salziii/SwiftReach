import { RiMailSendLine } from "react-icons/ri";
import Footer from "../(components)/footer";
import { BsTelephoneOutbound } from "react-icons/bs";
import SmoothScroll from "@/lib/hooks/SmoothScroll";

export default function Imprint() {
 return (
  <SmoothScroll>
   <section className="h-screen w-sceen flex justify-center">
    <div className="w-1/2 flex flex-col justify-center">
     <h1 className="text-6xl font-bold flex justify-center">Impressum</h1>
     <h2 className="text-3xl font-semibold mt-2 flex justify-center">
      TMG § 5
     </h2>
     <div className="mt-14">
      <h3 className="text-3xl font-medium pb-6 flex">Information</h3>
      <p className="font-bold flex">SwiftReach</p>
      <p className="mt-2 flex">Marc Trautwein</p>
      <p className="mt-2 flex">marc.trautwein@swiftreach.de</p>
      <p className="mt-2 flex">Pfarrer-Baumgartner-Straße 7</p>
      <p className="flex">Burglengenfled 93133</p>
      <p className="flex">Bayern, Deutschland</p>
     </div>
     <div className="mt-14">
      <h3 className="text-3xl font-medium pb-6">Inhaltlich Verantwortlicher ( RStV § 55 )</h3>
      <p className="mt-2">Nick Singerer</p>
      <p className="mt-2 flex">nick.singerer@swiftreach.de</p>
      <p className="mt-2">Sonnenpark 10</p>
      <p>Burglengenfled 93133</p>
      <p>Bayern, Deutschland</p>
     </div>
     <div className="mt-14">
      <h3 className="text-3xl font-medium pb-6">Kontakt</h3>
      <a
       href="mailto:contact@swiftreach.de"
       className="flex cursor-pointer transition hover:opacity-75"
      >
       <p className="mr-2">contact@swiftreach.de</p>
       <div className="flex flex-col justify-center">
        <RiMailSendLine className="w-4" />
       </div>
      </a>
      <a
       href="tel:+491788688792"
       className="flex cursor-pointer transition hover:opacity-75"
      >
       <p className="mr-2">+49 (0) 178 8688792</p>
       <div className="flex flex-col justify-center">
        <BsTelephoneOutbound className="w-4" />
       </div>
      </a>
     </div>
     <div className="mt-16">
      <h3 className="text-3xl font-medium pb-6">Urheberrechts- oder Copyrightsverletzungen</h3>
      <p>Bei Anfragen zu Urheberrechtsverletzungen richten Sie sich bitte an contact@swiftreach.de. Wir werden Verstöße und Anfragen so schnell wie möglich bearbeiten.</p>
     </div>
    </div>
   </section>
   <Footer />
  </SmoothScroll>
 );
}
