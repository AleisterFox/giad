import { useEffect, useRef } from 'react';
import anime from 'animejs';

export default function AnimatedSection({ 
  children, 
  className = '',
  animation = 'fadeInUp',
  delay = 0,
  duration = 1000 
}) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    // Configuraciones de animación
    const animations = {
      fadeInUp: {
        opacity: [0, 1],
        translateY: [50, 0],
      },
      fadeInLeft: {
        opacity: [0, 1],
        translateX: [-50, 0],
      },
      fadeInRight: {
        opacity: [0, 1],
        translateX: [50, 0],
      },
      scaleIn: {
        opacity: [0, 1],
        scale: [0.8, 1],
      },
      slideInDown: {
        opacity: [0, 1],
        translateY: [-50, 0],
      }
    };

    // Configurar estado inicial
    anime.set(element, {
      opacity: 0,
      ...(animations[animation] || animations.fadeInUp)
    });

    // Crear observer para activar animación cuando sea visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: element,
              ...animations[animation] || animations.fadeInUp,
              duration,
              delay,
              easing: 'easeOutCubic',
            });
            observer.unobserve(element);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [animation, delay, duration]);

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  );
}