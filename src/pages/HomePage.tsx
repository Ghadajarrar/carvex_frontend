import React, { useEffect, useState } from 'react';
import { Hero } from '../components/Hero';
import { CarTypeFilter } from '../components/CarTypeFilter';
import { CarCard } from '../components/CarCard';
import { OffersSection } from '../components/OffersSection';
import { ServicesSection } from '../components/ServicesSection';
import { Car } from '../utils/types';

export function HomePage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loadingCars, setLoadingCars] = useState(true);
  const [selectedType, setSelectedType] = useState('all');

  // Fetch cars
  useEffect(() => {
    async function fetchCars() {
      try {
        const res = await fetch('https://carvex-1.onrender.com/admin/cars');
        const data = await res.json();
        setCars(data);
      } catch (err) {
        console.error('Erreur fetching cars:', err);
      } finally {
        setLoadingCars(false);
      }
    }
    fetchCars();
  }, []);

  const filteredCars = selectedType === 'all'
    ? cars.slice(0, 6)
    : cars.filter(car => car.type === selectedType).slice(0, 6);

  return (
    <div>
      {/* Hero Section */}
      <Hero id="hero" />

      {/* Featured Cars */}
      <section id="featured-cars" className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              Payez moins. Roulez mieux.
            </h2>
            <p className="text-base text-gray-500 max-w-2xl mx-auto mb-4">
              Explorez une gamme variée de véhicules haut de gamme.
            </p>

            <CarTypeFilter selectedType={selectedType} onTypeChange={setSelectedType} />
          </div>

          {loadingCars ? (
            <div className="text-center py-16">Chargement des véhicules...</div>
          ) : filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCars.map(car => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-600">Aucun véhicule disponible</div>
          )}

          <div className="text-center mt-12">
            <a
              href="/cars"
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors"
            >
              Explorez toute notre flotte
            </a>
          </div>
        </div>
      </section>

      {/* Offers Section */}
      <OffersSection id="offers" showPrice={false} />

      {/* Services Section */}
      <ServicesSection id="services" />
    </div>
  );
}
