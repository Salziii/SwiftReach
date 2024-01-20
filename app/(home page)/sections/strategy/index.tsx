import FirstSection from "./sections/1";
import SecondSection from "./sections/2";
import ThirdSection from "./sections/3";
import FourthSection from "./sections/4";

const sections:React.JSX.Element[] = [
 <FirstSection />,
 <SecondSection />,
 <ThirdSection />,
 <FourthSection />
];

export default function Strategy() {
 return (
  <section className="h-[150vh] shadow-inner-y" data-scroll-section id="strategy">
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
      <div key={i} className={`w-[50vw] h-full`}>
       {section}
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
