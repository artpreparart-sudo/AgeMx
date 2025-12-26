import { useState } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { CityCard } from '../components/CityCard';
import { useApp } from '../context/AppContext';

interface CitiesScreenProps {
  stateId: string;
  stateName: string;
  onBack: () => void;
  onCitySelect: (cityName: string) => void;
}

export const CitiesScreen = ({
  stateId,
  stateName,
  onBack,
  onCitySelect,
}: CitiesScreenProps) => {
  const { cities, addCity } = useApp();
  const [showAddCity, setShowAddCity] = useState(false);
  const [newCityName, setNewCityName] = useState('');

  const stateCities = cities.filter((city) => city.stateId === stateId);

  const handleAddCity = () => {
    if (newCityName.trim()) {
      addCity(stateName, newCityName.trim());
      setNewCityName('');
      setShowAddCity(false);
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
            <h1 className="section-title text-4xl">Ciudades de {stateName}</h1>
            <p className="text-gray-400 mt-2">
              {stateCities.length} ciudades disponibles
            </p>
          </div>
        </div>
      </div>

      {/* Grid de Ciudades */}
      {stateCities.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stateCities.map((city) => (
            <CityCard
              key={city.id}
              city={city}
              onClick={() => onCitySelect(city.name)}
            />
          ))}
        </div>
      ) : (
        <div className="card p-8 text-center">
          <p className="text-gray-400">No hay ciudades registradas aún</p>
        </div>
      )}

      {/* Botón Agregar Ciudad */}
      <div className="pt-8 border-t border-dark-700">
        <button
          onClick={() => setShowAddCity(!showAddCity)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Agregar Ciudad
        </button>

        {/* Modal de Agregar Ciudad */}
        {showAddCity && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="card p-6 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold mb-4 text-white">
                Agregar Nueva Ciudad
              </h2>
              <input
                type="text"
                value={newCityName}
                onChange={(e) => setNewCityName(e.target.value)}
                placeholder="Nombre de la ciudad"
                className="input-field mb-4"
                onKeyPress={(e) => e.key === 'Enter' && handleAddCity()}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddCity}
                  className="btn-primary flex-1"
                >
                  Agregar
                </button>
                <button
                  onClick={() => setShowAddCity(false)}
                  className="btn-secondary flex-1"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
