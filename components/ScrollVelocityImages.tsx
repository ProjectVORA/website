"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/* =========================
   SECURITY PRODUCTS
========================= */

const securityProducts = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/djpfw1goz/image/upload/v1779800463/ChatGPT_Image_May_26_2026_05_09_19_PM_sh1m0i.png",
    width: "w-[140px] md:w-[55px]",
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/djpfw1goz/image/upload/v1779804603/ChatGPT_Image_May_26_2026_07_39_45_PM_w5hfop.png",
    width: "w-[160px] md:w-[75px]",
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/djpfw1goz/image/upload/v1779880769/ChatGPT_Image_May_27_2026_04_48_44_PM_objrad.png",
    width: "w-[120px] md:w-[90px]",
  },
   {
    id: 4,
    image:
      "https://res.cloudinary.com/djpfw1goz/image/upload/v1779883069/ChatGPT_Image_May_27_2026_05_26_47_PM_cxnxws.png",
    width: "w-[120px] md:w-[95px]",
  },
   {
    id: 5,
    image:
      "https://res.cloudinary.com/djpfw1goz/image/upload/v1779883287/ChatGPT_Image_May_27_2026_05_31_09_PM_pf4d66.png",
    width: "w-[120px] md:w-[95px]",
  },
];

/* =========================
   NETWORK PRODUCTS
========================= */

const networkProducts = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/djpfw1goz/image/upload/v1779802035/ChatGPT_Image_May_26_2026_06_57_04_PM_gxrh8c.png",
    width: "w-[180px] md:w-[90px]",
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/djpfw1goz/image/upload/v1779883604/ChatGPT_Image_May_27_2026_05_36_28_PM_lt6mdo.png",
    width: "w-[160px] md:w-[90px]",
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/djpfw1goz/image/upload/v1779880903/ChatGPT_Image_May_27_2026_04_51_32_PM_zmkc5z.png",
    width: "w-[190px] md:w-[90px]",
  },
];

/* =========================
   COMMUNICATION PRODUCTS
========================= */

const communicationProducts = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/djpfw1goz/image/upload/v1779802177/ChatGPT_Image_May_26_2026_06_59_22_PM_tqa7do.png",
    width: "w-[130px] md:w-[130px]",
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/djpfw1goz/image/upload/v1779804911/ChatGPT_Image_May_26_2026_07_44_58_PM_pkjzrz.png",
    width: "w-[120px] md:w-[130px]",
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/djpfw1goz/image/upload/v1779883656/ChatGPT_Image_May_27_2026_05_37_25_PM_dvhk6m.png",
    width: "w-[140px] md:w-[130px]",
  },
];

/* =========================
   PRODUCT LANE COMPONENT
========================= */

function ProductLane({
  items,
  velocity,
  gap = "gap-32",
}: {
  items: {
    id: number;
    image: string;
    width: string;
  }[];
  velocity: number;
  gap?: string;
}) {
  return (
    <motion.div
      initial={{
        x: velocity > 0 ? "-35%" : "0%",
      }}
      animate={{
        x: velocity > 0 ? "0%" : "-35%",
      }}
      transition={{
        duration: Math.abs(velocity) / 10,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "linear",
      }}
      className={`flex items-center ${gap}`}
    >
      {[...items, ...items, ...items, ...items].map((item, index) => (
        <motion.div
          key={index}
          whileHover={{
            scale: 1.08,
            y: -10,
          }}
          transition={{
            duration: 0.3,
          }}
          className={`relative shrink-0 ${item.width}`}
        >
          <div className="relative">

            {/* SHADOW */}
           

            {/* PRODUCT */}
            <div className="relative z-10 aspect-[8/8] rotate-[14deg]">
              <Image
                src={item.image}
                alt="product"
                fill
                className="object-contain "
              />
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* =========================
   MAIN COMPONENT
========================= */

export default function PremiumDiagonalVelocity() {
  return (
    <section className="relative h-screen overflow-hidden bg-white">

 
      {/* HERO CONTENT */}
      <div className="relative z-30 px-8 pt-16 md:px-20">

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-black  text-black"
        >
          All Your Network Needs, In One Place
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 1.2 }}
          className="mt-6 max-w-[560px] text-lg md:text-2xl leading-relaxed text-gray-600"
        >
           Smart network solutions for security, communication, and seamless
  connectivity — all designed to keep your business secure and connected.  </motion.p>
      </div>

      {/* DIAGONAL MOTION AREA */}
      <div className="absolute inset-0 pt-[280px] flex flex-col gap-10 rotate-[-14deg] scale-150 bg-transparent">

        {/* SECURITY */}
        <div className="overflow-hidden py-1 bg-transparent">
          <ProductLane
            items={securityProducts}
            velocity={120}
            gap="gap-24"
          />
        </div>

        {/* NETWORK */}
        <div className="overflow-hidden py-1 ml-[-10%] bg-transparent">
          <ProductLane
            items={networkProducts}
            velocity={-150}
            gap="gap-32"
          />
        </div>

        {/* COMMUNICATION */}
        <div className="overflow-hidden py-1 bg-transparent">
          <ProductLane
            items={communicationProducts}
            velocity={180}
            gap="gap-20"
          />
        </div>
      </div>
    </section>
  );
}
