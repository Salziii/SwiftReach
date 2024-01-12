"use client";

import Footer from "../(components)/footer";

export default function Imprint() {
 return (
  <>
   <section className="h-screen w-full flex justify-center">
    <div className="h-full flex flex-col justify-center">
     Marc Trautwein <br />
     Pfarrer-Baumgartner-Straße 9 <br />
     Burglengenfled 93133 <br />
     Bayern, Deutschland <br />
     <a href="mailto:marc.trautwein@swiftreach.de">
      marc.trautwein@swiftreach.de
     </a>
     <a href="tel:+491788688792">+49 (0) 178 8688792</a>
    </div>
   </section>
   <Footer />
  </>
 );
}
