"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import React, { useCallback, useEffect, useState } from "react";

interface MagicCardProps
  extends Omit<HTMLMotionProps<"div">, "ref" | "children"> {
  gradientSize?: number;
  gradientColor?: string;
  gradientOpacity?: number;
  children?: React.ReactNode;
}

export const MagicCard = React.forwardRef<HTMLDivElement, MagicCardProps>(
  (
    {
      children,
      className,
      gradientSize = 200,
      gradientColor = "#262626",
      gradientOpacity = 0.8,
      ...props
    },
    ref
  ) => {
    const childrenNode = children as React.ReactNode;
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      },
      []
    );

    return (
      <motion.div
        ref={ref}
        className={cn(
          "group relative overflow-hidden rounded-xl border bg-background p-6",
          className
        )}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        {...props}
      >
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(${gradientSize}px circle at ${mousePosition.x}px ${mousePosition.y}px, ${gradientColor}, transparent 40%)`,
            opacity: isHovering ? gradientOpacity : 0,
          }}
        />
        <div className="relative z-10">{childrenNode}</div>
      </motion.div>
    );
  }
);

MagicCard.displayName = "MagicCard";
