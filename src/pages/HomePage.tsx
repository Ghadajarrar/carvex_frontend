import React, { useEffect, useState } from 'react';
import { Hero } from '../components/Hero';
import { CarTypeFilter } from '../components/CarTypeFilter';
import { CarCard } from '../components/CarCard';
import { OffersSection } from '../components/OffersSection';
import { ServicesSection } from '../components/ServicesSection';
import { FullPageLoader } from '../components/FullPageLoader';
import { Car } from '../utils/types';

export function HomePage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loadingCars, setLoadingCars] = useState(true);
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    async function fetchCars() {
      try {
        const res = await fetch('https://carvex-1.onrender.com/admin/cars');
        const data = await res.json();
        setCars(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingCars(false);
      }
    }
    fetchCars();
  }, []);

  const filteredCars =
    selectedType === 'all'
      ? cars.slice(0, 6)
      : cars.filter(car => car.type === selectedType).slice(0, 6);

  // 👈 Full-page loader while cars are loading
  if (loadingCars) {
    return <FullPageLoader text="Chargement de la page… Veuillez patienter" />;
  }

  return (
    <div>
      <Hero id="hero" />

      {/* Cars */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Payez moins. Roulez mieux.</h2>
            <CarTypeFilter selectedType={selectedType} onTypeChange={setSelectedType} />
          </div>

          {filteredCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCars.map(car => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">Aucun véhicule disponible</p>
          )}
        </div>
      </section>

      {/* Offers */}
      <OffersSection id="offers" />

      <ServicesSection id="services" />
    </div>
  );
}


