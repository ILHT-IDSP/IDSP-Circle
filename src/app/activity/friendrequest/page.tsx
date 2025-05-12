import FriendRequests from "@/components/activity/FriendRequests";
import NavBar from "@/components/bottom_bar/NavBar";

export default function FriendRequestsPage() {
    return (
        <>
            <div className="min-h-screen bg-circles-dark px-4 pt-6 pb-20">
                <h1 className="text-2xl font-bold text-circles-light mb-4 px-4">Friend Requests</h1>
                <FriendRequests />
            </div>
            <NavBar />
        </>
    );
}
