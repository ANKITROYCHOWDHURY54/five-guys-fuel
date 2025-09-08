"use client";

import React from "react";
import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);
gsap.config({ force3D: true });

interface BurgerLayerProps {
  src: string;
  alt: string;
  className?: string;
}

const BurgerLayer = ({ src, alt, className = "" }: BurgerLayerProps) => (
  <div className={`relative ${className}`} style={{ 
    transformStyle: 'preserve-3d',
    willChange: 'transform' // Optimize for transforms
  }}>
    <img
      src={src}
      alt={alt}
      className="w-full h-auto max-w-md md:max-w-xl lg:max-w-2xl mx-auto block"
      draggable={false}
      style={{
        filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))',
        willChange: 'transform', // Optimize for transforms
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
        imageRendering: 'auto' // Better performance
      }}
    />
  </div>
);

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const bunTopRef = useRef<HTMLDivElement>(null);
  const bunMiddleRef = useRef<HTMLDivElement>(null);
  const bunMiddle2Ref = useRef<HTMLDivElement>(null);
  const bunBottomRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<HTMLDivElement>(null);
  const sparklesTrailRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);
  const burgerGroupRef = useRef<HTMLDivElement>(null);
  const centerGlowRef = useRef<HTMLDivElement>(null);

  // Cached quickSetters for performance
  const sparkleSettersRef = useRef<{
    x: Array<(v: any) => void>;
    y: Array<(v: any) => void>;
    scaleX: Array<(v: any) => void>;
    scaleY: Array<(v: any) => void>;
    opacity: Array<(v: any) => void>;
    rotation: Array<(v: any) => void>;
  } | null>(null);
  const trailSettersRef = useRef<{
    x: Array<(v: any) => void>;
    y: Array<(v: any) => void>;
    scaleX: Array<(v: any) => void>;
    scaleY: Array<(v: any) => void>;
    opacity: Array<(v: any) => void>;
    rotation: Array<(v: any) => void>;
  } | null>(null);
  const starSettersRef = useRef<{
    x: Array<(v: any) => void>;
    y: Array<(v: any) => void>;
    scaleX: Array<(v: any) => void>;
    scaleY: Array<(v: any) => void>;
    opacity: Array<(v: any) => void>;
    rotation: Array<(v: any) => void>;
  } | null>(null);

  // Cached layout metrics for performance
  let heroMaxRadius = 0;
  const computeHeroMetrics = () => {
    const hero = heroRef.current;
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    heroMaxRadius = Math.hypot(rect.width, rect.height) * 0.5;
  };

  useEffect(() => {
    const hero = heroRef.current;
    const bunTop = bunTopRef.current;
    const bunMiddle = bunMiddleRef.current;
    const bunMiddle2 = bunMiddle2Ref.current;
    const bunBottom = bunBottomRef.current;

           if (!hero || !bunTop || !bunMiddle || !bunMiddle2 || !bunBottom) return;

           // Set initial 3D positions and perspective
           gsap.set(hero, {
             perspective: 1000,
           });

           // Remove initial pop-in to keep scroll motion perfectly smooth
           // Test animation to verify GSAP is working
           // gsap.from([bunTop, bunMiddle, bunMiddle2, bunBottom], {
           //   scale: 0.8,
           //   duration: 1,
           //   ease: "power2.out",
           //   stagger: 0.1
           // });

           // Set initial stacked position - burger layers perfectly aligned
           gsap.set([bunTop, bunMiddle, bunMiddle2, bunBottom], {
             y: 0,
             x: 0,
             z: 0,
             rotationX: 0,
             rotationY: 0,
             rotationZ: 0,
             scale: 1,
             transformOrigin: "center center",
           });

           // Ensure perfect initial stacking with slight z-offsets for proper layering
           gsap.set(bunTop, { z: 40 });
           gsap.set(bunMiddle, { z: 30 });
           gsap.set(bunMiddle2, { z: 20 });
           gsap.set(bunBottom, { z: 10 });

           // Sparkles configuration (precomputed for stability and performance)
           const sparkleCount = 24;
           const sparkleAngles: number[] = Array.from({ length: sparkleCount }, (_, i) => (i / sparkleCount) * Math.PI * 2);
           const sparklePhase: number[] = Array.from({ length: sparkleCount }, (_, i) => (i % 2 === 0 ? 0 : Math.PI / 3));
           const sparkleRadiusMax = 180; // maximum radial distance in px (clearer reach)
           const sparklesContainer = sparklesRef.current;
           if (sparklesContainer) {
             // initialize sparkles at center and hidden
             const children = Array.from(sparklesContainer.children) as HTMLElement[];
             children.forEach((el) => {
               gsap.set(el, { x: 0, y: 0, scaleX: 1.1, scaleY: 1.1, opacity: 0, z: 70, transformOrigin: "50% 50%" });
             });
             // build quickSetters
             sparkleSettersRef.current = {
               x: children.map((el) => gsap.quickSetter(el, "x", "px") as unknown as (v: any) => void),
               y: children.map((el) => gsap.quickSetter(el, "y", "px") as unknown as (v: any) => void),
               scaleX: children.map((el) => gsap.quickSetter(el, "scaleX") as unknown as (v: any) => void),
               scaleY: children.map((el) => gsap.quickSetter(el, "scaleY") as unknown as (v: any) => void),
               opacity: children.map((el) => gsap.quickSetter(el, "opacity") as unknown as (v: any) => void),
               rotation: children.map((el) => gsap.quickSetter(el, "rotation") as unknown as (v: any) => void),
             };
           }

           // Initialize trailing sparkles (two per sparkle for layered trail)
           const sparklesTrailContainer = sparklesTrailRef.current;
           if (sparklesTrailContainer) {
             const children = Array.from(sparklesTrailContainer.children) as HTMLElement[];
             children.forEach((el) => {
               gsap.set(el, { x: 0, y: 0, scaleX: 0.9, scaleY: 0.9, opacity: 0, z: 68, transformOrigin: "50% 50%" });
             });
             trailSettersRef.current = {
               x: children.map((el) => gsap.quickSetter(el, "x", "px") as unknown as (v: any) => void),
               y: children.map((el) => gsap.quickSetter(el, "y", "px") as unknown as (v: any) => void),
               scaleX: children.map((el) => gsap.quickSetter(el, "scaleX") as unknown as (v: any) => void),
               scaleY: children.map((el) => gsap.quickSetter(el, "scaleY") as unknown as (v: any) => void),
               opacity: children.map((el) => gsap.quickSetter(el, "opacity") as unknown as (v: any) => void),
               rotation: children.map((el) => gsap.quickSetter(el, "rotation") as unknown as (v: any) => void),
             };
           }

           // Initialize star highlights (a few, larger, more visible)
           const starsContainer = starsRef.current;
           if (starsContainer) {
             const children = Array.from(starsContainer.children) as HTMLElement[];
             children.forEach((el) => {
               gsap.set(el, { x: 0, y: 0, scale: 0.8, opacity: 0, z: 75, transformOrigin: "50% 50%" });
             });
             starSettersRef.current = {
               x: children.map((el) => gsap.quickSetter(el, "x", "px") as unknown as (v: any) => void),
               y: children.map((el) => gsap.quickSetter(el, "y", "px") as unknown as (v: any) => void),
               scaleX: children.map((el) => gsap.quickSetter(el, "scaleX") as unknown as (v: any) => void),
               scaleY: children.map((el) => gsap.quickSetter(el, "scaleY") as unknown as (v: any) => void),
               opacity: children.map((el) => gsap.quickSetter(el, "opacity") as unknown as (v: any) => void),
               rotation: children.map((el) => gsap.quickSetter(el, "rotation") as unknown as (v: any) => void),
             };
           }

           // Initialize center glow
           const centerGlow = centerGlowRef.current;
           if (centerGlow) {
             gsap.set(centerGlow, { scale: 0.8, opacity: 0, z: 65, filter: 'blur(10px)' });
           }

           // Easing helpers (hoisted to avoid per-frame allocations)
           const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
           const easeInOutSine = (t: number) => (-(Math.cos(Math.PI * t) - 1) / 2);

           // Realistic Burger Opening Animation - OPTIMIZED FOR PERFORMANCE
           const tl = gsap.timeline({
             scrollTrigger: {
               trigger: hero,
               start: "top top",
               end: "+=900vh", // Even longer scroll distance for slower overall animation
               pin: true,
               pinSpacing: true, // Keep spacing so content below doesn't overlap
               scrub: 3, // Slightly more smoothing to reduce perceived jank
               invalidateOnRefresh: true, // Better performance on resize
               anticipatePin: 1, // Better pin performance
               refreshPriority: -1, // Higher priority for smooth pinning
               onRefresh: () => computeHeroMetrics(),
               onUpdate: (self) => {
                 const progress = self.progress;
                 const velocity = (self as any).getVelocity ? (self as any).getVelocity() : 0;
                 const isScrolling = Math.abs(velocity) > 5;

                 // Ultra-smooth easing for very slow, realistic movement
                 const easedProgress = easeInOutSine(progress); // Much smoother sine wave easing
                 const reassemblyProgress = easeInOutCubic(progress); // Smooth cubic for reassembly

                 // If near the top, keep everything in perfect stacked position
                 if (progress <= 0.02) {
                   // Perfect initial stacked state
                   gsap.set(bunTop, {
                     x: 0,
                     y: 0,
                     z: 40,
                     rotationX: 0,
                     rotationY: 0,
                     rotationZ: 0,
                     scale: 1,
                     transformOrigin: "center center",
                   });

                   gsap.set(bunMiddle, {
                     x: 0,
                     y: 0,
                     z: 30,
                     rotationX: 0,
                     rotationY: 0,
                     rotationZ: 0,
                     scale: 1,
                     transformOrigin: "center center",
                   });

                   gsap.set(bunMiddle2, {
                     x: 0,
                     y: 0,
                     z: 20,
                     rotationX: 0,
                     rotationY: 0,
                     rotationZ: 0,
                     scale: 1,
                     transformOrigin: "center center",
                   });

                   gsap.set(bunBottom, {
                     x: 0,
                     y: 0,
                     z: 10,
                     rotationX: 0,
                     rotationY: 0,
                     rotationZ: 0,
                     scale: 1,
                     transformOrigin: "center center",
                   });

                  // Hide sparkles/trails/stars and reset center glow when back to top
                  const sparkleSetters = sparkleSettersRef.current;
                  if (sparkleSetters) {
                    for (let i = 0; i < sparkleSetters.opacity.length; i++) sparkleSetters.opacity[i](0);
                  }
                  const trailSetters = trailSettersRef.current;
                  if (trailSetters) {
                    for (let i = 0; i < trailSetters.opacity.length; i++) trailSetters.opacity[i](0);
                  }
                  const starSetters = starSettersRef.current;
                  if (starSetters) {
                    for (let i = 0; i < starSetters.opacity.length; i++) starSetters.opacity[i](0);
                  }
                  const centerGlow = centerGlowRef.current;
                  if (centerGlow) gsap.set(centerGlow, { opacity: 0, scale: 0.8 });
                 } else {
                   // BURGER OPENING ANIMATION - Bun top/bottom open, middle parts move separately to header
                   const viewportWidth = window.innerWidth;
                   const viewportHeight = window.innerHeight;
                   
                   // BUN TOP - Opens upward like a lid (MUCH SLOWER)
                   const bunTopX = 0; // Stays centered horizontally
                   const bunTopY = -viewportHeight * 0.1 * easedProgress; // Much slower upward movement
                   const bunTopZ = 40 + 10 * easedProgress; // Slower forward movement
                   const bunTopRotX = -15 * easedProgress; // Much gentler rotation
                   const bunTopRotY = 0; // No side rotation
                   const bunTopRotZ = 0; // No spin
                   const bunTopScale = 1; // Stays same size

                   // BUN BOTTOM - Opens downward like a base (MUCH SLOWER)
                   const bunBottomX = 0; // Stays centered horizontally
                   const bunBottomY = viewportHeight * 0.05 * easedProgress; // Much slower downward movement
                   const bunBottomZ = 10 + 8 * easedProgress; // Slower forward movement
                   const bunBottomRotX = 5 * easedProgress; // Much gentler rotation
                   const bunBottomRotY = 0; // No side rotation
                   const bunBottomRotZ = 0; // No spin
                   const bunBottomScale = 1; // Stays same size

                   // BUN MIDDLE - Moves separately to top of header (starts at 30% progress, MUCH SLOWER)
                   const middleProgress = Math.max(0, (easedProgress - 0.3) / 0.7); // Starts moving at 30% scroll
                   const middleWave = Math.sin(middleProgress * Math.PI * 1.5); // gentle wave arc
                   const middleSway = Math.sin(middleProgress * Math.PI * 3) * 0.5; // subtle oscillation
                   const bunMiddleX = (-viewportWidth * 0.1 * middleProgress) + (viewportWidth * 0.015 * middleWave); // curved path left
                   const bunMiddleY = (-viewportHeight * 0.6 * middleProgress) + (viewportHeight * 0.02 * middleWave); // arcing upward
                   const bunMiddleZ = 30 + 16 * middleProgress + 6 * Math.sin(middleProgress * Math.PI); // parallax depth arc
                   const bunMiddleRotX = (-12 * middleProgress) + (2 * middleSway); // gentle nod
                   const bunMiddleRotY = (-8 * middleProgress) + (3 * middleWave); // side sway
                   const bunMiddleRotZ = (4 * middleProgress) + (2 * middleSway); // slight roll
                   const bunMiddleScale = (1 - 0.08 * middleProgress) + (0.01 * middleWave); // tiny pulse

                   // BUN MIDDLE 2 - Moves separately to top of header (starts at 50% progress, MUCH SLOWER)
                   const middle2Progress = Math.max(0, (easedProgress - 0.5) / 0.5); // Starts moving at 50% scroll
                   const middle2Wave = Math.sin(middle2Progress * Math.PI * 1.5 + Math.PI / 6); // phase offset
                   const middle2Sway = Math.sin(middle2Progress * Math.PI * 3 + Math.PI / 4) * 0.5;
                   const bunMiddle2X = (viewportWidth * 0.1 * middle2Progress) + (viewportWidth * 0.015 * middle2Wave); // curved path right
                   const bunMiddle2Y = (-viewportHeight * 0.65 * middle2Progress) + (viewportHeight * 0.02 * middle2Wave); // arcing upward
                   const bunMiddle2Z = 20 + 14 * middle2Progress + 6 * Math.sin(middle2Progress * Math.PI); // parallax depth arc
                   const bunMiddle2RotX = (-10 * middle2Progress) + (2 * middle2Sway);
                   const bunMiddle2RotY = (8 * middle2Progress) + (3 * middle2Wave);
                   const bunMiddle2RotZ = (-3 * middle2Progress) + (2 * middle2Sway);
                   const bunMiddle2Scale = (1 - 0.08 * middle2Progress) + (0.01 * middle2Wave);
          
                   // OPTIMIZED TRANSFORMATIONS - Reduced properties for better performance
                   gsap.set(bunTop, {
                     x: bunTopX,
                     y: bunTopY,
                     z: bunTopZ,
                     rotationX: bunTopRotX,
                     rotationY: bunTopRotY,
                     rotationZ: bunTopRotZ,
                     scale: bunTopScale,
                   });

                   gsap.set(bunBottom, {
                     x: bunBottomX,
                     y: bunBottomY,
                     z: bunBottomZ,
                     rotationX: bunBottomRotX,
                     rotationY: bunBottomRotY,
                     rotationZ: bunBottomRotZ,
                     scale: bunBottomScale,
                   });

                   gsap.set(bunMiddle, {
                     x: bunMiddleX,
                     y: bunMiddleY,
                     z: bunMiddleZ,
                     rotationX: bunMiddleRotX,
                     rotationY: bunMiddleRotY,
                     rotationZ: bunMiddleRotZ,
                     scale: bunMiddleScale,
                   });

                   gsap.set(bunMiddle2, {
                     x: bunMiddle2X,
                     y: bunMiddle2Y,
                     z: bunMiddle2Z,
                     rotationX: bunMiddle2RotX,
                     rotationY: bunMiddle2RotY,
                     rotationZ: bunMiddle2RotZ,
                     scale: bunMiddle2Scale,
                   });

                  // Position sparkles emitter at the midpoint between the two middle layers
                  if (sparklesContainer) {
                    const emitX = (bunMiddleX + bunMiddle2X) / 2;
                    const emitY = (bunMiddleY + bunMiddle2Y) / 2;
                    const emitZ = (bunMiddleZ + bunMiddle2Z) / 2 + 10; // slight front bias
                    gsap.set(sparklesContainer, { x: emitX, y: emitY, z: emitZ });
                  }
                 }
 
                 // ULTRA-SMOOTH BACKGROUND EFFECTS - Much slower and subtler
                 if (progress > 0) {
                   const bgIntensity = easedProgress * 0.05; // Much more subtle background changes
                   hero.style.background = `radial-gradient(circle at 50% 50%,
                     rgba(220, 38, 38, ${0.03 + bgIntensity}) 0%,
                     rgba(185, 28, 28, ${0.02 + bgIntensity * 0.3}) 50%,
                     rgba(153, 27, 27, ${0.01 + bgIntensity * 0.2}) 100%)`;
                 } else {
                   // Reset to default background when not scrolling
                   hero.style.background = '';
                 }

                 // Sparkles emission: burst from burger center, using middle layers' progress for clear visibility
                 if (sparklesContainer) {
                   const children = Array.from(sparklesContainer.children) as HTMLElement[];
                   // Use cached hero radius to avoid reflow
                   const maxRadius = heroMaxRadius || 1;

                   // If not scrolling, hide sparkles and skip heavy math
                   if (!isScrolling) {
                     const setters = sparkleSettersRef.current;
                     if (setters) {
                       for (let i = 0; i < children.length; i++) setters.opacity[i](0);
                     }
                     // keep emitter positioned elsewhere; do not render
                     
                   } else {

                   // Visibility driven by middle layer progress (more predictable)
                   const intensityRaw = Math.max(0, Math.max(
                     Math.max(0, (easedProgress - 0.3) / 0.7),
                     Math.max(0, (easedProgress - 0.5) / 0.5)
                   ));
                   const intensity = Math.min(1, intensityRaw * 0.95);

                   // Radius grows with intensity, never 0
                   const baseRadius = Math.max(8, maxRadius * Math.pow(intensity, 0.6));

                   const wobble = 6 * intensity; // reduced wobble for clarity
                   const now = self.scroll(); // use scroll position as a stable time source
                   // Pre-compute once to reduce math overhead
                   const angles: number[] = [];
                   const radii: number[] = [];
                   for (let idx = 0; idx < children.length; idx++) {
                     const a = sparkleAngles[idx] + Math.sin((now * 0.0007) + sparklePhase[idx]) * 0.1;
                     const r = baseRadius + Math.sin((now * 0.0011) + idx) * wobble;
                     angles[idx] = a;
                     radii[idx] = r;
                   }
                  const sparkleSetters = sparkleSettersRef.current;
                   for (let idx = 0; idx < children.length; idx++) {
                     const a = angles[idx];
                     const r = radii[idx];
                     const cosA = Math.cos(a);
                     const sinA = Math.sin(a);
                     const x = cosA * r;
                     const y = sinA * r * 0.8;
                     const angleDeg = (a * 180) / Math.PI;
                    const twinkle = 0.5 + 0.5 * Math.sin((now * 0.0018) + idx * 0.7);
                    const streak = Math.max(1.05, 1.2 * intensity + 0.2 * twinkle);
                    const scaleX = streak;
                    const scaleY = 1.05 + intensity * 0.3 + 0.1 * twinkle;
                    const opacity = Math.max(0.12, Math.min(1, 0.3 + intensity * 0.95 + 0.25 * twinkle));
                     if (sparkleSetters) {
                       sparkleSetters.x[idx](x);
                       sparkleSetters.y[idx](y);
                       sparkleSetters.scaleX[idx](scaleX);
                       sparkleSetters.scaleY[idx](scaleY);
                       sparkleSetters.opacity[idx](opacity);
                       sparkleSetters.rotation[idx](angleDeg);
                     }
                    // subtle hue rotation via CSS filter for variety
                    (children[idx] as HTMLElement).style.filter = `hue-rotate(${(idx * 20 + now * 0.01) % 360}deg) drop-shadow(0 0 12px rgba(255,255,255,0.95)) drop-shadow(0 0 18px rgba(255,170,100,0.55))`;
                   }
 
                   }
                 }

                // Trailing sparkles: two trailing ghosts per sparkle with lagged offsets and lower opacity
                if (sparklesTrailContainer) {
                  const trailChildren = Array.from(sparklesTrailContainer.children) as HTMLElement[];
                  const maxRadius = heroMaxRadius || 1;
                  if (!isScrolling) {
                    const setters = trailSettersRef.current;
                    if (setters) {
                      for (let i = 0; i < trailChildren.length; i++) setters.opacity[i](0);
                    }
                  } else {
                  const intensityRaw = Math.max(0, Math.max(
                    Math.max(0, (easedProgress - 0.3) / 0.7),
                    Math.max(0, (easedProgress - 0.5) / 0.5)
                  ));
                  const intensity = Math.min(1, 0.1 + intensityRaw * 0.9);
                  const baseRadius = Math.max(6, maxRadius * Math.pow(intensity, 0.55));
                  const now = self.scroll();

                  const trailSetters = trailSettersRef.current;
                  for (let i = 0; i < sparkleCount; i++) {
                    const angle = sparkleAngles[i] + Math.sin((now * 0.0007) + sparklePhase[i]) * 0.1;
                    const angleCos = Math.cos(angle);
                    const angleSin = Math.sin(angle) * 0.8;
                    const radius = baseRadius + Math.sin((now * 0.001) + i) * (3.5 * intensity);

                    // two trail points behind the main sparkle
                    const offsets = [14, 28];
                    offsets.forEach((off, j) => {
                      const idx = i * 2 + j;
                      const el = trailChildren[idx];
                      if (!el) return;
                      const x = angleCos * radius - angleCos * off;
                      const y = angleSin * radius - angleSin * off;
                      const opacity = Math.max(0.1, Math.min(0.5, (0.3 + intensity * 0.55) * (1 - j * 0.35)));
                      const scaleX = 1 + intensity * 0.2;
                      const scaleY = 1 + intensity * 0.2;
                      const rot = (angle * 180) / Math.PI;
                      if (trailSetters) {
                        trailSetters.x[idx](x);
                        trailSetters.y[idx](y);
                        trailSetters.opacity[idx](opacity);
                        trailSetters.scaleX[idx](scaleX);
                        trailSetters.scaleY[idx](scaleY);
                        trailSetters.rotation[idx](rot);
                      }
                      // ensure trail inherits hue softly
                      (el as HTMLElement).style.filter = `hue-rotate(${(i * 20 + now * 0.01) % 360}deg) drop-shadow(0 0 8px rgba(255,255,255,0.7)) drop-shadow(0 0 12px rgba(255,170,100,0.4))`;
                    });
                  }
                  }
                }

                // Star highlights: fewer, brighter star shapes that move with the burst
                if (starsContainer) {
                  const starChildren = Array.from(starsContainer.children) as HTMLElement[];
                  const maxRadius = heroMaxRadius || 1;
                  const intensityRaw = Math.max(0, Math.max(
                    Math.max(0, (easedProgress - 0.3) / 0.7),
                    Math.max(0, (easedProgress - 0.5) / 0.5)
                  ));
                  const baseRadius = maxRadius * Math.pow(intensityRaw, 0.55);
                  const now = self.scroll();
                  const starSetters = starSettersRef.current;
                  if (!isScrolling) {
                    if (starSetters) {
                      for (let i = 0; i < starChildren.length; i++) starSetters.opacity[i](0);
                    }
                  } else {
                  starChildren.forEach((el, i) => {
                    const angle = sparkleAngles[(i * 3) % sparkleCount] + (i * Math.PI / 7);
                    const radius = baseRadius * (0.7 + (i % 3) * 0.12);
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius * 0.8;
                    const pulse = 0.5 + 0.5 * Math.sin((now * 0.0015) + i * 1.1);
                    const scale = 0.95 + intensityRaw * 0.45 + 0.08 * pulse;
                    const opacity = Math.max(0.15, Math.min(1, 0.28 + intensityRaw * 0.8 + 0.2 * pulse));
                    const rot = ((angle * 180) / Math.PI) + (i * 10);
                    if (starSetters) {
                      starSetters.x[i](x);
                      starSetters.y[i](y);
                      starSetters.scaleX[i](scale);
                      starSetters.scaleY[i](scale);
                      starSetters.opacity[i](opacity);
                      starSetters.rotation[i](rot);
                    }
                  });
                  }

                  // Center glow update
                  if (centerGlow) {
                    const glowOpacity = Math.min(0.45, Math.max(0, intensityRaw * 0.5));
                    const glowScale = 0.8 + intensityRaw * 0.6;
                    gsap.set(centerGlow, { opacity: glowOpacity, scale: glowScale });
                  }
                }
        },
      },
    });

    // Gentle floating motion for the whole burger group (parent wrapper), independent of scroll
    const burgerGroup = burgerGroupRef.current;
    if (burgerGroup) {
      gsap.to(burgerGroup, {
        y: "+=16",
        duration: 6.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(burgerGroup, {
        x: "+=8",
        duration: 7.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(burgerGroup, {
        rotationZ: "+=0.8",
        duration: 10,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        transformOrigin: "50% 50%",
      });
      gsap.to(burgerGroup, {
        rotationX: "+=1.2",
        duration: 8.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        transformOrigin: "50% 50%",
      });
      gsap.to(burgerGroup, {
        rotationY: "-=1.2",
        duration: 9.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        transformOrigin: "50% 50%",
      });
    }

    // Disable floating animation to avoid conflicts with scroll animation
    // const floatTl = gsap.timeline({ repeat: -1, yoyo: true });
    // floatTl
    //   .to([bunTop, bunMiddle, bunMiddle2, bunBottom], {
    //     y: "+=5",
    //     z: "+=2",
    //     rotationX: "+=0.5",
    //     rotationY: "+=0.3",
    //     duration: 8,
    //     ease: "power2.inOut",
    //     stagger: 0.4,
    //   })
    //   .to([bunTop, bunMiddle, bunMiddle2, bunBottom], {
    //     rotationZ: "+=1",
    //     duration: 4,
    //     ease: "power2.inOut",
    //     stagger: 0.2,
    //   }, "-=3");

           // OPTIMIZED mouse interaction - Reduced for better performance
           let mouseTimeout: NodeJS.Timeout;
           
           const handleMouseMove = (e: MouseEvent) => {
             // Throttle mouse movement for better performance
             clearTimeout(mouseTimeout);
             mouseTimeout = setTimeout(() => {
               const rect = hero.getBoundingClientRect();
               const centerX = rect.left + rect.width / 2;
               const centerY = rect.top + rect.height / 2;

               const deltaX = (e.clientX - centerX) / rect.width;
               const deltaY = (e.clientY - centerY) / rect.height;

               gsap.to([bunTop, bunMiddle, bunMiddle2, bunBottom], {
                 rotationY: deltaX * 2, // Reduced for better performance
                 rotationX: -deltaY * 2, // Reduced for better performance
                 duration: 0.8, // Faster response for better performance
                 ease: "power1.out",
               });
             }, 16); // ~60fps throttling
           };

           const handleMouseLeave = () => {
             gsap.to([bunTop, bunMiddle, bunMiddle2, bunBottom], {
               rotationY: 0,
               rotationX: 0,
               duration: 1, // Faster return for better performance
               ease: "power1.out",
             });
           };

    hero.addEventListener('mousemove', handleMouseMove);
    hero.addEventListener('mouseleave', handleMouseLeave);

    // compute metrics initially and on resize with debounce
    computeHeroMetrics();
    let resizeTimeout: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        computeHeroMetrics();
        ScrollTrigger.refresh();
      }, 100);
    };
    window.addEventListener('resize', handleResize, { passive: true } as any);

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      // floatTl.kill();
      hero.removeEventListener('mousemove', handleMouseMove);
      hero.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize as any);
      sparkleSettersRef.current = null;
      trailSettersRef.current = null;
      starSettersRef.current = null;
    };
  }, []);

  return (
        <section
          ref={heroRef}
          className="relative min-h-screen w-full bg-gradient-to-br from-red-50 via-red-100 to-orange-50 dark:from-red-950 dark:via-red-900 dark:to-orange-950 flex items-center justify-center overflow-visible pt-2 sm:pt-6 lg:pt-10 pb-28 sm:pb-36 lg:pb-44"
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d',
            backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)'
          }}
        >
            {/* Advanced 3D Background with Dynamic Effects */}
            <div className="absolute inset-0 opacity-20" style={{ transformStyle: 'preserve-3d' }}>
              {/* Primary 3D Elements */}
              <div 
                className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-full"
                style={{ 
                  transform: 'translateZ(-100px) rotateX(45deg)',
                  filter: 'blur(1px) drop-shadow(0 0 20px rgba(220, 38, 38, 0.5))'
                }}
              ></div>
              <div 
                className="absolute top-32 right-20 w-16 h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full"
                style={{ 
                  transform: 'translateZ(-80px) rotateY(30deg)',
                  filter: 'blur(0.5px) drop-shadow(0 0 15px rgba(185, 28, 28, 0.4))'
                }}
              ></div>
              <div 
                className="absolute bottom-20 left-1/4 w-12 h-12 bg-gradient-to-br from-red-600 to-red-800 rounded-full"
                style={{ 
                  transform: 'translateZ(-120px) rotateX(-30deg)',
                  filter: 'blur(1.5px) drop-shadow(0 0 25px rgba(153, 27, 27, 0.6))'
                }}
              ></div>
              <div 
                className="absolute bottom-32 right-1/3 w-14 h-14 bg-gradient-to-br from-red-500 to-red-700 rounded-full"
                style={{ 
                  transform: 'translateZ(-90px) rotateY(-45deg)',
                  filter: 'blur(1px) drop-shadow(0 0 18px rgba(220, 38, 38, 0.5))'
                }}
              ></div>
              
              {/* Dynamic Floating Elements with Complex Motion */}
              <div 
                className="absolute top-1/3 left-1/3 w-8 h-8 bg-gradient-to-br from-red-300 to-red-500 rounded-full opacity-60"
                style={{ 
                  animation: 'float 6s ease-in-out infinite',
                  filter: 'blur(0.5px) drop-shadow(0 0 10px rgba(239, 68, 68, 0.3))'
                }}
              ></div>
              <div 
                className="absolute bottom-1/3 right-1/3 w-6 h-6 bg-gradient-to-br from-red-400 to-red-600 rounded-full opacity-50"
                style={{ 
                  animation: 'floatReverse 8s ease-in-out infinite',
                  filter: 'blur(0.3px) drop-shadow(0 0 8px rgba(185, 28, 28, 0.4))'
                }}
              ></div>
              
              {/* Additional Complex 3D Elements */}
              <div 
                className="absolute top-1/4 right-1/4 w-4 h-4 bg-gradient-to-br from-red-200 to-red-400 rounded-full opacity-40"
                style={{ 
                  transform: 'translateZ(-60px) rotateX(60deg) rotateY(45deg)',
                  animation: 'float 4s ease-in-out infinite reverse',
                  filter: 'blur(0.2px) drop-shadow(0 0 5px rgba(239, 68, 68, 0.2))'
                }}
              ></div>
              <div 
                className="absolute bottom-1/4 left-1/4 w-5 h-5 bg-gradient-to-br from-red-500 to-red-700 rounded-full opacity-35"
                style={{ 
                  transform: 'translateZ(-70px) rotateX(-45deg) rotateY(-30deg)',
                  animation: 'floatReverse 5s ease-in-out infinite',
                  filter: 'blur(0.4px) drop-shadow(0 0 6px rgba(220, 38, 38, 0.3))'
                }}
              ></div>
              
              {/* Particle System Elements */}
              <div 
                className="absolute top-1/2 left-1/6 w-2 h-2 bg-red-400 rounded-full opacity-30"
                style={{ 
                  transform: 'translateZ(-50px)',
                  animation: 'float 3s ease-in-out infinite',
                  filter: 'blur(0.1px) drop-shadow(0 0 3px rgba(185, 28, 28, 0.2))'
                }}
              ></div>
              <div 
                className="absolute top-1/2 right-1/6 w-3 h-3 bg-red-300 rounded-full opacity-25"
                style={{ 
                  transform: 'translateZ(-40px)',
                  animation: 'floatReverse 4s ease-in-out infinite',
                  filter: 'blur(0.2px) drop-shadow(0 0 4px rgba(239, 68, 68, 0.15))'
                }}
              ></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <Card className="backdrop-blur-glass dark:backdrop-blur-glass-dark border-0 shadow-glow relative overflow-hidden">
                {/* Card Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-red-50/40 to-orange-50/50 dark:from-black/90 dark:via-red-950/40 dark:to-orange-950/50"></div>
                
                {/* Card Border Glow */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-red-500/30 via-orange-500/30 to-red-500/30 p-[2px]">
                  <div className="w-full h-full backdrop-blur-glass dark:backdrop-blur-glass-dark rounded-lg"></div>
                </div>
                
                <CardContent className="relative z-10 p-6 md:p-8 lg:p-10 xl:p-12">
            {/* Text Content */}
            <div className="text-center mb-8">
              {/* Main Title with Enhanced Styling */}
              <div className="relative mb-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black bg-gradient-to-r from-red-600 via-red-500 to-orange-500 dark:from-red-400 dark:via-red-300 dark:to-orange-400 bg-clip-text text-transparent mb-2 drop-shadow-lg leading-tight">
                  Five Guys
                </h1>
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 via-red-500/20 to-orange-500/20 blur-sm -z-10"></div>
              </div>
              
              {/* Subtitle with Better Typography */}
              <div className="space-y-3 mb-6">
                <p className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800 dark:text-gray-200">
                  Fresh. Made to Order. <span className="bg-gradient-to-r from-red-600 to-orange-500 dark:from-red-400 dark:to-orange-400 bg-clip-text text-transparent font-bold">Delicious.</span>
                </p>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
                  Scroll down to see our signature burger open with ingredients floating upwards
                </p>
              </div>
              
            </div>

            {/* Burger Stack */}
            <div className="relative flex flex-col items-center justify-center min-h-[350px] md:min-h-[400px] lg:min-h-[450px]">
              {/* Enhanced Background Effects */}
              <div className="absolute inset-0 bg-gradient-radial from-red-100/20 via-transparent to-transparent dark:from-red-900/20"></div>
              
              {/* Opening Animation Indicators (enhanced guides) */}
              <div
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Bun Top Opening Path */}
                <div
                  className="absolute border-t-2 border-dashed border-red-200 dark:border-red-800 opacity-20"
                  style={{
                    width: '200px',
                    height: '2px',
                    top: '20%',
                    left: '50%',
                    transform: 'translateX(-50%) rotate(-15deg)',
                    transformStyle: 'preserve-3d'
                  }}
                ></div>

                {/* Bun Bottom Opening Path */}
                <div
                  className="absolute border-b-2 border-dashed border-red-200 dark:border-red-800 opacity-20"
                  style={{
                    width: '200px',
                    height: '2px',
                    bottom: '30%',
                    left: '50%',
                    transform: 'translateX(-50%) rotate(5deg)',
                    transformStyle: 'preserve-3d'
                  }}
                ></div>

                {/* Middle Layers Separate Movement Paths */}
                <div
                  className="absolute border-l-2 border-dashed border-red-300 dark:border-red-700 opacity-10"
                  style={{
                    height: '400px',
                    left: '25%',
                    bottom: '10%',
                    transform: 'translateY(50%) rotate(-8deg)',
                    transformStyle: 'preserve-3d'
                  }}
                ></div>
                <div
                  className="absolute border-r-2 border-dashed border-red-300 dark:border-red-700 opacity-10"
                  style={{
                    height: '400px',
                    right: '25%',
                    bottom: '10%',
                    transform: 'translateY(50%) rotate(8deg)',
                    transformStyle: 'preserve-3d'
                  }}
                ></div>
              </div>
              
              <div 
                className="relative"
                ref={burgerGroupRef}
                style={{ 
                  transformStyle: 'preserve-3d',
                  perspective: '800px'
                }}
              >
                {/* Bun Top */}
                <div ref={bunTopRef} className="relative z-40">
                  <BurgerLayer
                    src="/burger-layers/bun-top.png"
                    alt="Burger Bun Top"
                    className="transform-gpu"
                  />
                </div>

                {/* Bun Middle */}
                <div ref={bunMiddleRef} className="relative z-30 -mt-2">
                  <BurgerLayer
                    src="/burger-layers/bun-middle.png"
                    alt="Burger Bun Middle"
                    className="transform-gpu"
                  />
                </div>

                {/* Bun Middle 2 */}
                <div ref={bunMiddle2Ref} className="relative z-20 -mt-2">
                  <BurgerLayer
                    src="/burger-layers/bun-middle2.png"
                    alt="Burger Bun Middle 2"
                    className="transform-gpu"
                  />
                </div>

                {/* Bun Bottom */}
                <div ref={bunBottomRef} className="relative z-10 -mt-2">
                  <BurgerLayer
                    src="/burger-layers/bun-bottom.png"
                    alt="Burger Bun Bottom"
                    className="transform-gpu"
                  />
                </div>

                {/* Sparkles container (emits from center) */}
                <div ref={sparklesRef} className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50" style={{ transformStyle: 'preserve-3d' }}>
                  {Array.from({ length: 24 }).map((_, i) => (
                    <span
                      key={i}
                      className="absolute block rounded-full"
                      style={{
                        width: i % 3 === 0 ? '12px' : '8px',
                        height: i % 3 === 0 ? '12px' : '8px',
                        background: 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,245,210,0.95) 45%, rgba(255,170,100,0.0) 72%)',
                        filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.95)) drop-shadow(0 0 18px rgba(255,170,100,0.55))',
                        mixBlendMode: 'screen',
                        willChange: 'transform, opacity'
                      }}
                    />
                  ))}
                </div>

                {/* Sparkle trails (two per sparkle) */}
                <div ref={sparklesTrailRef} className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40" style={{ transformStyle: 'preserve-3d' }}>
                  {Array.from({ length: 24 * 2 }).map((_, i) => (
                    <span
                      key={i}
                      className="absolute block rounded-full"
                      style={{
                        width: '6px',
                        height: '6px',
                        background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,235,190,0.7) 40%, rgba(255,170,100,0.0) 70%)',
                        filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.7)) drop-shadow(0 0 12px rgba(255,170,100,0.4))',
                        mixBlendMode: 'screen',
                        willChange: 'transform, opacity'
                      }}
                    />
                  ))}
                </div>

                {/* Star highlights */}
                <div ref={starsRef} className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-60" style={{ transformStyle: 'preserve-3d' }}>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="none" className="absolute"
                      style={{ filter: 'drop-shadow(0 0 14px rgba(255,255,255,0.9)) drop-shadow(0 0 20px rgba(255,180,120,0.5))' }}>
                      <path d="M12 2l2.5 5.5L20 10l-5.5 2.5L12 18l-2.5-5.5L4 10l5.5-2.5L12 2z" fill="url(#g)"/>
                      <defs>
                        <linearGradient id="g" x1="0" y1="0" x2="24" y2="24">
                          <stop offset="0%" stopColor="#ffffff"/>
                          <stop offset="60%" stopColor="#fff4cc"/>
                          <stop offset="100%" stopColor="#ffa366" stopOpacity="0.0"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  ))}
                </div>

                {/* Center glow */}
                <div ref={centerGlowRef} className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ width: '220px', height: '220px', background: 'radial-gradient(circle, rgba(255,230,200,0.9) 0%, rgba(255,160,100,0.35) 50%, rgba(255,120,80,0) 70%)' }}></div>
              </div>

            {/* Advanced 3D Decorative Elements with Dynamic Effects */}
            <div 
              className="absolute -top-4 -left-4 w-8 h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-full opacity-60 animate-pulse" 
              style={{ 
                transform: 'translateZ(20px)',
                filter: 'blur(0.5px) drop-shadow(0 0 8px rgba(220, 38, 38, 0.4))',
                animation: 'float 3s ease-in-out infinite'
              }}
            ></div>
            <div 
              className="absolute -bottom-4 -right-4 w-6 h-6 bg-gradient-to-br from-red-400 to-red-600 rounded-full opacity-60 animate-pulse delay-1000" 
              style={{ 
                transform: 'translateZ(15px)',
                filter: 'blur(0.3px) drop-shadow(0 0 6px rgba(185, 28, 28, 0.3))',
                animation: 'floatReverse 4s ease-in-out infinite'
              }}
            ></div>
            <div 
              className="absolute top-1/2 -left-8 w-4 h-4 bg-gradient-to-br from-red-600 to-red-800 rounded-full opacity-40 animate-pulse delay-500" 
              style={{ 
                transform: 'translateZ(10px)',
                filter: 'blur(0.2px) drop-shadow(0 0 4px rgba(153, 27, 27, 0.2))',
                animation: 'float 2.5s ease-in-out infinite'
              }}
            ></div>
            <div 
              className="absolute top-1/3 -right-8 w-5 h-5 bg-gradient-to-br from-red-500 to-red-700 rounded-full opacity-50 animate-pulse delay-700" 
              style={{ 
                transform: 'translateZ(25px)',
                filter: 'blur(0.4px) drop-shadow(0 0 7px rgba(220, 38, 38, 0.35))',
                animation: 'floatReverse 3.5s ease-in-out infinite'
              }}
            ></div>
            
            {/* Complex Floating 3D Particles with Multi-layered Animation */}
            <div 
              className="absolute -top-8 left-1/4 w-2 h-2 bg-gradient-to-br from-red-300 to-red-500 rounded-full opacity-30 animate-bounce" 
              style={{ 
                transform: 'translateZ(30px) rotateX(45deg)',
                animationDelay: '0.5s',
                filter: 'blur(0.1px) drop-shadow(0 0 3px rgba(239, 68, 68, 0.2))',
                animation: 'float 2s ease-in-out infinite'
              }}
            ></div>
            <div 
              className="absolute -bottom-8 right-1/4 w-3 h-3 bg-gradient-to-br from-red-400 to-red-600 rounded-full opacity-40 animate-bounce" 
              style={{ 
                transform: 'translateZ(20px) rotateY(30deg)',
                animationDelay: '1s',
                filter: 'blur(0.2px) drop-shadow(0 0 4px rgba(185, 28, 28, 0.25))',
                animation: 'floatReverse 2.5s ease-in-out infinite'
              }}
            ></div>
            <div 
              className="absolute top-1/4 -right-12 w-2 h-2 bg-gradient-to-br from-red-500 to-red-700 rounded-full opacity-50 animate-bounce" 
              style={{ 
                transform: 'translateZ(35px) rotateX(-30deg)',
                animationDelay: '1.5s',
                filter: 'blur(0.15px) drop-shadow(0 0 3.5px rgba(220, 38, 38, 0.3))',
                animation: 'float 1.8s ease-in-out infinite'
              }}
            ></div>
            <div 
              className="absolute bottom-1/4 -left-12 w-3 h-3 bg-gradient-to-br from-red-600 to-red-800 rounded-full opacity-30 animate-bounce" 
              style={{ 
                transform: 'translateZ(15px) rotateY(-45deg)',
                animationDelay: '2s',
                filter: 'blur(0.25px) drop-shadow(0 0 5px rgba(153, 27, 27, 0.2))',
                animation: 'floatReverse 2.2s ease-in-out infinite'
              }}
            ></div>
            
            {/* Advanced Opening Effect Particles with Color Shifts */}
            <div 
              className="absolute top-1/2 left-1/2 w-1 h-1 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-0 animate-ping" 
              style={{ 
                transform: 'translateZ(40px) rotateX(60deg)',
                animationDelay: '0.2s',
                filter: 'blur(0.05px) drop-shadow(0 0 2px rgba(251, 191, 36, 0.4))'
              }}
            ></div>
            <div 
              className="absolute top-1/2 left-1/2 w-1 h-1 bg-gradient-to-br from-orange-400 to-red-500 rounded-full opacity-0 animate-ping" 
              style={{ 
                transform: 'translateZ(45px) rotateY(45deg)',
                animationDelay: '0.4s',
                filter: 'blur(0.05px) drop-shadow(0 0 2px rgba(249, 115, 22, 0.4))'
              }}
            ></div>
            <div 
              className="absolute top-1/2 left-1/2 w-1 h-1 bg-gradient-to-br from-red-400 to-pink-500 rounded-full opacity-0 animate-ping" 
              style={{ 
                transform: 'translateZ(50px) rotateX(-45deg)',
                animationDelay: '0.6s',
                filter: 'blur(0.05px) drop-shadow(0 0 2px rgba(239, 68, 68, 0.4))'
              }}
            ></div>
            <div 
              className="absolute top-1/2 left-1/2 w-1 h-1 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full opacity-0 animate-ping" 
              style={{ 
                transform: 'translateZ(55px) rotateY(-30deg)',
                animationDelay: '0.8s',
                filter: 'blur(0.05px) drop-shadow(0 0 2px rgba(34, 197, 94, 0.4))'
              }}
            ></div>
            
            {/* Additional Complex Particle System */}
            <div 
              className="absolute top-1/3 left-1/3 w-1 h-1 bg-gradient-to-br from-red-200 to-red-400 rounded-full opacity-20"
              style={{ 
                transform: 'translateZ(60px) rotateX(75deg) rotateY(60deg)',
                animation: 'float 1.5s ease-in-out infinite',
                filter: 'blur(0.05px) drop-shadow(0 0 1px rgba(254, 202, 202, 0.3))'
              }}
            ></div>
            <div 
              className="absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-gradient-to-br from-red-300 to-red-500 rounded-full opacity-25"
              style={{ 
                transform: 'translateZ(45px) rotateX(-60deg) rotateY(-45deg)',
                animation: 'floatReverse 1.8s ease-in-out infinite',
                filter: 'blur(0.08px) drop-shadow(0 0 1.5px rgba(252, 165, 165, 0.25))'
              }}
            ></div>
            <div 
              className="absolute top-2/3 left-2/3 w-1 h-1 bg-gradient-to-br from-red-400 to-red-600 rounded-full opacity-30"
              style={{ 
                transform: 'translateZ(35px) rotateX(30deg) rotateY(75deg)',
                animation: 'float 2.2s ease-in-out infinite',
                filter: 'blur(0.06px) drop-shadow(0 0 1.2px rgba(248, 113, 113, 0.2))'
              }}
            ></div>
            </div>

          </CardContent>
        </Card>
      </div>
    </section>
  );
}
