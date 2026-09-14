"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image, { StaticImageData } from "next/image";
import cameraImage from "@/components/asset/camera.png";

interface ServiceStats {
  value: string;
  label: string;
}

interface Service {
  label: string;
  title: string;
  subtitle: string;
  description: string;
  image: string | StaticImageData;
  stats: ServiceStats[];
  bgWord: string;
}

const services: Service[] = [
  // ------------------------------------------------------------
  // 1. ISP — Internet Service Provider
  // ------------------------------------------------------------
  {
    label: "ISP",
    title: "Internet Solutions",
    subtitle: "High-Speed Fiber & Broadband Connectivity",
    description:
      "Enterprise-grade fiber and broadband connectivity with SLA-backed uptime, static IP options, and dedicated bandwidth. We design, install, and monitor the link so your business stays online — with 24/7 proactive monitoring and rapid failover support.",
    image: cameraImage,
    stats: [
      { value: "99.99%", label: "Uptime SLA" },
      { value: "1Gbps+", label: "Fiber Speed" },
      { value: "24/7", label: "Monitoring" },
    ],
    bgWord: "INTERNET",
  },

  // ------------------------------------------------------------
  // 2. CCTV — Surveillance Systems
  // ------------------------------------------------------------
  {
    label: "CCTV",
    title: "CCTV Surveillance",
    subtitle: "IP Camera & NVR/DVR Installation",
    description:
      "End-to-end surveillance deployment — site survey, camera placement, NVR/DVR configuration, remote mobile viewing, and storage planning. We install 4K IP cameras with AI motion detection, night vision, and cloud backup for homes, offices, warehouses, and retail.",
    image:
      "https://res.cloudinary.com/djpfw1goz/image/upload/v1779902875/ChatGPT_Image_May_27_2026_10_57_42_PM_zalxou.png",
    stats: [
      { value: "4K", label: "Resolution" },
      { value: "24/7", label: "Recording" },
      { value: "AI", label: "Motion Detect" },
    ],
    bgWord: "CCTV",
  },

  // ------------------------------------------------------------
  // 3. SERVERS — Server Installation & Management
  // ------------------------------------------------------------
  {
    label: "SERVERS",
    title: "Server Infrastructure",
    subtitle: "Onsite Rack Installation & Management",
    description:
      "Complete server room deployment — rack mounting, cable management, Windows/Linux OS installation, Active Directory, RAID configuration, and automated backup. We also handle scheduled health checks, patch management, and emergency recovery to keep your servers running at peak performance.",
    image:
      "https://res.cloudinary.com/djpfw1goz/image/upload/v1779966895/ChatGPT_Image_May_28_2026_04_44_36_PM_oktii8.png",
    stats: [
      { value: "48TB", label: "Storage" },
      { value: "RAID 0/1/5", label: "Support" },
      { value: "24/7", label: "Monitoring" },
    ],
    bgWord: "SERVERS",
  },

  // ------------------------------------------------------------
  // 4. ACCESS — Smart Access Control
  // ------------------------------------------------------------
  {
    label: "ACCESS",
    title: "Smart Access Control",
    subtitle: "Biometric, RFID & Smart Lock Systems",
    description:
      "Modern access management for offices, data centers, and facilities — biometric fingerprint, RFID card, and smart lock systems. We integrate with your existing network, configure user permissions, and connect to attendance or time-tracking software.",
    image:
      "https://res.cloudinary.com/djpfw1goz/image/upload/v1779902875/ChatGPT_Image_May_27_2026_10_57_42_PM_zalxou.png",
    stats: [
      { value: "99.9%", label: "Accuracy" },
      { value: "0.3s", label: "Response" },
      { value: "500+", label: "Users" },
    ],
    bgWord: "ACCESS",
  },

  // ------------------------------------------------------------
  // 5. NETWORK — Full Network Engineering & Maintenance
  // ------------------------------------------------------------
  {
    label: "NETWORK",
    title: "Networking Systems",
    subtitle: "Design, Setup & Daily Maintenance",
    description:
      "Full lifecycle network engineering — router, switch, and firewall configuration; VLAN segmentation; VPN tunnels; structured cabling; and WiFi optimization. We also handle daily troubleshooting: slow internet, IP conflicts, DNS failures, printer sharing, and dropped connections.",
    image:
      "https://res.cloudinary.com/djpfw1goz/image/upload/v1779966895/ChatGPT_Image_May_28_2026_04_44_36_PM_oktii8.png",
    stats: [
      { value: "10GbE", label: "Backbone" },
      { value: "L3", label: "Switching" },
      { value: "99.99%", label: "Uptime" },
    ],
    bgWord: "NETWORK",
  },

  // ------------------------------------------------------------
  // 6. SECURITY — Cybersecurity & Firewall Management
  // ------------------------------------------------------------
  {
    label: "SECURITY",
    title: "Cybersecurity",
    subtitle: "Firewall, Threat Detection & Protection",
    description:
      "Protect your network with enterprise firewalls, intrusion detection, endpoint security, and regular vulnerability assessments. We handle firewall rule management, malware removal, and proactive threat monitoring — all managed by our certified security team.",
    image:
      "https://res.cloudinary.com/djpfw1goz/image/upload/v1779902875/ChatGPT_Image_May_27_2026_10_57_42_PM_zalxou.png",
    stats: [
      { value: "24/7", label: "Threat Watch" },
      { value: "0-Day", label: "Protection" },
      { value: "100%", label: "Encrypted" },
    ],
    bgWord: "SECURITY",
  },

  // ------------------------------------------------------------
  // 7. DATA — Data Recovery & Backup
  // ------------------------------------------------------------
  {
    label: "DATA",
    title: "Data Recovery & Backup",
    subtitle: "Emergency Recovery & Automated Backup",
    description:
      "Emergency recovery from crashed hard drives, corrupted RAID arrays, and failed SSDs — with high success rates and complete confidentiality. We also deploy automated cloud and onsite backup systems so your business is never at risk again.",
    image:
      "https://res.cloudinary.com/djpfw1goz/image/upload/v1779966895/ChatGPT_Image_May_28_2026_04_44_36_PM_oktii8.png",
    stats: [
      { value: "98%", label: "Recovery Rate" },
      { value: "RAID", label: "Expertise" },
      { value: "Cloud", label: "Backup Ready" },
    ],
    bgWord: "DATA",
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
        <div className="flex overflow-x-auto">
          {services.map((s, i) => (
            <button
              key={s.label}
              onClick={() => setActiveIndex(i)}
              className={`flex-1 min-w-[100px] py-5 text-sm font-medium transition-all duration-300 relative whitespace-nowrap ${
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
          <div className="relative w-full h-full">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={
                  typeof active.image === "string"
                    ? active.image
                    : active.image.src
                }
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative w-full h-full"
              >
                <Image
                  src={active.image}
                  alt={active.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 700px"
                  priority={activeIndex === 0}
                />
              </motion.div>
            </AnimatePresence>
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