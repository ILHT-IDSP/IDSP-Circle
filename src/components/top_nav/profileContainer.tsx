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
    <div 
      className="flex flex-col items-center w-fit justify-end flex-shrink-0" 
      style={{ backgroundColor: 'var(--circles-light-blue)' }}
    >
      <div className="mb-2 sm:mb-4">
        <CircleHolder
          imageSrc={profileImage}
          name={userName}
          circleSize={60}
          className="sm:min-w-[80px]"
        />
      </div>
      
      <div className="flex gap-4 sm:gap-6 justify-center mt-1 sm:mt-2">
        <div className="flex flex-col items-center">
          <p className='font-bold text-sm sm:text-base'>{circlesCount}</p>
          <p className="text-xs sm:text-sm">Circles</p>
        </div>
        <div className="flex flex-col items-center">
          <p className='font-bold text-sm sm:text-base'>{friendsCount}</p>
          <p className="text-xs sm:text-sm">Friends</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileContainer;
