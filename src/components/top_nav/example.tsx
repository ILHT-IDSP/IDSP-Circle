"use client"
import TopNav from './topNav';

export const NavWithBackButton = () => {
  const handleBackClick = () => {
    console.log('Back button clicked!');
    // Add navigation logic here
  };

  return (
    <TopNav 
      title="Profile" 
      showBackButton={true} 
      onBackClick={handleBackClick} 
    />
  );
};

export const NavWithMusicTag = () => {
  return (
    <TopNav
      title="Now Playing"
      showMusicTag={true}
      musicTagProps={{
        song: "Dreams",
        artist: "Fleetwood Mac",
        location: "Stanley Park, Vancouver"
      }}
      rightElement="edit"
      onRightElementClick={() => console.log('Edit clicked!')}
    />
  );
};

export const NavWithMapButton = () => {
  return (
    <TopNav
      title="Discover"
      showBackButton={false}
      rightElement="map"
      onRightElementClick={() => console.log('Map clicked!')}
    />
  );
};

export const NavWithNextButton = () => {
  return (
    <TopNav
      title="Create Profile"
      rightElement="next"
      onRightElementClick={() => console.log('Next clicked!')}
    />
  );
};

export const NavWithCreateButton = () => {
  return (
    <TopNav
      title="New Circle"
      rightElement="create"
      onRightElementClick={() => console.log('Create clicked!')}
    />
  );
};

export const NavWithSkipButton = () => {
  return (
    <TopNav
      title="Tutorial"
      showBackButton={false}
      rightElement="skip"
      onRightElementClick={() => console.log('Skip clicked!')}
    />
  );
};

export const AllNavBars = () => {
	return (
		<div className="flex flex-col gap-6">
		<div className="border-b pb-4">
			<NavWithBackButton/>
		</div>
		<div className="border-b pb-4">
			<NavWithCreateButton/>
		</div>
		<div className="border-b pb-4">
			<NavWithMapButton/>
		</div>
		<div className="border-b pb-4">
			<NavWithMusicTag/>
		</div>
		<div className="border-b pb-4">
			<NavWithNextButton/>
		</div>
		<div className="border-b pb-4">
			<NavWithSkipButton/>
		</div>
		</div>
	)
}
