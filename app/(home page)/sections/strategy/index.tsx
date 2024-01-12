import Image from "next/image";
import { DefaultMotion } from "@/app/(components)/motion";

const steps = [
 {
  title: "Step 1",
  img: { src: "/strategy/1.webp", width: 196, height: 151 },
  description: <></>,
 },
 {
  title: "Step 2",
  img: { src: "/strategy/2.webp", width: 195, height: 135 },
  description: <></>,
 },
 {
  title: "Step 3",
  img: { src: "/strategy/3.webp", width: 196, height: 140 },
  description: <></>,
 },
 {
  title: "Step 4",
  img: { src: "/strategy/4.webp", width: 196, height: 140 },
  description: <></>,
 },
];

export default function Strategy() {
 return (
  <section className="w-full" id="strategy">
   <div className="w-full flex flex-col justify-center my-20">
    <DefaultMotion className="flex justify-center mb-6 text-5xl font-bold">
     Wie Wir Es Angehen
    </DefaultMotion>
    <DefaultMotion className="flex justify-center mb-16 text-2xl font-normal">
     Unser erfahrenes Mediateam verwaltet die Werbekampagnen für Ihr Unternehmen
     auf Plattformen, wie Facebook, Instagram, Snapchat, Pinterest, TikTok,
     Taboola, Outbrain usw.
    </DefaultMotion>
    <div className="flex justify-center">
     <div className="flex justify-between w-4/5">
      {steps.map((step, i) => (
       <div key={i} className="w-full group">
        <DefaultMotion delay={0.1 * i} className="w-full flex justify-center">
         <Image
          className="mb-2 transition transform group-hover:-translate-y-2 group-hover:scale-105"
          src={step.img.src}
          width={step.img.width}
          height={step.img.height}
          alt={step.title}
         />
        </DefaultMotion>
        <DefaultMotion
         delay={0.1 * i}
         className="flex justify-center font-semibold text-2xl"
        >
         {step.title}
        </DefaultMotion>
       </div>
      ))}
     </div>
    </div>
   </div>
  </section>
 );
}
