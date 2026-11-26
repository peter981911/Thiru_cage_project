import { useMemo, useState } from 'react';
import {
  Search,
  ShoppingBag,
  Send,
  Eye,
  Check,
  Ruler,
  Sparkles,
  X,
} from 'lucide-react';
import { CAGE_CATEGORIES, READY_MADE_CAGES } from '../data/cages';
import { buildWhatsAppUrl } from '../data/storeConfig';

const Catalog = ({ cartItems, onAddToCart, onSelectCage }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCages = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return READY_MADE_CAGES.filter((cage) => {
      const matchesCategory =
        selectedCategory === 'All' || cage.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!query) return true;

      const haystack = [
        cage.name,
        cage.sku,
        cage.category,
        cage.sizeLabel,
        cage.description,
        ...cage.suitableFor,
        ...cage.features,
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(query);
    });
  }, [selectedCategory, searchQuery]);

  const getItemQuantity = (id) => {
    const found = cartItems.find((item) => item.id === id);
    return found ? found.quantity : 0;
  };

  const handleQuickWhatsApp = (e, cage) => {
    e.stopPropagation();
    const msg = `Hi Thiru Cages! I'm interested in this ready-made wooden cage:\n\n*Model:* ${cage.name} (${cage.sku})\n*Size:* ${cage.sizeLabel}\n*Suitable For:* ${cage.suitableFor.join(', ')}\n\nPlease share the current price and availability.`;
    window.open(buildWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="catalog" className="section catalog-section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Active Workshop Inventory</span>
          <h2 className="section-title">Ready-Made Wooden Cages</h2>
          <p className="section-subtitle">
            Browse our handcrafted wood-based cages ready for pickup or delivery.
            Add models to your Inquiry Bag or inquire directly on WhatsApp for pricing.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="catalog-controls">
          <div className="category-tabs" role="tablist" aria-label="Cage categories">
            {CAGE_CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={selectedCategory === category}
                className={`category-pill ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="catalog-search-box">
            <Search size={18} className="search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search bird (Budgies, Cockatiel, Lovebirds) or model..."
              aria-label="Search ready-made cages"
            />
            {searchQuery && (
              <button
                type="button"
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="catalog-meta">
          <span>
            Showing <strong>{filteredCages.length}</strong> of {READY_MADE_CAGES.length} wooden models
          </span>
          <a href="#customizer" className="custom-size-link">
            Need another dimension? Custom Build →
          </a>
        </div>

        {/* Product Grid */}
        {filteredCages.length === 0 ? (
          <div className="catalog-empty">
            <p>No ready-made cages matched &ldquo;{searchQuery}&rdquo;.</p>
            <div className="catalog-empty-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </button>
              <a href="#customizer" className="btn-primary">
                Request Custom Cage
              </a>
            </div>
          </div>
        ) : (
          <div className="product-grid">
            {filteredCages.map((cage) => {
              const qtyInBag = getItemQuantity(cage.id);
              return (
                <article
                  key={cage.id}
                  className="product-card"
                  onClick={() => onSelectCage(cage)}
                >
                  <div className="product-image-wrap">
                    <img
                      src={cage.image}
                      alt={cage.name}
                      loading="lazy"
                      className="product-image"
                    />
                    <span className="product-badge">{cage.badge}</span>
                    <span className="product-sku">{cage.sku}</span>
                    <button
                      type="button"
                      className="quick-view-pill"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCage(cage);
                      }}
                    >
                      <Eye size={15} /> Quick View
                    </button>
                  </div>

                  <div className="product-body">
                    <div className="product-category-row">
                      <span>{cage.category}</span>
                      <span className="product-size">
                        <Ruler size={13} /> {cage.sizeLabel}
                      </span>
                    </div>

                    <h3 className="product-title">{cage.name}</h3>
                    <p className="product-desc">{cage.description}</p>

                    <div className="bird-tags">
                      {cage.suitableFor.map((bird) => (
                        <span key={bird} className="bird-tag">
                          {bird}
                        </span>
                      ))}
                    </div>

                    <div className="product-price-note">
                      <span>Direct Workshop Price</span>
                      <small>Custom sizes also available</small>
                    </div>

                    <div className="product-actions">
                      <button
                        type="button"
                        className={`btn-add-bag ${qtyInBag > 0 ? 'in-bag' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(cage, 1);
                        }}
                      >
                        {qtyInBag > 0 ? (
                          <>
                            <Check size={16} /> In Bag ({qtyInBag})
                          </>
                        ) : (
                          <>
                            <ShoppingBag size={16} /> Add to Bag
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        className="btn-whatsapp-sm"
                        onClick={(e) => handleQuickWhatsApp(e, cage)}
                        title="Ask price & order on WhatsApp"
                      >
                        <Send size={15} /> WhatsApp
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Custom Size Callout Banner */}
        <div className="custom-banner">
          <div className="custom-banner-text">
            <span className="banner-kicker">
              <Sparkles size={15} /> Made to Measure
            </span>
            <h3>Want a custom size, extra breeding compartments, or nest boxes?</h3>
            <p>
              Every Thiru Cages build is crafted in wood to match your bird species, colony size,
              and balcony or indoor space.
            </p>
          </div>
          <a href="#customizer" className="btn-primary">
            Customize Your Cage <Sparkles size={18} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Catalog;
