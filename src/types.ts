export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: 'hair' | 'beard' | 'combo' | 'extra';
}

export interface Barber {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface Booking {
  id: string;
  serviceIds: string[];
  barberId: string;
  date: string;
  time: string;
  customerName: string;
  customerPhone: string;
}
