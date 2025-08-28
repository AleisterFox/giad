import { motion } from "framer-motion";
import { 
  Users, 
  Award, 
  Target, 
  Lightbulb,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import Heading from "../components/ui/Heading";
import TechCard from "../components/ui/TechCard";
import AnimatedSection from "../components/animations/AnimatedSection";
import AnimatedCounter from "../components/animations/AnimatedCounter";
import EngineeringScene from "../components/3d/EngineeringScene";
import useApi from "../hooks/useApi";
import { ErrorMsg, Skeleton } from "../components/ui/Feedback";
import { useState, useEffect, useRef } from "react";

// Hero de About
function AboutHero() {
  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-secondary-900 via-navy-800 to-primary-900 text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <EngineeringScene variant="solar" />
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <AnimatedSection animation="fadeInUp">
          <Heading level={1} className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-primary-200">
            Sobre GIAD
          </Heading>
          <p className="text-xl text-secondary-300 max-w-3xl mx-auto">
            Ingenieros apasionados por transformar ideas complejas en soluciones reales
          </p>
        </AnimatedSection>
      </div>
    </div>
  );
}

// Componente de estadísticas animadas
function StatsSection() {
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
    { number: 8, suffix: '+', label: 'Años de Experiencia' },
    { number: 150, suffix: '+', label: 'Proyectos Exitosos' },
    { number: 50, suffix: '+', label: 'Clientes Satisfechos' },
    { number: 15, suffix: '', label: 'Especialistas' }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-primary-50">
      <Container>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <AnimatedSection
              key={index}
              animation="scaleIn"
              delay={index * 150}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary-600 mb-2">
                <AnimatedCounter
                  end={stat.number}
                  suffix={stat.suffix}
                  duration={2000 + index * 200}
                  trigger={isVisible}
                />
              </div>
              <div className="text-secondary-600 font-medium">{stat.label}</div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </section>
  );
}

// Componente de valores
function ValuesSection() {
  const values = [
    {
      icon: <Target className="w-12 h-12" />,
      title: "Precisión Técnica",
      description: "Cada proyecto se ejecuta con estándares de ingeniería de clase mundial, garantizando resultados exactos y confiables."
    },
    {
      icon: <Lightbulb className="w-12 h-12" />,
      title: "Innovación Continua",
      description: "Adoptamos las últimas tecnologías y metodologías para ofrecer soluciones que marquen la diferencia."
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Colaboración Estrecha",
      description: "Trabajamos como una extensión de tu equipo, entendiendo profundamente tus necesidades y objetivos."
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: "Excelencia Comprobada",
      description: "Nuestro historial de proyectos exitosos respalda nuestro compromiso con la calidad superior."
    }
  ];

  return (
    <Section as="section" className="py-24 bg-white">
      <Container>
        <AnimatedSection animation="fadeInUp" className="text-center mb-16">
          <Heading level={2} className="text-4xl font-bold text-secondary-900 mb-6">
            Nuestros Valores Fundamentales
          </Heading>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Los principios que guían cada decisión y definen nuestra cultura de trabajo
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <TechCard
              key={index}
              icon={value.icon}
              title={value.title}
              description={value.description}
              delay={index * 200}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}

// Componente de equipo
function TeamSection() {
  const team = [
    {
      name: "Dr. Carlos Mendoza",
      role: "Director de Ingeniería",
      specialization: "Diseño Mecánico & CAD",
      experience: "15+ años",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg"
    },
    {
      name: "Ing. Ana Rodríguez",
      role: "Especialista en Energía Solar",
      specialization: "Sistemas Fotovoltaicos",
      experience: "12+ años",
      image: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg"
    },
    {
      name: "Ing. Miguel Torres",
      role: "Jefe de Manufactura",
      specialization: "Maquinado CNC",
      experience: "10+ años",
      image: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg"
    }
  ];

  return (
    <Section as="section" className="py-24 bg-secondary-50">
      <Container>
        <AnimatedSection animation="fadeInUp" className="text-center mb-16">
          <Heading level={2} className="text-4xl font-bold text-secondary-900 mb-6">
            Nuestro Equipo de Expertos
          </Heading>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Profesionales altamente calificados con experiencia comprobada en proyectos industriales
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <AnimatedSection
              key={index}
              animation="scaleIn"
              delay={index * 200}
            >
              <motion.div
                className="bg-white rounded-2xl p-8 shadow-card hover:shadow-cardHover transition-all duration-300 text-center group"
                whileHover={{ y: -5 }}
              >
                <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-bold text-secondary-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-semibold mb-2">
                  {member.role}
                </p>
                <p className="text-secondary-600 mb-2">
                  {member.specialization}
                </p>
                <div className="inline-flex items-center px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-sm font-medium">
                  {member.experience}
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// Componente de proceso
function ProcessSection() {
  const process = [
    {
      step: "01",
      title: "Consultoría Inicial",
      description: "Análisis detallado de requerimientos técnicos y objetivos del proyecto"
    },
    {
      step: "02",
      title: "Propuesta Técnica",
      description: "Desarrollo de solución personalizada con especificaciones y cronograma"
    },
    {
      step: "03",
      title: "Desarrollo & Validación",
      description: "Implementación con pruebas rigurosas y validación de resultados"
    },
    {
      step: "04",
      title: "Entrega & Soporte",
      description: "Despliegue final con documentación completa y soporte continuo"
    }
  ];

  return (
    <Section as="section" className="py-24 bg-gradient-to-br from-secondary-900 to-navy-800 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <EngineeringScene variant="gears" />
      </div>
      
      <Container className="relative z-10">
        <AnimatedSection animation="fadeInUp" className="text-center mb-16">
          <Heading level={2} className="text-4xl font-bold mb-6">
            Nuestro Proceso de Trabajo
          </Heading>
          <p className="text-xl text-secondary-300 max-w-3xl mx-auto">
            Metodología estructurada que garantiza resultados exitosos en cada proyecto
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {process.map((item, index) => (
            <AnimatedSection
              key={index}
              animation="fadeInUp"
              delay={index * 200}
            >
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-primary-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-secondary-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export default function About() {
  const { data, loading, error } = useApi("/paginas/nosotros");

  if (loading) return <Skeleton />;
  if (error) return <ErrorMsg error={error} />;

  return (
    <>
      <AboutHero />
      <main>
        <StatsSection />
        
        {/* Contenido de la API si existe */}
        {data?.content && (
          <Section as="section" className="py-24 bg-white">
            <Container>
              <AnimatedSection animation="fadeInUp">
                <article 
                  className="prose prose-lg prose-primary max-w-4xl mx-auto text-secondary-700"
                  dangerouslySetInnerHTML={{ __html: data.content }}
                />
              </AnimatedSection>
            </Container>
          </Section>
        )}

        <ValuesSection />
        <TeamSection />
        <ProcessSection />

        {/* CTA */}
        <Section as="section" className="py-24 bg-white">
          <Container>
            <AnimatedSection animation="scaleIn">
              <div className="bg-gradient-to-r from-primary-600 to-navy-700 rounded-3xl p-12 text-white text-center">
                <Heading level={2} className="text-3xl md:text-4xl font-bold mb-6">
                  ¿Listo para Trabajar Juntos?
                </Heading>
                <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                  Descubre cómo nuestro equipo puede ayudarte a alcanzar tus objetivos técnicos más ambiciosos.
                </p>
                <motion.button
                  className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-secondary-100 transition-colors group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Iniciar Conversación
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </AnimatedSection>
          </Container>
        </Section>
      </main>
    </>
  );
}