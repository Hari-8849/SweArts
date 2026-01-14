import { Link } from 'react-router';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-br from-neutral-50 via-amber-50/30 to-rose-50/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-neutral-900 leading-tight mb-6">
              Curated Art for
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-rose-600">
                Your Space
              </span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 mb-8 max-w-lg">
              Discover unique handcrafted artworks from talented artists around the world. 
              From abstract paintings to traditional crafts, find the perfect piece to transform your home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/shop"
                className="btn-primary inline-flex items-center justify-center group"
              >
                Explore Collection
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/categories"
                className="btn-secondary inline-flex items-center justify-center"
              >
                Browse Categories
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-neutral-200">
              <div>
                <p className="text-3xl font-bold text-neutral-900">500+</p>
                <p className="text-sm text-neutral-600 mt-1">Artworks</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-neutral-900">50+</p>
                <p className="text-sm text-neutral-600 mt-1">Artists</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-neutral-900">1000+</p>
                <p className="text-sm text-neutral-600 mt-1">Happy Customers</p>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="aspect-[3/4] rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600"
                    alt="Artwork"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1582201957340-85d3c2b95a1f?w=600"
                    alt="Artwork"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-12">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600"
                    alt="Artwork"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-[3/4] rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600"
                    alt="Artwork"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-amber-200 rounded-full blur-3xl opacity-50" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-rose-200 rounded-full blur-3xl opacity-50" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
