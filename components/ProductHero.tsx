
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import ParticleSwarm from "./ParticleSwarm";

interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  image: string;
}

interface Props {
  products: Product[];
}

export default function ProductHero({ products }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const centerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const orderedProducts = useMemo(() => {
    const result = [...products];

    while (result[2]?.name !== products[activeIndex].name) {
      result.push(result.shift()!);
    }

    return result;
  }, [activeIndex, products]);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      centerRef.current,
      {
        y: 500,
        opacity: 0,
        scale: 0.7,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power4.out",
      }
    );

    tl.to(
      cardsRef.current,
      {
        opacity: 1,
        duration: 0.8,
        stagger: 0.08,
        onComplete: () => {
          setExpanded(true);
        },
      },
      "-=0.5"
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev === products.length - 1 ? 0 : prev + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [products.length]);

  const getScale = (index: number) => {
    const center = 2;

    const distance = Math.abs(index - center);

    if (distance === 0) return 1;
    if (distance === 1) return 0.78;

    return 0.62;
  };

  const getOpacity = (index: number) => {
    const center = 2;

    const distance = Math.abs(index - center);

    if (distance === 0) return 1;
    if (distance === 1) return 0.8;

    return 0.55;
  };

  return (
    <section className="relative min-h-[160vh] overflow-hidden bg-black">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c5243] via-white to-white" />

      {/* Emerald Glow */}
    
      {/* Noise */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "url('https://grainy-gradients.vercel.app/noise.svg')",
        }}
      />

      {/* Hero Text */}
      <div className="relative z-20 flex flex-col items-center pt-24 text-center">
        <div className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-black backdrop-blur-xl">
          ENTERPRISE SECURITY
        </div>

        <h1 className="mt-8 max-w-6xl text-5xl font-extralight leading-[0.9] text-black md:text-7xl lg:text-[120px]">
          Future Of Smart
          <br />
          Infrastructure
        </h1>

        <p className="mt-8 max-w-2xl text-lg text-black/70 md:text-xl">
          Advanced surveillance, networking and enterprise solutions
          designed for modern businesses.
        </p>

        <div className="mt-10 flex gap-4">
          <button className="rounded-full bg-[#00E0B8] px-8 py-4 font-semibold text-black">
            BOOK A CALL
          </button>

          <button className="rounded-full border border-white/10 bg-white/5 px-8 py-4 text-black backdrop-blur-xl">
            OUR SERVICES
          </button>
        </div>
      </div>

     {/* <ParticleSwarm />   */}
   
    </section>
  );
}

