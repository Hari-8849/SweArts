import { useEffect, useState } from 'react';
import Navbar from '@/react-app/components/Navbar';
import Footer from '@/react-app/components/Footer';
import Hero from '@/react-app/components/Hero';
import ArtworkCard from '@/react-app/components/ArtworkCard';
import CategoryCard from '@/react-app/components/CategoryCard';
import { Artwork, CATEGORIES } from '@/shared/types';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { MOCK_ARTWORKS } from '@/react-app/data/mockArtworks';

export default function Home() {
  const [featuredArtworks, setFeaturedArtworks] = useState<Artwork[]>([]);
  const [trendingArtworks, setTrendingArtworks] = useState<Artwork[]>([]);
  const [bestsellerArtworks, setBestsellerArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        // Simulating loading for a smooth experience
        await new Promise(resolve => setTimeout(resolve, 600));

        // Use local mock data
        const featured = MOCK_ARTWORKS.filter(a => a.is_featured === 1).slice(0, 4);
        const trending = MOCK_ARTWORKS.filter(a => a.is_trending === 1).slice(0, 6);
        const bestseller = MOCK_ARTWORKS.filter(a => a.is_bestseller === 1).slice(0, 4);

        setFeaturedArtworks(featured);
        setTrendingArtworks(trending);
        setBestsellerArtworks(bestseller);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  // Category images mapping
  const categoryImages: Record<string, string> = {
    WallArt: 'https://images.unsplash.com/photo-1549289524-06cf8837ace5?w=600',
    TexturedArt: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600',
    LippanArt: 'https://images.unsplash.com/photo-1582201957340-85d3c2b95a1f?w=600',
    HandmadeDecor: 'https://images.unsplash.com/photo-1582053433926-0b6b5e6c4e8d?w=600',
    ArtPrint: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=600',
    CanvasArt: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=600',
    MixedMedia: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600',
    AbstractArt: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600',
    DecorArt: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=600'
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />

      {/* Featured Collection */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900">
              Featured Collection
            </h2>
            <p className="text-neutral-600 mt-2">
              Handpicked masterpieces from our curators
            </p>
          </div>
          <Link
            to="/shop?featured=1"
            className="hidden md:flex items-center text-neutral-900 font-medium hover:text-neutral-700 transition-colors group"
          >
            View All
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-neutral-200 rounded-lg aspect-[3/4]" />
                <div className="mt-3 space-y-2">
                  <div className="h-4 bg-neutral-200 rounded w-3/4" />
                  <div className="h-3 bg-neutral-200 rounded w-1/2" />
                  <div className="h-4 bg-neutral-200 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredArtworks.map((artwork, index) => (
              <ArtworkCard key={artwork.id} artwork={artwork} index={index} />
            ))}
          </div>
        )}
      </section>

      {/* Categories */}
      <section className="bg-neutral-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900">
              Explore by Category
            </h2>
            <p className="text-neutral-600 mt-2 max-w-2xl mx-auto">
              From wall art to handmade decor, discover artworks that match your style
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {CATEGORIES.slice(0, 8).map((category, index) => (
              <CategoryCard
                key={category}
                name={category}
                image={categoryImages[category]}
                count={Math.floor(Math.random() * 50) + 10}
                index={index}
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/categories" className="btn-secondary inline-flex items-center">
              View All Categories
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Now */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900">
              Trending Now
            </h2>
            <p className="text-neutral-600 mt-2">
              What's popular this week
            </p>
          </div>
          <Link
            to="/shop?trending=1"
            className="hidden md:flex items-center text-neutral-900 font-medium hover:text-neutral-700 transition-colors group"
          >
            View All
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-neutral-200 rounded-lg aspect-[3/4]" />
                <div className="mt-3 space-y-2">
                  <div className="h-4 bg-neutral-200 rounded w-3/4" />
                  <div className="h-3 bg-neutral-200 rounded w-1/2" />
                  <div className="h-4 bg-neutral-200 rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingArtworks.map((artwork, index) => (
              <ArtworkCard key={artwork.id} artwork={artwork} index={index} />
            ))}
          </div>
        )}
      </section>

      {/* Bestsellers */}
      <section className="bg-gradient-to-br from-amber-50 via-rose-50 to-neutral-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-neutral-900">
              Customer Favorites
            </h2>
            <p className="text-neutral-600 mt-2 max-w-2xl mx-auto">
              Most loved artworks by our community
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-neutral-200 rounded-lg aspect-[3/4]" />
                  <div className="mt-3 space-y-2">
                    <div className="h-4 bg-neutral-200 rounded w-3/4" />
                    <div className="h-3 bg-neutral-200 rounded w-1/2" />
                    <div className="h-4 bg-neutral-200 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestsellerArtworks.map((artwork, index) => (
                <ArtworkCard key={artwork.id} artwork={artwork} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-neutral-900 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            Stay Inspired
          </h2>
          <p className="text-neutral-300 max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter for exclusive collections, artist spotlights,
            and special offers delivered to your inbox.
          </p>
          <form className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md border border-neutral-700 bg-neutral-800 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            <button type="submit" className="px-6 py-3 bg-amber-500 text-white rounded-md font-medium hover:bg-amber-600 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
