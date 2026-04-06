// app/solutions/page.tsx - Complete with Hover Interactions
'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contactsection from '@/components/Contact';
import Link from 'next/link';
import { ArrowRight, Shield, Home, School, Building2, Hotel, Key, Users, Car, Heart, Building, Truck, Contact } from 'lucide-react';

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
     <section className="py-24 bg-gray-100">
  <div className="max-w-9xl mx-auto px-6">

    {/* Header */}
    <div className="text-center mb-16">
      <h2 className="text-5xl font-bold text-gray-900 mb-4">
        Explore Our Solutions
      </h2>
      <p className="text-xl text-gray-600">
        Smart Security Across Every Industry
      </p>
    </div>

    {/* Image Map */}
    <div className="relative w-full h-[600px] md:h-[750px] lg:h-[900px] bg-white rounded-3xl shadow-xl overflow-hidden">

      {/* MAIN IMAGE (Your uploaded city image) */}
      <img
        src="https://res.cloudinary.com/djpfw1goz/image/upload/q_auto/f_auto/v1775376967/download_18_l5lebq.jpg"
        alt="Solutions Map"
        className="w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

      {/* 🏦 Banking */}
      <Link href="/solutions/banking">
        <button className="absolute top-[8%] left-[7%] bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-400 shadow-md">
          Banking →
        </button>
      </Link>

      {/* 🏠 Residential */}
      <Link href="/solutions/residential">
        <button className="absolute top-[85%] left-[10%] bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-400 shadow-md">
          Residential →
        </button>
      </Link>

      {/* 🎓 Education */}
      <Link href="/solutions/education">
        <button className="absolute top-[30%] left-[15%] bg-purple-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-400 shadow-md">
          Education →
        </button>
      </Link>

      {/* 🏢 Corporate */}
      <Link href="/solutions/corporate">
        <button className="absolute top-[15%] left-[47%] bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-400 shadow-md">
          Corporate →
        </button>
      </Link>

      {/* 🏨 Hospitality */}
      <Link href="/solutions/hospitality">
        <button className="absolute top-[45%] right-[7%] bg-amber-500 text-black px-4 py-2 rounded-lg text-sm hover:bg-amber-400 shadow-md">
          Hospitality →
        </button>
      </Link>

      {/* 🏗️ Real Estate */}
      <Link href="/solutions/real-estate">
        <button className="absolute top-[85%] right-[10%] bg-cyan-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-cyan-400 shadow-md">
          Real Estate →
        </button>
      </Link>

      {/* ❤️ Healthcare */}
      <Link href="/solutions/healthcare-sector">
        <button className="absolute top-[50%] left-[10%] bg-teal-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-teal-400 shadow-md">
          Healthcare →
        </button>
      </Link>

      {/* 🏪 Businesses */}
      <Link href="/solutions/small-large-businesses">
        <button className="absolute top-[70%] left-[45%] bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-400 shadow-md">
          Businesses →
        </button>
      </Link>

      {/* 🚓 Public Safety */}
      <Link href="/solutions/public-safety">
        <button className="absolute top-[40%] left-[70%] bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-500 shadow-md">
          Public Safety →
        </button>
      </Link>

      {/* 🚚 Transport */}
      <Link href="/solutions/transport">
        <button className="absolute top-[45%] right-[45%] bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-500 shadow-md">
          Transport →
        </button>
      </Link>

    </div>
  </div>
</section>
       <Contactsection />
      <Footer />
    </div>
  );
}