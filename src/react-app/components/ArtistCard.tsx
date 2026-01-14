import { Link } from 'react-router';
import { motion } from 'framer-motion';
import type { Artist } from '@/shared/types';

interface ArtistCardProps {
  artist: Artist;
  artworkCount?: number;
  index?: number;
}

export default function ArtistCard({ artist, artworkCount = 0, index = 0 }: ArtistCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link
        to={`/artists/${artist.id}`}
        className="group block bg-white rounded-lg overflow-hidden border border-neutral-200 hover:border-neutral-300 transition-all hover:shadow-lg"
      >
        <div className="relative overflow-hidden aspect-square bg-neutral-100">
          {artist.profile_image_url ? (
            <img
              src={artist.profile_image_url}
              alt={artist.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-100 to-rose-100">
              <span className="text-6xl font-serif font-bold text-neutral-400">
                {artist.name.charAt(0)}
              </span>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-serif font-semibold text-neutral-900 mb-2 group-hover:text-neutral-700 transition-colors">
            {artist.name}
          </h3>
          {artist.bio && (
            <p className="text-sm text-neutral-600 line-clamp-2 mb-3">
              {artist.bio}
            </p>
          )}
          <p className="text-sm text-neutral-500">
            {artworkCount} {artworkCount === 1 ? 'artwork' : 'artworks'}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
