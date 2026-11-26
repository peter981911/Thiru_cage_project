import { useEffect, useState } from 'react';
import { Bird, ShoppingBag, Share2, Menu, X } from 'lucide-react';
import { STORE_INFO } from '../data/storeConfig';

const NAV_LINKS = [
  { href: '#catalog', label: 'Ready-Made Cages' },
  { href: '#customizer', label: 'Custom Design' },
  { href: '#craftsmanship', label: 'Why Wood' },
  { href: '#visit-us', label: 'Visit Us' },
];

const Navbar = ({ isScrolled, cartCount, onOpenCart, onShareSite }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1060) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container nav-content">
        <a href="#top" className="logo" aria-label={STORE_INFO.name}>
          <Bird size={26} className="logo-icon" />
          <span>Thiru</span> Cages
        </a>

        <ul className="nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button
            type="button"
            className="btn-icon-outline"
            onClick={onShareSite}
            title="Share Thiru Cages website"
            aria-label="Share website"
          >
            <Share2 size={18} />
            <span className="hide-mobile">Share</span>
          </button>

          <button
            type="button"
            className="btn-bag"
            onClick={onOpenCart}
            aria-label={`Open inquiry bag with ${cartCount} items`}
          >
            <ShoppingBag size={18} />
            <span className="hide-mobile">Inquiry Bag</span>
            {cartCount > 0 && <span className="bag-badge">{cartCount}</span>}
          </button>

          <button
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="mobile-nav-drawer">
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={handleNavClick}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
