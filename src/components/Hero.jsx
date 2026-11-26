import { ArrowRight, Sparkles, Star, MapPin, ShieldCheck, Ruler, Truck } from 'lucide-react';
import { STORE_INFO } from '../data/storeConfig';

const TRUST_HIGHLIGHTS = [
  { icon: ShieldCheck, label: '100% Wood-Based Builds' },
  { icon: Ruler, label: 'Ready-Made & Custom Sizes' },
  { icon: Truck, label: 'Pickup & Local Delivery' },
  { icon: Star, label: `${STORE_INFO.rating}★ Rated in Coimbatore` },
];

const Hero = () => {
  return (
    <section id="top" className="hero">
      <div className="container">
        <div className="hero-content">
          <div className="hero-text animate-fade-in">
            <div className="hero-badge-row">
              <span className="location-pill">
                <MapPin size={14} /> Rathinapuri, Coimbatore
              </span>
              <span className="rating-pill">
                <Star size={14} fill="currentColor" /> {STORE_INFO.rating} ({STORE_INFO.reviewCount} Google Reviews)
              </span>
            </div>

            <h1>
              Handcrafted <span>Wooden</span> Bird Cages
            </h1>

            <p>
              Natural, breathable, 100% wood-framed bird cages built for lifelong comfort.
              Choose from active ready-made models in stock or order a custom cage tailored
              to your bird species and space.
            </p>

            <div className="hero-buttons">
              <a href="#catalog" className="btn-primary">
                Browse Ready-Made Cages <ArrowRight size={20} />
              </a>
              <a href="#customizer" className="btn-secondary">
                Custom Requirement <Sparkles size={18} />
              </a>
            </div>
          </div>

          <div className="hero-image-wrapper animate-fade-in" style={{ animationDelay: '0.15s' }}>
            <img
              src="/images/hero.jpg"
              alt="Handcrafted Wooden Bird Cage by Thiru Cages"
              className="hero-image"
            />
            <div className="hero-image-caption">
              <strong>Wood-Only Craftsmanship</strong>
              <span>Seasoned frames • Safe wire mesh • Slide-out trays</span>
            </div>
          </div>
        </div>

        <div className="hero-trust-strip">
          {TRUST_HIGHLIGHTS.map(({ icon: Icon, label }) => (
            <div key={label} className="trust-item">
              <Icon size={20} className="trust-icon" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
