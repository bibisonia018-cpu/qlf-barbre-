import { Service, Barber } from './types';

export const SERVICES: Service[] = [
  {
    id: 's1',
    name: 'حلاقة عادية',
    description: 'قصة شعر كلاسيكية احترافية تناسب ملامح وجهك.',
    price: 400,
    duration: 30,
    category: 'hair',
  },
  {
    id: 's2',
    name: 'بروتين',
    description: 'علاج البروتين لتنعيم الشعر وتغذيته بعمق.',
    price: 1000,
    duration: 60,
    category: 'extra',
  },
  {
    id: 's3',
    name: 'كيراتين',
    description: 'فرد الشعر بالكيراتين الأصلي للحصول على مظهر ناعم وصحي.',
    price: 1000,
    duration: 60,
    category: 'extra',
  },
  {
    id: 's4',
    name: 'حلاقة لحية',
    description: 'تحديد وتهذيب اللحية مع منشفة ساخنة وزيوت فاخرة.',
    price: 150,
    duration: 20,
    category: 'beard',
  },
  {
    id: 's5',
    name: 'عناية بالوجه',
    description: 'تنظيف عميق للبشرة مع ماسكات طبيعية وبخار.',
    price: 500,
    duration: 40,
    category: 'extra',
  },
  {
    id: 's6',
    name: 'تصفيف شعر',
    description: 'سشوار وتصفيف احترافي للمناسبات.',
    price: 150,
    duration: 15,
    category: 'hair',
  },
];

export const BARBERS: Barber[] = [
  {
    id: 'b1',
    name: 'Amir',
    role: 'Master Barber',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=500',
    bio: 'صاحب الخبرة واللمسة الفنية في عالم الحلاقة.',
  },
  {
    id: 'b2',
    name: 'Yacine',
    role: 'Fade Specialist',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=500',
    bio: 'متخصص في القصات العصرية والتدرجات الدقيقة.',
  },
  {
    id: 'b3',
    name: 'Sofiane',
    role: 'Beard Expert',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=400&h=500',
    bio: 'خبير في العناية باللحية والستايل الكلاسيكي.',
  },
];
