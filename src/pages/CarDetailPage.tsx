import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { StarIcon, UsersIcon, SettingsIcon, FuelIcon, CheckIcon, HeartIcon } from 'lucide-react';
import { ReservationModal } from '../components/ReservationModal';
import { useAuth } from '../context/AuthContext';

export function CarDetailPage() {
  const { id } = useParams();
  const [car, setCar] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, toggleFavorite } = useAuth();

  useEffect(() => {
    async function fetchCar() {
      try {
        const res = await fetch(`https://carvex-1.onrender.com/admin/cars/${id}`);
        if (!res.ok) throw new Error('Véhicule non trouvé');
        const data = await res.json();
        setCar(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCar();
  }, [id]);

  if (loading)
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;

  if (!car)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Véhicule non trouvé</h2>
          <Link to="/cars" className="text-primary hover:underline">
            Parcourir tous les véhicules
          </Link>
        </div>
      </div>
    );

  const isFavorite = user?.favorites.includes(car._id);

  return (
<div className="bg-gray-50 pt-12 sm:pt-16 lg:pt-20 pb-16">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 lg:items-end">

            {/* Image */}
            <div className="relative">
              <img
                  src={car.image}
                alt={car.name}
                className="w-full h-64 sm:h-80 lg:h-full object-cover rounded-t-lg lg:rounded-none"
              />
              {!car.available && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold">Actuellement indisponible</span>
                </div>
              )}
            </div>

            {/* Details */}
            <div className="p-4 sm:p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                <span className="bg-primary-light text-primary px-2 py-1 rounded-full text-xs font-semibold uppercase">
                  {car.type.charAt(0).toUpperCase() + car.type.slice(1)}
                </span>

                  <h1 className="text-xl sm:text-3xl font-bold text-gray-900 mt-2"> {car.name}</h1>

                  <div className="flex items-center mt-1">
                    <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-semibold">{car.rating}</span>
                    <span className="text-gray-600 ml-1">({car.reviews} avis)</span>
                  </div>
                </div>

                {user && (
                  <button
                    onClick={() => toggleFavorite(car._id)}
                    className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <HeartIcon className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                  </button>
                )}
              </div>

              {/* Specs */}
              <div className="grid grid-cols-3 gap-2 mb-4 p-2 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <UsersIcon className="w-4 h-4 mx-auto text-primary mb-1" />
                  <p className="text-xs text-gray-600">Places</p>
                  <p className="font-semibold">{car.seats}</p>
                </div>
                <div className="text-center">
                  <SettingsIcon className="w-4 h-4 mx-auto text-primary mb-1" />
                  <p className="text-xs text-gray-600">Transmission</p>
                  <p className="font-semibold capitalize">{car.transmission === 'automatic' ? 'Auto' : 'Manuelle'}</p>
                </div>
                <div className="text-center">
                  <FuelIcon className="w-4 h-4 mx-auto text-primary mb-1" />
                  <p className="text-xs text-gray-600">Carburant</p>
                  <p className="font-semibold capitalize">
                    {car.fuel === 'petrol' ? 'Essence' : car.fuel === 'diesel' ? 'Diesel' : car.fuel === 'electric' ? 'Électrique' : 'Hybride'}
                  </p>
                </div>
              </div>

              {/* Features */}
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">Caractéristiques</h3>
                <div className="grid grid-cols-2 gap-1">
                  {car.features.map((f: string, i: number) => (
                    <div key={i} className="flex items-center text-xs text-gray-700">
                      <CheckIcon className="w-3 h-3 text-green-500 mr-1" />
                      {f}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="border-t border-gray-200 pt-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  disabled={!car.available}
                  className={`w-full py-2 rounded-lg font-semibold transition-colors ${car.available ? 'bg-primary text-white hover:bg-primary-hover' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                  {car.available ? 'Réserver maintenant' : 'Actuellement indisponible'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ReservationModal car={car} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
