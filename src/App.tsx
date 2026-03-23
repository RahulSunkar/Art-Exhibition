import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router';
import { AnimatePresence } from 'motion/react';
import { Suspense, lazy } from 'react';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About })));
const Voyage = lazy(() => import('./pages/Voyage').then(m => ({ default: m.Voyage })));
const Gallery = lazy(() => import('./pages/Gallery').then(m => ({ default: m.Gallery })));
const Films = lazy(() => import('./pages/Films').then(m => ({ default: m.Films })));
const People = lazy(() => import('./pages/People').then(m => ({ default: m.People })));
const Products = lazy(() => import('./pages/Products').then(m => ({ default: m.Products })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const Media = lazy(() => import('./pages/Media').then(m => ({ default: m.Media })));
const Events = lazy(() => import('./pages/Events').then(m => ({ default: m.Events })));

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

function AppContent() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navigation />
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoader />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/voyage" element={<Voyage />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/films" element={<Films />} />
            <Route path="/events" element={<Events />} />
            <Route path="/people" element={<People />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/media" element={<Media />} />
          </Routes>
        </Suspense>
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