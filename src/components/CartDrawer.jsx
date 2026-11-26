import { useEffect, useState } from 'react';
import { X, Trash2, Plus, Minus, Send, Mail, ShoppingBag } from 'lucide-react';
import { buildMailtoUrl, buildWhatsAppUrl } from '../data/storeConfig';

const CartDrawer = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerCity, setCustomerCity] = useState('');
  const [customerNote, setCustomerNote] = useState('');

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);

  const buildOrderMessage = () => {
    const lines = items.map(
      (item, idx) =>
        `${idx + 1}. ${item.name} (${item.sku}) — Qty: ${item.quantity} [${item.sizeLabel}]`
    );

    const parts = [
      'Hi Thiru Cages! I would like price & availability for these wooden cages:',
      '',
      ...lines,
    ];

    if (customerName.trim()) parts.push('', `Name: ${customerName.trim()}`);
    if (customerCity.trim()) parts.push(`Location/City: ${customerCity.trim()}`);
    if (customerNote.trim()) parts.push(`Notes: ${customerNote.trim()}`);

    return parts.join('\n');
  };

  const handleSendWhatsApp = () => {
    window.open(buildWhatsAppUrl(buildOrderMessage()), '_blank', 'noopener,noreferrer');
  };

  const handleSendEmail = () => {
    window.location.href = buildMailtoUrl(
      `Thiru Cages Order Inquiry (${totalQty} item${totalQty > 1 ? 's' : ''})`,
      buildOrderMessage()
    );
  };

  return (
    <div className="drawer-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label="Inquiry Bag">
      <aside className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="drawer-header">
          <div className="drawer-title">
            <ShoppingBag size={20} />
            <h3>Your Inquiry Bag ({totalQty})</h3>
          </div>
          <button type="button" className="drawer-close-btn" onClick={onClose} aria-label="Close inquiry bag">
            <X size={22} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="drawer-empty">
            <ShoppingBag size={44} className="empty-bag-icon" />
            <h4>Your Inquiry Bag is empty</h4>
            <p>
              Select any ready-made wooden cage from the catalog to shortlist models
              and request pricing or delivery in one WhatsApp message.
            </p>
            <a href="#catalog" className="btn-primary" onClick={onClose}>
              Explore Wooden Cages
            </a>
          </div>
        ) : (
          <>
            <div className="drawer-items">
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <span className="cart-item-sku">{item.sku} • {item.sizeLabel}</span>
                    <h4>{item.name}</h4>
                    <div className="cart-item-controls">
                      <div className="qty-stepper small">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          <Minus size={14} />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        type="button"
                        className="remove-item-btn"
                        onClick={() => onRemoveItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="drawer-footer">
              <div className="drawer-customer-fields">
                <input
                  type="text"
                  className="form-control compact"
                  placeholder="Your Name (optional)"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
                <input
                  type="text"
                  className="form-control compact"
                  placeholder="Your City / Area (e.g. Coimbatore, Erode)"
                  value={customerCity}
                  onChange={(e) => setCustomerCity(e.target.value)}
                />
                <textarea
                  className="form-control compact"
                  placeholder="Any size tweak or delivery note..."
                  rows={2}
                  value={customerNote}
                  onChange={(e) => setCustomerNote(e.target.value)}
                />
              </div>

              <div className="drawer-cta-stack">
                <button type="button" className="btn-primary full-width" onClick={handleSendWhatsApp}>
                  <Send size={18} /> Send Inquiry via WhatsApp
                </button>
                <div className="drawer-secondary-row">
                  <button type="button" className="btn-secondary" onClick={handleSendEmail}>
                    <Mail size={16} /> Email Inquiry
                  </button>
                  <button type="button" className="btn-text-danger" onClick={onClearCart}>
                    Clear Bag
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
};

export default CartDrawer;
