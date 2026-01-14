import { Link } from 'react-router';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import logo from '@/assets/swe_logo.png';

export default function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4 flex items-center">
              <div className="bg-black rounded-full w-16 h-16 flex items-center justify-center overflow-hidden p-2 shadow-md ring-1 ring-neutral-200/10">
                <img src={logo} alt="SweArts" className="h-full w-full object-contain" />
              </div>
              <span className="ml-4 text-2xl font-serif font-bold text-neutral-900">
                SweArts
              </span>
            </div>
            <p className="text-neutral-600 mb-6 max-w-md">
              Discover unique handcrafted artworks from talented artists around the world.
              Premium art prints, canvas art, and decorative pieces for your space.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-neutral-200 hover:bg-neutral-300 rounded-full transition-colors">
                <Instagram className="w-5 h-5 text-neutral-700" />
              </a>
              <a href="#" className="p-2 bg-neutral-200 hover:bg-neutral-300 rounded-full transition-colors">
                <Facebook className="w-5 h-5 text-neutral-700" />
              </a>
              <a href="#" className="p-2 bg-neutral-200 hover:bg-neutral-300 rounded-full transition-colors">
                <Twitter className="w-5 h-5 text-neutral-700" />
              </a>
              <a href="#" className="p-2 bg-neutral-200 hover:bg-neutral-300 rounded-full transition-colors">
                <Mail className="w-5 h-5 text-neutral-700" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-neutral-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/artists" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  Artists
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-semibold text-neutral-900 mb-4">Customer Care</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/contact" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-600 text-sm">
              © 2024 SweArts. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-neutral-600 hover:text-neutral-900 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-neutral-600 hover:text-neutral-900 text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
