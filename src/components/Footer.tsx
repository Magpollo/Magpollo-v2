import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Clock, ArrowRight, MapPin, Instagram } from 'lucide-react';
import Logo from './Logo';

// Flat social icons as SVG components
const TwitterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/>
  </svg>
);

const DiscordIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.39-.444.885-.608 1.28a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.28.077.077 0 0 0-.079-.036c-1.714.29-3.354.8-4.885 1.49a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .03.048c1.986 1.454 3.92 2.338 5.82 2.926a.078.078 0 0 0 .085-.026c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106c-.632-.242-1.235-.52-1.807-.838a.077.077 0 0 1-.008-.128c.122-.09.244-.185.36-.28a.074.074 0 0 1 .078-.01c3.927 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.118.095.24.19.36.28a.077.077 0 0 1-.006.127c-.574.32-1.175.599-1.81.839a.076.076 0 0 0-.041.106c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .085.026c1.908-.59 3.842-1.474 5.83-2.926a.077.077 0 0 0 .03-.047c.5-5.177-.838-9.6-3.549-13.442a.061.061 0 0 0-.031-.027zM8.02 15.278c-1.182 0-2.157-1.086-2.157-2.419 0-1.332.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.332-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.086-2.157-2.419 0-1.332.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.332-.946 2.418-2.157 2.418z"/>
  </svg>
);

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted py-16 md:py-24 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo and description */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <Logo width={150} height={37} color="hsl(349, 89%, 60%)" />
            </Link>
            <p className="text-foreground/70 mb-8 max-w-md">
              We transform ideas into MVPs, helping non-technical founders and startups
              bring their vision to life with minimal time and investment.
            </p>
            <div className="flex gap-4">
              {/* Social media links */}
              <a href="https://x.com/MagpolloTech" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="w-9 h-9 flex items-center justify-center rounded-full bg-background hover:bg-magpollo hover:text-white transition-colors">
                <TwitterIcon />
              </a>
              <a href="http://linkedin.com/company/magpollo" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 flex items-center justify-center rounded-full bg-background hover:bg-magpollo hover:text-white transition-colors">
                <LinkedinIcon />
              </a>
              <a href="https://discord.gg/4Qv8khbBf8" target="_blank" rel="noopener noreferrer" aria-label="Discord" className="w-9 h-9 flex items-center justify-center rounded-full bg-background hover:bg-magpollo hover:text-white transition-colors">
                <DiscordIcon />
              </a>
              <a href="https://www.instagram.com/magpollotech" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 flex items-center justify-center rounded-full bg-background hover:bg-magpollo hover:text-white transition-colors">
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-bold text-lg mb-5">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="/#services" className="text-foreground/70 hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" /> Services
                </a>
              </li>
              <li>
                <a href="/#process" className="text-foreground/70 hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" /> Our Process
                </a>
              </li>
              <li>
                <a href="/#testimonials" className="text-foreground/70 hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" /> Success Stories
                </a>
              </li>
              <li>
                <a href="/#contact" className="text-foreground/70 hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" /> Contact Us
                </a>
              </li>
              <li>
                <Link to="/lets-build" className="text-foreground/70 hover:text-primary transition-colors flex items-center">
                  <ArrowRight className="h-3 w-3 mr-2" /> Let's Build
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-bold text-lg mb-5">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-magpollo-light flex items-center justify-center">
                  <Mail className="h-4 w-4 text-magpollo" />
                </div>
                <a href="mailto:salesteam@magpollo.com" className="text-foreground/70 hover:text-primary transition-colors">
                  salesteam@magpollo.com
                </a>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-magpollo-light flex items-center justify-center mt-0.5">
                  <Phone className="h-4 w-4 text-magpollo" />
                </div>
                <div>
                  <div className="space-y-1">
                    <a href="tel:+14709525987" className="block text-foreground/70 hover:text-primary transition-colors">
                      +1 (470) 952-5987
                    </a>
                    <a href="tel:+12405017100" className="block text-foreground/70 hover:text-primary transition-colors">
                      +1 (240) 501-7100
                    </a>
                  </div>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-magpollo-light flex items-center justify-center mt-0.5">
                  <Clock className="h-4 w-4 text-magpollo" />
                </div>
                <div>
                  <p className="text-foreground/70">Everyday 9:00 AM - 8:00 PM EST</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-magpollo-light flex items-center justify-center mt-0.5">
                  <MapPin className="h-4 w-4 text-magpollo" />
                </div>
                <div>
                  <p className="text-foreground/70">Based in the DC Area and Atlanta</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/40 text-foreground/60 text-sm flex flex-col md:flex-row items-center justify-between">
          <p>© {currentYear} Magpollo. All rights reserved.</p>
          <p className="mt-2 md:mt-0">
            Designed and developed with ❤️ for founders and startups.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
