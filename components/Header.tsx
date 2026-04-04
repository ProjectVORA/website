// src/components/Header.tsx
'use client';

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, Search, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ⭐ FIXED: Import useRouter

import { productCategories, ProductCategory } from "@/lib/productData";

// 🔹 Types
interface DropdownSectionItem {
  title: string;
  subtitle?: string;
  link?: string;
  icon: string;
}

interface DropdownContent {
  main: {
    title: string;
    subtitle: string;
    description?: string;
    image: string;
    bg: string;
    text: string;
  };
  sections: DropdownSectionItem[];
  subSections?: { title: string; icon: string }[];
}

type DropdownKey = "Home" | "Products" | "Solutions" | "Support" | "Gallery" | "About" | "Careers" | "Contact";

interface NavItem {
  label: string;
  key: DropdownKey;
  hasDropdown: boolean;
}

// 🔹 Mock data - Updated with actual product data from images
const dropdownContent: Partial<Record<DropdownKey, DropdownContent>> = {
  Home: undefined,
  Products: {
    main: {
      title: "OUR PRODUCTS",
      subtitle: "Complete IT & Security Solutions",
      description: "Enterprise-grade networking, security, and communication systems for businesses of all sizes.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
      bg: "bg-gradient-to-r from-blue-900 to-cyan-700",
      text: "text-white",
    },
    sections: [
      {
        title: "Networking Equipment",
        subtitle: "Routers, Switches & Gateways",
        link: "/products?category=networking", // ⭐ FIXED: Changed to use query param
        icon: "",
      },
      {
        title: "Communication Systems",
        subtitle: "IP PBX & IP Phones",
        link: "/products?category=communication", // ⭐ FIXED: Changed to use query param
        icon: "",
      },
      {
        title: "Security & Surveillance",
        subtitle: "CCTV, Firewall & Alarm Systems",
        link: "/products?category=security", // ⭐ FIXED: Changed to use query param
        icon: "",
      },
      {
        title: "Access Control",
        subtitle: "Biometric & Smart Locks",
        link: "/products?category=access-control", // ⭐ FIXED: Changed to use query param
        icon: "",
      },
    ],
    subSections: [
      { title: "Headsets", icon: "🎧" },
      { title: "Accessories", icon: "🔌" },
      { title: "View Catalog", icon: "📋" },
      { title: "Request Quote", icon: "💰" },
    ],
  },
  Solutions: {
    main: {
      title: "BUSINESS SOLUTIONS",
      subtitle: "Tailored IT Solutions for Every Industry",
      description:
        "Customized IT infrastructure, security, and communication solutions designed to meet your specific business needs.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
      bg: "bg-gradient-to-r from-purple-900 to-indigo-700",
      text: "text-white",
    },
    sections: [
      {
        title: "Enterprise Networking",
        subtitle: "Scalable network infrastructure for large organizations",
        link: "/solutions/enterprise-networking",
        icon: "🏢",
      },
      {
        title: "SME Solutions",
        subtitle: "Cost-effective IT solutions for small businesses",
        link: "/solutions/sme",
        icon: "📊",
      },
      {
        title: "Security Solutions",
        subtitle: "Comprehensive cybersecurity and surveillance",
        link: "/solutions/security",
        icon: "🛡️",
      },
      {
        title: "Unified Communications",
        subtitle: "Integrated voice, video, and messaging solutions",
        link: "/solutions/communications",
        icon: "💬",
      },
    ],
    subSections: [
      { title: "Hospitality", icon: "🏨" },
      { title: "Healthcare", icon: "🏥" },
      { title: "Education", icon: "🎓" },
      { title: "Retail", icon: "🛍️" },
    ],
  },
  Support: {
    main: {
      title: "SUPPORT CENTER",
      subtitle: "Get help and support for our products.",
      description: "Access guides, tutorials, and best practices.",
      image: "https://i.pinimg.com/1200x/56/94/89/569489bcf4d328c6e46762bf3b68d9eb.jpg",
      bg: "bg-gradient-to-r from-[#08203E] to-[#557C93]",
      text: "text-white",
    },
    sections: [
      {
        title: "Technical Support",
        subtitle: "Get help with technical issues.",
        link: "/support/technical",
        icon: "🔧",
      },
      {
        title: "Documentation",
        subtitle: "Product manuals and guides.",
        link: "/support/docs",
        icon: "📚",
      },
      {
        title: "Warranty & RMA",
        subtitle: "Product warranty and returns.",
        link: "/support/warranty",
        icon: "📋",
      },
      {
        title: "Contact Support",
        subtitle: "Reach our support team.",
        link: "/support/contact",
        icon: "📞",
      },
    ],
  },
  Gallery: {
    main: {
      title: "GALLERY",
      subtitle: "Explore our visual portfolio and success stories.",
      description: "See our products in action through stunning visuals and case studies.",
      image: "https://i.pinimg.com/1200x/f6/b7/47/f6b7470a74b9978b69b76dbb621730b4.jpg",
      bg: "bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4]",
      text: "text-white",
    },
    sections: [
      {
        title: "Installations",
        subtitle: "Our products in real-world settings.",
        link: "/gallery/installations",
        icon: "🏢",
      },
      {
        title: "Case Studies",
        subtitle: "Success stories from our clients.",
        link: "/gallery/case-studies",
        icon: "📊",
      },
      {
        title: "Product Demos",
        subtitle: "Video demonstrations of our products.",
        link: "/gallery/demos",
        icon: "🎥",
      },
      {
        title: "Events",
        subtitle: "Photos from industry events.",
        link: "/gallery/events",
        icon: "🎪",
      },
    ],
  },
  About: {
    main: {
      title: "ABOUT US",
      subtitle: "Learn more about our company, mission, and values.",
      description: "We're committed to innovation and excellence in everything we do.",
      image: "https://i.pinimg.com/1200x/07/e6/00/07e600c32e639d24e2732a6b6e91d092.jpg",
      bg: "bg-gradient-to-r from-[#667eea] to-[#764ba2]",
      text: "text-white",
    },
    sections: [
      {
        title: "Company Profile",
        subtitle: "Our history and achievements.",
        link: "/about/profile",
        icon: "🏢",
      },
      {
        title: "Management Team",
        subtitle: "Meet our leadership.",
        link: "/about/team",
        icon: "👥",
      },
      {
        title: "Quality Policy",
        subtitle: "Our commitment to quality.",
        link: "/about/quality",
        icon: "⭐",
      },
      {
        title: "Careers",
        subtitle: "Join our growing team.",
        link: "/about/careers",
        icon: "💼",
      },
    ],
  },
  Careers: {
    main: {
      title: "CAREERS",
      subtitle: "Join our team and build the future with us.",
      description: "We're always looking for talented individuals to join our growing team.",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80",
      bg: "bg-gradient-to-r from-green-700 to-emerald-500",
      text: "text-white",
    },
    sections: [
      {
        title: "Current Openings",
        subtitle: "Browse available positions.",
        link: "/careers/openings",
        icon: "📋",
      },
      {
        title: "Internship Program",
        subtitle: "Opportunities for students.",
        link: "/careers/internships",
        icon: "🎓",
      },
      {
        title: "Work Culture",
        subtitle: "Life at our company.",
        link: "/careers/culture",
        icon: "🌟",
      },
      {
        title: "Employee Benefits",
        subtitle: "What we offer.",
        link: "/careers/benefits",
        icon: "🎁",
      },
    ],
  },
  Contact: {
    main: {
      title: "CONTACT US",
      subtitle: "Get in touch with our team.",
      description: "We're here to help and answer any questions you might have.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80",
      bg: "bg-gradient-to-r from-amber-700 to-orange-500",
      text: "text-white",
    },
    sections: [
      {
        title: "Sales Enquiry",
        subtitle: "For product inquiries and quotes.",
        link: "/contact/sales",
        icon: "💰",
      },
      {
        title: "Technical Support",
        subtitle: "Get technical assistance.",
        link: "/contact/support",
        icon: "🔧",
      },
      {
        title: "Partnerships",
        subtitle: "Become a partner.",
        link: "/contact/partnerships",
        icon: "🤝",
      },
      {
        title: "Locations",
        subtitle: "Our office locations.",
        link: "/contact/locations",
        icon: "📍",
      },
    ],
  },
};

// Updated nav items to match the image
const navItems: NavItem[] = [
  { label: "Home", key: "Home", hasDropdown: false },
  { label: "Products", key: "Products", hasDropdown: false },
  { label: "Solutions", key: "Solutions", hasDropdown: false },
  //{ label: "Support", key: "Support", hasDropdown: true },
  //{ label: "Gallery", key: "Gallery", hasDropdown: true },
  { label: "About", key: "About", hasDropdown: true },
  { label: "Careers", key: "Careers", hasDropdown: false },
  { label: "Contact", key: "Contact", hasDropdown: true },
];

// Product data from the images
const productData = {
  networking: [
    {
      category: "Routers",
      items: ["Wired Router", "Wireless - WiFi Router", "VPN Router"]
    },
    {
      category: "Switches",
      items: ["POE", "Non POE"]
    },
    {
      category: "Gateways",
      items: ["GSM/3G/4G Gateway", "PRI Gateway", "FXS Gateway", "FXO Gateway", "IPPBX"]
    }
  ],
  networking1: [
    {
      category: "Routers",
      items: ["Wired Router", "Wireless - WiFi Router", "VPN Router"]
    },
    {
      category: "Switches",
      items: ["POE", "Non POE"]
    },
    {
      category: "Gateways",
      items: ["GSM/3G/4G Gateway", "PRI Gateway", "FXS Gateway", "FXO Gateway", "IPPBX"]
    }
  ],
  communication: [
    {
      category: "IPPBX",
      items: ["SME IP PBX", "High Density IPPBX"]
    },
    {
      category: "IP Phones",
      items: ["Executive Phones", "Business IP Phones", "Video IP Phones", "Console IP Phones", "Wi-Fi IP Phones", "Hotel IP Phones"]
    },
    {
      category: "Headsets",
      items: ["Wired Headset", "Wireless Headset"]
    }
  ],
  security: [
    {
      category: "Firewall",
      items: ["Hardware Firewall", "Software Firewall", "Web Application Firewall", "Cloud Firewall"]
    },
    {
      category: "Cameras - CCTV",
      items: ["Video Recorders - DVR, NVR, XVR", "Analog Camera", "IP Camera", "Wireless Camera", "AI Camera", "Smart / Mobile Security Camera", "IP Surveillance Camera"]
    },
    {
      category: "Intrusion Alarm Systems",
      items: ["GSM / WiFi - Intrusion Alarm System", "Wireless Intrusion Alarm", "Wired Intrusion Alarm"]
    }
  ],
  accessControl: [
    {
      category: "Biometric",
      items: ["Fingerprint Biometric", "Face Biometric", "Aadhar Based Biometric"]
    },
    {
      category: "Smart Locks",
      items: ["Glass Door Lock", "Wooden Door Lock", "Electronic Lock", "EM Lock", "RFID Card Lock", "Hotel Door Lock"]
    }
  ],
  accessories: [
    {
      category: "Accessories",
      items: ["AC DC Power Adapters", "CCTV Accessories", "Biometric Accessories", "Smart Lock Accessories", "Network Accessories", "Audio/Video Accessories", "Headsets Accessories"]
    }
  ]
};

// 🔹 Component
const Header = () => { // ⭐ CHANGED: Renamed from Navbar to Header
  const router = useRouter(); // ⭐ ADDED: For navigation
  const [openDropdown, setOpenDropdown] = useState<DropdownKey | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const navRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Focus search input when shown
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  const handleToggleDropdown = (key: DropdownKey) => {
    setOpenDropdown(prev => prev === key ? null : key);
  };

  const handleMobileToggleDropdown = (key: DropdownKey) => {
    setOpenDropdown(prev => prev === key ? null : key);
  };

  const handleCloseAll = () => {
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
    setShowSearch(false);
  };

  // ⭐ FIXED: Updated handleNavItemClick to navigate for Products
  const handleNavItemClick = (item: NavItem) => {
    if (item.hasDropdown) {
      handleToggleDropdown(item.key);
      // ⭐ ADDED: If it's Products, navigate to products page
      if (item.key === "Products") {
        router.push("/products");
      }
    } else {
      handleCloseAll();
      // Navigate for non-dropdown items
      if (item.key === "Home") {
        router.push("/");
      } else {
        router.push(`/${item.key.toLowerCase()}`);
      }
    }
  };

  // ⭐ FIXED: Updated search handler
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      handleCloseAll();
    }
  };

  const renderProductDropdown = (isMobile: boolean = false) => {
    const content = dropdownContent.Products!;
    
    // 🔁 Map sections to actual product categories from your data
    const enhancedSections = content.sections.map(section => {
      // Map section titles to your product category IDs
      const sectionMap: Record<string, string> = {
        "Networking Equipment": "networking",
        "Communication Systems": "communication", 
        "Security & Surveillance": "security",
        "Access Control": "access-control"
      };
      
      const categoryId = sectionMap[section.title] || section.title.toLowerCase();
      const category = productCategories?.find(cat => cat.id === categoryId);
      
      return {
        ...section,
        link: `/products?category=${categoryId}`, // ⭐ FIXED: Changed to use query param
        subItems: category?.subcategories?.map(sub => ({
          label: `${sub.name} (${sub.products?.length || 0} products)`,
          link: `/products?category=${categoryId}&subcategory=${sub.id}` // ⭐ FIXED: Changed to use query params
        })) || []
      };
    });

    // Use real product categories for featured products
    const featuredProducts = (productCategories || []).slice(0, 4).map(category => {
      const totalProducts = category.subcategories?.reduce(
        (total, sub) => total + (sub.products?.length || 0), 
        0
      ) || 0;
      
      return {
        title: category.name,
        subtitle: `${totalProducts} products available`,
        image: category.image || "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=80",
        link: `/products?category=${category.id}`
      };
    });

    return (
      <div className={`${isMobile ? 'mt-2' : 'left-0 right-0 z-25 mt-2'} fixed p-4 shadow-2xl ${
        content.main.bg
      } ${content.main.text} ${isMobile ? 'border-l-4 border-orange-500 ml-4' : ''}`}
      style={{
        maxHeight: '125vh',
      }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-3">
            <h3 className="text-2xl font-bold mb-2">{content.main.title}</h3>
            <p className="opacity-90">{content.main.description}</p>
          </div>

          {/* ===== TOP SECTION: HORIZONTAL CATEGORIES ===== */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6 mb-8 border-b pb-6 border-white/30">
            {enhancedSections.map((item, index) => (
              <div key={index} className="min-w-[250px]">
                <div
                  className="group block p-4 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                  onClick={() => {
                    router.push(item.link);
                    handleCloseAll();
                  }}
                >
                  <h4 className="font-bold text-lg mb-3 flex items-center">
                    {item.title}
                  </h4>
                  <p className="text-sm opacity-90 mb-3">{item.subtitle}</p>
                  <ul className="space-y-2">
                    {item.subItems?.slice(0, 3).map((sub, i) => (
                      <li key={i} className="flex items-center text-sm">
                        <span className="w-1.5 h-1.5 bg-white/50 rounded-full mr-2"></span>
                        <div
                          className="hover:text-white transition-colors hover:underline cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(sub.link);
                            handleCloseAll();
                          }}
                        >
                          {sub.label}
                        </div>
                      </li>
                    )) || (
                      <li className="italic opacity-70 text-sm">No subcategories</li>
                    )}
                    {item.subItems && item.subItems.length > 3 && (
                      <li className="text-xs text-white/70 italic mt-1">
                        + {item.subItems.length - 3} more...
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* ===== BOTTOM SECTION: FEATURED PRODUCT CATEGORIES ===== */}
          <div className="mb-1">
            <h4 className="font-bold text-xl mb-1 text-center">Browse Categories</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, idx) => (
                <div
                  key={idx}
                  className="group block bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden cursor-pointer border border-white/20 hover:border-blue-400 hover:shadow-lg transition-all duration-300"
                  onClick={() => {
                    router.push(product.link);
                    handleCloseAll();
                  }}
                >
                  <div className="relative overflow-hidden h-40">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                  <div className="p-4">
                    <h5 className="font-bold text-lg mb-1 group-hover:text-white transition-colors">
                      {product.title}
                    </h5>
                    <p className="text-sm opacity-90 mb-3">{product.subtitle}</p>
                    <div className="text-blue-300 font-medium text-sm flex items-center group-hover:translate-x-2 transition-transform">
                      Explore Products →
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ===== QUICK LINKS ===== */}
          <div className="text-center pt-6 border-t border-white/30">
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              <div
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-md text-sm font-medium transition-colors cursor-pointer"
                onClick={() => {
                  router.push("/products");
                  handleCloseAll();
                }}
              >
                📋 All Products
              </div>
              <div
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-md text-sm font-medium transition-colors cursor-pointer"
                onClick={() => {
                  router.push("/products?filter=new");
                  handleCloseAll();
                }}
              >
                🆕 New Arrivals
              </div>
              <div
                className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-md text-sm font-medium transition-colors cursor-pointer"
                onClick={() => {
                  router.push("/products?filter=featured");
                  handleCloseAll();
                }}
              >
                ⭐ Featured Products
              </div>
              <div
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 rounded-md text-sm font-bold text-white transition-colors cursor-pointer"
                onClick={() => {
                  router.push("/contact?form=quote");
                  handleCloseAll();
                }}
              >
                💰 Request Quote
              </div>
            </div>
            
            <div
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-900 font-semibold rounded-lg hover:bg-gray-100 hover:shadow-xl transition-all duration-300 shadow-lg cursor-pointer"
              onClick={() => {
                router.push("/products");
                handleCloseAll();
              }}
            >
              View Complete Product Catalog
              <ArrowRight className="ml-2 w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderDropdownContent = (key: DropdownKey, isMobile: boolean = false) => {
    // Special handling for Products dropdown
    if (key === "Products") {
      return renderProductDropdown(isMobile);
    }

    const content = dropdownContent[key];
    if (!content) return null;

    const { main, sections, subSections } = content;
    const hasSubSections = subSections && subSections.length > 0;

    return (
      <div
        className={`${isMobile ? 'mt-2' : 'left-0 right-0 z-50 mt-2'} fixed p-4 md:p-6 shadow-2xl overflow-y-auto ${
          isMobile ? 'max-h-[600vh]' : 'max-h-[800vh]'
        } ${main.bg} ${main.text} ${
          isMobile ? 'border-l-4 border-orange-500 ml-4' : ''
        }`}
      >
        <div className={`flex ${isMobile ? 'flex-col' : 'flex-col md:flex-row'} gap-6 md:gap-8`}>
          {/* Left Panel */}
          <div className={`${isMobile ? 'w-full' : 'md:w-1/3'} flex flex-col justify-between`}>
            <div>
              <h3 className="font-bold text-lg md:text-xl mb-3 md:mb-4">{main.title}</h3>
              <p className="mb-3 md:mb-4 text-sm md:text-base">{main.subtitle}</p>
              {main.description && (
                <p className="text-sm opacity-90">{main.description}</p>
              )}
            </div>
            <div className="mt-4 md:mt-6">
              <img
                src={main.image.trim()}
                alt={main.title}
                className="w-full h-48 md:h-64 rounded-lg object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Panels */}
          <div className={`${isMobile ? 'w-full' : 'md:w-2/3'} grid grid-cols-1 ${hasSubSections ? 'md:grid-cols-2' : ''} gap-4 md:gap-6`}>
            {/* Main Sections */}
            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">FEATURES</h4>
              <div className="space-y-3 md:space-y-4">
                {sections.map((item, index) => (
                  <div
                    key={index}
                    className={`block p-3 md:p-4 rounded-lg cursor-pointer hover:bg-opacity-20 transition ${
                      main.text === "text-white" ? "hover:bg-white" : "hover:bg-gray-200"
                    }`}
                    onClick={() => {
                      if (item.link && item.link !== "#") {
                        router.push(item.link);
                        handleCloseAll();
                      }
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-xl flex-shrink-0">{item.icon}</span>
                      <div>
                        <div className="font-medium text-sm md:text-base">{item.title}</div>
                        {item.subtitle && (
                          <div className="text-xs md:text-sm opacity-90 mt-1">{item.subtitle}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sub Sections */}
            {hasSubSections && (
              <div className={isMobile ? 'mt-4' : ''}>
                <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">LEARNING & SUPPORT</h4>
                <div className="space-y-3 md:space-y-4">
                  {subSections.map((item, index) => (
                    <div
                      key={index}
                      className={`block p-3 md:p-4 rounded-lg cursor-pointer hover:bg-opacity-20 transition ${
                        main.text === "text-white" ? "hover:bg-white" : "hover:bg-gray-200"
                      }`}
                      onClick={() => {
                        // Add navigation logic if needed
                        handleCloseAll();
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl flex-shrink-0">{item.icon}</span>
                        <div className="text-sm md:text-base">{item.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50" ref={navRef}>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-2" aria-label="Home" onClick={handleCloseAll}>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="text-white"
                  aria-hidden="true"
                >
                  <path d="M12 2L2 7l10 5 10-5M2 12l10 5 10-5M2 7v5l10 5M2 7l10 5M2 12v5l10-5m10 5l-10-5M12 2v20l10-5M12 2v20l-10-5" />
                </svg>
              </div>
              <span className="font-bold text-xl text-gray-900">TechSolutions</span>
            </Link>
          </div>

          {/* Desktop Nav - Centered Navigation Items */}
<div className="hidden md:flex items-center">
  {/* Centered Navigation Container */}
  <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center space-x-6">
    {navItems.map((item) => (
      <div key={item.key} className="relative">
        {item.hasDropdown ? (
          <>
            <button
              className={`flex items-center space-x-1 px-3 py-2 rounded-md font-medium transition ${
                openDropdown === item.key
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }`}
              onClick={() => handleNavItemClick(item)}
            >
              <span>{item.label}</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${
                  openDropdown === item.key ? "rotate-180" : ""
                }`}
              />
            </button>
            
            <AnimatePresence>
              {openDropdown === item.key && dropdownContent[item.key] && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0, ease: "easeOut" }}
                  className="absolute left-0 top-full z-50 min-w-[600px]"
                >
                  {renderDropdownContent(item.key)}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : (
          <Link
            href={item.key === "Home" ? "/" : `/${item.key.toLowerCase()}`}
            className={`px-3 py-2 rounded-md font-medium transition ${
              openDropdown === item.key
                ? "text-blue-600 bg-blue-50"
                : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
            }`}
            onClick={handleCloseAll}
          >
            {item.label}
          </Link>
        )}
      </div>
    ))}
  </div>

  {/* Right-aligned elements (Search and Login) */}
  <div className="ml-auto flex items-center space-x-6">
    {/* Search Bar */}
    <div className="relative">
      {showSearch ? (
        <form onSubmit={handleSearch} className="flex items-center">
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            onBlur={() => {
              if (!searchQuery.trim()) {
                setTimeout(() => setShowSearch(false), 200);
              }
            }}
          />
          <button
            type="submit"
            className="absolute right-2 text-gray-500 hover:text-blue-600"
          >
            <Search size={20} />
          </button>
        </form>
      ) : (
        <button
          onClick={() => setShowSearch(true)}
          className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
        >
          <Search size={20} />
        </button>
      )}
    </div>

    {/* Login Button */}
    <Link
      href="/login"
      className="px-6 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm"
      onClick={handleCloseAll}
    >
      Login
    </Link>
  </div>
</div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Mobile Search Button */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 text-gray-600 hover:text-blue-600"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showSearch && (
          <div className="md:hidden py-4">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-r-lg hover:opacity-90"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-gray-200 overflow-hidden"
            aria-hidden={!isMobileMenuOpen}
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <div key={item.key}>
                  {item.hasDropdown ? (
                    <>
                      <button
                        onClick={() => handleNavItemClick(item)} // ⭐ FIXED: Uses same handler
                        className={`flex items-center justify-between w-full px-3 py-3 rounded-md font-medium transition ${
                          openDropdown === item.key
                            ? "bg-blue-50 text-blue-700"
                            : "hover:bg-gray-100 text-gray-700"
                        }`}
                        aria-expanded={openDropdown === item.key}
                        aria-haspopup="true"
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${
                            openDropdown === item.key ? "rotate-180" : ""
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                      {openDropdown === item.key && dropdownContent[item.key] && (
                        <div className="mt-2">
                          {renderDropdownContent(item.key, true)}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.key === "Home" ? "/" : `/${item.key.toLowerCase()}`}
                      className="block w-full px-3 py-3 rounded-md font-medium text-gray-700 hover:bg-gray-100 transition"
                      onClick={handleCloseAll}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <Link
                href="/login"
                className="w-full mt-4 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold hover:opacity-90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={handleCloseAll}
              >
                Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Header; // ⭐ CHANGED: Export as Header