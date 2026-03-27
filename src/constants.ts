import { Service, Barber } from './types';

export const SERVICES: Service[] = [
  {
    id: 's1',
    name: 'The Signature Cut',
    description: 'Precision haircut tailored to your head shape and hair type. Includes consultation, wash, and style.',
    price: 35,
    duration: 45,
    category: 'hair',
  },
  {
    id: 's2',
    name: 'Beard Sculpting',
    description: 'Expert beard shaping and trimming with hot towel treatment and premium beard oil application.',
    price: 25,
    duration: 30,
    category: 'beard',
  },
  {
    id: 's3',
    name: 'The QLF Experience',
    description: 'The ultimate grooming package: Signature cut, beard sculpting, and a relaxing scalp massage.',
    price: 55,
    duration: 75,
    category: 'combo',
  },
  {
    id: 's4',
    name: 'Traditional Hot Shave',
    description: 'Classic straight razor shave with multiple hot towels and soothing post-shave balm.',
    price: 30,
    duration: 40,
    category: 'beard',
  },
  {
    id: 's5',
    name: 'Buzz Cut & Fade',
    description: 'Clean, uniform length with a sharp fade on the sides. Minimalist and sharp.',
    price: 25,
    duration: 30,
    category: 'hair',
  },
];

export const BARBERS: Barber[] = [
  {
    id: 'b1',
    name: 'Marco "The Blade"',
    role: 'Master Barber',
    image: 'https://picsum.photos/seed/barber1/400/500',
    bio: '15 years of experience in classic Italian barbering techniques.',
  },
  {
    id: 'b2',
    name: 'Sarah Sharp',
    role: 'Stylist & Fade Specialist',
    image: 'https://picsum.photos/seed/barber2/400/500',
    bio: 'Specializes in modern fades and intricate hair designs.',
  },
  {
    id: 'b3',
    name: 'Leo "The Groomer"',
    role: 'Senior Barber',
    image: 'https://picsum.photos/seed/barber3/400/500',
    bio: 'Expert in beard care and traditional straight razor shaves.',
  },
];
