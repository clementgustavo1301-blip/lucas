'use client';

import React, { useState, useEffect } from 'react';
import { Cookie, X } from 'lucide-react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'true');
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'false');
    setIsVisible(false);
  };

  if (!hasMounted) return null;

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-[60] transition-all duration-500 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-navy shadow-[0_-8px_30px_rgba(0,0,0,0.3)] border-t border-white/10 w-full relative">
        {/* Glow effect */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-gold/5 to-transparent pointer-events-none" />
        
        <div className="max-w-[1200px] mx-auto p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          <div className="flex-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2.5 text-gold mb-2">
              <Cookie className="h-5 w-5" />
              <span className="font-semibold text-sm">Privacidade e Cookies</span>
            </div>
            <p className="text-white/80 text-[13px] leading-relaxed font-light max-w-3xl">
              Utilizamos cookies essenciais para o funcionamento do site e para melhorar sua experiência. Ao continuar navegando, você concorda com nossa política de privacidade.
            </p>
          </div>
          
          <div className="flex gap-3 w-full sm:w-auto shrink-0 mt-2 sm:mt-0">
            <button 
              onClick={declineCookies}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl border border-white/10 text-white/90 text-[13px] font-medium hover:bg-white/5 active:scale-95 transition-all"
            >
              Recusar
            </button>
            <button 
              onClick={acceptCookies}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-gold text-navy text-[13px] font-bold hover:bg-gold-dark hover:shadow-[0_4px_20px_rgba(197,168,128,0.3)] active:scale-95 transition-all flex items-center justify-center"
            >
              Entendi e Aceito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
