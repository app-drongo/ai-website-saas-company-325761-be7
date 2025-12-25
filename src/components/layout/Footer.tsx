'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, MapPin, Twitter, Linkedin, Github } from 'lucide-react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_FOOTER = {
  companyName: 'StreamlineOps',
  tagline:
    'Streamline your business operations with intelligent SaaS solutions that scale with you.',
  description:
    'Transform your workflow with our proven platform that delivers measurable ROI and seamless integration.',

  // Company Section
  companyLinks: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
  ],

  // Legal Section
  legalLinks: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],

  // Contact Information
  contactInfo: {
    email: 'hello@streamlineops.com',
    phone: '+1 (555) 123-4567',
  },

  // Social Media
  socialLinks: [
    { platform: 'Twitter', href: 'https://twitter.com/streamlineops', icon: 'Twitter' },
    { platform: 'LinkedIn', href: 'https://linkedin.com/company/streamlineops', icon: 'Linkedin' },
  ],

  // Newsletter
  newsletterTitle: 'Stay Updated',
  newsletterDescription: 'Get the latest insights on business optimization and SaaS innovations.',
  newsletterPlaceholder: 'Enter your email',
  newsletterButtonText: 'Subscribe',

  // Copyright
  copyrightText: '© 2024 StreamlineOps. All rights reserved.',

  // Address
  address: '123 Innovation Drive, Tech Valley, CA 94025',
} as const;

type FooterProps = Partial<typeof DEFAULT_FOOTER>;

export default function Footer(props: FooterProps) {
  const config = { ...DEFAULT_FOOTER, ...props };
  const navigate = useSmartNavigation();

  const handleLinkClick = (href: string) => {
    navigate(href);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter subscription logic would go here
  };

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Twitter':
        return <Twitter className="h-5 w-5" />;
      case 'Linkedin':
        return <Linkedin className="h-5 w-5" />;
      case 'Github':
        return <Github className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <section id="footer" className="bg-muted text-muted-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid gap-12 lg:grid-cols-4 md:grid-cols-2">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  <span data-editable="companyName">{config.companyName}</span>
                </h3>
                <p className="text-lg mb-4">
                  <span data-editable="tagline">{config.tagline}</span>
                </p>
                <p className="text-sm">
                  <span data-editable="description">{config.description}</span>
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-sm" data-editable="contactInfo.email">
                    {config.contactInfo.email}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-sm" data-editable="contactInfo.phone">
                    {config.contactInfo.phone}
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-4 w-4 text-primary mt-0.5" />
                  <span className="text-sm" data-editable="address">
                    {config.address}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-6">Company</h4>
              <ul className="space-y-4">
                {config.companyLinks.map((link, idx) => (
                  <li key={idx}>
                    <Button
                      variant="ghost"
                      className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground justify-start"
                      onClick={() => handleLinkClick(link.href)}
                      data-editable-href={`companyLinks[${idx}].href`}
                      data-href={link.href}
                    >
                      <span data-editable={`companyLinks[${idx}].label`}>{link.label}</span>
                    </Button>
                  </li>
                ))}
              </ul>

              <h4 className="font-semibold text-foreground mb-6 mt-8">Legal</h4>
              <ul className="space-y-4">
                {config.legalLinks.map((link, idx) => (
                  <li key={idx}>
                    <Button
                      variant="ghost"
                      className="h-auto p-0 text-sm text-muted-foreground hover:text-foreground justify-start"
                      onClick={() => handleLinkClick(link.href)}
                      data-editable-href={`legalLinks[${idx}].href`}
                      data-href={link.href}
                    >
                      <span data-editable={`legalLinks[${idx}].label`}>{link.label}</span>
                    </Button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-semibold text-foreground mb-2">
                <span data-editable="newsletterTitle">{config.newsletterTitle}</span>
              </h4>
              <p className="text-sm mb-6">
                <span data-editable="newsletterDescription">{config.newsletterDescription}</span>
              </p>

              <form
                onSubmit={handleNewsletterSubmit}
                className="space-y-3"
                data-form-id="694d47c517f66c50e2639fa7"
              >
                <input
                  type="email"
                  placeholder={config.newsletterPlaceholder}
                  className="w-full px-3 py-2 text-sm bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                  data-editable="newsletterPlaceholder"
                />
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <span data-editable="newsletterButtonText">{config.newsletterButtonText}</span>
                </Button>
              </form>

              {/* Social Links */}
              <div className="mt-8">
                <h5 className="font-medium text-foreground mb-4">Follow Us</h5>
                <div className="flex gap-3">
                  {config.socialLinks.map((social, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 border-border hover:bg-accent hover:text-accent-foreground"
                      onClick={() => handleLinkClick(social.href)}
                      data-editable-href={`socialLinks[${idx}].href`}
                      data-href={social.href}
                      aria-label={`Follow us on ${social.platform}`}
                    >
                      {renderIcon(social.icon)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-border" />

        {/* Copyright */}
        <div className="py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm">
              <span data-editable="copyrightText">{config.copyrightText}</span>
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>Built with</span>
              <span className="text-primary">♥</span>
              <span>for efficient operations</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
