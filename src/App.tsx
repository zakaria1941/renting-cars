import React, { useState, useEffect, useRef } from 'react';
import { 
  Car, 
  Search, 
  Calendar, 
  Heart, 
  Star, 
  Check, 
  Menu, 
  X, 
  ArrowRight, 
  MapPin, 
  Sparkles, 
  DollarSign, 
  Clock, 
  User, 
  ChevronRight, 
  ChevronLeft,
  Briefcase,
  Smile,
  ShieldAlert,
  Award
} from 'lucide-react';

// Interfaces
interface CarItem {
  id: number;
  name: string;
  year: number;
  price: number;
  rating: number;
  reviewsCount: number;
  badge: 'Top Rated' | 'New Listing';
  image: string;
  hostName: string;
  hostAvatar: string;
  category: string;
  location: string;
}

// Simulated Car Data
const CAR_DATA: CarItem[] = [
  {
    id: 1,
    name: "Tesla Model Y",
    year: 2024,
    price: 89,
    rating: 4.9,
    reviewsCount: 23,
    badge: "Top Rated",
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=600&q=80",
    hostName: "Alex",
    hostAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
    category: "Electric",
    location: "Miami"
  },
  {
    id: 2,
    name: "Porsche Macan",
    year: 2022,
    price: 145,
    rating: 4.8,
    reviewsCount: 14,
    badge: "Top Rated",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80",
    hostName: "Marcus",
    hostAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    category: "Luxury",
    location: "Los Angeles"
  },
  {
    id: 3,
    name: "Ford Mustang GT",
    year: 2023,
    price: 76,
    rating: 4.9,
    reviewsCount: 45,
    badge: "Top Rated",
    image: "https://images.unsplash.com/photo-1611245801319-4b1638ec2d88?w=600&q=80",
    hostName: "Tyler",
    hostAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
    category: "Sports Cars",
    location: "Las Vegas"
  },
  {
    id: 4,
    name: "BMW M3",
    year: 2022,
    price: 210,
    rating: 5.0,
    reviewsCount: 31,
    badge: "Top Rated",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80",
    hostName: "Sofia",
    hostAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
    category: "Luxury",
    location: "New York"
  },
  {
    id: 5,
    name: "Jeep Wrangler Rubicon",
    year: 2023,
    price: 68,
    rating: 4.7,
    reviewsCount: 19,
    badge: "New Listing",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80",
    hostName: "Danielle",
    hostAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
    category: "SUVs",
    location: "Miami"
  },
  {
    id: 6,
    name: "Mercedes G-Wagon",
    year: 2021,
    price: 290,
    rating: 4.9,
    reviewsCount: 56,
    badge: "Top Rated",
    image: "https://images.unsplash.com/photo-1520050206274-a1ae446cb3cc?w=600&q=80",
    hostName: "Xavier",
    hostAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    category: "Luxury",
    location: "Dubai"
  },
  {
    id: 7,
    name: "Toyota RAV4 Hybrid",
    year: 2024,
    price: 55,
    rating: 4.8,
    reviewsCount: 82,
    badge: "Top Rated",
    image: "https://images.unsplash.com/photo-1626847037657-fd3622613ce3?w=600&q=80",
    hostName: "Elena",
    hostAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
    category: "SUVs",
    location: "Paris"
  },
  {
    id: 8,
    name: "Chevrolet Corvette C8",
    year: 2022,
    price: 195,
    rating: 5.0,
    reviewsCount: 12,
    badge: "New Listing",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80",
    hostName: "Chase",
    hostAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
    category: "Sports Cars",
    location: "Las Vegas"
  }
];

// Stats Component with dynamic count up
function AnimatedCounter({ target, suffix = '', label, isDecimal = false }: { target: number; suffix?: string; label: string; isDecimal?: boolean }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        let start = 0;
        const duration = 2000;
        const startTime = performance.now();

        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = progress * (2 - progress); // Ease Out Quad
          
          const currentCount = isDecimal 
            ? Math.floor(easeProgress * target * 10) / 10
            : Math.floor(easeProgress * target);
          
          setCount(currentCount);

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setCount(target);
          }
        };

        requestAnimationFrame(animate);
      }
    }, { threshold: 0.1 });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [target, isDecimal]);

  const formatNumber = (num: number) => {
    if (isDecimal) {
      return num.toFixed(1);
    }
    if (num >= 10000000) {
      return "10M";
    }
    if (num >= 450000) {
      return "450,000";
    }
    if (num >= 1000) {
      return num.toLocaleString();
    }
    return num.toString();
  };

  return (
    <div ref={elementRef} className="text-center p-8 bg-white border border-slate-100 rounded-2xl flex flex-col items-center justify-center shadow-xs">
      <div className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2 font-sans tracking-tight">
        {formatNumber(count)}
        {suffix}
      </div>
      <div className="text-xs md:text-sm font-semibold text-slate-500 uppercase tracking-wider">{label}</div>
    </div>
  );
}

export default function App() {
  // Navigation & Scroll
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // States for search & filters
  const [location, setLocation] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [untilDate, setUntilDate] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [likedCars, setLikedCars] = useState<Record<number, boolean>>({});
  
  // Modals & Feedback
  const [bookingCar, setBookingCar] = useState<CarItem | null>(null);
  const [searchFeedback, setSearchFeedback] = useState<string | null>(null);
  const [authModal, setAuthModal] = useState<'login' | 'signup' | null>(null);
  const [hostSuccessModal, setHostSuccessModal] = useState(false);
  
  // Particles state
  const [particles, setParticles] = useState<{ id: number; size: number; left: number; delay: number; duration: number }[]>([]);

  // Generate particles on client side to avoid SSR/hydration issues
  useEffect(() => {
    const generated = Array.from({ length: 20 }, (_, i) => {
      const size = Math.random() * 4 + 3; // 3 to 7px
      const left = Math.random() * 100; // 0 to 100%
      const delay = Math.random() * 12; // 0 to 12s
      const duration = Math.random() * 8 + 12; // 12 to 20s
      return { id: i, size, left, delay, duration };
    });
    setParticles(generated);
  }, []);

  // Listen to scroll to apply navbar blur & transparency
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for Scroll Reveal
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.scroll-reveal');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  // Filter cars based on filter pills or search query
  const filteredCars = CAR_DATA.filter(car => {
    // Pill filter
    if (activeFilter === 'Airports') {
      // simulate nearby airports for Porsche, Tesla, Corvette
      return car.id === 1 || car.id === 2 || car.id === 8;
    }
    if (activeFilter === 'Monthly') {
      return car.price < 90; // Cheaper options are good for monthly
    }
    if (activeFilter === 'Nearby') {
      return car.location === 'Miami' || car.location === 'Los Angeles';
    }
    if (activeFilter === 'Delivered') {
      return car.badge === 'Top Rated';
    }
    return true;
  });

  const toggleHeart = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setLikedCars(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location.trim()) {
      setSearchFeedback("Please enter a valid destination to search.");
      setTimeout(() => setSearchFeedback(null), 4000);
      return;
    }
    setSearchFeedback(`Success! Showing the best vehicles available in "${location}" for your selected dates.`);
    setTimeout(() => setSearchFeedback(null), 5000);
  };

  return (
    <div className="bg-white text-slate-900 min-h-screen relative font-sans antialiased overflow-x-hidden selection:bg-[#e63946] selection:text-white">
      
      {/* HEADER SECTION & ANNOUNCEMENT BANNER */}
      <header id="header-section" className="relative z-50">
        
        {/* TOP BANNER */}
        <div className="w-full bg-[#e63946] text-white py-2 px-4 text-center text-xs md:text-sm font-semibold tracking-wide flex items-center justify-center gap-1">
          <span>🚗 Earn up to $1,000/month sharing your car</span>
          <button 
            onClick={() => {
              const el = document.getElementById('become-host-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="underline cursor-pointer hover:opacity-90 ml-1 transition-all"
          >
            Learn More →
          </button>
        </div>

        {/* NAVBAR */}
        <nav 
          id="main-nav"
          className={`w-full fixed top-0 left-0 transition-all duration-300 py-4 px-6 md:px-12 flex items-center justify-between mt-0 ${
            scrolled 
              ? 'bg-white/90 backdrop-blur-md shadow-md border-b border-slate-100 top-0 translate-y-0' 
              : 'bg-transparent text-white pt-8'
          }`}
          style={{ 
            marginTop: scrolled ? '0px' : '38px',
            position: scrolled ? 'fixed' : 'absolute'
          }}
        >
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className={`p-2 rounded-xl transition-colors ${scrolled ? 'bg-[#e63946] text-white' : 'bg-white/10 text-white backdrop-blur-xs'}`}>
              <Car className="w-6 h-6" />
            </div>
            <span className={`text-2xl font-extrabold tracking-tight transition-colors ${scrolled ? 'text-slate-900' : 'text-white'}`}>
              Drive<span className="text-[#e63946]">Now</span>
            </span>
          </a>

          {/* Center Links (Desktop) */}
          <div className="hidden md:flex items-center gap-8 font-semibold">
            <button 
              onClick={() => document.getElementById('how-it-works-section')?.scrollIntoView({ behavior: 'smooth' })}
              className={`transition-colors cursor-pointer text-sm tracking-wide ${scrolled ? 'text-slate-600 hover:text-[#e63946]' : 'text-slate-200 hover:text-white'}`}
            >
              How it Works
            </button>
            <button 
              onClick={() => document.getElementById('become-host-section')?.scrollIntoView({ behavior: 'smooth' })}
              className={`transition-colors cursor-pointer text-sm tracking-wide ${scrolled ? 'text-slate-600 hover:text-[#e63946]' : 'text-slate-200 hover:text-white'}`}
            >
              Become a Host
            </button>
            <button 
              onClick={() => alert("Gift Cards module initialized! Gift card features are coming soon.")}
              className={`transition-colors cursor-pointer text-sm tracking-wide ${scrolled ? 'text-slate-600 hover:text-[#e63946]' : 'text-slate-200 hover:text-white'}`}
            >
              Gift Cards
            </button>
          </div>

          {/* Right Controls */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              id="login-nav-btn"
              onClick={() => setAuthModal('login')}
              className={`font-semibold text-sm px-5 py-2.5 rounded-full transition-all cursor-pointer ${
                scrolled 
                  ? 'text-slate-700 hover:text-[#e63946] bg-slate-50 hover:bg-slate-100' 
                  : 'text-white hover:text-slate-200 bg-white/10 hover:bg-white/20'
              }`}
            >
              Log In
            </button>
            <button 
              id="signup-nav-btn"
              onClick={() => setAuthModal('signup')}
              className="bg-[#e63946] hover:bg-[#d62828] text-white font-semibold text-sm px-6 py-2.5 rounded-full shadow-lg shadow-[#e63946]/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile Hamburger Trigger */}
          <button 
            id="mobile-menu-trigger"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-xl transition-colors cursor-pointer ${
              scrolled 
                ? 'text-slate-900 bg-slate-100 hover:bg-slate-200' 
                : 'text-white bg-white/10 hover:bg-white/20'
            }`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* MOBILE SLIDE-DOWN MENU */}
        <div 
          id="mobile-nav-drawer"
          className={`md:hidden fixed top-0 left-0 w-full bg-slate-950 text-white z-40 pt-24 pb-8 px-6 border-b border-white/10 shadow-2xl transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-full pointer-events-none'
          }`}
        >
          <div className="flex flex-col gap-5 font-bold text-lg">
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                document.getElementById('how-it-works-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-left py-2 hover:text-[#e63946] transition-colors border-b border-white/5 cursor-pointer"
            >
              How it Works
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                document.getElementById('become-host-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-left py-2 hover:text-[#e63946] transition-colors border-b border-white/5 cursor-pointer"
            >
              Become a Host
            </button>
            <button 
              onClick={() => {
                setMobileMenuOpen(false);
                alert("Gift Cards feature coming soon!");
              }}
              className="text-left py-2 hover:text-[#e63946] transition-colors border-b border-white/5 cursor-pointer"
            >
              Gift Cards
            </button>
            
            <div className="flex flex-col gap-3 mt-6">
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAuthModal('login');
                }}
                className="w-full bg-white/10 hover:bg-white/20 py-3 rounded-full text-center text-sm font-semibold transition-all cursor-pointer"
              >
                Log In
              </button>
              <button 
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAuthModal('signup');
                }}
                className="w-full bg-[#e63946] hover:bg-[#d62828] py-3 rounded-full text-center text-sm font-semibold transition-all cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section 
        id="hero-section"
        className="hero-gradient-mesh min-h-screen relative flex flex-col justify-center items-center pt-32 pb-20 px-4 md:px-12 select-none overflow-hidden"
      >
        {/* Floating Particles container */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {particles.map((p) => (
            <div
              key={p.id}
              className="particle"
              style={{
                width: `${p.size}px`,
                height: `${p.size}px`,
                left: `${p.left}%`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.duration}s`,
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="w-full max-w-5xl text-center z-10 relative flex flex-col items-center">
          
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white text-xs font-semibold mb-6 animate-pulse uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#e63946]" />
            <span>✦ Rental Reimagined</span>
          </div>

          {/* H1 Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight md:leading-[1.1] tracking-tight max-w-4xl mb-4 font-sans">
            Find the perfect car, <span className="gradient-text">exactly where</span> you need it
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 font-light max-w-2xl mb-12 leading-relaxed">
            Rent from trusted local hosts — daily, weekly, or monthly
          </p>

          {/* Glassmorphism Search Box Container */}
          <div className="w-full max-w-4xl p-1">
            <form 
              id="hero-search-form"
              onSubmit={handleSearchSubmit}
              className="glass-card p-6 md:p-8 rounded-[32px] w-full flex flex-col gap-6"
            >
              {/* Row of Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                
                {/* Destination Location */}
                <div className="md:col-span-5 text-left">
                  <label htmlFor="search-location" className="block text-slate-300 text-xs font-semibold mb-1.5 uppercase tracking-wider pl-1">Where</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      id="search-location"
                      type="text" 
                      placeholder="City, airport, address..." 
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-slate-900 rounded-2xl border border-white/15 focus:border-[#e63946] focus:outline-hidden font-medium placeholder-slate-400 transition-all text-sm md:text-base"
                    />
                  </div>
                </div>

                {/* From Date */}
                <div className="md:col-span-3 text-left">
                  <label htmlFor="search-from-date" className="block text-slate-300 text-xs font-semibold mb-1.5 uppercase tracking-wider pl-1">From</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      id="search-from-date"
                      type="date" 
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-slate-900 rounded-2xl border border-white/15 focus:border-[#e63946] focus:outline-hidden font-medium placeholder-slate-400 transition-all text-sm"
                    />
                  </div>
                </div>

                {/* Until Date */}
                <div className="md:col-span-3 text-left">
                  <label htmlFor="search-until-date" className="block text-slate-300 text-xs font-semibold mb-1.5 uppercase tracking-wider pl-1">Until</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      id="search-until-date"
                      type="date" 
                      value={untilDate}
                      onChange={(e) => setUntilDate(e.target.value)}
                      className="w-full pl-12 pr-4 py-3.5 bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-slate-900 rounded-2xl border border-white/15 focus:border-[#e63946] focus:outline-hidden font-medium placeholder-slate-400 transition-all text-sm"
                    />
                  </div>
                </div>

                {/* Red Search Button */}
                <div className="md:col-span-1 flex items-end justify-center md:justify-end h-full pt-4 md:pt-0">
                  <button 
                    id="search-submit-btn"
                    type="submit"
                    className="w-full md:w-14 h-14 bg-[#e63946] hover:bg-[#d62828] text-white flex items-center justify-center rounded-2xl md:rounded-full transition-all duration-300 transform hover:rotate-6 active:scale-90 cursor-pointer shadow-lg shadow-[#e63946]/30"
                  >
                    <Search className="w-6 h-6 shrink-0" />
                  </button>
                </div>
              </div>

              {/* Filter pills underneath inputs */}
              <div className="flex flex-col gap-3">
                <div className="h-[1px] bg-white/10 w-full" />
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-wider mr-2">Quick Filters:</span>
                  {['All', 'Airports', 'Monthly', 'Nearby', 'Delivered'].map((pill) => (
                    <button
                      key={pill}
                      type="button"
                      onClick={() => setActiveFilter(pill)}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                        activeFilter === pill 
                          ? 'bg-[#e63946] text-white shadow-md shadow-[#e63946]/20 scale-105' 
                          : 'bg-white/10 hover:bg-white/15 text-white border border-white/10 hover:scale-105'
                      }`}
                    >
                      {pill}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          </div>

          {/* Search feedback toast */}
          {searchFeedback && (
            <div id="search-feedback-banner" className="mt-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium animate-fade-in max-w-xl z-20">
              {searchFeedback}
            </div>
          )}

        </div>
      </section>

      {/* STATS STRIP SECTION */}
      <section id="stats-section" className="py-16 bg-[#f8f9fa] border-b border-slate-100 relative z-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatedCounter target={450000} suffix="+" label="Vehicles available" />
            <AnimatedCounter target={10000000} suffix="+" label="Happy renters" />
            <AnimatedCounter target={5500} suffix="+" label="Cities worldwide" />
            <AnimatedCounter target={4.9} suffix="★" label="Average rating" isDecimal={true} />
          </div>
        </div>
      </section>

      {/* FEATURED CARS SECTION */}
      <section id="featured-cars" className="py-24 px-6 md:px-12 bg-white relative">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 scroll-reveal">
            <div>
              <span className="text-xs font-bold text-[#e63946] uppercase tracking-widest block mb-2">Popular Demand</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
                Popular Cars Near You
              </h2>
              <p className="text-slate-500 font-medium text-sm md:text-base mt-2 max-w-xl">
                Handpicked top-rated vehicles from trusted hosts in pristine condition.
              </p>
            </div>
            
            {/* Filter Pill Visual Feedback */}
            {activeFilter !== 'All' && (
              <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full mt-3 md:mt-0 font-medium inline-block self-start">
                Filtered by: <strong className="text-[#e63946] font-bold">{activeFilter}</strong>
              </span>
            )}
          </div>

          {/* Carousel Wrapper */}
          <div className="relative">
            {/* Horizontal scrollable carousel */}
            <div 
              id="car-cards-carousel"
              className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scroll-smooth no-scrollbar"
            >
              {filteredCars.map((car) => (
                <div 
                  key={car.id}
                  className="car-card min-w-[280px] sm:min-w-[320px] md:min-w-[340px] max-w-[340px] snap-start flex-none relative flex flex-col overflow-hidden"
                >
                  {/* Image Block */}
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img 
                      src={car.image} 
                      alt={car.name} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    
                    {/* Dark gradient top overlay for visibility */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />

                    {/* Badge Pill Top Left */}
                    <div className="absolute top-4 left-4">
                      <span className={`text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded-full text-white ${
                        car.badge === 'Top Rated' ? 'bg-[#e63946]' : 'bg-slate-900'
                      }`}>
                        {car.badge}
                      </span>
                    </div>

                    {/* Favorite Heart Button */}
                    <button 
                      onClick={(e) => toggleHeart(car.id, e)}
                      aria-label="Add to favorites"
                      className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/30 hover:bg-black/40 backdrop-blur-md flex items-center justify-center text-white transition-all hover:scale-110 active:scale-90 cursor-pointer"
                    >
                      <Heart 
                        className={`w-5 h-5 transition-all ${likedCars[car.id] ? 'fill-red-500 text-red-500 scale-110' : 'text-white'}`} 
                      />
                    </button>
                  </div>

                  {/* Body Info */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Name & Rating Row */}
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-[#e63946] transition-colors">
                          {car.name} <span className="font-light text-slate-400">{car.year}</span>
                        </h3>
                        <div className="flex items-center gap-1 shrink-0 mt-1">
                          <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                          <span className="text-xs font-bold text-slate-800">{car.rating}</span>
                          <span className="text-[10px] text-slate-400">({car.reviewsCount})</span>
                        </div>
                      </div>

                      {/* Details row / Category & Location */}
                      <div className="flex items-center gap-1.5 mb-4 text-xs text-slate-500 font-semibold">
                        <span className="bg-slate-100 px-2 py-0.5 rounded-sm">{car.category}</span>
                        <span className="text-slate-300">•</span>
                        <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" /> {car.location}</span>
                      </div>
                    </div>

                    {/* Footer Block with pricing & CTA */}
                    <div className="border-t border-slate-100 pt-4 mt-2 flex items-center justify-between">
                      <div>
                        <div className="text-lg font-extrabold text-[#e63946]">
                          ${car.price} <span className="text-xs text-slate-500 font-normal">/ day</span>
                        </div>
                        <div className="text-[11px] text-slate-400 font-medium">
                          ${car.price * 3} total est.
                        </div>
                      </div>

                      {/* Book Button */}
                      <button 
                        onClick={() => setBookingCar(car)}
                        className="bg-slate-950 hover:bg-[#e63946] text-white text-xs font-bold px-4 py-2 rounded-full cursor-pointer transition-all hover:scale-105 active:scale-95"
                      >
                        Book Now
                      </button>
                    </div>

                    {/* Host Avatar Row */}
                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-50">
                      <img 
                        src={car.hostAvatar} 
                        alt={car.hostName} 
                        className="w-6 h-6 rounded-full object-cover border border-slate-200"
                      />
                      <span className="text-[11px] font-semibold text-slate-500">Hosted by <strong className="text-slate-700 font-bold">{car.hostName}</strong></span>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Swipe hints */}
            <div className="flex md:hidden justify-center items-center gap-1 mt-4">
              <div className="w-4 h-1 bg-slate-300 rounded-full" />
              <div className="w-1.5 h-1 bg-slate-200 rounded-full" />
              <div className="w-1.5 h-1 bg-slate-200 rounded-full" />
            </div>
          </div>

          {/* Centered Footer CTA */}
          <div className="flex justify-center mt-12 scroll-reveal">
            <button 
              onClick={() => alert("Redirecting to all listings... Over 450,000 cars are available worldwide!")}
              className="px-8 py-3.5 border-2 border-[#e63946] hover:bg-[#e63946] text-[#e63946] hover:text-white font-bold text-sm rounded-full transition-all flex items-center gap-2 group cursor-pointer"
            >
              <span>See all cars</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

        </div>
      </section>

      {/* BROWSE BY CATEGORY SECTION */}
      <section id="browse-categories" className="py-24 px-6 md:px-12 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16 scroll-reveal">
            <span className="text-xs font-bold text-[#e63946] uppercase tracking-widest block mb-2">Curated Collections</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
              Explore by Vehicle Type
            </h2>
            <p className="text-slate-500 text-sm md:text-base mt-2 max-w-md mx-auto">
              Find exactly the kind of ride that fits your plans perfectly.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 scroll-reveal">
            {[
              { name: "Sports Cars", icon: "🏎", image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&q=80" },
              { name: "Trucks", icon: "🛻", image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80" },
              { name: "SUVs", icon: "🚐", image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=600&q=80" },
              { name: "Electric", icon: "⚡", image: "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&q=80" },
              { name: "Luxury", icon: "👑", image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=600&q=80" },
              { name: "Vans", icon: "🚌", image: "https://images.unsplash.com/photo-1527786356703-4b100091cd2c?w=600&q=80" }
            ].map((cat, idx) => (
              <div 
                key={idx}
                onClick={() => {
                  setActiveFilter('All');
                  // Filter the list visually or notify
                  alert(`Filtering listings by: ${cat.name}`);
                }}
                className="category-tile h-48 md:h-64 cursor-pointer group relative overflow-hidden"
              >
                {/* Background Image */}
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity" />

                {/* Content */}
                <div className="absolute bottom-5 left-5 z-10">
                  <div className="text-2xl mb-1">{cat.icon}</div>
                  <h3 className="text-white font-extrabold text-lg md:text-xl tracking-tight leading-none">
                    {cat.name}
                  </h3>
                </div>

                {/* Accent glow corner */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-[#e63946]/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works-section" className="py-24 px-6 md:px-12 bg-[#1a1a2e] text-white relative overflow-hidden">
        
        {/* Background glow lines */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5">
          <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-[#e63946] border-dashed" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="text-center mb-20 scroll-reveal">
            <span className="text-xs font-bold text-[#e63946] uppercase tracking-widest block mb-2">Simplicity First</span>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight font-sans">
              Renting is simple
            </h2>
            <p className="text-slate-400 text-sm md:text-base mt-2 max-w-sm mx-auto">
              Follow these three effortless steps to get on your way.
            </p>
          </div>

          {/* Steps Container */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 scroll-reveal">
            
            {/* Dashed Connector Line behind on Desktop */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[2px] border-t border-dashed border-white/20 z-0"></div>

            {/* Step 1 */}
            <div className="flex flex-col items-center text-center relative z-10 group">
              <div className="w-14 h-14 rounded-full bg-[#e63946] text-white flex items-center justify-center font-extrabold text-lg shadow-lg shadow-[#e63946]/30 mb-6 border-4 border-[#1a1a2e] group-hover:scale-110 transition-all duration-300">
                1
              </div>
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:bg-[#e63946]/10 group-hover:border-[#e63946]/30 transition-all">
                <Search className="w-7 h-7 text-[#e63946]" />
              </div>
              <h3 className="text-xl font-bold mb-3">🔍 Search</h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xs">
                Enter your location and dates to find the perfect car nearby.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center relative z-10 group">
              <div className="w-14 h-14 rounded-full bg-[#e63946] text-white flex items-center justify-center font-extrabold text-lg shadow-lg shadow-[#e63946]/30 mb-6 border-4 border-[#1a1a2e] group-hover:scale-110 transition-all duration-300">
                2
              </div>
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:bg-[#e63946]/10 group-hover:border-[#e63946]/30 transition-all">
                <Calendar className="w-7 h-7 text-[#e63946]" />
              </div>
              <h3 className="text-xl font-bold mb-3">📅 Book</h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xs">
                Book instantly or request — most hosts respond in under an hour.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center relative z-10 group">
              <div className="w-14 h-14 rounded-full bg-[#e63946] text-white flex items-center justify-center font-extrabold text-lg shadow-lg shadow-[#e63946]/30 mb-6 border-4 border-[#1a1a2e] group-hover:scale-110 transition-all duration-300">
                3
              </div>
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:bg-[#e63946]/10 group-hover:border-[#e63946]/30 transition-all">
                <Car className="w-7 h-7 text-[#e63946]" />
              </div>
              <h3 className="text-xl font-bold mb-3">🚗 Drive</h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-xs">
                Get the keys and hit the road. Return when done, easy as that.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* POPULAR DESTINATIONS */}
      <section id="popular-destinations" className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 scroll-reveal">
            <div>
              <span className="text-xs font-bold text-[#e63946] uppercase tracking-widest block mb-2">Getaways</span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
                Top Rental Cities
              </h2>
              <p className="text-slate-500 font-medium text-sm md:text-base mt-2">
                Explore popular destinations and hot vacation spots.
              </p>
            </div>
            
            <div className="flex gap-2 mt-4 md:mt-0">
              <span className="text-xs text-slate-400 font-medium italic">Swipe to browse all cities →</span>
            </div>
          </div>

          {/* Cities horizontal scroll */}
          <div className="flex gap-6 overflow-x-auto pb-4 scroll-smooth no-scrollbar snap-x snap-mandatory">
            {[
              { name: "Miami", image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=600&q=80" },
              { name: "Las Vegas", image: "https://images.unsplash.com/photo-1522083165195-342750297f95?w=600&q=80" },
              { name: "Los Angeles", image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&q=80" },
              { name: "New York", image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80" },
              { name: "Paris", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80" },
              { name: "Dubai", image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80" }
            ].map((city, idx) => (
              <div 
                key={idx}
                onClick={() => {
                  setLocation(city.name);
                  alert(`Location set to: ${city.name}! Use the search form to check available rentals.`);
                  document.getElementById('hero-section')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-[200px] h-[260px] rounded-2xl relative overflow-hidden shrink-0 cursor-pointer group snap-start border border-slate-100 shadow-sm transition-all hover:shadow-lg hover:scale-[1.03]"
              >
                {/* City Background */}
                <img 
                  src={city.image} 
                  alt={city.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Dark Overlay Gradient (bottom 60%) */}
                <div className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />

                {/* City name & link */}
                <div className="absolute bottom-5 left-5 right-5 text-white flex flex-col">
                  <span className="font-extrabold text-lg tracking-tight mb-1">{city.name}</span>
                  <span className="text-[10px] text-[#ff6b6b] uppercase font-bold tracking-wider group-hover:underline flex items-center gap-0.5">
                    Explore <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section id="testimonials" className="py-24 px-6 md:px-12 bg-[#f8f9fa] border-t border-b border-slate-100">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16 scroll-reveal">
            <span className="text-xs font-bold text-[#e63946] uppercase tracking-widest block mb-2">Real Stories</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
              What renters are saying
            </h2>
            <p className="text-slate-500 text-sm md:text-base mt-2 max-w-sm mx-auto">
              Read transparent feedback left by genuine community members.
            </p>
          </div>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 scroll-reveal">
            {[
              {
                name: "Sarah M.",
                role: "Renter in Miami",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
                text: "Absolutely seamless from booking to return. The Tesla was spotless. 10x better than any traditional rental agency."
              },
              {
                name: "James K.",
                role: "Renter in Los Angeles",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80",
                text: "Found an incredible Porsche for my birthday weekend. Host was super responsive. Will never use Hertz again."
              },
              {
                name: "Amira L.",
                role: "Renter in Paris",
                avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80",
                text: "Rented an SUV for a road trip. Amazing experience, great price. The app made everything effortless."
              }
            ].map((review, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-8 border border-slate-100 shadow-xs flex flex-col justify-between"
              >
                <div>
                  {/* Star rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400 shrink-0" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-slate-600 font-medium italic text-sm md:text-base leading-relaxed mb-6">
                    "{review.text}"
                  </p>
                </div>

                {/* Reviewer info */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                  <img 
                    src={review.avatar} 
                    alt={review.name} 
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{review.name}</h4>
                    <span className="text-[11px] text-slate-400 font-semibold">{review.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* BECOME A HOST CTA SECTION */}
      <section id="become-host-section" className="w-full flex flex-col md:flex-row relative overflow-hidden min-h-[500px]">
        {/* Left Side: Dark Navy Background */}
        <div className="w-full md:w-1/2 bg-[#1a1a2e] text-white p-8 md:p-16 flex flex-col justify-center scroll-reveal">
          <span className="text-xs font-bold text-[#e63946] uppercase tracking-widest block mb-3">For Car Owners</span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 leading-tight font-sans">
            Earn up to $1,000/month sharing your car
          </h2>
          <p className="text-slate-300 font-light text-sm md:text-base leading-relaxed mb-8 max-w-lg">
            List your car in minutes, set your own rules, and start earning extra passive income with maximum peace of mind.
          </p>

          {/* Bullet Points */}
          <div className="flex flex-col gap-4 mb-8">
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#e63946]/10 text-[#e63946] flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span className="text-sm font-semibold text-slate-200">You control availability and pricing</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#e63946]/10 text-[#e63946] flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span className="text-sm font-semibold text-slate-200">Insurance & protection included</span>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full bg-[#e63946]/10 text-[#e63946] flex items-center justify-center shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span className="text-sm font-semibold text-slate-200">Get paid fast via direct deposit</span>
            </div>
          </div>

          {/* List Your Car Button */}
          <button 
            id="list-car-cta-btn"
            onClick={() => setHostSuccessModal(true)}
            className="self-start bg-[#e63946] hover:bg-[#d62828] text-white font-bold text-sm px-8 py-4 rounded-full shadow-lg shadow-[#e63946]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2 group"
          >
            <span>List Your Car</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Right Side: Key handing visual */}
        <div className="w-full md:w-1/2 min-h-[300px] md:min-h-[500px] relative">
          <img 
            src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80" 
            alt="Car key handoff to renter" 
            className="w-full h-full object-cover"
          />
          {/* subtle tint */}
          <div className="absolute inset-0 bg-slate-900/10 pointer-events-none" />
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer id="footer-section" className="bg-[#0d0d1a] text-slate-300 pt-20 pb-12 px-6 md:px-12 relative overflow-hidden border-t border-white/5">
        
        {/* Top footer area */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/5">
          
          {/* Brand block */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <a href="#" className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-[#e63946] text-white">
                <Car className="w-6 h-6" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Drive<span className="text-[#e63946]">Now</span>
              </span>
            </a>
            <p className="text-slate-400 font-medium text-sm leading-relaxed max-w-xs mt-2">
              The world's largest car sharing marketplace. Empowering travelers and local hosts globally.
            </p>
          </div>

          {/* Links Column 1 */}
          <div className="md:col-span-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">DriveNow</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Team</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="md:col-span-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Explore</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Trust & Safety</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gift Cards</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Weddings</a></li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div className="md:col-span-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Hosting</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">List Your Car</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Insurance</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Host Tools</a></li>
              <li><a href="#" className="hover:text-white transition-colors">All-Star Hosts</a></li>
            </ul>
          </div>

          {/* Links Column 4 */}
          <div className="md:col-span-2">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-4">Support</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Copyright label */}
          <span className="text-slate-500 text-xs font-semibold">
            ©2026 DriveNow, Inc. All rights reserved.
          </span>

          {/* App Store Badge elements simulated with custom CSS & look */}
          <div className="flex gap-4">
            <button 
              onClick={() => alert("DriveNow App Store package loaded! App download mock initialized.")}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white border border-white/10 rounded-xl py-2 px-4 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              {/* Apple icon or design badge representation */}
              <div className="flex flex-col text-left">
                <span className="text-[9px] uppercase text-slate-400 font-bold tracking-wider leading-none">Download on the</span>
                <span className="text-xs font-extrabold tracking-tight">App Store</span>
              </div>
            </button>
            <button 
              onClick={() => alert("DriveNow Google Play package loaded! Play Store download mock initialized.")}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white border border-white/10 rounded-xl py-2 px-4 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <div className="flex flex-col text-left">
                <span className="text-[9px] uppercase text-slate-400 font-bold tracking-wider leading-none">Get it on</span>
                <span className="text-xs font-extrabold tracking-tight">Google Play</span>
              </div>
            </button>
          </div>

          {/* Social Icons (SVG standard white and red hover) */}
          <div className="flex items-center gap-4">
            {['Facebook', 'Instagram', 'TikTok', 'YouTube'].map((social) => (
              <button
                key={social}
                onClick={() => alert(`Connect with DriveNow on ${social}!`)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#e63946] text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer text-xs font-bold"
                title={`Follow us on ${social}`}
              >
                {social[0]}
              </button>
            ))}
          </div>

        </div>
      </footer>

      {/* BOOKING MODAL */}
      {bookingCar && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl relative overflow-hidden animate-fade-in border border-slate-100 flex flex-col">
            
            {/* Header image backdrop */}
            <div className="relative h-44 bg-slate-100">
              <img src={bookingCar.image} alt={bookingCar.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <button 
                onClick={() => setBookingCar(null)}
                className="absolute top-4 right-4 w-8 h-8 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="absolute bottom-4 left-5 text-white">
                <span className="text-xs font-extrabold uppercase tracking-widest bg-[#e63946] text-white px-2 py-0.5 rounded-md inline-block mb-1">
                  {bookingCar.badge}
                </span>
                <h3 className="text-xl font-extrabold leading-none">{bookingCar.name} ({bookingCar.year})</h3>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-6">
              
              <div className="flex items-center gap-4 py-3 border-b border-slate-100 mb-4">
                <img src={bookingCar.hostAvatar} alt="Host" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <h4 className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Your Host</h4>
                  <p className="text-sm font-bold text-slate-900">{bookingCar.hostName} (All-Star Host)</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Rating</label>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="text-sm font-extrabold text-slate-900">{bookingCar.rating}</span>
                    <span className="text-xs text-slate-400">({bookingCar.reviewsCount} reviews)</span>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Location</label>
                  <span className="text-sm font-bold text-slate-900 flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#e63946]" /> {bookingCar.location}</span>
                </div>
              </div>

              {/* Price Calculation breakdown */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-6 text-sm">
                <div className="flex justify-between font-semibold text-slate-700 mb-2">
                  <span>Daily Rate:</span>
                  <span>${bookingCar.price}</span>
                </div>
                <div className="flex justify-between font-semibold text-slate-700 mb-2">
                  <span>Duration:</span>
                  <span>3 Days</span>
                </div>
                <div className="flex justify-between font-semibold text-slate-700 mb-2">
                  <span>Trip Fee:</span>
                  <span>$15</span>
                </div>
                <div className="h-[1px] bg-slate-200 w-full my-2" />
                <div className="flex justify-between text-slate-900 font-extrabold text-base">
                  <span>Total (Est.):</span>
                  <span className="text-[#e63946]">${bookingCar.price * 3 + 15}</span>
                </div>
              </div>

              {/* Confirm Booking CTA */}
              <button 
                onClick={() => {
                  alert(`Congratulations! You have booked the ${bookingCar.name} successfully! Check your email for pickup instructions.`);
                  setBookingCar(null);
                }}
                className="w-full bg-[#e63946] hover:bg-[#d62828] text-white font-extrabold py-3.5 rounded-2xl shadow-lg shadow-[#e63946]/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                Confirm Booking & Pay
              </button>
            </div>

          </div>
        </div>
      )}

      {/* BECOME HOST SUCCESS MODAL */}
      {hostSuccessModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden p-8 border border-slate-100 animate-fade-in text-center flex flex-col items-center">
            
            <div className="w-16 h-16 bg-[#e63946]/10 text-[#e63946] rounded-full flex items-center justify-center mb-6">
              <Award className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Start Sharing Your Car</h3>
            <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6">
              You're only a few fields away from earning up to $1,000 extra income every month. Let's list your vehicle!
            </p>

            <form onSubmit={(e) => {
              e.preventDefault();
              alert("Congratulations! Your vehicle application has been successfully submitted. Our team will review your photos and listing description within 24 hours.");
              setHostSuccessModal(false);
            }} className="w-full flex flex-col gap-4 text-left">
              <div>
                <label htmlFor="host-car-make" className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Car Make & Model</label>
                <input id="host-car-make" type="text" placeholder="e.g. Tesla Model 3" required className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#e63946]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="host-car-year" className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Year</label>
                  <input id="host-car-year" type="number" placeholder="2023" required className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#e63946]" />
                </div>
                <div>
                  <label htmlFor="host-car-rate" className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Target Daily Price ($)</label>
                  <input id="host-car-rate" type="number" placeholder="85" required className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#e63946]" />
                </div>
              </div>
              
              <div className="flex gap-3 mt-4">
                <button 
                  type="button" 
                  onClick={() => setHostSuccessModal(false)}
                  className="w-1/2 py-3 border border-slate-200 rounded-xl font-bold text-sm text-slate-500 hover:bg-slate-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="w-1/2 py-3 bg-[#e63946] text-white rounded-xl font-bold text-sm hover:bg-[#d62828] cursor-pointer shadow-md shadow-[#e63946]/10"
                >
                  Submit Listing
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* AUTH MODAL */}
      {authModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl relative overflow-hidden p-8 border border-slate-100 animate-fade-in text-center flex flex-col items-center">
            
            <button 
              onClick={() => setAuthModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-12 h-12 bg-[#e63946]/10 text-[#e63946] rounded-full flex items-center justify-center mb-6">
              <User className="w-6 h-6" />
            </div>

            <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
              {authModal === 'login' ? 'Welcome Back' : 'Create Your Account'}
            </h3>
            <p className="text-slate-500 font-medium text-xs leading-relaxed mb-6">
              {authModal === 'login' 
                ? 'Sign in to access your saved trips, favorites, and bookings.' 
                : 'Join our sharing community today to unlock premium rates and free insurance.'}
            </p>

            <form onSubmit={(e) => {
              e.preventDefault();
              alert('Success! You have logged in successfully as "saiffizakaria56@gmail.com"!');
              setAuthModal(null);
            }} className="w-full flex flex-col gap-4 text-left">
              <div>
                <label htmlFor="auth-email" className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Email Address</label>
                <input 
                  id="auth-email"
                  type="email" 
                  defaultValue="saiffizakaria56@gmail.com"
                  required 
                  className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#e63946]" 
                />
              </div>
              <div>
                <label htmlFor="auth-password" className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Password</label>
                <input 
                  id="auth-password"
                  type="password" 
                  placeholder="••••••••" 
                  required 
                  className="w-full px-4 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-sm focus:outline-hidden focus:border-[#e63946]" 
                />
              </div>
              
              <button 
                type="submit"
                className="w-full py-3 bg-slate-950 hover:bg-[#e63946] text-white rounded-xl font-bold text-sm transition-all mt-4 cursor-pointer"
              >
                {authModal === 'login' ? 'Sign In' : 'Agree & Create Account'}
              </button>

              <div className="mt-4 text-center">
                <button 
                  type="button"
                  onClick={() => setAuthModal(authModal === 'login' ? 'signup' : 'login')}
                  className="text-xs text-[#e63946] font-bold hover:underline"
                >
                  {authModal === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Log in'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
