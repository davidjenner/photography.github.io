/**
 * Gallery Data Management
 * 
 * This file serves as the central data store for all gallery images.
 * Images are organized in separate files by collection/category for better maintainability.
 * 
 * Structure:
 * /data/gallery/
 *   ├── index.ts           - Main entry point, combines all collections
 *   ├── collections/       - Collection-specific image data
 *   │   ├── portraits.ts   - Portrait photography
 *   │   ├── landscapes.ts  - Landscape photography
 *   │   ├── nature.ts      - Nature photography
 *   │   ├── urban.ts       - Urban photography
 *   │   └── custom/        - Your personal collections
 *   │       ├── index.ts   - Combines all custom collections
 *   │       ├── portraits.ts
 *   │       ├── landscapes.ts
 *   │       ├── nature.ts
 *   │       └── urban.ts
 */

import { GalleryImage } from '../types/gallery';
import { portraits } from './collections/portraits';
import { landscapes } from './collections/landscapes';
import { nature } from './collections/nature';
import { urban } from './collections/urban';
import { customImages } from './collections/custom';

// Combine all collections into a single array
export const galleryItems: GalleryImage[] = [
  ...portraits,
  ...landscapes,
  ...nature,
  ...urban,
  ...customImages,
];