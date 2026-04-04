'use client';

import Link from 'next/link';
import { Phone, Play, ArrowRight, Star, ChevronDown, Send, ChevronLeft, ChevronRight, Shield, Zap, Headphones, CheckCircle } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import BlogCard from '@/components/BlogCard';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Define all your data locally
  const features = [
    {
      icon: '⚙️',
      title: 'Certified Expertise',
      description: 'Our team of certified professionals provides expert hardware and software repairs, delivering top-tier solutions for every tech problem.'
    },
    {
      icon: '💬',
      title: 'Instant Support & Live Chat',
      description: 'Get expert assistance anytime, anywhere with our round-the-clock remote IT support, ensuring minimal downtime for your business.'
    },
    {
      icon: '🔒',
      title: 'Security & Virus Protection',
      description: 'Protect your systems with advanced security solutions, including virus removal, malware protection, and proactive threat monitoring.'
    }
  ];

  const services = [
    {
      icon: 'cpu',
      title: 'Hardware repair & upgrade',
      description: 'Efficiently resolve IT issues, ensure system uptime, provide proactive maintenance, and secure data.'
    },
    {
      icon: 'layers',
      title: 'Software troubleshooting',
      description: 'We install software settings correctly to meet your first time, ensuring compatibility with other applications.'
    },
    {
      icon: 'network',
      title: 'Network configuration',
      description: 'OS Network Setup and Maintenance ensures efficient, secure network configuration, and ongoing.'
    },
    {
      icon: 'cloud',
      title: 'Cloud Services',
      description: 'Scalable, Secure, and Tailored Cloud Solutions to Elevate Your Business Efficiency and Data Accessibility.'
    },
    {
      icon: 'database',
      title: 'Data Recovery',
      description: 'Expert Data Recovery Services to Restore Your Critical Files Quickly, Safely, and Efficiently—Because Every Byte.'
    },
    {
      icon: 'laptop',
      title: 'Laptop Repair',
      description: 'Expert Laptop Repair Services to Address Hardware and Software Issues for Reliable Performance and Smooth Functionality.'
    }
  ];

  const blogPosts = [
    {
      image: 'https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Computer & Repair',
      title: 'Top 5 Computer Problems You\'ll Encounter and How to Avoid Them: Prevention Guide'
    },
    {
      image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Computer & Repair',
      title: 'Boost PC Performance Today with FixoPro\'s 5 Easy Optimization and Care Tips'
    },
    {
      image: 'https://images.pexels.com/photos/3868613/pexels-photo-3868613.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Tips & Tricks',
      title: 'FixoPro Trusted IT Partner Delivering Reliability & Excellence for Your Business'
    },
    {
      image: 'https://images.pexels.com/photos/7640443/pexels-photo-7640443.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Data Recovery',
      title: 'How FixoPro Recovers Data from Crashed or Corrupted Devices Quickly and Securely'
    }
  ];

  const faqs = [
    {
      question: 'What services does FixoPro offer?',
      answer: 'FixoPro provides comprehensive IT solutions, including computer repair, virus removal, data recovery, hardware upgrades, network setup, and more tailored to your needs.'
    },
    {
      question: 'How quickly can FixoPro repair my device?',
      answer: 'Most repairs are completed within 24-48 hours. Complex issues may take longer, but we always provide an estimated timeline upfront.'
    },
    {
      question: 'Can FixoPro help with data recovery?',
      answer: 'Yes, we specialize in data recovery from damaged, corrupted, or failed storage devices with high success rates.'
    },
    {
      question: 'Does FixoPro offer any warranty on repairs?',
      answer: 'Yes, all our repairs come with a warranty. The duration depends on the type of service provided.'
    }
  ];

  // Slides data
  const slides = [
    {
      tag: "FIXOPRO: IT Service Center",
      title: "Reliable IT Support & Computer Repair Services.",
      description: "Our experienced Seattle technicians expertly handle all hardware and software repairs, ensuring fast, reliable solutions for your tech issues.",
      bgImage: "https://res.cloudinary.com/djpfw1goz/image/upload/v1765431283/image_5_boxc0m.jpg"
    },
    {
      tag: "FIXOPRO: Technical Experts",
      title: "Fast & Trusted Laptop Repair Services.",
      description: "Quick diagnostics, motherboard repair, and system optimization—done by certified technicians.",
      bgImage: "https://res.cloudinary.com/djpfw1goz/image/upload/v1765431282/image_4_ysixlc.jpg"
    },
    {
      tag: "FIXOPRO: Network Solutions",
      title: "Professional Network Setup & IT Infrastructure.",
      description: "We design, install, and maintain secure and reliable networks for businesses and homes.",
      bgImage: "https://res.cloudinary.com/djpfw1goz/image/upload/v1765431282/image_1_f9pzvu.jpg"
    },
    {
      tag: "FIXOPRO: Data Recovery",
      title: "Secure Data Recovery & Protection Services.",
      description: "Expert data recovery from damaged devices with high success rates and complete confidentiality.",
      bgImage: "https://res.cloudinary.com/djpfw1goz/image/upload/v1765431282/image_2_es9dm3.jpg"
    }
  ];


  const products = [
  {
    id: 1,
    name: "WiFi Router",
    slug: "wifi-router",
    price: "$199",
    image: "/images/router.png"
  },
  {
    id: 2,
    name: "Network Switch",
    slug: "network-switch",
    price: "$299",
    image: "/images/switch.png"
  },
  {
    id: 3,
    name: "Firewall",
    slug: "firewall",
    price: "$899",
    image: "/images/firewall.png"
  },
  {
    id: 4,
    name: "IP Phones",
    slug: "ip-phones",
    price: "$149",
    image: "/images/ip-phone.png"
  },
  {
    id: 5,
    name: "GSM Gateway",
    slug: "gsm-gateway",
    price: "$399",
    image: "/images/gsm.png"
  },
  {
    id: 6,
    name: "FXS Gateway",
    slug: "fxs-gateway",
    price: "$249",
    image: "/images/fxs.png"
  }
];

  // NetPro Features data
  const netProFeatures = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Enterprise Security",
      description: "Military-grade security solutions to protect your network infrastructure"
    },
    {
      icon: <Zap className="w-8 h-8 text-blue-600" />,
      title: "High Performance",
      description: "Lightning-fast networking equipment for optimal business productivity"
    },
    {
      icon: <Headphones className="w-8 h-8 text-blue-600" />,
      title: "24/7 Support",
      description: "Round-the-clock expert technical assistance whenever you need it"
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-blue-600" />,
      title: "Quality Assured",
      description: "Certified products from the world's most trusted brands"
    }
  ];

  // NetPro Products data
  const netProProducts = [
    {
      name: "WiFi Router",
      description: "High performance wireless router with dual band connectivity, delivering fast and reliable internet...",
      price: "$199",
      image: "https://images.pexels.com/photos/276977/pexels-photo-276977.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Network Switch",
      description: "Managed and unmanaged network switches with multiple ports for efficient data distribution across...",
      price: "$299",
      image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Firewall",
      description: "Enterprise-grade firewall solutions providing robust network security, threat prevention, and traffic...",
      price: "$899",
      image: "https://images.pexels.com/photos/5380792/pexels-photo-5380792.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "IP Phones",
      description: "Professional VoIP phones with HD voice quality, perfect for modern office communication systems.",
      price: "$149",
      image: "https://images.pexels.com/photos/373076/pexels-photo-373076.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "GSM Gateway",
      description: "GSM VoIP gateway for connecting mobile networks to your VoIP system, enabling cost effective...",
      price: "$399",
      image: "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "FXS Gateway",
      description: "FXS analog gateway to connect traditional analog phones and fax machines to your IP based phone...",
      price: "$249",
      image: "https://images.pexels.com/photos/2582938/pexels-photo-2582938.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  // Professional Services data
  const professionalServices = [
    {
      title: "Internet Service Provider",
      description: "High-speed fiber optic and broadband internet connectivity for homes and businesses with reliable 24/7 support.",
      features: ["Fiber optic connections", "Multiple speed tiers", "Unlimited data plans"],
      image: "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      title: "Onsite Camera Installation",
      description: "Professional CCTV camera installation services with optimal placement, configuration, and testing.",
      features: ["Site survey and planning", "Professional mounting", "Cable management"],
      image: "https://images.pexels.com/photos/247999/pexels-photo-247999.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      title: "Onsite Server Installation",
      description: "Expert server installation and configuration services ensuring optimal performance and security.",
      features: ["Hardware installation", "OS and software setup", "Network configuration"],
      image: "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "John Smith",
      role: "CTO, Tech Corp",
      content: "NetPro transformed our entire network infrastructure. Their expertise and support are unmatched!",
      rating: 5
    },
    {
      name: "Sarah Johnson",
      role: "IT Manager, Global Inc",
      content: "Outstanding service and top-quality products. The installation team was professional and efficient.",
      rating: 4
    },
    {
      name: "Michael Chen",
      role: "CEO, StartUp Hub",
      content: "Best investment we made for our company. The network performance improvement is incredible!",
      rating: 5
    }
  ];

  const reviewCards = [
    {
      name: "Michael Chen",
      role: "Operations Manager",
      review: "Outstanding service! They recovered critical data we thought was lost forever.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=48&h=48&q=80"
    },
    {
      name: "Emily Rodriguez",
      role: "Small Business Owner",
      review: "Reliable IT support that actually understands our business needs. Highly recommend!",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=48&h=48&q=80"
    }
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Hero Section with Slider */}
      <section className="relative h-[115vh] overflow-hidden">
        {/* Background Slides */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4)), url(${slide.bgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />
        ))}

        {/* Content Overlay */}
        <div className="relative h-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="text-white max-w-6xl">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-blue-600 rounded-full text-sm font-medium mb-4">
                {slides[currentSlide].tag}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              {slides[currentSlide].title}
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl">
              {slides[currentSlide].description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-amber-400 hover:bg-amber-500 text-black font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105">
                BOOK A CALL NOW
              </button>
              <button className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300">
                OUR SERVICES
              </button>
            </div>

            {/* Slider Controls */}
            <div className="absolute bottom-8 right-8 flex items-center gap-4">
              <button
                onClick={prevSlide}
                className="p-3 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-all duration-300"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>
              
              <div className="flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide ? 'bg-amber-400 w-8' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextSlide}
                className="p-3 bg-white/20 hover:bg-white/30 rounded-full backdrop-blur-sm transition-all duration-300"
              >
                <ChevronRight className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* NetPro Why Choose Us Section */}
    <section className="py-20 bg-gray-50">
  <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">

    {/* Header */}
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        Why Choose NetPro?
      </h2>
      <p className="text-xl text-gray-600">
        Industry-leading solutions backed by years of expertise
      </p>
    </div>

    {/* Bento Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[260px]">

      {/* Large Left Card */}
      <div className="md:col-span-2 row-span-2 bg-white rounded-3xl p-10 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Enterprise Security
          </h3>
          <p className="text-gray-600 text-lg">
            Military-grade security solutions to protect your network infrastructure.
          </p>
        </div>

        <div className="text-6xl text-blue-600 opacity-20">
          🔒
        </div>
      </div>

      {/* Small Top Right */}
      <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col justify-between">
        <div>
          <h4 className="text-xl font-bold text-gray-900 mb-2">
            High Performance
          </h4>
          <p className="text-gray-600 text-sm">
            Lightning-fast networking equipment for optimal business productivity.
          </p>
        </div>
        <div className="text-4xl text-blue-600 opacity-20 self-end">
          ⚡
        </div>
      </div>

      {/* Small Middle Right */}
      <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col justify-between">
        <div>
          <h4 className="text-xl font-bold text-gray-900 mb-2">
            24/7 Support
          </h4>
          <p className="text-gray-600 text-sm">
            Round-the-clock expert technical assistance whenever you need it.
          </p>
        </div>
        <div className="text-4xl text-blue-600 opacity-20 self-end">
          🕒
        </div>
      </div>

      {/* Bottom Full Width Card */}
      <div className="md:col-span-3 bg-white rounded-3xl p-8 shadow-sm flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">
            Quality Assured
          </h3>
          <p className="text-gray-600 mt-2">
            Certified products from the world's most trusted brands.
          </p>
        </div>

        <div className="text-5xl text-blue-600 opacity-20">
          ✅
        </div>
      </div>

    </div>
  </div>
</section>


<section className="py-24 bg-gray-100">
  <div className="max-w-full mx-auto px-6">

    {/* Header */}
    <div className="text-center mb-16">
      <h2 className="text-5xl font-bold text-gray-900 mb-4">
        Our Networking Solutions
      </h2>
      <p className="text-xl text-gray-600">
        Powerful. Secure. Enterprise Ready.
      </p>
    </div>

    {/* Product Showcase Layout */}
    <div className="relative bg-white rounded-3xl p-12 shadow-xl overflow-hidden">

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-end">

        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="group relative flex flex-col items-center"
          >

            {/* Product Image */}
            <div className="relative w-full h-48 flex items-end justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-44 object-contain transition-transform duration-500 group-hover:scale-110"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center rounded-xl">
                <span className="text-white font-semibold text-sm">
                  Learn More →
                </span>
              </div>
            </div>

            {/* Product Name */}
            <div className="mt-4 text-center">
              <h3 className="font-semibold text-gray-900">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Starting at {product.price}
              </p>
            </div>

          </Link>
        ))}

      </div>
    </div>
  </div>
</section>

      {/* Professional Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Professional Services</h2>
            <p className="text-xl text-gray-600">Expert installation and support for your networking needs</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {professionalServices.map((service, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-gray-600">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="#" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors inline-flex items-center">
                    Learn More <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="#" className="text-blue-600 font-semibold hover:text-blue-700 transition-colors inline-flex items-center">
              View All Services <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Trusted by businesses worldwide</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Ready to Upgrade Your Network?</h2>
          <p className="text-xl text-blue-100 mb-8">Get a free consultation and personalized quote from our experts today</p>
          <button className="bg-amber-400 hover:bg-amber-500 text-black font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105">
            GET A FREE CONSULTATION
          </button>
        </div>
      </section>

      {/* Video and Cards Section */}
      <section className="py-20 bg-white">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Left Video Section */}
            <div className="lg:col-span-2">
              <div className="relative rounded-2xl overflow-hidden">
                <div className="aspect-video">
                  <img
                    src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="IT Support Team"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <button className="flex items-center gap-3 bg-amber-400 hover:bg-amber-500 text-black font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:scale-105">
                    <Play className="w-5 h-5 fill-current" />
                    Watch Our Story
                  </button>
                </div>
                <div className="absolute top-8 right-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                    <div className="text-white text-center">
                      <div className="text-3xl font-bold">24/7</div>
                      <div className="text-sm">Support Available</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Stats below video */}
              <div className="grid grid-cols-3 gap-6 mt-8">
                <div className="text-center p-6 bg-blue-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600">5,000+</div>
                  <div className="text-gray-600 mt-2">Devices Repaired</div>
                </div>
                <div className="text-center p-6 bg-amber-50 rounded-xl">
                  <div className="text-3xl font-bold text-amber-600">98%</div>
                  <div className="text-gray-600 mt-2">Satisfaction Rate</div>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-xl">
                  <div className="text-3xl font-bold text-green-600">24h</div>
                  <div className="text-gray-600 mt-2">Average Response</div>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-6 mt-8">
                <div className="text-center p-6 bg-blue-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600">1 Year</div>
                  <div className="text-gray-600 mt-2">Warranty on Repairs</div>
                </div>
                <div className="text-center p-6 bg-amber-50 rounded-xl">
                  <div className="text-3xl font-bold text-amber-600">4.9/5</div>
                  <div className="text-gray-600 mt-2">Customer Rating</div>
                </div>
                <div className="text-center p-6 bg-green-50 rounded-xl">
                  <div className="text-3xl font-bold text-green-600">Same Day</div>
                  <div className="text-gray-600 mt-2">Service Available</div>
                </div>
              </div>
            </div>

            {/* Right Stacked Cards */}
            <div className="lg:col-span-1 space-y-6 relative">
              <div className="sticky top-24 space-y-6">
                {/* Customer reviews header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-2xl">
                  <h3 className="text-2xl font-bold mb-4">What Our Clients Say</h3>
                  <div className="flex items-center">
                    <div className="flex -space-x-3">
                      {["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=48&q=80",
                        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=48&q=80",
                        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=48&q=80"
                      ].map((src, idx) => (
                        <img
                          key={idx}
                          src={src}
                          alt="Client"
                          className="w-10 h-10 rounded-full border-2 border-white"
                        />
                      ))}
                    </div>
                    <div className="ml-4">
                      <div className="text-2xl font-bold">18k+</div>
                      <div className="text-blue-100 text-sm">Satisfied Customers</div>
                    </div>
                  </div>
                </div>

                {/* Stacked Review Cards */}
                <div className="space-y-6">
                  {reviewCards.map((card, index) => (
                    <div
                      key={index}
                      className={`bg-white p-6 rounded-xl shadow-lg border border-gray-100 transform transition-all duration-300 hover:scale-[1.02] ${
                        index === 0 ? 'relative z-30' :
                        index === 1 ? 'relative z-20 -mt-2' :
                        'relative z-10 -mt-4'
                      }`}
                      style={{
                        transform: index === 1 ? 'translateY(-8px)' : 
                                 index === 2 ? 'translateY(-16px)' : 'none'
                      }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={card.avatar}
                            alt={card.name}
                            className="w-12 h-12 rounded-full"
                          />
                          <div>
                            <div className="font-bold text-gray-900">{card.name}</div>
                            <div className="text-sm text-gray-600">{card.role}</div>
                          </div>
                        </div>
                        <div className="flex">
                          {[...Array(card.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600 italic">"{card.review}"</p>
                    </div>
                  ))}
                </div>

                {/* Call to Action Card */}
                <div className="bg-gradient-to-r from-amber-400 to-amber-500 p-6 rounded-2xl text-center">
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Need Immediate Help?</h4>
                  <p className="text-gray-800 mb-4">Our experts are available 24/7</p>
                  <button className="w-full bg-gray-900 hover:bg-black text-white font-semibold py-3 rounded-lg transition-all duration-300">
                    <Phone className="w-4 h-4 inline-block mr-2" />
                    Call Now: (555) 123-4567
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* About Section */}
      <section className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/7991490/pexels-photo-7991490.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Repair Services"
              className="rounded-lg w-full h-auto"
            />
          </div>
          <div>
            <div className="inline-block mb-4">
              <span className="text-sm font-medium text-blue-600">About us</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Repair & Upgrade.<br />
              Software Solution.<br />
              Network Configuration.
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              At FixoPro, we offer dependable IT support and computer repair services tailored to your needs. Our certified team, with extensive experience, expertly handles everything from troubleshooting and data recovery to comprehensive cybersecurity, ensuring your systems remain secure and efficiently operational.
            </p>
            <Link href="#" className="text-blue-600 font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all">
              Learn More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Strategic IT Support Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-4">
            <span className="text-sm font-medium text-[#2D5BFF]">Our Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-4">
            Strategic IT Support for Your<br />
            Business Growth
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            From immediate IT assistance to comprehensive computer repairs, we handle it all to keep your systems smooth, secure, and up-to-date.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>

          <div className="text-center">
            <button className="bg-[#2D5BFF] hover:bg-[#2348CC] text-white font-semibold px-8 py-3 rounded-lg transition-colors">
              Load More Service
            </button>
          </div>
        </div>
      </section>

    

      {/* Blog Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <div className="inline-block mb-2">
                <span className="text-sm font-medium text-[#2D5BFF]">News & Tips • Tech Guide</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                Tech Talk: Tips, Tricks,<br />
                and Trends
              </h2>
            </div>
            <Link href="#" className="text-[#2D5BFF] font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all">
              See All Blog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {blogPosts.map((post, index) => (
              <BlogCard key={index} {...post} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/5483077/pexels-photo-5483077.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Contact"
              className="rounded-lg w-full h-auto"
            />
          </div>
          <div className="bg-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Fill the contact form</h3>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full name"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D5BFF] focus:border-transparent"
              />
              <input
                type="email"
                placeholder="Email address"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D5BFF] focus:border-transparent"
              />
              <input
                type="tel"
                placeholder="Phone number"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D5BFF] focus:border-transparent"
              />
              <textarea
                placeholder="Type your message here"
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D5BFF] focus:border-transparent resize-none"
              />
              <button
                type="submit"
                className="bg-[#2D5BFF] hover:bg-[#2348CC] text-white font-semibold px-8 py-3 rounded-lg transition-colors"
              >
                Book A Call
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-block mb-4">
            <span className="text-sm font-medium text-[#2D5BFF]">FAQ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12">
            Have Questions? We're Here to Help!
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-500 transition-transform ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-[#0A0E27] text-white py-16">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-[#2D5BFF]">Fixopro</div>
              <div>
                <h3 className="text-xl font-bold mb-1">Join our newsletter</h3>
                <p className="text-gray-400 text-sm">Subscribe now for exciting offers and news!</p>
              </div>
            </div>
            <div className="w-full md:w-auto">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Email address"
                  className="flex-1 md:w-80 px-4 py-3 bg-[#1a1f3a] border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2D5BFF] text-white placeholder-gray-500"
                />
                <button className="bg-[#2D5BFF] hover:bg-[#2348CC] text-white p-3 rounded-lg transition-colors">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}