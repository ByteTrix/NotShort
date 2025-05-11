import type { APIRoute } from 'astro';
import {
  getRandomElement,
  adjectives,
  silly_nouns,
  places,
  animals,
  verbs,
  funny_phrases,
  absurd_comparisons,
  humorousTemplates,
  urlOpenerJokeTemplates,
  animeDialogues,
  animeCharacters
} from '../../lib/longifyWordBanks';
import { createSupabaseServerClient } from '../../lib/supabaseClient';



// Generate an unnecessarily long, humorous, meaningful sentence slug
function generateLongSlug(): string {
  const initialAdjective = getRandomElement(adjectives);
  const initialSillyNoun = getRandomElement(silly_nouns);
  const generatedSentences: string[] = [];

  const placeholderMap: Record<string, string[]> = {
    "{adj}": adjectives,
    "{adj2}": adjectives, // Using the same adjectives bank for {adj2}
    "{silly_noun}": silly_nouns,
    "{place}": places,
    "{animal}": animals,
    "{verb}": verbs,
    "{funny_phrase}": funny_phrases,
    "{absurd_comparison}": absurd_comparisons,
    "{anime_dialogue}": animeDialogues,
    "{anime_char}": animeCharacters,
  };

  // Helper function to fill placeholders in a template
  const fillTemplate = (template: string): string => {
    let filledTemplate = template;
    const placeholdersInTemplate = [...new Set(filledTemplate.match(/{\w+}/g) || [])];
    for (const placeholder of placeholdersInTemplate) {
      const wordBank = placeholderMap[placeholder];
      if (wordBank && wordBank.length > 0) {
        const regex = new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
        filledTemplate = filledTemplate.replace(regex, () => getRandomElement(wordBank));
      }
    }
    return filledTemplate;
  };

  // 1. Opener Joke
  if (urlOpenerJokeTemplates && urlOpenerJokeTemplates.length > 0) {
    const openerTemplate = getRandomElement(urlOpenerJokeTemplates);
    generatedSentences.push(fillTemplate(openerTemplate));
  } else {
    // Fallback if urlOpenerJokeTemplates is empty, though it shouldn't be
    generatedSentences.push(fillTemplate(getRandomElement(humorousTemplates)));
  }

  // 2. Additional Humorous Sentences
  // Loop a significant number of times (e.g., 6-11 iterations)
  const additionalSentencesCount = 11 + Math.floor(Math.random() * 4); // Results in 11 to 14 iterations

  for (let i = 0; i < additionalSentencesCount; i++) {
    const currentTemplate = getRandomElement(humorousTemplates);
    generatedSentences.push(fillTemplate(currentTemplate));
  }

  let combinedText = initialAdjective + " " + initialSillyNoun + " " + generatedSentences.join(' ');

  // Slugify the final combined string:
  // 1. Convert to lowercase
  let slug = combinedText.toLowerCase();

  // 2. Remove specific punctuation (e.g., ?, ', ,, .) before hyphenation.
  // Includes common apostrophes and quotation marks.
  slug = slug.replace(/[?',.’"]/g, '');

  // 3. Replace spaces with a single hyphen
  slug = slug.replace(/\s+/g, '-');
  
  // 4. Remove any character that is not a letter (a-z), number (0-9), or hyphen (-)
  slug = slug.replace(/[^a-z0-9-]/g, '');
  
  // 5. Replace sequences of hyphens with a single hyphen
  slug = slug.replace(/-+/g, '-');
  
  // 6. Trim leading/trailing hyphens (e.g., if a sentence started/ended with punctuation)
  slug = slug.replace(/^-+|-+$/g, '');

  return slug;
}

export const POST: APIRoute = async ({ request, cookies }) => {
  const supabase = createSupabaseServerClient(cookies);
  try {
    // Get and authenticate the user more securely using getUser() instead of getSession()
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.error('Error authenticating user in /api/longify:', userError);
      return new Response(JSON.stringify({ error: 'Authentication error.' }), { status: 500 });
    }
    
    // Require authentication - only logged in users can create links
    if (!user) {
      return new Response(
        JSON.stringify({
          error: 'Authentication required. Please log in to create links.'
        }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Parse the incoming JSON request
    const { url, title, isPublic = true } = await request.json();
    
    if (!url) {
      return new Response(
        JSON.stringify({
          error: 'URL is required'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Validate URL format
    try {
      new URL(url);
    } catch (e) {
      return new Response(
        JSON.stringify({
          error: 'Invalid URL format'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Check if this original URL already exists for the current user
    console.log('[API] Checking for existing URL for this user:', url);
    const { data: existingUserLinks } = await supabase
      .from('links')
      .select('*')
      .eq('original', url)
      .eq('user_id', user.id);
      
    // Get the first link if multiple exist
    const existingUserLink = existingUserLinks && existingUserLinks.length > 0 ? existingUserLinks[0] : null;
      
    console.log('[API] Existing user link check result:', { 
      existingUserLink: existingUserLink ? { ...existingUserLink, user_id: '(removed for privacy)' } : null,
      totalUserLinks: existingUserLinks?.length || 0
    });
      
    // If the current user has already created a long URL for this original URL
    if (existingUserLink) {
      console.log('[API] Found duplicate URL for this user:', url);
      const siteUrl = import.meta.env.SITE;
      const existingLongUrl = `${siteUrl}/${existingUserLink.slug}`;
      
      return new Response(
        JSON.stringify({
          original: url,
          long: existingLongUrl,
          slug: existingUserLink.slug,
          id: existingUserLink.id,
          isDuplicate: true,
          message: `You have already longified this URL. We're showing you your existing long URL.`
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Check if this URL exists for other users (for informational purposes)
    const { count } = await supabase
      .from('links')
      .select('*', { count: 'exact', head: true })
      .eq('original', url)
      .neq('user_id', user.id); // Exclude the current user
      
    // Make sure we have a valid count (not null)
    const otherUsersCount = count ?? 0;
      
    // Generate a new long slug for this user
    const slug = generateLongSlug();
    // Already checked authentication at the start, so we know user exists
    
    // Prepare the link data
    const linkData = {
      slug,
      original: url,
      created_at: new Date().toISOString(),
      title: title || null,
      is_public: isPublic,
      user_id: user.id // Always add user_id since we require authentication
    };
    
    // Store the URL mapping in Supabase
    const { data, error } = await supabase
      .from('links')
      .insert([linkData])
      .select();
    
    if (error) {
      console.error('Error storing URL in /api/longify:', error);
      return new Response(
        JSON.stringify({
          error: 'Failed to create long URL'
        }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Generate the long URL
    const longUrl = `${import.meta.env.SITE }/${slug}`;
    
    // Return the longified URL with additional stats
    return new Response(
      JSON.stringify({
        original: url,
        long: longUrl,
        slug,
        id: data?.[0]?.id,
        otherUsersCount: otherUsersCount,
        message: otherUsersCount > 0 ? 
          `Your longified URL has been created! ${otherUsersCount} other user(s) have also longified this URL.` : 
          `You're the first to longify this URL!`
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
    
  } catch (err) {
    console.error('Error processing request:', err);
    return new Response(
      JSON.stringify({
        error: 'Internal server error'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
