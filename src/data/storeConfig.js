export const STORE_INFO = {
  name: 'Thiru Cages',
  tagline: 'Handcrafted Wooden Bird Cages • Coimbatore',
  whatsappDigits: '919790163209',
  phoneDisplay: '+91 97901 63209',
  email: 'manimala14022015@gmail.com',
  addressShort: '23, Sakthi Mariamman Koil St, Rathinapuri, Coimbatore',
  addressFull:
    'No. 23, Sakthi Mariamman Koil Street, Subbathal Layout, Rathinapuri, Tatabad, Coimbatore, Tamil Nadu – 641027',
  hours: 'Open Daily: 9:00 AM – 9:00 PM',
  rating: '5.0',
  reviewCount: 9,
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Thiru+Cages+23+Sakthi+Mariamman+Koil+Street+Rathinapuri+Coimbatore+641027',
  mapsEmbedUrl:
    'https://maps.google.com/maps?q=Thiru%20Cages%20Rathinapuri%20Coimbatore&t=&z=16&ie=UTF8&iwloc=&output=embed',
};

export function buildWhatsAppUrl(message) {
  return `https://wa.me/${STORE_INFO.whatsappDigits}?text=${encodeURIComponent(message)}`;
}

export function buildMailtoUrl(subject, body) {
  return `mailto:${STORE_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
