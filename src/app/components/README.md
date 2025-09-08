# Hero Component

A fully animated Hero section featuring a layered burger that splits and re-stacks based on scroll direction using GSAP and ScrollTrigger.

## Features

- ✅ **Full Screen Height**: 100vh Hero section
- ✅ **Layered Burger**: 4 SVG layers stacked vertically
- ✅ **GSAP Animations**: Smooth scroll-triggered animations
- ✅ **ScrollTrigger**: Pin section during animation
- ✅ **Responsive Design**: Works on all screen sizes
- ✅ **Red/White/Black Theme**: Matches Five Guys branding

## Animation Behavior

### Scroll Down
- Pins the Hero section
- Bun top moves upward with rotation
- Bun bottom moves downward with rotation  
- Middle layers spread apart slightly
- Smooth easing with `power3.inOut`

### Scroll Up
- Re-stacks all layers perfectly
- Reverses the split animation
- Maintains smooth transitions

## Dependencies

- `gsap` - Animation library
- `@/components/ui/card` - Shadcn UI components
- `next/image` - Next.js image optimization

## Usage

```tsx
import Hero from "./components/Hero";

export default function Home() {
  return (
    <div>
      <Hero />
      {/* Rest of your content */}
    </div>
  );
}
```

## Customization

### Replace Burger Images
Place your PNG images in `/public/burger-layers/`:
- `bun-top.png`
- `bun-middle.png` 
- `bun-middle2.png`
- `bun-bottom.png`

### Adjust Animation
Modify the GSAP animation values in the `useEffect` hook:
- `y` values control vertical movement
- `rotation` values control rotation
- `scale` values control size changes
- `duration` controls animation speed

## Performance

- Uses `willChange: 'transform'` for GPU acceleration
- Optimized with `transform-gpu` classes
- Proper cleanup of GSAP timelines
- Responsive image sizing


