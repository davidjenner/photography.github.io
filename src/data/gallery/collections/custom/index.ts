/**
 * Custom Photography Collection
 * 
 * This file manages your personal photo collection.
 * Add your images to the appropriate directories and update this file
 * with the image information.
 */

import { GalleryImage } from '../../../types/gallery';

// Import category-specific collections
import { customLandscapes } from './landscapes';
import { customPortraits } from './portraits';
import { customNature } from './nature';
import { customUrban } from './urban';

// Combine all custom collections
export const customImages: GalleryImage[] = [
  ...customLandscapes,
  ...customPortraits,
  ...customNature,
  ...customUrban,
];