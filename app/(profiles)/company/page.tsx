"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

export default function OwnCompanyProfile() {
    
    const [company, setCompany] = useState<any | undefined>()
    const [cookie] = useCookies();

    useEffect(() => {
        axios.get("/api/company?id=" + cookie.company).then((res) => res.data).then((data) => setCompany(data))
    }, [])

    return !company
        ? <div>Loading...</div>
        : <div>
            {company.name}
        </div>
}
