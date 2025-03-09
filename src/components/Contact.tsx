import React from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/utils/useIntersectionObserver';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="contact" className="py-20 md:py-32 relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[20%] right-[5%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-[10%] left-[10%] w-[30%] h-[30%] rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
              Get in Touch
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Let's <span className="text-primary">Connect</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have questions or ready to discuss your project? Reach out to us directly
              or fill out the form below.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="glass rounded-xl p-6 md:p-8 h-full">
              <h3 className="text-xl font-bold mb-6">Send Us a Message</h3>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Your Name
                    </label>
                    <Input id="name" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input id="email" type="email" placeholder="john@example.com" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input id="subject" placeholder="How can we help you?" />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message (optional)
                  </label>
                  <Textarea id="message" placeholder="Tell us about your project..." rows={5} />
                </div>
                
                <Button type="submit" variant="primary-gradient" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col"
          >
            <div className="glass rounded-xl p-6 md:p-8 mb-6 md:mb-8">
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="mt-1 mr-4 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="font-medium">Email Us</p>
                    <a href="mailto:salesteam@magpollo.com" className="text-primary hover:underline">
                      salesteam@magpollo.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-4 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="font-medium">Call Us</p>
                    <div className="space-y-1">
                      <a href="tel:+14709525987" className="block text-primary hover:underline">
                        +1 (470) 952-5987
                      </a>
                      <a href="tel:+12405017100" className="block text-primary hover:underline">
                        +1 (240) 501-7100
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1 mr-4 flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary">
                    <Clock size={16} />
                  </div>
                  <div>
                    <p className="font-medium">Operating Hours</p>
                    <p className="text-muted-foreground">
                      Everyday 9:00 AM - 8:00 PM EST
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="glass rounded-xl p-6 md:p-8 flex-grow">
              <h3 className="text-xl font-bold mb-6">How We Work</h3>
              
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  We typically respond to inquiries within 24 hours during business days.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
