import { MapPin, Phone, Mail, Clock, Navigation, Send } from 'lucide-react';
import { STORE_INFO, buildMailtoUrl, buildWhatsAppUrl } from '../data/storeConfig';

const ContactSection = () => {
  const quickChatUrl = buildWhatsAppUrl(
    'Hi Thiru Cages! I visited your website and would like to know more about your wooden bird cages.'
  );

  const quickMailUrl = buildMailtoUrl(
    'Inquiry from Thiru Cages Website',
    'Hi Thiru Cages,\n\nI would like to inquire about your wooden bird cages.\n\nName:\nBird Type:\nRequirement:'
  );

  return (
    <section id="visit-us" className="section contact-section">
      <div className="container">
        <div className="section-header">
          <span className="section-eyebrow">Visit Our Workshop &amp; Store</span>
          <h2 className="section-title">Find Thiru Cages in Coimbatore</h2>
          <p className="section-subtitle">
            Drop by our Rathinapuri workshop to inspect ready-made cages in person, or message us
            anytime on WhatsApp for photos, pricing, and custom orders.
          </p>
        </div>

        <div className="contact-layout">
          <div className="contact-card">
            <div className="contact-info-list">
              <div className="contact-info-item">
                <div className="contact-icon">
                  <MapPin size={22} />
                </div>
                <div>
                  <h4>Store Address</h4>
                  <p>{STORE_INFO.addressFull}</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon">
                  <Clock size={22} />
                </div>
                <div>
                  <h4>Opening Hours</h4>
                  <p>{STORE_INFO.hours}</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon">
                  <Phone size={22} />
                </div>
                <div>
                  <h4>WhatsApp &amp; Phone</h4>
                  <p>
                    <a href={`tel:+${STORE_INFO.whatsappDigits}`}>{STORE_INFO.phoneDisplay}</a>
                  </p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon">
                  <Mail size={22} />
                </div>
                <div>
                  <h4>Email</h4>
                  <p>
                    <a href={quickMailUrl}>{STORE_INFO.email}</a>
                  </p>
                </div>
              </div>
            </div>

            <div className="contact-cta-grid">
              <a
                href={quickChatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <Send size={18} /> Chat on WhatsApp
              </a>

              <a
                href={STORE_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <Navigation size={18} /> Get Directions
              </a>
            </div>
          </div>

          <div className="map-card">
            <iframe
              title="Thiru Cages Coimbatore Location Map"
              src={STORE_INFO.mapsEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
