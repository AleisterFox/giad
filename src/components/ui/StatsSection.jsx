import { useEffect, useRef, useState } from 'react';
import AnimatedCounter from '../animations/AnimatedCounter';
import AnimatedSection from '../animations/AnimatedSection';

export default function StatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    {
      number: 150,
      suffix: '+',
      label: 'Proyectos Completados',
      description: 'Soluciones entregadas con éxito'
    },
    {
      number: 50,
      suffix: '+',
      label: 'Clientes Satisfechos',
      description: 'Empresas que confían en nosotros'
    },
    {
      number: 95,
      suffix: '%',
      label: 'Eficiencia Energética',
      description: 'Promedio en instalaciones solares'
    },
    {
      number: 24,
      suffix: '/7',
      label: 'Soporte Técnico',
      description: 'Disponibilidad continua'
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-secondary-50 to-primary-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection animation="fadeInUp" className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary-900 mb-4">
            Resultados que Hablan por Sí Solos
          </h2>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Nuestra experiencia y dedicación se reflejan en cada proyecto que realizamos
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <AnimatedSection
              key={index}
              animation="scaleIn"
              delay={index * 200}
              className="text-center"
            >
              <div className="bg-white rounded-2xl p-8 shadow-card hover:shadow-cardHover transition-all duration-300 group">
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  <AnimatedCounter
                    end={stat.number}
                    suffix={stat.suffix}
                    duration={2000 + index * 200}
                    trigger={isVisible}
                  />
                </div>
                <h3 className="text-lg font-semibold text-secondary-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {stat.label}
                </h3>
                <p className="text-secondary-600 text-sm">
                  {stat.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}