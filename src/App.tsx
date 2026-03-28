import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Scissors, 
  Clock, 
  MapPin, 
  Phone, 
  Instagram, 
  Facebook, 
  ChevronRight, 
  Star, 
  Menu, 
  X,
  Calendar,
  User,
  CheckCircle2
} from 'lucide-react';
import { SERVICES, BARBERS } from './constants';
import { Service, Barber } from './types';
import { cn } from './lib/utils';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    serviceIds: [] as string[],
    barberId: '',
    date: '',
    time: '',
    customerName: '',
    customerPhone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleBookNow = (service?: Service) => {
    if (service) {
      setSelectedServices([service]);
      setBookingData(prev => ({ ...prev, serviceIds: [service.id] }));
    } else {
      setSelectedServices([]);
      setBookingData(prev => ({ ...prev, serviceIds: [] }));
    }
    setIsBookingOpen(true);
    setBookingStep(1);
  };

  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);

  const confirmBooking = async () => {
    setIsSubmitting(true);
    try {
      const selectedServiceNames = selectedServices.map(s => s.name).join(', ');
      const barberName = BARBERS.find(b => b.id === bookingData.barberId)?.name;
      
      // Use absolute URL for the APK to reach the backend
      const isWebPreview = window.location.hostname.includes('run.app');
      const baseUrl = isWebPreview ? '' : 'https://ais-pre-o5elf62d6nnnj6ood3hpec-203849806605.europe-west2.run.app';

      const response = await fetch(`${baseUrl}/api/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service: selectedServiceNames,
          barber: barberName,
          date: bookingData.date,
          time: bookingData.time,
          customerName: bookingData.customerName,
          customerPhone: bookingData.customerPhone,
          totalPrice: totalPrice
        })
      });

      if (response.ok) {
        setBookingStep(4);
      } else {
        const errorData = await response.json().catch(() => ({ error: "Server Error" }));
        alert(`خطأ في الحجز: ${errorData.error || "حاول مرة أخرى"}`);
      }
    } catch (error: any) {
      alert("تعذر الاتصال بالسيرفر. تأكد من أنك قمت بـ Share للتطبيق في AI Studio.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#d4af37] selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scissors className="w-8 h-8 text-[#d4af37]" />
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-tighter font-display uppercase italic leading-none">QLF BARBER</span>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#d4af37] font-bold">
                chez <a href="https://www.facebook.com/share/1HeectyrMW/" target="_blank" rel="noopener noreferrer" className="hover:underline">amir</a>
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
            <a href="#services" className="hover:text-[#d4af37] transition-colors">Services</a>
            <a href="#barbers" className="hover:text-[#d4af37] transition-colors">Barbers</a>
            <a href="#gallery" className="hover:text-[#d4af37] transition-colors">Gallery</a>
            <a href="#contact" className="hover:text-[#d4af37] transition-colors">Contact</a>
            <button 
              onClick={() => handleBookNow()}
              className="px-6 py-2 bg-[#d4af37] text-black font-bold hover:bg-[#b8962d] transition-colors rounded-none"
            >
              BOOK NOW
            </button>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[60] bg-black p-8 flex flex-col"
          >
            <div className="flex justify-end">
              <button onClick={() => setIsMenuOpen(false)}>
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="flex flex-col gap-8 mt-12 text-3xl font-display italic">
              <a href="#services" onClick={() => setIsMenuOpen(false)}>Services</a>
              <a href="#barbers" onClick={() => setIsMenuOpen(false)}>Barbers</a>
              <a href="#gallery" onClick={() => setIsMenuOpen(false)}>Gallery</a>
              <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</a>
            </div>
            <button 
              onClick={() => {
                setIsMenuOpen(false);
                handleBookNow();
              }}
              className="mt-auto w-full py-4 bg-[#d4af37] text-black font-bold text-xl"
            >
              BOOK NOW
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=2000" 
            alt="Barber Shop" 
            className="w-full h-full object-cover opacity-40 grayscale"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[#d4af37] text-sm font-bold tracking-[0.3em] uppercase mb-4 block">ESTABLISHED 2024</span>
            <h1 className="text-6xl md:text-9xl font-display italic font-bold mb-4 leading-tight">
              QLF BARBER
            </h1>
            <span className="text-2xl md:text-4xl text-[#d4af37] font-display italic mb-8 block">
              chez <a href="https://www.facebook.com/share/1HeectyrMW/" target="_blank" rel="noopener noreferrer" className="hover:underline">amir</a>
            </span>
            <p className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto font-light tracking-wide">
              Experience the pinnacle of male grooming at QLF Barber. Where tradition meets modern precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => handleBookNow()}
                className="px-10 py-5 bg-[#d4af37] text-black font-bold text-lg hover:bg-[#b8962d] transition-all transform hover:scale-105"
              >
                BOOK YOUR APPOINTMENT
              </button>
              <a 
                href="#services"
                className="px-10 py-5 border border-white/20 hover:bg-white/10 transition-all text-lg font-bold"
              >
                VIEW SERVICES
              </a>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-px h-12 bg-gradient-to-b from-[#d4af37] to-transparent" />
        </div>
      </section>

      {/* Stats/Features */}
      <section className="py-20 border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: 'HAPPY CLIENTS', value: '2.5K+' },
            { label: 'MASTER BARBERS', value: '8' },
            { label: 'YEARS EXP', value: '12' },
            { label: 'STYLE RATING', value: '5.0' },
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-4xl font-display font-bold text-[#d4af37] mb-2">{stat.value}</div>
              <div className="text-xs tracking-[0.2em] text-white/40 font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div>
              <span className="text-[#d4af37] text-sm font-bold tracking-[0.3em] uppercase mb-4 block">OUR MENU</span>
              <h2 className="text-5xl md:text-7xl font-display italic font-bold">PREMIUM SERVICES</h2>
            </div>
            <p className="max-w-md text-white/50 leading-relaxed">
              From classic cuts to modern styling, our master barbers provide a personalized experience for every client.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {SERVICES.map((service) => (
              <div key={service.id} className="bg-[#0a0a0a] p-10 group hover:bg-white/[0.03] transition-colors flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <div className="p-3 bg-white/5 rounded-none group-hover:bg-[#d4af37]/20 transition-colors">
                    <Scissors className="w-6 h-6 text-[#d4af37]" />
                  </div>
                  <span className="text-3xl font-display font-bold text-[#d4af37]">{service.price} DZD</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 uppercase tracking-tight">{service.name}</h3>
                <p className="text-white/40 mb-8 flex-grow leading-relaxed">{service.description}</p>
                <div className="flex items-center gap-4 text-xs font-bold tracking-widest text-white/60 mb-8">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {service.duration} MIN</span>
                </div>
                <button 
                  onClick={() => handleBookNow(service)}
                  className="w-full py-4 border border-white/10 group-hover:border-[#d4af37] group-hover:text-[#d4af37] transition-all uppercase text-sm font-bold tracking-widest"
                >
                  SELECT SERVICE
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Barbers Section */}
      <section id="barbers" className="py-32 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="text-[#d4af37] text-sm font-bold tracking-[0.3em] uppercase mb-4 block">THE TEAM</span>
            <h2 className="text-5xl md:text-7xl font-display italic font-bold">MASTER BARBERS</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {BARBERS.map((barber) => (
              <motion.div 
                key={barber.id}
                whileHover={{ y: -10 }}
                className="group relative"
              >
                <div className="aspect-[4/5] overflow-hidden mb-6 grayscale group-hover:grayscale-0 transition-all duration-500">
                  <img 
                    src={barber.image} 
                    alt={barber.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-display font-bold mb-1 italic">{barber.name}</h3>
                  <p className="text-[#d4af37] text-xs font-bold tracking-widest uppercase mb-4">{barber.role}</p>
                  <p className="text-white/40 text-sm max-w-xs mx-auto">{barber.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-5xl font-display italic font-bold">THE GALLERY</h2>
            <div className="hidden md:flex gap-4">
              <Instagram className="w-6 h-6 text-white/40 hover:text-[#d4af37] cursor-pointer" />
              <Facebook className="w-6 h-6 text-white/40 hover:text-[#d4af37] cursor-pointer" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800',
              'https://images.unsplash.com/photo-1621605815841-2dddb7a69e3d?auto=format&fit=crop&q=80&w=800',
              'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800',
              'https://images.unsplash.com/photo-1622286332303-0738643e8db4?auto=format&fit=crop&q=80&w=800',
              'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=800',
              'https://images.unsplash.com/photo-1532710093739-9470acff878f?auto=format&fit=crop&q=80&w=800',
              'https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=800',
              'https://images.unsplash.com/photo-1512690199101-8d8eb8899578?auto=format&fit=crop&q=80&w=800'
            ].map((url, i) => (
              <div key={i} className="aspect-square overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer relative group">
                <img 
                  src={url} 
                  alt={`Gallery ${i}`} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-[#d4af37]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Instagram className="w-8 h-8 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-black">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <span className="text-[#d4af37] text-sm font-bold tracking-[0.3em] uppercase mb-4 block">VISIT US</span>
            <h2 className="text-5xl md:text-7xl font-display italic font-bold mb-12">GET IN TOUCH</h2>
            
            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="w-12 h-12 glass flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-[#d4af37]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2 uppercase tracking-widest">Location</h4>
                  <p className="text-white/40 leading-relaxed">حي 500 مسكن، عمارة 12<br />الجزائر العاصمة</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 glass flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-[#d4af37]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2 uppercase tracking-widest">Hours</h4>
                  <p className="text-white/40 leading-relaxed">Mon - Fri: 9:00 AM - 8:00 PM<br />Sat: 10:00 AM - 6:00 PM<br />Sun: Closed</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 glass flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-[#d4af37]" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-2 uppercase tracking-widest">Contact</h4>
                  <p className="text-white/40 leading-relaxed">+1 (555) 123-4567<br />hello@qlfbarber.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
            <h3 className="text-3xl font-display italic font-bold mb-8">SEND A MESSAGE</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-widest text-white/40 uppercase">Full Name</label>
                  <input type="text" className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:border-[#d4af37] outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold tracking-widest text-white/40 uppercase">Email Address</label>
                  <input type="email" className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:border-[#d4af37] outline-none transition-colors" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold tracking-widest text-white/40 uppercase">Message</label>
                <textarea rows={4} className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:border-[#d4af37] outline-none transition-colors resize-none"></textarea>
              </div>
              <button className="w-full py-5 bg-[#d4af37] text-black font-bold uppercase tracking-widest hover:bg-[#b8962d] transition-colors">
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Scissors className="w-6 h-6 text-[#d4af37]" />
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold tracking-tighter font-display uppercase italic leading-none">QLF BARBER</span>
              <span className="text-[8px] tracking-[0.3em] uppercase text-[#d4af37] font-bold">
                chez <a href="https://www.facebook.com/share/1HeectyrMW/" target="_blank" rel="noopener noreferrer" className="hover:underline">amir</a>
              </span>
            </div>
          </div>
          <p className="text-white/20 text-xs tracking-[0.3em] uppercase">
            engineered by <a href="https://www.facebook.com/abd.elmoulmene" target="_blank" rel="noopener noreferrer" className="hover:text-[#d4af37] transition-colors">mimoun aissaoui</a>
          </p>
        </div>
      </footer>

      {/* Booking Modal */}
      <AnimatePresence>
        {isBookingOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBookingOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0f0f0f] border border-white/10 p-8 md:p-12 shadow-2xl overflow-hidden"
            >
              <button 
                onClick={() => setIsBookingOpen(false)}
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mb-10">
                <div className="flex items-center gap-4 mb-2">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border",
                    bookingStep >= 1 ? "bg-[#d4af37] border-[#d4af37] text-black" : "border-white/20 text-white/20"
                  )}>1</div>
                  <div className="h-px flex-grow bg-white/10" />
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border",
                    bookingStep >= 2 ? "bg-[#d4af37] border-[#d4af37] text-black" : "border-white/20 text-white/20"
                  )}>2</div>
                  <div className="h-px flex-grow bg-white/10" />
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border",
                    bookingStep >= 3 ? "bg-[#d4af37] border-[#d4af37] text-black" : "border-white/20 text-white/20"
                  )}>3</div>
                </div>
              </div>

              {bookingStep === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h3 className="text-3xl font-display italic font-bold mb-8">SELECT SERVICES</h3>
                  <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                    {SERVICES.map((service) => (
                      <button 
                        key={service.id}
                        onClick={() => {
                          const isSelected = bookingData.serviceIds.includes(service.id);
                          const newIds = isSelected 
                            ? bookingData.serviceIds.filter(id => id !== service.id)
                            : [...bookingData.serviceIds, service.id];
                          
                          setBookingData(prev => ({ ...prev, serviceIds: newIds }));
                          setSelectedServices(SERVICES.filter(s => newIds.includes(s.id)));
                        }}
                        className={cn(
                          "w-full p-6 border flex items-center justify-between transition-all group",
                          bookingData.serviceIds.includes(service.id) 
                            ? "bg-[#d4af37] border-[#d4af37] text-black" 
                            : "bg-white/5 border-white/10 hover:border-white/30"
                        )}
                      >
                        <div className="text-left">
                          <div className="font-bold uppercase tracking-widest text-sm mb-1">{service.name}</div>
                          <div className={cn("text-xs", bookingData.serviceIds.includes(service.id) ? "text-black/60" : "text-white/40")}>
                            {service.duration} MIN • {service.price} DZD
                          </div>
                        </div>
                        <div className={cn(
                          "w-6 h-6 border flex items-center justify-center transition-colors",
                          bookingData.serviceIds.includes(service.id) ? "border-black bg-black/10" : "border-white/20"
                        )}>
                          {bookingData.serviceIds.includes(service.id) && <CheckCircle2 className="w-4 h-4 text-black" />}
                        </div>
                      </button>
                    ))}
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-bold tracking-widest text-white/20 uppercase mb-1">Total Price</div>
                      <div className="text-2xl font-display font-bold text-[#d4af37]">{totalPrice} DZD</div>
                    </div>
                    <button 
                      disabled={bookingData.serviceIds.length === 0}
                      onClick={() => setBookingStep(2)}
                      className="px-8 py-4 bg-[#d4af37] text-black font-bold uppercase tracking-widest hover:bg-[#b8962d] transition-colors disabled:opacity-50"
                    >
                      NEXT STEP
                    </button>
                  </div>
                </motion.div>
              )}

              {bookingStep === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h3 className="text-3xl font-display italic font-bold mb-8">CHOOSE YOUR BARBER</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {BARBERS.map((barber) => (
                      <button 
                        key={barber.id}
                        onClick={() => {
                          setBookingData(prev => ({ ...prev, barberId: barber.id }));
                          setBookingStep(3);
                        }}
                        className={cn(
                          "p-6 border transition-all text-center group",
                          bookingData.barberId === barber.id 
                            ? "bg-[#d4af37] border-[#d4af37] text-black" 
                            : "bg-white/5 border-white/10 hover:border-white/30"
                        )}
                      >
                        <div className="w-20 h-20 mx-auto mb-4 overflow-hidden rounded-full grayscale group-hover:grayscale-0 transition-all">
                          <img src={barber.image} alt={barber.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="font-bold uppercase tracking-tight text-sm mb-1">{barber.name.split(' ')[0]}</div>
                        <div className={cn("text-[10px] font-bold tracking-widest uppercase", bookingData.barberId === barber.id ? "text-black/60" : "text-[#d4af37]")}>
                          {barber.role.split(' ')[0]}
                        </div>
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={() => setBookingStep(1)}
                    className="mt-8 text-xs font-bold tracking-[0.2em] text-white/40 hover:text-white uppercase flex items-center gap-2"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180" /> Back to services
                  </button>
                </motion.div>
              )}

              {bookingStep === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h3 className="text-3xl font-display italic font-bold mb-8">YOUR DETAILS</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-widest text-white/40 uppercase">Full Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="الاسم الكامل"
                        className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:border-[#d4af37] outline-none text-white"
                        value={bookingData.customerName}
                        onChange={(e) => setBookingData(prev => ({ ...prev, customerName: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold tracking-widest text-white/40 uppercase">Phone Number</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="رقم الهاتف"
                        className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:border-[#d4af37] outline-none text-white"
                        value={bookingData.customerPhone}
                        onChange={(e) => setBookingData(prev => ({ ...prev, customerPhone: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-xs font-bold tracking-widest text-white/40 uppercase">Select Date</label>
                      <input 
                        type="date" 
                        className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:border-[#d4af37] outline-none text-white"
                        onChange={(e) => setBookingData(prev => ({ ...prev, date: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-xs font-bold tracking-widest text-white/40 uppercase">Select Time</label>
                      <div className="grid grid-cols-3 gap-2">
                        {['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'].map((t) => (
                          <button 
                            key={t}
                            onClick={() => setBookingData(prev => ({ ...prev, time: t }))}
                            className={cn(
                              "py-2 text-xs font-bold border transition-all",
                              bookingData.time === t 
                                ? "bg-[#d4af37] border-[#d4af37] text-black" 
                                : "bg-white/5 border-white/10 hover:border-white/30"
                            )}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    onClick={confirmBooking}
                    disabled={!bookingData.date || !bookingData.time || !bookingData.customerName || !bookingData.customerPhone || isSubmitting}
                    className="w-full mt-12 py-5 bg-[#d4af37] text-black font-bold uppercase tracking-widest hover:bg-[#b8962d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      "CONFIRM BOOKING"
                    )}
                  </button>
                  
                  <button 
                    onClick={() => setBookingStep(2)}
                    className="mt-8 text-xs font-bold tracking-[0.2em] text-white/40 hover:text-white uppercase flex items-center gap-2"
                  >
                    <ChevronRight className="w-4 h-4 rotate-180" /> Back to barber
                  </button>
                </motion.div>
              )}

              {bookingStep === 4 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-[#d4af37] rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 className="w-10 h-10 text-black" />
                  </div>
                  <h3 className="text-4xl font-display italic font-bold mb-4 uppercase">BOOKING CONFIRMED!</h3>
                  <p className="text-white/40 mb-12 max-w-sm mx-auto leading-relaxed">
                    لقد تم استلام طلب الحجز الخاص بك. سنتصل بك قريباً لتأكيد الموعد. شكراً لثقتك في QLF Barber.
                  </p>
                  <div className="bg-white/5 border border-white/10 p-6 text-left mb-12">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="col-span-2">
                        <div className="text-[10px] font-bold tracking-widest text-white/20 uppercase mb-1">Services</div>
                        <div className="font-bold uppercase text-[#d4af37]">{selectedServices.map(s => s.name).join(', ')}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold tracking-widest text-white/20 uppercase mb-1">Total Price</div>
                        <div className="font-bold uppercase">{totalPrice} DZD</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold tracking-widest text-white/20 uppercase mb-1">Barber</div>
                        <div className="font-bold uppercase">{BARBERS.find(b => b.id === bookingData.barberId)?.name}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold tracking-widest text-white/20 uppercase mb-1">Date</div>
                        <div className="font-bold uppercase">{bookingData.date}</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-bold tracking-widest text-white/20 uppercase mb-1">Time</div>
                        <div className="font-bold uppercase">{bookingData.time}</div>
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsBookingOpen(false)}
                    className="px-12 py-4 border border-[#d4af37] text-[#d4af37] font-bold uppercase tracking-widest hover:bg-[#d4af37] hover:text-black transition-all"
                  >
                    CLOSE
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d4af37;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}

