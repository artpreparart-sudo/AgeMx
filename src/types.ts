export interface Salon {
  id: string;
  hotelName: string;
  state: string;
  city: string;
  owner: string;
  contact: string;
  address: string;
  locationUrl: string;
  numSalones: number;
  salones: SalonDetail[];
  images: string[];
  comments?: string;
  rating?: SalonRating;
  bankingData?: BankingData;
  createdAt: string;
  updatedAt: string;
}

export interface SalonDetail {
  id: string;
  nombre: string;
  capacidadHerradura: number;
  altura: number;
  precio: number;
  cursos: string[];
}

export interface SalonRating {
  cursoIndicado: string[];
  esCentrico: boolean;
  tieneEstacionamiento: boolean;
  estacionamientoTechado: boolean;
  banosLimpios: boolean;
  limpiezaEntradaSalida: boolean;
  buenaIluminacion: boolean;
  contactosCerca: boolean;
  descripcion: string;
}

export interface BankingData {
  ciudad: string;
  cursos: string;
  nombreSalon: string;
  beneficiario: string;
  cuenta: string;
  banco: string;
  monto: number;
  pago: 'completo' | '50%' | 'evento' | 'salon-voleto' | 'diferido';
  concepto?: string;
}

export interface State {
  id: string;
  name: string;
  gradient: string;
}

export interface City {
  id: string;
  stateId: string;
  name: string;
  mostUsed?: boolean;
}
