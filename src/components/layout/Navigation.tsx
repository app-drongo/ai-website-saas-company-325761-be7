'use client';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

const DEFAULT_NAVIGATION = {
  brandName: 'SaaSFlow',
  brandHref: '/',
  navItems: [
    { label: 'Hero', href: '#hero' },
    { label: 'Pricing', href: '#pricing' },
  ],
  ctaText: 'Get Started',
  ctaHref: '/signup',
  secondaryCtaText: 'Sign In',
  secondaryCtaHref: '/login',
} as const;

type NavigationProps = Partial<typeof DEFAULT_NAVIGATION>;

export default function Navigation(props: NavigationProps) {
  const config = { ...DEFAULT_NAVIGATION, ...props };
  const navigate = useSmartNavigation();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (href: string) => {
    navigate(href);
    setIsOpen(false);
  };

  const handleBrandClick = () => {
    navigate(config.brandHref);
  };

  const handleCtaClick = () => {
    navigate(config.ctaHref);
  };

  const handleSecondaryCtaClick = () => {
    navigate(config.secondaryCtaHref);
  };

  return (
    <section
      id="navigation"
      className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Brand */}
          <div className="flex items-center">
            <button
              onClick={handleBrandClick}
              className="text-xl font-bold text-foreground hover:text-primary transition-colors"
              data-editable-href="brandHref"
              data-href={config.brandHref}
            >
              <span data-editable="brandName">{config.brandName}</span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {config.navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleNavClick(item.href)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                data-editable-href={`navItems[${idx}].href`}
                data-href={item.href}
              >
                <span data-editable={`navItems[${idx}].label`}>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSecondaryCtaClick}
              className="text-muted-foreground hover:text-foreground"
              data-editable-href="secondaryCtaHref"
              data-href={config.secondaryCtaHref}
            >
              <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
            </Button>
            <Button
              size="sm"
              onClick={handleCtaClick}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              data-editable-href="ctaHref"
              data-href={config.ctaHref}
            >
              <span data-editable="ctaText">{config.ctaText}</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-background text-foreground">
              <div className="flex flex-col space-y-6 mt-6">
                {/* Mobile Brand */}
                <button
                  onClick={handleBrandClick}
                  className="text-lg font-bold text-foreground text-left"
                  data-editable-href="brandHref"
                  data-href={config.brandHref}
                >
                  <span data-editable="brandName">{config.brandName}</span>
                </button>

                {/* Mobile Navigation */}
                <nav className="flex flex-col space-y-4">
                  {config.navItems.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleNavClick(item.href)}
                      className="text-left text-muted-foreground hover:text-foreground transition-colors py-2"
                      data-editable-href={`navItems[${idx}].href`}
                      data-href={item.href}
                    >
                      <span data-editable={`navItems[${idx}].label`}>{item.label}</span>
                    </button>
                  ))}
                </nav>

                {/* Mobile CTA Buttons */}
                <div className="flex flex-col space-y-3 pt-6 border-t border-border">
                  <Button
                    variant="ghost"
                    onClick={handleSecondaryCtaClick}
                    className="justify-start text-muted-foreground hover:text-foreground"
                    data-editable-href="secondaryCtaHref"
                    data-href={config.secondaryCtaHref}
                  >
                    <span data-editable="secondaryCtaText">{config.secondaryCtaText}</span>
                  </Button>
                  <Button
                    onClick={handleCtaClick}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                    data-editable-href="ctaHref"
                    data-href={config.ctaHref}
                  >
                    <span data-editable="ctaText">{config.ctaText}</span>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  );
}
