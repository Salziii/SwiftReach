import OwnProfile from "@/app/profile/page"

export default function UserProfile({ params }: { params: { company: string, profile: string } }) {

    if (false)  // Wenn currentUser.company = params.company && currentUser == params.profile.user 
        return <OwnProfile />

    // ONLY FOREGIN PROFILES

    return (
        <>
            User Profile of {params.profile} in Company {params.company}.
        </>
    )
}
