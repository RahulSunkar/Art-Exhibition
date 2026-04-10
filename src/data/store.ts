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

//Hero Video
import heroVideo from './hero_video.mp4';
import eventCatalogCover from './EventData/poster_page-0001.jpg';

//Films Behind the scenes pics

import TremorsPoster from './FilmsData/Tremor_Poster.jpg';
import Termors_Still_1 from './FilmsData/Tremors_Still_1.jpg';
import Termors_Still_2 from './FilmsData/Tremors_Still_2.jpg';
import Termors_Still_3 from './FilmsData/Tremors_Still_3.jpg';  
import Termors_Still_4 from './FilmsData/Tremors_Still_4.jpg';  
import Termors_Still_5 from './FilmsData/Tremors_Still_5.jpg';
import Termors_Still_6 from './FilmsData/Tremors_Still_6.jpg';

import Dushor_Poster1 from './FilmsData/Dushor_Poster1.jpg';
import Dushor_Poster2 from './FilmsData/Dushor_Poster2.jpg';
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
import impressionOfmingling_Poster from './FilmsData/Impression_Of_mingling_Poster_01.jpg';


import  Image1 from "./Prints/_MG_7051.jpg"
import  Image2 from "./Prints/_MG_7054.jpg"
import  Image3 from "./Prints/_MG_7058.jpg"
import  Image4 from "./Prints/_MG_7061.jpg"
import  Image5 from "./Prints/_MG_7064.jpg"
import  Image6 from "./Prints/_MG_7065.jpg"
import  Image7 from "./Prints/_MG_7069.jpg"
import  Image8 from "./Prints/_MG_7072.jpg"
import  Image9 from "./Prints/_MG_7075.jpg"
import  Image10 from "./Prints/_MG_7078.jpg"
import  Image11 from "./Prints/_MG_7082.jpg"
import  Image12 from "./Prints/_MG_7085.jpg"
import  Image13 from "./Prints/_MG_7089.jpg"
import  Image14 from "./Prints/_MG_7092.jpg"
import  Image15 from "./Prints/_MG_7096.jpg"
import  Image16 from "./Prints/_MG_7099.jpg"
import  Image17 from "./Prints/_MG_7102.jpg"
import  Image18 from "./Prints/_MG_7106.jpg"
import  Image19 from "./Prints/img20260301_21384670.jpg"
import  Image20 from "./Prints/img20260301_21390740.jpg"
import Image21 from "./Prints/img20260301_21405188.jpg"
import Image22 from "./Prints/img20260301_21430439.jpg"
import Image23 from "./Prints/img20260301_21432968.jpg"
import Image24 from "./Prints/img20260301_21462558.jpg"
import Image25 from "./Prints/img20260301_21464608.jpg"
import Image26 from "./Prints/img20260301_21505561.jpg"
import Image27 from "./Prints/img20260301_21552459.jpg"
import Image28 from "./Prints/img20260301_21580630.jpg"
import Image29 from "./Prints/img20260301_21592970.jpg"
import Image30 from "./Prints/img20260301_22012747.jpg"
import Image31 from "./Prints/img20260301_22030648.jpg"
import Image32 from "./Prints/img20260301_22054456.jpg"

import LivePerformanceposter from './Prints/_MG_7058.jpg';



// YouTube Trailer URLs
const ImperssionOfMingling_Trailer = 'https://www.youtube.com/embed/nJjkydJAnUA';
const Dushor_Trailer = 'https://www.youtube.com/embed/74fDOTXxVg4';
const TremorsTrailer = 'https://www.youtube.com/embed/S0-et8N_FPM';
const Dr_Boominathan_Performance = 'https://www.youtube.com/embed/BFuHZIS9E1Q';
const curator_notes_video ='https://www.youtube.com/embed/SKI9xEtVZy4';
const curator_notes_video2 = 'https://www.youtube.com/embed/8n33vEKe7zA';


// Voice of audience videos
const reviewVideo1 = 'https://www.youtube.com/embed/vG9vSY8I070';
const reviewVideo2 = 'https://www.youtube.com/embed/BNDL0Uh0_0Y';
const reviewVideo3 = 'https://www.youtube.com/embed/X8g7Wvck1iY';
const reviewVideo4 = 'https://www.youtube.com/embed/07ECs6Hnvy0';
const reviewVideo5 = 'https://www.youtube.com/embed/KXIixLTzmCs';




// ARTWORKS - Add/Edit artworks here

export const artworks = [
  Image1, Image12, Image4, Image5, Image6, Image7, Image8,
  Image9, Image10, Image11, Image13, Image14, Image15, Image16,
  Image17, Image18, Image19, Image20, Image21, Image22, Image23, Image24,
  Image25, Image26, Image27, Image28, Image29, Image30, Image31, Image32, Image3,Image2
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
    videoUrl: Dushor_Trailer,
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
   {
    id: 3,
    title: 'Impressions of Mingling',
    subtitle: '',
    description: ' ',
    image: impressionOfmingling_Poster,
    poster: impressionOfmingling_Poster,
    videoUrl: ImperssionOfMingling_Trailer,
    duration: '36 min',
    year: '2026',
    director: 'Sachin',
    stills: [
      Image1,
      Image2,
      Image3,
      Image4,
      Image5,
      Image6,
      Image7,
      Image8,
      Image9,
      Image10,
      Image11,
      Image12,
      Image13,],
     screenings: [
      { venue: 'The Visual Art Gallery - India Habitat Centre', city: 'New Delhi', date: 'March 10-14, 2026' },
      { venue: 'Museum of Goa', city: 'Goa', date: 'March 19-24, 2026' },
      { venue: 'Alliance Française of Madras', city: 'Chennai', date: 'March 10-14, 2026' },
    ],
    themes: ['Journey as inner exploration', 'Time, memory, and impermanence', 'solitude and contemplation'],
    languages: ['Urdu','Hindi','Subtitle-English'],
    credits: [
      { role: 'Alternative Photography Prints & Editing ', name: 'Prakash Braggs' },
      { role: 'Sound Design', name: 'Prakash Braggs & Purandar Chaudhuri' },
      { role: 'Music', name: 'Michal Krupa ( Piano)' },
      { role: 'Voice over Artists', name: 'Naimunnisa Khan & Tyrone Pope'},
      { role: 'Voice over Script', name: ' ‘Kohinoor’ by Sangeeta Ghoshal' },
      {role :'Story, Idea & Direction', name: 'Purandar Chaudhuri'},
      {role :"Produced by", name: 'Chitramaya'},
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
    details: 'A comprehensive 250-page catalogue featuring all artworks, essays by contributors, and behind-the-scenes documentation of the collaborative process.',
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
// LOCATIONS - Add/Edit exhibition locations here
// ============================================
export const locations: Location[] = [
  {
    id: 1,
    city: 'New Delhi',
    country: 'India',
    chapter: 'Chapter One',
    status: 'Complete',
    date: '10 March - 14 March 2026',
    description: '',
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
// EVENTS - Add/Edit upcoming events here
// ============================================
export const events: Event[] = [
  {
    id: 1,
    location: 'India Habitat Centre , New Delhi',
    title: 'The Voyage - Delhi',
    date: 'March 10-14, 2026',
    type: 'Exhibition',
    subtitle: 'Delhi chapter of A Voyage to Permanence',
    summary: 'The opening chapter in New Delhi unfolds as a layered encounter between cinema, alternative print practice, performance, and public conversation.',
    bgVideo: heroVideo,
    curatorNote: 'A Voyage to Permanence is a tribute to humanity and its trials and tribulations, without raising slogans or resorting to propagandist visual sensibility.',
    curatorVideos: [curator_notes_video, curator_notes_video2],
    curatorByline: 'Johny ML',
    catalog: {
      title: '',
      description: 'A downloadable exhibition catalog for the India Habitat Centre chapter, designed to be browsed page by page like a moving book.',
      image: eventCatalogCover,
      pdfUrl: '/A Voyage to Permanence_IHC_Delhi_Catlogue.pdf',
      items: [
        { name: 'Exhibition Note', details: 'Curatorial framing, chapter context, and exhibition overview.' },
        { name: 'Visual Archive', details: 'Selected prints, stills, and installation moments from the Delhi presentation.' },
        { name: 'Public Memory', details: 'A collectible document audiences can browse online or download as a keepsake.' },
      ],
    },
    performanceVideos: [
      {
        title: '',
        description: 'A live performance blending oral narrative, experimental sound, and looped visuals from the exhibition archive.',
        videoUrl: Dr_Boominathan_Performance,
      },
    ],
    voiceOfAudience: [
      { videoUrl: reviewVideo1 },
      { videoUrl: reviewVideo2 },
      { videoUrl: reviewVideo3 },
      { videoUrl: reviewVideo4 },
      { videoUrl: reviewVideo5 },
    ],
    reviewsAndPics: [
      {
        title: 'Delhi Exhibition Visitors Thoughts',
        author: 'Athmaja A B',
        review: 'The artistic rendering through visual and auditory experience moved me profoundly. The art spreads through the mind and physical space.',
        image: '',
        rating: 5,
      },
      {
        title: 'Delhi Exhibition Visitors Thoughts',
        author: 'Akansha',
        review: "The movie was amazing, can't imagine the black and white picture has this much deep thoughts, the coverage is wonderful. Waiting to watch the next one.",
        image: '',
        rating: 5,
      },
      {
        title: 'Delhi Exhibition Visitors Thoughts',
        author: 'Hiroaki Shinada',
        review: 'Abundance and depletion has become one more theme that I can photograph and express. Thank you.',
        image: '',
        rating: 5,
      },
      {
        title: 'Delhi Exhibition Visitors Thoughts',
        author: 'Dhurv Soni',
        review: 'A new aspect, new idea and well presented. Felt too good.',
        image: '',
        rating: 5,
      },
      {
        title: 'Delhi Exhibition Visitors Thoughts',
        author: 'Narender Ak Gupta',
        review: 'Simply superb works.',
        image: '',
        rating: 5,
      },
      {
        title: 'Delhi Exhibition Visitors Thoughts',
        author: 'Shreya Kanoi',
        review: 'Outstanding photographs! Love the compositions, the blackness of the black and the details of the greys! Great work. Great work. Would love to see such exhibits over and over again.',
        image: '',
        rating: 5,
      },
      {
        title: 'Delhi Exhibition Visitors Thoughts',
        author: 'O Aggarwal',
        review: 'Amazing movie! Loved the idea behind it and outstanding.',
        image: '',
        rating: 5,
      },
      {
        title: 'Delhi Exhibition Visitors Thoughts',
        author: 'Vivek Namdev',
        review: 'The documentary showed a depth of human emotions and its journey. Very well explained the concept and meaning of old age. The Tremors is a well presented documentary.',
        image: '',
        rating: 5,
      },
      {
        title: 'Delhi Exhibition Visitors Thoughts',
        author: 'S Verma',
        review: 'Touched deeply!',
        image: '',
        rating: 5,
      },
      {
        title: 'Delhi Exhibition Visitors Thoughts',
        author: 'P. Sainath',
        review: 'Brilliant and riveting!',
        image: '',
        rating: 5,
      },
      {
        title: 'Delhi Exhibition Visitors Thoughts',
        author: 'Tabriz Waris',
        review: 'Such an immersive and mystical experience, beautifully shot and the frames move you from inside. Keep creating. Love from Delhi.',
        image: '',
        rating: 5,
      },
      {
        title: 'Delhi Exhibition Visitors Thoughts',
        author: 'Manvi',
        review: 'Spell-binding visuals. A journey into timelessness.',
        image: '',
        rating: 5,
      },
      {
        title: 'Delhi Exhibition Visitors Thoughts',
        author: 'Sangeeta Gupta',
        review: 'Touches a deep chord - Dhushor - a collective consciousness where we are done - I thought it was the end of dawn but it was dusk - so it really a blur.',
        image: '',
        rating: 5,
      },
      {
        title: 'Delhi Exhibition Visitors Thoughts',
        author: 'Jasbirat Singh',
        review: 'It is always lovely to see something raw and original.',
        image: '',
        rating: 5,
      },
      {
        title: 'Delhi Exhibition Visitors Thoughts',
        author: 'Ayushi',
        review: 'I thought at the start of the movie it was about grappling loneliness, but the name of the movie was justified at the end. It is truly enriching to know that the movie has enlightened us about Tremors. Nice movie!',
        image: '',
        rating: 5,
      },
      {
        title: 'Delhi Exhibition Visitors Thoughts',
        author: 'Rakesh Sharma',
        review: "A Voyage to Permanence - visual poetry depicting the sheer handwork of our backbone, i.e. our own brothers and sisters working day in and day out, putting their own bodies in all sorts of conditions so that we may enjoy our materialistic privileges. It's an empathic tribute to and acknowledgement of our backbone with iron steel spine.",
        image: '',
        rating: 5,
      },
      {
        title: 'Delhi Exhibition Visitors Thoughts',
        author: 'Ranjeev Sachdeva',
        review: "Very impressive work, very unique and artistic approach, the studio and gallery is vibrating with Purandar Sir's excellence both behind the camera and in presence too. Keep shining!",
        image: '',
        rating: 5,
      },
      {
        title: 'Delhi Exhibition Visitors Thoughts',
        author: 'BJ',
        review: 'Impression of Mingling provides a dual perspective of stillness and movement - permanent and transient - on the road and on the side path - dynamic and static.',
        image: '',
        rating: 5,
      },
      {
        title: 'Delhi Exhibition Visitors Thoughts',
        author: 'Aditi Raj Sharda',
        review: 'Intriguing is the 1st word that bleeds through. Ch1 introduces melancholy. Ch2 expands on the tonality of dread and melancholy. Ch3 concludes the perception of it. Eccentric composition of light and shadows, contrast, dullness and sharpness, flora and fauna.',
        image: '',
        rating: 5,
      },
      {
        title: 'Delhi Exhibition Visitors Thoughts',
        author: 'Biju V',
        review: "I feel it's real - it's not purposefully shouted - fantastic. People should have patience to watch these films. Must watch!",
        image: '',
        rating: 5,
      },
    ],
    relatedPages: [
      { label: 'Films', path: '/films' },
      { label: 'Gallery', path: '/gallery' },
      { label: 'Contact (Feedback)', path: '/contact' },
      { label: 'Media', path: '/media' },
    ],
  }
];
