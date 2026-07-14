import { useState } from 'react';
import { Settings, PenTool, Scaling, Send, Bird } from 'lucide-react';

const Customizer = () => {
  const [formData, setFormData] = useState({
    birdType: '',
    size: 'medium',
    color: 'clear-varnish',
    extras: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! Your custom cage quote request has been sent to our artisans.');
    setFormData({ birdType: '', size: 'medium', color: 'clear-varnish', extras: '' });
  };

  return (
    <section id="customizer" className="section customizer">
      <div className="container">
        <h2 className="section-title">Design Your Masterpiece</h2>
        <p className="section-subtitle">
          Tell us about your feathered friend and your interior style.
          Our artisans will craft a personalized quote for your dream aviary.
        </p>

        <div className="customizer-layout">
          <form className="customizer-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="birdType">Bird Species / Size</label>
              <input
                type="text"
                id="birdType"
                name="birdType"
                className="form-control"
                placeholder="e.g., Macaw, Cockatiel, Finches"
                value={formData.birdType}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="size">Cage Size Preference</label>
              <select name="size" id="size" className="form-control form-select" value={formData.size} onChange={handleChange}>
                <option value="small">Small (Tabletop)</option>
                <option value="medium">Medium (Freestanding)</option>
                <option value="large">Large (Walk-in / Floor to Ceiling)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="color">Finish / Color</label>
              <select name="color" id="color" className="form-control form-select" value={formData.color} onChange={handleChange}>
                <option value="clear-varnish">Clear Varnish (Natural Wood)</option>
                <option value="light-stain">Light Wood Stain</option>
                <option value="dark-walnut">Dark Walnut Stain</option>
                <option value="unfinished">Unfinished (Raw Wood)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="extras">Special Features & Accessories</label>
              <textarea
                name="extras"
                id="extras"
                className="form-control"
                placeholder="e.g., Playtop, specific perch materials, seed catchers..."
                value={formData.extras}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="customizer-buttons">
              <button 
                type="button" 
                className="btn-primary" 
                onClick={(e) => {
                  e.preventDefault();
                  if (!formData.birdType) return alert('Please enter the bird species first!');
                  const text = `Hi Thiru Cages! I'd like a quote for a custom bird cage.%0A%0A*Bird:* ${formData.birdType}%0A*Size:* ${formData.size}%0A*Finish:* ${formData.color}%0A*Extras:* ${formData.extras || 'None'}`;
                  window.open(`https://wa.me/919790163209?text=${text}`, '_blank');
                }}
              >
                Send via WhatsApp <Send size={18} />
              </button>
              
              <button 
                type="button" 
                className="btn-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  if (!formData.birdType) return alert('Please enter the bird species first!');
                  const body = `Hi Thiru Cages,%0D%0A%0D%0AI would like to book a consultation call to discuss a custom bird cage design.%0D%0A%0D%0AMy Requirements:%0D%0ABird: ${formData.birdType}%0D%0ASize: ${formData.size}%0D%0AFinish: ${formData.color}%0D%0AExtras: ${formData.extras || 'None'}`;
                  window.location.href = `mailto:consult@thirucages.com?subject=Consultation Call Request&body=${body}`;
                }}
              >
                Book a Call <Bird size={18} />
              </button>
            </div>
          </form>

          <div className="customizer-preview animate-fade-in">
            <Settings size={48} className="preview-icon" />
            <h3 style={{ color: 'var(--color-primary)', marginBottom: '1rem', fontSize: '1.5rem' }}>
              Your Custom Specifications
            </h3>
            <ul style={{ textAlign: 'left', width: '100%', maxWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Bird size={20} color="var(--color-secondary)" />
                <strong>Bird:</strong> {formData.birdType || 'Not specified'}
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Scaling size={20} color="var(--color-secondary)" />
                <strong>Size:</strong> <span style={{ textTransform: 'capitalize' }}>{formData.size}</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <PenTool size={20} color="var(--color-secondary)" />
                <strong>Finish:</strong> <span style={{ textTransform: 'capitalize' }}>{formData.color.replace('-', ' ')}</span>
              </li>
            </ul>
            <p style={{ marginTop: '2rem', color: 'var(--color-text-light)', fontStyle: 'italic' }}>
              "Every great design begins with an even better story."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Customizer;
