import React from 'react';
import { ArrowLeft, MapPin, Phone, Users, DollarSign, ExternalLink, Star, Edit2, Trash2, Check, X } from 'lucide-react';
import type { Salon } from '../types';

interface SalonDetailScreenProps {
  salon: Salon;
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const SalonDetailScreen: React.FC<SalonDetailScreenProps> = ({
  salon,
  onBack,
  onEdit,
  onDelete,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const currentImage = salon.images?.[currentImageIndex] || 'https://via.placeholder.com/600x400?text=Sin+imagen';

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este salón?')) {
      onDelete();
    }
  };

  const ratingScore = salon.rating
    ? Math.round(
        (Object.values(salon.rating)
          .filter((v) => v === true || Array.isArray(v)).length / 7) * 5
      )
    : 0;

  return (
    <div className="space-y-8">
      {/* Header con navegación */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="p-2 hover:bg-dark-700 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-purple-400" />
        </button>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="btn-secondary flex items-center gap-2"
          >
            <Edit2 className="w-5 h-5" />
            Editar
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600/20 text-red-400 rounded-lg font-semibold hover:bg-red-600/30 transition-all duration-200 flex items-center gap-2"
          >
            <Trash2 className="w-5 h-5" />
            Eliminar
          </button>
        </div>
      </div>

      {/* Galería de imágenes */}
      <div className="card overflow-hidden">
        <div className="relative h-96 bg-dark-700">
          <img
            src={currentImage}
            alt={salon.hotelName}
            className="w-full h-full object-cover"
          />
          {salon.images && salon.images.length > 1 && (
            <>
              <button
                onClick={() =>
                  setCurrentImageIndex(
                    currentImageIndex === 0 ? salon.images.length - 1 : currentImageIndex - 1
                  )
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
              >
                ←
              </button>
              <button
                onClick={() =>
                  setCurrentImageIndex(
                    currentImageIndex === salon.images.length - 1 ? 0 : currentImageIndex + 1
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
              >
                →
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {salon.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === currentImageIndex ? 'bg-white w-6' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Información principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Encabezado */}
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">{salon.hotelName}</h1>
            <p className="text-gray-400">{salon.city}, {salon.state}</p>
          </div>

          {/* Información de contacto */}
          <div className="card p-6 space-y-4">
            <h2 className="text-xl font-bold text-white">Información de Contacto</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Dirección</p>
                  <p className="text-white">{salon.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Contacto</p>
                  <a
                    href={`tel:${salon.contact}`}
                    className="text-blue-400 hover:underline"
                  >
                    {salon.contact}
                  </a>
                </div>
              </div>
              <div className="pt-2">
                <p className="text-gray-400 text-sm mb-2">Ubicación</p>
                <a
                  href={salon.locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Ver en Google Maps
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Propietario */}
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-white mb-3">Propietario/Encargado</h3>
            <p className="text-gray-300">{salon.owner}</p>
          </div>

          {/* Detalles de los salones */}
          <div className="card p-6 space-y-4">
            <h2 className="text-xl font-bold text-white">
              Detalles de los Salones ({salon.numSalones})
            </h2>
            <div className="space-y-4">
              {salon.salones.map((s) => (
                <div
                  key={s.id}
                  className="border border-dark-600 rounded-lg p-4 bg-dark-700/30"
                >
                  <h3 className="text-lg font-semibold text-purple-400 mb-3">
                    {s.nombre}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Capacidad</p>
                      <div className="flex items-center gap-2 text-white font-semibold">
                        <Users className="w-4 h-4 text-blue-400" />
                        {s.capacidadHerradura} pers.
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Altura</p>
                      <p className="text-white font-semibold">{s.altura}m</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Precio</p>
                      <div className="flex items-center gap-2 text-white font-semibold">
                        <DollarSign className="w-4 h-4 text-green-400" />
                        ${s.precio}
                      </div>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Cursos</p>
                      <div className="flex flex-wrap gap-1">
                        {s.cursos.map((curso) => (
                          <span
                            key={curso}
                            className="text-xs bg-purple-600/30 text-purple-300 px-2 py-1 rounded"
                          >
                            {curso}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comentarios */}
          {salon.comments && (
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-white mb-3">Comentarios</h3>
              <p className="text-gray-300">{salon.comments}</p>
            </div>
          )}

          {/* Valoración */}
          {salon.rating && (
            <div className="card p-6 space-y-4">
              <h2 className="text-xl font-bold text-white">Valoración</h2>

              {ratingScore > 0 && (
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-6 h-6 ${
                          i < ratingScore
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-semibold text-white">
                    {ratingScore}/5
                  </span>
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <p className="text-gray-400 text-sm mb-2">Cursos indicados</p>
                  <div className="flex flex-wrap gap-2">
                    {salon.rating.cursoIndicado?.map((curso) => (
                      <span
                        key={curso}
                        className="bg-purple-600/30 text-purple-300 px-3 py-1 rounded-lg text-sm"
                      >
                        {curso}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-dark-600">
                  {[
                    { label: '¿Es céntrico?', value: salon.rating.esCentrico },
                    { label: '¿Tiene estacionamiento?', value: salon.rating.tieneEstacionamiento },
                    { label: '¿Estacionamiento techado?', value: salon.rating.estacionamientoTechado },
                    { label: '¿Baños limpios?', value: salon.rating.banosLimpios },
                    { label: '¿Limpieza entrada/salida?', value: salon.rating.limpiezaEntradaSalida },
                    { label: '¿Buena iluminación?', value: salon.rating.buenaIluminacion },
                    { label: '¿Contactos cerca?', value: salon.rating.contactosCerca },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center gap-2">
                      {value ? (
                        <Check className="w-5 h-5 text-green-400" />
                      ) : (
                        <X className="w-5 h-5 text-red-400" />
                      )}
                      <span className="text-gray-300 text-sm">{label}</span>
                    </div>
                  ))}
                </div>

                {salon.rating.descripcion && (
                  <div className="pt-3 border-t border-dark-600">
                    <p className="text-gray-400 text-sm mb-2">Observaciones</p>
                    <p className="text-gray-300">{salon.rating.descripcion}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar derecho */}
        <div className="space-y-6">
          {/* Datos bancarios */}
          {salon.bankingData && (
            <div className="card p-6 space-y-4">
              <h3 className="text-lg font-semibold text-white">Datos Bancarios</h3>
              <div className="space-y-3 text-sm">
                {salon.bankingData.beneficiario && (
                  <div>
                    <p className="text-gray-400">Beneficiario</p>
                    <p className="text-white font-semibold">
                      {salon.bankingData.beneficiario}
                    </p>
                  </div>
                )}
                {salon.bankingData.banco && (
                  <div>
                    <p className="text-gray-400">Banco</p>
                    <p className="text-white font-semibold">
                      {salon.bankingData.banco}
                    </p>
                  </div>
                )}
                {salon.bankingData.cuenta && (
                  <div>
                    <p className="text-gray-400">Cuenta</p>
                    <p className="text-white font-semibold">
                      {salon.bankingData.cuenta}
                    </p>
                  </div>
                )}
                {salon.bankingData.monto && (
                  <div>
                    <p className="text-gray-400">Monto</p>
                    <p className="text-white font-semibold">
                      ${salon.bankingData.monto}
                    </p>
                  </div>
                )}
                {salon.bankingData.pago && (
                  <div>
                    <p className="text-gray-400">Forma de Pago</p>
                    <p className="text-white font-semibold">
                      {salon.bankingData.pago}
                    </p>
                  </div>
                )}
                {salon.bankingData.concepto && (
                  <div>
                    <p className="text-gray-400">Concepto</p>
                    <p className="text-white font-semibold">
                      {salon.bankingData.concepto}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Información de creación */}
          <div className="card p-6 space-y-2 text-sm">
            <div>
              <p className="text-gray-400">Registrado</p>
              <p className="text-white">
                {new Date(salon.createdAt).toLocaleDateString('es-MX')}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Actualizado</p>
              <p className="text-white">
                {new Date(salon.updatedAt).toLocaleDateString('es-MX')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
