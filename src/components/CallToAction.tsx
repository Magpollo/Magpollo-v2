import React from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/utils/useIntersectionObserver';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare, Clock } from 'lucide-react';

const CallToAction: React.FC = () => {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 pattern-dots opacity-50"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div 
          ref={ref} 
          className="bg-background rounded-2xl shadow-lg border border-border overflow-hidden relative"
        >
          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 lg:p-16">
            {/* Left column: CTA text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="flex flex-col justify-center"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                Ready to Bring Your <span className="gradient-heading">Idea to Life</span>?
              </h2>
              
              <p className="text-lg text-foreground/70 mb-8">
                Schedule a free consultation today and let's discuss how we can transform your 
                vision into a functional MVP that's ready for the market.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="primary-gradient" size="lg">
                  <Link to="/lets-build">
                    Let's Build <ArrowRight className="ml-1" />
                  </Link>
                </Button>
              </div>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-magpollo-light flex items-center justify-center">
                    <MessageSquare size={18} className="text-magpollo" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Free Consultation</div>
                    <div className="text-sm text-foreground/60">No commitment required</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-magpollo-light flex items-center justify-center">
                    <Clock size={18} className="text-magpollo" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Quick Response</div>
                    <div className="text-sm text-foreground/60">Within 24 hours</div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Right column: Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isIntersecting ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative hidden md:block"
            >
              <div className="relative h-full">
                <div className="absolute -right-12 -bottom-12 -top-12 aspect-square">
                  <img 
                    src="/assets/Idea-to-Life.jpg"
                    alt="Team collaboration" 
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
