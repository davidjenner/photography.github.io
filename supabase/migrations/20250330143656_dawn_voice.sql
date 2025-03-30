/*
  # Create Initial Admin User

  1. Changes
    - Insert or update admin user in auth.users table
    - Create corresponding profile entry
    - Email: david.a.jenner@gmail.com
    - Full Name: Gallery Admin

  2. Security
    - Uses secure password hashing
    - Creates profile with proper foreign key relationship
    - Handles existing email gracefully
*/

-- Create admin user with a known UUID
DO $$
DECLARE
  admin_uuid UUID;
BEGIN
  -- First, try to get the existing user's UUID
  SELECT id INTO admin_uuid
  FROM auth.users
  WHERE email = 'david.a.jenner@gmail.com';

  -- If no user exists, generate a new UUID
  IF admin_uuid IS NULL THEN
    admin_uuid := '00000000-0000-0000-0000-000000000001';
    
    -- Insert the admin user into auth.users
    INSERT INTO auth.users (
      id,
      instance_id,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      email_change,
      email_change_token_new,
      recovery_token
    ) VALUES (
      admin_uuid,
      '00000000-0000-0000-0000-000000000000',
      'david.a.jenner@gmail.com',
      crypt('OldPort35!?', gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}',
      '{"full_name":"Gallery Admin"}',
      now(),
      now(),
      '',
      '',
      '',
      ''
    );
  END IF;

  -- Insert or update the admin profile
  INSERT INTO profiles (id, email, full_name)
  VALUES (
    admin_uuid,
    'david.a.jenner@gmail.com',
    'Gallery Admin'
  )
  ON CONFLICT (id) DO UPDATE
  SET 
    email = EXCLUDED.email,
    full_name = EXCLUDED.full_name,
    updated_at = now();
END $$;