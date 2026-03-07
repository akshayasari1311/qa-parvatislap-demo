/**
 * Base64 Image Utility
 * 
 * For images under 20KB, we store base64 encoded versions to reduce HTTP requests.
 * The base64 strings are stored in .txt files alongside the original images.
 * 
 * Usage:
 * import { getBase64Image, Base64Image } from '@/lib/base64Images';
 * 
 * // In component:
 * <Base64Image src={getBase64Image('Trek/SarPass')} alt="Sar Pass Trek" />
 * 
 * // Or directly:
 * <img src={base64Images.sarPass} alt="Sar Pass" />
 */

/**
 * Pre-loaded base64 image data
 * These are inlined to avoid additional HTTP requests
 * Only images under 20KB should be added here
 */
export const base64Images = {
  // Trek images (small thumbnails)
  sarPass: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCADIAMgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD6pooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//Z",
  
  grahan: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCADIAMgDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD6pooooAKKKKACiiigAooooAKKKKACiiigD//Z",

  // Logo variants
  logoText2: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
} as const;

/**
 * Type for available base64 image keys
 */
export type Base64ImageKey = keyof typeof base64Images;

/**
 * Get base64 image data URL by key
 * @param key - The image key (e.g., 'sarPass', 'grahan')
 * @returns The base64 data URL string
 */
export function getBase64Image(key: Base64ImageKey): string {
  return base64Images[key];
}

/**
 * Check if an image key exists in base64 collection
 * @param key - The image key to check
 * @returns boolean
 */
export function hasBase64Image(key: string): key is Base64ImageKey {
  return key in base64Images;
}

/**
 * Get image source - returns base64 if available, otherwise returns path
 * @param imagePath - Path like "/images/Trek/parvatis-lap-hostel-villa-himalayas-kasol-sar-pass-trek-biskeri-thach-snow-slide-high-altitude.jpg"
 * @param base64Key - Optional base64 key to use instead
 * @returns The image source (base64 data URL or original path)
 */
export function getOptimizedImageSrc(
  imagePath: string,
  base64Key?: Base64ImageKey
): string {
  if (base64Key && hasBase64Image(base64Key)) {
    return base64Images[base64Key];
  }
  return imagePath;
}

/**
 * Mapping of file paths to base64 keys for automatic resolution
 */
export const pathToBase64Map: Record<string, Base64ImageKey> = {
  "/images/Trek/parvatis-lap-hostel-villa-himalayas-kasol-sar-pass-trek-biskeri-thach-snow-slide-high-altitude.jpg": "sarPass",
  "/images/Trek/grahan-village-trek.jpeg": "grahan",
  "/images/Trek/grahan-village-trek.jpg": "grahan",
  "/images/Trek/parvatis-lap-hostel-villa-himalayas-kasol-grahan-village-trek-forest-trail-himachali-culture.jpg": "grahan",
  "/images/Trek/parvatis-lap-hostel-villa-himalayas-kasol-grahan-village-trek-forest-trail-himachali-culture.jpeg": "grahan",
  "/images/Parvati's Lap - Luxury Hostel & Villa - logo-text2.png": "logoText2",
};

/**
 * Automatically get optimized image source
 * Checks if path has a base64 version and returns it, otherwise returns original path
 * @param imagePath - The original image path
 * @returns Optimized image source
 */
export function autoOptimizeImageSrc(imagePath: string): string {
  const base64Key = pathToBase64Map[imagePath];
  if (base64Key) {
    return base64Images[base64Key];
  }
  return imagePath;
}


