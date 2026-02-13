import { motion, AnimatePresence } from 'motion/react';
import { Mail, MapPin, Send, Phone, FileText, CheckCircle2, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

export function Contact() {
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // EmailJS configuration - REPLACE THESE WITH YOUR ACTUAL IDs
      const serviceID = 'service_j90ofgc';
      const templateID = 'template_bc2d3qp';
      const publicKey = 'wjlqdCBGhtP_I80t7';

      // Send email using EmailJS
      await emailjs.send(
        serviceID,
        templateID,
        formData,  // This sends the form data with correct field names
        publicKey
      );

      setIsSubmitted(true);
      setIsSubmitting(false);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsSubmitting(false);
      alert('Failed to send message. Please try again or email us directly at srahulcs100@gmail.com');
    }
  };

  const handleResend = () => {
    setIsSubmitted(false);
    setFormData({
      from_name: '',
      from_email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h1 className="font-serif text-6xl md:text-8xl mb-6 tracking-tight">
            CHITRAMAYA
          </h1>

          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Art. Exhibition. Cultural Production.  
            We welcome collaborations, exhibition hosting inquiries, 
            and institutional partnerships.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* LEFT SIDE - Company Information */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-14"
          >

            {/* Registered Office */}
            <section>
              <h2 className="font-serif text-3xl mb-8 tracking-tight">
                Registered Office
              </h2>

              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 mt-1 text-accent" />
                <div className="text-muted-foreground leading-relaxed">
                  <p>No. 13-14 1st Floor, S V Complex</p>
                  <p>Navodaya Nagar, Kothanur Main Road</p>
                  <p>J P Nagar 7th Phase</p>
                  <p>Bangalore - 560078</p>
                  <p>Karnataka, India</p>
                </div>
              </div>
            </section>

            {/* Contact Details */}
            <section>
              <h2 className="font-serif text-3xl mb-8 tracking-tight">
                Contact Details
              </h2>

              <div className="space-y-6">

                {/* Email */}
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 mt-1 text-accent" />
                  <div>
                    <h3 className="mb-2">Email</h3>
                    <a
                      href="mailto:prakashbraggs@chitramaya.in"
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      prakashbraggs@chitramaya.in
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 mt-1 text-accent" />
                  <div>
                    <h3 className="mb-2">Phone</h3>
                    <a
                      href="tel:+919148402311"
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      +91 91484 02311
                    </a>
                  </div>
                </div>

                {/* GST */}
                <div className="flex items-start gap-4">
                  <FileText className="w-6 h-6 mt-1 text-accent" />
                  <div>
                    <h3 className="mb-2">GST Number</h3>
                    <p className="text-muted-foreground">
                      29AATFC9353K1ZK
                    </p>
                  </div>
                </div>

              </div>
            </section>

            {/* Business Areas */}
            <section>
              <h2 className="font-serif text-3xl mb-6 tracking-tight">
                Areas of Work
              </h2>

              <div className="space-y-6">

                <div className="border-l-2 border-accent pl-6">
                  <h3 className="mb-2">Exhibition Hosting</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Partner with us to host curated exhibitions and cultural
                    showcases across institutions and independent venues.
                  </p>
                </div>

                <div className="border-l-2 border-accent pl-6">
                  <h3 className="mb-2">Art Production</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    We conceptualize and produce visual art experiences that
                    connect communities and contemporary narratives.
                  </p>
                </div>

                <div className="border-l-2 border-accent pl-6">
                  <h3 className="mb-2">Cultural Collaborations</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Strategic partnerships with galleries, institutions,
                    and independent artists.
                  </p>
                </div>

              </div>
            </section>

          </motion.div>

          {/* RIGHT SIDE - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-muted/30 p-10 lg:p-14 shadow-xl">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    <h2 className="font-serif text-3xl mb-6 tracking-tight">
                      Send a Message
                    </h2>

                    <div>
                      <label htmlFor="from_name" className="block mb-2 text-sm">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="from_name"
                        value={formData.from_name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background border border-foreground/10 focus:border-accent focus:outline-none transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="from_email" className="block mb-2 text-sm">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="from_email"
                        value={formData.from_email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background border border-foreground/10 focus:border-accent focus:outline-none transition-colors"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block mb-2 text-sm">
                        Inquiry Type
                      </label>
                      <select
                        id="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background border border-foreground/10 focus:border-accent focus:outline-none transition-colors"
                        required
                      >
                        <option value="">Select inquiry</option>
                        <option value="Exhibition Hosting">Exhibition Hosting</option>
                        <option value="Collaboration">Collaboration</option>
                        <option value="Art Production">Art Production</option>
                        <option value="Press / Media">Press / Media</option>
                        <option value="General Inquiry">General Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block mb-2 text-sm">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background border border-foreground/10 focus:border-accent focus:outline-none transition-colors resize-none"
                        required
                      />
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
                      className="w-full bg-foreground text-background py-4 flex items-center justify-center gap-2 hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Send className="w-5 h-5" />
                          </motion.div>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </motion.button>

                    <p className="text-sm text-muted-foreground text-center">
                      We aim to respond within 24–48 business hours.
                    </p>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      className="mb-6 flex justify-center"
                    >
                      <CheckCircle2 className="w-20 h-20 text-accent" />
                    </motion.div>

                    <h2 className="font-serif text-3xl mb-4 tracking-tight">
                      Thank You!
                    </h2>

                    <p className="text-lg text-muted-foreground mb-2">
                      Your message has been sent successfully.
                    </p>
                    
                    <p className="text-muted-foreground mb-8">
                      We'll try to respond within 24–48 business hours.
                    </p>

                    <div className="space-y-4">
                      <motion.button
                        onClick={handleResend}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full bg-foreground text-background py-4 flex items-center justify-center gap-2 hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        <RotateCcw className="w-5 h-5" />
                        Send Another Message
                      </motion.button>

                      <p className="text-sm text-muted-foreground">
                        Or reach us directly at{' '}
                        <a 
                          href="mailto:srahulcs100@gmail.com"
                          className="text-accent hover:underline"
                        >
                          srahulcs100@gmail.com
                        </a>
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}