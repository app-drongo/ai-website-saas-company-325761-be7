'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { useFormSubmit } from '@/hooks/useFormSubmit';

const DEFAULT_CONTACT = {
  title: 'Get in Touch',
  subtitle: 'Ready to transform your business? Contact our team for a personalized demo and consultation.',
  formTitle: 'Send us a message',
  contactInfo: [
    {
      icon: 'mail',
      label: 'Email',
      value: 'hello@saascompany.com',
      href: 'mailto:hello@saascompany.com'
    },
    {
      icon: 'phone',
      label: 'Phone',
      value: '+1 (555) 123-4567',
      href: 'tel:+15551234567'
    },
    {
      icon: 'location',
      label: 'Office',
      value: 'San Francisco, CA',
      href: '#'
    }
  ],
  features: [
    '24/7 customer support',
    'Free onboarding assistance',
    'Custom integration help',
    'Dedicated account manager'
  ],
  ctaText: 'Send Message',
  responseTime: 'We typically respond within 24 hours'
} as const;

type ContactProps = Partial<typeof DEFAULT_CONTACT>;

export default function Contact(props: ContactProps) {
  const config = { ...DEFAULT_CONTACT, ...props };
  const { handleSubmit, isSubmitting, isSuccess, message } = useFormSubmit();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const getContactIcon = (iconType: string) => {
    switch (iconType) {
      case 'mail':
        return <Mail className="h-5 w-5 text-primary" />;
      case 'phone':
        return <Phone className="h-5 w-5 text-primary" />;
      case 'location':
        return <MapPin className="h-5 w-5 text-primary" />;
      default:
        return <Mail className="h-5 w-5 text-primary" />;
    }
  };

  const handleContactClick = (href: string) => {
    if (href.startsWith('mailto:') || href.startsWith('tel:')) {
      window.location.href = href;
    }
  };

  return (
    <section id="contact" className="bg-background text-foreground py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span data-editable="title">{config.title}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <span data-editable="subtitle">{config.subtitle}</span>
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="space-y-6">
              {config.contactInfo.map((contact, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer"
                  onClick={() => handleContactClick(contact.href)}
                >
                  <div className="flex-shrink-0">
                    {getContactIcon(contact.icon)}
                  </div>
                  <div>
                    <div className="font-medium text-foreground">
                      <span data-editable={`contactInfo[${idx}].label`}>{contact.label}</span>
                    </div>
                    <div className="text-muted-foreground">
                      <span data-editable={`contactInfo[${idx}].value`}>{contact.value}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Features */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Why Choose Us?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {config.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-foreground" data-editable={`features[${idx}]`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Response Time */}
            <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                <span data-editable="responseTime">{config.responseTime}</span>
              </Badge>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-card border-border shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                <span data-editable="formTitle">{config.formTitle}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isSuccess ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">{message}</p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  data-form-id="contact"
                  className="space-y-6"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@company.com"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
                      Company Name
                    </label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your Company"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your project and how we can help..."
                      rows={5}
                      className="w-full"
                    />
                  </div>

                  {message && !isSuccess && (
                    <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-md">
                      <p className="text-sm text-destructive">{message}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 group"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <span data-editable="ctaText">{config.ctaText}</span>
                        <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
