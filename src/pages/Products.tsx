import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router';
import { X, BookOpen, Scissors, Package, Palette, Frame, Book, FileText, ShoppingBag } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

// Coffee Table Book Images
import coffeTableBook_1 from '../data/ArtifactData/Coffee Table book/AVTP_Square_Book_Mockup_1.jpg'
import coffeTableBook_2 from '../data/ArtifactData/Coffee Table book/AVTP_Square_Book_Mockup_2.jpg'
import coffeTableBook_3 from '../data/ArtifactData/Coffee Table book/AVTP_Square_Book_Mockup_3.jpg'
import coffeTableBook_4 from '../data/ArtifactData/Coffee Table book/AVTP_Square_Book_Mockup_5.jpg'
import coffeTableBook_5 from '../data/ArtifactData/Coffee Table book/AVTP_Square_Book_Mockup_7.jpg'

// Frame Images
import Frames_1 from '../data/ArtifactData/Frames/690abc9cdf2e8dc480496671a1be0c21.jpg'
import Frames_2 from '../data/ArtifactData/Frames/WPTGSKALE24S1_1.jpg.jpg'
import Frames_3 from '../data/ArtifactData/Frames/fd1a2e559fdc66a9ddc161d73e583877_1.jpg'

// Notebook Images
import Note_Bangalore_f from '../data/ArtifactData/Note Books/Bangalore_FrontCOver_Mockup.jpg'
import Note_Bangalore_o from '../data/ArtifactData/Note Books/Bangalore_Openbook_Mockup.jpg'
import Note_Chennai_f from '../data/ArtifactData/Note Books/Chennai_FrontCOver_Mockup_NS.jpg'
import Note_Chennai_o from '../data/ArtifactData/Note Books/Chennai_Openbook_Mockup.jpg'
import Note_Delhi_f from '../data/ArtifactData/Note Books/Delhi_FrontCOver_Mockup_NS.jpg'
import Note_Delhi_o from '../data/ArtifactData/Note Books/Delhi_Openbook_Mockup.jpg'
import Note_Goa_f from '../data/ArtifactData/Note Books/Goa_FrontCOver_Mockup_NS.jpg'
import Note_Goa_o from '../data/ArtifactData/Note Books/Goa_Openbook_Mockup.jpg'
import Note_Kolkata_f from '../data/ArtifactData/Note Books/Kolkata_FrontCOver_Mockup_NS.jpg'
import Note_Kolkata_o from '../data/ArtifactData/Note Books/Kolkota_Openbook_Mockup2.jpg'
import Note_Jaipur_f from '../data/ArtifactData/Note Books/Jaipur_FrontCOver_Mockup_NS.jpg'
import Note_Jaipur_o from '../data/ArtifactData/Note Books/Jaipur_Openbook_Mockup.jpg'
import Note_Kochi_f from '../data/ArtifactData/Note Books/Kochi_FrontCOver_Mockup_NS.jpg'
import Note_Kochi_o from '../data/ArtifactData/Note Books/Kochi_Openbook_Mockup.jpg'
import Note_Lucknow_f from '../data/ArtifactData/Note Books/Lucknow_FrontCOver_Mockup_NS.jpg'
import Note_Lucknow_o from '../data/ArtifactData/Note Books/Lucknow_Openbook_Mockup.jpg'
import Note_Varanasi_f from '../data/ArtifactData/Note Books/Varanasi_FrontCOver_Mockup_NS.jpg'
import Note_Varanasi_o from '../data/ArtifactData/Note Books/Varanasi_Openbook_Mockup.jpg'

// Tote Bag Images
import tote_delhi from '../data/ArtifactData/ToteBags/LIAB_Tote_Mockup02_001.jpg'
import tote_bangalore from '../data/ArtifactData/ToteBags/LIAB_Tote_MockupBengaluru_01_001.jpg'
import tote_jaipur from '../data/ArtifactData/ToteBags/LIAB_Tote_MockupJaipur_01_003.jpg'
import tote_kochi from '../data/ArtifactData/ToteBags/LIAB_Tote_MockupKochi_01_002.jpg'
import tote_kolkata from '../data/ArtifactData/ToteBags/LIAB_Tote_MockupKolkata_01_001.jpg'
import tote_varanasi from '../data/ArtifactData/ToteBags/LIAB_Tote_MockupVaranasi_01_002.jpg'

export function Products() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace('#', '');
      const element = sectionRefs.current[sectionId];
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Highlight effect
          element.classList.add('ring-4', 'ring-accent', 'ring-offset-8', 'ring-offset-white');
          setTimeout(() => {
            element.classList.remove('ring-4', 'ring-accent', 'ring-offset-8', 'ring-offset-white');
          }, 2000);
        }, 100);
      }
    }
  }, [location]);

  // Coffee Table Books Data
  const coffeeTableBooks = {
    id: 'coffee-table-books',
    title: 'Coffee Table Books',
    subtitle: '',
    description: "",
    icon: Book,
    images: [coffeTableBook_1, coffeTableBook_2, coffeTableBook_3, coffeTableBook_4],
    details: {
      format: 'Hardcover, 100 pages',
      dimensions: '12" × 16 " (30.5cm × 40.6cm)',
      language: 'Multilingual (English, French, Portuguese, German, Spanish)',
      publisher: 'A Voyage to Permanence Press',
      year: '2026',
      paper: 'Premium archival quality',
      binding: 'Thread-sewn hardcover'
    },
    concept: 'More than a catalog, this book is designed as a permanent archive. Each chapter corresponds to a city in the voyage, with essays by local scholars and testimonies from participants. The book itself is a cultural artifact—a way for the exhibition to persist beyond its physical installations.',
    price: 'Available at exhibition venues'
  };

  // Frames Data
  const frames = {
    id: 'frames',
    title: 'Prints',
    subtitle: '',
    description: ' ',
    icon: Frame,
    images: [Frames_1, Frames_2, Frames_3],
    details: {
      material: 'Museum-quality archival paper',
      frame: 'Sustainable wood frames',
      sizes: 'Multiple sizes available',
      finish: 'Matte finish with UV protection',
      production: 'Made in partnership with local artisans',
      mounting: 'Acid-free mat board'
    },
    concept: '',
    price: 'Available at exhibition venues'
  };

  // Notebooks Data
  const notebooks = [
    { city: 'Bangalore', coverImage: Note_Bangalore_f, openImage: Note_Bangalore_o, description: 'Tech hub meets ancient temples—the Silicon Valley of India with a soul.' },
    { city: 'Chennai', coverImage: Note_Chennai_f, openImage: Note_Chennai_o, description: 'Gateway to the South, where classical arts and modern industry converge.' },
    { city: 'Delhi', coverImage: Note_Delhi_f, openImage: Note_Delhi_o, description: 'The capital city, where centuries of history meet contemporary politics.' },
    { city: 'Goa', coverImage: Note_Goa_f, openImage: Note_Goa_o, description: 'Portuguese heritage, pristine beaches, and a unique cultural fusion.' },
    { city: 'Kolkata', coverImage: Note_Kolkata_f, openImage: Note_Kolkata_o, description: 'The city of joy, intellectual capital and cultural heartbeat of the East.' },
    { city: 'Jaipur', coverImage: Note_Jaipur_f, openImage: Note_Jaipur_o, description: 'The Pink City, where royal heritage meets vibrant craftsmanship.' },
    { city: 'Kochi', coverImage: Note_Kochi_f, openImage: Note_Kochi_o, description: 'Queen of the Arabian Sea, a melting pot of cultures and spice trade history.' },
    { city: 'Lucknow', coverImage: Note_Lucknow_f, openImage: Note_Lucknow_o, description: 'City of Nawabs, renowned for grace, poetry, and refined etiquette.' },
    { city: 'Varanasi', coverImage: Note_Varanasi_f, openImage: Note_Varanasi_o, description: 'Ancient spiritual center, where life and death meet on the Ganges.' }
  ];

  const notebooksCollection = {
    id: 'notebooks',
    title: 'Art Note Books',
    subtitle: '',
    description: '',
    icon: FileText,
    notebooks: notebooks,
    details: {
      format: 'Softcover notebook, ruled pages',
      dimensions: '5.5" × 8.5" (14cm × 21.6cm)',
      pages: '160 pages of premium paper',
      cover: 'Original artwork featuring city landmarks',
      binding: 'Sewn binding for durability',
      paper: 'Acid-free, fountain pen friendly'
    },
    concept: 'These notebooks are more than blank pages—they\'re invitations to document your own voyage. Each cover features original artwork capturing the essence of a different Indian city, creating a collection that honors the diversity of our cultural landscape.',
    price: 'Available individually or as a complete set'
  };

  // Tote Bags Data
  const toteBags = [
    { city: 'Delhi', image: tote_delhi, description: 'The capital city design featuring iconic monuments and modern architecture.' },
    { city: 'Bangalore', image: tote_bangalore, description: 'Tech hub meets garden city—celebrating innovation and green spaces.' },
    { city: 'Jaipur', image: tote_jaipur, description: 'The Pink City heritage with intricate patterns and royal motifs.' },
    { city: 'Kochi', image: tote_kochi, description: 'Coastal charm and spice trade history in vibrant colors.' },
    { city: 'Kolkata', image: tote_kolkata, description: 'Cultural heartbeat of the East with artistic elements.' },
    { city: 'Varanasi', image: tote_varanasi, description: 'Ancient spiritual essence captured in timeless design.' }
  ];

  const toteBagsCollection = {
    id: 'tote-bags',
    title: 'Exhibition Tote Bags',
    subtitle: '',
    description: '',
    icon: ShoppingBag,
    bags: toteBags,
    details: {
      material: '100% organic cotton canvas',
      dimensions: '15" × 16" × 6" (38cm × 40.6cm × 15.2cm)',
      weight: '12 oz heavyweight canvas',
      production: 'Made in partnership with worker cooperatives',
      design: 'Screen-printed with water-based inks',
      capacity: 'Holds up to 20 lbs',
      care: 'Machine washable, hang dry'
    },
    concept: 'Every aspect of these totes is intentional. The canvas is organic and ethically sourced. Production happens through worker cooperatives that pay fair wages. The design features artwork from the exhibition, making each bag both functional and a piece of the collection.',
    price: 'Available individually at exhibition venues'
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-white">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h1 className="font-serif text-6xl md:text-8xl mb-8 tracking-tight">
            <motion.em 
              className="italic"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Artifacts
            </motion.em>
          </h1>
          {/* <motion.p 
            className="text-xl text-gray-600 max-w-3xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            These are not products—they are cultural artifacts that extend the exhibition
            beyond gallery walls. Each object is produced ethically and designed to carry
            the memory of the work forward.
          </motion.p> */}
        </motion.div>

        {/* COFFEE TABLE BOOKS SECTION */}
        <motion.section
          id={coffeeTableBooks.id}
          ref={(el) => { sectionRefs.current[coffeeTableBooks.id] = el; }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-32 border-t border-gray-200 pt-20 transition-all duration-500"
        >
          <div className="mb-12">
            <motion.div 
              className="flex items-center gap-4 mb-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <coffeeTableBooks.icon className="w-12 h-12" />
              </motion.div>
              <div>
                <h2 className="font-serif text-5xl md:text-6xl tracking-tight">
                  {coffeeTableBooks.title}
                </h2>
                <p className="text-xl text-gray-500 mt-2">{coffeeTableBooks.subtitle}</p>
              </div>
            </motion.div>
            <motion.p 
              className="text-lg text-gray-600 max-w-3xl leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {coffeeTableBooks.description}
            </motion.p>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {coffeeTableBooks.images.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => {
                  setSelectedProduct(coffeeTableBooks);
                  setSelectedImage(img);
                }}
                className="aspect-square bg-gray-100 overflow-hidden cursor-pointer group shadow-lg"
              >
                <ImageWithFallback
                  src={img}
                  alt={`Coffee table book ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>

          {/* Details Grid */}
          {/* <motion.div 
            className="bg-gray-50 p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-serif text-2xl mb-6">Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(coffeeTableBooks.details).map(([key, value], idx) => (
                <motion.div 
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                >
                  <div className="text-sm text-gray-500 uppercase tracking-wider mb-1">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <div className="text-base font-medium">{value}</div>
                </motion.div>
              ))}
            </div>
          </motion.div> */}

          {/* <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-serif text-2xl mb-4">The Concept</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              {coffeeTableBooks.concept}
            </p>
            <div className="text-lg font-medium">{coffeeTableBooks.price}</div>
          </motion.div> */}
        </motion.section>

        {/* FRAMES SECTION */}
        <motion.section
          id={frames.id}
          ref={(el) => { sectionRefs.current[frames.id] = el; }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-32 border-t border-gray-200 pt-20 transition-all duration-500"
        >
          <div className="mb-12">
            <motion.div 
              className="flex items-center gap-4 mb-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <frames.icon className="w-12 h-12" />
              </motion.div>
              <div>
                <h2 className="font-serif text-5xl md:text-6xl tracking-tight">
                  {frames.title}
                </h2>
                <p className="text-xl text-gray-500 mt-2">{frames.subtitle}</p>
              </div>
            </motion.div>
            <motion.p 
              className="text-lg text-gray-600 max-w-3xl leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {frames.description}
            </motion.p>
          </div>

          {/* Image Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {frames.images.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                onClick={() => {
                  setSelectedProduct(frames);
                  setSelectedImage(img);
                }}
                className="aspect-square bg-gray-100 overflow-hidden cursor-pointer group shadow-lg"
              >
                <ImageWithFallback
                  src={img}
                  alt={`Frame ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </motion.div>
            ))}
          </div>

          {/* Details Grid */}
          {/* <motion.div 
            className="bg-gray-50 p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-serif text-2xl mb-6">Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(frames.details).map(([key, value], idx) => (
                <motion.div 
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                >
                  <div className="text-sm text-gray-500 uppercase tracking-wider mb-1">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <div className="text-base font-medium">{value}</div>
                </motion.div>
              ))}
            </div>
          </motion.div> */}

          {/* <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-serif text-2xl mb-4">The Concept</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              {frames.concept}
            </p>
            <div className="text-lg font-medium">{frames.price}</div>
          </motion.div> */}
        </motion.section>

        {/* NOTEBOOKS SECTION */}
        <motion.section
          id={notebooksCollection.id}
          ref={(el) => { sectionRefs.current[notebooksCollection.id] = el; }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-32 border-t border-gray-200 pt-20 transition-all duration-500"
        >
          <div className="mb-12">
            <motion.div 
              className="flex items-center gap-4 mb-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <notebooksCollection.icon className="w-12 h-12" />
              </motion.div>
              <div>
                <h2 className="font-serif text-5xl md:text-6xl tracking-tight">
                  {notebooksCollection.title}
                </h2>
                <p className="text-xl text-gray-500 mt-2">{notebooksCollection.subtitle}</p>
              </div>
            </motion.div>
            <motion.p 
              className="text-lg text-gray-600 max-w-3xl leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {notebooksCollection.description}
            </motion.p>
          </div>

          {/* Notebooks Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {notebooksCollection.notebooks.map((notebook, idx) => (
              <motion.div
                key={notebook.city}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group"
              >
                <motion.div 
                  className="relative mb-4 overflow-hidden bg-gray-100 shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="aspect-[3/4]">
                    <ImageWithFallback
                      src={notebook.coverImage}
                      alt={`${notebook.city} notebook cover`}
                      className="w-full h-full object-cover group-hover:opacity-0 transition-opacity duration-500"
                    />
                    <ImageWithFallback
                      src={notebook.openImage}
                      alt={`${notebook.city} notebook open`}
                      className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                  </div>
                </motion.div>
                <motion.h3 
                  className="font-serif text-2xl mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {notebook.city}
                </motion.h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {notebook.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Details Grid */}
          {/* <motion.div 
            className="bg-gray-50 p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-serif text-2xl mb-6">Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(notebooksCollection.details).map(([key, value], idx) => (
                <motion.div 
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                >
                  <div className="text-sm text-gray-500 uppercase tracking-wider mb-1">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <div className="text-base font-medium">{value}</div>
                </motion.div>
              ))}
            </div>
          </motion.div> */}

          {/* <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-serif text-2xl mb-4">The Concept</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              {notebooksCollection.concept}
            </p>
            <div className="text-lg font-medium">{notebooksCollection.price}</div>
          </motion.div> */}
        </motion.section>

        {/* TOTE BAGS SECTION */}
        <motion.section
          id={toteBagsCollection.id}
          ref={(el) => { sectionRefs.current[toteBagsCollection.id] = el; }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-32 border-t border-gray-200 pt-20 transition-all duration-500"
        >
          <div className="mb-12">
            <motion.div 
              className="flex items-center gap-4 mb-6"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <toteBagsCollection.icon className="w-12 h-12" />
              </motion.div>
              <div>
                <h2 className="font-serif text-5xl md:text-6xl tracking-tight">
                  {toteBagsCollection.title}
                </h2>
                <p className="text-xl text-gray-500 mt-2">{toteBagsCollection.subtitle}</p>
              </div>
            </motion.div>
            <motion.p 
              className="text-lg text-gray-600 max-w-3xl leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {toteBagsCollection.description}
            </motion.p>
          </div>

          {/* Tote Bags Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {toteBagsCollection.bags.map((bag, idx) => (
              <motion.div
                key={bag.city}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group cursor-pointer"
                onClick={() => {
                  setSelectedProduct(toteBagsCollection);
                  setSelectedImage(bag.image);
                }}
              >
                <div className="relative mb-4 overflow-hidden bg-gray-100 shadow-lg">
                  <div className="aspect-[3/4]">
                    <ImageWithFallback
                      src={bag.image}
                      alt={`${bag.city} tote bag`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                <motion.h3 
                  className="font-serif text-2xl mb-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {bag.city}
                </motion.h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {bag.description}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Details Grid */}
          {/* <motion.div 
            className="bg-gray-50 p-8 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-serif text-2xl mb-6">Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(toteBagsCollection.details).map(([key, value], idx) => (
                <motion.div 
                  key={key}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                >
                  <div className="text-sm text-gray-500 uppercase tracking-wider mb-1">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <div className="text-base font-medium">{value}</div>
                </motion.div>
              ))}
            </div>
          </motion.div> */}

          {/* <motion.div 
            className="max-w-3xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-serif text-2xl mb-4">The Concept</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              {toteBagsCollection.concept}
            </p>
            <div className="text-lg font-medium">{toteBagsCollection.price}</div>
          </motion.div> */}
        </motion.section>

        {/* Availability Note */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl pt-20 border-t border-gray-200"
        >
          <h2 className="font-serif text-4xl mb-6 tracking-tight">Availability</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            All artifacts are available at exhibition venues during the voyage. For inquiries
            about bulk orders for educational institutions or community organizations, please
            contact us directly.
          </p>
          <motion.a
            href="/contact"
            whileHover={{ x: 10 }}
            className="inline-flex items-center gap-2 text-black border-b-2 border-black pb-1 font-medium"
          >
            Contact Us →
          </motion.a>
        </motion.section>

        {/* Image Modal */}
        <AnimatePresence>
          {selectedProduct && selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setSelectedProduct(null);
                setSelectedImage('');
              }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6"
            >
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.1, rotate: 90 }}
                onClick={() => {
                  setSelectedProduct(null);
                  setSelectedImage('');
                }}
                className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors z-10"
              >
                <X size={32} />
              </motion.button>
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-5xl w-full"
              >
                <ImageWithFallback
                  src={selectedImage}
                  alt={selectedProduct.title}
                  className="w-full h-auto max-h-[85vh] object-contain"
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}