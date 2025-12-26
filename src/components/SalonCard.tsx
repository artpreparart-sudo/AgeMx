import { MapPin, Phone, Users, DollarSign, Star, Edit2, Trash2 } from 'lucide-react';
import type { Salon } from '../types';

interface SalonCardProps {
  salon: Salon;
  onViewDetails: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const SalonCard = ({ salon, onViewDetails, onEdit, onDelete }: SalonCardProps) => {
  const mainImage = salon.images?.[0] || 'https://via.placeholder.com/300x200?text=Sin+imagen';
  const avgCapacity =
    salon.salones.length > 0
      ? Math.round(
          salon.salones.reduce((sum, s) => sum + s.capacidadHerradura, 0) /
            salon.salones.length
        )
      : 0;
  const avgPrice =
    salon.salones.length > 0
      ? Math.round(
          salon.salones.reduce((sum, s) => sum + s.precio, 0) / salon.salones.length
        )
      : 0;

  const rating = salon.rating
    ? Math.round(
        (Object.values(salon.rating).filter((v) => v === true).length / 7) * 5
      )
    : 0;

  return (
    <div className="card overflow-hidden hover:shadow-2xl transition-all duration-300 group">
      {/* Imagen */}
      <div className="relative h-48 overflow-hidden bg-dark-700">
        <img
          src={mainImage}
          alt={salon.hotelName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <button
          onClick={onViewDetails}
          className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-all duration-300 flex items-center justify-center"
        >
          <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
            Ver Detalles
          </span>
        </button>
      </div>

      {/* Contenido */}
      <div className="p-4 space-y-3">
        <h3 className="text-lg font-bold text-white truncate">{salon.hotelName}</h3>

        {/* Información principal */}
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2 text-gray-300">
            <MapPin className="w-4 h-4 mt-0.5 text-purple-400 flex-shrink-0" />
            <span className="line-clamp-2">{salon.address}</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-blue-400" />
              <span className="text-gray-300">{avgCapacity} pers.</span>
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-green-400" />
              <span className="text-gray-300">${avgPrice}</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Phone className="w-4 h-4 text-orange-400" />
            <a
              href={`tel:${salon.contact}`}
              className="text-blue-400 hover:underline"
            >
              {salon.contact}
            </a>
          </div>
        </div>

        {/* Rating */}
        {rating > 0 && (
          <div className="flex items-center gap-2 pt-2 border-t border-dark-700">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < rating
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400">({rating}/5)</span>
          </div>
        )}

        {/* Acciones */}
        <div className="flex gap-2 pt-3 border-t border-dark-700">
          <button
            onClick={onEdit}
            className="flex-1 flex items-center justify-center gap-2 py-2 bg-dark-700 hover:bg-blue-600/20 text-blue-400 rounded-lg transition-all duration-200"
          >
            <Edit2 className="w-4 h-4" />
            <span className="text-sm">Editar</span>
          </button>
          <button
            onClick={onDelete}
            className="flex-1 flex items-center justify-center gap-2 py-2 bg-dark-700 hover:bg-red-600/20 text-red-400 rounded-lg transition-all duration-200"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm">Eliminar</span>
          </button>
        </div>
      </div>
    </div>
  );
};
