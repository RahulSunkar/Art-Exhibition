import type { 
  Artwork, 
  Film, 
  Product, 
  Person, 
  Location, 
  AboutSection, 
  ProcessStep,
  Event 
} from '../types/content';
import TremorsPoster from './FilmsData/Tremor_Poster.jpg';
import TremorsTrailer from './FilmsData/Tremors_Trailer.mp4';
import Termors_Still_1 from './FilmsData/Tremors_Still_1.jpg';
import Termors_Still_2 from './FilmsData/Tremors_Still_2.jpg';
import Termors_Still_3 from './FilmsData/Tremors_Still_3.jpg';  
import Termors_Still_4 from './FilmsData/Tremors_Still_4.jpg';  
import Termors_Still_5 from './FilmsData/Tremors_Still_5.jpg';
import Termors_Still_6 from './FilmsData/Tremors_Still_6.jpg';
import Dushor_Poster1 from './FilmsData/Dushor_Poster1.jpg';
import Dushor_Poster2 from './FilmsData/Dushor_Poster2.jpg';
// import Dushor_Trailer from './FilmsData/Dushor_Trailer.mp4';
import Dushor_Still_1 from './FilmsData/Dushor_Still_1.jpg';
import Dushor_Still_2 from './FilmsData/Dushor_Still_2.jpg';
import Dushor_Still_3 from './FilmsData/Dushor_Still_3.jpg';
import Dushor_Still_4 from './FilmsData/Dushor_Still_4.jpg';
import Dushor_Still_5 from './FilmsData/Dushor_Still_5.jpg';
import Dushor_Still_6 from './FilmsData/Dushor_Still_6.jpg';
import CoffeeTableBook_3 from './ArtifactData/Coffee Table book/AVTP_Square_Book_Mockup_3.jpg';
import Totes from './ArtifactData/ToteBags/LIAB_Tote_Mockup02_001.jpg';
import frams from './ArtifactData/Frames/fd1a2e559fdc66a9ddc161d73e583877_1.jpg';
import NoteBooks from './ArtifactData/Note Books/Bangalore_FrontCOver_Mockup.jpg';


// ============================================
// ARTWORKS - Add/Edit artworks here
// ============================================
export const artworks: Artwork[] = [
  // {
  //   id: 1,
  //   title: 'Displacement Series I',
  //   artist: 'Collective Work',
  //   year: '2026',
  //   medium: 'Mixed Media Photography',
  //   city: 'Chennai',
  //   theme: 'Memory',
  //   image: 'https://images.unsplash.com/photo-1600903781679-7ea3cbc564c3?w=800',
  //   description: 'An exploration of fragmented memory through layered photographic techniques.',
  //   process: 'Created using double exposure of street scenes and portrait photography, this series maps the psychological geography of displacement.'
  // },
  // {
  //   id: 2,
  //   title: 'Invisible Portraits',
  //   artist: 'Various Artists',
  //   year: '2026',
  //   medium: 'Documentary Photography',
  //   city: 'Mumbai',
  //   theme: 'Identity',
  //   image: 'https://images.unsplash.com/photo-1660251406411-589fa0b05604?w=800',
  //   description: 'Portraits of individuals whose stories have been systematically erased from official narratives.',
  //   process: 'Shot on film with intentional grain to evoke analog memory and historical documentation.'
  // },
  // {
  //   id: 3,
  //   title: 'Gallery as Archive',
  //   artist: 'Installation',
  //   year: '2026',
  //   medium: 'Site-Specific Installation',
  //   city: 'Chennai',
  //   theme: 'Space',
  //   image: 'https://images.unsplash.com/photo-1646363976310-ca9509f17260?w=800',
  //   description: 'The gallery space itself becomes a living archive of absence and presence.',
  //   process: 'Architectural photography combined with projection mapping creates immersive spatial narratives.'
  // },
  // {
  //   id: 4,
  //   title: 'Urban Vertices',
  //   artist: 'Collective Work',
  //   year: '2026',
  //   medium: 'Street Photography',
  //   city: 'Mumbai',
  //   theme: 'Place',
  //   image: 'https://images.unsplash.com/photo-1762436933065-fe6d7f51d4f3?w=800',
  //   description: 'Intersection points in the urban landscape where stories converge and diverge.',
  //   process: 'Long exposure night photography capturing movement and stillness simultaneously.'
  // },
  // {
  //   id: 5,
  //   title: 'Temporal Fragments',
  //   artist: 'Various Artists',
  //   year: '2026',
  //   medium: 'Experimental Photography',
  //   city: 'Goa',
  //   theme: 'Memory',
  //   image: 'https://images.unsplash.com/photo-1761973193217-4908920fcad5?w=800',
  //   description: 'Time captured and fractured through experimental photographic processes.',
  //   process: 'Multiple exposures over time create palimpsests of memory—overlapping moments that coexist.'
  // },
  // {
  //   id: 6,
  //   title: 'Voices in Shadow',
  //   artist: 'Collective Work',
  //   year: '2026',
  //   medium: 'Portrait Series',
  //   city: 'Mumbai',
  //   theme: 'Identity',
  //   image: 'https://images.unsplash.com/photo-1663043188237-01565028db93?w=800',
  //   description: 'A series exploring the tension between visibility and vulnerability.',
  //   process: 'High contrast lighting with intentional shadows allows subjects to control their visibility.'
  // },
  // {
  //   id: 7,
  //   title: 'Memory Maps I',
  //   artist: 'Various Artists',
  //   year: '2026',
  //   medium: 'Photographic Collage',
  //   city: 'Chennai',
  //   theme: 'Place',
  //   image: 'https://images.unsplash.com/photo-1600903781679-7ea3cbc564c3?w=800',
  //   description: 'Cartographies of places that exist only in memory and imagination.',
  //   process: 'Collage of photographs, maps, and personal documents creates layered geographical narratives.'
  // },
  // {
  //   id: 8,
  //   title: 'The Unseen Archive',
  //   artist: 'Installation',
  //   year: '2026',
  //   medium: 'Mixed Media',
  //   city: 'Goa',
  //   theme: 'Memory',
  //   image: 'https://images.unsplash.com/photo-1646363976310-ca9509f17260?w=800',
  //   description: 'An archive of what was never archived—stories too marginal to preserve.',
  //   process: 'Combines found photographs, contemporary documentation, and participatory image-making.'
  // },
  // {
  //   id: 9,
  //   title: 'Exploitation Series',
  //   artist: 'Collective Work',
  //   year: '2026',
  //   medium: 'Documentary Photography',
  //   city: 'Mumbai',
  //   theme: 'Labor',
  //   image: 'https://images.unsplash.com/photo-1762436933065-fe6d7f51d4f3?w=800',
  //   description: 'Visual documentation of labor conditions and worker resistance.',
  //   process: 'Documentary photography created in partnership with labor organizers and workers themselves.'
  // },
];

// ============================================
// FILMS - Add/Edit films here
// ============================================
export const films: Film[] = [
  {
    id: 1,
    title: 'Tremors',
    subtitle: 'A Meditation on Memory, Loss, and Endurance',
    description: 'A quiet portrait of an aging man whose daily rituals conceal the lingering tremors of memory, loss, and the will to endure.',
    image: TremorsPoster,
    poster: TremorsPoster,
    videoUrl: TremorsTrailer,
    duration: '19 min',
    year: '2026',
    director: 'Prakash Braggs',
    synopsis: 'An elderly man moves through the quiet architecture of his days—tea measured, steps counted, shadows observed—while an inner world trembles beneath the surface. Memories rise like ghosts: a touch, a voice, a room that no longer exists. The weight of what has been lost settles on his shoulders, a familiar gravity that grows heavier with each season.Outside, the world fractures—distant wars, breaking news, the endless noise of history repeating. Inside, he questions whether beauty can still matter, whether hope is a promise or a habit',
    stills: [
      Termors_Still_1,
      Termors_Still_2,
      Termors_Still_3,
      Termors_Still_4,
      Termors_Still_5,
      Termors_Still_6,
    ],
    screenings: [
      { venue: 'The Visual Art Gallery - India Habitat Centre', city: 'New Delhi', date: 'March 10-14, 2026' },
      { venue: 'Museum of Goa', city: 'Goa', date: 'March 19-24, 2026' },
      { venue: 'Alliance Française of Madras', city: 'Chennai', date: 'March 10-14, 2026' },
    ],
    themes: ['Aging and solitude', 'Time, ritual, and enduranc', 'Loss and emotional aftershocks'],
    languages: ['Bengali','Subtitle-English'],
    credits: [
      { role: 'DOP & Editing', name: 'Prakash Braggs' },
      { role: 'Sound Design', name: 'Prabhat Shetty' },
      { role: 'Executive Producer', name: 'Lopamudra Chaudhuri' },
      { role: 'Produced By', name: 'Chitramaya' },
      { role: 'Story, Screenplay & Direction', name: 'Purandar Chaudhuri' },
      { role: 'Cast', name: 'Ranjit Sen,Ritayan Chaudhuri (Young boy)'},
    ],
  },
  {
    id: 2,
    title: 'Dhushor',
    subtitle: 'A Journey Through the Grey Between Beginning and End',
    description: 'A solitary traveller moves through monochrome landscapes, where silence, memory, and time merge into an inward journey of quiet recognition.',
    image: Dushor_Poster1,
    poster: Dushor_Poster1,
    videoUrl: TremorsTrailer,
    duration: '55:14 min',
    year: '2026',
    director: 'Sachin',
    synopsis: 'Ageless riverbanks, monumental ruins, historic battlefields - A lone traveller wanders around these landscapessearching not for destinations but for the secret pulse of existence itself. A journey through time, memory, and the grey hinterland between origin and finality.',
    stills: [
      Dushor_Still_1,
      Dushor_Still_2,
      Dushor_Still_3,
      Dushor_Still_4,
      Dushor_Still_5,
      Dushor_Still_6,
    ],
     screenings: [
      { venue: 'The Visual Art Gallery - India Habitat Centre', city: 'New Delhi', date: 'March 10-14, 2026' },
      { venue: 'Museum of Goa', city: 'Goa', date: 'March 19-24, 2026' },
      { venue: 'Alliance Française of Madras', city: 'Chennai', date: 'March 10-14, 2026' },
    ],
    themes: ['Journey as inner exploration', 'Time, memory, and impermanence', 'solitude and contemplation'],
    languages: ['Urdu','Hindi','Subtitle-English'],
    credits: [
      { role: 'Cinematography', name: 'Sachin' },
      { role: 'Editor & Cinematic Inputs', name: 'Prakash Braggs' },
      { role: 'Sound Recording & Design', name: 'Prabhat Shetty' },
      { role: 'Executive Produce', name: 'Vishnu Reddy' },
      { role: 'Produced by', name: 'Sai Media & Entertainment & Chitramaya' },
      { role: 'Story, Screenplay & Direction', name: 'Purandar Chaudhuri'},
      { role: 'Traveller', name: 'Chiraag Paul'},
    ],
  },
];

// ============================================
// PRODUCTS - Add/Edit products here
// ============================================
export const products: Product[] = [
  {
    id: 1,
    name: 'Coffee Table Book',
    description: 'Limited Edition',
    image: CoffeeTableBook_3 ,
    category: 'Books',
    details: 'A comprehensive 250-page catalog featuring all artworks, essays by contributors, and behind-the-scenes documentation of the collaborative process.',
    dimensions: '12" × 16"',
    materials: 'Sustainably sourced paper, hardbound',
  },
  {
    id: 2,
    name: 'Totes',
    description: 'Limited Edition',
    image: Totes ,
    category: 'Tote Bags',
    details: 'Screen-printed canvas tote featuring selected artwork. Produced by worker cooperative.',
    dimensions: '15" × 16"',
    materials: 'Organic cotton canvas',
  },
  {
    id: 3,
    name: 'Prints',
    description: 'Limited Edition',
    image: frams,
    category: 'Printed Frams',
    details: 'Museum-quality archival print, signed by contributing artists. Edition of 25.',
    dimensions: '16" × 20"',
    materials: 'Archival pigment print on cotton rag paper',
  },
   {
    id: 4,
    name: 'Art Note Books',
    description: 'Limited Edition',
    image: NoteBooks,
    category: 'Note Books',
    details: 'Handwritten notes and sketches from the artists, signed and numbered.',
    dimensions: '8" × 10"',
    materials: 'Archival pigment print on cotton rag paper',
  },
];

// ============================================
// PEOPLE - Add/Edit people/contributors here
// ============================================
export const people: Person[] = [
  {
    id: 1,
    name: 'Anjali Sharma',
    role: 'Lead Photographer',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    bio: 'Documentary photographer focused on labor rights and urban displacement. Based in Mumbai, working with communities for over 15 years.',
    location: 'Mumbai',
    contribution: 'Urban Vertices Series, Community Workshop Facilitation',
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    role: 'Film Director',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
    bio: 'Experimental filmmaker exploring collaborative documentary practices. Interested in how communities tell their own stories through moving image.',
    location: 'Chennai',
    contribution: 'The Invisible Thread, Memory Maps',
  },
  {
    id: 3,
    name: 'Priya Menon',
    role: 'Curator & Researcher',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    bio: 'Cultural researcher examining histories of migration and displacement in coastal India. PhD in Visual Anthropology.',
    location: 'Goa',
    contribution: 'Exhibition Concept, Archival Research',
  },
  {
    id: 4,
    name: 'Community Collective',
    role: 'Collaborative Contributors',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400',
    bio: 'Over 200 community participants from Chennai, Mumbai, and Goa have contributed stories, images, and insights to this ongoing project.',
    location: 'Chennai, Mumbai, Goa',
    contribution: 'Participatory Photography, Oral Histories, Editorial Input',
  },
  {
    id: 5,
    name: 'Arun Patel',
    role: 'Installation Artist',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    bio: 'Works at the intersection of photography, sculpture, and spatial design. Creates immersive installations that question traditional exhibition formats.',
    location: 'Mumbai',
    contribution: 'Gallery as Archive, Spatial Design',
  },
  {
    id: 6,
    name: 'Lakshmi Iyer',
    role: 'Sound Artist',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    bio: 'Field recording artist and sound designer. Creates sonic landscapes that complement visual narratives.',
    location: 'Chennai',
    contribution: 'Film Soundscapes, Audio Installation',
  },
];

// ============================================
// LOCATIONS - Add/Edit exhibition locations here
// ============================================
export const locations: Location[] = [
  {
    id: 1,
    city: 'New Delhi',
    country: 'India',
    chapter: 'Chapter One',
    status: 'Upcoming',
    date: '10 March - 14 March 2026',
    description: 'The inaugural voyage in New Delhi explored the intersection of colonial legacy and contemporary displacement, mapping stories from fishing communities and urban migrants.',
    venues: ['The Visual Art Gallery - India Habitat Centre'],
    artworks: 156,
    images: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800',
      'https://images.unsplash.com/photo-1600903781679-7ea3cbc564c3?w=800',
    ],
  },
  // { venue: 'The Visual Art Gallery - India Habitat Centre', city: 'New Delhi', date: 'March 10-14, 2026' },
  //     { venue: 'Museum of Goa', city: 'Goa', date: 'March 19-24, 2026' },
  //     { venue: 'Alliance Française of Madras', city: 'Chennai', date: 'March 10-14, 2026' },
  {
    id: 2,
    city: 'Goa',
    country: 'India',
    chapter: 'Chapter Two',
    status: 'Upcoming',
    date: 'March 19-24, 2026' ,
    description:  'Goa\'s chapter explores tourism, displacement, and the erasure of local communities. Working with fishing villages and those pushed out by development.',
    venues: ['Museum of Goa'],
    artworks: 'TBA',
    images: [
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800',
      'https://images.unsplash.com/photo-1660251406411-589fa0b05604?w=800',
    ],
  },
  {
    id: 3,
    city: 'Chennai',
    country: 'India',
    chapter: 'Chapter Three',
    status: 'Upcoming',
    date: 'August - October 2026',
    description: 'Chennai\'s chapter explores the intersection of colonial legacies, urban development, and the erasure of marginalized voices. It features stories from informal settlements and working-class communities.',
    venues: ['Alliance Française of Madras',],
    artworks: 'TBA',
    images: [
      'https://images.unsplash.com/photo-1587922546307-776227941871?w=800',
    ],
  },
];

// ============================================
// ABOUT SECTIONS - Add/Edit about page content here
// ============================================
export const aboutSections: AboutSection[] = [
  {
    id: 1,
    title: 'The Concept',
    content: [
      'A Voyage to Permanence is an ongoing, multi-city art and photography exhibition that explores themes of exploitation, memory, displacement, and the invisible threads connecting communities across geographical and temporal boundaries.',
      'Unlike traditional exhibitions, A Voyage to Permanence is not a static event. It is a living archive that grows, transforms, and adapts as it moves through different cities, engaging with local communities and incorporating their stories into the broader narrative.',
      'At its core, this project asks: How do we document lives that exist at the margins? How do we create ethical representations of exploitation without reproducing it? How can art serve as both witness and catalyst for social change?',
    ],
    image: 'https://images.unsplash.com/photo-1600903781679-7ea3cbc564c3?w=800',
    order: 1,
  },
  {
    id: 2,
    title: 'Our Methodology',
    content: [
      'Every aspect of this exhibition—from concept to execution—is collaborative. We work directly with communities, ensuring they have agency over how their stories are told, which images are shown, and how they are represented.',
      'Our process involves months of community engagement, workshops, participatory photography sessions, and ongoing dialogue. Participants are not subjects—they are co-creators, with equal say in editorial decisions.',
      'We employ experimental photographic techniques—double exposure, film grain, layering, collage—to create images that reflect the complexity of memory and displacement. Each technical choice serves our ethical framework.',
    ],
    image: 'https://images.unsplash.com/photo-1660251406411-589fa0b05604?w=800',
    order: 2,
  },
  {
    id: 3,
    title: 'Why This Matters',
    content: [
      'Exploitation leaves traces—sometimes visible, often not. This exhibition seeks to make the invisible visible, to create space for stories that are systematically excluded from official narratives.',
      'By centering community voices and collaborative practices, we challenge traditional power dynamics in documentary and art-making. This is not extractive photography—it is a shared process of meaning-making.',
      'The exhibition extends beyond gallery walls through publications, films, workshops, and ongoing community engagement. It is designed to be a resource, not just a spectacle.',
    ],
    image: 'https://images.unsplash.com/photo-1646363976310-ca9509f17260?w=800',
    order: 3,
  },
];

// ============================================
// PHOTOGRAPHY PROCESS STEPS
// ============================================
export const photographyProcess: ProcessStep[] = [
  {
    id: 1,
    icon: 'Lightbulb',
    title: 'Concept & Collaboration',
    description: 'Every photograph begins with conversation. We work with communities to understand their stories, their histories, what they want to share and what they want to keep private.',
    image: 'https://images.unsplash.com/photo-1600903781679-7ea3cbc564c3?w=800',
  },
  {
    id: 2,
    icon: 'Users',
    title: 'Community Partnership',
    description: 'We don\'t photograph subjects—we collaborate with participants. Each person involved has agency over their representation, choosing how they want to be seen, if they want to be seen at all.',
    image: 'https://images.unsplash.com/photo-1663043188237-01565028db93?w=800',
  },
  {
    id: 3,
    icon: 'Camera',
    title: 'Experimental Techniques',
    description: 'Using double exposure, film grain, analog processes, and digital manipulation, we create layered images that reflect the complexity of memory and displacement. Each technique is chosen intentionally.',
    image: 'https://images.unsplash.com/photo-1660251406411-589fa0b05604?w=800',
  },
  {
    id: 4,
    icon: 'Film',
    title: 'Development & Iteration',
    description: 'Photos are reviewed with participants before exhibition. We adjust, revise, and sometimes start over based on feedback. The final image is always a collaborative decision.',
    image: 'https://images.unsplash.com/photo-1646363976310-ca9509f17260?w=800',
  },
];

// ============================================
// PRODUCT CREATION PROCESS
// ============================================
export const productProcess: ProcessStep[] = [
  {
    id: 1,
    icon: 'Palette',
    title: 'Design Philosophy',
    description: 'Each artifact begins with a question: How can this object extend the exhibition beyond gallery walls? How can it carry memory forward? We design with intention, ensuring every element aligns with our values.',
    image: 'https://images.unsplash.com/photo-1552916353-1ce86325841d?w=800',
  },
  {
    id: 2,
    icon: 'BookOpen',
    title: 'Content Curation',
    description: 'Working with participants, we curate which images, stories, and documents to include. This is a collaborative editorial process where contributors have final say over their representation.',
    image: 'https://images.unsplash.com/photo-1600903781679-7ea3cbc564c3?w=800',
  },
  {
    id: 3,
    icon: 'Scissors',
    title: 'Ethical Production',
    description: 'We partner exclusively with worker cooperatives and fair-wage producers. Materials are sustainably sourced. Production timelines respect workers\' needs. Quality over speed, always.',
    image: 'https://images.unsplash.com/photo-1646363976310-ca9509f17260?w=800',
  },
  {
    id: 4,
    icon: 'Package',
    title: 'Distribution & Access',
    description: 'Artifacts are priced to cover production costs, not to generate profit. Proceeds support the ongoing exhibition and community partners. We also provide free copies to participants and community organizations.',
    image: 'https://images.unsplash.com/photo-1761973193217-4908920fcad5?w=800',
  },
];

// ============================================
// EVENTS - Add/Edit upcoming events here
// ============================================
export const events: Event[] = [
  {
    id: 1,
    title: 'Mumbai Exhibition',
    location: 'Dr. Bhau Daji Lad Museum',
    date: 'April - July 2026',
    type: 'Exhibition',
  },
  {
    id: 2,
    title: 'Goa Opening',
    location: 'Sunaparanta Centre',
    date: 'August 2026',
    type: 'Opening',
  },
  {
    id: 3,
    title: 'Artist Talk',
    location: 'Project 88 Mumbai',
    date: 'May 15',
    type: 'Talk',
  },
  {
    id: 4,
    title: 'Film Screening',
    location: 'The Invisible Thread',
    date: 'June 20',
    type: 'Screening',
  },
  {
    id: 5,
    title: 'Workshop',
    location: 'Collaborative Photography',
    date: 'July 5',
    type: 'Workshop',
  },
];

// ============================================
// HERO VIDEOS - Change promo and hero videos here
// ============================================
export const videos = {
  promoVideo: 'https://cdn.coverr.co/videos/coverr-black-and-white-portrait-of-a-man-4580/1080p.mp4',
  heroVideo: 'https://cdn.coverr.co/videos/coverr-black-and-white-portrait-of-a-man-4580/1080p.mp4',
  aboutVideo: 'https://cdn.coverr.co/videos/coverr-a-man-stands-in-front-of-a-window-7417/1080p.mp4',
};