import React from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/utils/useIntersectionObserver';
import { Rocket, Code, Palette, BarChart, Target, Zap } from 'lucide-react';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, index }) => {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      className="card-hover bg-background rounded-xl border border-border overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="p-6">
        <div className="mb-5 w-12 h-12 icon-highlight">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-foreground/70">{description}</p>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-magpollo to-magpollo-dark transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
    </motion.div>
  );
};

const Services: React.FC = () => {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true,
  });

  const services = [
    {
      icon: <Rocket size={22} />,
      title: 'Product Development',
      description: 'From quick prototypes to market-ready MVPs, we transform your vision into functional products tailored to your timeline.',
    },
    {
      icon: <Code size={22} />,
      title: 'Cross-Platform Applications',
      description: 'Custom web and mobile applications built with a consistent experience across all devices and platforms.',
    },
    {
      icon: <Palette size={22} />,
      title: 'User Experience Design',
      description: 'Intuitive interfaces with scalable design systems that create memorable experiences and drive user adoption.',
    },
    {
      icon: <BarChart size={22} />,
      title: 'Validation & Growth',
      description: 'Market validation and scalable frameworks that ensure product-market fit and sustainable business expansion.',
    },
    {
      icon: <Target size={22} />,
      title: 'Product Strategy',
      description: 'Strategic roadmap planning that prioritizes features to maximize impact and accelerate time-to-market.',
    },
    {
      icon: <Zap size={22} />,
      title: 'Tech Consulting',
      description: 'Expert guidance on technology choices for a scalable architecture that supports your current and future needs.',
    },
  ];

  return (
    <section id="services" className="py-24 md:py-32 relative pattern-dots">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-magpollo-light text-magpollo text-sm font-medium">
              Our Services
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Turning Vision Into <span className="gradient-heading">Reality</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We specialize in helping founders bring their ideas to life through
              a comprehensive suite of services designed for validation, development, and growth.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
