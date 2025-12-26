import { ChevronRight } from 'lucide-react';
import type { State } from '../types';

interface StateCardProps {
  state: State;
  onClick: () => void;
}

export const StateCard = ({ state, onClick }: StateCardProps) => {
  return (
    <button
      onClick={onClick}
      className={`card card-hover group overflow-hidden state-card-bg`}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${state.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
      />
      <div className="relative p-6 flex flex-col justify-between h-full">
        <div>
          <h3 className="text-xl font-bold text-black mb-2">{state.name}</h3>
          <p className="text-sm text-gray-800">Haz clic para ver ciudades</p>
        </div>
        <div className="flex justify-end">
          <ChevronRight className="w-6 h-6 text-purple-400 group-hover:translate-x-2 transition-transform" />
        </div>
      </div>
    </button>
  );
};
