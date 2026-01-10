import React, { useEffect, useState } from 'react';
import { TagIcon, ClockIcon } from 'lucide-react';

interface Offer {
  _id: string;
  title: string;
  description: string;
  discount: number;
  duration?: string;
  validUntil: string;
  image: string;
}

interface OffersSectionProps {
  id?: string;
}

export function OffersSection({ id }: OffersSectionProps) {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    async function getOffers() {
      try {
        const res = await fetch('https://carvex-1.onrender.com/offers');
        if (!res.ok) throw new Error('Erreur lors du fetch des offres');
        const data: Offer[] = await res.json();

        // ✅ Utilise directement l'URL Cloudinary depuis la DB
        setOffers(data);
      } catch (error) {
        console.error('Erreur lors du fetch des offres :', error);
      }
    }

    getOffers();
  }, []);

  return (
    <section id={id} className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-base sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Offres Spéciales
          </h2>
          <p className="text-sm sm:text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            Plus vous louez longtemps, plus vous économisez ! Nos tarifs incluent tous les services.
          </p>
        </div>

        {/* Offers */}
        <div className="flex flex-nowrap sm:flex-wrap justify-start sm:justify-center space-x-4 sm:space-x-6 overflow-x-auto pb-4 -mx-4 px-4">
          {offers.map((offer) => (
            <div
              key={offer._id}
              className="flex-shrink-0 w-72 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow sm:mx-2"
            >
              {/* Image */}
              <div className="relative h-40">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                />
                {offer.discount > 0 && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full font-bold text-sm sm:text-base shadow-lg">
                    -{offer.discount}%
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="p-4">
                <h3 className="text-sm sm:text-lg md:text-lg font-bold text-gray-900 mb-1">
                  {offer.title}
                </h3>
                <p className="text-[12px] sm:text-sm md:text-sm text-gray-600 mb-3 whitespace-pre-line">
                  {offer.description}
                </p>

                <div className="flex items-center text-[11px] sm:text-xs md:text-sm text-gray-500 mb-2 space-x-3">
                  {offer.duration && (
                    <div className="flex items-center space-x-1">
                      <TagIcon className="w-4 h-4 sm:w-4 sm:h-4" />
                      <span>{offer.duration}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1">
                    <ClockIcon className="w-4 h-4 sm:w-4 sm:h-4" />
                    <span>
                      Valable jusqu'au {new Date(offer.validUntil).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>


              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
