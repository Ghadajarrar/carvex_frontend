import React from 'react';
import { CarIcon, FacebookIcon, TwitterIcon, InstagramIcon, MailIcon, PhoneIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import carImage from "../images/carvex.png";

export function Footer() {
  return <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-1">
                <img src={carImage} alt="Carvex Logo" className="w-32 h-32 object-contain" />
            </div>
            <p className="text-sm mb-4">
              Votre partenaire de confiance pour la location de véhicules
              premium. Conduisez vos rêves en toute confiance.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-primary transition-colors">
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-primary transition-colors">
                <TwitterIcon className="w-5 h-5" />
              </a>
              <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-primary transition-colors">
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Liens Rapides</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/cars" className="hover:text-primary transition-colors">
                  Parcourir les véhicules
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-primary transition-colors">
                  Mon compte
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  À propos
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Centre d'aide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Conditions d'utilisation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Politique de confidentialité
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contactez-nous</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <PhoneIcon className="w-4 h-4 text-primary" />
                <span>+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center space-x-2">
                <MailIcon className="w-4 h-4 text-primary" />
                <span>support@carvex.fr</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; 2024 Carvex. Tous droits réservés.</p>
        </div>
      </div>
    </footer>;
}