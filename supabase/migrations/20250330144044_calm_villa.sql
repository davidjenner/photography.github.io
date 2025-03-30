/*
  # Add Instagram Integration Fields

  1. Changes
    - Add Instagram-specific fields to images table
    - Add Instagram metadata support
    - Ensure backward compatibility

  2. Security
    - Maintain existing RLS policies
    - No changes to security model
*/

ALTER TABLE images
ADD COLUMN IF NOT EXISTS instagram_id text,
ADD COLUMN IF NOT EXISTS instagram_url text,
ADD CONSTRAINT images_instagram_id_key UNIQUE (instagram_id);

COMMENT ON COLUMN images.instagram_id IS 'Instagram media ID for imported photos';
COMMENT ON COLUMN images.instagram_url IS 'Original Instagram media URL';