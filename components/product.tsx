"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useState, useEffect } from "react";
import ProductButton from "./ProductButton";

interface Product {
  name: string;
  model: string;
  description: string;
  leftFeatures: string[];
  rightFeatures: string[];
  size: string;
  images: string[];
}

const products: Product[] = [
  {
    name: "CCTV Camera",
    model: "DS-2CD2T47G2H-LI",
    description:
      "Professional outdoor surveillance camera with ColorVu technology for 24/7 full-color monitoring.",
    leftFeatures: ["4MP Resolution", "IP67 Waterproof"],
    rightFeatures: ["ColorVu Technology", "Human Detection", "Smart Tracking"],
    size: "w-[440px] md:w-[600px]",
    images: [
      "https://assets.hikvision.com/prd/normal/all/image/sm000094493/%E5%8F%8C%E5%85%89%E5%8D%8A%E7%90%8361---%E5%9F%BA%E7%BA%BF---%E5%B7%A6%E4%BE%A7-1.png?eo-img.format=webp",
      "https://assets.hikvision.com/prd/normal/all/image/sm000094493/%E5%8F%8C%E5%85%89%E5%8D%8A%E7%90%8361---%E5%9F%BA%E7%BA%BF---%E6%AD%A3%E9%9D%A2.png?eo-img.format=webp",
      "https://assets.hikvision.com/prd/normal/all/image/sm000094493/%E5%8F%8C%E5%85%89%E5%8D%8A%E7%90%8361---%E5%9F%BA%E7%BA%BF---%E5%8F%B3%E4%BE%A7.png?eo-img.format=webp",
    ],
  },
  {
    name: "Wireless Router",
    model: "AX-6000 Pro",
    description:
      "Dual-band WiFi 6 router with OFDMA and MU-MIMO for ultra-fast, reliable connectivity.",
    leftFeatures: ["AX6000 Speed", "6 Spatial Streams"],
    rightFeatures: ["OFDMA", "160MHz Channel", "WPA3 Security"],
    size: "w-[1020px] md:w-[1100px]",
    images: [
      "https://assets.hikvision.com/prd/normal/all/image/m000164028/%E5%8F%B3%E8%A7%86%E5%9B%BE.png?eo-img.format=webp",
      "https://assets.hikvision.com/prd/normal/all/image/m000164028/%E4%B8%BB%E8%A7%86%E5%9B%BE2.png?eo-img.format=webp",
      "https://assets.hikvision.com/prd/normal/all/image/m000164028/%E8%83%8C%E8%A7%86%E5%9B%BE.png?eo-img.format=webp",
      "https://assets.hikvision.com/prd/normal/all/image/m000164028/%E4%BF%AF%E8%A7%86%E5%9B%BE.png?eo-img.format=webp",
    ],
  },
  {
    name: "Commercial Monitor",
    model: "DS-D5022FL-B",
    description:
      "Ultra-slim commercial display with 4K UHD resolution for professional signage and presentations.",
    leftFeatures: ["4K UHD Display", "Ultra-slim Design"],
    rightFeatures: ["HDR Support", "Built-in Speakers", "VESA Mountable"],
    size: "w-[880px] md:w-[1100px]",
    images: [
      "https://assets.hikvision.com/prd/normal/all/image/m000169550/%E6%AD%A3%E5%B7%A6%E8%A7%86%E5%9B%BE1.png?eo-img.format=webp",
      "https://assets.hikvision.com/prd/normal/all/image/m000169550/27%E6%AD%A3%E8%A7%86%E5%9B%BE.png?eo-img.format=webp",
      "https://assets.hikvision.com/prd/normal/all/image/m000169550/%E6%AD%A3%E5%8F%B3%E8%A7%86%E5%9B%BE1.png?eo-img.format=webp",
    ],
  },
  {
    name: "Servers",
    model: "DS-A71048R",
    description:
      "High-density storage server with hot-swappable drives for enterprise data management.",
    leftFeatures: ["48TB Storage", "Hot-swappable Drives"],
    rightFeatures: ["RAID Support", "Dual PSU", "Remote Management"],
    size: "w-[760px] md:w-[940px]",
    images: [
      "https://assets.hikvision.com/prd/normal/all/image/m000079320/HD-Picture-left-view.png?eo-img.format=webp",
      "https://assets.hikvision.com/prd/normal/all/image/m000079320/HD-Picture-front-view.png?eo-img.format=webp",
      "https://assets.hikvision.com/prd/normal/all/image/m000079320/HD-Picture-right-view.png?eo-img.format=webp",
    ],
  },
  {
    name: "Router",
    model: "ER-7208G",
    description:
      "Enterprise-grade wired router with advanced QoS and VPN support for secure networks.",
    leftFeatures: ["8 Gigabit Ports", "VPN Support"],
    rightFeatures: ["Advanced QoS", "VLAN Support", "SPI Firewall"],
    size: "w-[320px] md:w-[480px]",
    images: [
      "https://assets.hikvision.com/prd/normal/all/image/m000174776/%E5%8F%B3%E8%A7%86%E5%9B%BE.png?eo-img.format=webp",
      "https://assets.hikvision.com/prd/normal/all/image/m000174776/%E6%AD%A3%E9%9D%A2.png?eo-img.format=webp",
      "https://assets.hikvision.com/prd/normal/all/image/m000174776/%E5%B7%A6%E8%A7%86%E5%9B%BE.png?eo-img.format=webp",
      "https://assets.hikvision.com/prd/normal/all/image/m000174776/%E5%90%8E%E9%9D%A2.png?eo-img.format=webp",
    ],
  },
];

const panelVariants: Variants = {
  hidden: (dir: unknown) => ({
    x: dir === "left" ? -50 : 50,
    opacity: 0,
  }),
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const imageVariants: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const featureItemVariants: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i: unknown) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.4 + (i as number) * 0.1, duration: 0.4 },
  }),
};

export default function ProductSection() {
  const [activeProduct, setActiveProduct] = useState(products[0]);
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prev) =>
        prev === activeProduct.images.length - 1 ? 0 : prev + 1
      );
    }, 2200);
    return () => clearInterval(interval);
  }, [activeProduct]);

  // Preload next image to prevent flicker
  const nextFrame = currentFrame === activeProduct.images.length - 1 ? 0 : currentFrame + 1;
  const nextImage = activeProduct.images[nextFrame];

  return (
    <section className="relative min-h-[120vh] bg-white overflow-hidden flex flex-col justify-end">
      {/* BACKGROUND GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-white to-white" />

      {/* HEADLINE */}
      <div className="relative z-10 pt-16 px-6 max-w-9xl mx-auto w-full">
        <div className="flex flex-col items-start text-left">
          <span className="inline-flex rounded-full border border-gray-200 bg-white px-4 py-1.5 text-xs font-semibold text-emerald-600">
            Product Showcase
          </span>
          <h2 className="mt-4 text-4xl md:text-8xl font-extralight text-gray-900">
            Featured Products
          </h2>
          <p className="mt-2 max-w-xl text-sm text-emerald-600 font-medium">
            Explore our range of enterprise-grade networking and security devices.
          </p>
        </div>
      </div>

      {/* CENTER STAGE */}
      <div className="relative flex-1 flex items-center justify-center px-6 py-12 md:py-28">
        <div className="max-w-9xl ">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProduct.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center"
            >
              {/* LEFT PANEL */}
              <motion.div
                key={`left-${activeProduct.name}`}
                custom="left"
                variants={panelVariants}
                initial="hidden"
                animate="visible"
                className="order-2 md:order-1 lg:order-1 text-center md:text-center lg:text-left"
              >
                <span className="inline-block text-[10px] font-extralight tracking-[0.2em] uppercase text-emerald-600 mb-3">
                  Featured Product
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight text-gray-900 leading-tight">
                  {activeProduct.name}
                </h2>
                <p className="mt-4 text-sm md:text-base text-gray-500 leading-relaxed max-w-sm mx-auto lg:mx-0">
                  {activeProduct.description}
                </p>

                {/* LEFT FEATURES */}
                <ul className="mt-6 space-y-2 max-w-xs mx-auto lg:mx-0">
                  {activeProduct.leftFeatures.map((f, i) => (
                    <motion.li
                      key={f}
                      custom={i}
                      variants={featureItemVariants}
                      initial="hidden"
                      animate="visible"
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <svg
                        className="h-4 w-4 shrink-0 text-emerald-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {f}
                    </motion.li>
                  ))}
                </ul>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.4 }}
                  className="mt-8"
                >
                  <button className="group relative inline-flex items-center gap-2 rounded-full bg-gray-900 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-gray-800 hover:shadow-xl hover:shadow-gray-900/20">
                    Explore Product
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
              </motion.div>

              {/* CENTER — PRODUCT IMAGE */}
              <motion.div
                key={`img-${activeProduct.name}`}
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                className="order-1 md:order-2 lg:order-2 flex items-center justify-center"
              >
                <div className="relative">
                  {/* SOFT SHADOW */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-gray-200/40 to-transparent blur-3xl rounded-full" />

                  {/* FLOATING IMAGE */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative"
                  >
                    {/* Preload next image */}
                    <link rel="prefetch" href={nextImage} />
                    <div className={`relative flex items-center justify-center ${activeProduct.size}`} style={{ minHeight: '300px' }}>
                      <AnimatePresence initial={false}>
                        <motion.img
                          key={activeProduct.images[currentFrame]}
                          src={activeProduct.images[currentFrame]}
                          alt=""
                          className="absolute inset-0 w-full h-full object-contain"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                        />
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* RIGHT PANEL */}
              <motion.div
                key={`right-${activeProduct.name}`}
                custom="right"
                variants={panelVariants}
                initial="hidden"
                animate="visible"
                className="order-3 text-center md:text-center lg:text-right lg:flex lg:flex-col lg:items-end"
              >
                <span className="text-[40px] font-extralight tracking-[0.2em] uppercase text-gray-400 mb-2 block">
                  Model
                </span>
                <p className="text-lg md:text-6xl font-extralight text-gray-900 tracking-tight">
                  {activeProduct.model}
                </p>

                {/* DIVIDER */}
                <div className="my-5 w-12 h-0.5 bg-gray-200 rounded-full mx-auto lg:mx-0 lg:ml-auto" />

                {/* RIGHT FEATURES */}
                <ul className="space-y-2 lg:text-right">
                  {activeProduct.rightFeatures.map((f, i) => (
                    <motion.li
                      key={f}
                      custom={i}
                      variants={featureItemVariants}
                      initial="hidden"
                      animate="visible"
                      className="flex items-center gap-2 text-sm text-gray-700 lg:flex-row-reverse"
                    >
                      <svg
                        className="h-4 w-4 shrink-0 text-emerald-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {f}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="relative border-t border-gray-100" />

      {/* PRODUCT NAVIGATION */}
      <div className="relative z-50 py-10 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-6">
            {products.map((product, index) => (
              <ProductButton
                key={index}
                text={product.name}
                onHover={() => {
                  setActiveProduct(product);
                  setCurrentFrame(0);
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
