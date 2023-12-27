"use client";

import { NavMenu } from "./NavMenu";

function Header() {
 return (
  <header className="fixed left-0 top-0 w-full h-16 z-40">
   <div className="flex justify-between px-28 h-full items-center">
    <div className="flex items-center h-full gap-6">
     <NavMenu />
    </div>
   </div>
  </header>
 );
}

export default Header;
