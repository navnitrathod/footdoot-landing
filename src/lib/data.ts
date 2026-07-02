// Seeded, static catalog data for the fake-door storefront.
// None of this is backed by real inventory — it only needs to look real.

export type Category = {
  name: string;
  slug: string;
  tone: string; // card tint behind the product image
  image: string;
};

export const NAV_LINKS = [
  "Men",
  "Women",
  "Kids",
  "Sports",
  "Formal",
  "Casual",
  "Accessories",
  "Brands",
] as const;

// Light-theme tints and local product images for the category thumbnails.
export const CATEGORIES: Category[] = [
  { name: "Sneakers", slug: "sneakers", tone: "#eef0f2", image: "/images/allproduct/Sneakers.webp" },
  { name: "Sports Shoes", slug: "sports-shoes", tone: "#e9edf2", image: "/images/allproduct/Sports Shoes.webp" },
  { name: "Formal Shoes", slug: "formal-shoes", tone: "#e7d7c6", image: "/images/allproduct/Formal Shoes.webp" },
  { name: "Sandals & Floaters", slug: "sandals-floaters", tone: "#efe2d3", image: "/images/allproduct/Sandals Floaters.webp" },
  { name: "Heels", slug: "heels", tone: "#f4dfe6", image: "/images/allproduct/Heels.webp" },
  { name: "Flats", slug: "flats", tone: "#f7ecdf", image: "/images/allproduct/Flats.webp" },
  { name: "Boots", slug: "boots", tone: "#e6e8ec", image: "/images/allproduct/Boots.webp" },
  { name: "Accessories", slug: "accessories", tone: "#e4ecf4", image: "/images/allproduct/Accessories.webp" },
];

export const BRANDS = [
  "Nike",
  "adidas",
  "PUMA",
  "Skechers",
  "Reebok",
  "New Balance",
  "ALDO",
  "Clarks",
  "Campus",
  "Red Tape",
];

export type Deal = {
  id: string;
  name: string;
  brand: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: string;
  off: number;
  tone: string;
  image: string;
};

export const DEALS: Deal[] = [
  { id: "sparx-sports", name: "Sparx Men Sports Shoes", brand: "Sparx", price: 899, mrp: 1499, rating: 4.2, reviews: "1.2K", off: 40, tone: "#edeef0", image: "/images/allproduct/Sparx Men Sports Shoes.webp" },
  { id: "catwalk-heels", name: "Catwalk Women Heels", brand: "Catwalk", price: 1099, mrp: 1699, rating: 4.3, reviews: "982", off: 35, tone: "#f4ece2", image: "/images/allproduct/Catwalk Women Heels.webp" },
  { id: "campus-sliders", name: "Campus Men Sliders", brand: "Campus", price: 499, mrp: 999, rating: 4.1, reviews: "1.5K", off: 50, tone: "#e7ecf2", image: "/images/allproduct/Campus Men Sliders.webp" },
  { id: "asian-sneakers", name: "Asian Women Sneakers", brand: "Asian", price: 899, mrp: 1499, rating: 4.2, reviews: "755", off: 40, tone: "#f7e8ed", image: "/images/allproduct/Asian Women Sneakers.webp" },
  { id: "redtape-formal", name: "Red Tape Men Formal Shoes", brand: "Red Tape", price: 1649, mrp: 2999, rating: 4.3, reviews: "1.9K", off: 40, tone: "#efe4d8", image: "/images/allproduct/Red Tape Men Formal Shoes.webp" },
];

export type WhyItem = { title: string; sub: string; icon: string };

export const WHY: WhyItem[] = [
  { title: "Best Prices", sub: "Everyday low prices for everyone", icon: "tag" },
  { title: "Original Products", sub: "100% authentic from top brands", icon: "shield" },
  { title: "Secure Payments", sub: "100% safe & secure transactions", icon: "lock" },
  { title: "Fast Delivery", sub: "Quick delivery at your doorstep", icon: "truck" },
  { title: "7 Days Returns", sub: "Easy returns & exchange policy", icon: "rotate" },
  { title: "Customer Support", sub: "We're here to help you 24/7", icon: "headset" },
];

export type Testimonial = { quote: string; name: string };

export const TESTIMONIALS: Testimonial[] = [
  { quote: "Finally, a platform that understands fit! My shoe size is different in every brand. Footdoot nailed it.", name: "Rohan P." },
  { quote: "The virtual try-on is amazing. I could see how the sneakers look on me before buying. Super helpful!", name: "Neha T." },
  { quote: "Great collection, best prices and super easy returns. My go-to place for footwear now.", name: "Arjun M." },
  { quote: "Perfect sandals for summer and the delivery was faster than expected. Loved it!", name: "Priya S." },
  { quote: "Scanned my feet once and every recommendation since has been spot on. No more returns.", name: "Karan D." },
];

export const APP_FEATURES = [
  { title: "Exclusive App", sub: "Only Deals", icon: "tag" },
  { title: "Early Access", sub: "to New Launches", icon: "bolt" },
  { title: "Track Orders", sub: "in Real-time", icon: "pin" },
  { title: "Easy Returns", sub: "from App", icon: "rotate" },
];
