import { ArrowRight, Bird } from 'lucide-react';

const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero-content">
        <div className="hero-text animate-fade-in">
          <h1>Where Craftsmanship <span>Meets Nature</span></h1>
          <p>
            Bespoke, luxury bird cages designed to complement your home's interior 
            while providing a safe, beautiful haven for your feathered companions.
          </p>
          <div className="hero-buttons">
            <a href="#customizer" className="btn-primary">
              Design Your Cage <ArrowRight size={20} />
            </a>
            <a href="#showcase" className="btn-secondary">
              View Gallery <Bird size={20} />
            </a>
          </div>
        </div>
        <div className="hero-image-wrapper animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <img 
            src="/images/hero.jpg" 
            alt="Luxury Wooden Bird Cage in Living Room" 
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
