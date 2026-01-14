import { Link } from 'react-router';
import Navbar from '@/react-app/components/Navbar';
import Footer from '@/react-app/components/Footer';
import { useWishlist } from '@/react-app/hooks/useWishlist';
import { useCart } from '@/react-app/hooks/useCart';
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Wishlist() {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = async (artworkId: number) => {
    await addToCart(artworkId);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex p-6 bg-neutral-100 rounded-full mb-6">
              <Heart className="w-12 h-12 text-neutral-400" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-neutral-900 mb-4">
              Your Wishlist is Empty
            </h1>
            <p className="text-neutral-600 mb-8">
              Save your favorite artworks here to view them later.
            </p>
            <Link to="/shop" className="btn-primary inline-flex items-center">
              Browse Artworks
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link
          to="/shop"
          className="inline-flex items-center text-neutral-600 hover:text-neutral-900 mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Continue Shopping
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
          <div>
            <h1 className="text-4xl font-serif font-bold text-neutral-900">
              My Wishlist
            </h1>
            <p className="text-neutral-600 mt-1">
              {items.length} {items.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="group bg-white border border-neutral-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Image */}
              <Link
                to={`/artwork/${item.artwork_id}`}
                className="block relative overflow-hidden aspect-[3/4] bg-neutral-100"
              >
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Remove Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeFromWishlist(item.id);
                  }}
                  className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                >
                  <Trash2 className="w-4 h-4 text-rose-500" />
                </button>
              </Link>

              {/* Details */}
              <div className="p-4">
                <Link to={`/artwork/${item.artwork_id}`}>
                  <h3 className="font-semibold text-neutral-900 hover:text-neutral-700 transition-colors truncate">
                    {item.title}
                  </h3>
                </Link>
                <p className="text-sm text-neutral-600 mt-1 truncate">
                  {item.artist_name}
                </p>
                <p className="text-sm text-neutral-500 mt-1">
                  {item.category.replace(/([A-Z])/g, ' $1').trim()}
                </p>
                
                <div className="flex items-center justify-between mt-4">
                  <p className="text-lg font-semibold text-neutral-900">
                    ${item.price.toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleAddToCart(item.artwork_id)}
                    className="p-2 bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-colors"
                    title="Add to Cart"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={async () => {
              for (const item of items) {
                await addToCart(item.artwork_id);
              }
            }}
            className="btn-primary inline-flex items-center justify-center"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add All to Cart
          </button>
          <Link to="/shop" className="btn-secondary inline-flex items-center justify-center">
            Continue Shopping
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
