import { ReactNode } from 'react';
import { FaChevronLeft, FaEdit, FaMap } from 'react-icons/fa';
import MusicLocationTag from './musicLocationTag';

interface TopNavProps {
  title: string;
  showBackButton?: boolean;
  showMusicTag?: boolean;
  musicTagProps?: {
    song: string;
    artist: string;
    location: string;
  };
  // the navbar has an element on the right side that is one of these options
  rightElement?: 'edit' | 'map' | 'next' | 'create' | 'skip' | null;
  onBackClick?: () => void;
  onRightElementClick?: () => void;
}

const TopNav: React.FC<TopNavProps> = ({
  title,
  showBackButton = true,
  showMusicTag = false,
  musicTagProps,
  rightElement = null,
  onBackClick,
  onRightElementClick,
}) => {  const renderRightElement = (): ReactNode => {
    if (!rightElement) return null;

    switch (rightElement) {
      case 'edit':
        return (          <button 
            className="hover:opacity-80 transition-opacity text-primary"
            onClick={onRightElementClick}
            aria-label="Edit"
          >
            <FaEdit className="text-lg sm:text-xl md:text-2xl" />
          </button>
        );
      case 'map':
        return (          <button 
            className="hover:opacity-80 transition-opacity text-primary"
            onClick={onRightElementClick}
            aria-label="Map"
          >
            <FaMap className="text-lg sm:text-xl md:text-2xl" />
          </button>
        );
      case 'next':
      case 'create':
      case 'skip':
        return (          <button 
            className="font-medium text-xs sm:text-sm md:text-base lg:text-lg hover:opacity-80 transition-opacity whitespace-nowrap text-primary"
            onClick={onRightElementClick}
          >
            {rightElement.charAt(0).toUpperCase() + rightElement.slice(1)}
          </button>
        );
      default:
        return null;
    }
  };
  return (
    <div className="w-full">
      <div className="flex items-center justify-between py-2 sm:py-3 md:py-4 px-3 sm:px-4 md:px-6">
        {/* Left section - responsive width for back button */}
        <div className="w-8 sm:w-10 flex items-center">
          {showBackButton ? (            <button 
              className="hover:opacity-80 transition-opacity text-primary"
              onClick={onBackClick}
              aria-label="Go back"
            >
              <FaChevronLeft className="text-lg sm:text-xl md:text-2xl" />
            </button>
          ) : null}
        </div>

        {/* Center section - title with responsive sizing */}        <h1 
          className="text-center max-w-[60%] truncate px-2 text-primary"
        >
          {title}
        </h1>

        {/* Right section - responsive width */}
        <div className="w-8 sm:w-10 flex justify-end items-center">
          {renderRightElement()}
        </div>
      </div>

      {/* Music location tag - responsive margins */}
      {showMusicTag && musicTagProps && (
        <div className="flex justify-center mt-1 sm:mt-2 mb-2 sm:mb-4 px-2">
          <MusicLocationTag
            song={musicTagProps.song}
            artist={musicTagProps.artist}
            location={musicTagProps.location}
          />
        </div>
      )}
    </div>
  );
};

export default TopNav;