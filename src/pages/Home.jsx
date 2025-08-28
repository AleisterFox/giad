import { motion } from "framer-motion";
import { 
  Cpu, 
  Layers, 
  SunMedium, 
  Quote, 
  Zap, 
  Settings, 
  Shield,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import Heading from "../components/ui/Heading";
import Button from "../components/ui/Button";
import TechCard from "../components/ui/TechCard";
import StatsSection from "../components/ui/StatsSection";
import AnimatedSection from "../components/animations/AnimatedSection";
import EngineeringScene from "../components/3d/EngineeringScene";
import useApi from "../hooks/useApi";
import { ErrorMsg, SkeletonGrid } from "../components/ui/Feedback";

// --- Componente Hero mejorado ---
function Hero() {
  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-secondary-900 via-navy-800 to-dark-900 text-white overflow-hidden">
      {/* Fondo 3D */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <EngineeringScene variant="gears" />
      </div>
      
      {/* Efectos de fondo */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
        <AnimatedSection animation="fadeInUp" className="space-y-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="inline-flex items-center px-4 py-2 bg-primary-500/20 border border-primary-500/30 rounded-full text-primary-300 text-sm font-medium mb-6">
              <Zap className="w-4 h-4 mr-2" />
              Innovación Tecnológica Industrial
            </div>
            
            <Heading
              level={1}
              className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-primary-200 to-accent-300"
            >
              Ingeniería del Futuro
            </Heading>
            
            <p className="text-xl md:text-2xl text-secondary-300 max-w-4xl mx-auto leading-relaxed">
              Transformamos ideas complejas en soluciones industriales reales. 
              Desde diseño 3D hasta energía sostenible, creamos tecnología que impulsa el progreso.
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Button className="px-8 py-4 text-lg font-semibold bg-primary-600 hover:bg-primary-500 text-white rounded-xl shadow-glow transition-all duration-300 group">
              Explorar Servicios
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button className="px-8 py-4 text-lg font-semibold bg-transparent border-2 border-accent-500 text-accent-400 hover:bg-accent-500 hover:text-white rounded-xl transition-all duration-300">
              Ver Portafolio
            </Button>
          </motion.div>

          {/* Indicadores de características */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { icon: <Settings className="w-6 h-6" />, text: "Precisión Industrial" },
              { icon: <Shield className="w-6 h-6" />, text: "Calidad Garantizada" },
              { icon: <Zap className="w-6 h-6" />, text: "Tecnología Avanzada" }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-center space-x-3 text-secondary-300">
                <div className="text-accent-400">{item.icon}</div>
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </AnimatedSection>
      </div>
    </div>
  );
}

// --- Componente de Servicios mejorado ---
function ServicesSection() {
  const services = [
    {
      icon: <Layers className="w-12 h-12" />,
      title: "Diseño 3D & Prototipado",
      description: "Desarrollamos modelos tridimensionales precisos y prototipos funcionales utilizando tecnología CAD avanzada y impresión 3D industrial.",
      features: [
        "Modelado CAD profesional",
        "Prototipado rápido",
        "Análisis de elementos finitos",
        "Optimización de diseño"
      ]
    },
    {
      icon: <Cpu className="w-12 h-12" />,
      title: "Maquinado CNC de Precisión",
      description: "Fabricamos componentes con tolerancias milimétricas usando maquinaria CNC de última generación para aplicaciones industriales críticas.",
      features: [
        "Tolerancias ±0.01mm",
        "Materiales especializados",
        "Control de calidad ISO",
        "Producción escalable"
      ]
    },
    {
      icon: <SunMedium className="w-12 h-12" />,
      title: "Sistemas de Energía Solar",
      description: "Diseñamos e instalamos soluciones fotovoltaicas eficientes para reducir costos operativos y huella de carbono empresarial.",
      features: [
        "Análisis energético completo",
        "Sistemas grid-tie y off-grid",
        "Monitoreo inteligente",
        "ROI garantizado"
      ]
    }
  ];

  return (
    <Section as="section" className="py-24 bg-white">
      <Container>
        <AnimatedSection animation="fadeInUp" className="text-center mb-16">
          <Heading level={2} className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
            Soluciones de Ingeniería Integral
          </Heading>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Combinamos experiencia técnica, tecnología avanzada y metodologías probadas 
            para entregar resultados que superan expectativas industriales.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <TechCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              features={service.features}
              delay={index * 200}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}

// --- Componente de Testimonios mejorado ---
function TestimonialsSection() {
  const { data, loading, error } = useApi("/testimonios");
  if (loading) return <SkeletonGrid />;
  if (error) return <ErrorMsg error={error} />;
  const testimonials = Array.isArray(data) ? data : data?.data ?? [];

  return (
    <Section as="section" className="py-24 bg-gradient-to-br from-secondary-50 to-primary-50">
      <Container>
        <AnimatedSection animation="fadeInUp" className="text-center mb-16">
          <Heading level={2} className="text-4xl md:text-5xl font-bold text-secondary-900 mb-6">
            Casos de Éxito Comprobados
          </Heading>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            La confianza de nuestros clientes respalda la calidad de nuestro trabajo
          </p>
        </AnimatedSection>
        
        {testimonials.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {testimonials.slice(0, 4).map((testimonial, index) => (
              <AnimatedSection
                key={testimonial.id || index}
                animation="scaleIn"
                delay={index * 150}
              >
                <motion.div
                  className="bg-white p-8 rounded-2xl shadow-card border border-secondary-100 hover:shadow-cardHover transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <Quote className="w-10 h-10 text-primary-400 mb-6" />
                  <p className="text-secondary-700 italic mb-6 text-lg leading-relaxed">
                    "{testimonial.texto}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                      {testimonial.cliente?.charAt(0) || 'C'}
                    </div>
                    <div>
                      <p className="font-bold text-secondary-900">{testimonial.cliente}</p>
                      <p className="text-sm text-primary-600">{testimonial.cargo}, {testimonial.empresa}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}

// --- Componente de Proceso de Trabajo ---
function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Análisis y Consultoría",
      description: "Evaluamos tus necesidades técnicas y definimos objetivos específicos del proyecto."
    },
    {
      number: "02", 
      title: "Diseño y Desarrollo",
      description: "Creamos soluciones personalizadas usando herramientas CAD y simulación avanzada."
    },
    {
      number: "03",
      title: "Prototipado y Pruebas",
      description: "Validamos el diseño mediante prototipos funcionales y pruebas rigurosas."
    },
    {
      number: "04",
      title: "Implementación",
      description: "Ejecutamos la solución final con control de calidad y seguimiento continuo."
    }
  ];

  return (
    <Section as="section" className="py-24 bg-secondary-900 text-white relative overflow-hidden">
      {/* Fondo 3D */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <EngineeringScene variant="circuit" />
      </div>
      
      <Container className="relative z-10">
        <AnimatedSection animation="fadeInUp" className="text-center mb-16">
          <Heading level={2} className="text-4xl md:text-5xl font-bold mb-6">
            Metodología Probada
          </Heading>
          <p className="text-xl text-secondary-300 max-w-3xl mx-auto">
            Seguimos un proceso estructurado que garantiza resultados exitosos en cada proyecto
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <AnimatedSection
              key={index}
              animation="fadeInUp"
              delay={index * 200}
            >
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-primary-400 transition-colors">
                  {step.title}
                </h3>
                <p className="text-secondary-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </Container>
    </Section>
  );
}

// --- Página Principal ---
export default function Home() {
  return (
    <>
      <Hero />
      <main>
        <ServicesSection />
        <StatsSection />
        <ProcessSection />
        <TestimonialsSection />
        
        {/* CTA Final */}
        <Section as="section" className="py-24 bg-gradient-to-r from-primary-600 to-navy-700 text-white text-center">
          <Container>
            <AnimatedSection animation="scaleIn">
              <Heading level={2} className="text-4xl md:text-5xl font-bold mb-6">
                ¿Listo para Innovar?
              </Heading>
              <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
                Únete a las empresas que ya están transformando sus procesos con nuestras soluciones de ingeniería avanzada.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="px-10 py-4 text-xl font-semibold bg-white text-primary-600 hover:bg-secondary-100 rounded-xl shadow-glow-orange transition-all duration-300">
                  Iniciar Proyecto
                </Button>
                <Button className="px-10 py-4 text-xl font-semibold bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 rounded-xl transition-all duration-300">
                  Agendar Consulta
                </Button>
              </div>
            </AnimatedSection>
          </Container>
        </Section>
      </main>
    </>
  );
}