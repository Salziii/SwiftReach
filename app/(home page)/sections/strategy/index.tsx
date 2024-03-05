import { Crown, LineChart, Lock, Rocket, User2 } from "lucide-react";
import { FaRegHandshake } from "react-icons/fa";
import { FaPeopleRoof } from "react-icons/fa6";
import { RiDashboardLine, RiInformationLine, RiQuestionLine } from "react-icons/ri";
import Card from "./(components)/card";

const sections = [
   {
      label: "Demo Call",
      duration: "20 min",
      img: "/strategy/1.webp",
      steps: [
         { icon: FaPeopleRoof, title: "Vorstellung" },
         { icon: RiInformationLine, title: "Über SwiftReach" },
         { icon: RiQuestionLine, title: "Allgemeine Fragen" },
         { icon: Rocket, title: "Nächste Schritte" }
      ]
   },
   {
      label: "Discovery Call",
      img: "/strategy/2.webp",
      duration: "~ 45 min",
      steps: [
         { icon: User2, title: "Über Dich" },
         { icon: Crown, title: "Warum Paid Ads?" },
         { icon: FaRegHandshake, title: "Kollaborationstest" },
         { icon: RiDashboardLine, title: "Dashboard Zugang" },
         { icon: LineChart, title: "Vereinbarung" },
         { icon: Rocket, title: "Nächste Schritte" }
      ]
   },
   {
      label: "KickOff Call",
      img: "/strategy/3.webp",
      duration: "~ 3 h",
      steps: [
         { icon: Lock, title: "You'll see" }
      ]
   },
   // {
   //    index: 4,
   //    label: "Last Steps",
   //    img: "/strategy/4.webp",
   //    duration: "~ 1 h",
   //    steps: []
   // }
];

export default function Strategy() {
   return (
      <section className="h-[150vh] shadow-inner-t" data-scroll-section id="strategy">
         <div
            className="w-screen h-screen"
            data-scroll
            data-scroll-sticky
            data-scroll-target="#strategy"
         >
            <div
               className="flex w-[250vw] h-screen"
               data-scroll
               data-scroll-speed="40"
               data-scroll-direction="horizontal"
            >
               <div className="w-[50vw]" />
               {sections.map((section, i) => (
                  <div key={i} className="w-[50vw] h-full">
                     <div className="h-full flex flex-col justify-center">
                        <Card index={i + 1} label={section.label} duration={section.duration} img={section.img} steps={section.steps} />
                     </div>
                  </div>
               ))}
               <div className="w-[50vw]" />
            </div>
         </div>
      </section>
   );
}

{
   /* <div className="w-full flex flex-col justify-center py-20">
      <DefaultMotion className="flex justify-center mb-6 text-5xl font-bold">
       Wie Wir Es Angehen
      </DefaultMotion>
      <DefaultMotion className="flex justify-center mb-16 text-2xl font-normal">
       Unser Medienteam verwaltet die Werbeanzeigen für Ihr Unternehmen auf Plattformen, wie Facebook, Instagram, YouTube, Google, Pinterest, TikTok usw.
      </DefaultMotion>
      <div className="flex justify-center">
       <div className="flex justify-between w-4/5">
        
       </div>
      </div>
     </div> */
}
