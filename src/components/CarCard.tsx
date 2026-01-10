import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, UsersIcon, SettingsIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function CarCard({ car }: { car: any }) {
  const { user, toggleFavorite } = useAuth();
  const isFavorite = user?.favorites?.includes(car._id) ?? false;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      {/* Image */}
      <div className="relative">
        <img
          src={car.image} // ✅ Utiliser directement le lien Cloudinary
          alt={car.name}
          className="w-full h-48 object-cover"
        />
        {!car.available && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold">
              Non disponible
            </span>
          </div>
        )}
        {user && (
          <button
            onClick={() => toggleFavorite(car._id)}
            className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <HeartIcon
              className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
            />
          </button>
        )}
      </div>

      {/* Details */}
      <div className="p-5 space-y-2">
        <h3 className="text-xl font-bold text-gray-900">{car.name}</h3>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
          <div className="flex items-center gap-1">
            <span className="font-semibold">Type:</span> {car.type.charAt(0).toUpperCase() + car.type.slice(1)}
          </div>
          <div className="flex items-center gap-1">
            <UsersIcon className="w-4 h-4 text-primary" />
            <span>{car.seats} places</span>
          </div>
          <div className="flex items-center gap-1">
            <SettingsIcon className="w-4 h-4 text-primary" />
            <span>{car.transmission === 'automatic' ? 'Auto' : 'Manuelle'}</span>
          </div>
        </div>

        {/* Link to Details */}
        <Link
          to={`/car/${car._id}`}
          className={`mt-4 block px-6 py-2 rounded-lg font-semibold text-center ${
            car.available ? 'bg-primary text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {car.available ? 'Voir détails' : 'Indisponible'}
        </Link>
      </div>
    </div>
  );
}
