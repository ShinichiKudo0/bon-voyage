import React, { useState, useEffect } from 'react';
import { ChevronRight, MapPin, Calendar, Users, Sparkles, Globe, Plane, Camera } from 'lucide-react';

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const backgroundImages = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://w0.peakpx.com/wallpaper/312/355/HD-wallpaper-landscape-pretty-grass-woods-beautiful-clouds-splendor-green-flowers-beauty-reflection-forest-lovely-wild-flowers-view-colors-spring-sky-trees-lake-tree-water-mountains-peaceful.jpg',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  ];

  const features = [
    { icon: MapPin, text: "Personalized Routes" },
    { icon: Calendar, text: "Smart Scheduling" },
    { icon: Users, text: "Group Planning" },
    { icon: Sparkles, text: "AI Recommendations" }
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const FloatingElement = ({ children, delay = 0, className = "" }) => (
    <div 
      className={`animate-bounce ${className}`}
      style={{ 
        animationDelay: `${delay}s`,
        animationDuration: '3s'
      }}
    >
      {children}
    </div>
  );

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Dynamic Background Slider */}
      <div className="absolute inset-0">
        {backgroundImages.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-2000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              className="w-full h-full object-cover" 
              src={img} 
              alt={`Background ${index + 1}`}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
          </div>
        ))}
      </div>

      {/* Floating Elements */}
      <FloatingElement delay={0} className="absolute top-20 left-20 text-white/20">
        <Plane size={40} />
      </FloatingElement>
      <FloatingElement delay={1} className="absolute top-40 right-32 text-white/20">
        <Globe size={35} />
      </FloatingElement>
      <FloatingElement delay={2} className="absolute bottom-40 left-40 text-white/20">
        <Camera size={30} />
      </FloatingElement>
      <FloatingElement delay={1.5} className="absolute bottom-32 right-20 text-white/20">
        <MapPin size={45} />
      </FloatingElement>

      {/* Main Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 z-10">
        <div className={`transition-all duration-1500 ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'}`}>
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium">AI-Powered Travel Planning</span>
          </div>

          {/* Main Title */}
          <h1 className="font-black text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight mb-6">
            <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-600 bg-clip-text text-transparent">
              Discover
            </span>
            <br />
            <span className="text-white">Your Next</span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-teal-400 bg-clip-text text-transparent">
              Adventure
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-100 max-w-4xl leading-relaxed mb-8">
            Your personal AI travel curator creating 
            <span className="text-yellow-400 font-semibold"> custom itineraries </span>
            tailored to your interests, budget, and dreams.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 hover:bg-white/20 transition-all duration-300 cursor-pointer transform hover:scale-105"
              >
                <feature.icon className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-full font-bold text-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
              <span className="flex items-center gap-2">
                Start Planning Free
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-700 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity duration-300 -z-10"></div>
            </button>
            
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-full font-semibold text-lg hover:bg-white/20 hover:border-white/50 transition-all duration-300 transform hover:scale-105">
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 mt-12 text-center">
            <div className="animate-pulse">
              <div className="text-3xl font-bold text-yellow-400">10K+</div>
              <div className="text-sm text-gray-300">Trips Planned</div>
            </div>
            <div className="animate-pulse" style={{ animationDelay: '0.5s' }}>
              <div className="text-3xl font-bold text-blue-400">50+</div>
              <div className="text-sm text-gray-300">Countries</div>
            </div>
            <div className="animate-pulse" style={{ animationDelay: '1s' }}>
              <div className="text-3xl font-bold text-green-400">98%</div>
              <div className="text-sm text-gray-300">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {backgroundImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white scale-125' 
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 animate-bounce">
        <div className="flex flex-col items-center text-white/70">
          <span className="text-xs mb-2">Scroll Down</span>
          <ChevronRight className="w-4 h-4 rotate-90" />
        </div>
      </div>
    </div>
  );
}

export default Hero;