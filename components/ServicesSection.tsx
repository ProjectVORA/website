"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface ServiceStats {
  value: string;
  label: string;
}

interface Service {
  label: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  stats: ServiceStats[];
  bgWord: string;
}

const services: Service[] = [
  {
    label: "ISP",
    title: "Internet Solutions",
    subtitle: "High-Speed Fiber Connectivity",
    description:
      "Enterprise-grade broadband and fiber solutions designed for reliability, speed and business continuity.",
    image:
      "https://res.cloudinary.com/djpfw1goz/image/upload/v1779537925/ChatGPT_Image_May_23_2026_05_34_55_PM_comxvw.png",
    stats: [
      { value: "99.99%", label: "Uptime" },
      { value: "24/7", label: "Support" },
      { value: "1Gbps+", label: "Speed" },
    ],
    bgWord: "INTERNET",
  },
  {
    label: "CCTV",
    title: "CCTV Surveillance",
    subtitle: "Intelligent Video Monitoring",
    description:
      "AI-powered surveillance systems with remote monitoring and 24/7 recording capabilities.",
    image:
      "https://res.cloudinary.com/djpfw1goz/image/upload/v1779902875/ChatGPT_Image_May_27_2026_10_57_42_PM_zalxou.png",
    stats: [
      { value: "4K", label: "Resolution" },
      { value: "24/7", label: "Recording" },
      { value: "AI", label: "Detection" },
    ],
    bgWord: "CCTV",
  },
  {
    label: "SERVERS",
    title: "Server Infrastructure",
    subtitle: "Enterprise Server Deployment",
    description:
      "Secure rack deployment, configuration and maintenance for modern organizations.",
    image:
      "https://res.cloudinary.com/djpfw1goz/image/upload/v1779966895/ChatGPT_Image_May_28_2026_04_44_36_PM_oktii8.png",
    stats: [
      { value: "48TB", label: "Storage" },
      { value: "24/7", label: "Monitoring" },
      { value: "RAID", label: "Support" },
    ],
    bgWord: "SERVERS",
  },
  {
    label: "ACCESS",
    title: "Smart Access Control",
    subtitle: "Secure Access Management",
    description:
      "Modern biometric, RFID and smart lock systems for complete facility protection.",
    image:
      "https://res.cloudinary.com/djpfw1goz/image/upload/v1779902875/ChatGPT_Image_May_27_2026_10_57_42_PM_zalxou.png",
    stats: [
      { value: "99.9%", label: "Accuracy" },
      { value: "0.3s", label: "Response" },
      { value: "500+", label: "Users" },
    ],
    bgWord: "ACCESS",
  },
  {
    label: "NETWORK",
    title: "Networking Systems",
    subtitle: "Scalable Network Infrastructure",
    description:
      "Routers, switches and gateways engineered for enterprise-grade connectivity.",
    image:
      "https://res.cloudinary.com/djpfw1goz/image/upload/v1779966895/ChatGPT_Image_May_28_2026_04_44_36_PM_oktii8.png",
    stats: [
      { value: "10GbE", label: "Speed" },
      { value: "99.99%", label: "Uptime" },
      { value: "L3", label: "Switching" },
    ],
    bgWord: "NETWORK",
  },
];

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = services[activeIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % services.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_40px_120px_rgba(0,0,0,0.65)]">
      {/* Background Word */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 text-[180px] font-black text-gray-500 pointer-events-none select-none leading-none">
        {active.bgWord}
      </div>

      {/* Inner Glow */}
      <div className="absolute right-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-emerald-400/40 blur-[150px]" />

      {/* Progress Number */}
      <div className="absolute top-8 left-10 text-9xl font-black text-gray-500 pointer-events-none select-none">
        {String(activeIndex + 1).padStart(2, "0")}
      </div>

      {/* Tab Strip */}
      <div className="relative z-10 mx-6 mt-6 rounded-2xl border border-white/10 bg-black/30 backdrop-blur-xl overflow-hidden">
        <div className="flex">
          {services.map((s, i) => (
            <button
              key={s.label}
              onClick={() => setActiveIndex(i)}
              className={`flex-1 py-5 text-sm font-medium transition-all duration-300 relative ${
                i === activeIndex
                  ? "text-[#00E0B8] bg-white/[0.03]"
                  : "text-white/50 hover:text-white/80"
              }`}
            >
              {s.label}
              {i === activeIndex && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00E0B8]"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="relative z-10 grid lg:grid-cols-[1fr_700px] gap-8 p-10 lg:p-16 min-h-[650px] items-center">
        {/* Left Content */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <span className="inline-flex rounded-full border border-white/10 bg-black/30 px-4 py-2 text-sm text-[#00E0B8] backdrop-blur-xl">
              {active.subtitle}
            </span>

            <h3 className="mt-6 text-4xl lg:text-5xl font-bold tracking-[-0.04em] text-white">
              {active.title}
            </h3>

            <p className="mt-6 max-w-[480px] text-base leading-relaxed text-white/65">
              {active.description}
            </p>

            {/* Stats */}
            <div className="flex gap-8 mt-10">
              {active.stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold text-[#00E0B8]">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-sm text-white/50">{stat.label}</p>
                </div>
              ))}
            </div>

            <button className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/30 backdrop-blur-xl px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#00E0B8] hover:text-black hover:border-transparent group">
              Explore Service
              <svg
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </motion.div>
        </AnimatePresence>

        {/* Right Image */}
        <div className="relative h-[400px] lg:h-[550px] flex items-center justify-center">
          <div className="absolute right-[-80px] bottom-[-40px] w-[120%] h-[120%]">
            
          </div>
        </div>
      </div>

      {/* Progress & Navigation */}
      <div className="relative z-10 pb-8 px-10 flex items-center justify-between">
        <span className="text-sm font-mono text-white/40">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(services.length).padStart(2, "0")}
        </span>

        <div className="flex items-center gap-3">
          {services.map((s, i) => (
            <button
              key={s.label}
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === activeIndex
                  ? "w-10 bg-[#00E0B8]"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        <span className="text-sm text-white/40">{active.title}</span>
      </div>
    </div>
  );
}
