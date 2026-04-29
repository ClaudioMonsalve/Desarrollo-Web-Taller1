/**
 * carousel.service.js — Datos del Carrusel
 * Retorna la información estática que se muestra en las tarjetas del home.
 */

export async function getCarouselSlides() {
  return [
    {
      id: 'slide-1',
      title: 'Contenido relevante',
      subtitle: 'Descubre beneficios exclusivos para tu empresa',
      cta: 'Ver más',
      bgColor: '#F5F0E8',
      href: '#',
    },
    {
      id: 'slide-2',
      title: 'Capacitaciones',
      subtitle: 'Cursos gratuitos para impulsar tu PYME',
      cta: 'Inscríbete',
      bgColor: '#EDE5D8',
      href: 'capacitaciones.html',
    },
    {
      id: 'slide-3',
      title: 'Red de contactos',
      subtitle: 'Conecta con otras PYMEs de tu sector',
      cta: 'Explorar',
      bgColor: '#E0D5C3',
      href: 'red-contactos.html',
    },
    {
      id: 'slide-4',
      title: 'Evaluador de Bancos',
      subtitle: 'Compara opciones bancarias y encuentra la mejor para tu PYME',
      cta: 'Comparar bancos',
      bgColor: '#D4C9B3',
      href: 'financiamiento.html',
    },
  ];
}
