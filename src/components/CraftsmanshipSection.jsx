import { Trees, Grid, Sparkles, HeartHandshake, Star, Share2 } from 'lucide-react';
import { STORE_INFO } from '../data/storeConfig';

const PILLARS = [
  {
    icon: Trees,
    title: '100% Wood-Based Frames',
    description:
      'Every cage is handcrafted from sturdy seasoned wood—naturally cooler, warmer in winter, and comfortable for birds compared to bare metal.',
  },
  {
    icon: Grid,
    title: 'Safe, Fine Wire Mesh',
    description:
      'Precision-fitted galvanized wire mesh keeps finches, budgies, lovebirds, and parrots safely enclosed with crisp ventilation and clear viewing.',
  },
  {
    icon: Sparkles,
    title: 'Easy-Clean Slide Trays',
    description:
      'Most ready-made and custom cages come with smooth handle-equipped bottom trays so daily cleaning takes under a minute.',
  },
  {
    icon: HeartHandshake,
    title: 'Made for Breeders & Homes',
    description:
      'From compact balcony houses to 12-compartment breeding racks with clay pots or nest boxes, we tailor every build to your flock.',
  },
];

const CraftsmanshipSection = ({ onShareSite }) => {
  return (
    <section id="craftsmanship" className="section craftsmanship-section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Why Choose Thiru Cages</span>
          <h2 className="section-title">Built with Care for Every Flock</h2>
          <p className="section-subtitle">
            Trusted by bird lovers and breeders across Coimbatore and Tamil Nadu for durable
            wooden cages that look great in your home.
          </p>
        </div>

        <div className="pillars-grid">
          {PILLARS.map(({ icon: Icon, title, description }) => (
            <div key={title} className="pillar-card">
              <div className="pillar-icon-wrap">
                <Icon size={24} />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>

        <div className="reputation-banner">
          <div className="reputation-left">
            <div className="stars-row" aria-label="5 out of 5 stars">
              {[1, 2, 3, 4, 5].map((n) => (
                <Star key={n} size={20} fill="currentColor" />
              ))}
              <span>{STORE_INFO.rating} Google Rating ({STORE_INFO.reviewCount} Reviews)</span>
            </div>
            <h3>Know someone looking for quality wooden bird cages?</h3>
            <p>
              Help spread the word about Thiru Cages Coimbatore—share our ready-made catalog
              with fellow bird owners and breeders.
            </p>
          </div>
          <div className="reputation-actions">
            <button type="button" className="btn-primary" onClick={onShareSite}>
              <Share2 size={18} /> Share This Website
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CraftsmanshipSection;
