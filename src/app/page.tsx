import DemoNavBar from "@/components/top_nav/DemoNavBar";
import prisma from "@/lib/prisma";
import CircleHolder from "@/components/circle_holders";
import AlbumCard from "@/components/album/AlbumCard";
import NavBar from "@/components/bottom_bar/NavBar";

export default async function Home() {
    const circles = await prisma.circle.findMany();
    const albums = await prisma.album.findMany({
        include: {
            creator: true,
        },
    });

    return (
        <>
            <DemoNavBar />
            <main className="w-full max-w-xl mx-auto min-h-screen bg-background flex flex-col items-center px-2 pb-8">
                <section className="w-full mt-4">
                    <h2 className="text-lg font-bold mb-2">Circles</h2>
                    <div className="flex flex-row gap-4 overflow-x-auto pb-2">
                        {circles.map((circle) => (
                            <div
                                key={circle.id}
                                className="flex-shrink-0"
                            >
                                <CircleHolder
                                    imageSrc={circle.avatar || "/images/default-avatar.png"}
                                    name={circle.name}
                                    circleSize={80}
                                />
                            </div>
                        ))}
                    </div>
                </section>

				<section className='w-full my-32'>
					<h2 className='text-lg font-bold mb-2'>Albums</h2>
					<div className='grid grid-cols-2 gap-4'>
						{albums.map(album => (
							<AlbumCard
								key={album.id}
								albumImage={album.coverImage || '/images/albums/year1.jpeg'}
								albumName={album.title}
								userProfileImage={album.creator?.profileImage || '/images/default-avatar.png'}
							/>
						))}
					</div>
				</section>
			</main>
			<NavBar/>
		</>
	);
}
