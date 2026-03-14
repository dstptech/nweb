"use client";
import { useEffect, useState, useCallback } from "react";
import AppLogo from "@/components/ui/AppLogo";
import Icon from "@/components/ui/AppIcon";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { NAV_LINKS } from "@/utils/homeData";

import HomeHero from "./HomeHero";
import HomeIndustries from "./HomeIndustries";
import HomeServices from "./HomeServices";
import HomeStats from "./HomeStats";
import HomeTestimonials from "./HomeTestimonials";

export default function HomepageInteractive() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useScrollReveal();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = useCallback((href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="min-h-screen bg-white font-dm overflow-x-hidden">

      {/* ══════════════════════════════════════
            NAVBAR
         ══════════════════════════════════════ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "navbar-glass shadow-sm py-3" : "bg-transparent py-5"}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AppLogo size={48} iconName="SparklesIcon" onClick={() => scrollTo("#hero")} />
          </div>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button key={link.href} onClick={() => scrollTo(link.href)} className="text-sm font-semibold text-enterprise-grey hover:text-enterprise-mid transition-colors duration-200 relative group">
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-coral-400 group-hover:w-full transition-all duration-300 rounded-full" />
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => scrollTo("#contact")} className="text-sm font-semibold px-5 py-2.5 rounded-full border border-enterprise-mid/20 text-enterprise-mid hover:border-coral-400 hover:text-coral-500 transition-all duration-200">
              Contact
            </button>
            <button onClick={() => window.open('https://cal.com/ankitrewar11/30min', '_blank')} className="text-sm font-bold px-5 py-2.5 rounded-full text-white transition-all duration-300 hover:shadow-coral-md hover:-translate-y-0.5" style={{ background: "linear-gradient(135deg, #E76F6F, #C95555)" }}>
              Start a Project
            </button>
          </div>

          <button className="md:hidden p-2 rounded-xl text-enterprise-mid" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation menu">
            <Icon name={menuOpen ? "XMarkIcon" : "Bars3Icon"} size={24} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 navbar-glass border-t border-gray-100 py-4 px-6 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <button key={link.href} onClick={() => scrollTo(link.href)} className="text-left text-sm font-semibold text-enterprise-grey hover:text-coral-500 transition-colors py-2">
                {link.label}
              </button>
            ))}
            <button onClick={() => scrollTo("#contact")} className="text-sm font-bold px-5 py-3 rounded-full text-white text-center" style={{ background: "linear-gradient(135deg, #E76F6F, #C95555)" }}>
              Start a Project
            </button>
          </div>
        )}
      </nav>

      {/* ══════════════════════════════════════
            PAGE SECTIONS
         ══════════════════════════════════════ */}
      <HomeHero scrollTo={scrollTo} />
      <HomeIndustries scrollTo={scrollTo} />
      <HomeServices scrollTo={scrollTo} />
      <HomeStats scrollTo={scrollTo} />
      <HomeTestimonials scrollTo={scrollTo} />

    </div>
  );
}