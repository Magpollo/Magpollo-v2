import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen pt-24 flex items-center overflow-hidden">
      {/* Background slices */}
      <div className="slice-bg">
        <div className="slice slice-1"></div>
        <div className="slice slice-2"></div>
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex flex-col gap-5">
                <div>
                  <span className="inline-flex px-4 py-1.5 bg-magpollo-light text-magpollo rounded-full text-sm font-medium tracking-wide w-fit">
                    MVP Development Studio
                  </span>
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
                  From Concept to <span className="gradient-heading">MVP</span> in Weeks
                </h1>
                
                <p className="text-lg md:text-xl text-foreground/75 mt-4 max-w-xl">
                  We help non-technical founders and startups turn ideas into functional, 
                  testable products that are ready for market validation.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <Button asChild variant="primary-gradient" size="lg">
                    <Link to="/lets-build">
                      Let's Build <ArrowRight className="ml-1" />
                    </Link>
                  </Button>
                  
                  <Button asChild variant="outline" size="lg">
                    <a href="#process">
                      Our Process
                    </a>
                  </Button>
                </div>
                
                <div className="mt-10 grid grid-cols-3 gap-4 md:gap-8 border-t border-border pt-8">
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold gradient-heading">2w</div>
                    <div className="text-sm text-foreground/70 mt-1">Average MVP<br/>Delivery</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold gradient-heading">97%</div>
                    <div className="text-sm text-foreground/70 mt-1">Client<br/>Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-4xl font-bold gradient-heading">50+</div>
                    <div className="text-sm text-foreground/70 mt-1">Startups<br/>Launched</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            className="flex justify-center"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="relative">
              {/* Main image with 3D effect */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="/assets/hero-image.jpg" 
                  alt="From concept to MVP" 
                  className="w-full h-full object-cover rounded-2xl max-w-md"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -z-10 -inset-4 bg-gradient-to-r from-magpollo/20 to-magpollo-dark/20 rounded-2xl blur"></div>
              
              {/* Decorative shapes */}
              <div className="absolute -bottom-10 -left-10 w-20 h-20 border-4 border-magpollo/20 rounded-xl hidden sm:block"></div>
              <div className="absolute -top-8 -right-8 w-16 h-16 border-4 border-magpollo/20 rounded-full hidden sm:block"></div>
              
              {/* Floating cards - adjusted for better mobile positioning */}
              <motion.div 
                className="absolute top-0 right-0 md:top-[10%] md:-right-16 bg-white shadow-lg p-3 sm:p-4 rounded-lg w-[150px] sm:max-w-[200px] z-20"
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-3 h-3 rounded-full bg-primary mt-1 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-sm">Idea Validated</div>
                    <div className="text-xs text-foreground/70 mt-1">Market research complete</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute bottom-0 left-0 md:-bottom-12 md:-left-12 bg-white shadow-lg p-3 sm:p-4 rounded-lg w-[150px] sm:max-w-[200px] z-20"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
              >
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500 mt-1 flex-shrink-0"></div>
                  <div>
                    <div className="font-medium text-sm">MVP Launched</div>
                    <div className="text-xs text-foreground/70 mt-1">Ready for user testing</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
