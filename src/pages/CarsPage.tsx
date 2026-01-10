import React, { useEffect, useState } from 'react';
import { SearchIcon, SlidersHorizontalIcon } from 'lucide-react';
import { CarCard } from '../components/CarCard';
import { CarTypeFilter } from '../components/CarTypeFilter';
import { Car } from '../utils/types';

export function CarsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedType, setSelectedType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch cars from backend
  useEffect(() => {
    async function fetchCars() {
      try {
        const res = await fetch('https://carvex-1.onrender.com/admin/cars');
        if (!res.ok) throw new Error('Erreur lors de la récupération des voitures');
        const data = await res.json();
        console.log('Cars fetched from backend:', data);
        setCars(data);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

 const filteredCars = cars.filter(car => {
   const matchesType = selectedType === 'all' || car.brand.toLowerCase() === selectedType.toLowerCase();
   const matchesSearch =
     car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     car.brand.toLowerCase().includes(searchQuery.toLowerCase());
   return matchesType && matchesSearch;
 });

  if (loading) return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div
        className="relative text-white py-8 bg-cover bg-center"
        style={{ backgroundImage: "url('/src/images/heroo.png')" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 rounded-xl">
          <h1 className="text-3xl font-bold mb-1">Tous les véhicules</h1>
          <p className="opacity-90 text-lg">Trouvez Votre Véhicule Idéal</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher par marque ou modèle..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 ring-primary focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:w-auto px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
            >
              <SlidersHorizontalIcon className="w-5 h-5" />
              <span>Filtres</span>
            </button>
          </div>

          {showFilters && (
            <div className="border-t border-gray-200 pt-6">
              <CarTypeFilter selectedType={selectedType} onTypeChange={setSelectedType} />
            </div>
          )}

        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Affichage de <span className="font-semibold text-gray-900">{filteredCars.length}</span> véhicules
          </p>
        </div>

        {filteredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map(car => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-600 text-lg">Aucun véhicule trouvé correspondant à vos critères</p>
          </div>
        )}
      </div>
    </div>
  );
}
