## Custom Images Directory

This directory is for storing your personal images. Follow these guidelines for adding images:

1. Image Organization:
   - Place images in appropriate subdirectories based on category
   - Use descriptive filenames (e.g., "sunset-mountain-alps.jpg")
   - Keep original images in "originals" directory
   - Processed versions will be stored in "processed" directory

2. Directory Structure:
   ```
   custom/
   ├── originals/          # Original, full-size images
   │   ├── landscapes/
   │   ├── portraits/
   │   ├── nature/
   │   └── urban/
   └── processed/          # Processed versions (thumbnails, optimized)
       ├── landscapes/
       ├── portraits/
       ├── nature/
       └── urban/
   ```

3. Image Requirements:
   - Supported formats: JPG, PNG, WebP
   - Recommended sizes:
     - Full size: max 1600px width
     - Thumbnails: 400px width
   - Include metadata in image properties when possible

4. Adding New Images:
   1. Place original image in appropriate category folder under "originals"
   2. Add image information to the corresponding collection file
   3. Process image for web use (resize, optimize)
   4. Place processed versions in "processed" directory