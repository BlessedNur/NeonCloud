import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  const testimonials = [
    {
      content: "Host.ly has revolutionized our hosting experience. The performance boost and reliability have directly contributed to our 40% increase in user engagement.",
      author: "Sarah Johnson",
      role: "CEO, TechStart",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop",
      gradient: "from-purple-600/20 via-purple-400/10 to-blue-600/20"
    },
    {
      content: "Moving to Host.ly was the best decision for our e-commerce platform. The loading speeds are incredible, and the support team is always there when we need them.",
      author: "Michael Lee",
      role: "CTO, WebSolutions",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&h=150&auto=format&fit=crop",
      gradient: "from-blue-600/20 via-purple-400/10 to-purple-600/20"
    },
    {
      content: "The advanced security features and automated backups give us peace of mind. Our development team can focus on innovation rather than infrastructure management.",
      author: "Emily Chen",
      role: "Marketing Director, GrowFast",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&h=150&auto=format&fit=crop",
      gradient: "from-indigo-600/20 via-purple-400/10 to-purple-600/20"
    },
    {
      content: "Host.ly's scalability features handled our Black Friday surge flawlessly. Zero downtime and consistent performance under heavy loads.",
      author: "David Brown",
      role: "Owner, E-commerce Solutions",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop",
      gradient: "from-purple-600/20 via-blue-400/10 to-indigo-600/20"
    },
    {
      content: "The migration process was seamless, and the performance improvement was immediate. Our site's load time decreased by 60%.",
      author: "Lisa Wong",
      role: "IT Manager, GlobalTech",
      rating: 5,
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=150&h=150&auto=format&fit=crop",
      gradient: "from-blue-600/20 via-purple-400/10 to-indigo-600/20"
    }
  ];

  const updateVisibleCards = useCallback(() => {
    if (window.innerWidth >= 1024) {
      setVisibleCards(3);
    } else if (window.innerWidth >= 768) {
      setVisibleCards(2);
    } else {
      setVisibleCards(1);
    }
  }, []);

  useEffect(() => {
    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, [updateVisibleCards]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex + 1) % (testimonials.length - visibleCards + 1)
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      (prevIndex - 1 + (testimonials.length - visibleCards + 1)) % 
      (testimonials.length - visibleCards + 1)
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [visibleCards]);

  return (
    <section className="relative py-12 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 relative">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
            Trusted by Many
          </h2>
          <p className="mt-4 text-gray-400">
            Join thousands of satisfied customers who trust Host.ly with their digital presence
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-2 md:px-4">
                <div className={`
                  relative h-full rounded-2xl p-6 md:p-8
                  bg-gradient-to-br from-gray-800/40 to-gray-900/40
                  backdrop-blur-xl border border-gray-700/50
                  hover:border-purple-500/50 transition-all duration-300
                  group
                `}>
                  {/* Animated Gradient Background */}
                  <div className={`
                    absolute inset-0 rounded-2xl opacity-10
                    bg-gradient-to-br ${testimonial.gradient}
                    group-hover:opacity-20 transition-opacity duration-300
                  `} />

                  {/* Content Container */}
                  <div className="relative z-10">
                    <Quote className="text-purple-500/20 w-8 h-8 md:w-12 md:h-12 absolute right-0 top-0" />
                    
                    {/* Profile Image */}
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="relative">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden ring-2 ring-purple-500/50 ring-offset-2 ring-offset-gray-900">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.author}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-gray-900" />
                      </div>
                      <div>
                        <p className="font-semibold text-white group-hover:text-purple-400 transition-colors">
                          {testimonial.author}
                        </p>
                        <p className="text-purple-400/80 text-sm">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    
                    <p className="text-gray-100 text-base md:text-lg mb-6 leading-relaxed min-h-[100px] md:min-h-[120px]">
                      "{testimonial.content}"
                    </p>

                    <div className="flex items-center justify-between mt-4 md:mt-8 border-t border-gray-700/50 pt-4">
                      <div className="flex space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star 
                            key={i} 
                            className="w-4 h-4 md:w-5 md:h-5 text-yellow-400 fill-yellow-400" 
                          />
                        ))}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs md:text-sm text-purple-400">Verified Customer</span>
                        <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-purple-500/20 flex items-center justify-center">
                          <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-purple-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-purple-700 p-2 md:p-3 rounded-full
              shadow-lg shadow-purple-900/50 text-white z-10 
              hover:from-purple-500 hover:to-purple-600 
              transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-gradient-to-r from-purple-600 to-purple-700 p-2 md:p-3 rounded-full
              shadow-lg shadow-purple-900/50 text-white z-10 
              hover:from-purple-500 hover:to-purple-600 
              transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center mt-6 md:mt-10 space-x-2">
          {[...Array(testimonials.length - visibleCards + 1)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`
                w-8 md:w-12 h-1 rounded-full transition-all duration-300
                ${index === currentIndex 
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500' 
                  : 'bg-gray-700 hover:bg-gray-600'}
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;