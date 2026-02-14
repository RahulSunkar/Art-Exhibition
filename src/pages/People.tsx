import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import Purandar_Chaudhuri from '../data/Artist Images/WhatsApp Image 2026-01-03 at 21.15.58.jpeg';
import Prakash_Braggs from '../data/Artist Images/Portrait_Prakash_BW.jpg';
import Nemiraj_Shetty from '../data/Artist Images/Nemiraj_Portrait.jpg';
import jayanth from '../data/Artist Images/Jayanth_Portrait2.jpg';
import Jooby_Yohannan from '../data/Artist Images/Joby_Portrait-topaz-upscale-2x-face.jpeg';
import Dr_S_Boominathan from '../data/Artist Images/DR.BHOOMINATIION.jpg';
import Johny_ML from '../data/Artist Images/Johny_ML.jpg';
export function People() {
  const voices = [
    {
      id: 1,
      name: 'Purandar Chaudhuri',
      location: 'Bengaluru ',
      story: 'Purandar is a self-taught, independent film maker and an avid cinephile. His love for Cinema began during his growing up days in Calcutta with the movies of Chaplin, Satyajit Ray, Ritwik Ghatak and Mrinal Sen; over the years he also got opportunities to watch the films of some of the finest auteurs of World Cinema whose works have made a  profound impact on him and inspired him to pursue film as an experimental art form. He largely uses monochrome as a medium to tell all  his stories; they have sparse dialogues and high on visual and aural content. ‘Dhushor’ marks his first feature film, followed by ‘Tremors’  &  ‘Fragmented & Broken Impressions’ which got completed in the last 12 months.',
      image: Purandar_Chaudhuri,
      theme: 'Director',
    },
    {
      id: 2,
      name: 'Prakash Braggs',
      location: 'Bengaluru',
      story: 'Prakash is a Graduate of the prestigious Brooks Institute in Santa Barbara, USA and has more than two decades of experience in advertising, food, product, and architecture photography with top global brands. Along with commercial photography he has deep interests in Cinematography, Photography as an art form and explore the alternative, historic processes; many of which he has mastered during his time at Brooks. He enjoys mentoring students, conducting and attending workshops and he is currently working on a project which explores a range of  alternative processes like Cyanotype, Kallitype, Platinum palladium, Ambrotype, Salt-print and Silver gelatine',
      image:Prakash_Braggs,
      theme: 'Photography Artist | Co-Director',
    },
    {
      id: 3,
      name: 'Nemiraj Shetty',
      location: 'Mangaluru',
      story: 'Nemiraj is a visual artist, art educator, and curator. He holds an MFA in Art Critical Theories and Art History from The Maharaja Sayajirao University of Baroda and has trained in printmaking at the Lalit Kala Studios, New Delhi. He has taught Art History and Visual Theories at distinguished institutions including NIFT Hyderabad; Bangalore University; LP University Punjab; and the Nitte Institute of Communication and Architecture, Mangaluru. A writer and art journalist, his work has appeared in The Indian Express, Deccan Chronicle, and Andhra Pradesh Times. He is based in Mangaluru and works on archival initiatives in the Tulu-speaking districts of Karnataka and Kerala and serves as Secretary of Art Kanara Trust and Co-convenor of the INTACH',
      image:  Nemiraj_Shetty,
      theme: 'Designer | Creative inputs',
    },
    {
      id: 4,
      name: 'Jayanth Kodkani',
      location: 'Bengaluru',
      story: 'Jayanth is a writer, journalist and an arts buff who has written extensively on social and cultural topics. He is an avid enthusiast of literature and cinema, with a few published essays and reviews to his name. His fiction and essays have been part of anthologies like the "Puffin Book of Funny Stories", "Where the Rain is Born" and "Dots and Lines". He has co-edited an anthology called, "Beantown Boomtown: Bangalore in the World of Words". Among his translations are “Two Plays”, the Kannada works of Akshara K V. His write-ups on cricket have appeared in the Wisden Almanack and the anthology, “Playback: Sports Legends of Bangalore”, apart from an online blog called Cat’s Cradle for The Times of India. He has tried to explore local histories of the game in his new book, “Red Cherries on the Canara Coast: The story of cricket in Mangaluru and Udupi”.Jayanth was Associate Resident Editor of The Times of India',
      image: jayanth,
      theme: 'Author | Columnist',
    },
    {
      id: 5,
      name: 'Jooby Yohannan',
      location: 'Bengaluru',
      story: 'Jooby Yohannan is an art curator and cultural practitioner who began with promoting an artist to working in a gallery to becoming an independent art curator. Over the years with deep interest in storytelling across art, film, and lived experience, his work bridges visual arts, cinema and contemporary thoughts; creating meaningful dialogues between creators and audiences. His curatorial approach values authenticity, artistic integrity, and context. Jooby was associated with Time & Space Gallery, one of the most respected Art Spaces in Bangalore',
      image: Jooby_Yohannan,
      theme: 'LEAD Curator',
    },
    {
      id: 6,
      name: 'Dr. S Boominathan',
      location: 'Tamil Nadu',
      story: 'Dr. S Boominathan has completed his  Diploma in Design and Direction from the National School of Drama, New Delhi – widely regarded as the foremost theatre school  in India & finest in the world and Doctorate in Literature from the Chennai university.  He is also the founder and director of Bhooloham theatre trust in Dindigul. He was one of the faculty at Anupam Kher’s Actor Prepares and Radaan media works, Chennai. He has worked in more than 45 colleges as theatre practitioner. He was organiser of the theatre festival like Terukuththu festival, children theatre festival in Tamil Nadu. He has acted in more than 35 plays, directed and designed more than 53 plays such as Tartuffe, Forest, Prasatham, Towards the Gap, Not Like you,  Ajeeb Dastan and many others. He conducts Children’s theatre workshops in India & abroad.',
      image: Dr_S_Boominathan,
      theme: 'Theatre Practitioner | Educator',
    },
    {
      id:7,
      name:'Johny ML',
      location:'Delhi',
      story:'Johny ML is an art historian, critic, curator and writer. He has three postgraduate degrees in Creative Curating, Art History and Criticism, and English Language and Literature. His writings related to arts, culture and politics have been published in several print magazines like Art and Deal, Lalit Kala Contemporary, Creative Mind, Arts Illustrated, Art India Magazine, and newspapers and weeklies in English and in Malayalam. He also founded and edited many popular online art journals. He is one of the pioneering curators in India who worked towards bringing respect to curatorial practice. In the 2009 he undertook a journey across India to research on how art and art history are taught in small town art colleges. He has curated high profile group shows and camps all over the country. ',
      image: Johny_ML,
      theme:  'Art Historian | Curator',
    }
    
    ];

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h1 className="font-serif text-6xl md:text-8xl mb-8 tracking-tight">
            People & Voices
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            At the heart of A Voyage to Permanence are the voices of those often rendered invisible—
            migrant workers, displaced communities, the uncounted and unheard. These are their
            stories, shared with consent and in partnership.
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24 max-w-4xl"
        >
          <h2 className="font-serif text-4xl mb-8 tracking-tight">
            Centering the Invisible
          </h2>
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              This exhibition exists because of the generosity of individuals who chose to
              share their experiences, their memories, their truths. Every story here was
              recorded with full consent. Every image was taken in collaboration. Every voice
              chose to be heard.
            </p>
            <p>
              We don't claim to speak for anyone. We create space for people to speak for
              themselves—on their own terms, in their own languages, with their own
              frameworks of understanding.
            </p>
          </div>
        </motion.section>

        {/* Voices Grid */}
        <div className="space-y-24">
          {voices.map((voice, index) => (
            <motion.article
              key={voice.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-dense' : ''
              }`}
            >
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="aspect-[3/4] bg-muted overflow-hidden">
                  <ImageWithFallback
                    src={voice.image}
                    alt={voice.name}
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
              </div>

              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <div>
                  <div className="inline-block px-3 py-1 bg-muted text-sm mb-4">
                    {voice.theme}
                  </div>
                  <h3 className="font-serif text-4xl md:text-5xl mb-2 tracking-tight">
                    {voice.name}
                  </h3>
                  <p className="text-muted-foreground">{voice.location}</p>
                </div>

                <blockquote className="text-xl leading-relaxed border-l-2 border-accent pl-6 italic">
                  "{voice.story}"
                </blockquote>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Participation Section */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32 pt-20 border-t border-foreground/10 max-w-4xl"
        >
          <h2 className="font-serif text-4xl md:text-5xl mb-8 tracking-tight">
            Share Your Story
          </h2>
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground mb-8">
            <p>
              A Voyage to Permanence is an ongoing project. We continue to collect stories,
              testimonies, and experiences from communities around the world. If you would
              like to contribute your voice to this work, we would be honored to listen.
            </p>
            <p>
              All participation is voluntary and collaborative. You maintain full control over
              how your story is told, what is shared, and how you are represented. We work
              with consent at every stage of the process.
            </p>
          </div>
          <motion.a
            href="/contact"
            whileHover={{ x: 10 }}
            className="inline-flex items-center gap-2 text-accent border-b border-accent pb-1"
          >
            Get in Touch
          </motion.a>
        </motion.section>
      </div>
    </div>
  );
}
