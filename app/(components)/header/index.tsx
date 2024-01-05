"use client";

import { NavMenu } from "./NavMenu";

export default function Header() {

 return <header></header>;

 return (<>
  <header id="header" className="absolute left-0 top-0 w-full h-20 z-40"> 
    <div className="flex justify-between px-28 h-full items-center">
     <div className="flex items-center h-full gap-6">
      <NavMenu />
     </div>
    </div>
   </header>
  </>
 );
}
