export interface Car {
  _id: string; // MongoDB ID
  name: string; // modèle
  brand: string; // marque
  type: 'sedan' | 'suv' | 'sports' | 'luxury' | 'electric'; // type de voiture
  image: string; // nom de fichier ou URL de l'image
  pricePerDay: number; // prix par jour
  seats: number; // nombre de places
  transmission: 'automatic' | 'manual'; // type de transmission
  fuel: 'petrol' | 'diesel' | 'electric' | 'hybrid'; // carburant
  rating: number; // note moyenne
  reviews: number; // nombre d'avis
  available: boolean; // disponibilité
  features: string[]; // liste des fonctionnalités
  description?: string; // optionnel, description détaillée
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  favorites: string[];
  reservations: Reservation[];
}
export interface Reservation {
  id: string;
  userId: string;         // id de l'utilisateur
  userName: string;       // nom de l'utilisateur
  userEmail: string;      // email de l'utilisateur
  userPhone?: string;     // téléphone de l'utilisateur
  car: Car;               // la voiture réservée
  startDate: string;      // date de début
  endDate: string;        // date de fin
  pickupLocation: string; // lieu de prise

}
export interface Offer {
  id: string;
  title: string;
  description: string;
  discount: number;
  duration?: string; // added duration property
  image: string;
  validUntil: string;
}
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}