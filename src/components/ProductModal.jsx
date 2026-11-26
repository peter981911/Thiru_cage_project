import { useEffect, useState } from 'react';
import { X, Check, ShoppingBag, Send, Ruler, Share2, Plus, Minus } from 'lucide-react';
import { buildWhatsAppUrl } from '../data/storeConfig';

const ProductModal = ({ cage, onClose, onAddToCart, onShareCage }) => {
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [cage?.id]);

  useEffect(() => {
    if (!cage) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [cage, onClose]);

  if (!cage) return null;

  const handleOrderWhatsApp = () => {
    const msg = `Hi Thiru Cages! I want to order / inquire about:\n\n*Model:* ${cage.name} (${cage.sku})\n*Quantity:* ${quantity}\n*Size Category:* ${cage.sizeLabel}\n*Suitable For:* ${cage.suitableFor.join(', ')}\n\nPlease share pricing, availability, and delivery details.`;
    window.open(buildWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-cage-title">
      <div className="product-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="modal-close-btn" onClick={onClose} aria-label="Close product details">
          <X size={22} />
        </button>

        <div className="modal-grid">
          <div className="modal-image-col">
            <img src={cage.image} alt={cage.name} />
            <span className="product-badge">{cage.badge}</span>
          </div>

          <div className="modal-info-col">
            <div className="modal-meta-top">
              <span className="modal-sku">{cage.sku}</span>
              <span className="modal-category">{cage.category}</span>
            </div>

            <h2 id="modal-cage-title">{cage.name}</h2>

            <div className="modal-size-pill">
              <Ruler size={16} />
              <span>{cage.sizeLabel} • 100% Wood-Based Frame</span>
            </div>

            <p className="modal-description">{cage.description}</p>

            <div className="modal-section">
              <h4>Ideal For</h4>
              <div className="bird-tags">
                {cage.suitableFor.map((bird) => (
                  <span key={bird} className="bird-tag">
                    {bird}
                  </span>
                ))}
              </div>
            </div>

            <div className="modal-section">
              <h4>Included Craftsmanship Features</h4>
              <ul className="modal-features">
                {cage.features.map((feat) => (
                  <li key={feat}>
                    <Check size={16} className="feat-check" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="modal-quantity-row">
              <span>Quantity:</span>
              <div className="qty-stepper">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>
                <span>{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="btn-primary"
                onClick={handleOrderWhatsApp}
              >
                <Send size={18} /> Order / Ask Price on WhatsApp
              </button>

              <div className="modal-secondary-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    onAddToCart(cage, quantity);
                    onClose();
                  }}
                >
                  <ShoppingBag size={18} /> Add to Inquiry Bag
                </button>

                <button
                  type="button"
                  className="btn-icon-outline"
                  onClick={() => onShareCage(cage)}
                  title="Share this cage"
                  aria-label="Share this cage"
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
