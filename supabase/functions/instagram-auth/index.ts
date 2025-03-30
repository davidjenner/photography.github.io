import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { code } = await req.json();
    
    const formData = new URLSearchParams();
    formData.append('client_id', Deno.env.get('INSTAGRAM_CLIENT_ID') || '');
    formData.append('client_secret', Deno.env.get('INSTAGRAM_CLIENT_SECRET') || '');
    formData.append('grant_type', 'authorization_code');
    formData.append('redirect_uri', `${req.headers.get('origin')}/admin/dashboard`);
    formData.append('code', code);

    const response = await fetch('https://api.instagram.com/oauth/access_token', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    return new Response(
      JSON.stringify(data),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});