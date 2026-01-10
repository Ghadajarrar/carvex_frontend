// src/pages/ProfilePage.tsx
import React, { useState, useEffect } from 'react';
import { UserIcon, CalendarIcon, LogOutIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import avatarPlaceholder from "../images/profile.png";

interface Reservation {
  _id: string;
  carId: {
    _id: string;
    brand: string;
    name: string;
    image?: string;
  };
  startDate: string;
  endDate: string;
  pickupLocation: string;
  status: string;
  totalPrice: number;
}

export function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loadingReservations, setLoadingReservations] = useState(true);

  // Fetch reservations from backend
  useEffect(() => {
    const fetchReservations = async () => {
      const token = localStorage.getItem('token');
      if (!token || !user) return;

      try {
        const res = await fetch('https://carvex-1.onrender.com/reservations/my', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error('Erreur lors du chargement des réservations');

        const data = await res.json();
        setReservations(data);
      } catch (err) {
        console.error('Erreur fetch reservations:', err);
      } finally {
        setLoadingReservations(false);
      }
    };

    fetchReservations();
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <UserIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Connectez-vous pour voir votre profil
          </h2>
          <Link
            to="/login"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors"
          >
            Connexion
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary-hover)] text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-4">
          <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center">
            <img
              src={avatarPlaceholder} // always display your chosen image
              alt={user?.name || 'Utilisateur'}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold">{user?.name || 'Utilisateur'}</h1>
            <p className="opacity-90 text-lg">{user?.email || '-'}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-md p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Informations du compte</h2>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-gray-600">Email</p>
              <p className="font-medium text-gray-900">{user?.email || '-'}</p>
            </div>
            <div>
              <p className="text-gray-600">Téléphone</p>
              <p className="font-medium text-gray-900">{user?.phone || 'Non renseigné'}</p>
            </div>
            <div>
              <p className="text-gray-600">Membre depuis</p>
              <p className="font-medium text-gray-900">Janvier 2024</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="mt-6 w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
          >
            <LogOutIcon className="w-4 h-4" />
            <span>Déconnexion</span>
          </button>
        </div>

        {/* Main content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Mes Réservations</h2>

            {loadingReservations ? (
              <p>Chargement...</p>
            ) : reservations.length > 0 ? (
              reservations.map((r) => (
                <div
                  key={r._id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors mb-4"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={r.carId.image || avatarPlaceholder}
                      alt={r.carId.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {r.carId.brand} {r.carId.name}
                      </h3>
                      <p>
                        Du {new Date(r.startDate).toLocaleDateString('fr-FR')} au{' '}
                        {new Date(r.endDate).toLocaleDateString('fr-FR')}
                      </p>
                      <p>Lieu de prise: {r.pickupLocation}</p>

                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <CalendarIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600">Aucune réservation pour le moment</p>
                <Link
                  to="/cars"
                  className="inline-block mt-4 text-primary hover:underline font-medium"
                >
                  Parcourir les véhicules pour faire une réservation
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
