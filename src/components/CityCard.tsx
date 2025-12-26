import { ChevronRight, Star } from 'lucide-react';
import type { City } from '../types';
import { useApp } from '../context/AppContext';

interface CityCardProps {
  city: City;
  onClick: () => void;
}

export const CityCard = ({ city, onClick }: CityCardProps) => {
  const { salones } = useApp();
  const salonCount = salones.filter(s => s.city === city.name).length;

  return (
    <button
      onClick={onClick}
      className="card card-hover group overflow-hidden h-32"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all" />
      <div className="relative p-6 h-full flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-white">{city.name}</h3>
          <p className="text-xs text-gray-400 mt-1">{salonCount} salones registrados</p>
        </div>
        <div className="flex justify-between items-center">
          {salonCount > 3 && (
            <div className="flex items-center gap-1 text-yellow-400">
              <Star className="w-4 h-4" />
              <span className="text-xs">Más usado</span>
            </div>
          )}
          <ChevronRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </button>
  );
};

