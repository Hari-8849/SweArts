import { Link } from 'react-router';
import Navbar from '@/react-app/components/Navbar';
import Footer from '@/react-app/components/Footer';
import { useCart } from '@/react-app/hooks/useCart';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Cart() {
  const { items, itemCount, totalPrice, removeFromCart, updateQuantity } = useCart();

  const handleUpdateQuantity = async (itemId: number, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      await updateQuantity(itemId, newQuantity);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="inline-flex p-6 bg-neutral-100 rounded-full mb-6">
              <ShoppingBag className="w-12 h-12 text-neutral-400" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-neutral-900 mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-neutral-600 mb-8">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link to="/shop" className="btn-primary inline-flex items-center">
              Continue Shopping
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

        <h1 className="text-4xl font-serif font-bold text-neutral-900 mb-2">
          Shopping Cart
        </h1>
        <p className="text-neutral-600 mb-8">
          {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white border border-neutral-200 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-6">
                  {/* Image */}
                  <Link
                    to={`/artwork/${item.artwork_id}`}
                    className="flex-shrink-0 w-24 h-24 sm:w-32 sm:h-32 bg-neutral-100 rounded-lg overflow-hidden"
                  >
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/artwork/${item.artwork_id}`}
                      className="block"
                    >
                      <h3 className="text-lg font-semibold text-neutral-900 hover:text-neutral-700 transition-colors truncate">
                        {item.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-neutral-600 mt-1">
                      by {item.artist_name}
                    </p>
                    {item.size_option && (
                      <p className="text-sm text-neutral-500 mt-1">
                        Size: {item.size_option}
                      </p>
                    )}
                    <p className="text-sm text-neutral-500 mt-1">
                      {item.category.replace(/([A-Z])/g, ' $1').trim()}
                    </p>

                    {/* Mobile Price and Actions */}
                    <div className="mt-4 sm:hidden">
                      <p className="text-lg font-semibold text-neutral-900 mb-3">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                            className="p-1 hover:bg-neutral-100 rounded"
                          >
                            <Minus className="w-4 h-4 text-neutral-600" />
                          </button>
                          <span className="text-neutral-900 font-medium w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                            className="p-1 hover:bg-neutral-100 rounded"
                          >
                            <Plus className="w-4 h-4 text-neutral-600" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-neutral-600 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Price and Actions */}
                  <div className="hidden sm:flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-neutral-600 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    
                    <div className="text-right">
                      <p className="text-xl font-semibold text-neutral-900 mb-3">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity, -1)}
                          className="p-1 hover:bg-neutral-100 rounded"
                        >
                          <Minus className="w-4 h-4 text-neutral-600" />
                        </button>
                        <span className="text-neutral-900 font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.quantity, 1)}
                          className="p-1 hover:bg-neutral-100 rounded"
                        >
                          <Plus className="w-4 h-4 text-neutral-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-neutral-50 rounded-lg p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-neutral-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-neutral-700">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-700">
                  <span>Shipping</span>
                  <span className="text-emerald-600">Free</span>
                </div>
                <div className="flex justify-between text-neutral-700">
                  <span>Tax</span>
                  <span>${(totalPrice * 0.08).toFixed(2)}</span>
                </div>
                <div className="pt-3 border-t border-neutral-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-neutral-900">Total</span>
                    <span className="text-2xl font-bold text-neutral-900">
                      ${(totalPrice * 1.08).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button className="w-full btn-primary mb-3">
                Proceed to Checkout
              </button>
              
              <Link
                to="/shop"
                className="block text-center text-neutral-600 hover:text-neutral-900 text-sm transition-colors"
              >
                Continue Shopping
              </Link>

              <div className="mt-6 pt-6 border-t border-neutral-200">
                <p className="text-xs text-neutral-600 text-center">
                  Secure checkout powered by Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
