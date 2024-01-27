"use client";

import React, { useState } from "react";
import { VerticalLine } from "./(components)/icons/VerticalLine";
import { Dot } from "./(components)/icons/Dot";
import Information from "./forms/information";
import { useRouter } from "next/navigation";
import Painpoints from "./forms/painpoints";
import { StepTitle } from "./(components)/StepTitle";
import Appointment from "./forms/appointment";

export default function Forms() {
 const router = useRouter();

 const [data, setData] = useState({
  id: "",
  painpoints: [],
  services: [],
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
   name: "Your Painpoints",
   form: <Painpoints button={button} data={data} setData={setData} />,
  },
  // {
  //  name: "Our Help",
  //  form: <Services button={button} data={data} setData={setData} />
  // },
  {
   name: "About You",
   form: <Information button={button} data={data} setData={setData} />,
  },
  {
   name: "Select An Appointment",
   form: <Appointment button={button} data={data} setData={setData} />,
  },
 ];

 return (
  <>
   <div className="w-[500px] lg:w-[1000px] hidden md:flex justify-center border-r-2 border-dashed">
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
