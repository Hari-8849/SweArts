import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import Navbar from '@/react-app/components/Navbar';
import Footer from '@/react-app/components/Footer';
import ArtworkCard from '@/react-app/components/ArtworkCard';
import { Artist, Artwork } from '@/shared/types';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar } from 'lucide-react';

export default function ArtistDetail() {
  const { id } = useParams();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtist = async () => {
      setLoading(true);
      try {
        const [artistRes, artworksRes] = await Promise.all([
          fetch(`/api/artists/${id}`),
          fetch(`/api/artists/${id}/artworks`)
        ]);

        const artistData = await artistRes.json();
        const artworksData = await artworksRes.json();

        setArtist(artistData);
        setArtworks(artworksData);
      } catch (error) {
        console.error('Error fetching artist:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArtist();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-64 bg-neutral-200 rounded-lg mb-8" />
            <div className="h-8 bg-neutral-200 rounded w-1/2 mb-4" />
            <div className="h-24 bg-neutral-200 rounded mb-8" />
          </div>
        </div>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-neutral-600">Artist not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          to="/artists"
          className="inline-flex items-center text-neutral-600 hover:text-neutral-900 mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Artists
        </Link>

        {/* Artist Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-neutral-50 to-amber-50/30 rounded-2xl p-8 md:p-12 mb-12"
        >
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              {artist.profile_image_url ? (
                <img
                  src={artist.profile_image_url}
                  alt={artist.name}
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-amber-200 to-rose-200 flex items-center justify-center border-4 border-white shadow-lg">
                  <span className="text-5xl font-serif font-bold text-neutral-600">
                    {artist.name.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Artist Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-neutral-900 mb-4">
                {artist.name}
              </h1>
              
              {artist.bio && (
                <p className="text-lg text-neutral-700 mb-6 leading-relaxed max-w-3xl">
                  {artist.bio}
                </p>
              )}

              <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-neutral-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Member since {new Date(artist.created_at).getFullYear()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-neutral-900">
                    {artworks.length} {artworks.length === 1 ? 'Artwork' : 'Artworks'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Artworks Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-serif font-bold text-neutral-900 mb-2">
            Artworks by {artist.name}
          </h2>
          <p className="text-neutral-600">
            Explore the complete collection
          </p>
        </div>

        {artworks.length === 0 ? (
          <div className="text-center py-12 bg-neutral-50 rounded-lg">
            <p className="text-neutral-600">No artworks available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {artworks.map((artwork, index) => (
              <ArtworkCard key={artwork.id} artwork={artwork} index={index} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
