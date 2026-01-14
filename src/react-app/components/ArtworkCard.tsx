import { Link } from 'react-router';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWishlist } from '@/react-app/hooks/useWishlist';
import type { Artwork } from '@/shared/types';

interface ArtworkCardProps {
  artwork: Artwork;
  index?: number;
}

export default function ArtworkCard({ artwork, index = 0 }: ArtworkCardProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist, items } = useWishlist();
  const inWishlist = isInWishlist(artwork.id);

  const handleWishlistClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      const wishlistItem = items.find(item => item.artwork_id === artwork.id);
      if (wishlistItem) {
        await removeFromWishlist(wishlistItem.id);
      }
    } else {
      await addToWishlist(artwork.id);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative"
    >
      <Link to={`/artwork/${artwork.id}`} className="block">
        <div className="relative overflow-hidden rounded-lg bg-neutral-100 aspect-[3/4]">
          <img
            src={artwork.image_url}
            alt={artwork.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <p className="text-sm opacity-90">{artwork.artist_name || 'Artist'}</p>
            </div>
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistClick}
            className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-rose-500 text-rose-500' : 'text-neutral-700'}`} />
          </button>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {artwork.is_featured === 1 && (
              <span className="px-2 py-1 bg-amber-500 text-white text-xs font-medium rounded">
                Featured
              </span>
            )}
            {artwork.is_trending === 1 && (
              <span className="px-2 py-1 bg-rose-500 text-white text-xs font-medium rounded">
                Trending
              </span>
            )}
            {artwork.is_bestseller === 1 && (
              <span className="px-2 py-1 bg-emerald-500 text-white text-xs font-medium rounded">
                Bestseller
              </span>
            )}
          </div>
        </div>

        <div className="mt-3">
          <h3 className="font-medium text-neutral-900 group-hover:text-neutral-700 transition-colors">
            {artwork.title}
          </h3>
          <p className="text-sm text-neutral-500 mt-1">{artwork.category}</p>
          <p className="text-lg font-semibold text-neutral-900 mt-2">
            ${artwork.price.toFixed(2)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
