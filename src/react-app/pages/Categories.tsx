import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import Navbar from '@/react-app/components/Navbar';
import Footer from '@/react-app/components/Footer';
import CategoryCard from '@/react-app/components/CategoryCard';
import { CATEGORIES } from '@/shared/types';
import { motion } from 'framer-motion';

interface CategoryStats {
  category: string;
  count: number;
}

export default function Categories() {
  const [categoryStats, setCategoryStats] = useState<CategoryStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/categories/stats');
        const data = await response.json();
        setCategoryStats(data);
      } catch (error) {
        console.error('Error fetching category stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const categoryImages: Record<string, string> = {
    WallArt: 'https://images.unsplash.com/photo-1549289524-06cf8837ace5?w=800',
    TexturedArt: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800',
    LippanArt: 'https://images.unsplash.com/photo-1582201957340-85d3c2b95a1f?w=800',
    HandmadeDecor: 'https://images.unsplash.com/photo-1582053433926-0b6b5e6c4e8d?w=800',
    ArtPrint: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800',
    CanvasArt: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800',
    MixedMedia: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800',
    AbstractArt: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800',
    DecorArt: 'https://images.unsplash.com/photo-1578301978162-7aae4d755744?w=800'
  };

  const getCategoryCount = (category: string) => {
    const stat = categoryStats.find(s => s.category === category);
    return stat?.count || 0;
  };

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
            <h1 className="text-5xl md:text-6xl font-serif font-bold text-neutral-900 mb-6">
              Browse by Category
            </h1>
            <p className="text-lg md:text-xl text-neutral-600">
              Explore our curated collections spanning multiple art styles and mediums. 
              From contemporary wall art to traditional crafts, find the perfect piece for your space.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-neutral-200 rounded-lg aspect-square" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((category, index) => (
              <CategoryCard
                key={category}
                name={category}
                image={categoryImages[category]}
                count={getCategoryCount(category)}
                index={index}
              />
            ))}
          </div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 bg-neutral-900 rounded-2xl p-8 md:p-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-neutral-300 max-w-2xl mx-auto mb-8">
            Browse our complete collection or contact us for custom commission requests.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              className="px-8 py-3 bg-white text-neutral-900 rounded-md font-medium hover:bg-neutral-100 transition-colors"
            >
              View All Artworks
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 border border-white text-white rounded-md font-medium hover:bg-white/10 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
