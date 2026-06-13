export const brand = {
  name: "MATCHA",
  tagline: "Where matcha meets coffee.",
  description: "A bold new blend of tradition and energy. Ceremonial-grade matcha meets single-origin coffee for the ultimate mindful lift.",
} as const;

export const products = [
  {
    name: "Original Latte",
    description: "Creamy oat milk blended with our signature matcha-coffee shot.",
    price: "₦4,000",
    image: null,
  },
  {
    name: "Cold Brew Fusion",
    description: "Slow-steeped cold brew swirled with stone-ground matcha.",
    price: "₦6,500",
    image: null,
  },
  {
    name: "Matcha Shot",
    description: "Pure matcha and espresso — bold, clean, zero sugar.",
    price: "₦10,000",
    image: null,
  },
] as const;

export const testimonials = [
  {
    quote: "Finally, a drink that gives me coffee energy without the jitters. The matcha smooths everything out.",
    author: "Sarah K.",
    role: "Daily drinker",
  },
  {
    quote: "I was skeptical about matcha-coffee — now I can't go back. The flavor is incredibly balanced.",
    author: "James T.",
    role: "Barista & coffee enthusiast",
  },
  {
    quote: "MATCHA is my morning ritual. It's not just a drink, it's a moment of calm before the chaos.",
    author: "Mika Y.",
    role: "Wellness coach",
  },
] as const;
