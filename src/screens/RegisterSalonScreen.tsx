import React, { useState } from 'react';
import { ArrowLeft, X, Upload } from 'lucide-react';
import type { Salon, SalonDetail, SalonRating, BankingData } from '../types';
import { useApp } from '../context/AppContext';

interface RegisterSalonScreenProps {
  stateName: string;
  cityName: string;
  existingSalon?: Salon;
  onBack: () => void;
  onSuccess: () => void;
}

export const RegisterSalonScreen: React.FC<RegisterSalonScreenProps> = ({
  stateName,
  cityName,
  existingSalon,
  onBack,
  onSuccess,
}) => {
  const { addSalon, updateSalon } = useApp();

  // Formulario principal
  const [hotelName, setHotelName] = useState(existingSalon?.hotelName || '');
  const [owner, setOwner] = useState(existingSalon?.owner || '');
  const [contact, setContact] = useState(existingSalon?.contact || '');
  const [address, setAddress] = useState(existingSalon?.address || '');
  const [locationUrl, setLocationUrl] = useState(existingSalon?.locationUrl || '');
  const [comments, setComments] = useState(existingSalon?.comments || '');
  const [numSalones, setNumSalones] = useState(existingSalon?.numSalones || 1);
  const [images, setImages] = useState<string[]>(existingSalon?.images || []);

  // Salones dinámicos
  const [salonDetails, setSalonDetails] = useState<SalonDetail[]>(
    existingSalon?.salones || []
  );

  // Datos bancarios
  const [bankingData, setBankingData] = useState<Partial<BankingData>>(
    existingSalon?.bankingData || {
      ciudad: cityName,
      nombreSalon: hotelName,
    }
  );

  // Valoración
  const [rating, setRating] = useState<Partial<SalonRating>>(
    existingSalon?.rating || {
      cursoIndicado: [],
      esCentrico: false,
      tieneEstacionamiento: false,
      estacionamientoTechado: false,
      banosLimpios: false,
      limpiezaEntradaSalida: false,
      buenaIluminacion: false,
      contactosCerca: false,
      descripcion: '',
    }
  );

  const [currentStep, setCurrentStep] = useState<'main' | 'banking' | 'rating'>(
    'main'
  );

  // Inicializar salones cuando cambia numSalones
  React.useEffect(() => {
    if (salonDetails.length < numSalones) {
      const newSalons = Array.from({ length: numSalones - salonDetails.length }, () => ({
        id: `salon-${Date.now()}-${Math.random()}`,
        nombre: '',
        capacidadHerradura: 0,
        altura: 0,
        precio: 0,
        cursos: [],
      }));
      setSalonDetails([...salonDetails, ...newSalons]);
    } else if (salonDetails.length > numSalones) {
      setSalonDetails(salonDetails.slice(0, numSalones));
    }
  }, [numSalones]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            setImages([...images, event.target.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSalonDetailChange = (
    index: number,
    field: keyof SalonDetail,
    value: any
  ) => {
    const updated = [...salonDetails];
    if (field === 'cursos') {
      updated[index][field] = value;
    } else {
      updated[index] = { ...updated[index], [field]: value };
    }
    setSalonDetails(updated);
  };

  const handleDownloadBankingData = () => {
    const cursosStr = bankingData.cursos || '';
    let content = `Ciudad: ${bankingData.ciudad || cityName}\n`;
    content += `Curso: ${cursosStr}\n`;
    content += `Nombre del Salón: ${bankingData.nombreSalon || hotelName}\n`;
    content += `Beneficiario: ${bankingData.beneficiario || ''}\n`;
    content += `Cuenta: ${bankingData.cuenta || ''}\n`;
    content += `Monto: ${bankingData.monto || ''}\n`;
    content += `Pago: ${bankingData.pago || ''}\n`;
    if (bankingData.concepto) {
      content += `Concepto: ${bankingData.concepto}\n`;
    }

    const element = document.createElement('a');
    element.setAttribute(
      'href',
      'data:text/plain;charset=utf-8,' + encodeURIComponent(content)
    );
    element.setAttribute(
      'download',
      `datos-bancarios-${hotelName.replace(/\s/g, '-')}.txt`
    );
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (currentStep === 'main') {
      // Validar paso principal
      if (!hotelName || !owner || !contact || !address || !locationUrl) {
        alert('Por favor completa todos los campos obligatorios');
        return;
      }
      if (salonDetails.some((s) => !s.nombre || s.capacidadHerradura <= 0 || s.precio <= 0)) {
        alert('Por favor completa los detalles de todos los salones');
        return;
      }
      setCurrentStep('banking');
      return;
    }

    if (currentStep === 'banking') {
      setCurrentStep('rating');
      return;
    }

    // Crear/actualizar salón
    const newSalon: Salon = {
      id: existingSalon?.id || `salon-${Date.now()}`,
      hotelName,
      state: stateName,
      city: cityName,
      owner,
      contact,
      address,
      locationUrl,
      numSalones,
      salones: salonDetails,
      images,
      comments,
      rating: rating as SalonRating,
      bankingData: bankingData as BankingData,
      createdAt: existingSalon?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (existingSalon) {
      updateSalon(existingSalon.id, newSalon);
    } else {
      addSalon(newSalon);
    }

    onSuccess();
  };

  const courses = ['Epoxy', 'Tuning', 'Globo', 'Maquillaje'];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-dark-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-purple-400" />
        </button>
        <div>
          <h1 className="section-title text-3xl">
            {existingSalon ? 'Editar' : 'Registrar'} Salón
          </h1>
          <p className="text-gray-400 mt-2">
            {cityName}, {stateName}
          </p>
        </div>
      </div>

      {/* Indicador de pasos */}
      <div className="flex gap-2 justify-between relative">
        {(['main', 'banking', 'rating'] as const).map((step, idx) => (
          <button
            key={step}
            onClick={() => setCurrentStep(step)}
            disabled={currentStep !== 'main' && idx > 0}
            className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
              currentStep === step
                ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                : idx < ['main', 'banking', 'rating'].indexOf(currentStep)
                ? 'bg-green-600/20 text-green-400'
                : 'bg-dark-700 text-gray-400'
            }`}
          >
            {step === 'main' && 'Salón'}
            {step === 'banking' && 'Datos Bancarios'}
            {step === 'rating' && 'Valoración'}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* PASO 1: INFORMACIÓN PRINCIPAL */}
        {currentStep === 'main' && (
          <div className="card p-6 space-y-6">
            {/* Nombre del hotel/salón */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Nombre del Salón/Hotel *
              </label>
              <input
                type="text"
                value={hotelName}
                onChange={(e) => setHotelName(e.target.value)}
                placeholder="Ej: Salones Elegancia"
                className="input-field"
                required
              />
            </div>

            {/* Cantidad de salones */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                ¿Cuántos salones cuenta el hotel? *
              </label>
              <select
                value={numSalones}
                onChange={(e) => setNumSalones(parseInt(e.target.value))}
                className="input-field"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n} salón{n > 1 ? 'es' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Detalles de los salones */}
            {salonDetails.map((salon, idx) => (
              <div
                key={salon.id}
                className="border border-dark-600 rounded-lg p-4 space-y-4 bg-dark-700/30"
              >
                <h3 className="text-lg font-semibold text-purple-400">
                  Salón {idx + 1}
                </h3>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300">
                    Nombre del Salón *
                  </label>
                  <input
                    type="text"
                    value={salon.nombre}
                    onChange={(e) =>
                      handleSalonDetailChange(idx, 'nombre', e.target.value)
                    }
                    placeholder="Ej: Salón Principal"
                    className="input-field"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-300">
                      Capacidad (Herradura) *
                    </label>
                    <input
                      type="number"
                      value={salon.capacidadHerradura}
                      onChange={(e) =>
                        handleSalonDetailChange(idx, 'capacidadHerradura', parseInt(e.target.value))
                      }
                      placeholder="Ej: 150"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-300">
                      Altura del Salón (m) *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={salon.altura}
                      onChange={(e) =>
                        handleSalonDetailChange(idx, 'altura', parseFloat(e.target.value))
                      }
                      placeholder="Ej: 4.5"
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300">
                    Precio del Salón *
                  </label>
                  <input
                    type="number"
                    value={salon.precio}
                    onChange={(e) =>
                      handleSalonDetailChange(idx, 'precio', parseInt(e.target.value))
                    }
                    placeholder="Ej: 5000"
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300">
                    Cursos Disponibles *
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {courses.map((course) => (
                      <label key={course} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={salon.cursos.includes(course)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              handleSalonDetailChange(idx, 'cursos', [
                                ...salon.cursos,
                                course,
                              ]);
                            } else {
                              handleSalonDetailChange(
                                idx,
                                'cursos',
                                salon.cursos.filter((c) => c !== course)
                              );
                            }
                          }}
                          className="w-4 h-4 rounded"
                        />
                        <span className="text-gray-300">{course}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Datos de contacto */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Nombre del Propietario/Encargado *
              </label>
              <input
                type="text"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                placeholder="Ej: Juan García"
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Contacto (Teléfono) *
              </label>
              <input
                type="tel"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Ej: +52 123 456 7890"
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Dirección *
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ej: Calle Principal 123"
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                URL de Google Maps *
              </label>
              <input
                type="url"
                value={locationUrl}
                onChange={(e) => setLocationUrl(e.target.value)}
                placeholder="https://maps.google.com/..."
                className="input-field"
                required
              />
              <a
                href={locationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:underline mt-2 inline-block"
              >
                Ver ubicación en Google Maps
              </a>
            </div>

            {/* Fotos */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Fotos del Salón
              </label>
              <div className="border-2 border-dashed border-dark-600 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="text-gray-400 cursor-pointer hover:text-purple-400"
                >
                  Haz clic para seleccionar imágenes
                </label>
              </div>

              {/* Previsualizaciones */}
              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={img}
                        alt={`Preview ${idx}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(idx)}
                        className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Comentarios */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Comentarios (Opcional)
              </label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Información adicional..."
                className="input-field resize-none"
                rows={3}
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              Continuar a Datos Bancarios
            </button>
          </div>
        )}

        {/* PASO 2: DATOS BANCARIOS */}
        {currentStep === 'banking' && (
          <div className="card p-6 space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Datos Bancarios del Salón
            </h2>
            <p className="text-gray-400 text-sm">
              Estos datos son opcionales. Puedes dejarlos en blanco si lo deseas.
            </p>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Ciudad
              </label>
              <input
                type="text"
                value={bankingData.ciudad || cityName}
                readOnly
                className="input-field bg-dark-700/50"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Cursos
              </label>
              <input
                type="text"
                value={bankingData.cursos || salonDetails.map((s) => s.cursos.join(', ')).join(', ')}
                readOnly
                className="input-field bg-dark-700/50"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Nombre del Salón
              </label>
              <input
                type="text"
                value={bankingData.nombreSalon || hotelName}
                readOnly
                className="input-field bg-dark-700/50"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Beneficiario
              </label>
              <input
                type="text"
                value={bankingData.beneficiario || ''}
                onChange={(e) =>
                  setBankingData({ ...bankingData, beneficiario: e.target.value })
                }
                placeholder="Nombre del beneficiario"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Cuenta
              </label>
              <input
                type="text"
                value={bankingData.cuenta || ''}
                onChange={(e) =>
                  setBankingData({ ...bankingData, cuenta: e.target.value })
                }
                placeholder="Número de cuenta"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Banco
              </label>
              <input
                type="text"
                value={bankingData.banco || ''}
                onChange={(e) =>
                  setBankingData({ ...bankingData, banco: e.target.value })
                }
                placeholder="Nombre del banco"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Monto
              </label>
              <input
                type="number"
                value={bankingData.monto || ''}
                onChange={(e) =>
                  setBankingData({ ...bankingData, monto: parseInt(e.target.value) })
                }
                placeholder="Monto"
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Pago
              </label>
              <select
                value={bankingData.pago || ''}
                onChange={(e) =>
                  setBankingData({
                    ...bankingData,
                    pago: e.target.value as any,
                  })
                }
                className="input-field"
              >
                <option value="">Selecciona una opción</option>
                <option value="completo">100%</option>
                <option value="50%">50%</option>
                <option value="evento">Se paga el día del evento</option>
                <option value="salon-voleto">Salón × Voleto</option>
                <option value="diferido">Diferido</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Concepto (Opcional)
              </label>
              <input
                type="text"
                value={bankingData.concepto || ''}
                onChange={(e) =>
                  setBankingData({ ...bankingData, concepto: e.target.value })
                }
                placeholder="Concepto del pago"
                className="input-field"
              />
            </div>

            {/* Botón descargar datos bancarios */}
            {(bankingData.beneficiario || bankingData.cuenta) && (
              <button
                type="button"
                onClick={handleDownloadBankingData}
                className="btn-secondary w-full"
              >
                Descargar Datos Bancarios
              </button>
            )}

            <div className="flex gap-2 pt-4">
              <button
                type="button"
                onClick={() => setCurrentStep('main')}
                className="btn-secondary flex-1"
              >
                Anterior
              </button>
              <button type="submit" className="btn-primary flex-1">
                Continuar a Valoración
              </button>
            </div>
          </div>
        )}

        {/* PASO 3: VALORACIÓN */}
        {currentStep === 'rating' && (
          <div className="card p-6 space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Valoración del Salón
            </h2>

            <div>
              <label className="block text-sm font-semibold mb-3 text-gray-300">
                Curso indicado para el salón *
              </label>
              <div className="space-y-2">
                {courses.map((course) => (
                  <label key={course} className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={rating.cursoIndicado?.includes(course) || false}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setRating({
                            ...rating,
                            cursoIndicado: [
                              ...(rating.cursoIndicado || []),
                              course,
                            ],
                          });
                        } else {
                          setRating({
                            ...rating,
                            cursoIndicado: (rating.cursoIndicado || []).filter(
                              (c) => c !== course
                            ),
                          });
                        }
                      }}
                      className="w-4 h-4 rounded"
                    />
                    <span className="text-gray-300">{course}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: 'esCentrico', label: '¿El salón es céntrico?' },
                { key: 'tieneEstacionamiento', label: '¿El salón cuenta con estacionamiento?' },
                { key: 'estacionamientoTechado', label: '¿El estacionamiento es techado?' },
                { key: 'banosLimpios', label: '¿Baños limpios?' },
                { key: 'limpiezaEntradaSalida', label: '¿Limpieza a la entrada y salida?' },
                { key: 'buenaIluminacion', label: '¿Buena iluminación?' },
                { key: 'contactosCerca', label: '¿Cuenta con contactos cerca?' },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={(rating as any)[key] || false}
                    onChange={(e) => {
                      setRating({
                        ...rating,
                        [key]: e.target.checked,
                      });
                    }}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-gray-300">{label}</span>
                </label>
              ))}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Descripción
              </label>
              <textarea
                value={rating.descripcion || ''}
                onChange={(e) =>
                  setRating({ ...rating, descripcion: e.target.value })
                }
                placeholder="Describe tus observaciones..."
                className="input-field resize-none"
                rows={4}
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCurrentStep('banking')}
                className="btn-secondary flex-1"
              >
                Anterior
              </button>
              <button type="submit" className="btn-primary flex-1">
                {existingSalon ? 'Actualizar' : 'Registrar'} Salón
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
