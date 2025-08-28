import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ExternalLink, 
  Calendar, 
  Tag,
  Filter,
  Grid3X3,
  List
} from "lucide-react";
import Container from "../components/ui/Container";
import Section from "../components/ui/Section";
import Heading from "../components/ui/Heading";
import AnimatedSection from "../components/animations/AnimatedSection";
import EngineeringScene from "../components/3d/EngineeringScene";
import useApi from "../hooks/useApi";
import { ErrorMsg, SkeletonGrid } from "../components/ui/Feedback";

// Hero del portafolio
function PortfolioHero() {
  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-secondary-900 via-navy-800 to-primary-900 text-white overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <EngineeringScene variant="circuit" />
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <AnimatedSection animation="fadeInUp">
          <Heading level={1} className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-primary-200">
            Nuestro Portafolio
          </Heading>
          <p className="text-xl text-secondary-300 max-w-3xl mx-auto">
            Casos de éxito que demuestran nuestra capacidad de transformar ideas en soluciones reales
          </p>
        </AnimatedSection>
      </div>
    </div>
  );
}

// Componente de filtros
function ProjectFilters({ categories, activeFilter, onFilterChange, viewMode, onViewModeChange }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12">
      {/* Filtros por categoría */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onFilterChange('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeFilter === 'all'
              ? 'bg-primary-600 text-white'
              : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
          }`}
        >
          Todos
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onFilterChange(category)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeFilter === category
                ? 'bg-primary-600 text-white'
                : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Selector de vista */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onViewModeChange('grid')}
          className={`p-2 rounded-lg transition-colors ${
            viewMode === 'grid'
              ? 'bg-primary-600 text-white'
              : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
          }`}
        >
          <Grid3X3 className="w-5 h-5" />
        </button>
        <button
          onClick={() => onViewModeChange('list')}
          className={`p-2 rounded-lg transition-colors ${
            viewMode === 'list'
              ? 'bg-primary-600 text-white'
              : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
          }`}
        >
          <List className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// Componente de proyecto individual
function ProjectCard({ project, viewMode, index }) {
  const isListView = viewMode === 'list';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`group bg-white rounded-2xl shadow-card hover:shadow-cardHover transition-all duration-300 overflow-hidden ${
        isListView ? 'flex' : ''
      }`}
    >
      {/* Imagen */}
      <div className={`relative overflow-hidden ${isListView ? 'w-80 flex-shrink-0' : 'aspect-video'}`}>
        <img
          src={project.portada ?? project.image ?? 'https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg'}
          alt={project.titulo ?? project.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Overlay con enlace */}
        <Link
          to={`/portafolio/${project.id}`}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
            <ExternalLink className="w-6 h-6 text-primary-600" />
          </div>
        </Link>
      </div>

      {/* Contenido */}
      <div className={`p-6 ${isListView ? 'flex-1' : ''}`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-secondary-900 group-hover:text-primary-600 transition-colors mb-2">
              {project.titulo ?? project.name}
            </h3>
            
            {/* Categoría */}
            {project.categoria && (
              <div className="flex items-center text-sm text-primary-600 mb-2">
                <Tag className="w-4 h-4 mr-1" />
                {project.categoria}
              </div>
            )}
            
            {/* Fecha */}
            {project.fecha && (
              <div className="flex items-center text-sm text-secondary-500 mb-3">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(project.fecha).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long'
                })}
              </div>
            )}
          </div>
        </div>

        <p className="text-secondary-600 mb-4 line-clamp-3">
          {project.excerpt ?? project.descripcion ?? 'Proyecto de ingeniería desarrollado con tecnología avanzada y metodologías probadas.'}
        </p>

        {/* Tecnologías utilizadas */}
        {project.tecnologias && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tecnologias.slice(0, 3).map((tech, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs font-medium"
              >
                {tech}
              </span>
            ))}
            {project.tecnologias.length > 3 && (
              <span className="px-2 py-1 bg-secondary-100 text-secondary-600 rounded text-xs">
                +{project.tecnologias.length - 3} más
              </span>
            )}
          </div>
        )}

        {/* Enlace al detalle */}
        <Link
          to={`/portafolio/${project.id}`}
          className="inline-flex items-center text-primary-600 hover:text-primary-500 font-medium transition-colors"
        >
          Ver detalles
          <ExternalLink className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const { data, loading, error } = useApi("/proyectos");
  const [activeFilter, setActiveFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  if (loading) return <SkeletonGrid />;
  if (error) return <ErrorMsg error={error} />;

  const projects = Array.isArray(data) ? data : data?.data ?? [];
  
  // Extraer categorías únicas
  const categories = [...new Set(projects.map(p => p.categoria).filter(Boolean))];
  
  // Filtrar proyectos
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.categoria === activeFilter);

  return (
    <>
      <PortfolioHero />
      <main className="bg-white">
        <Container>
          <Section as="section" className="py-24">
            {/* Estadísticas rápidas */}
            <AnimatedSection animation="fadeInUp" className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-6 bg-primary-50 rounded-2xl">
                  <div className="text-3xl font-bold text-primary-600 mb-2">
                    {projects.length}+
                  </div>
                  <div className="text-secondary-600">Proyectos Completados</div>
                </div>
                <div className="p-6 bg-accent-50 rounded-2xl">
                  <div className="text-3xl font-bold text-accent-600 mb-2">
                    {categories.length}+
                  </div>
                  <div className="text-secondary-600">Áreas de Especialización</div>
                </div>
                <div className="p-6 bg-secondary-50 rounded-2xl">
                  <div className="text-3xl font-bold text-secondary-600 mb-2">
                    100%
                  </div>
                  <div className="text-secondary-600">Satisfacción del Cliente</div>
                </div>
              </div>
            </AnimatedSection>

            {/* Filtros */}
            <ProjectFilters
              categories={categories}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />

            {/* Grid/Lista de proyectos */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeFilter}-${viewMode}`}
                className={
                  viewMode === 'grid'
                    ? 'grid gap-8 sm:grid-cols-2 lg:grid-cols-3'
                    : 'space-y-8'
                }
                layout
              >
                {filteredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    viewMode={viewMode}
                    index={index}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Mensaje si no hay proyectos */}
            {filteredProjects.length === 0 && (
              <AnimatedSection animation="fadeInUp" className="text-center py-16">
                <div className="text-secondary-400 mb-4">
                  <Filter className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-secondary-600 mb-2">
                  No se encontraron proyectos
                </h3>
                <p className="text-secondary-500">
                  Intenta con un filtro diferente o explora todos nuestros proyectos.
                </p>
              </AnimatedSection>
            )}
          </Section>

          {/* CTA */}
          <Section as="section" className="py-24">
            <AnimatedSection animation="scaleIn">
              <div className="bg-gradient-to-r from-primary-600 to-navy-700 rounded-3xl p-12 text-white text-center">
                <Heading level={2} className="text-3xl md:text-4xl font-bold mb-6">
                  ¿Tienes un Proyecto en Mente?
                </Heading>
                <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                  Únete a nuestros clientes satisfechos y convierte tu idea en el próximo caso de éxito.
                </p>
                <motion.button
                  className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-secondary-100 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Iniciar Proyecto
                </motion.button>
              </div>
            </AnimatedSection>
          </Section>
        </Container>
      </main>
    </>
  );
}