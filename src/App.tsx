import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router';
import { AnimatePresence } from 'motion/react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Voyage } from './pages/Voyage';
import { Gallery } from './pages/Gallery';
import { Films } from './pages/Films';
import { People } from './pages/People';
import { Products } from './pages/Products';
import { Contact } from './pages/Contact';

function AppContent() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navigation />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/voyage" element={<Voyage />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/films" element={<Films />} />
          <Route path="/people" element={<People />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}