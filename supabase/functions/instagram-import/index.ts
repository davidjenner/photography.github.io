import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'npm:@supabase/supabase-js@2.39.7';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  try {
    const { media } = await req.json();
    
    // Process each media item
    const processedMedia = await Promise.all(media.map(async (item: any) => {
      // Download and process image
      const response = await fetch(item.media_url);
      const imageBlob = await response.blob();
      
      // Upload to Supabase Storage
      const fileName = `instagram/${item.id}.jpg`;
      const { data: uploadData, error: uploadError } = await supabaseClient
        .storage
        .from('gallery')
        .upload(fileName, imageBlob);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabaseClient
        .storage
        .from('gallery')
        .getPublicUrl(fileName);

      // Insert into images table
      const { error: dbError } = await supabaseClient
        .from('images')
        .insert({
          title: item.caption || 'Instagram Import',
          description: item.caption,
          thumbnail_url: publicUrl,
          full_size_url: publicUrl,
          categories: item.categories || ['Instagram'],
          location: '',
          width: 1080, // Instagram default
          height: 1080,
          instagram_id: item.id,
          instagram_url: item.media_url,
          metadata: {
            dateTaken: item.timestamp,
            source: 'Instagram'
          }
        });

      if (dbError) throw dbError;

      return { id: item.id, status: 'success' };
    }));

    return new Response(
      JSON.stringify({ success: true, processed: processedMedia }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});