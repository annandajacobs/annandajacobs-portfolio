"use client";

import { useEffect, useRef } from "react";
import "./StarryBackground.css";

export default function StarryBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let time = 0;
    let mouseX = 0;
    let mouseY = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const bioParticles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 4 + 2,
      baseSize: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.2,
      pulseSpeed: Math.random() * 0.02 + 0.01,
      pulseOffset: Math.random() * Math.PI * 2,
      hue: Math.random() > 0.7 ? 45 : 180 + Math.random() * 40, // Gold or cyan/teal
      drift: Math.random() * 0.5 + 0.2,
    }));

    const sediment = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.3,
      speedY: Math.random() * 0.15 + 0.05,
      speedX: (Math.random() - 0.5) * 0.1,
      opacity: Math.random() * 0.3 + 0.1,
      wobble: Math.random() * Math.PI * 2,
    }));

    const currentLayers = Array.from({ length: 5 }, (_, i) => ({
      offset: i * 0.2,
      speed: 0.3 + i * 0.1,
      amplitude: 30 + i * 15,
      wavelength: 0.003 - i * 0.0005,
      opacity: 0.08 - i * 0.01,
    }));

    const causticRays = Array.from({ length: 8 }, () => ({
      x: Math.random() * canvas.width,
      width: Math.random() * 150 + 80,
      speed: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.06 + 0.02,
      wobbleSpeed: Math.random() * 0.01 + 0.005,
      wobbleAmount: Math.random() * 50 + 20,
    }));

    const bubbles = Array.from({ length: 25 }, () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + Math.random() * 200,
      size: Math.random() * 6 + 2,
      speed: Math.random() * 0.8 + 0.4,
      wobbleSpeed: Math.random() * 0.03 + 0.01,
      wobbleAmount: Math.random() * 30 + 15,
      opacity: Math.random() * 0.4 + 0.2,
    }));

    const deepSwirls = Array.from({ length: 6 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 300 + 150,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.005,
      driftX: (Math.random() - 0.5) * 0.2,
      driftY: (Math.random() - 0.5) * 0.15,
    }));

    const drawDeepSeaBackground = () => {
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#0a1a2e");
      gradient.addColorStop(0.3, "#071525");
      gradient.addColorStop(0.6, "#05101c");
      gradient.addColorStop(1, "#020810");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const drawCausticRays = () => {
      ctx.save();
      
      causticRays.forEach((ray) => {
        ray.x += ray.speed;
        if (ray.x > canvas.width + ray.width) {
          ray.x = -ray.width;
        }

        const wobble = Math.sin(time * ray.wobbleSpeed * 60) * ray.wobbleAmount;
        const x = ray.x + wobble + mouseX * 20;

        const gradient = ctx.createLinearGradient(x, 0, x, canvas.height);
        gradient.addColorStop(0, `rgba(100, 180, 220, ${ray.opacity})`);
        gradient.addColorStop(0.3, `rgba(80, 150, 200, ${ray.opacity * 0.6})`);
        gradient.addColorStop(0.7, `rgba(40, 100, 150, ${ray.opacity * 0.2})`);
        gradient.addColorStop(1, "transparent");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(x - ray.width / 2, 0);
        ctx.lineTo(x + ray.width / 2, 0);
        ctx.lineTo(x + ray.width * 0.8 + wobble * 0.5, canvas.height);
        ctx.lineTo(x - ray.width * 0.3 + wobble * 0.5, canvas.height);
        ctx.closePath();
        ctx.fill();
      });

      ctx.restore();
    };

    const drawWaterCurrents = () => {
      ctx.save();

      currentLayers.forEach((layer) => {
        ctx.globalAlpha = layer.opacity;
        ctx.strokeStyle = "#2a5a7a";
        ctx.lineWidth = 2;

        for (let y = 0; y < canvas.height; y += 60) {
          ctx.beginPath();
          
          for (let x = 0; x < canvas.width; x += 5) {
            const wave = Math.sin(
              x * layer.wavelength + 
              time * layer.speed + 
              y * 0.01 + 
              layer.offset
            ) * layer.amplitude;
            
            const py = y + wave + mouseY * 10;
            
            if (x === 0) {
              ctx.moveTo(x, py);
            } else {
              ctx.lineTo(x, py);
            }
          }
          
          ctx.stroke();
        }
      });

      ctx.restore();
    };

    const drawDeepSwirls = () => {
      ctx.save();

      deepSwirls.forEach((swirl) => {
        swirl.rotation += swirl.rotationSpeed;
        swirl.x += swirl.driftX;
        swirl.y += swirl.driftY;

        if (swirl.x < -swirl.radius) swirl.x = canvas.width + swirl.radius;
        if (swirl.x > canvas.width + swirl.radius) swirl.x = -swirl.radius;
        if (swirl.y < -swirl.radius) swirl.y = canvas.height + swirl.radius;
        if (swirl.y > canvas.height + swirl.radius) swirl.y = -swirl.radius;

        const parallaxX = mouseX * 30;
        const parallaxY = mouseY * 30;

        ctx.globalAlpha = 0.04;
        ctx.strokeStyle = "#3a7a9a";
        ctx.lineWidth = 3;

        for (let arm = 0; arm < 3; arm++) {
          ctx.beginPath();
          for (let i = 0; i < 80; i++) {
            const t = i / 80;
            const angle = swirl.rotation + arm * (Math.PI * 2 / 3) + t * Math.PI * 4;
            const r = swirl.radius * t;
            const px = swirl.x + parallaxX + Math.cos(angle) * r;
            const py = swirl.y + parallaxY + Math.sin(angle) * r;
            
            if (i === 0) {
              ctx.moveTo(px, py);
            } else {
              ctx.lineTo(px, py);
            }
          }
          ctx.stroke();
        }

        ctx.globalAlpha = 0.03;
        const gradient = ctx.createRadialGradient(
          swirl.x + parallaxX,
          swirl.y + parallaxY,
          0,
          swirl.x + parallaxX,
          swirl.y + parallaxY,
          swirl.radius * 0.6
        );
        gradient.addColorStop(0, "#4a9aba");
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(swirl.x + parallaxX, swirl.y + parallaxY, swirl.radius * 0.6, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
    };

    const drawSediment = () => {
      ctx.save();

      sediment.forEach((particle) => {
        particle.y -= particle.speedY;
        particle.x += particle.speedX + Math.sin(time * 0.5 + particle.wobble) * 0.3;
        particle.wobble += 0.01;

        if (particle.y < -10) {
          particle.y = canvas.height + 10;
          particle.x = Math.random() * canvas.width;
        }
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;

        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = "#6a8a9a";
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
    };

    const drawBubbles = () => {
      ctx.save();

      bubbles.forEach((bubble) => {
        bubble.y -= bubble.speed;
        bubble.x += Math.sin(time * bubble.wobbleSpeed * 60 + bubble.y * 0.02) * 0.5;

        if (bubble.y < -bubble.size * 2) {
          bubble.y = canvas.height + bubble.size * 2;
          bubble.x = Math.random() * canvas.width;
        }

        ctx.globalAlpha = bubble.opacity * 0.3;
        ctx.strokeStyle = "#8ac4e4";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(bubble.x, bubble.y, bubble.size, 0, Math.PI * 2);
        ctx.stroke();

        ctx.globalAlpha = bubble.opacity * 0.6;
        ctx.fillStyle = "#aadcf4";
        ctx.beginPath();
        ctx.arc(
          bubble.x - bubble.size * 0.3,
          bubble.y - bubble.size * 0.3,
          bubble.size * 0.25,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });

      ctx.restore();
    };

    const drawBioParticles = () => {
      ctx.save();

      bioParticles.forEach((particle) => {
        const driftX = Math.sin(time * 0.3 + particle.pulseOffset) * particle.drift;
        const driftY = Math.cos(time * 0.25 + particle.pulseOffset * 1.3) * particle.drift * 0.7;
        
        particle.x += particle.speedX + driftX * 0.1;
        particle.y += particle.speedY + driftY * 0.1;

        if (particle.x < -20) particle.x = canvas.width + 20;
        if (particle.x > canvas.width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = canvas.height + 20;
        if (particle.y > canvas.height + 20) particle.y = -20;

        const pulse = Math.sin(time * particle.pulseSpeed * 60 + particle.pulseOffset);
        const brightness = 0.5 + pulse * 0.5;
        const currentSize = particle.baseSize * (0.8 + pulse * 0.4);

        const parallaxX = mouseX * 15;
        const parallaxY = mouseY * 15;
        const displayX = particle.x + parallaxX;
        const displayY = particle.y + parallaxY;

        const outerGlow = ctx.createRadialGradient(
          displayX, displayY, 0,
          displayX, displayY, currentSize * 8
        );
        
        if (particle.hue < 100) {
          outerGlow.addColorStop(0, `rgba(255, 220, 120, ${brightness * 0.3})`);
          outerGlow.addColorStop(0.4, `rgba(255, 180, 80, ${brightness * 0.15})`);
          outerGlow.addColorStop(1, "transparent");
        } else {
          outerGlow.addColorStop(0, `rgba(100, 220, 255, ${brightness * 0.3})`);
          outerGlow.addColorStop(0.4, `rgba(60, 180, 220, ${brightness * 0.15})`);
          outerGlow.addColorStop(1, "transparent");
        }

        ctx.fillStyle = outerGlow;
        ctx.beginPath();
        ctx.arc(displayX, displayY, currentSize * 8, 0, Math.PI * 2);
        ctx.fill();

        const coreGlow = ctx.createRadialGradient(
          displayX, displayY, 0,
          displayX, displayY, currentSize * 2
        );
        
        if (particle.hue < 100) {
          coreGlow.addColorStop(0, `rgba(255, 250, 200, ${brightness})`);
          coreGlow.addColorStop(0.5, `rgba(255, 220, 120, ${brightness * 0.7})`);
          coreGlow.addColorStop(1, "transparent");
        } else {
          coreGlow.addColorStop(0, `rgba(200, 255, 255, ${brightness})`);
          coreGlow.addColorStop(0.5, `rgba(100, 220, 255, ${brightness * 0.7})`);
          coreGlow.addColorStop(1, "transparent");
        }

        ctx.fillStyle = coreGlow;
        ctx.beginPath();
        ctx.arc(displayX, displayY, currentSize * 2, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
    };

    const drawDistantLights = () => {
      ctx.save();
      
      for (let i = 0; i < 40; i++) {
        const x = (i * 97) % canvas.width;
        const y = (i * 131) % canvas.height;
        const twinkle = Math.sin(time * 0.02 * 60 + i * 2) * 0.5 + 0.5;
        
        ctx.globalAlpha = twinkle * 0.3;
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 3);
        gradient.addColorStop(0, "#8ac4e4");
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    const animate = () => {
      time += 0.016;
      
      drawDeepSeaBackground();
      drawCausticRays();
      drawWaterCurrents();
      drawDeepSwirls();
      drawSediment();
      drawDistantLights();
      drawBubbles();
      drawBioParticles();
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="starry-background">
      <canvas ref={canvasRef} className="starry-canvas" />
      <div className="water-overlay" />
      <div className="vignette-overlay" />
    </div>
  );
}
