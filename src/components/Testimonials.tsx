
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/utils/useIntersectionObserver';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  company: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Working with Magpollo transformed our idea into a fully functional MVP in just weeks. Their process was efficient and the results exceeded our expectations.",
    author: "Sarah Johnson",
    role: "Founder",
    company: "HealthTech Solutions",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=128&q=80",
  },
  {
    id: 2,
    quote: "As a non-technical founder, I was struggling to communicate my vision to developers. Magpollo not only understood my idea but improved upon it with their expertise.",
    author: "Michael Chang",
    role: "CEO",
    company: "RetailConnect",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=128&q=80",
  },
  {
    id: 3,
    quote: "The team at Magpollo helped us validate our concept quickly, saving us months of development time and thousands in potential wasted investment.",
    author: "Elena Rodriguez",
    role: "Co-founder",
    company: "FinEdge",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=128&q=80",
  },
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true,
  });

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 md:py-32 relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[40%] left-[10%] w-[30%] h-[30%] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-[20%] right-[5%] w-[25%] h-[25%] rounded-full bg-blue-500/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
              Testimonials
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Success <span className="text-primary">Stories</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hear from founders who transformed their ideas into successful products with our help.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={isIntersecting ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="glass rounded-2xl p-8 md:p-12">
            <div className="mb-8 text-primary">
              <Quote size={48} />
            </div>
            
            <motion.div
              key={testimonials[currentIndex].id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-xl md:text-2xl mb-6 leading-relaxed">
                {testimonials[currentIndex].quote}
              </p>
              
              <div className="flex items-center">
                <div className="mr-4">
                  <img 
                    src={testimonials[currentIndex].image} 
                    alt={testimonials[currentIndex].author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">{testimonials[currentIndex].author}</h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                  </p>
                </div>
              </div>
            </motion.div>
            
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentIndex ? 'bg-primary' : 'bg-muted'
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
