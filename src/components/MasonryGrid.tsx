import { useEffect, useState, useRef, useCallback } from 'react';
import Masonry from 'react-masonry-css';
import { fetchUnsplashPhotos, UnsplashPhoto } from '../services/unsplashService';
import ImageCard from './ImageCard';
import { toast } from '@/components/ui/sonner';
import { VeltComments } from '@veltdev/react';

const breakpointColumnsObj = {
  default: 4,
  1400: 4,
  1100: 3,
  700: 2,
  500: 1
};

const MasonryGrid = () => {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef(false);
  
  // Check if dark mode is enabled by looking at the HTML element class
  useEffect(() => {
    const checkDarkMode = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    };
    
    // Check initial state
    checkDarkMode();
    
    // Set up a mutation observer to detect class changes on the HTML element
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          checkDarkMode();
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => observer.disconnect();
  }, []);
  
  const loadImages = useCallback(async () => {
    if (loadingRef.current || !hasMore) return;
    
    try {
      setLoading(true);
      loadingRef.current = true;
      
      const newPhotos = await fetchUnsplashPhotos(page);
      
      if (newPhotos.length === 0) {
        setHasMore(false);
      } else {
        setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
      }
    } catch (error) {
      console.error('Error loading images:', error);
      toast.error('Failed to load images. Please try again later.');
    } finally {
      setLoading(false);
      loadingRef.current = false;
    }
  }, [page, hasMore]);

  // Ref for the sentinel element (last item in the list)
  const lastImageRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return;
    
    if (observer.current) {
      observer.current.disconnect();
    }
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !loadingRef.current) {
        setPage(prevPage => prevPage + 1);
      }
    }, {
      rootMargin: '100px',
      threshold: 0.1
    });
    
    if (node) {
      observer.current.observe(node);
    }
  }, [loading, hasMore]);

  useEffect(() => {
    loadImages();
  }, [page, loadImages]);

  return (
    <>
      <VeltComments darkMode={isDarkMode} popoverMode={true} />
      <div className="container px-4 mx-auto mt-4">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="masonry-grid"
          columnClassName="masonry-grid-column"
        >
          {photos.map((photo, index) => {
            if (photos.length === index + 1) {
              return (
                <div ref={lastImageRef} key={photo.id}>
                  <ImageCard photo={photo} />
                </div>
              );
            } else {
              return <ImageCard key={photo.id} photo={photo} />;
            }
          })}
        </Masonry>

        {loading && (
          <div className="loading-spinner py-8 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
        
        {!hasMore && photos.length > 0 && (
          <p className="text-center text-gray-500 py-8">You've reached the end!</p>
        )}
      </div>
    </>
  );
};

export default MasonryGrid;