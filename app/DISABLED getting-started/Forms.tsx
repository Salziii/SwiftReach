"use client";

import React, { useState } from "react";
import { VerticalLine } from "./(components)/icons/VerticalLine";
import { Dot } from "./(components)/icons/Dot";
import AboutYou from "./forms/aboutYou";
import { useRouter } from "next/navigation";
import YourGoals from "./forms/yourGoals";
import { StepTitle } from "./(components)/StepTitle";
import Buttons from "./forms/(components)/Buttons";

export default function Forms() {
 const router = useRouter();

 const [data, setData] = useState({
  customer_id: "",
 });

 const [active, setActive] = useState(0);

 const button = {
  canScroll: () => active + 1 < pages.length,
  submit: () => {
   if (active + 1 < pages.length) {
    setActive(active + 1);
   } else {
    router.push("/");
   }
  },
 };

 const pages = [
  {
   name: "Your Goals",
   form: <YourGoals button={button} data={data} setData={setData} />,
   res: null,
  },
  {
   name: "Our Help",
   form: <Buttons submit={button.submit} button={button} />,
   res: null,
  },
  {
   name: "About You",
   form: <AboutYou button={button} data={data} setData={setData} />,
   res: null,
  },
  { name: "Select An Appointment", form: <></>, res: null },
 ];

 return (
  <>
   <div className="w-[500px] lg:w-[1000px] hidden md:flex justify-center border-r-2 border-[#8586887c] border-dashed">
    <div className="flex flex-col justify-center">
     {pages.map((page) => (
      <>
       <div className="flex items-center gap-4">
        <Dot active={active >= pages.indexOf(page)} />
        <StepTitle active={active === pages.indexOf(page)} title={page.name} />
       </div>
       {pages.length > pages.indexOf(page) + 1 ? (
        <VerticalLine active={active > pages.indexOf(page)} />
       ) : (
        <></>
       )}
      </>
     ))}
    </div>
   </div>
   <div className="w-full flex justify-center">{pages[active].form}</div>
  </>
 );
}
