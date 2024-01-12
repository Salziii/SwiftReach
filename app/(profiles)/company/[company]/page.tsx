"use client";

import OwnCompanyProfile from "../page"
import { useEffect, useState } from "react";
import axios from "axios";

export default function ComapnyProfile({ params }: { params: { company: string } }) {

    if (false) // Wenn currentUser.company = params.company
        return <OwnCompanyProfile />

    // ONLY FOREGIN COMPANY PROFILES

    const [loading, setLoading] = useState(true);
    const [company, setCompany] = useState<any>()

    useEffect(() => {
        setLoading(true)
        axios.put("/api/company/search", { where: { name: params.company } }).then((res) => res.data).then((data) => setCompany(data))
        setLoading(false)
    }, [])

    return loading || !company
        ? <div>Loading...</div>
        : <div>
            <h1 className="text-6xl">Name: {company.name}</h1>
            <h2 className="text-4xl">Contact Email: {company.contactEmail}</h2>
        </div>

}
