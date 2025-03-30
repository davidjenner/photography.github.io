/**
 * Nature Photography Collection
 * 
 * Guidelines for adding new nature photos:
 * 1. Include diverse wildlife and plant life
 * 2. Add detailed species information in descriptions
 * 3. Categorize by ecosystem (e.g., Forest, Desert, Ocean)
 * 4. Note any special circumstances or rare captures
 */

import { GalleryImage } from '../../../types/gallery';

export const nature: GalleryImage[] = [
  {
    id: 3,
    title: "Ocean Waves",
    description: "Powerful waves crashing against the shoreline during golden hour",
    thumbnail: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&q=80",
    fullSize: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1600&q=90",
    categories: ["Nature", "Ocean", "Water"],
    location: "Pacific Coast",
    width: 600,
    height: 400,
    metadata: {
      dateTaken: "2024-03-01",
      camera: "Nikon Z9",
      settings: {
        aperture: "f/8",
        shutterSpeed: "1/1000",
        iso: 200,
        focalLength: "70mm"
      },
      photographer: "David Jenner",
      copyright: "© 2024 David Jenner"
    }
  },
  // Add more nature images here...
];