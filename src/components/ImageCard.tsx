
import { useState } from 'react';
import { UnsplashPhoto } from '../services/unsplashService';
import { cn } from '@/lib/utils';

interface ImageCardProps {
  photo: UnsplashPhoto;
  className?: string;
}

const ImageCard = ({ photo, className }: ImageCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = () => {
    setIsError(true);
  };

  // Calculate aspect ratio to maintain proper size in Masonry layout
  const aspectRatio = photo.height / photo.width;
  const paddingTop = `${aspectRatio * 100}%`;

  return (
    <div 
      className={cn(
        "masonry-grid-item rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl",
        className
      )}
    >
      {!isLoaded && !isError && (
        <div 
          className="skeleton-loader w-full" 
          style={{ paddingTop }}
        />
      )}
      
      {!isError ? (
        <img
          src={photo.urls.regular}
          alt={photo.alt_description || "Unsplash image"}
          className={cn(
            "w-full h-auto transition-opacity duration-300",
            isLoaded ? "opacity-100 image-loaded" : "opacity-0"
          )}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
        />
      ) : (
        <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-800" style={{ paddingTop }}>
          <p className="text-gray-500">Image failed to load</p>
        </div>
      )}

      <div className="p-2 text-xs opacity-80 absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent text-white">
        Photo by {photo.user.name}
      </div>
    </div>
  );
};

export default ImageCard;
