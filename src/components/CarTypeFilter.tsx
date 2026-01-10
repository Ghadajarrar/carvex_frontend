import React from 'react';
import { GridIcon } from 'lucide-react';

import MahindraLogo from "../images/mahindra.png";
import SkodaLogo from "../images/skoda.png";
import FiatLogo from "../images/fiat.png";
import KiaLogo from "../images/kia.png";
import HyundaiLogo from "../images/hyundai.png";
import RenaultLogo from "../images/renault.png";
import PeugeotLogo from "../images/peugeot.png";

interface CarTypeFilterProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

type LogoType = string | React.ComponentType<any>;

const carTypes: { id: string; label: string; logo: LogoType }[] = [
  { id: "all", label: "Tous", logo: GridIcon },
  { id: "mahindra", label: "Mahindra", logo: MahindraLogo },
  { id: "skoda", label: "Skoda", logo: SkodaLogo },
  { id: "fiat", label: "Fiat", logo: FiatLogo },
  { id: "kia", label: "Kia", logo: KiaLogo },
  { id: "hyundai", label: "Hyundai", logo: HyundaiLogo },
  { id: "renault", label: "Renault", logo: RenaultLogo },
  { id: "peugeot", label: "Peugeot", logo: PeugeotLogo },
];

export function CarTypeFilter({ selectedType, onTypeChange }: CarTypeFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-4">
      {carTypes.map((type) => {
        const isSelected = selectedType === type.id;
        return (
          <button
            key={type.id}
            onClick={() => onTypeChange(type.id)}
            className={`
              px-3 py-2 sm:px-6 sm:py-3
              font-medium flex flex-col items-center justify-center gap-1 sm:gap-2 text-center transition-all
              ${isSelected
                ? "bg-primary text-white shadow-lg scale-105"
                : "bg-white text-gray-700 hover:bg-primary-light hover:text-primary border border-gray-200"
              }
            `}
          >
            {type.logo && (
              typeof type.logo === "string" ? (
                <img src={type.logo} alt={type.label} className="w-5 h-5 sm:w-8 sm:h-8" />
              ) : (
                React.createElement(type.logo, { className: "w-4 h-4 sm:w-6 sm:h-6" })
              )
            )}
            <span className="text-xs sm:text-sm">{type.label}</span>
          </button>
        );
      })}
    </div>
  );
}
