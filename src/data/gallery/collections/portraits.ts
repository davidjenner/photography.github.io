/**
 * Portrait Photography Collection
 * 
 * Guidelines for adding new portraits:
 * 1. Use high-quality images from reputable sources (e.g., Unsplash)
 * 2. Maintain consistent image sizes:
 *    - Thumbnails: 400px width
 *    - Full size: 1600px width
 * 3. Include detailed descriptions and metadata
 * 4. Add appropriate categories for filtering
 */

import { GalleryImage } from '../../../types/gallery';

export const portraits: GalleryImage[] = [
  {
    id: 1,
    title: "Portrait in the City",
    description: "Urban portrait photography showcasing natural light and city backdrop",
    thumbnail: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    fullSize: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1600&q=90",
    categories: ["Portrait", "Urban"],
    location: "New York",
    width: 400,
    height: 600,
    metadata: {
      dateTaken: "2024-02-15",
      camera: "Sony A7 IV",
      settings: {
        aperture: "f/1.8",
        shutterSpeed: "1/200",
        iso: 100,
        focalLength: "85mm"
      },
      photographer: "David Jenner",
      copyright: "© 2024 David Jenner"
    }
  },
  // Add more portrait images here...
];