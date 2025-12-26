import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import type { Salon, State, City } from '../types';
import { mexicanStates, mexicanCities } from '../data';
import { loadSalones, loadCities, saveSalones, saveCities } from '../db';

interface AppContextType {
  states: State[];
  cities: City[];
  salones: Salon[];
  selectedState: State | null;
  selectedCity: City | null;
  setSelectedState: (state: State | null) => void;
  setSelectedCity: (city: City | null) => void;
  addSalon: (salon: Salon) => void;
  updateSalon: (id: string, salon: Partial<Salon>) => void;
  deleteSalon: (id: string) => void;
  getSalonsByCity: (cityName: string, stateName: string) => Salon[];
  addCity: (stateName: string, cityName: string) => void;
  addState: (stateName: string) => void;
  exportData: () => BackupPayload;
  importData: (data: BackupPayload) => void;
}

interface BackupPayload {
  version: number;
  states: State[];
  cities: City[];
  salones: Salon[];
}
import { loadStates, saveStates } from '../db';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [states, setStates] = useState<State[]>(mexicanStates);
  const [cities, setCities] = useState<City[]>([]);
  const [salones, setSalones] = useState<Salon[]>([]);
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const initialized = useRef(false);

  const buildInitialCities = () => {
    const initialCities: City[] = [];
    Object.entries(mexicanCities).forEach(([stateId, cityNames]) => {
      cityNames.forEach((cityName, index) => {
        initialCities.push({
          id: `${stateId}-${index}`,
          stateId,
          name: cityName,
        });
      });
    });
    return initialCities;
  };

  // Load from IndexedDB on mount
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [dbSalones, dbCities, dbStates] = await Promise.all([
          loadSalones(),
          loadCities(),
          loadStates(),
        ]);

        if (cancelled) return;

        if (dbSalones) {
          setSalones(dbSalones);
        }

        if (dbCities) {
          setCities(dbCities);
        } else {
          setCities(buildInitialCities());
        }

        if (dbStates) {
          setStates(dbStates);
        }
      } catch {
        if (!cancelled) {
          setCities(buildInitialCities());
        }
      } finally {
        if (!cancelled) {
          initialized.current = true;
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // Save salones to IndexedDB whenever they change
  useEffect(() => {
    if (!initialized.current) return;
    saveSalones(salones).catch(() => {
      /* ignore write failures */
    });
  }, [salones]);

  // Save cities to IndexedDB whenever they change
  useEffect(() => {
    if (!initialized.current) return;
    saveCities(cities).catch(() => {
      /* ignore write failures */
    });
  }, [cities]);

  // Save states to IndexedDB whenever they change
  useEffect(() => {
    if (!initialized.current) return;
    saveStates(states).catch(() => {
      /* ignore write failures */
    });
  }, [states]);

  const getSalonsByCity = (cityName: string, stateName: string): Salon[] => {
    return salones.filter(
      salon => salon.city === cityName && salon.state === stateName
    );
  };

  const addSalon = (salon: Salon) => {
    setSalones([...salones, salon]);
  };

  const updateSalon = (id: string, salonData: Partial<Salon>) => {
    setSalones(
      salones.map(salon =>
        salon.id === id
          ? { ...salon, ...salonData, updatedAt: new Date().toISOString() }
          : salon
      )
    );
  };

  const deleteSalon = (id: string) => {
    setSalones(salones.filter(salon => salon.id !== id));
  };

  const addCity = (stateName: string, cityName: string) => {
    const state = states.find(s => s.name === stateName);
    if (state && !cities.find(c => c.name === cityName && c.stateId === state.id)) {
      const newCity: City = {
        id: `${state.id}-${Date.now()}`,
        stateId: state.id,
        name: cityName,
      };
      setCities([...cities, newCity]);
    }
  };

  const addState = (stateName: string) => {
    if (!states.find(s => s.name === stateName)) {
      const gradients = [
        'from-purple-500 to-pink-500',
        'from-blue-500 to-cyan-500',
        'from-green-500 to-emerald-500',
        'from-orange-500 to-red-500',
      ];
      const newState: State = {
        id: `custom-${Date.now()}`,
        name: stateName,
        gradient: gradients[Math.floor(Math.random() * gradients.length)],
      };
      setStates([...states, newState]);
    }
  };

  const exportData = (): BackupPayload => ({
    version: 1,
    states,
    cities,
    salones,
  });

  const importData = (data: BackupPayload) => {
    if (!data || typeof data !== 'object') return;
    if (!Array.isArray(data.salones) || !Array.isArray(data.cities) || !Array.isArray(data.states)) return;

    setStates(data.states);
    setCities(data.cities);
    setSalones(data.salones);
  };

  return (
    <AppContext.Provider
      value={{
        states,
        cities,
        salones,
        selectedState,
        selectedCity,
        setSelectedState,
        setSelectedCity,
        addSalon,
        updateSalon,
        deleteSalon,
        getSalonsByCity,
        addCity,
        addState,
        exportData,
        importData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
