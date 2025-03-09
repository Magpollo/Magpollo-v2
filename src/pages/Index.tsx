
import React from 'react';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Process from '@/components/Process';
import Testimonials from '@/components/Testimonials';
import CallToAction from '@/components/CallToAction';
import Contact from '@/components/Contact';
import Layout from '@/components/Layout';

const Index: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <Services />
      <Process />
      <Testimonials />
      <CallToAction />
      <Contact />
    </Layout>
  );
};

export default Index;
