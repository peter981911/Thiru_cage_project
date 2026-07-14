const Showcase = () => {
  const featuredCage = {
    id: 1,
    name: "The Masterpiece Collection",
    material: "Our Finest Craftsmanship",
    image: "/images/wood_cage_4.jpg",
  };

  const otherCages = [
    {
      id: 2,
      name: "The Grand Pavilion",
      material: "Sturdy Handcrafted Wood",
      image: "/images/wood_cage_6.jpg",
    },
    {
      id: 3,
      name: "The Multi-Tier Haven",
      material: "Solid Natural Wood",
      image: "/images/wood_cage_1.jpg",
    },
    {
      id: 4,
      name: "The Avian Duplex",
      material: "Custom Crafted Woodwork",
      image: "/images/wood_cage_3.jpg",
    },
    {
      id: 5,
      name: "The Sanctuary Tower",
      material: "Durable Wooden Construction",
      image: "/images/wood_cage_2.jpg",
    }
  ];

  return (
    <section id="showcase" className="section showcase">
      <div className="container">
        <h2 className="section-title">Masterpieces in Wood</h2>
        <p className="section-subtitle">
          Explore our collection of meticulously crafted, custom-designed wooden cages 
          that provide a natural and beautiful environment for your birds.
        </p>
        
        <div className="showcase-layout">
          {/* Featured Centerpiece */}
          <div className="featured-item animate-fade-in">
            <img src={featuredCage.image} alt={featuredCage.name} />
            <div className="gallery-overlay">
              <h3>{featuredCage.name}</h3>
              <p>{featuredCage.material}</p>
            </div>
          </div>

          {/* 4-Item Grid Below */}
          <div className="standard-grid">
            {otherCages.map((cage) => (
              <div key={cage.id} className="gallery-item animate-fade-in">
                <img src={cage.image} alt={cage.name} />
                <div className="gallery-overlay">
                  <h3>{cage.name}</h3>
                  <p>{cage.material}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
