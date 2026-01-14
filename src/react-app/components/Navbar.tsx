import { useState } from 'react';
import { Link } from 'react-router';
import { ShoppingCart, Heart, Menu, X, Search } from 'lucide-react';
import { useCart } from '@/react-app/hooks/useCart';
import { useWishlist } from '@/react-app/hooks/useWishlist';
import logo from '@/assets/swe_logo.png';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="bg-black rounded-full w-12 h-12 flex items-center justify-center overflow-hidden p-1 shadow-sm ring-1 ring-neutral-200/10">
              <img src={logo} alt="SweArts" className="h-full w-full object-contain" />
            </div>
            <span className="ml-3 text-xl font-serif font-bold text-neutral-900">
              SweArts
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/shop" className="text-neutral-700 hover:text-neutral-900 transition-colors font-medium">
              Shop
            </Link>
            <Link to="/categories" className="text-neutral-700 hover:text-neutral-900 transition-colors font-medium">
              Categories
            </Link>
            <Link to="/artists" className="text-neutral-700 hover:text-neutral-900 transition-colors font-medium">
              Artists
            </Link>
            <Link to="/about" className="text-neutral-700 hover:text-neutral-900 transition-colors font-medium">
              About
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-neutral-100 rounded-full transition-colors">
              <Search className="w-5 h-5 text-neutral-700" />
            </button>
            <Link to="/wishlist" className="p-2 hover:bg-neutral-100 rounded-full transition-colors relative">
              <Heart className="w-5 h-5 text-neutral-700" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-neutral-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link to="/cart" className="p-2 hover:bg-neutral-100 rounded-full transition-colors relative">
              <ShoppingCart className="w-5 h-5 text-neutral-700" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-neutral-900 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-neutral-100 rounded-full transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-neutral-700" />
              ) : (
                <Menu className="w-5 h-5 text-neutral-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-200">
            <div className="flex flex-col space-y-4">
              <Link
                to="/shop"
                className="text-neutral-700 hover:text-neutral-900 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to="/categories"
                className="text-neutral-700 hover:text-neutral-900 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link
                to="/artists"
                className="text-neutral-700 hover:text-neutral-900 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Artists
              </Link>
              <Link
                to="/about"
                className="text-neutral-700 hover:text-neutral-900 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
