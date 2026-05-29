"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
  className?: string;
}

export default function SpotlightCard({
  children,
  spotlightColor = "rgba(124, 58, 237, 0.15)",
  className = "",
  ...props
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const { left, top } = cardRef.current.getBoundingClientRect();
    setMouseX(e.clientX - left);
    setMouseY(e.clientY - top);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-2xl glass transition-colors duration-300 ${className}`}
      {...props}
    >
      {/* Moving spotlight mask */}
      <motion.div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(450px circle at ${mouseX}px ${mouseY}px, ${spotlightColor}, transparent 80%)`,
        }}
      />

      {/* Inner card border light glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-2xl"
        style={{
          opacity: isHovered ? 0.6 : 0.1,
          border: "1px solid rgba(255, 255, 255, 0.2)",
          background: `radial-gradient(120px circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.25), transparent 60%)`,
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
