import React from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { SalonCard } from '../components/SalonCard';
import { useApp } from '../context/AppContext';
import type { Salon } from '../types';

interface SalonsScreenProps {
  stateName: string;
  cityName: string;
  onBack: () => void;
  onAddSalon: () => void;
  onSalonSelect: (salon: Salon) => void;
  onEditSalon: (salon: Salon) => void;
}

export const SalonsScreen: React.FC<SalonsScreenProps> = ({
  stateName,
  cityName,
  onBack,
  onAddSalon,
  onSalonSelect,
  onEditSalon,
}) => {
  const { deleteSalon, getSalonsByCity } = useApp();

  const citySalones = getSalonsByCity(cityName, stateName);

  const handleDelete = (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este salón?')) {
      deleteSalon(id);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header con navegación */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-dark-700 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-purple-400" />
          </button>
          <div>
            <h1 className="section-title text-3xl md:text-4xl">
              Salones en {cityName}
            </h1>
            <p className="text-gray-400 mt-2">
              {stateName} • {citySalones.length} salones registrados
            </p>
          </div>
        </div>
        <button onClick={onAddSalon} className="btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">Agregar Salón</span>
        </button>
      </div>

      {/* Catálogo de Salones */}
      {citySalones.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {citySalones.map((salon) => (
            <SalonCard
              key={salon.id}
              salon={salon}
              onViewDetails={() => onSalonSelect(salon)}
              onEdit={() => onEditSalon(salon)}
              onDelete={() => handleDelete(salon.id)}
            />
          ))}
        </div>
      ) : (
        <div className="card p-12 text-center">
          <p className="text-gray-400 text-lg mb-6">
            No hay salones registrados en esta ciudad
          </p>
          <button onClick={onAddSalon} className="btn-primary">
            Ser el primero en registrar un salón
          </button>
        </div>
      )}
    </div>
  );
};
