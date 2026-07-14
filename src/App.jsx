import { useState, useEffect } from 'react';
import { Bird } from 'lucide-react';
import Hero from './components/Hero';
import Showcase from './components/Showcase';
import Customizer from './components/Customizer';
import './App.css';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app">
      <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container nav-content">
          <div className="logo">
            <Bird size={28} className="logo-icon" />
            <span>Thiru</span> Cages
          </div>
          <ul className="nav-links">
            <li><a href="#showcase">Gallery</a></li>
            <li><a href="#customizer">Custom Design</a></li>
          </ul>
        </div>
      </nav>

      <main>
        <Hero />
        <Showcase />
        <Customizer />
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 Thiru Cages, Crafted with care.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
