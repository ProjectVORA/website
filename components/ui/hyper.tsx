// components/ui/hyper-simple.tsx
'use client';

import { useEffect, useRef } from 'react';

export default function HyperspeedSimple() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    
    interface Star {
      x: number;
      y: number;
      z: number;
    }
    
    let stars: Star[] = [];
    
    const initStars = () => {
      stars = [];
      for (let i = 0; i < 300; i++) {
        stars.push({
          x: Math.random() * 800 - 400,
          y: Math.random() * 600 - 300,
          z: Math.random() * 1000
        });
      }
    };
    
    const resize = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    
    const draw = () => {
      if (!ctx || !canvas) return;
      
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0a0a2a');
      gradient.addColorStop(1, '#1a1a4a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      stars.forEach((star) => {
        star.z -= 8;
        
        if (star.z <= 0) {
          star.z = 1000;
          star.x = Math.random() * 800 - 400;
          star.y = Math.random() * 600 - 300;
        }
        
        const x = centerX + (star.x / star.z) * 300;
        const y = centerY + (star.y / star.z) * 300;
        const size = (1 - star.z / 1000) * 3;
        const alpha = (1 - star.z / 1000);
        
        if (x > 0 && x < canvas.width && y > 0 && y < canvas.height) {
          ctx.fillStyle = `rgba(100, 150, 255, ${alpha})`;
          ctx.fillRect(x, y, size, size);
        }
      });
      
      animationId = requestAnimationFrame(draw);
    };
    
    initStars();
    resize();
    draw();
    
    window.addEventListener('resize', resize);
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="w-full h-full absolute inset-0" />;
}