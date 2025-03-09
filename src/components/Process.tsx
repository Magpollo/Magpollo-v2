import React from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/utils/useIntersectionObserver';

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  index: number;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ number, title, description, index }) => {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Connector line for all items except the last */}
      {index < 4 && (
        <div className="absolute left-6 top-16 w-[2px] h-[calc(100%-3rem)] bg-gradient-to-b from-magpollo via-magpollo-dark to-transparent hidden md:block" />
      )}

      <div className="flex flex-col md:flex-row md:items-start gap-5 md:gap-8">
        <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl gradient-bg-primary text-white font-bold text-lg shadow-lg">
          {number}
        </div>

        <div className="pt-1">
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-foreground/70">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Process: React.FC = () => {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true,
  });

  const steps = [
    {
      number: '01',
      title: 'Discovery',
      description: 'We start by deeply understanding your vision, goals, and target audience through collaborative sessions.',
    },
    {
      number: '02',
      title: 'Validation',
      description: 'We assess market viability and technical feasibility to ensure your idea has potential for success.',
    },
    {
      number: '03',
      title: 'Prototyping',
      description: 'We create a functional prototype focusing on core features that deliver your product\'s unique value.',
    },
    {
      number: '04',
      title: 'Testing',
      description: 'We gather real user feedback through testing sessions to refine and optimize your product.',
    },
    {
      number: '05',
      title: 'Launch',
      description: 'We help you deploy your MVP to the market and establish metrics to track its performance.',
    },
  ];

  return (
    <section id="process" className="py-24 md:py-32 bg-muted/30 relative">
      <div className="slice-bg">
        <div className="slice slice-1"></div>
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center mb-16" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-block mb-4 px-3 py-1 rounded-full bg-magpollo-light text-magpollo text-sm font-medium">
              Our Process
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              How We <span className="gradient-heading">Make It Happen</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our streamlined process takes your idea from concept to launch, focusing on speed and quality
              to help you validate your business model quickly.
            </p>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto space-y-12 md:space-y-16">
          {steps.map((step, index) => (
            <ProcessStep
              key={index}
              number={step.number}
              title={step.title}
              description={step.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
