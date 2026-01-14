import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import Navbar from '@/react-app/components/Navbar';
import Footer from '@/react-app/components/Footer';
import ArtworkCard from '@/react-app/components/ArtworkCard';
import { Artwork } from '@/shared/types';
import { Heart, ShoppingCart, ZoomIn, Truck, Shield, ArrowLeft, Play, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/react-app/hooks/useCart';
import { useWishlist } from '@/react-app/hooks/useWishlist';

export default function ArtworkDetail() {
  const { id } = useParams();
  const [artwork, setArtwork] = useState<Artwork | null>(null);
  const [relatedArtworks, setRelatedArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [showZoom, setShowZoom] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist, items } = useWishlist();
  
  const artworkId = id ? parseInt(id) : 0;
  const inWishlist = isInWishlist(artworkId);

  const handleAddToCart = async () => {
    if (!artwork) return;
    setAddingToCart(true);
    try {
      await addToCart(artwork.id, selectedSize);
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setAddingToCart(false);
    }
  };

  const handleWishlistToggle = async () => {
    if (!artwork) return;
    if (inWishlist) {
      const wishlistItem = items.find(item => item.artwork_id === artwork.id);
      if (wishlistItem) {
        await removeFromWishlist(wishlistItem.id);
      }
    } else {
      await addToWishlist(artwork.id);
    }
  };

  useEffect(() => {
    const fetchArtwork = async () => {
      setLoading(true);
      try {
        const [artworkRes, relatedRes] = await Promise.all([
          fetch(`/api/artworks/${id}`),
          fetch(`/api/artworks/${id}/related`)
        ]);

        const artworkData = await artworkRes.json();
        const relatedData = await relatedRes.json();

        setArtwork(artworkData);
        setRelatedArtworks(relatedData);
        
        // Default to video if available
        if (artworkData.video_url) {
          setMediaType('video');
        }
      } catch (error) {
        console.error('Error fetching artwork:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArtwork();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-neutral-200 rounded-lg aspect-square" />
            <div className="space-y-6">
              <div className="h-8 bg-neutral-200 rounded w-3/4" />
              <div className="h-6 bg-neutral-200 rounded w-1/2" />
              <div className="h-24 bg-neutral-200 rounded" />
              <div className="h-12 bg-neutral-200 rounded w-1/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="text-neutral-600">Artwork not found</p>
        </div>
      </div>
    );
  }

  const sizes = [
    { name: 'Small', dimensions: '12" x 16"', price: artwork.price },
    { name: 'Medium', dimensions: '18" x 24"', price: artwork.price * 1.5 },
    { name: 'Large', dimensions: '24" x 32"', price: artwork.price * 2 },
    { name: 'Extra Large', dimensions: '36" x 48"', price: artwork.price * 3 }
  ];

  const selectedSizeData = sizes.find(s => s.name === selectedSize);
  const hasVideo = !!artwork.video_url;

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
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Media Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative bg-neutral-100 rounded-lg overflow-hidden aspect-square">
              {mediaType === 'image' ? (
                <>
                  <img
                    src={artwork.image_url}
                    alt={artwork.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => setShowZoom(true)}
                    className="absolute bottom-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                  >
                    <ZoomIn className="w-5 h-5 text-neutral-900" />
                  </button>
                </>
              ) : artwork.video_url ? (
                <video
                  src={artwork.video_url}
                  controls
                  className="w-full h-full object-cover"
                  poster={artwork.image_url}
                >
                  Your browser does not support the video tag.
                </video>
              ) : null}
            </div>

            {/* Media Switcher */}
            {hasVideo && (
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setMediaType('image')}
                  className={`flex-1 p-3 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                    mediaType === 'image'
                      ? 'border-neutral-900 bg-neutral-50'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <ImageIcon className="w-4 h-4" />
                  <span className="font-medium">Image</span>
                </button>
                <button
                  onClick={() => setMediaType('video')}
                  className={`flex-1 p-3 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
                    mediaType === 'video'
                      ? 'border-neutral-900 bg-neutral-50'
                      : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <Play className="w-4 h-4" />
                  <span className="font-medium">Video</span>
                </button>
              </div>
            )}

            {/* Thumbnail Preview */}
            {hasVideo && (
              <div className="grid grid-cols-2 gap-3 mt-3">
                <button
                  onClick={() => setMediaType('image')}
                  className={`relative rounded-lg overflow-hidden aspect-square border-2 transition-all ${
                    mediaType === 'image' ? 'border-neutral-900' : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <img
                    src={artwork.image_url}
                    alt="Image preview"
                    className="w-full h-full object-cover"
                  />
                </button>
                <button
                  onClick={() => setMediaType('video')}
                  className={`relative rounded-lg overflow-hidden aspect-square border-2 transition-all ${
                    mediaType === 'video' ? 'border-neutral-900' : 'border-neutral-200 hover:border-neutral-300'
                  }`}
                >
                  <img
                    src={artwork.image_url}
                    alt="Video preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Play className="w-8 h-8 text-white fill-white" />
                  </div>
                </button>
              </div>
            )}
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-3">
              {artwork.is_featured === 1 && (
                <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded">
                  Featured
                </span>
              )}
              {artwork.is_trending === 1 && (
                <span className="px-2 py-1 bg-rose-100 text-rose-800 text-xs font-medium rounded">
                  Trending
                </span>
              )}
              {artwork.is_bestseller === 1 && (
                <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded">
                  Bestseller
                </span>
              )}
            </div>

            <h1 className="text-4xl font-serif font-bold text-neutral-900 mb-2">
              {artwork.title}
            </h1>

            <Link
              to={`/artists/${artwork.artist_id}`}
              className="text-lg text-neutral-600 hover:text-neutral-900 mb-4 inline-block"
            >
              by {artwork.artist_name}
            </Link>

            <p className="text-3xl font-bold text-neutral-900 mb-6">
              ${selectedSizeData?.price.toFixed(2)}
            </p>

            {artwork.description && (
              <p className="text-neutral-700 mb-8 leading-relaxed">
                {artwork.description}
              </p>
            )}

            {/* Size Selection */}
            <div className="mb-8">
              <h3 className="font-semibold text-neutral-900 mb-3">Select Size</h3>
              <div className="grid grid-cols-2 gap-3">
                {sizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(size.name)}
                    className={`
                      p-4 border-2 rounded-lg text-left transition-all
                      ${selectedSize === size.name
                        ? 'border-neutral-900 bg-neutral-50'
                        : 'border-neutral-200 hover:border-neutral-300'
                      }
                    `}
                  >
                    <p className="font-medium text-neutral-900">{size.name}</p>
                    <p className="text-sm text-neutral-600">{size.dimensions}</p>
                    <p className="text-sm font-semibold text-neutral-900 mt-1">
                      ${size.price.toFixed(2)}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <button 
                onClick={handleAddToCart}
                disabled={addingToCart}
                className="flex-1 btn-primary inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {addingToCart ? 'Adding...' : 'Add to Cart'}
              </button>
              <button 
                onClick={handleWishlistToggle}
                className="p-3 border border-neutral-300 rounded-md hover:bg-neutral-50 transition-colors"
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-rose-500 text-rose-500' : 'text-neutral-700'}`} />
              </button>
            </div>

            {/* Info */}
            <div className="space-y-4 pt-8 border-t border-neutral-200">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-neutral-600 mt-0.5" />
                <div>
                  <p className="font-medium text-neutral-900">Free Shipping</p>
                  <p className="text-sm text-neutral-600">On orders over $200</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-neutral-600 mt-0.5" />
                <div>
                  <p className="font-medium text-neutral-900">Authenticity Guarantee</p>
                  <p className="text-sm text-neutral-600">All artworks are verified originals</p>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="mt-8 pt-8 border-t border-neutral-200">
              <h3 className="font-semibold text-neutral-900 mb-4">Details</h3>
              <dl className="space-y-2">
                <div className="flex">
                  <dt className="text-neutral-600 w-32">Category:</dt>
                  <dd className="text-neutral-900 font-medium">
                    {artwork.category.replace(/([A-Z])/g, ' $1').trim()}
                  </dd>
                </div>
                {artwork.orientation && (
                  <div className="flex">
                    <dt className="text-neutral-600 w-32">Orientation:</dt>
                    <dd className="text-neutral-900">{artwork.orientation}</dd>
                  </div>
                )}
                {artwork.width && artwork.height && (
                  <div className="flex">
                    <dt className="text-neutral-600 w-32">Dimensions:</dt>
                    <dd className="text-neutral-900">{artwork.width}" × {artwork.height}"</dd>
                  </div>
                )}
                {hasVideo && (
                  <div className="flex">
                    <dt className="text-neutral-600 w-32">Media:</dt>
                    <dd className="text-neutral-900">Image & Video available</dd>
                  </div>
                )}
              </dl>
            </div>
          </motion.div>
        </div>

        {/* Related Artworks */}
        {relatedArtworks.length > 0 && (
          <section className="mt-20">
            <h2 className="text-3xl font-serif font-bold text-neutral-900 mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedArtworks.map((related, index) => (
                <ArtworkCard key={related.id} artwork={related} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Lightbox */}
      {showZoom && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setShowZoom(false)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-neutral-300"
            onClick={() => setShowZoom(false)}
          >
            <ZoomIn className="w-6 h-6" />
          </button>
          <img
            src={artwork.image_url}
            alt={artwork.title}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}

      <Footer />
    </div>
  );
}
