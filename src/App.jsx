import { useEffect, useState } from 'react';
import { Bird, MessageCircle, MapPin, Phone, Mail } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Catalog from './components/Catalog';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import Customizer from './components/Customizer';
import CraftsmanshipSection from './components/CraftsmanshipSection';
import ContactSection from './components/ContactSection';
import { STORE_INFO, buildWhatsAppUrl } from './data/storeConfig';
import './App.css';

const CART_STORAGE_KEY = 'thiru_cages_inquiry_bag_v1';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedCage, setSelectedCage] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Ignore storage quota or private mode issues
    }
  }, [cartItems]);

  const showToast = (msg) => {
    setToastMessage(msg);
    window.clearTimeout(window.__thiruToastTimer);
    window.__thiruToastTimer = window.setTimeout(() => {
      setToastMessage('');
    }, 2800);
  };

  const handleAddToCart = (cage, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === cage.id);
      if (existing) {
        return prev.map((item) =>
          item.id === cage.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...cage, quantity }];
    });
    showToast(`Added "${cage.name}" to your Inquiry Bag`);
  };

  const handleUpdateQuantity = (id, nextQty) => {
    if (nextQty <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: nextQty } : item))
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const shareContent = async ({ title, text }) => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch {
        // User cancelled or share failed; fall back to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(`${text} ${url}`);
      showToast('Website link copied! Share it with fellow bird lovers.');
    } catch {
      showToast('Copy the URL from your browser bar to share.');
    }
  };

  const handleShareSite = () => {
    shareContent({
      title: 'Thiru Cages Coimbatore | Handcrafted Wooden Bird Cages',
      text: 'Check out these handcrafted wooden bird cages from Thiru Cages in Coimbatore:',
    });
  };

  const handleShareCage = (cage) => {
    shareContent({
      title: `${cage.name} | Thiru Cages Coimbatore`,
      text: `Check out the ${cage.name} (${cage.sizeLabel}) from Thiru Cages Coimbatore:`,
    });
  };

  const totalBagItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app">
      <Navbar
        isScrolled={isScrolled}
        cartCount={totalBagItems}
        onOpenCart={() => setIsCartOpen(true)}
        onShareSite={handleShareSite}
      />

      <main>
        <Hero />
        <Catalog
          cartItems={cartItems}
          onAddToCart={handleAddToCart}
          onSelectCage={setSelectedCage}
        />
        <Customizer />
        <CraftsmanshipSection onShareSite={handleShareSite} />
        <ContactSection />
      </main>

      <footer className="footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <Bird size={24} className="logo-icon" />
              <span>Thiru Cages</span>
            </div>
            <p>
              Handcrafted 100% wood-based bird cages &amp; custom aviaries made with care in
              Coimbatore, Tamil Nadu.
            </p>
          </div>

          <div className="footer-links">
            <h4>Explore</h4>
            <ul>
              <li><a href="#catalog">Ready-Made Cages</a></li>
              <li><a href="#customizer">Custom Cage Builder</a></li>
              <li><a href="#craftsmanship">Why Choose Wood</a></li>
              <li><a href="#visit-us">Visit Workshop</a></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4>Contact</h4>
            <p><MapPin size={15} /> {STORE_INFO.addressShort}</p>
            <p><Phone size={15} /> {STORE_INFO.phoneDisplay}</p>
            <p><Mail size={15} /> {STORE_INFO.email}</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {STORE_INFO.name} Coimbatore. Crafted with care.</p>
        </div>
      </footer>

      {/* Floating WhatsApp Quick Action */}
      <a
        href={buildWhatsAppUrl('Hi Thiru Cages! I want to inquire about a wooden bird cage.')}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp"
        aria-label="Chat with Thiru Cages on WhatsApp"
      >
        <MessageCircle size={24} />
        <span>WhatsApp</span>
      </a>

      <ProductModal
        cage={selectedCage}
        onClose={() => setSelectedCage(null)}
        onAddToCart={handleAddToCart}
        onShareCage={handleShareCage}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {toastMessage && (
        <div className="toast-banner" role="status" aria-live="polite">
          {toastMessage}
        </div>
      )}
    </div>
  );
}

export default App;
