import { useEffect, useState } from 'react';
import Navbar from '@/react-app/components/Navbar';
import Footer from '@/react-app/components/Footer';
import ArtistCard from '@/react-app/components/ArtistCard';
import { Artist } from '@/shared/types';
import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';
import { MOCK_ARTISTS } from '@/react-app/data/mockArtists';
import { MOCK_ARTWORKS } from '@/react-app/data/mockArtworks';

interface ArtistWithCount extends Artist {
  artwork_count?: number;
}

export default function Artists() {
  const [artists, setArtists] = useState<ArtistWithCount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use local mock data instead of API fetch
    const fetchArtists = async () => {
      try {
        // Simulating some loading time for realistic feel
        await new Promise(resolve => setTimeout(resolve, 500));

        // Calculate artwork counts from local mock artworks
        const artistsWithCounts = MOCK_ARTISTS.map(artist => ({
          ...artist,
          artwork_count: MOCK_ARTWORKS.filter(a => a.artist_id === artist.id).length
        }));

        setArtists(artistsWithCounts);
      } catch (error) {
        console.error('Error fetching artists:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-neutral-50 via-amber-50/30 to-rose-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-amber-100 rounded-full">
                <Palette className="w-8 h-8 text-amber-600" />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-neutral-900 mb-6">
              Meet Our Artists
            </h1>
            <p className="text-lg md:text-xl text-neutral-600">
              Discover the talented creators behind our curated collection.
              Each artist brings their unique vision and craftsmanship to create exceptional pieces.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Artists Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-neutral-200 rounded-lg aspect-square" />
                <div className="mt-4 space-y-2">
                  <div className="h-5 bg-neutral-200 rounded w-3/4" />
                  <div className="h-4 bg-neutral-200 rounded w-full" />
                  <div className="h-4 bg-neutral-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : artists.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-600">No artists found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {artists.map((artist, index) => (
              <ArtistCard
                key={artist.id}
                artist={artist}
                artworkCount={artist.artwork_count || 0}
                index={index}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
