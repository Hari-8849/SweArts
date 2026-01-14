export interface Artist {
  id: number;
  name: string;
  bio: string | null;
  profile_image_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface Artwork {
  id: number;
  title: string;
  artist_id: number;
  artist_name?: string;
  category: string;
  description: string | null;
  image_url: string;
  video_url?: string | null;
  price: number;
  orientation: string | null;
  width: number | null;
  height: number | null;
  is_featured: number;
  is_trending: number;
  is_bestseller: number;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: number;
  session_id: string;
  artwork_id: number;
  quantity: number;
  size_option: string | null;
  artwork?: Artwork;
  created_at: string;
  updated_at: string;
}

export interface WishlistItem {
  id: number;
  session_id: string;
  artwork_id: number;
  artwork?: Artwork;
  created_at: string;
  updated_at: string;
}

export const CATEGORIES = [
  'WallArt',
  'TexturedArt',
  'LippanArt',
  'HandmadeDecor',
  'ArtPrint',
  'CanvasArt',
  'MixedMedia',
  'AbstractArt',
  'DecorArt'
] as const;

export type Category = typeof CATEGORIES[number];
