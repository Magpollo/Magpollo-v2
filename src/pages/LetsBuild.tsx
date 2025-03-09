import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Check, ArrowRight, Mail, Phone, Clock, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Layout from '@/components/Layout';
import AnimatedArrow from '@/components/AnimatedArrow';
import { useToast } from '@/components/ui/use-toast';

// Define the available services for selection
const availableServices = [
  { id: 1, title: 'Product Development', description: 'From quick prototypes to market-ready MVPs tailored to your timeline' },
  { id: 2, title: 'Cross-Platform Applications', description: 'Custom solutions for web, iOS and Android with consistent experience' },
  { id: 3, title: 'API Development', description: 'Seamless connectivity between your services and third-party platforms' },
  { id: 4, title: 'Validation & Growth', description: 'Market validation and scalable frameworks for sustainable expansion' },
  { id: 5, title: 'Product Strategy', description: 'Clear roadmap to prioritize features that drive user adoption' },
  { id: 6, title: 'Tech Consulting', description: 'Expert guidance on technology choices for scalable architecture' },
  { id: 7, title: 'User Experience Design', description: 'Intuitive interfaces with scalable component systems for consistency' },
  { id: 8, title: 'Brand Identity', description: 'Distinctive visual elements that tell your brand\'s unique story' },
  { id: 9, title: 'Content & SEO Strategy', description: 'Discoverable content that drives traffic and establishes authority' },
  { id: 10, title: 'Analytics Integration', description: 'Data insights to understand user behavior and optimize conversion' },
  { id: 11, title: 'Social Media Strategy', description: 'Targeted engagement tactics for maximum reach on key platforms' },
  { id: 12, title: 'Email Marketing', description: 'Automated workflows to nurture leads through your sales funnel' },
  { id: 13, title: 'AI Integration', description: 'Smart features that automate tasks and personalize user experiences' },
  { id: 14, title: 'Other', description: 'Have a unique challenge? Let\'s discuss your custom requirements' }
];

// Service selection card component
const ServiceCard = ({ service, selected, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)' }}
      whileTap={{ scale: 0.98 }}
      className={`p-5 rounded-xl border transition-all duration-200 ${
        selected 
          ? 'bg-primary/10 border-primary text-primary shadow-sm' 
          : 'bg-gray-50/50 border-gray-100 hover:border-primary/30'
      } cursor-pointer`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium">{service.title}</h3>
        <div className={`flex items-center justify-center w-5 h-5 rounded-full transition-colors ${
          selected ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'
        }`}>
          {selected ? <Check size={12} /> : <Plus size={12} />}
        </div>
      </div>
      <p className="text-sm text-muted-foreground">{service.description}</p>
    </motion.div>
  );
};

// File upload component
const FileUpload = ({ files, setFiles }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles([...files, ...droppedFiles]);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);
    setFiles([...files, ...selectedFiles]);
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Upload relevant files</h2>
      <div
        className="glass-card border-2 border-dashed border-muted-foreground/30 rounded-xl p-8 text-center hover:border-primary/40 transition-colors"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <p className="mb-2 text-muted-foreground">
          Drag & drop files or{" "}
          <label className="text-primary cursor-pointer hover:underline">
            Browse
            <input 
              type="file" 
              multiple 
              className="hidden" 
              onChange={handleFileChange} 
            />
          </label>
        </p>
        <p className="text-xs text-muted-foreground">
          Supported formats: JPEG, PNG, GIF, MP4, PDF, PSD, AI, Word, PPT
        </p>
      </div>

      {files.length > 0 && (
        <div className="mt-4">
          <h3 className="font-medium mb-2">Uploaded Files</h3>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li 
                key={index} 
                className="flex justify-between items-center p-2 bg-muted rounded"
              >
                <span className="text-sm truncate">{file.name}</span>
                <button 
                  className="text-muted-foreground hover:text-destructive w-6 h-6 flex items-center justify-center"
                  onClick={() => removeFile(index)}
                  aria-label="Remove file"
                >
                  <X size={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Contact form component
const ContactForm = ({ selectedServices, files, goBack }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you would integrate with your form submission service (e.g., Formspree)
    // For now, we'll just show a success toast
    toast({
      title: "Form submitted successfully!",
      description: "We'll be in touch with you shortly.",
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      message: ''
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <button 
        onClick={goBack}
        className="flex items-center text-primary mb-6 hover:underline"
        type="button"
      >
        <ArrowRight className="mr-2 rotate-180" size={16} />
        Back to services
      </button>
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Tell us about your project</h1>
        <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
          <div className="h-full bg-primary w-full"></div>
        </div>
      </div>
      
      {selectedServices.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-2">Selected Services:</h2>
          <div className="flex flex-wrap gap-2">
            {selectedServices.map(service => (
              <div 
                key={service.id} 
                className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full"
              >
                {service.title}
              </div>
            ))}
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6 glass-card p-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name
          </label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your name"
            className="glass-card bg-white/50"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your.email@example.com"
            className="glass-card bg-white/50"
          />
        </div>
        
        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-2">
            Company
          </label>
          <Input
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Your company name (optional)"
            className="glass-card bg-white/50"
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Tell us about your project (optional)
          </label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Describe your idea, goals, and any specific requirements"
            rows={5}
            className="glass-card bg-white/50"
          />
        </div>
        
        <Button type="submit" variant="primary-gradient" size="lg" className="w-full">
          Submit
        </Button>
      </form>
    </div>
  );
};

// Contact information section
const ContactInfoSection = () => {
  return (
    <section className="py-16 mt-20 glass-card bg-white/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
            Contact Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 glass-card hover-lift">
              <Mail className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Email Us</h3>
              <a
                href="mailto:salesteam@magpollo.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                salesteam@magpollo.com
              </a>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 glass-card hover-lift">
              <Phone className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Call Us</h3>
              <div className="flex flex-col space-y-1">
                <a
                  href="tel:+14709525987"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  +1 (470) 952-5987
                </a>
                <a
                  href="tel:+12405017100"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  +1 (240) 501-7100
                </a>
              </div>
            </div>
            
            <div className="flex flex-col items-center text-center p-6 glass-card hover-lift">
              <Clock className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Business Hours</h3>
              <p className="text-muted-foreground">Everyday 9:00 AM - 8:00 PM EST</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main Let's Build page component
const LetsBuild = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [files, setFiles] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const toggleService = (service) => {
    if (selectedServices.find(s => s.id === service.id)) {
      setSelectedServices(selectedServices.filter(s => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleNext = () => {
    if (selectedServices.length > 0) {
      setShowForm(true);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-6 py-20 md:py-24 min-h-[calc(100vh-300px)]">
        {!showForm ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-4">Let's Build</h1>
              <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                <div className="h-full bg-primary w-1/2"></div>
              </div>
              <p className="mt-6 text-muted-foreground max-w-3xl">
                To start the building process, kindly provide us with details about your project idea or desired
                development, as well as your personal and company information.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-6">I'm interested in...</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {availableServices.map(service => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    selected={!!selectedServices.find(s => s.id === service.id)}
                    onClick={() => toggleService(service)}
                  />
                ))}
              </div>
            </div>

            <FileUpload files={files} setFiles={setFiles} />

            <div className="mt-12 flex justify-center">
              <Button
                onClick={handleNext}
                disabled={selectedServices.length === 0}
                variant="primary-gradient"
                size="lg"
                className={`${selectedServices.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Next Step <ArrowRight className="ml-1" />
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ContactForm
              selectedServices={selectedServices}
              files={files}
              goBack={() => setShowForm(false)}
            />
          </motion.div>
        )}
      </div>

      <ContactInfoSection />
    </Layout>
  );
};

export default LetsBuild;
