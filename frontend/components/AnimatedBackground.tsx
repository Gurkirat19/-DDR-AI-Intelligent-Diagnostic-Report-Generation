"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedBackground() {
  const { scrollYProgress } = useScroll();
  const [maxTilt, setMaxTilt] = useState(12);

  useEffect(() => {
    const resize = () => {
      setMaxTilt(window.innerWidth < 768 ? 6 : 12);
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const tiltX = useTransform(scrollYProgress, [0, 1], [0, maxTilt]);
  const tiltY = useTransform(scrollYProgress, [0, 1], [0, -maxTilt]);

  const depthLayers = [
    {
      bg: "radial-gradient(ellipse at center, rgba(59,130,246,0.35), transparent 55%)",
      size: 580,
      blur: 120,
      animate: { x: [-20, 20, -10], y: [-15, -5, -12], rotateZ: [0, 10, -10] },
      duration: 18,
      delay: 0,
    },
    {
      bg: "radial-gradient(ellipse at center, rgba(94,234,212,0.28), transparent 58%)",
      size: 460,
      blur: 110,
      animate: { x: [15, -25, 10], y: [20, 0, 16], rotateZ: [5, -8, 6] },
      duration: 20,
      delay: 1.5,
    },
    {
      bg: "radial-gradient(ellipse at center, rgba(139,92,246,0.3), transparent 60%)",
      size: 520,
      blur: 130,
      animate: { x: [-10, 18, -22], y: [0, -18, 12], rotateZ: [-6, 8, -4] },
      duration: 22,
      delay: 0.8,
    },
  ];

  return (
    <motion.div className="mesh-bg" style={{ rotateX: tiltX, rotateY: tiltY, perspective: 1200 }}>
      {depthLayers.map((layer, idx) => (
        <motion.div
          key={idx}
          className="absolute rounded-full"
          style={{
            width: layer.size,
            height: layer.size,
            left: "50%",
            top: "50%",
            marginLeft: -layer.size / 2,
            marginTop: -layer.size / 2,
            background: layer.bg,
            filter: `blur(${layer.blur}px)`,
            opacity: 0.75,
            mixBlendMode: "screen",
          }}
          animate={layer.animate}
          transition={{ duration: layer.duration, repeat: Infinity, ease: "easeInOut", delay: layer.delay, repeatType: "mirror" }}
        />
      ))}

      <motion.div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(59,130,246,0.12) 0%, transparent 35%, rgba(94,234,212,0.08) 70%, transparent 100%)",
          mixBlendMode: "screen",
        }}
        animate={{ opacity: [0.4, 0.7, 0.45], x: [-10, 10, -6] }}
        transition={{ duration: 16, repeat: Infinity, repeatType: "mirror" }}
      />

      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}
      />
      
      {/* Stars / particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.1,
          }}
          animate={{
            opacity: [0.1, 0.6, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </motion.div>
  );
}
