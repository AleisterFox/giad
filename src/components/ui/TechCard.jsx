import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import anime from "animejs";

export default function TechCard({ 
  icon, 
  title, 
  description, 
  features = [],
  className = "",
  delay = 0 
}) {
  const cardRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const iconEl = iconRef.current;
    
    if (!card || !iconEl) return;

    // Animación inicial de la tarjeta
    anime.set(card, {
      opacity: 0,
      translateY: 30,
      scale: 0.95
    });

    // Observer para activar animación
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animar tarjeta
            anime({
              targets: card,
              opacity: [0, 1],
              translateY: [30, 0],
              scale: [0.95, 1],
              duration: 800,
              delay: delay,
              easing: 'easeOutCubic',
            });

            // Animar icono con efecto de pulso
            anime({
              targets: iconEl,
              scale: [1, 1.1, 1],
              duration: 1000,
              delay: delay + 400,
              easing: 'easeInOutSine',
            });

            observer.unobserve(card);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(card);

    return () => observer.disconnect();
  }, [delay]);

  return (
    <motion.div
      ref={cardRef}
      className={`group relative bg-white border border-secondary-200 rounded-2xl p-8 shadow-card hover:shadow-cardHover transition-all duration-300 ${className}`}
      whileHover={{ y: -5 }}
      onHoverStart={() => {
        anime({
          targets: iconRef.current,
          rotate: [0, 5, -5, 0],
          duration: 600,
          easing: 'easeInOutSine'
        });
      }}
    >
      {/* Efecto de brillo en hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-accent-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10">
        {/* Icono */}
        <div ref={iconRef} className="mb-6 text-primary-500">
          {icon}
        </div>

        {/* Título */}
        <h3 className="text-xl font-bold text-secondary-900 mb-4 group-hover:text-primary-600 transition-colors">
          {title}
        </h3>

        {/* Descripción */}
        <p className="text-secondary-600 mb-6 leading-relaxed">
          {description}
        </p>

        {/* Features */}
        {features.length > 0 && (
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-secondary-700">
                <div className="w-1.5 h-1.5 bg-accent-500 rounded-full mr-3 flex-shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        {/* Indicador de hover */}
        <div className="absolute bottom-4 right-4 w-2 h-2 bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  );
}