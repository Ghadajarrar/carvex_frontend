import React from 'react';
import { HeartIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CarCard } from '../components/CarCard';
import { cars } from '../utils/mockData';
import { Link } from 'react-router-dom';
export function FavoritesPage() {
  const {
    user
  } = useAuth();
  if (!user) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <HeartIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Connectez-vous pour voir vos favoris
          </h2>
          <p className="text-gray-600 mb-6">
            Créez un compte pour sauvegarder vos véhicules préférés
          </p>
          <Link to="/login" className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold bg-primary-hover transition-colors">
            Connexion
          </Link>
        </div>
      </div>;
  }
  const favoriteCars = cars.filter(car => user.favorites.includes(car.id));
  return <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3">
            <HeartIcon className="w-8 h-8" />
            <h1 className="text-4xl font-bold">Mes Favoris</h1>
          </div>
          <p className="opacity-90 text-lg mt-2">
            Véhicules que vous avez sauvegardés
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {favoriteCars.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favoriteCars.map(car => <CarCard key={car.id} car={car} />)}
          </div> : <div className="text-center py-16">
            <HeartIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Aucun favori pour le moment
            </h2>
            <p className="text-gray-600 mb-6">
              Commencez à ajouter des véhicules à votre liste de favoris
            </p>
            <Link to="/cars" className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold bg-primary-hover transition-colors">
              Parcourir les véhicules
            </Link>
          </div>}
      </div>
    </div>;
}