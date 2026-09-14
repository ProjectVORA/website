"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

interface ProductButtonProps {
  text: string;
  onHover: () => void;
}

export default function ProductButton({
  text,
  onHover,
}: ProductButtonProps) {
  const xTo = useRef<any>(null);
  const yTo = useRef<any>(null);

  const buttonRef = useRef<HTMLButtonElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(() => {
    xTo.current = gsap.quickTo(blobRef.current, "x", {
      duration: 0.6,
      ease: "power3",
    });

    yTo.current = gsap.quickTo(blobRef.current, "y", {
      duration: 0.6,
      ease: "power3",
    });

    gsap.set(blobRef.current, {
      scale: 0,
      xPercent: -50,
      yPercent: -50,
    });
  }, { scope: buttonRef });

  const handleMouseEnter = contextSafe(() => {
    onHover();

    gsap.to(blobRef.current, {
      scale: 1,
      duration: 0.35,
      ease: "power3.out",
    });
  });

  const handleMouseLeave = contextSafe(() => {
    gsap.to(blobRef.current, {
      scale: 0,
      duration: 0.35,
      ease: "power3.out",
    });
  });

  const handleMouseMove = contextSafe(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();

      xTo.current(e.clientX - rect.left);
      yTo.current(e.clientY - rect.top);
    }
  );

  return (
    <button
      ref={buttonRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className="
        group
        relative
        overflow-hidden
        px-6
        py-3
        rounded-full
        border
        border-black/10
        text-black/40
        hover:text-white
        transition-colors
        duration-500
      "
    >
      {/* LIQUID BG */}
      <div
        ref={blobRef}
        className="
          absolute
          top-0
          left-0
          w-[180px]
          h-[180px]
          rounded-full
          bg-lime-500
          pointer-events-none
          -z-10
        "
      />

      {/* TEXT */}
      <span
        className="
          relative
          z-10
          text-lg
          md:text-xl
          font-semibold
          tracking-[0.16em]
          uppercase
          mix-blend-difference
        "
      >
        {text}
      </span>
    </button>
  );
}