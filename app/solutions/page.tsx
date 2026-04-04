// app/solutions/page.tsx - Complete with Hover Interactions
'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight, Shield, Home, School, Building2, Hotel, Key, Users, Car, Heart, Building, Truck } from 'lucide-react';

export default function SolutionsPage() {
  const solutions = [
    {
      title: "Banking",
      description: "Secure your digital banking experience with integrated security solutions, ensuring top-tier security and customer authentication.",
      icon: <Shield className="w-5 h-5" />,
      color: "blue",
      image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Residential",
      description: "Enhance home security with cutting-edge surveillance technology, offering robust protection against security threats.",
      icon: <Home className="w-5 h-5" />,
      color: "green",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Education",
      description: "Complete security solutions for schools and educational institutions, creating safer environments for students and staff.",
      icon: <School className="w-5 h-5" />,
      color: "purple",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Corporate",
      description: "Specialized security solutions for corporate offices, protecting against espionage, theft, and unauthorized access.",
      icon: <Building2 className="w-5 h-5" />,
      color: "indigo",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Hospitality",
      description: "Advanced surveillance and access control for hotels and resorts, ensuring guest safety and property protection.",
      icon: <Hotel className="w-5 h-5" />,
      color: "amber",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Small & Large Businesses",
      description: "Scalable security solutions for businesses of all sizes, protecting assets and enhancing operational security.",
      icon: <Key className="w-5 h-5" />,
      color: "red",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Healthcare Sector",
      description: "Efficient security systems for healthcare facilities, ensuring safe access and monitoring of high-traffic areas.",
      icon: <Heart className="w-5 h-5" />,
      color: "teal",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Hotel, Resorts & Restaurants",
      description: "Comprehensive security solutions for hospitality venues, providing guest safety and asset protection.",
      icon: <Building className="w-5 h-5" />,
      color: "orange",
      image: "https://images.unsplash.com/photo-1564501049418-3c27787d01e8?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Real Estate",
      description: "360-degree perimeter surveillance solutions for real estate sites, protecting against theft and intrusions.",
      icon: "🏗️",
      color: "cyan",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Public Safety",
      description: "Public safety solutions enhancing risk management and enabling real-time community protection.",
      icon: <Users className="w-5 h-5" />,
      color: "blue",
      image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=400&q=80"
    },
    {
      title: "Transport",
      description: "Transport security solutions ensuring real-time tracking and unmatched security for transit systems.",
      icon: <Truck className="w-5 h-5" />,
      color: "green",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=400&q=80"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { bg: string, text: string, border: string } } = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
      green: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
      indigo: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
      amber: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
      red: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
      teal: { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' },
      orange: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
      cyan: { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200' }
    };
    return colorMap[color] || { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' };
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* UPDATED HERO SECTION - Full-width with Background Image */}
      <section className="relative bg-gray-900 text-white">
        {/* Background Image - Right-aligned */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80"
            alt="Security Solutions"
            className="w-full h-full object-cover object-right"
          />
          {/* Gradient Overlay - Dark on left for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 via-50% to-gray-900/20" />
        </div>

        {/* Content Container */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 min-h-[400px] flex items-center">
          <div className="max-w-xl">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center text-sm text-gray-300 mb-6">
              <Link 
                href="/" 
                className="hover:text-white transition-colors duration-200"
              >
                Home
              </Link>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-white font-medium">Solutions</span>
            </nav>

            {/* Page Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Solutions
            </h1>

            {/* Descriptive Text */}
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
              Our solution offers a rich portfolio of empowering and versatile security systems, 
              featuring advanced technology and innovative solutions to meet all your security needs.
            </p>
          </div>
        </div>
      </section>

      {/* Compact Solutions Section - WITH HOVER INTERACTIONS */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {solutions.map((solution, index) => {
              const colors = getColorClasses(solution.color);
              
              return (
                <div 
                  key={index} 
                  className={`
                    bg-white rounded-xl border ${colors.border} shadow-sm 
                    hover:shadow-lg transition-all duration-300 ease-out overflow-hidden
                    hover:scale-[1.02] hover:bg-blue-50 active:scale-100
                    group cursor-pointer
                  `}
                >
                  {/* Mobile Layout */}
                  <div className="lg:hidden">
                    {/* Image - Fixed height */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <img
                        src={solution.image}
                        alt={solution.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Accent Icon Block */}
                      <div className="absolute -bottom-4 left-6">
                        <div className={`
                          ${colors.bg} border ${colors.border} rounded-lg p-2 shadow-sm
                          group-hover:bg-blue-100 group-hover:border-blue-300 transition-colors duration-300
                        `}>
                          <div className={`${colors.text} group-hover:text-blue-700 transition-colors duration-300`}>
                            {solution.icon}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-5 pt-8">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-800 transition-colors duration-300">
                        {solution.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {solution.description}
                      </p>
                      <Link
                        href={`/solutions/${solution.title.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-')}`}
                        className={`
                          text-sm font-medium ${colors.text} 
                          group-hover:text-blue-700 group-hover:font-semibold
                          inline-flex items-center transition-all duration-300
                        `}
                      >
                        Learn More
                        <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden lg:flex items-center">
                    {/* Image Container - Fixed width and height */}
                    <div className="relative w-48 h-40 flex-shrink-0 overflow-hidden">
                      <img
                        src={solution.image}
                        alt={solution.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {/* Accent Icon Block */}
                      <div className="absolute -right-3 top-1/2 transform -translate-y-1/2 z-10">
                        <div className={`
                          ${colors.bg} border ${colors.border} rounded-lg p-2 shadow-sm
                          group-hover:bg-blue-100 group-hover:border-blue-300 transition-colors duration-300
                        `}>
                          <div className={`${colors.text} group-hover:text-blue-700 transition-colors duration-300`}>
                            {solution.icon}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content Container */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 pr-4">
                          <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-800 transition-colors duration-300">
                            {solution.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                            {solution.description}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <Link
                            href={`/solutions/${solution.title.toLowerCase().replace(/\s+&\s+/g, '-').replace(/\s+/g, '-')}`}
                            className={`
                              text-sm font-medium ${colors.text}
                              group-hover:text-blue-700 group-hover:font-semibold
                              inline-flex items-center whitespace-nowrap transition-all duration-300
                            `}
                          >
                            Learn More
                            <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Section Footer - Minimal */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="text-center">
              <p className="text-gray-600 mb-6">
                Can't find what you're looking for? Contact us for custom solutions.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
              >
                Contact Sales Team
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}