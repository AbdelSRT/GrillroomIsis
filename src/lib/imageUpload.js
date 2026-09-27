import { supabase, isSupabaseConfigured } from './supabaseClient';

const BUCKET = 'dish-images';

/**
 * Upload een afbeeldingsbestand naar Supabase Storage.
 * @param {File} file - Het afbeeldingsbestand
 * @param {string} [prefix] - Optionele prefix voor de bestandsnaam (bijv. dish slug)
 * @returns {Promise<{url: string|null, error: string|null}>}
 */
export const uploadDishImage = async (file, prefix = '') => {
  if (!isSupabaseConfigured() || !supabase) {
    return { url: null, error: 'Supabase is niet geconfigureerd. Upload niet mogelijk.' };
  }

  if (!file || !file.type.startsWith('image/')) {
    return { url: null, error: 'Selecteer een geldig afbeeldingsbestand (JPG, PNG, WebP).' };
  }

  // Max 5MB
  if (file.size > 5 * 1024 * 1024) {
    return { url: null, error: 'Afbeelding is te groot. Maximaal 5MB toegestaan.' };
  }

  try {
    // Generate unique filename
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const safeName = prefix
      ? prefix.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')
      : 'dish';
    const fileName = `${safeName}-${Date.now()}.${ext}`;
    const filePath = `dishes/${fileName}`;

    const { data, error } = await supabase.storage
      .from(BUCKET)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type
      });

    if (error) {
      console.error('Image upload error:', error);
      return { url: null, error: `Upload mislukt: ${error.message}` };
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(data.path);

    return { url: urlData.publicUrl, error: null };
  } catch (err) {
    console.error('Image upload exception:', err);
    return { url: null, error: 'Onverwachte fout bij uploaden. Probeer opnieuw.' };
  }
};

/**
 * Verwijder een afbeelding uit Supabase Storage.
 * @param {string} imageUrl - De volledige publieke URL van de afbeelding
 */
export const deleteDishImage = async (imageUrl) => {
  if (!isSupabaseConfigured() || !supabase || !imageUrl) return;

  try {
    // Extract path from full URL
    const bucketUrl = `/storage/v1/object/public/${BUCKET}/`;
    const idx = imageUrl.indexOf(bucketUrl);
    if (idx === -1) return; // Not a Storage URL

    const filePath = imageUrl.substring(idx + bucketUrl.length);
    await supabase.storage.from(BUCKET).remove([filePath]);
  } catch (err) {
    console.warn('Image delete error:', err);
  }
};

/**
 * Check of een URL een Supabase Storage URL is (vs een externe URL).
 */
export const isStorageUrl = (url) => {
  return url && url.includes('/storage/v1/object/public/dish-images/');
};
