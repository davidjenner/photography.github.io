/**
 * Core Types for Gallery Management
 * 
 * This file contains all the TypeScript interfaces and types used throughout the gallery application.
 * It serves as a single source of truth for data structures and helps maintain consistency.
 */

/**
 * Represents a single image in the gallery
 * @property id - Unique identifier for the image
 * @property title - Display title of the image
 * @property description - Detailed description of the image
 * @property thumbnail - URL for the smaller, optimized version (recommended: 400px width)
 * @property fullSize - URL for the high-resolution version (recommended: 1600px width)
 * @property categories - Array of categories this image belongs to
 * @property location - Where the photo was taken
 * @property width - Original width of the image in pixels
 * @property height - Original height of the image in pixels
 * @property metadata - Optional additional information about the image
 */
export interface GalleryImage {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  fullSize: string;
  categories: string[];
  location: string;
  width: number;
  height: number;
  metadata?: ImageMetadata;
}

/**
 * Optional metadata for additional image information
 * @property dateTaken - When the photo was taken
 * @property camera - Camera equipment used
 * @property settings - Camera settings used for the shot
 * @property photographer - Name of the photographer
 * @property copyright - Copyright information
 */
export interface ImageMetadata {
  dateTaken?: string;
  camera?: string;
  settings?: CameraSettings;
  photographer?: string;
  copyright?: string;
}

/**
 * Camera settings used for the photo
 * @property aperture - F-stop value (e.g., "f/2.8")
 * @property shutterSpeed - Shutter speed (e.g., "1/1000")
 * @property iso - ISO value (e.g., 100)
 * @property focalLength - Focal length in mm (e.g., "50mm")
 */
export interface CameraSettings {
  aperture?: string;
  shutterSpeed?: string;
  iso?: number;
  focalLength?: string;
}