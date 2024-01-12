"use client"

import Footer from "../(components)/footer";
import Header from "../(components)/header";
import { useSearchParams } from 'next/navigation'
import axios from "axios";
import { useEffect, useState } from "react";

// export const metadata: Metadata = {
//  title: "Onboarding"
// };

export default function Onboarding() {

 const [loading, setLoading] = useState(true);
 const [company, setCompany] = useState<any>()

 const companyId = useSearchParams().get('companyId');

 useEffect(() => {
  setLoading(true)
  axios.get("/api/company?companyId=" + companyId).then((res) => res.data).then((data) => setCompany(data))
  setLoading(false)
 }, [])

 return (
  <div>
   <Header />
   <div className="h-screen">
    {loading || !company
     ? <div>Loading...</div>
     : <div>
      <h1 className="text-6xl">Name: {company.name}</h1>
      <h2 className="text-4xl">Contact Email: {company.contactEmail}</h2>
     </div>
    }
   </div>
   <Footer />
  </div>
 );
}
