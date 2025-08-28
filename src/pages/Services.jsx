import { motion } from "framer-motion";
import { 
  Layers, 
  Cpu, 
  SunMedium, 
  Zap, 
  Settings, 
  Shield,
  ArrowRight,
  CheckCircle,
  Wrench,
  BarChart3
} from "lucide-react";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import Heading from "../components/ui/Heading";
import TechCard from "../components/ui/TechCard";
import AnimatedSection from "../components/animations/AnimatedSection";
import EngineeringScene from "../components/3d/EngineeringScene";
import useApi from "../hooks/useApi";
import { ErrorMsg, SkeletonGrid } from "../components/ui/Feedback";

// Hero específico para servicios
function ServicesHero() {
  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-secondary-900 via-navy-800 to-primary-900 text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <EngineeringScene variant="gears" />
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <AnimatedSection animation="fadeInUp">
          <Heading level={1} className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-primary-200">
            Servicios de Ingeniería
          </Heading>
          <p className="text-xl text-secondary-300 max-w-3xl mx-auto">
            Soluciones técnicas especializadas para impulsar la innovación en tu industria
          </p>
        </AnimatedSection>
      </div>
    </div>
  );
}

// Componente de servicio detallado
function ServiceDetail({ service, index, isReversed = false }) {
  return (
    <AnimatedSection 
      animation={isReversed ? "fadeInRight" : "fadeInLeft"}
      delay={index * 200}
    >
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isReversed ? 'lg:grid-flow-col-dense' : ''}`}>
        {/* Contenido */}
        <div className={isReversed ? 'lg:col-start-2' : ''}>
          <div className="text-primary-500 mb-4">
            {service.icon}
          </div>
          <h3 className="text-3xl font-bold text-secondary-900 mb-6">
            {service.title}
          </h3>
          <p className="text-lg text-secondary-600 mb-8 leading-relaxed">
            {service.description}
          </p>
          
          {/* Características */}
          <div className="space-y-4 mb-8">
            {service.features.map((feature, idx) => (
              <div key={idx} className="flex items-center">
                <CheckCircle className="w-5 h-5 text-accent-500 mr-3 flex-shrink-0" />
                <span className="text-secondary-700">{feature}</span>
              </div>
            ))}
          </div>

          {/* Tecnologías */}
          {service.technologies && (
            <div className="mb-8">
              <h4 className="font-semibold text-secondary-900 mb-4">Tecnologías utilizadas:</h4>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          <motion.button
            className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-500 transition-colors group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Solicitar Cotización
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* Imagen/Visualización 3D */}
        <div className={`${isReversed ? 'lg:col-start-1' : ''} relative`}>
          <div className="aspect-square bg-gradient-to-br from-secondary-100 to-primary-100 rounded-2xl overflow-hidden shadow-card">
            <EngineeringScene variant={service.sceneVariant} />
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

export default function Services() {
  const { data, loading, error } = useApi("/servicios");
  
  const detailedServices = [
    {
      icon: <Layers className="w-16 h-16" />,
      title: "Diseño 3D & Prototipado Industrial",
      description: "Transformamos conceptos en realidades tangibles mediante modelado 3D avanzado, simulación por elementos finitos y prototipado rápido. Nuestro enfoque integral abarca desde el diseño conceptual hasta la validación funcional.",
      features: [
        "Modelado CAD paramétrico con SolidWorks y Fusion 360",
        "Análisis FEA para validación estructural y térmica",
        "Prototipado rápido con impresión 3D industrial",
        "Optimización topológica para reducción de peso",
        "Documentación técnica completa (planos, BOM, especificaciones)"
      ],
      technologies: ["SolidWorks", "Fusion 360", "ANSYS", "Stratasys", "Markforged"],
      sceneVariant: "gears"
    },
    {
      icon: <Cpu className="w-16 h-16" />,
      title: "Maquinado CNC de Alta Precisión",
      description: "Fabricamos componentes críticos con tolerancias excepcionales utilizando centros de maquinado CNC de última generación. Especialistas en materiales aeroespaciales, médicos e industriales.",
      features: [
        "Tolerancias de ±0.005mm en componentes críticos",
        "Maquinado de materiales especiales (titanio, inconel, PEEK)",
        "Control de calidad con CMM y escáneres 3D",
        "Certificaciones ISO 9001 y AS9100",
        "Trazabilidad completa de materiales y procesos"
      ],
      technologies: ["Haas", "DMG Mori", "Mastercam", "Zeiss CMM", "GD&T"],
      sceneVariant: "circuit"
    },
    {
      icon: <SunMedium className="w-16 h-16" />,
      title: "Sistemas Fotovoltaicos Inteligentes",
      description: "Diseñamos e implementamos soluciones de energía solar personalizadas con tecnología de monitoreo avanzado y optimización automática. Maximizamos el ROI y minimizamos el impacto ambiental.",
      features: [
        "Análisis energético detallado con software PVsyst",
        "Sistemas híbridos grid-tie con respaldo de baterías",
        "Monitoreo IoT en tiempo real con alertas predictivas",
        "Optimizadores de potencia a nivel de panel",
        "Garantía de producción energética por 25 años"
      ],
      technologies: ["SolarEdge", "Enphase", "Tesla Powerwall", "PVsyst", "Aurora Solar"],
      sceneVariant: "solar"
    }
  ];

  if (loading) return <SkeletonGrid />;
  if (error) return <ErrorMsg error={error} />;

  return (
    <>
      <ServicesHero />
      <main className="bg-white">
        <Container>
          {/* Servicios detallados */}
          <Section as="section" className="py-24">
            <div className="space-y-32">
              {detailedServices.map((service, index) => (
                <ServiceDetail
                  key={index}
                  service={service}
                  index={index}
                  isReversed={index % 2 === 1}
                />
              ))}
            </div>
          </Section>

          {/* Servicios adicionales de la API */}
          {data && (
            <Section as="section" className="py-24 bg-secondary-50">
              <AnimatedSection animation="fadeInUp" className="text-center mb-16">
                <Heading level={2} className="text-4xl font-bold text-secondary-900 mb-6">
                  Servicios Complementarios
                </Heading>
                <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
                  Ampliamos nuestras capacidades con servicios especializados adicionales
                </p>
              </AnimatedSection>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {(Array.isArray(data) ? data : data?.data ?? []).map((service, index) => (
                  <TechCard
                    key={service.id}
                    icon={<Wrench className="w-12 h-12" />}
                    title={service.title ?? service.name}
                    description={service.description ?? service.excerpt}
                    delay={index * 100}
                  />
                ))}
              </div>
            </Section>
          )}

          {/* Proceso de trabajo */}
          <Section as="section" className="py-24">
            <AnimatedSection animation="fadeInUp" className="text-center mb-16">
              <Heading level={2} className="text-4xl font-bold text-secondary-900 mb-6">
                Nuestro Proceso de Trabajo
              </Heading>
              <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
                Metodología estructurada que garantiza resultados excepcionales
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <BarChart3 className="w-8 h-8" />,
                  title: "Análisis Técnico",
                  description: "Evaluación detallada de requerimientos y factibilidad técnica"
                },
                {
                  icon: <Settings className="w-8 h-8" />,
                  title: "Diseño & Simulación",
                  description: "Desarrollo de soluciones con validación computacional"
                },
                {
                  icon: <Wrench className="w-8 h-8" />,
                  title: "Prototipado",
                  description: "Construcción y pruebas de prototipos funcionales"
                },
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: "Implementación",
                  description: "Despliegue con control de calidad y documentación"
                }
              ].map((step, index) => (
                <AnimatedSection
                  key={index}
                  animation="scaleIn"
                  delay={index * 150}
                >
                  <div className="text-center p-6 rounded-2xl border border-secondary-200 hover:shadow-card transition-shadow">
                    <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center text-primary-600 mx-auto mb-4">
                      {step.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="text-secondary-600 text-sm">
                      {step.description}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </Section>

          {/* CTA */}
          <Section as="section" className="py-24 text-center">
            <AnimatedSection animation="scaleIn">
              <div className="bg-gradient-to-r from-primary-600 to-navy-700 rounded-3xl p-12 text-white">
                <Heading level={2} className="text-3xl md:text-4xl font-bold mb-6">
                  ¿Necesitas una Solución Personalizada?
                </Heading>
                <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                  Nuestro equipo de ingenieros está listo para desarrollar la solución exacta que tu proyecto requiere.
                </p>
                <motion.button
                  className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-secondary-100 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contactar Especialista
                </motion.button>
              </div>
            </AnimatedSection>
          </Section>
        </Container>
      </main>
    </>
  );
}