/**
 * Landscape Photography Collection
 * 
 * Guidelines for adding new landscapes:
 * 1. Prioritize wide-aspect ratio images (e.g., 16:9, 3:2)
 * 2. Include location information for each image
 * 3. Add relevant categories (e.g., Mountains, Coast, Desert)
 * 4. Consider seasonal variations in descriptions
 */

import { GalleryImage } from '../../../types/gallery';

export const landscapes: GalleryImage[] = [
  {
    id: 2,
    title: "Mountain Lake",
    description: "Peaceful mountain lake at sunset, reflecting the golden hour light",
    thumbnail: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&q=80",
    fullSize: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&q=90",
    categories: ["Nature", "Mountains", "Water"],
    location: "Swiss Alps",
    width: 600,
    height: 400,
    metadata: {
      dateTaken: "2024-01-20",
      camera: "Canon EOS R5",
      settings: {
        aperture: "f/11",
        shutterSpeed: "1/60",
        iso: 100,
        focalLength: "24mm"
      },
      photographer: "David Jenner",
      copyright: "© 2024 David Jenner"
    }
  },
  // Add more landscape images here...
];