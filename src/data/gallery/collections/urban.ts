/**
 * Urban Photography Collection
 * 
 * Guidelines for adding new urban photos:
 * 1. Focus on architectural elements and city life
 * 2. Include both day and night photography
 * 3. Add specific location details (city, district)
 * 4. Note any historical or cultural significance
 */

import { GalleryImage } from '../../../types/gallery';

export const urban: GalleryImage[] = [
  {
    id: 4,
    title: "City Lights",
    description: "Urban landscape capturing the vibrant nightlife and architecture",
    thumbnail: "https://images.unsplash.com/photo-1445964047600-cdbdb873673d?w=400&q=80",
    fullSize: "https://images.unsplash.com/photo-1445964047600-cdbdb873673d?w=1600&q=90",
    categories: ["Urban", "Night", "Architecture"],
    location: "Tokyo",
    width: 600,
    height: 400,
    metadata: {
      dateTaken: "2024-02-28",
      camera: "Sony A7R V",
      settings: {
        aperture: "f/4",
        shutterSpeed: "1/15",
        iso: 800,
        focalLength: "35mm"
      },
      photographer: "David Jenner",
      copyright: "© 2024 David Jenner"
    }
  },
  // Add more urban images here...
];