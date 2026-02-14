import { Link } from 'react-router';

export function Footer() {
  return (
    <footer className="border-t border-foreground/10 bg-background">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-Bebas Neue text-2xl mb-4">A Voyage to Permanence</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              An ongoing exploration of memory, exploitation, and the invisible threads that connect us all.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm uppercase tracking-wider">Navigate</h4>
            <div className="space-y-2">
              <Link to="/about" className="block text-sm text-muted-foreground hover:text-accent transition-colors">
                About
              </Link>
              <Link to="/voyage" className="block text-sm text-muted-foreground hover:text-accent transition-colors">
                The Voyage
              </Link>
              <Link to="/gallery" className="block text-sm text-muted-foreground hover:text-accent transition-colors">
                Gallery
              </Link>
              <Link to="/films" className="block text-sm text-muted-foreground hover:text-accent transition-colors">
                Films
              </Link>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm uppercase tracking-wider">Connect</h4>
            <div className="space-y-2">
              <Link to="/contact" className="block text-sm text-muted-foreground hover:text-accent transition-colors">
                Contact
              </Link>
              <a href="mailto:info@voyagepermanent.art" className="block text-sm text-muted-foreground hover:text-accent transition-colors">
                prakashbraggs@chitramaya.in
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-foreground/10 text-center text-sm text-muted-foreground">
          <p>© 2025 A Voyage to Permanence. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}