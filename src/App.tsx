import { useRef, useState } from 'react';
import type { Salon } from './types';
import { AppProvider, useApp } from './context/AppContext';
import { StatesScreen } from './screens/StatesScreen';
import { CitiesScreen } from './screens/CitiesScreen';
import { SalonsScreen } from './screens/SalonsScreen';
import { RegisterSalonScreen } from './screens/RegisterSalonScreen';
import { SalonDetailScreen } from './screens/SalonDetailScreen';
import './index.css';

type Screen = 'states' | 'cities' | 'salons' | 'register' | 'detail';

function AppContent() {
  const { states, exportData, importData } = useApp();
  const [currentScreen, setCurrentScreen] = useState<Screen>('states');
  const [selectedStateId, setSelectedStateId] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);
  const [editingSalon, setEditingSalon] = useState<Salon | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const selectedState = states.find((s) => s.id === selectedStateId);

  const handleStateSelect = (stateId: string) => {
    setSelectedStateId(stateId);
    setCurrentScreen('cities');
  };

  const handleCitySelect = (cityName: string) => {
    setSelectedCity(cityName);
    setCurrentScreen('salons');
  };

  const handleBackToStates = () => {
    setCurrentScreen('states');
    setSelectedStateId('');
    setSelectedCity('');
  };

  const handleBackToCities = () => {
    setCurrentScreen('cities');
    setSelectedCity('');
  };

  const handleBackToSalons = () => {
    setCurrentScreen('salons');
    setSelectedSalon(null);
    setEditingSalon(null);
  };

  const handleAddSalon = () => {
    setEditingSalon(null);
    setCurrentScreen('register');
  };

  const handleSalonSelect = (salon: Salon) => {
    setSelectedSalon(salon);
    setCurrentScreen('detail');
  };

  const handleEditSalon = (salon: Salon) => {
    setEditingSalon(salon);
    setCurrentScreen('register');
  };

  const handleDeleteSalon = () => {
    handleBackToSalons();
  };

  const handleRegisterSuccess = () => {
    setEditingSalon(null);
    handleBackToSalons();
  };

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'agenda-preparate-backup.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile: React.ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const json = JSON.parse(text);
      importData(json);
      handleBackToStates();
      alert('Datos importados correctamente');
    } catch (err) {
      alert('No se pudo importar el archivo. Verifica que sea un JSON válido.');
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Navbar */}
      <nav className="bg-dark-900/80 backdrop-blur-sm border-b border-dark-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBackToStates}
              className="flex items-center gap-3 text-2xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              <img
                src="/icons/Icono.logo.png"
                alt="Logo Prepárate México"
                className="h-8 w-8 object-contain drop-shadow"
                loading="lazy"
              />
              PREPARARTE MEXICO
            </button>
            <div className="flex items-center gap-3">
              <p className="text-gray-400 text-sm">
                {currentScreen === 'states' && 'Selecciona un estado'}
                {currentScreen === 'cities' && `${selectedState?.name}`}
                {currentScreen === 'salons' && `${selectedCity}, ${selectedState?.name}`}
                {currentScreen === 'register' && `Registrar salón en ${selectedCity}`}
                {currentScreen === 'detail' && selectedSalon?.hotelName}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExport}
                  className="px-3 py-2 text-xs font-semibold bg-dark-800 text-gray-100 border border-dark-600 rounded-lg hover:bg-dark-700 transition"
                >
                  Exportar
                </button>
                <button
                  onClick={handleImportClick}
                  className="px-3 py-2 text-xs font-semibold bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition"
                >
                  Importar
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="application/json"
                  className="hidden"
                  onChange={handleImportFile}
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentScreen === 'states' && (
          <StatesScreen onStateSelect={handleStateSelect} />
        )}
        {currentScreen === 'cities' && selectedState && (
          <CitiesScreen
            stateId={selectedState.id}
            stateName={selectedState.name}
            onBack={handleBackToStates}
            onCitySelect={handleCitySelect}
          />
        )}
        {currentScreen === 'salons' && selectedState && (
          <SalonsScreen
            stateName={selectedState.name}
            cityName={selectedCity}
            onBack={handleBackToCities}
            onAddSalon={handleAddSalon}
            onSalonSelect={handleSalonSelect}
            onEditSalon={handleEditSalon}
          />
        )}
        {currentScreen === 'register' && selectedState && (
          <RegisterSalonScreen
            stateName={selectedState.name}
            cityName={selectedCity}
            existingSalon={editingSalon || undefined}
            onBack={handleBackToSalons}
            onSuccess={handleRegisterSuccess}
          />
        )}
        {currentScreen === 'detail' && selectedSalon && (
          <SalonDetailScreen
            salon={selectedSalon}
            onBack={handleBackToSalons}
            onEdit={() => handleEditSalon(selectedSalon)}
            onDelete={handleDeleteSalon}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-dark-700 bg-dark-900 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p>© 2025 AGENDA PREPARATE MEXICO. TODOS LOS DERECHOS RESERVADOS.</p>
          <p>FERCHOXR1</p>
        </div>
      </footer>
    </div>
  );
}

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
