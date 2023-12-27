import OwnCompanyProfile from "../page"

export default function ComapnyProfile({ params }: { params: { company: string } }) {

    if (false) // Wenn currentUser.company = params.company
        return <OwnCompanyProfile />

    // ONLY FOREGIN COMPANY PROFILES

    return (
        <div>Company Profile of {params.company}.</div>
    )
}
