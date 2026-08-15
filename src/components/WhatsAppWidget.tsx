'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  useEffect(() => {
    // Only mark as mounted
  }, []);

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      "Olá! Gostaria de tirar uma dúvida jurídica."
    );
    window.open(`https://wa.me/5584991594538?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
      
      {/* Pop-up Card */}
      <div 
        className={`transition-all duration-300 origin-bottom-right pointer-events-auto ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-50 pointer-events-none'
        }`}
      >
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-gray-100 w-72 overflow-hidden">
          {/* Header */}
          <div className="bg-navy p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-white font-medium text-sm">Atendimento Online</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Fechar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          
          {/* Body */}
          <div className="p-5 bg-gray-50">
            <div className="bg-white p-3.5 rounded-xl rounded-tl-none shadow-sm border border-gray-100 text-[13px] leading-relaxed text-navy mb-4">
              Olá! Como posso te ajudar hoje? Ficou com alguma dúvida sobre seus direitos trabalhistas ou benefício do INSS?
            </div>
            <button 
              onClick={handleWhatsAppClick}
              className="w-full py-3 bg-gold text-navy font-bold text-sm rounded-lg hover:bg-gold-dark transition-colors shadow-sm flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <MessageCircle className="h-4 w-4" />
              Iniciar conversa
            </button>
          </div>
        </div>
      </div>

      {/* Floating Button */}
      <button 
        onClick={() => {
          setIsOpen(!isOpen);
          if (!hasOpened) setHasOpened(true);
        }}
        className="h-14 w-14 rounded-full bg-navy text-gold flex items-center justify-center shadow-[0_8px_20px_rgba(15,23,42,0.3)] hover:bg-navy-mid hover:scale-105 active:scale-95 transition-all pointer-events-auto"
        aria-label="Abrir chat do WhatsApp"
      >
        {isOpen ? <X className="h-6 w-6 text-white" /> : (
          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
        )}
      </button>
    </div>
  );
}
