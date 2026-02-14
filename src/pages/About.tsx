import { motion } from 'motion/react';

export function About() {
  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-serif text-6xl md:text-8xl mb-16 tracking-tight">
            About the Exhibition
          </h1>

          <div className="space-y-16">
            <section>
              <h2 className="font-serif text-4xl mb-8 tracking-tight">The Concept</h2>
              <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                <p>
                  A Voyage to Permanence emerges from a simple yet profound realization: that
                  exploitation leaves its most enduring marks not in what is visible, but in
                  what remains invisible. In the stories never told. In the faces never
                  photographed. In the voices never recorded.
                </p>
                <p>
                  This exhibition seeks to make visible these absences. Not by filling them
                  with our own narratives, but by creating space for their echoes. By
                  acknowledging that sometimes the most powerful documentation is the
                  documentation of what cannot be documented.
                </p>
                <p>
                  We work with experimental photography, layered narratives, and cinematic
                  techniques to create what we call "vertices"—intersection points where
                  memory, place, and human experience converge. Each vertex is a portal
                  into a larger story, a fragment that suggests the whole.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-4xl mb-8 tracking-tight">
                The Meaning of "A Voyage to Permanence"
              </h2>
              <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                <p>
                  A voyage that never ends. A journey that exists in perpetual motion, across
                  geographies, through time, within consciousness. The permanence is not in
                  arrival but in movement itself—the continuous displacement and reconnection
                  that defines the human experience in our current moment.
                </p>
                <p>
                  We carry our voyages with us. The places we've left. The people we've lost.
                  The futures we imagined but never reached. This exhibition documents these
                  invisible journeys, the permanent states of transition that shape who we are.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-4xl mb-8 tracking-tight">
                Exploitation of the …
              </h2>
              <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                <p>
                  The ellipsis is intentional. The sentence remains unfinished because
                  exploitation operates through omission. Through the words not spoken.
                  Through the subjects not named. Through the systems so normalized they
                  become invisible.
                </p>
                <p>
                  Our work explores various forms of exploitation—of labor, of land, of
                  memory, of image—but always through the lens of what is left unsaid.
                  The subtitle is both accusation and invitation: What fills that silence
                  depends on who is listening.
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-4xl mb-8 tracking-tight">Philosophy</h2>
              <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
                <p>
                  We believe that art and photography have a responsibility to the invisible.
                  Not to make them visible in a way that exploits their invisibility, but to
                  create frameworks where visibility becomes a choice rather than an
                  extraction.
                </p>
                <p>
                  Every image in this exhibition has been created in collaboration with its
                  subjects, whether living or remembered. Every film includes voices that
                  chose to be recorded. Every artifact represents consent and partnership.
                </p>
                <p>
                  This is an exhibition about ethics as much as aesthetics. About the
                  responsibility that comes with the power to represent. About using that
                  power not to speak for others, but to amplify what they choose to say.
                </p>
              </div>
            </section>

            <section className="border-t border-foreground/10 pt-16">
              <h2 className="font-serif text-4xl mb-8 tracking-tight">The Team</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl mb-2">Curatorial Direction</h3>
                  <p className="text-muted-foreground">
                    A collective of artists, photographers, filmmakers, and community
                    organizers working across continents to build this ongoing project.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl mb-2">Collaborators</h3>
                  <p className="text-muted-foreground">
                    Over 200 artists and 1000+ community members have contributed to the
                    creation of this exhibition, each bringing their unique perspective and
                    experience to the work.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl mb-2">Advisory Board</h3>
                  <p className="text-muted-foreground">
                    Scholars, activists, and practitioners from fields including anthropology,
                    migration studies, memory work, and visual culture guide our methodology
                    and approach.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
