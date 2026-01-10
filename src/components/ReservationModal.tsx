import React, { useState } from 'react';
import {
  XIcon,
  CalendarIcon,
  MapPinIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
} from 'lucide-react';
import { Car } from '../utils/types';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface ReservationModalProps {
  car: Car;
  isOpen: boolean;
  onClose: () => void;
}

export function ReservationModal({ car, isOpen, onClose }: ReservationModalProps) {
  const { user, token } = useAuth();
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [location, setLocation] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );
    return days > 0 ? days : 0;
  };

  const days = calculateDays();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    if (!user || !token) {
      setError('Vous devez être connecté pour effectuer une réservation.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('https://carvex-1.onrender.com/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          carId: car._id,
          pickupLocation: location,
          startDate,
          endDate,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'La réservation n’a pas été envoyée');
      }

      setSuccess(
        'Réservation envoyée avec succès. Notre service client vous contactera très prochainement.'
      );
    } catch (err: any) {
      setError(
        err.message ||
          'Une erreur est survenue. Veuillez réessayer plus tard.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Réserver votre véhicule
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Car info */}
          <div className="flex items-center space-x-4 mb-6 p-4 bg-primary-light rounded-lg">
            <img
                src={car.image}
              alt={car.name}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div>
              <h3 className="text-xl font-bold text-gray-900">{car.name}</h3>
              <p className="text-primary font-semibold capitalize">
                {car.type}
              </p>
            </div>
          </div>

          {/* ✅ SUCCESS ALERT */}
          {success && (
            <div className="mb-4 flex gap-3 rounded-lg border border-green-200 bg-green-50 p-4">
              <CheckCircleIcon className="h-6 w-6 text-green-600 mt-0.5" />
              <div>
                <p className="font-semibold text-green-700">
                  Réservation envoyée avec succès
                </p>
                <p className="text-sm text-green-600">
                  Notre service client vous contactera très prochainement.
                </p>
              </div>
            </div>
          )}

          {/* ❌ ERROR ALERT */}
          {error && (
            <div className="mb-4 flex gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
              <AlertTriangleIcon className="h-6 w-6 text-red-600 mt-0.5" />
              <div>
                <p className="font-semibold text-red-700">
                  Échec de la réservation
                </p>
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPinIcon className="w-4 h-4 inline mr-1" />
                Lieu de prise en charge
              </label>
              <input
                type="text"
                required
                disabled={!!success}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 ring-primary disabled:opacity-50"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <CalendarIcon className="w-4 h-4 inline mr-1" />
                  Date de début
                </label>
                <input
                  type="date"
                  required
                  disabled={!!success}
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg disabled:opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <CalendarIcon className="w-4 h-4 inline mr-1" />
                  Date de fin
                </label>
                <input
                  type="date"
                  required
                  disabled={!!success}
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  min={startDate || new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg disabled:opacity-50"
                />
              </div>
            </div>

            {days > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Durée</span>
                  <span className="font-semibold">{days} jours</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !!success}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-hover transition-colors disabled:opacity-50"
            >
              {loading
                ? 'Envoi en cours...'
                : success
                ? 'Réservation envoyée'
                : 'Confirmer la réservation'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
