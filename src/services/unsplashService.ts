const UNSPLASH_CLIENT_ID = import.meta.env.VITE_UNSPLASH_CLIENT_ID || 'demo';

interface UnsplashPhoto {
  id: string;
  alt_description: string;
  urls: {
    regular: string;
    small: string;
    thumb: string;
  };
  width: number;
  height: number;
  user: {
    name: string;
    username: string;
  };
}

export async function fetchUnsplashPhotos(page = 1, perPage = 10): Promise<UnsplashPhoto[]> {
  try {
    // Use the /photos endpoint with specific ordering to get consistent results
    const response = await fetch(
      `https://api.unsplash.com/photos?client_id=${UNSPLASH_CLIENT_ID}&page=${page}&per_page=${perPage}&order_by=popular`,
      {
        headers: {
          'Accept-Version': 'v1',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error fetching images: ${response.status}`);
    }

    const data: UnsplashPhoto[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Unsplash photos:', error);
    return [];
  }
}

export type { UnsplashPhoto };
