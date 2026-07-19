'use client';

import Link from 'next/link';
import { Phone, Play, ArrowRight, Star, ChevronDown, Send, ChevronLeft, ChevronRight, Shield, Zap, Headphones, CheckCircle } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import XiaomiStyleShowcase  from '@/components/ScrollVelocityImages';
import Footer from '@/components/Footer';
import ServiceCard from '@/components/ServiceCard';
import ProductSection from '@/components/product';
import ServicesSection from '@/components/ServicesSection';
import BlogCard from '@/components/BlogCard';
import Hyperspeed from '@/components/ui/hyper';
import Contact from '@/components/Contact';
import BlurText from "@/components/ui/BlurText";
import ProductHero from '@/components/ProductHero';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
const [currentSlide, setCurrentSlide] = useState(0);
const [loading, setLoading] = useState(true);


useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 2200);

  return () => clearTimeout(timer);
}, []);

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
      title: 'Boost PC Performance Today with VORAA\'s 5 Easy Optimization and Care Tips'
    },
    {
      image: 'https://images.pexels.com/photos/3868613/pexels-photo-3868613.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Tips & Tricks',
      title: 'VORAA Trusted IT Partner Delivering Reliability & Excellence for Your Business'
    },
    {
      image: 'https://images.pexels.com/photos/7640443/pexels-photo-7640443.jpeg?auto=compress&cs=tinysrgb&w=600',
      category: 'Data Recovery',
      title: 'How VORAA Recovers Data from Crashed or Corrupted Devices Quickly and Securely'
    }
  ];

  const faqs = [
    {
      question: 'What services does VORAA offer?',
      answer: 'VORAA provides comprehensive IT solutions, including computer repair, virus removal, data recovery, hardware upgrades, network setup, and more tailored to your needs.'
    },
    {
      question: 'How quickly can VORAA repair my device?',
      answer: 'Most repairs are completed within 24-48 hours. Complex issues may take longer, but we always provide an estimated timeline upfront.'
    },
    {
      question: 'Can VORAA help with data recovery?',
      answer: 'Yes, we specialize in data recovery from damaged, corrupted, or failed storage devices with high success rates.'
    },
    {
      question: 'Does VORAA offer any warranty on repairs?',
      answer: 'Yes, all our repairs come with a warranty. The duration depends on the type of service provided.'
    }
  ];

  // Slides data
  const slides = [
    {
      tag: "VORAA: IT Service Center",
      title: "Reliable IT Support & Computer Repair Services.",
      description: "Our experienced Seattle technicians expertly handle all hardware and software repairs, ensuring fast, reliable solutions for your tech issues.",
      bgImage: "https://res.cloudinary.com/djpfw1goz/image/upload/v1779537942/ChatGPT_Image_May_23_2026_05_35_32_PM_h1c4nk.png"
    },
    {
      tag: "VORAA: Technical Experts",
      title: "Fast & Trusted Laptop Repair Services.",
      description: "Quick diagnostics, motherboard repair, and system optimization—done by certified technicians.",
      bgImage: "https://res.cloudinary.com/djpfw1goz/image/upload/v1779537925/ChatGPT_Image_May_23_2026_05_35_03_PM_fxs9in.png"
    },
    {
      tag: "VORAA: Network Solutions",
      title: "Professional Network Setup & IT Infrastructure.",
      description: "We design, install, and maintain secure and reliable networks for businesses and homes.",
      bgImage: "https://res.cloudinary.com/djpfw1goz/image/upload/v1779537925/ChatGPT_Image_May_23_2026_05_34_55_PM_comxvw.png"
    },
    {
      tag: "VORAA: Data Recovery",
      title: "Secure Data Recovery & Protection Services.",
      description: "Expert data recovery from damaged devices with high success rates and complete confidentiality.",
      bgImage: "https://res.cloudinary.com/djpfw1goz/image/upload/v1779537926/ChatGPT_Image_May_23_2026_05_18_53_PM_fsnbn1.png"
    }
  ];


  const products = [
  {
    id: 1,
    name: "WiFi Router",
    slug: "wifi-router",
    price: "$199",
    image: "https://assets.hikvision.com/prd/normal/all/image/sm000094493/%E5%8F%8C%E5%85%89%E5%8D%8A%E7%90%8361---%E5%9F%BA%E7%BA%BF---%E5%B7%A6%E4%BE%A7-1.png?eo-img.format=webp"
  },
  {
    id: 2,
    name: "Network Switch",
    slug: "network-switch",
    price: "$299",
    image: "https://assets.hikvision.com/prd/normal/all/image/m000164028/%E4%B8%BB%E8%A7%86%E5%9B%BE2.png?eo-img.format=webp"
  },
  {
    id: 3,
    name: "Firewall",
    slug: "firewall",
    price: "$899",
    image: "https://assets.hikvision.com/prd/normal/all/image/m000169550/27%E6%AD%A3%E8%A7%86%E5%9B%BE.png?eo-img.format=webp"
  },
  {
    id: 4,
    name: "IP Phones",
    slug: "ip-phones",
    price: "$149",
    image: "https://assets.hikvision.com/prd/normal/all/image/m000079320/HD-Picture-front-view.png?eo-img.format=webp"
  },
  {
    id: 5,
    name: "GSM Gateway",
    slug: "gsm-gateway",
    price: "$399",
    image: "https://assets.hikvision.com/prd/normal/all/image/m000174776/%E5%8F%B3%E8%A7%86%E5%9B%BE.png?eo-img.format=webp"
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
    <>
  {/* Shutter Loader */}
 {/* Cinematic Loader */}

<main
  className={`min-h-screen bg-orange-300 transition-all duration-[1800ms] ${
    loading
      ? "opacity-0 scale-[1.03] blur-md"
      : "opacity-100 scale-100 blur-0"
  }`}
>
      <Header />

      <ProductHero products={products} />

      {/* Hero Section */}
<section className="relative h-[1200px] overflow-hidden bg-black">
  {/* Background Slides */}
  {slides.map((slide, index) => (
    <div
      key={index}
      className={`absolute inset-0 transition-all duration-1000 ${
        index === currentSlide
          ? "opacity-100 scale-100"
          : "opacity-0 scale-105"
      }`}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${slide.bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Cinematic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/55 to-transparent" />

      {/* Extra Ambient Depth */}
      <div className="absolute inset-0 bg-black/20" />

      {/* Glow */}
      <div className="absolute left-32 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-emerald-400/10 blur-[140px]" />
    </div>
  ))}

  {/* Content */}
  <div className="relative z-10 flex   h-full items-top py-28">
    <div className="max-w-screen-2xl mx-auto w-full px-6 lg:px-12">
      <div className="max-w-[2800px] pt-16">
        
        {/* Tag */}
        <div className="mb-8">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/10 backdrop-blur-xl px-5 py-2 text-sm font-medium tracking-wide text-white">
            {slides[currentSlide].tag}
          </span>
        </div>

        {/* Heading */}
        <BlurText
          text={slides[currentSlide].title}
          delay={5}
          animateBy="words"
          direction="top"
          className="
            text-[52px]
            md:text-[72px]
            lg:text-[120px]
            font-extralight
             tracking-[0.02em]
           
            leading-[0.92]
            text-white
          "
        />

        {/* Description */}
        <BlurText
          text={slides[currentSlide].description}
          delay={5}
          animateBy="words"
          direction="top"
          className="
            mt-8
            max-w-[500px]
            text-lg
            md:text-xl
            leading-[1.5]
            text-white/70
          "
        />

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-5">
          <button
            className="
              group
              relative
              overflow-hidden
              rounded-full
              bg-[#00E0B8]
              px-8
              py-4
              font-semibold
              text-black
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-[0_10px_50px_rgba(0,224,184,0.45)]
            "
          >
            BOOK A CALL NOW
          </button>

          <button
            className="
              rounded-full
              border
              border-white/15
              bg-white/5
              backdrop-blur-xl
              px-8
              py-4
              font-semibold
              text-white
              transition-all
              duration-300
              hover:bg-white/10
              hover:border-white/30
            "
          >
            OUR SERVICES
          </button>
        </div>
      </div>
    </div>
  </div>

  {/* Slider Controls */}
  <div className="absolute bottom-10 right-10 z-20 flex items-center gap-5">
    <button
      onClick={prevSlide}
      className="
        flex h-14 w-14 items-center justify-center
        rounded-full
        border border-white/10
        bg-white/10
        backdrop-blur-xl
        transition-all duration-300
        hover:bg-white/20
      "
    >
      <ChevronLeft className="h-5 w-5 text-white" />
    </button>

    <div className="flex items-center gap-2">
      {slides.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentSlide(index)}
          className={`h-2 rounded-full transition-all duration-500 ${
            index === currentSlide
              ? "w-10 bg-[#00E0B8]"
              : "w-2 bg-white/40"
          }`}
        />
      ))}
    </div>

    <button
      onClick={nextSlide}
      className="
        flex h-14 w-14 items-center justify-center
        rounded-full
        border border-white/10
        bg-white/10
        backdrop-blur-xl
        transition-all duration-300
        hover:bg-white/20
      "
    >
      <ChevronRight className="h-5 w-5 text-white" />
    </button>
  </div>

  {/* Noise Texture */}
  <div
    className="
      pointer-events-none
      absolute inset-0
      opacity-[0.03]
      mix-blend-soft-light
    "
    style={{
      backgroundImage:
        "url('https://grainy-gradients.vercel.app/noise.svg')",
    }}
  />
</section>
      {/* NetPro Why Choose Us Section */}
      <section className="relative overflow-hidden bg-[#050505] py-28">
  {/* Global Ambient Glow */}
  <div className="absolute left-1/2 top-80 h-[1200px] w-[1200px] -translate-x-1/2 rounded-full bg-emerald-400 blur-[180px]" />

  <div className="relative z-10 max-w-[2800px] mx-auto px-6 lg:px-10">
    
    {/* Header */}
    <div className="mb-20 max-w-6xl">
      <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur-xl">
        Why Choose NetPro
      </span>

      <h2 className="mt-8 text-5xl md:text-7xl font-extralight   leading-none text-white">
        Enterprise-grade infrastructure built for modern businesses.
      </h2>

      <p className="mt-14 max-w-xl text-lg leading-relaxed text-emerald-400/60">
        Powerful networking, security, and support solutions designed to
        keep your organization connected, protected, and future-ready.
      </p>
    </div>

    {/* Bento Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-3 py-28 gap-8 auto-rows-[280px]">
      
      {/* HERO CARD */}
      <div className="group relative overflow-hidden rounded-[38px] lg:col-span-2 lg:row-span-2 border border-white/10 bg-black">
  
  {/* Background Glow */}
  <div className="absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 bg-emerald-400/10 blur-[120px]" />

  {/* Layout */}
  <div className="relative z-10 flex h-full flex-col lg:flex-row items-center">
    
    {/* LEFT CONTENT */}
    <div className="flex-1 p-12 lg:p-16 flex flex-col justify-center">
      <div className="max-w-[620px]">
        
        {/* Badge */}
        <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur-xl">
          Enterprise Protection
        </span>

        {/* Heading */}
        <h3 className="mt-6 text-5xl lg:text-6xl font-light  leading-[0.92] text-emerald-400">
          Advanced Security Infrastructure
        </h3>

        {/* Description */}
        <p className="mt-10 max-w-[520px] text-lg leading-relaxed text-gray-400/80">
          Military-grade security systems designed to protect your
          enterprise network with intelligent monitoring and real-time
          threat prevention.
        </p>

        {/* CTA */}
        {/* <div className="mt-12 flex items-center gap-4">
          <button className="rounded-full bg-[#00E0B8] px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_40px_rgba(0,224,184,0.35)]">
            Explore Security
          </button>

          <button className="rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-white/80 backdrop-blur-xl transition-all duration-300 hover:bg-white/10">
            Learn More
          </button>
        </div> */}
      </div>
    </div>

    {/* RIGHT IMAGE */}
    <div className="relative flex-1 h-full min-h-[500px]">
      
      {/* Image Glow */}
    
      {/* Product Image */}
      <Image
        src="https://res.cloudinary.com/djpfw1goz/image/upload/v1779902875/ChatGPT_Image_May_27_2026_10_57_42_PM_zalxou.png"
        alt="Enterprise Security"
        fill
        priority
        className="
          object-contain
          object-center
          scale-[1.15]
          translate-x-10
          transition-transform
          duration-700
          group-hover:scale-[1.2]
          group-hover:translate-x-6
        "
      />

      {/* Bottom Glow */}
         </div>
  </div>

  {/* Noise Texture */}
  <div
    className="
      pointer-events-none
      absolute inset-0
      opacity-[0.03]
      mix-blend-soft-light
    "
    style={{
      backgroundImage:
        "url('https://grainy-gradients.vercel.app/noise.svg')",
    }}
  />
</div>

      {/* PERFORMANCE CARD */}
      <div className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0B0F0E] p-8">
        
        {/* Glow */}
       
        {/* Background */}
        <div className="absolute inset-0 opacity-100">
        <Hyperspeed />
        </div>

        <div className="relative z-10 flex h-full flex-col justify-between">
          <div>
         

            <h4 className="text-3xl font-extralight text-white">
              High Performance
            </h4>

            <p className="mt-14 max-w-[280px] text-base leading-relaxed text-white/60">
              Lightning-fast networking hardware optimized for modern
              enterprise productivity.
            </p>
          </div>

        
        </div>
      </div>

      {/* SUPPORT CARD */}
      <div className="group relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0B0F0E]">
        
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="https://res.cloudinary.com/djpfw1goz/image/upload/q_auto/f_auto/v1775305646/Tech_support_made_simple_and_secure_u8sydh.png"
            alt="Support"
            fill
            className="object-cover object-center"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />

        {/* Glow */}
        <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-emerald-400/10 blur-[100px]" />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-end  p-8">
         

          <h4 className="text-3xl font-extralight text-white">
            24/7 Technical Assistance
          </h4>

          <p className="mt-14 max-w-[320px] text-white leading-relaxed text-white/65">
            Expert engineers available around the clock to ensure seamless
            operations and rapid issue resolution.
          </p>
        </div>
      </div>

      {/* QUALITY CARD */}
      <div className="group relative overflow-hidden rounded-[38px] lg:col-span-3 border border-white/10 bg-[#060606]">
        
        {/* Gradient Glow */}
      
        {/* Noise */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-soft-light bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        <div className="relative z-10 flex h-full items-center justify-between gap-10 p-10 lg:p-14">
          
          {/* Left */}
          <div className="max-w-[500px]">
           

            <h3 className="mt-6 text-4xl lg:text-5xl font-extralight  leading-[0.95] text-white">
              Quality Assured Solutions
            </h3>

            <p className="mt-14 text-lg leading-relaxed text-white/60">
              Trusted enterprise products certified by the world's leading
              networking and security manufacturers.
            </p>
          </div>

          {/* Right Image */}
          <div className="relative h-56 w-56 lg:h-72 lg:w-72 flex-shrink-0">
            <Image
              src="https://res.cloudinary.com/djpfw1goz/image/upload/q_auto/f_auto/v1775303854/S%C3%ADmbolo_de_confian%C3%A7a__o_design_3D_que_transmite_qualidade_tgw1zh.jpg"
              alt="Quality"
              fill
              className="object-contain  transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


<ProductSection/>


<section className="relative overflow-hidden bg-[#050505] py-32">
  
  {/* Ambient Glow */}
  <div className="absolute left-1/2 top-52 h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-emerald-400 blur-[180px]" />

  {/* Noise Texture */}
  <div
    className="absolute inset-0 opacity-[0.03] mix-blend-soft-light"
    style={{
      backgroundImage:
        "url('https://grainy-gradients.vercel.app/noise.svg')",
    }}
  />

  <div className="relative z-10 max-w-[2800px] mx-auto px-6 lg:px-10">

    {/* Header */}
    <div className="mb-20 flex flex-row lg:flex-row lg:items-end lg:justify-between gap-10">
      
      <div className="max-w-5xl">
        <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 backdrop-blur-xl">
          Enterprise Infrastructure
        </span>

        <h2 className="mt-6 text-5xl md:text-7xl font-extralight leading-[0.92] text-white">
          Featured Products
          <br />
          Built For Modern Security.
        </h2>
      </div>

      <p className="max-w-md text-lg leading-relaxed text-emerald-400">
        Explore enterprise-grade networking, surveillance, communication,
        and security devices engineered for performance and reliability.
      </p>
    </div>

    {/* Services Glass Card */}
    <ServicesSection />

  
  
  </div>
</section>

      {/* Testimonials Section */}
      {/* <section className="py-20 bg-white">
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
      </section> */}

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


<XiaomiStyleShowcase />



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
      {/* <section className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-20">
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
              At VORAA, we offer dependable IT support and computer repair services tailored to your needs. Our certified team, with extensive experience, expertly handles everything from troubleshooting and data recovery to comprehensive cybersecurity, ensuring your systems remain secure and efficiently operational.
            </p>
            <Link href="#" className="text-blue-600 font-semibold inline-flex items-center gap-2 hover:gap-3 transition-all">
              Learn More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section> */}

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
     
 
  <Contact/>

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
              <div className="text-3xl font-bold text-[#2D5BFF]">VORAA</div>
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
    </main></>
  );
}