import { FaMusic, FaMapMarkerAlt } from 'react-icons/fa';

interface MusicLocationTagProps {
  song: string;
  artist: string;
  location: string;
}

const MusicLocationTag: React.FC<MusicLocationTagProps> = ({ song, artist, location }) => {  return (
    <div 
      className="flex flex-col items-center rounded-lg w-full max-w-xs p-2 md:p-3" 
      style={{ backgroundColor: 'var(--circles-dark)', color: 'var(--circles-light)' }}
    >
      <div className="flex items-center mb-1 w-full justify-center">
        <FaMusic 
          className="mr-1.5 md:mr-2 text-xs md:text-sm flex-shrink-0" 
          style={{ color: 'var(--circles-light-blue)' }} 
        />
        <div className="flex items-center overflow-hidden">
          <span className="font-medium text-sm md:text-base truncate">{song}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="3" height="4" viewBox="0 0 3 4" fill="none" className="mx-1.5 md:mx-2 flex-shrink-0">
            <path d="M3 2C3 2.29667 2.91203 2.58668 2.7472 2.83335C2.58238 3.08003 2.34811 3.27229 2.07402 3.38582C1.79994 3.49935 1.49834 3.52906 1.20736 3.47118C0.916393 3.4133 0.649119 3.27044 0.43934 3.06066C0.229562 2.85088 0.0867006 2.58361 0.0288227 2.29263C-0.0290551 2.00166 0.000649929 1.70006 0.114181 1.42597C0.227713 1.15189 0.419972 0.917617 0.666646 0.752795C0.913319 0.587973 1.20333 0.5 1.5 0.5C1.89783 0.5 2.27936 0.658035 2.56066 0.93934C2.84196 1.22064 3 1.60218 3 2Z" fill="#737373"/>
          </svg>
          <span className="text-sm md:text-base truncate">{artist}</span>
        </div>
      </div>
      
      <div className="flex items-center text-xs w-full justify-center">
        <FaMapMarkerAlt 
          className="mr-1.5 md:mr-2 text-xs flex-shrink-0" 
          style={{ color: 'var(--circles-light-blue)' }} 
        />
        <span className="truncate text-2xs md:text-xs">{location}</span>
      </div>
    </div>
  );
};

export default MusicLocationTag;