import { useState } from 'react';
import { Plus } from 'lucide-react';
import { StateCard } from '../components/StateCard';
import { useApp } from '../context/AppContext';

interface StatesScreenProps {
  onStateSelect: (stateId: string) => void;
}

export const StatesScreen = ({ onStateSelect }: StatesScreenProps) => {
  const { states, addState } = useApp();
  const [showAddState, setShowAddState] = useState(false);
  const [newStateName, setNewStateName] = useState('');

  const handleAddState = () => {
    if (newStateName.trim()) {
      addState(newStateName.trim());
      setNewStateName('');
      setShowAddState(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="section-title text-4xl md:text-5xl">
          PREPARARTE MEXICO
        </h1>
        <p className="text-gray-400 text-lg">
          Selecciona un estado para explorar sus ciudades y salones
        </p>
      </div>

      {/* Grid de Estados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {states.map((state) => (
          <StateCard
            key={state.id}
            state={state}
            onClick={() => onStateSelect(state.id)}
          />
        ))}
      </div>

      {/* Botón Agregar Estado */}
      <div className="pt-8 border-t border-dark-700">
        <button
          onClick={() => setShowAddState(!showAddState)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Agregar Estado
        </button>

        {/* Modal de Agregar Estado */}
        {showAddState && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="card p-6 max-w-md w-full mx-4">
              <h2 className="text-2xl font-bold mb-4 text-white">
                Agregar Nuevo Estado
              </h2>
              <input
                type="text"
                value={newStateName}
                onChange={(e) => setNewStateName(e.target.value)}
                placeholder="Nombre del estado"
                className="input-field mb-4"
                onKeyPress={(e) => e.key === 'Enter' && handleAddState()}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddState}
                  className="btn-primary flex-1"
                >
                  Agregar
                </button>
                <button
                  onClick={() => setShowAddState(false)}
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
