
// Create a random client ID for demo purposes
// In production, you should use a proper Unsplash API key
const DEMO_CLIENT_ID = 'UTOzFSCE3zv_yfKN8jtnVXPffTm1QjiOOFS60-U4JxY';

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
    const response = await fetch(
      `https://api.unsplash.com/photos/random?client_id=${DEMO_CLIENT_ID}&count=${perPage}`,
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
