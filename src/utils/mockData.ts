import { Car, Offer, Service } from './types';
import { Car, Offer, Service } from './types';
import startImg from '../images/offer1.png';
import smartImg from '../images/offer3.png';
import infinityImg from '../images/offer2.png';



export const cars: Car[] = [
  {
    id: '1',
    name: 'Thar',
    brand: 'Mahindra',
    type: 'essence',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80',
    pricePerDay: 120,
    seats: 5,
    transmission: 'manual',
    fuel: 'petrol',
    rating: 4.9,
    reviews: 234,
    available: true,
    features: ['4x4', 'Son premium', 'Toit ouvrant']
  },
  {
    id: '2',
    name: 'Octavia',
    brand: 'Skoda',
    type: 'essence',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80',
    pricePerDay: 95,
    seats: 5,
    transmission: 'automatic',
    fuel: 'petrol',
    rating: 4.7,
    reviews: 189,
    available: true,
    features: ['Navigation', 'Caméra de recul', 'Bluetooth']
  },
  {
    id: '3',
    name: 'Panda',
    brand: 'Fiat',
    type: 'essence',
    image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&q=80',
    pricePerDay: 65,
    seats: 4,
    transmission: 'manual',
    fuel: 'petrol',
    rating: 4.6,
    reviews: 312,
    available: true,
    features: ['Compacte', 'Bluetooth', 'Régulateur de vitesse']
  },
  {
    id: '4',
    name: 'Picanto',
    brand: 'Kia',
    type: 'essence',
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
    pricePerDay: 55,
    seats: 4,
    transmission: 'manual',
    fuel: 'petrol',
    rating: 4.5,
    reviews: 98,
    available: true,
    features: ['Petite citadine', 'Air conditionné', 'Connectivité Bluetooth']
  },
  {
    id: '5',
    name: 'i10',
    brand: 'Hyundai',
    type: 'essence',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80',
    pricePerDay: 60,
    seats: 5,
    transmission: 'automatic',
    fuel: 'petrol',
    rating: 4.8,
    reviews: 156,
    available: true,
    features: ['Compacte', 'Caméra de recul', 'Bluetooth']
  },
  {
    id: '6',
    name: 'Clio',
    brand: 'Renault',
    type: 'essence',
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800&q=80',
    pricePerDay: 70,
    seats: 5,
    transmission: 'manual',
    fuel: 'petrol',
    rating: 4.7,
    reviews: 267,
    available: true,
    features: ['Économique', 'Bluetooth', 'Régulateur adaptatif']
  },
  {
    id: '7',
    name: '208',
    brand: 'Peugeot',
    type: 'essence',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80',
    pricePerDay: 75,
    seats: 5,
    transmission: 'manual',
    fuel: 'petrol',
    rating: 4.6,
    reviews: 201,
    available: true,
    features: ['Citadine', 'Air conditionné', 'Bluetooth']
  }
];
export const offers: Offer[] = [
  {
    id: '1',
    title: 'START',
    description: `Mini Citadine
Tarif standard : 70 DT / jour

Citadine
Tarif standard : 80 DT / jour`,
    discount: 0,
    duration: '3 mois',
    image: startImg,
    validUntil: '2025-12-31'
  },
  {
    id: '2',
    title: 'SMART',
    description: `Mini Citadine
64 DT / jour ~ -9 % de remise

Citadine
75 DT / jour ~ -6 % de remise`,
    discount: 9,
    duration: '6 mois',
    image: smartImg,
    validUntil: '2025-12-31'
  },
  {
    id: '3',
    title: 'INFINITY',
    description: `Mini Citadine
58 DT / jour

Citadine
70 DT / jour`,
    discount: 12,
    duration: '12 mois et +',
    image: infinityImg,
    validUntil: '2025-12-31'
  }
];

export const services: Service[] = [
  {
    id: '1',
    title: 'Véhicules récents et fiables',
    description: 'Profitez de véhicules récents et parfaitement entretenus pour tous vos trajets',
    icon: 'car' // you can choose an appropriate icon from lucide-react
  },
  {
    id: '2',
    title: 'Tarifs clairs et sans surprise',
    description: 'Nos prix sont transparents, sans frais cachés ni surprises',
    icon: 'tag'
  },
  {
    id: '3',
    title: 'Contrat sur mesure',
    description: 'Nous adaptons le contrat selon vos besoins et la durée souhaitée',
    icon: 'file-text'
  },
  {
    id: '4',
    title: 'Services tout compris',
    description: 'Profitez d’une location avec tous les services inclus pour votre tranquillité',
    icon: 'check-circle'
  },
  {
    id: '5',
    title: 'Lavage offert chaque mois',
    description: 'Nous offrons un lavage gratuit chaque mois pour garder votre véhicule propre',
    icon: 'droplet'
  },
  {
    id: '6',
    title: '10 % de remise à vie',
    description: 'Bénéficiez de 10 % de remise à vie si vous êtes un client fidèle ou un parrain',
    icon: 'gift'
  }
];
