import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router';
import { useState, useRef } from 'react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { artworks, films, products, locations, videos } from '../data/store';
import hero_video from '../data/hero_video.mp4';
import hero_image from '../data/Dhushor_Stills__2.8.1.jpg';


export function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  const previewArtworks = artworks.slice(0, 6);
  const previewFilms = films.slice(0, 2);
  const previewProducts = products.slice(0, 4);
  const cityNames = locations.map(loc => loc.city);

  const hasArtworkData = previewArtworks.length > 0;

  return (
    <div ref={scrollContainerRef} className="min-h-screen">
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
        {/* <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background z-10" /> */}
        
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
        
        <motion.div 
          style={{ y }}
          className="relative z-20 text-center text-white px-4 md:px-6 max-w-6xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1
              className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl mb-6 md:mb-8 tracking-wider leading-none"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              A Voyage to
              <br />
              Permanence
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mb-8 md:mb-12"
          >
            <p
              className="text-xl sm:text-2xl md:text-4xl tracking-wide opacity-70"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }}
            >
              Celebration of visual poetry
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="space-y-4 md:space-y-6"
          >
            <p
              className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-4xl mx-auto"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }}
            >
              An immersive experience of <em className="italic">audio visual frames</em>,{" "}
              alternative prints, and performances on three experimental films of Purandar Chaudhuri
            </p>

            <p
              className="text-xs sm:text-xs md:text-sm tracking-widest uppercase text-white/60"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 400 }}
            >
              New Delhi • Goa • Chennai • Bengaluru
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-6 h-6 md:w-8 md:h-8 text-white" strokeWidth={1} />
          </motion.div>
        </motion.div>
      </section>

        {/* Exhibition Concept */}
        <section className="relative h-screen overflow-hidden">

          {/* Background Hero Image */}
          <motion.img
            src={hero_image} // make sure this is optimized .webp
            alt="Exhibition Background"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            decoding="async"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

          {/* Text Content */}
          <div className="relative z-10 h-full flex items-center justify-center px-4 md:px-6 lg:px-12">
            <div className="max-w-4xl mx-auto text-center">
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-relaxed text-white font-light italic"
              >
                "The greyness is a philosophy as much as a colour – a world of ambiguity, where life and death, past and present, memory and imagination mingle like smoke over a river at dawn."
              </motion.p>
            </div>
          </div>
        </section>



      {/* Art Preview Grid */}
      <section className="py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-12 bg-black text-white">
        <div className="max-w-screen-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-4 md:mb-6 tracking-tight">
              Alternative<br />
              <em className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl italic">Photography Prints</em>
            </h2>
            
            {hasArtworkData ? (
              <p className="text-white/60 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed">
                A collection of <span className="text-white font-serif text-xl md:text-2xl">1000+</span> artworks
                exploring experimental techniques, human stories, and the visible traces of invisible lives.
              </p>
            ) : (
              <p className="text-white/60 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed">
                Something extraordinary is brewing in our darkroom...
              </p>
            )}
          </motion.div>

          {hasArtworkData ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 lg:gap-8 mb-8 md:mb-12">
                {previewArtworks.map((artwork, index) => (
                  <motion.div
                    key={artwork.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="aspect-[3/4] relative overflow-hidden group cursor-pointer"
                  >
                    <ImageWithFallback
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 md:p-6">
                      <p className="text-white font-serif text-base md:text-xl lg:text-2xl">{artwork.title}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="py-24 md:py-32 text-center"
            >
              <h3 className="font-serif text-3xl sm:text-4xl md:text-6xl mb-6 italic">
                In the Darkroom
              </h3>
              
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
        </div>
      </section>

      {/* Films Section */}
      <section className="py-16 md:py-24 lg:py-32 px-4 md:px-6 lg:px-12 max-w-screen-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-16"
        >
          <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-4 md:mb-6 tracking-tight leading-tight">
            {/* <span className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl opacity-60">Two</span> */}
            <br />
            <em className="italic">Films</em>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed">
            Cinematic journeys weaving fragmented narratives, layered voices, and the poetry of displacement.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {previewFilms.map((film, index) => (
            <Link key={film.id} to={`/films#film-${film.id}`}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[16/9] relative overflow-hidden mb-4 md:mb-6">
                  <ImageWithFallback
                    src={film.image}
                    alt={film.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                  
                  <motion.div 
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className="w-16 h-16 rounded-full border-2 border-white flex items-center justify-center backdrop-blur-sm">
                      <div className="w-0 h-0 border-l-[16px] border-l-white border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1" />
                    </div>
                  </motion.div>
                  
                  <div className="absolute top-4 md:top-6 right-4 md:right-6 bg-white/10 backdrop-blur-sm px-3 py-1 md:px-4 md:py-2 text-white text-xs md:text-sm border border-white/20">
                    {film.duration}
                  </div>
                </div>
                
                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 md:mb-3 leading-tight group-hover:text-accent transition-colors">{film.title}</h3>
                <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">{film.description}</p>
              </motion.div>
            </Link>
          ))}
        </div>

        <Link to="/films">
          <motion.button
            whileHover={{ x: 5 }}
            className="mt-8 md:mt-12 flex items-center gap-2 text-accent border-b-2 border-accent pb-2 text-sm md:text-lg"
          >
            Explore the Films
            <span>→</span>
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
            transition={{ duration: 0.6 }}
            className="mb-12 md:mb-16"
          >
            <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-4 md:mb-6 tracking-tight">
              <em className="italic text-5xl sm:text-6xl md:text-8xl lg:text-9xl">Artifacts</em>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed">
              Objects that extend the exhibition beyond gallery walls. Each piece carries memory forward.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {previewProducts.map((product, index) => (
              <Link key={product.id} to={`/products#product-${product.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <motion.div 
                    className="aspect-square bg-white mb-3 md:mb-4 overflow-hidden shadow-lg"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </motion.div>
                  <h4 className="mb-1 text-sm md:text-base lg:text-lg font-serif group-hover:text-accent transition-colors">{product.name}</h4>
                  <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                </motion.div>
              </Link>
            ))}
          </div>

          <Link to="/products">
            <motion.button
              whileHover={{ x: 5 }}
              className="mt-8 md:mt-12 flex items-center gap-2 text-accent border-b-2 border-accent pb-2 text-sm md:text-lg"
            >
              View All Artifacts
              <span>→</span>
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
          transition={{ duration: 0.6 }}
          className="max-w-4xl"
        >
          <h2 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl mb-8 md:mb-12 tracking-tight leading-tight">
            The
            <br />
            <em className="italic text-5xl sm:text-6xl md:text-8xl lg:text-9xl">Voyage</em>
          </h2>
          
          <p className="text-muted-foreground text-base sm:text-lg md:text-xl leading-relaxed mb-8 md:mb-12">
            This exhibition <em className="font-serif not-italic">moves</em>. It <em className="font-serif not-italic">transforms</em>.
            It adapts to each city it inhabits, creating new dialogues between place, memory, and the communities that hold them.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
            {cityNames.map((city, index) => (
              <motion.div
                key={city}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="py-4 md:py-6 border-b-2 border-foreground/10 cursor-pointer hover:border-foreground/30 transition-colors group"
              >
                <span className="text-xs md:text-sm text-muted-foreground uppercase tracking-widest">
                  Chapter {index + 1}
                </span>
                
                <h3 className="text-2xl sm:text-3xl font-serif mt-2 group-hover:text-accent transition-colors">
                  {city}
                </h3>
              </motion.div>
            ))}
          </div>

          <Link to="/voyage">
            <motion.button
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-accent border-b-2 border-accent pb-2 text-sm md:text-lg"
            >
              Explore All Locations
              <span>→</span>
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}