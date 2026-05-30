'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { MinimalMap } from '@/components/Map';
import { 
  Scale, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Menu, 
  X, 
  ChevronRight, 
  FileText, 
  Award,
  Users2,
  Shield,
  ArrowUp
} from 'lucide-react';
import ScrollReveal from '@/components/scroll-reveal';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerSolid, setHeaderSolid] = useState(false);
  const [logoPastThreshold, setLogoPastThreshold] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateLogoPosition = () => {
      if (!logoRef.current) return;
      
      const scrollY = window.scrollY;
      const isMob = window.innerWidth < 1024;
      const winWidth = document.documentElement.clientWidth;

      const scrollThreshold = isMob ? 300 : 350; 
      const progress = Math.min(scrollY / scrollThreshold, 1);
      
      // Aplicando uma curva de suavização (ease-out sine) para a transição ficar super suave
      const easeProgress = Math.sin((progress * Math.PI) / 2);
      const animationFactor = 1 - easeProgress; 

      const baseW = isMob ? 900 : 2400; 
      const baseH = isMob ? 224 : 533; 

      const targetW = isMob ? 260 : 330; 
      const targetH = isMob ? 58 : 73;   

      // Calculate scale instead of width/height to avoid layout reflows on Map/WebGL
      const endScale = targetW / baseW;
      const currentScale = endScale + (1 - endScale) * animationFactor;

      const headerCenterY = isMob ? 22 : 24; 
      const headerTargetX = (winWidth / 2) - (targetW / 2);
      const headerTargetY = headerCenterY - (targetH / 2);

      const heroTargetX = isMob ? -24 : -100 + 48;
      const heroTargetY = isMob ? 50 : 120;

      const currentX = headerTargetX + (heroTargetX - headerTargetX) * animationFactor;
      const currentY = headerTargetY + (heroTargetY - headerTargetY) * animationFactor;

      logoRef.current.style.width = `${baseW}px`;
      logoRef.current.style.height = `${baseH}px`;
      logoRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) scale(${currentScale})`;
      // No CSS transition during active scrolling to allow instant GPU rendering and 120Hz smooth tracking
      logoRef.current.style.transition = 'none';
    };

    const handleScroll = () => {
      requestAnimationFrame(updateLogoPosition);
      setHeaderSolid(window.scrollY > 60);
      setLogoPastThreshold(window.scrollY > (window.innerWidth < 1024 ? 150 : 350));
      setShowBackToTop(window.scrollY > 600);
    };
    
    const handleResize = () => {
      requestAnimationFrame(updateLogoPosition);
    };
    
    handleResize();
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const nome = fd.get('nome') as string;
    const servico = fd.get('servico') as string;
    const mensagem = fd.get('mensagem') as string;

    const text = encodeURIComponent(
      `Olá Dr. Lucas! Gostaria de agendar uma consulta.\n\n` +
      `*Nome:* ${nome}\n` +
      `*Serviço de interesse:* ${servico}\n` +
      `*Mensagem:* ${mensagem}`
    );
    window.open(`https://wa.me/5584991594538?text=${text}`, '_blank');
  };

  const navLinks = [
    { id: 'inicio', label: 'Início' },
    { id: 'sobre', label: 'Sobre' },
    { id: 'atuacao', label: 'Atuação' },
    { id: 'servicos', label: 'Serviços' },
    { id: 'depoimentos', label: 'Depoimentos' },
    { id: 'contato', label: 'Contato' },
  ];

  return (
    <div className="relative min-h-screen">
      
      {/* ─── HEADER ─── */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        headerSolid 
          ? 'bg-white/95 backdrop-blur-sm shadow-[0_1px_0_0_rgba(0,0,0,0.06)]' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between h-10 sm:h-12 relative">
          
          <nav className="hidden lg:flex items-center gap-6 flex-1">
            {navLinks.slice(0, 3).map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`text-[13px] font-medium transition-colors duration-200 cursor-pointer hover:text-gold-dark ${
                  headerSolid ? 'text-gray-600' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center justify-end gap-6 flex-1">
            {navLinks.slice(3).map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`text-[13px] font-medium transition-colors duration-200 cursor-pointer hover:text-gold-dark ${
                  headerSolid ? 'text-gray-600' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a 
              href="https://wa.me/5584991594538"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2 bg-gold text-navy text-[12px] font-bold rounded-md hover:bg-gold-dark transition-colors duration-200 cursor-pointer ml-2"
            >
              <Phone className="h-3.5 w-3.5" />
              <span>Falar com Advogado</span>
            </a>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden p-2 transition-colors cursor-pointer relative z-10 ml-auto ${
              headerSolid ? 'text-navy' : 'text-white'
            }`}
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Animated Logo (Rendered outside header flow for absolute DOM positioning) */}
      <div 
        ref={logoRef}
        className="fixed top-0 left-0 z-[60] pointer-events-none"
        style={{ 
          willChange: 'transform',
          transformOrigin: 'top left'
        }}
      >
        <a 
          href="#inicio" 
          className="block pointer-events-auto relative w-full h-full"
        >
          <Image 
            src="/brand/logo_horizontal.png" 
            alt="Matoso Morais Advocacia"
            fill
            quality={100}
            unoptimized={true}
            className={`object-contain object-left transition-all duration-300 ${
              headerSolid && logoPastThreshold 
                ? 'brightness-0' 
                : 'brightness-0 invert'
            }`}
            priority
          />
        </a>
      </div>

      {/* ─── MOBILE MENU ─── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-navy/98 backdrop-blur-md flex flex-col justify-center px-8 lg:hidden animate-in fade-in duration-300">
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-5 right-5 p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Fechar menu"
          >
            <X className="h-8 w-8" />
          </button>
          <nav className="flex flex-col gap-6 items-center text-center">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-4xl text-white hover:text-gold transition-colors cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-14 flex justify-center">
            <a 
              href="https://wa.me/5584991594538"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full max-w-[280px] px-6 py-4 bg-gold text-navy font-bold text-sm rounded-lg hover:bg-gold-dark transition-colors cursor-pointer"
            >
              <Phone className="h-5 w-5" />
              Falar com Advogado
            </a>
          </div>
        </div>
      )}


      {/* ═══════════════════════════════════════════════════
          HERO — Editorial, full-bleed, asymmetric
      ═══════════════════════════════════════════════════ */}
      <section id="inicio" className="relative min-h-[100dvh] bg-navy flex flex-col lg:flex-row lg:items-end overflow-hidden">
        
        {/* Background: monogram at low opacity */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-[420px] h-[420px] opacity-[0.03]">
            <Image 
              src="/brand/file_00000000611c720ebece5ee323503a39.png" 
              alt="" aria-hidden="true"
              fill className="object-contain"
              sizes="420px"
            />
          </div>
        </div>

        {/* Subtle radial gradient for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(197,168,128,0.08)_0%,_transparent_60%)] pointer-events-none" />

        {/* ── MOBILE LAYOUT ── */}
        <div className="lg:hidden relative z-10 w-full flex flex-col min-h-[100dvh] overflow-hidden">
          
          {/* Global Gradient Overlay to seamlessly blend photo into the navy background */}
          <div className="absolute top-[45vh] bottom-0 left-0 right-0 pointer-events-none z-10 flex flex-col">
            <div className="h-[20vh] bg-gradient-to-b from-transparent to-navy" />
            <div className="flex-1 bg-navy" />
          </div>

          {/* Photo area — top portion of screen */}
          <div className="relative w-full pt-48 flex-shrink-0" style={{ minHeight: '65vh' }}>
            <div className="absolute top-28 bottom-0 left-0 right-0 flex justify-end items-end">
              <div className="relative w-[100%] max-w-[420px] h-full -mr-24">
                <Image 
                  src="/brand/IMG-20260526-WA0024.png" 
                  alt="Advogado Lucas Matoso de Morais"
                  fill
                  className="object-contain object-bottom"
                  sizes="420px"
                  quality={100}
                  priority
                />
              </div>
            </div>
            {/* Left side decorative gradient */}
            <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-navy via-navy/50 to-transparent pointer-events-none z-10" />
          </div>

          {/* Content area — bottom portion — pulled up to fill empty space and balance the layout */}
          <div className="relative z-20 flex-1 flex flex-col justify-end px-6 pb-12 -mt-20 safe-area-bottom">
            {/* Gold accent line */}
            <div className="w-10 h-[2px] bg-gold/60 mb-4" />
            
            <p className="text-gold text-[13px] font-semibold tracking-[0.15em] uppercase mb-3">
              Escritório Especializado
            </p>

            <p className="text-white/85 text-[15px] leading-relaxed max-w-sm font-light mb-6">
              Atuação especializada em direito previdenciário, trabalhista e cível. Soluções jurídicas transparentes e focadas nos seus direitos.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col gap-3 w-full">
              <a 
                href="https://wa.me/5584991594538"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 bg-gold text-navy font-bold text-sm rounded-xl hover:bg-gold-dark active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-[0_4px_24px_rgba(197,168,128,0.25)]"
              >
                <Phone className="h-4 w-4" />
                Falar com Advogado
              </a>
            </div>
          </div>
        </div>

        {/* ── DESKTOP LAYOUT (unchanged) ── */}
        <div className="hidden lg:grid relative z-10 w-full px-12 pb-16 pt-32 grid-cols-12 gap-8 items-end">
          
          {/* Left: Copy */}
          <div className="col-span-6 flex flex-col pt-[550px] relative z-20">
            <p className="text-gold text-sm font-medium tracking-wide mb-5">
              Escritório Especializado
            </p>

            <p className="text-gray-300 text-xl leading-relaxed mt-2 max-w-lg font-light">
              Atuação especializada em direito previdenciário, trabalhista e cível. Soluções jurídicas transparentes e focadas nos seus direitos.
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <a 
                href="https://wa.me/5584991594538"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 bg-gold text-navy font-bold text-sm rounded-lg hover:bg-gold-dark active:scale-[0.98] transition-all duration-200 cursor-pointer pointer-events-auto shadow-[0_0_20px_rgba(212,175,55,0.3)]"
              >
                <Phone className="h-4 w-4" />
                Falar com Advogado
              </a>
              <a 
                href="#atuacao"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 text-white/90 text-sm font-medium rounded-lg hover:border-white/40 hover:bg-white/5 active:scale-[0.98] transition-all duration-200 cursor-pointer pointer-events-auto"
              >
                Áreas de Atuação
                <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            {/* Stats row */}
            <div className="flex gap-10 mt-14 pt-8 border-t border-white/8">
              <div>
                <span className="font-serif text-3xl font-semibold text-white">98%</span>
                <span className="block text-xs text-gray-400 mt-1 uppercase tracking-wider font-medium">Aprovação INSS</span>
              </div>
              <div>
                <span className="font-serif text-3xl font-semibold text-white">+10k</span>
                <span className="block text-xs text-gray-400 mt-1 uppercase tracking-wider font-medium">Atendimentos</span>
              </div>
              <div>
                <span className="font-serif text-3xl font-semibold text-white">+12</span>
                <span className="block text-xs text-gray-400 mt-1 uppercase tracking-wider font-medium">Anos Atuação</span>
              </div>
            </div>
          </div>

          {/* Right: Portrait & Parallax Symbol */}
          <div className="col-span-6 relative flex justify-end w-full max-w-lg mt-0">
            <ScrollReveal animation="fade-up" duration={1000} delay={200} className="relative z-10 w-full max-w-2xl">
              <div className="relative w-full aspect-[3/4] scale-[1.25] origin-bottom">
                {/* Parallax Background Symbol */}
                <div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gold/10 pointer-events-none transition-transform ease-out duration-300 z-0"
                >
                  <Scale className="w-[500px] h-[500px]" strokeWidth={0.5} />
                </div>
                
                <Image 
                  src="/brand/IMG-20260526-WA0024.png" 
                  alt="Advogado Lucas Matoso de Morais"
                  fill
                  className="object-contain object-bottom relative z-10"
                  sizes="2000px"
                  quality={100}
                  priority
                />
                
                {/* Gradient overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-navy via-navy/90 to-transparent pointer-events-none z-20" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section id="sobre" className="pt-16 lg:pt-28 pb-0 bg-cream relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0">
            
            {/* Text Content */}
            <div className="lg:col-span-6 xl:col-span-7 pb-16 lg:pb-28">
              <ScrollReveal animation="fade-up">
                <span className="text-gold-dark text-sm font-medium">Sobre o fundador</span>
                <h2 className="font-serif text-3xl sm:text-4xl text-navy mt-3 leading-tight font-medium">
                  Advogado Lucas Matoso de Morais
                </h2>

                <div className="mt-6 space-y-4 text-gray-600 leading-relaxed text-justify sm:text-left">
                  <p>
                    <strong className="text-navy font-semibold">Lucas Matoso de Morais</strong> atua de forma especializada nas áreas previdenciária e trabalhista, oferecendo atendimento jurídico altamente estratégico, humanizado e personalizado em Mossoró — RN.
                  </p>
                  <p>
                    O escritório busca proporcionar suporte jurídico verdadeiramente acessível, transparente e eficiente. Priorizamos o acompanhamento próximo de cada cliente, analisando todas as particularidades de cada situação para construir a solução ideal.
                  </p>
                  <p>
                    Nosso compromisso inegociável é atuar com o mais alto nível de responsabilidade, ética e dedicação na defesa dos direitos de cada cliente que confia em nossa condução jurídica.
                  </p>
                </div>

                <blockquote className="mt-8 pl-5 border-l-2 border-gold max-w-2xl">
                  <p className="font-serif italic text-navy/80 text-lg leading-snug">
                    &quot;Cada direito conquistado representa uma vida transformada e a justiça restabelecida.&quot;
                  </p>
                  <cite className="block text-sm text-gold-dark font-medium mt-2 not-italic">
                    Dr. Lucas Matoso — OAB/RN 19.453
                  </cite>
                </blockquote>
                
                <div className="pt-10 flex justify-center sm:justify-start">
                  <a 
                    href="https://wa.me/5584991594538"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-7 py-3.5 bg-navy text-white font-semibold text-sm rounded-lg hover:bg-navy-mid active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <Phone className="h-4 w-4" />
                    Falar com Dr. Lucas
                  </a>
                </div>
              </ScrollReveal>
            </div>

            {/* Mobile Image Content (inside flow) */}
            <div className="lg:hidden lg:col-span-6 xl:col-span-5 relative mt-8 lg:mt-0 flex items-end justify-end -mr-5">
               <ScrollReveal animation="fade-up" delay={200} className="w-full">
                 <div className="relative w-full h-[450px] sm:h-[550px]">
                   <Image 
                     src="/brand/IMG-20260526-WA0025.png" 
                     alt="Dr. Lucas Matoso"
                     fill
                     className="object-contain object-right-bottom drop-shadow-2xl"
                     sizes="(max-width: 1024px) 100vw, 2000px"
                     quality={100}
                   />
                 </div>
               </ScrollReveal>
            </div>

          </div>
        </div>

        {/* Desktop Image Content (absolute to section, touching right and bottom) */}
        <div className="hidden lg:block absolute bottom-0 right-0 h-full w-[50vw] max-w-[900px] z-10 pointer-events-none">
          <Image 
            src="/brand/IMG-20260526-WA0025.png" 
            alt="Dr. Lucas Matoso"
            fill
            className="object-contain object-bottom object-right drop-shadow-2xl pointer-events-auto"
            sizes="(max-width: 1024px) 100vw, 2000px"
            quality={100}
            priority
          />
        </div>

        {/* Top Wave (bleeding up from Diferenciais) */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20 pointer-events-none translate-y-[1px]">
          <svg className="relative block w-[calc(100%+1.3px)] h-[35px] sm:h-[50px] lg:h-[70px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C62.33,48.24,151.72,74.92,209.68,80.7,247.38,84.4,285.59,67.65,321.39,56.44Z" className="fill-navy"></path>
          </svg>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          DIFERENCIAIS — Horizontal strip, simple
      ═══════════════════════════════════════════════════ */}
      <section className="py-16 bg-navy">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/8 rounded-lg overflow-hidden">
            
            {[
              { icon: Shield, title: 'Transparência Integral', desc: 'Acompanhamento próximo em todas as instâncias do processo. Você sempre saberá o andamento da sua causa.' },
              { icon: Users2, title: 'Atendimento Humanizado', desc: 'Cada consulta é estruturada para escutar com calma, respeitando sua realidade e necessidades específicas.' },
              { icon: Award, title: 'Especialização Focada', desc: 'Atuação direcionada no INSS, trabalhista e cível. Conhecimento técnico para reverter negativas do INSS.' },
            ].map((item, i) => (
              <ScrollReveal key={item.title} animation="fade-up" delay={i * 80}>
                <div className="bg-navy-mid p-8 lg:p-10 h-full">
                  <item.icon className="h-6 w-6 text-gold mb-5" />
                  <h3 className="font-serif text-lg text-white font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
            
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          ÁREAS DE ATUAÇÃO — Flat cards, no glassmorphism
      ═══════════════════════════════════════════════════ */}
      <section id="atuacao" className="relative py-20 lg:py-28 bg-cream pt-28 lg:pt-36">
        {/* Bottom Wave (bleeding down from Diferenciais) */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180 z-20 pointer-events-none -translate-y-[1px]">
          <svg className="relative block w-[calc(100%+1.3px)] h-[35px] sm:h-[50px] lg:h-[70px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C62.33,48.24,151.72,74.92,209.68,80.7,247.38,84.4,285.59,67.65,321.39,56.44Z" className="fill-navy"></path>
          </svg>
        </div>

        <div className="max-w-6xl mx-auto px-5 relative z-30">
          
          <ScrollReveal animation="fade-up">
            <div className="max-w-xl mb-14">
              <span className="text-gold-dark text-sm font-medium">Prática Jurídica</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-navy mt-3 leading-tight font-medium">
                Áreas de Atuação
              </h2>
              <p className="text-gray-500 mt-4 leading-relaxed">
                Foco técnico voltado a amparar o trabalhador, assegurar benefícios previdenciários e resolver conflitos cíveis com eficiência.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            
            {/* Previdenciário */}
            <ScrollReveal animation="fade-up" delay={0}>
              <a 
                href="https://wa.me/5584991594538?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20Direito%20Previdenci%C3%A1rio"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white border border-gray-200 rounded-lg p-7 hover:border-gold/50 hover:shadow-md active:scale-[0.98] transition-all duration-200 h-full cursor-pointer group"
              >
                <div className="h-10 w-10 rounded-md bg-navy flex items-center justify-center text-gold mb-5">
                  <Scale className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-xl text-navy font-semibold mb-3">Direito Previdenciário</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  Defesa integral dos seus direitos junto ao INSS. Auxiliamos no pleito, reativação ou revisão de aposentadorias, pensões e benefícios diversos.
                </p>
                <span className="inline-flex items-center gap-1 text-gold-dark text-sm font-medium group-hover:gap-2 transition-all">
                  Saiba mais <ChevronRight className="h-4 w-4" />
                </span>
              </a>
            </ScrollReveal>

            {/* Trabalhista */}
            <ScrollReveal animation="fade-up" delay={80}>
              <a 
                href="https://wa.me/5584991594538?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20Direito%20Trabalhista"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white border border-gray-200 rounded-lg p-7 hover:border-gold/50 hover:shadow-md active:scale-[0.98] transition-all duration-200 h-full cursor-pointer group"
              >
                <div className="h-10 w-10 rounded-md bg-navy flex items-center justify-center text-gold mb-5">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-xl text-navy font-semibold mb-3">Direito Trabalhista</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  Defesa dos direitos dos trabalhadores. Atuamos em rescisões, horas extras, verbas devidas e demais questões da relação de trabalho.
                </p>
                <span className="inline-flex items-center gap-1 text-gold-dark text-sm font-medium group-hover:gap-2 transition-all">
                  Saiba mais <ChevronRight className="h-4 w-4" />
                </span>
              </a>
            </ScrollReveal>

            {/* Cível */}
            <ScrollReveal animation="fade-up" delay={160}>
              <a 
                href="https://wa.me/5584991594538?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20Direito%20C%C3%ADvel"
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white border border-gray-200 rounded-lg p-7 hover:border-gold/50 hover:shadow-md active:scale-[0.98] transition-all duration-200 h-full cursor-pointer group"
              >
                <div className="h-10 w-10 rounded-md bg-navy flex items-center justify-center text-gold mb-5">
                  <Users2 className="h-5 w-5" />
                </div>
                <h3 className="font-serif text-xl text-navy font-semibold mb-3">Direito Cível</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">
                  Soluções para conflitos familiares, contratuais e do cotidiano. Foco em resoluções rápidas e com mínimo impacto emocional e financeiro.
                </p>
                <span className="inline-flex items-center gap-1 text-gold-dark text-sm font-medium group-hover:gap-2 transition-all">
                  Saiba mais <ChevronRight className="h-4 w-4" />
                </span>
              </a>
            </ScrollReveal>

          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          SERVIÇOS — Simple two-column list, not a 3x3 grid
      ═══════════════════════════════════════════════════ */}
      <section id="servicos" className="py-20 lg:py-28 bg-cream-warm">
        <div className="max-w-6xl mx-auto px-5">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left: heading */}
            <div className="lg:col-span-4">
              <ScrollReveal animation="fade-up">
                <span className="text-gold-dark text-sm font-medium">Serviços</span>
                <h2 className="font-serif text-3xl sm:text-4xl text-navy mt-3 leading-tight font-medium">
                  O que fazemos por você
                </h2>
                <p className="text-gray-500 mt-4 leading-relaxed text-sm">
                  Atendimento especializado para cada tipo de demanda jurídica. Tire sua dúvida pelo WhatsApp.
                </p>
                <a 
                  href="https://wa.me/5584991594538"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-6 text-gold-dark font-medium text-sm hover:text-navy transition-colors cursor-pointer"
                >
                  Consultar outros benefícios <ChevronRight className="h-4 w-4" />
                </a>
              </ScrollReveal>
            </div>

            {/* Right: service list */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0">
                {[
                  { title: 'BPC/LOAS', desc: 'Assistência para idosos e portadores de deficiência de baixa renda.' },
                  { title: 'Auxílio-doença', desc: 'Benefício por incapacidade temporária — concessão e restabelecimento.' },
                  { title: 'Salário-Maternidade', desc: 'Amparo às mães seguradas em virtude do nascimento de filho.' },
                  { title: 'Pensão por Morte', desc: 'Garantia de amparo aos dependentes após perda de familiar provedor.' },
                  { title: 'Auxílio-acidente', desc: 'Indenização previdenciária mensal para segurados com sequelas.' },
                  { title: 'Benefícios Indeferidos', desc: 'Recursos contra decisões negativas do INSS.' },
                  { title: 'Aposentadoria Rural', desc: 'Amparo para trabalhadores do campo e pescadores artesanais.' },
                  { title: 'Processos Trabalhistas', desc: 'Verbas em atraso, assédio, rescisões e horas extras.' },
                ].map((service, i) => (
                  <ScrollReveal key={service.title} animation="fade-up" delay={i * 40}>
                    <div className="py-5 border-b border-gray-200/80">
                      <h4 className="font-serif text-navy font-semibold text-base">{service.title}</h4>
                      <p className="text-gray-500 text-sm mt-1 leading-relaxed">{service.desc}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          DEPOIMENTOS — Clean cards on light bg, no glass
      ═══════════════════════════════════════════════════ */}
      <section id="depoimentos" className="py-20 lg:py-28 bg-cream">
        <div className="max-w-6xl mx-auto px-5">
          
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-14">
              <span className="text-gold-dark text-sm font-medium">Depoimentos</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-navy mt-3 font-medium">
                O que nossos clientes dizem
              </h2>
            </div>
          </ScrollReveal>

          <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-4 md:gap-6 pb-8 md:pb-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-5 px-5 md:mx-0 md:px-0">
            
            {[
              {
                text: 'Gostei muito da transparência e da atenção no atendimento. Me senti extremamente seguro durante todo o acompanhamento do meu benefício.',
                name: 'Claudio Damaceno',
                location: 'Mossoró — RN'
              },
              {
                text: 'Profissional atencioso, responsável e verdadeiramente comprometido com o cliente. Recomendo pela clareza e pelo excelente atendimento humanizado.',
                name: 'Marcos Almeida',
                location: 'Assu — RN'
              },
              {
                text: 'Fui muito bem atendida desde o primeiro contato no WhatsApp. Recebi todas as orientações de forma clara e tive suporte em cada etapa para obter minha aposentadoria.',
                name: 'Maria Helena',
                location: 'Baraúna — RN'
              },
            ].map((t, i) => (
              <ScrollReveal key={t.name} animation="fade-up" delay={i * 80} className="min-w-[85vw] md:min-w-0 snap-center flex">
                <div className="bg-white border border-gray-200 rounded-xl p-7 h-full flex flex-col justify-between w-full shadow-sm">
                  <div>
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, j) => (
                        <svg key={j} className="h-4 w-4 text-gold fill-gold" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-600 text-[15px] leading-relaxed">{t.text}</p>
                  </div>
                  <div className="mt-6 pt-5 border-t border-gray-100 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-cream-warm flex items-center justify-center text-navy font-serif font-bold text-lg">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <span className="block font-serif text-navy font-semibold">{t.name}</span>
                      <span className="text-xs text-gray-400 block">{t.location}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}

          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          CONTATO — Clean, split layout
      ═══════════════════════════════════════════════════ */}
      {/* ═══════════════════════════════════════════════════
          AGENDAMENTO ONLINE
      ═══════════════════════════════════════════════════ */}
      <section id="agendamento" className="py-20 lg:py-28 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-5">
          <ScrollReveal animation="fade-up" className="text-center mb-12">
            <span className="text-gold-dark text-sm font-medium">Agendamento Online</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-navy mt-3 leading-tight font-medium">
              Agende sua Consulta
            </h2>
            <p className="text-gray-500 mt-4 leading-relaxed max-w-2xl mx-auto">
              Descreva seu caso e nossa equipe entrará em contato via WhatsApp para agendar seu atendimento online ou presencial.
            </p>
          </ScrollReveal>
          
          <ScrollReveal animation="fade-up" delay={80}>
            <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-xl p-7 sm:p-10 space-y-6 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-navy mb-1.5">
                    Seu nome
                  </label>
                  <input 
                    type="text" 
                    id="nome" 
                    name="nome"
                    required
                    placeholder="Nome completo"
                    className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm text-navy placeholder-gray-400 focus:outline-none focus:border-gold transition-colors bg-gray-50"
                  />
                </div>
                <div>
                  <label htmlFor="servico" className="block text-sm font-medium text-navy mb-1.5">
                    Serviço de interesse
                  </label>
                  <select 
                    id="servico" 
                    name="servico"
                    required
                    defaultValue=""
                    className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm text-navy focus:outline-none focus:border-gold transition-colors bg-gray-50"
                  >
                    <option value="" disabled>Selecione a área</option>
                    <option value="BPC/LOAS">BPC/LOAS</option>
                    <option value="Auxílio-doença">Auxílio-doença</option>
                    <option value="Pensão por Morte">Pensão por Morte</option>
                    <option value="Salário-Maternidade">Salário-Maternidade</option>
                    <option value="Aposentadoria Rural">Aposentadoria Rural</option>
                    <option value="Reverter Benefício Indeferido">Reverter Benefício Indeferido</option>
                    <option value="Processo Trabalhista">Processo Trabalhista</option>
                    <option value="Processo Cível">Processo Cível / Família</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="mensagem" className="block text-sm font-medium text-navy mb-1.5">
                  Breve descrição do caso
                </label>
                <textarea 
                  id="mensagem" 
                  name="mensagem"
                  required
                  rows={4}
                  placeholder="Conte brevemente sobre o seu caso..."
                  className="w-full border border-gray-200 rounded-md px-4 py-3 text-sm text-navy placeholder-gray-400 focus:outline-none focus:border-gold transition-colors bg-gray-50 resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-4 bg-navy text-white font-semibold text-base rounded-md hover:bg-navy-mid active:scale-[0.98] transition-all cursor-pointer mt-2"
              >
                <Phone className="h-5 w-5" />
                Agendar Consulta via WhatsApp
              </button>

              <p className="text-xs text-gray-400 text-center leading-relaxed">
                Ao enviar, você será direcionado ao WhatsApp do Dr. Lucas para conclusão do agendamento.
              </p>
            </form>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          CONTATO E LOCALIZAÇÃO
      ═══════════════════════════════════════════════════ */}
      <section id="contato" className="py-20 lg:py-28 bg-cream-warm">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Left: info */}
            <div>
              <ScrollReveal animation="fade-up">
                <span className="text-gold-dark text-sm font-medium">Nosso Escritório</span>
                <h2 className="font-serif text-3xl sm:text-4xl text-navy mt-3 leading-tight font-medium">
                  Localização e Contato
                </h2>
                <p className="text-gray-500 mt-4 leading-relaxed">
                  Venha tomar um café conosco ou entre em contato pelos nossos canais de atendimento.
                </p>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={80}>
                <div className="mt-10 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-md bg-navy flex items-center justify-center text-gold flex-shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Localização</span>
                      <p className="text-navy font-medium text-sm mt-0.5">Mossoró — RN</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-md bg-navy flex items-center justify-center text-gold flex-shrink-0">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">WhatsApp</span>
                      <a href="tel:+5584991594538" className="block text-navy font-medium text-sm mt-0.5 hover:text-gold-dark transition-colors cursor-pointer">(84) 9 9159-4538</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-md bg-navy flex items-center justify-center text-gold flex-shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">E-mail</span>
                      <a href="mailto:Lucasmm.advogado@gmail.com" className="block text-navy font-medium text-sm mt-0.5 hover:text-gold-dark transition-colors cursor-pointer">Lucasmm.advogado@gmail.com</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 rounded-md bg-navy flex items-center justify-center text-gold flex-shrink-0">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Horário</span>
                      <p className="text-navy font-medium text-sm mt-0.5">Seg. a Sex. 8h–18h · Sáb. 8h–12h</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              {/* Social links */}
              <ScrollReveal animation="fade-up" delay={160}>
                <div className="flex gap-3 mt-10">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-md border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gold-dark hover:border-gold/40 transition-all cursor-pointer" aria-label="Instagram">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                  </a>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-md border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gold-dark hover:border-gold/40 transition-all cursor-pointer" aria-label="Facebook">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-md border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gold-dark hover:border-gold/40 transition-all cursor-pointer" aria-label="LinkedIn">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect width="4" height="12" x="2" y="9"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  </a>
                </div>
              </ScrollReveal>

            </div>

            {/* Right: Map */}
            <div>
              <ScrollReveal animation="fade-up" delay={80} className="h-full">
                <div className="w-full h-full min-h-[300px] lg:min-h-[400px] rounded-xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50">
                  <MinimalMap center={[-37.3438, -5.188]} zoom={13.5} />
                </div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════
          FOOTER — Simple, dignified
      ═══════════════════════════════════════════════════ */}
      <footer className="bg-navy text-white py-14">
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
            
            {/* Brand */}
            <div className="md:col-span-5">
              <a href="#inicio" className="flex items-center gap-2.5 cursor-pointer">
                <div className="relative h-10 w-44 flex-shrink-0">
                  <Image 
                    src="/brand/logo_horizontal.png" 
                    alt="Matoso Morais Advocacia"
                    fill
                    className="object-contain brightness-0 invert"
                    sizes="176px"
                  />
                </div>
              </a>
              <p className="text-gray-400 text-sm leading-relaxed mt-5 max-w-sm">
                Atendimento jurídico focado em garantir sua tranquilidade e restabelecer seus direitos com competência e respeito.
              </p>
            </div>

            {/* Nav */}
            <div className="md:col-span-3">
              <h4 className="text-sm font-semibold text-white mb-4">Navegação</h4>
              <ul className="space-y-2.5 text-sm text-gray-400">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a href={`#${link.id}`} className="hover:text-gold transition-colors cursor-pointer">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Info */}
            <div className="md:col-span-4">
              <h4 className="text-sm font-semibold text-white mb-4">Informações</h4>
              <p className="text-gray-400 text-sm">OAB/RN Nº 19.453</p>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                Somos uma empresa inclusiva. Entre em contato caso precise de adaptações ou recursos de acessibilidade.
              </p>
            </div>

          </div>

          <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
            <p>© {new Date().getFullYear()} Matoso Morais Advocacia. Todos os direitos reservados.</p>
            <div className="flex gap-5">
              <a href="#inicio" className="hover:text-gold transition-colors cursor-pointer">Termos de Uso</a>
              <a href="#inicio" className="hover:text-gold transition-colors cursor-pointer">Política de Privacidade</a>
            </div>
          </div>
        </div>
      </footer>


      {/* Back to top */}
      {showBackToTop && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
          <a 
            href="#inicio" 
            className="h-10 w-10 rounded-full bg-navy border border-white/10 text-gold flex items-center justify-center shadow-lg hover:bg-navy-mid active:scale-95 transition-all cursor-pointer"
            aria-label="Voltar ao topo"
          >
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      )}

    </div>
  );
}
