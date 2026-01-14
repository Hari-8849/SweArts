import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import Navbar from '@/react-app/components/Navbar';
import Footer from '@/react-app/components/Footer';
import ArtworkCard from '@/react-app/components/ArtworkCard';
import { Artwork, CATEGORIES } from '@/shared/types';
import { SlidersHorizontal } from 'lucide-react';
import { MOCK_ARTWORKS } from '@/react-app/data/mockArtworks';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const selectedCategory = searchParams.get('category') || '';
  const sortBy = searchParams.get('sort') || 'newest';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const orientation = searchParams.get('orientation') || '';

  useEffect(() => {
    const fetchArtworks = async () => {
      setLoading(true);
      try {
        // Simulating loading time
        await new Promise(resolve => setTimeout(resolve, 500));

        let data = [...MOCK_ARTWORKS];

        // Apply filters locally
        if (selectedCategory) {
          data = data.filter((a: Artwork) => a.category === selectedCategory);
        }
        if (minPrice) {
          data = data.filter((a: Artwork) => a.price >= parseFloat(minPrice));
        }
        if (maxPrice) {
          data = data.filter((a: Artwork) => a.price <= parseFloat(maxPrice));
        }
        if (orientation) {
          data = data.filter((a: Artwork) => a.orientation === orientation);
        }

        // Sort
        if (sortBy === 'price-low') {
          data.sort((a: Artwork, b: Artwork) => a.price - b.price);
        } else if (sortBy === 'price-high') {
          data.sort((a: Artwork, b: Artwork) => b.price - a.price);
        } else if (sortBy === 'popular') {
          data.sort((a: Artwork, b: Artwork) => (b.is_featured + b.is_trending) - (a.is_featured + a.is_trending));
        } else if (sortBy === 'newest') {
          data.sort((a: Artwork, b: Artwork) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        }

        setArtworks(data);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, [selectedCategory, sortBy, minPrice, maxPrice, orientation]);

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  const hasFilters = selectedCategory || minPrice || maxPrice || orientation;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-neutral-900 mb-2">
            Shop All Artworks
          </h1>
          <p className="text-neutral-600">
            {artworks.length} artworks available
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex items-center justify-between">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-neutral-300 rounded-md hover:bg-neutral-50"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-neutral-600 hover:text-neutral-900"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Filters Sidebar */}
          <aside className={`
            lg:block lg:w-64 flex-shrink-0
            ${showFilters ? 'block' : 'hidden'}
          `}>
            <div className="sticky top-24 space-y-6 bg-neutral-50 p-6 rounded-lg">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-neutral-900">Filters</h2>
                {hasFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-sm text-neutral-600 hover:text-neutral-900"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="font-medium text-neutral-900 mb-3">Category</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={!selectedCategory}
                      onChange={() => updateFilter('category', '')}
                      className="w-4 h-4 text-neutral-900"
                    />
                    <span className="text-sm text-neutral-700">All Categories</span>
                  </label>
                  {CATEGORIES.map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat}
                        onChange={() => updateFilter('category', cat)}
                        className="w-4 h-4 text-neutral-900"
                      />
                      <span className="text-sm text-neutral-700">
                        {cat.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="font-medium text-neutral-900 mb-3">Price Range</h3>
                <div className="space-y-3">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => updateFilter('minPrice', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => updateFilter('maxPrice', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-md text-sm"
                  />
                </div>
              </div>

              {/* Orientation */}
              <div>
                <h3 className="font-medium text-neutral-900 mb-3">Orientation</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="orientation"
                      checked={!orientation}
                      onChange={() => updateFilter('orientation', '')}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-neutral-700">All</span>
                  </label>
                  {['Portrait', 'Landscape', 'Square'].map((orient) => (
                    <label key={orient} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="orientation"
                        checked={orientation === orient}
                        onChange={() => updateFilter('orientation', orient)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-neutral-700">{orient}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Sort */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-neutral-600">
                Showing {artworks.length} results
              </p>
              <select
                value={sortBy}
                onChange={(e) => updateFilter('sort', e.target.value)}
                className="px-4 py-2 border border-neutral-300 rounded-md text-sm"
              >
                <option value="newest">Newest</option>
                <option value="popular">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {/* Artworks Grid */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(9)].map((_, i) => (
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
            ) : artworks.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-neutral-600 mb-4">No artworks found matching your filters.</p>
                <button
                  onClick={clearFilters}
                  className="btn-secondary inline-flex items-center"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {artworks.map((artwork, index) => (
                  <ArtworkCard key={artwork.id} artwork={artwork} index={index} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
