import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router';
import { useState, useRef, useEffect } from 'react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { artworks, films, products, locations, videos } from '../data/store';
import hero_video from '../data/hero_video.mp4';
import hero_image from '../data/Dhushor_Stills__2.8.1.jpg';

// Image component with blur-up effect
function BlurImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <motion.div className="relative overflow-hidden w-full h-full">
      {/* Blurred placeholder */}
      <motion.img
        src={src}
        alt={alt}
        className={`${className} blur-md scale-110 absolute inset-0`}
        initial={{ opacity: 1 }}
        animate={{ opacity: isLoading ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      {/* Full resolution image */}
      <motion.img
        src={src}
        alt={alt}
        className={`${className} absolute inset-0`}
        onLoadingComplete={() => setIsLoading(false)}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        loading="lazy"
        decoding="async"
      />
    </motion.div>
  );
}


export function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5], [0, 5]);

  const previewArtworks = artworks.slice(0, 6);
  const previewFilms = films.slice(0, 2);
  const previewProducts = products.slice(0, 4);
  const cityNames = locations.map(loc => loc.city);

  const hasArtworkData = previewArtworks.length > 0;

  // Preload critical images
  useEffect(() => {
    const imagesToPreload = [hero_image, ...previewArtworks.map(a => a.image), ...previewFilms.map(f => f.image)];
    imagesToPreload.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, [previewArtworks, previewFilms]);

  return (
    <div ref={scrollContainerRef} className="min-h-screen"
      onMouseMove={(e) => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      }}
    >
      {/* Running Banner */}
      {/* <Link to="/voyage">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mt-[88px] relative h-12 md:h-12 overflow-hidden cursor-pointer group"
        >
          <motion.video
            style={{ opacity, scale }}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={hero_video} type="video/mp4" />
          </motion.video>
          
          <div className="absolute inset-0 bg-blue-900/90 group-hover:bg-blue-900/95 transition-colors duration-300" />
          
          <div className="relative z-10 h-full flex items-center">
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="flex whitespace-nowrap"
            >
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-4 md:gap-8 px-4 md:px-8">
                  <span className="text-sm md:text-lg tracking-wide text-white font-medium"> A Voyage to Permanence</span>
                  <span className="text-white">•</span>
                  <span className="text-sm md:text-lg tracking-wide text-black font-bold">New Delhi</span>
                  <span className="text-white">•</span>
                  <span className="text-sm md:text-lg tracking-wide text-white font-medium">10/03/2026</span>
                  <span className="text-white">•</span>
                </div>
              ))}
            </motion.div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-0.5 md:h-1 bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </motion.div>
      </Link> */}

      {/* Hero Section */}
      <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        
        <motion.video
          style={{ 
            opacity, 
            scale,
            filter: 'brightness(1.15)'
          }}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={hero_video} type="video/mp4" />
        </motion.video>
        
        <motion.div 
          style={{ y }}
          className="relative z-20 text-center text-white px-4 md:px-6 max-w-6xl"
        >
          {/* Main Title with staggered animation */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.2,
              ease: "easeOut",
              type: "spring",
              stiffness: 100,
              damping: 30
            }}
          >
            <h1
              className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl mb-6 md:mb-8 tracking-wider leading-none"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              <motion.span
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                className="inline-block"
              >
                A Voyage to
              </motion.span>
              <br />
              <motion.span
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 1.2, 
                  delay: 0.4,
                  type: "spring",
                  stiffness: 80
                }}
                className="inline-block"
              >
                Permanence
              </motion.span>
            </h1>
          </motion.div>

          {/* Subtitle with fade-in */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="mb-8 md:mb-12"
          >
            <motion.p
              className="text-xl sm:text-2xl md:text-4xl tracking-wide opacity-70"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }}
              animate={{ 
                opacity: [0.7, 0.85, 0.7]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Celebration of visual poetry
            </motion.p>
          </motion.div>

          {/* Description with staggered lines */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.7 }}
            className="space-y-4 md:space-y-6"
          >
            <motion.p
              className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-4xl mx-auto"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              An immersive experience of <motion.em 
                className="italic"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                audio visual frames
              </motion.em>, 
              {" "} alternative prints, and performances on three experimental films of Purandar Chaudhuri
            </motion.p>

            <motion.p
              className="text-xs sm:text-xs md:text-sm tracking-widest uppercase text-white/60"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              New Delhi • Goa • Chennai • Bengaluru
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Animated Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              ease: "easeInOut"
            }}
            className="relative"
          >
            <ChevronDown className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={1} />
            <motion.div
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute inset-0"
            >
              <ChevronDown className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={1} />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

        {/* Exhibition Concept */}
        <section className="relative h-screen overflow-hidden">

          {/* Background Hero Image with parallax */}
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <ImageWithFallback
              src={hero_image}
              alt="Exhibition Background"
              className="w-full h-full object-cover"
              style={{ filter: 'brightness(1.1)' }}
              loading="eager"
              decoding="async"
            />
          </motion.div>

          {/* Animated Gradient Overlay */}
{/* overlay removed to preserve full image color */}
          {/* no gradient */}

          {/* Text Content with smooth entrance */}
          <div className="relative z-10 h-full flex items-center justify-center px-6 pt-[18vh]">
            <motion.div 
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <motion.p
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed text-white font-light italic"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.2 }}
              >
                <motion.span
                  animate={{ 
                    textShadow: [
                      '0 0 0px rgba(255, 255, 255, 0)',
                      '0 0 20px rgba(255, 255, 255, 0.3)',
                      '0 0 0px rgba(255, 255, 255, 0)'
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  "The greyness is a philosophy as much as a colour – a world of ambiguity, where life and death, past and present, memory and imagination mingle like smoke over a river at dawn."
                </motion.span>
              </motion.p>
            </motion.div>
          </div>
        </section>



      {/* Art Preview Grid */}
      <section className="py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-12 bg-black text-white">
        <div className="max-w-screen-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12 md:mb-16"
          >
            <motion.h2 
              className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-4 md:mb-6 tracking-tight"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1 }}
            >
              Alternative
              <br />
              <motion.em 
                className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl italic block "
                style={{ color: "#704c36" }}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                Photography Prints
              </motion.em>
            </motion.h2>
            
            {hasArtworkData ? (
              <p className="text-white/60 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed">
              </p>
            ) : (
              <p className="text-white/60 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed">
                
              </p>
            )}
          </motion.div>

          {hasArtworkData ? (
            <>
              <motion.div 
                className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 lg:gap-8 mb-8 md:mb-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
              >
                {previewArtworks.map((artwork, index) => (
                  <motion.div
                    key={artwork.id}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      duration: 0.6, 
                      delay: index * 0.08,
                      ease: "easeOut"
                    }}
                    whileHover={{ y: -10 }}
                    className="aspect-[3/4] relative overflow-hidden group cursor-pointer rounded-sm"
                  >
                    <ImageWithFallback
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover transition-all duration-700"
                    />
                    
                    {/* Animated overlay */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    />
                    
                    <motion.div 
                      className="absolute inset-0 flex items-end p-3 md:p-6"
                      initial={{ y: 10, opacity: 0 }}
                      whileHover={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.p 
                        className="text-white font-serif text-base md:text-xl lg:text-2xl"
                        animate={{ letterSpacing: [0, 2, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {artwork.title}
                      </motion.p>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="py-24 md:py-32 text-center"
            >
              
              <p className="text-white/70 text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed mb-4">
                Our visual archive is currently being <span className="text-white font-serif">curated</span>, 
                <br className="hidden sm:block" />
                <span className="text-white font-serif">developed</span>, and <span className="text-white font-serif">composed</span>.
              </p>
              
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-white/50 text-sm sm:text-base md:text-lg tracking-widest uppercase"
              >
                Coming Soon
              </motion.p>
              
              <div className="mt-12 flex justify-center gap-2">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 1, 0.3]
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      delay: i * 0.2
                    }}
                    className="w-2 h-2 rounded-full bg-white"
                  />
                ))}
              </div>
            </motion.div>
          )}

          <Link to="/gallery">
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ x: 8 }}
              transition={{ duration: 0.3 }}
              className="mt-8 md:mt-12 flex items-center gap-2 text-white border-b-2 border-accent pb-2 text-sm md:text-lg hover:text-accent transition-colors"
            >
              Explore the Prints
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
          </Link>
        </div>
      </section>

      {/* Films Section */}
      <section className="py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-12 max-w-screen-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 md:mb-16"
        >
          <motion.h2 
            className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-4 md:mb-6 tracking-tight leading-tight"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 }}
          >
            <motion.em 
              className="italic text-[#694633]"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Films
            </motion.em>
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Cinematic journeys weaving fragmented narratives, layered voices, and the poetry of displacement.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2, delayChildren: 0.1 }}
        >
          {previewFilms.map((film, index) => (
            <Link key={film.id} to={`/films#film-${film.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <motion.div
                  className="aspect-[16/9] relative overflow-hidden mb-4 md:mb-6 rounded-sm"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                >
                  <ImageWithFallback
                    src={film.image}
                    alt={film.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  
                  <motion.div 
                    className="absolute inset-0 bg-black/40 group-hover:bg-black/20"
                    initial={{ opacity: 0.4 }}
                    whileHover={{ opacity: 0.2 }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div 
                      className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center backdrop-blur-sm bg-white/10"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <motion.div 
                        className="w-0 h-0 border-l-[16px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1"
                        animate={{ x: [0, 2, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </motion.div>
                  </motion.div>
                  
                  <motion.div 
                    className="absolute top-4 md:top-6 right-4 md:right-6 bg-white/10 backdrop-blur-sm px-3 py-1 md:px-4 md:py-2 text-white text-xs md:text-sm border border-white/20 rounded-full"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {film.duration}
                  </motion.div>
                </motion.div>
                
                <motion.h3 
                  className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 md:mb-3 leading-tight group-hover:text-[#694633] transition-colors"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {film.title}
                </motion.h3>
                <motion.p 
                  className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {film.description}
                </motion.p>
              </motion.div>
            </Link>
          ))}
        </motion.div>

        <Link to="/films">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            whileHover={{ x: 8 }}
            transition={{ duration: 0.3 }}
            className="mt-8 md:mt-12 flex items-center gap-2 text-[#694633] border-b-2 border-[#694633] pb-2 text-sm md:text-lg hover:text-[#694633] transition-colors"
          >
            Explore the Films
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>
        </Link>
      </section>

      {/* Products/Artifacts */}
      <section className="py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-12 bg-muted/30">
        <div className="max-w-screen-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12 md:mb-16"
          >
            <motion.h2 
              className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-4 md:mb-6 tracking-tight"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.1 }}
            >
              <motion.em 
                className="italic text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-[#694633]"
                initial={{ opacity: 0, y: 30 }}
                 style={{ color: "#08172f" }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                Artifacts
              </motion.em>
            </motion.h2>
            <motion.p 
              className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Objects that extend the exhibition beyond gallery walls. Each piece carries memory forward.
            </motion.p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.08, delayChildren: 0.15 }}
          >
            {previewProducts.map((product, index) => (
              <Link key={product.id} to={`/products#product-${product.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.08,
                    ease: "easeOut"
                  }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  className="group cursor-pointer"
                >
                  <motion.div 
                    className="aspect-square bg-white mb-3 md:mb-4 overflow-hidden shadow-lg rounded-sm"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700 ease-out"
                    />
                  </motion.div>
                  <motion.h4 
                    className="mb-1 text-sm md:text-base lg:text-lg font-serif group-hover:text-[#694633] transition-colors"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                  >
                    {product.name}
                  </motion.h4>
                  <motion.p 
                    className="text-xs md:text-sm text-muted-foreground line-clamp-2"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                  >
                    {product.description}
                  </motion.p>
                </motion.div>
              </Link>
            ))}
          </motion.div>

          <Link to="/products">
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ x: 8 }}
              transition={{ duration: 0.3 }}
              className="mt-8 md:mt-12 flex items-center gap-2 text-[#694633] border-b-2 border-[#694633] pb-2 text-sm md:text-lg hover:text-[#694633] transition-colors"
            >
              View All Artifacts
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
          </Link>
        </div>
      </section>

      {/* Locations Preview */}
      <section className="py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-12 max-w-screen-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <motion.h2 
            className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-8 md:mb-12 tracking-tight leading-tight"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1 }}
          >
            The
            <br />
            <motion.em 
              className="italic text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-[#694633]"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Voyage
            </motion.em>
          </motion.h2>
          
          <motion.p 
            className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed mb-8 md:mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            This exhibition <em className="font-serif not-italic text-foreground">moves</em>. It <em className="font-serif not-italic text-foreground">transforms</em>.
            It adapts to each city it inhabits, creating new dialogues between place, memory, and the communities that hold them.
          </motion.p>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1, delayChildren: 0.15 }}
          >
            {cityNames.map((city, index) => (
              <motion.div
                key={city}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{ x: 10, scale: 1.02 }}
                className="py-4 md:py-6 border-b-2 border-foreground/10 cursor-pointer hover:border-foreground/30 transition-all group"
              >
                <motion.span 
                  className="text-xs md:text-sm text-muted-foreground uppercase tracking-widest"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Chapter {index + 1}
                </motion.span>
                
                <motion.h3 
                  className="text-2xl sm:text-3xl font-serif mt-2 group-hover:text-[#694633] transition-colors"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  {city}
                </motion.h3>
              </motion.div>
            ))}
          </motion.div>

          <Link to="/voyage">
            <motion.button
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ x: 8 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 text-[#694633] border-b-2 border-[#694633] pb-2 text-sm md:text-lg hover:text-[#694633] transition-colors"
            >
              Explore All Locations
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}