import OwnProfile from "../page"

export default function Profile({ params }: { params: { profile: string } }) {

    if (false) // WENN currentUser == params.profile.user 
        return <OwnProfile />

    // ONLY FOREGIN PROFILES OF OWN COMPANY

    return (<></>)
}
