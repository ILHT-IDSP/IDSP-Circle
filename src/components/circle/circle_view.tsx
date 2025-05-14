import AlbumsOwnedByCircle from "./albums_section";
import CircleProfilePicture from "./circle_pfp";
import CircleViewNav from "./circle_view_nav";
import CurrentFriendsInCircle from "./friends_section";

export default function CircleView() {
    return (
        <>
            <div id="circle-page-wrapper">
                <CircleViewNav />
                <CircleProfilePicture />
                <CurrentFriendsInCircle />
                <AlbumsOwnedByCircle />
            </div>
        </>
    );
}
