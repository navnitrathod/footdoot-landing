import type { MetadataRoute } from "next";

// PWA / "add to home screen" manifest. Next serves this at /manifest.webmanifest
// and auto-injects <link rel="manifest"> sitewide.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Footdoot — Your Perfect Fit. Anywhere.",
    short_name: "Footdoot",
    description:
      "AI-powered footwear marketplace: scan your feet for cross-brand sizing, try shoes on in AR, and shop 1000+ styles.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#E5261F",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
