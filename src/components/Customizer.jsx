import { useState } from 'react';
import { Settings, PenTool, Scaling, Send, Bird, Mail, Check, Layers } from 'lucide-react';
import { buildMailtoUrl, buildWhatsAppUrl } from '../data/storeConfig';

const BIRD_PRESETS = [
  'Budgies',
  'Lovebirds',
  'Finches',
  'Cockatiels',
  'Sun Conure',
  'Ringneck Parrot',
];

const ADDON_OPTIONS = [
  'Pull-out Cleaning Tray',
  'Wooden Nest Boxes',
  'Clay Breeding Pots',
  'Climbing Ladders & Swings',
  'Center Partition Divider',
  'Lockable Castor Wheels',
];

const SIZE_LABELS = {
  compact: 'Compact Tabletop (e.g. 2 × 1.5 × 1.5 ft)',
  medium: 'Medium Standing (e.g. 2 × 2 × 3 ft)',
  duplex: 'Double-Tier / Duplex Breeding',
  colony: 'Multi-Tier Colony Rack',
  custom: 'Custom Dimensions',
};

const FINISH_LABELS = {
  'clear-varnish': 'Natural Clear Wood Varnish',
  'light-stain': 'Warm Honey Wood Stain',
  'dark-walnut': 'Rich Walnut Wood Stain',
  'yellow-trim': 'Signature Yellow Weather Trim',
  unfinished: 'Raw Unfinished Natural Wood',
};

const Customizer = () => {
  const [formData, setFormData] = useState({
    birdType: '',
    size: 'medium',
    customDimensions: '',
    color: 'clear-varnish',
    addons: ['Pull-out Cleaning Tray'],
    extras: '',
  });
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setErrorMsg('');
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleAddon = (addon) => {
    setFormData((prev) => {
      const exists = prev.addons.includes(addon);
      return {
        ...prev,
        addons: exists
          ? prev.addons.filter((item) => item !== addon)
          : [...prev.addons, addon],
      };
    });
  };

  const selectBirdPreset = (bird) => {
    setErrorMsg('');
    setFormData((prev) => ({ ...prev, birdType: bird }));
  };

  const buildCustomMessage = () => {
    const sizeText =
      formData.size === 'custom' && formData.customDimensions.trim()
        ? `Custom (${formData.customDimensions.trim()})`
        : SIZE_LABELS[formData.size];

    const addonsText = formData.addons.length > 0 ? formData.addons.join(', ') : 'Standard build';

    return [
      "Hi Thiru Cages! I'd like a quote for a custom wood-based bird cage:",
      '',
      `*Bird Species / Count:* ${formData.birdType}`,
      `*Cage Layout / Size:* ${sizeText}`,
      `*Wood Finish:* ${FINISH_LABELS[formData.color]}`,
      `*Accessories:* ${addonsText}`,
      `*Additional Notes:* ${formData.extras.trim() || 'None'}`,
    ].join('\n');
  };

  const validateAndRun = (callback) => {
    if (!formData.birdType.trim()) {
      setErrorMsg('Please enter or select your bird species first.');
      return;
    }
    callback();
  };

  const handleWhatsAppQuote = () => {
    validateAndRun(() => {
      window.open(buildWhatsAppUrl(buildCustomMessage()), '_blank', 'noopener,noreferrer');
    });
  };

  const handleEmailQuote = () => {
    validateAndRun(() => {
      window.location.href = buildMailtoUrl(
        `Custom Wooden Cage Quote - ${formData.birdType}`,
        buildCustomMessage()
      );
    });
  };

  const displaySize =
    formData.size === 'custom' && formData.customDimensions.trim()
      ? `Custom (${formData.customDimensions.trim()})`
      : SIZE_LABELS[formData.size];

  return (
    <section id="customizer" className="section customizer">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Built to Your Exact Needs</span>
          <h2 className="section-title">Design Your Custom Wooden Cage</h2>
          <p className="section-subtitle">
            Every bird and home is unique. Share your required dimensions, compartment layout,
            and wood finish—we&apos;ll craft it directly at our Coimbatore workshop.
          </p>
        </div>

        <div className="customizer-layout">
          <form className="customizer-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="birdType">Bird Species &amp; Number of Birds *</label>
              <div className="preset-chips">
                {BIRD_PRESETS.map((bird) => (
                  <button
                    key={bird}
                    type="button"
                    className={`preset-chip ${formData.birdType === bird ? 'active' : ''}`}
                    onClick={() => selectBirdPreset(bird)}
                  >
                    {bird}
                  </button>
                ))}
              </div>
              <input
                type="text"
                id="birdType"
                name="birdType"
                className="form-control"
                placeholder="e.g., 2 Pairs of Lovebirds, Cockatiel, Finches"
                value={formData.birdType}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="size">Cage Layout / Size Preference</label>
              <select
                name="size"
                id="size"
                className="form-control form-select"
                value={formData.size}
                onChange={handleChange}
              >
                {Object.entries(SIZE_LABELS).map(([val, label]) => (
                  <option key={val} value={val}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {formData.size === 'custom' && (
              <div className="form-group">
                <label htmlFor="customDimensions">Your Exact Dimensions (Width × Depth × Height)</label>
                <input
                  type="text"
                  id="customDimensions"
                  name="customDimensions"
                  className="form-control"
                  placeholder="e.g., 4 ft × 2 ft × 5 ft (or specify in inches)"
                  value={formData.customDimensions}
                  onChange={handleChange}
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="color">Wood Finish / Trim</label>
              <select
                name="color"
                id="color"
                className="form-control form-select"
                value={formData.color}
                onChange={handleChange}
              >
                {Object.entries(FINISH_LABELS).map(([val, label]) => (
                  <option key={val} value={val}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Included Wooden Add-Ons</label>
              <div className="addon-grid">
                {ADDON_OPTIONS.map((addon) => {
                  const selected = formData.addons.includes(addon);
                  return (
                    <button
                      key={addon}
                      type="button"
                      className={`addon-toggle ${selected ? 'selected' : ''}`}
                      onClick={() => toggleAddon(addon)}
                    >
                      <span className="addon-box">{selected && <Check size={13} />}</span>
                      <span>{addon}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="extras">Special Requirements / Delivery Location</label>
              <textarea
                name="extras"
                id="extras"
                className="form-control"
                placeholder="e.g., Specific door placement, extra perches, delivery city..."
                value={formData.extras}
                onChange={handleChange}
              />
            </div>

            {errorMsg && <p className="form-error">{errorMsg}</p>}

            <div className="customizer-buttons">
              <button type="button" className="btn-primary" onClick={handleWhatsAppQuote}>
                Get Custom Quote on WhatsApp <Send size={18} />
              </button>

              <button type="button" className="btn-secondary" onClick={handleEmailQuote}>
                Send via Email <Mail size={18} />
              </button>
            </div>
          </form>

          <div className="customizer-preview">
            <Settings size={44} className="preview-icon" />
            <h3>Your Custom Build Summary</h3>
            <p className="preview-subtitle">
              100% wood-based frame crafted to order in Coimbatore
            </p>

            <ul className="preview-spec-list">
              <li>
                <Bird size={19} className="spec-icon" />
                <div>
                  <small>Bird Species</small>
                  <strong>{formData.birdType || 'Not specified yet'}</strong>
                </div>
              </li>
              <li>
                <Scaling size={19} className="spec-icon" />
                <div>
                  <small>Size &amp; Layout</small>
                  <strong>{displaySize}</strong>
                </div>
              </li>
              <li>
                <PenTool size={19} className="spec-icon" />
                <div>
                  <small>Wood Finish</small>
                  <strong>{FINISH_LABELS[formData.color]}</strong>
                </div>
              </li>
              <li>
                <Layers size={19} className="spec-icon" />
                <div>
                  <small>Selected Add-Ons</small>
                  <strong>
                    {formData.addons.length > 0 ? formData.addons.join(', ') : 'None selected'}
                  </strong>
                </div>
              </li>
            </ul>

            <p className="preview-quote">
              &ldquo;Built strong, ventilated, and comfortable—just the way your birds need.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Customizer;
