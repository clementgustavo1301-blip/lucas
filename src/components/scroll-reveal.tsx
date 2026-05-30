'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fade-up' | 'fade-down' | 'fade-in' | 'scale-up' | 'slide-left' | 'slide-right' | 'zoom-in';
  duration?: number;
  delay?: number;
  threshold?: number;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  className = '',
  animation = 'fade-up',
  duration = 800,
  delay = 0,
  threshold = 0.05,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, once]);

  const transitionStyles = {
    transitionProperty: 'opacity, transform',
    transitionDuration: `${duration}ms`,
    transitionDelay: `${delay}ms`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  };

  const getAnimationStyles = () => {
    if (isVisible) {
      return {
        opacity: 1,
        transform: 'none',
      };
    }

    const styles: React.CSSProperties = {
      opacity: 0,
    };

    switch (animation) {
      case 'fade-up':
        styles.transform = 'translateY(30px)';
        break;
      case 'fade-down':
        styles.transform = 'translateY(-30px)';
        break;
      case 'scale-up':
        styles.transform = 'scale(0.95)';
        break;
      case 'zoom-in':
        styles.transform = 'scale(0.88)';
        break;
      case 'slide-left':
        styles.transform = 'translateX(30px)';
        break;
      case 'slide-right':
        styles.transform = 'translateX(-30px)';
        break;
      case 'fade-in':
      default:
        break;
    }

    return styles;
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...transitionStyles,
        ...getAnimationStyles(),
      }}
    >
      {children}
    </div>
  );
}
