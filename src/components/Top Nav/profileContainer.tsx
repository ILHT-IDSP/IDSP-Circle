import CircleHolder from '../circle_holders';

interface ProfileContainerProps {
  profileImage: string;
  userName: string;
  circlesCount: number;
  friendsCount: number;
}

const ProfileContainer: React.FC<ProfileContainerProps> = ({
  profileImage,
  userName,
  circlesCount,
  friendsCount,
}) => {  return (
    <div className="flex flex-col items-center w-fit justify-end flex-shrink-0 bg-circles-light-blue" >
      <div className="mb-4">
        <CircleHolder
          imageSrc={profileImage}
          name={userName}
          circleSize={80}
          className="min-w-[80px]"
        />
      </div>
      
      <div className="flex gap-6 justify-center mt-2">
        <div className="flex flex-col items-center">
			<p className='font-bold'>{circlesCount}</p>
			<p>Circles</p>
        </div>
        <div className="flex flex-col items-center">
			<p className='font-bold'>{friendsCount}</p>
          <p>Friends</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileContainer;
