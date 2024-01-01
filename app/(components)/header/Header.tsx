"use client";

import { NavMenu } from "./NavMenu";

function Header() {

 return (<>
  <header id="header" className="fixed left-0 top-0 w-full h-20 z-40"> 
    <div className="flex justify-between px-28 h-full items-center">
     <div className="flex items-center h-full gap-6">
      <NavMenu />
     </div>
    </div>
   </header>
  </>
 );
}

export default Header;
