import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon } from 'lucide-react';
import heroDesktop from "../images/heroo.png";
import heroMobile from "../images/hero-mobile.png";

export function Hero() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    // Navigate to Cars page with optional search query as state or param
    navigate('/cars', { state: { query: searchQuery } });
  };

  return (
    <div className="relative text-white min-h-[600px]">

      {/* Mobile background */}
      <div
        className="absolute inset-0 sm:hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${heroMobile})` }}
      />

      {/* Desktop background */}
      <div
        className="absolute inset-0 hidden sm:block bg-cover bg-center"
        style={{ backgroundImage: `url(${heroDesktop})` }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl">

          <h1 className="text-base sm:text-2xl lg:text-4xl font-bold mb-2">
            Trouvez Votre Véhicule Idéal
          </h1>

          <h2 className="text-base sm:text-xl lg:text-2xl font-serif mb-4">
            Payez moins. Roulez mieux.
          </h2>

          <p className="text-xs sm:text-sm lg:text-lg opacity-90 mb-6">
            Avec CARVEX, effectuez une location voiture pas chère en Tunisie.
            Transparence, fiabilité et confort — c’est notre promesse
          </p>

          {/* Search box */}
          <div className="bg-white/50 backdrop-blur-md rounded-xl shadow-2xl p-4 sm:p-6 text-gray-900">
            <div className="flex flex-col md:flex-row md:items-center gap-4">

              {/* Search input */}
              <input
                type="text"
                placeholder="🔍 Entrez une marque ou un modèle"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:flex-1 px-4 py-3 text-sm border border-gray-300 rounded-lg
                           bg-white text-black placeholder-black focus:ring-2 ring-primary focus:border-transparent"
              />

              {/* Search button */}
              <button
                onClick={handleSearch}
                className="w-full md:w-auto bg-primary text-white px-6 py-3 rounded-lg
                           flex items-center justify-center hover:bg-primary-hover transition"
              >
                <SearchIcon className="w-5 h-5 mr-2" />
                Rechercher
              </button>

            </div>
          </div>

        </div>
      </div>

      {/* Wave */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
        <svg viewBox="0 0 1440 120" className="w-full h-20 sm:h-24" preserveAspectRatio="none">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H0Z"
            fill="white"
          />
        </svg>
      </div>

    </div>
  );
}
