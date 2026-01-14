import { BrowserRouter as Router, Routes, Route } from "react-router";
import { CartProvider } from "@/react-app/hooks/useCart";
import { WishlistProvider } from "@/react-app/hooks/useWishlist";
import HomePage from "@/react-app/pages/Home";
import Shop from "@/react-app/pages/Shop";
import ArtworkDetail from "@/react-app/pages/ArtworkDetail";
import Categories from "@/react-app/pages/Categories";
import Artists from "@/react-app/pages/Artists";
import ArtistDetail from "@/react-app/pages/ArtistDetail";
import About from "@/react-app/pages/About";
import Cart from "@/react-app/pages/Cart";
import Wishlist from "@/react-app/pages/Wishlist";

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/artwork/:id" element={<ArtworkDetail />} />
            <Route path="/category/:category" element={<Shop />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/artists/:id" element={<ArtistDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}
