import React, { useEffect, useState } from 'react';
import { SearchIcon, SlidersHorizontalIcon } from 'lucide-react';
import { CarCard } from '../components/CarCard';
import { CarTypeFilter } from '../components/CarTypeFilter';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Car } from '../utils/types';
import heroBackground from '../images/heroo.png';

export function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    async function fetchCars() {
      try {
        const res = await fetch('https://carvex-1.onrender.com/admin/cars');
        if (!res.ok) throw new Error('Erreur fetch voitures');
        const data = await res.json();
        setCars(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  const filteredCars = cars.filter(car => {
    const matchesType =
      selectedType === 'all' ||
      car.brand.toLowerCase() === selectedType.toLowerCase();
    const matchesSearch =
      car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      car.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HERO */}
      <div
        className="relative text-white py-16 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-bold">Tous les véhicules</h1>
          <p className="opacity-90">Trouvez votre véhicule idéal</p>
        </div>
      </div>

      {/* SEARCH & FILTER */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Rechercher par marque ou modèle..."
                className="w-full pl-12 py-3 border rounded-lg"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-6 py-3 bg-gray-100 rounded-lg flex items-center space-x-2"
            >
              <SlidersHorizontalIcon className="w-5 h-5" />
              <span>Filtres</span>
            </button>
          </div>

          {showFilters && (
            <div className="mt-6">
              <CarTypeFilter
                selectedType={selectedType}
                onTypeChange={setSelectedType}
              />
            </div>
          )}
        </div>

        {/* CARS GRID OR LOADING */}
        {loading ? (
          <div className="flex items-center justify-center min-h-[400px]">
            <LoadingSpinner text="Chargement des véhicules… Veuillez patienter" />
          </div>
        ) : filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map(car => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-600">
            Aucun véhicule trouvé
          </div>
        )}
      </div>
    </div>
  );
}
