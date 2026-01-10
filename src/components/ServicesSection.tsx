import React from 'react';
import { CarIcon, TagIcon, FileTextIcon, CheckCircleIcon, DropletIcon, GiftIcon } from 'lucide-react';
import { services } from '../utils/mockData';

interface ServicesSectionProps {
  id?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  car: <CarIcon className="w-8 h-8 sm:w-16 sm:h-16 text-white" />,
  tag: <TagIcon className="w-8 h-8 sm:w-16 sm:h-16 text-white" />,
  'file-text': <FileTextIcon className="w-8 h-8 sm:w-16 sm:h-16 text-white" />,
  'check-circle': <CheckCircleIcon className="w-8 h-8 sm:w-16 sm:h-16 text-white" />,
  droplet: <DropletIcon className="w-8 h-8 sm:w-16 sm:h-16 text-white" />,
  gift: <GiftIcon className="w-8 h-8 sm:w-16 sm:h-16 text-white" />,
};

export function ServicesSection({ id }: ServicesSectionProps) {
  return (
    <section id={id} className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-xl sm:text-3xl font-bold text-gray-900 mb-4">
            Pourquoi Nous Choisir
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            Louez en toute confiance grâce à nos véhicules récents et bien entretenus, avec tous les services inclus.
            Bénéficiez de remises fidélité et d’un suivi client disponible 24h/24 pour un maximum de sérénité.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-8">
          {services.map(service => (
            <div
              key={service.id}
              className="bg-gradient-to-br from-primary-light to-white p-6 rounded-xl border border-primary-medium hover:shadow-lg transition-shadow flex flex-col items-center"
            >
              <div className="bg-primary text-white w-8 h-8 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                {iconMap[service.icon]}
              </div>
              <h3 className="text-sm sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2 text-center">
                {service.title}
              </h3>
              <p className="text-[10px] sm:text-sm md:text-base text-gray-600 text-center">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
