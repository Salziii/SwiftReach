"use client"

import { Metadata } from "next";
import Footer from "../(components)/footer";
import Header from "../(components)/header";
import { useSearchParams } from 'next/navigation'

// export const metadata: Metadata = {
//  title: "Onboarding"
// };

export default function Onboarding() {

 const searchParams = useSearchParams()
 const clientId = searchParams.get('clientId')

 return (
  <div>
   <Header />
   <div className="h-screen">
   {clientId}
   </div>
   <Footer />
  </div>
 );
}
