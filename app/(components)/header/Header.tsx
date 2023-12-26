"use client";

import { NavMenu } from "./NavMenu";
import { AccountButton } from "./AccountButton";

function Header() {
 return (
  <header className="fixed left-0 top-0 w-full h-16 z-40">
   <div className="flex justify-between px-28 h-full items-center">
    <div className="flex items-center h-full gap-6">
     {/* <a className="h-full" href="/">
      <Image className="p-2" src={"/logo.png"} height={75} width={75} alt="SwiftReach Logo" />
     </a> */}
     <NavMenu />
    </div>
    <AccountButton />
   </div>
  </header>
 );
}

export default Header;
