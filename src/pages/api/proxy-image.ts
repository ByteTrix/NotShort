// A proxy for external images to avoid CORS issues with profile pictures

import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request }) => {
  try {
    // Get the URL from the query parameters
    const url = new URL(request.url);
    const imageUrl = url.searchParams.get('url');

    if (!imageUrl) {
      return new Response('Missing image URL parameter', { status: 400 });
    }

    // Decode the URL (it may be encoded when passed as a query parameter)
    const decodedImageUrl = decodeURIComponent(imageUrl);
    
    // Fetch the image
    const imageResponse = await fetch(decodedImageUrl);
    
    if (!imageResponse.ok) {
      return new Response(`Failed to fetch image: ${imageResponse.statusText}`, { 
        status: imageResponse.status 
      });
    }

    // Get the image data and content type
    const imageData = await imageResponse.arrayBuffer();
    const contentType = imageResponse.headers.get('content-type') || 'image/jpeg';

    // Return the image with appropriate headers
    return new Response(imageData, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400', // Cache for 1 day
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    console.error('Image proxy error:', error);
    return new Response(`Internal server error: ${error.message}`, { status: 500 });
  }
};
