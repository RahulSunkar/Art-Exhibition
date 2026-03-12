import { Link, useLocation } from 'react-router';
import { motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navigation() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { path: '/', label: 'Home' },
    // { path: '/about', label: 'About' },
    { path: '/voyage', label: 'The Voyage' },
    { path: '/gallery', label: 'Alternative Prints' },
    { path: '/films', label: 'Films' },
    { path: '/people', label: 'People & Voices' },
    { path: '/products', label: 'Artifacts' },
    { path: '/media', label: 'Media' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-foreground/10">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
        <Link to="/" className="font-serif text-xl tracking-tight" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
          A Voyage to Permanence
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="relative text-sm tracking-wide hover:text-accent transition-colors duration-300"
            >
              {link.label}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="navbar-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-[1px] bg-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        className="lg:hidden overflow-hidden bg-background border-b border-foreground/10"
      >
        <div className="px-6 py-4 space-y-4">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block text-sm tracking-wide ${
                location.pathname === link.path ? 'text-accent' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </motion.div>
    </nav>
  );
}