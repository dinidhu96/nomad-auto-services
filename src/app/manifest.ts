import { business } from "@/lib/site";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: business.name,
    short_name: business.shortName,
    description: business.slogan,
    start_url: "/",
    display: "standalone",
    background_color: "#001240",
    theme_color: "#001240",
    icons: [
      {
        src: "/assets/logo-mark-crop.jpeg",
        sizes: "192x192",
        type: "image/jpeg"
      },
      {
        src: "/assets/logo-badge.jpeg",
        sizes: "512x512",
        type: "image/jpeg"
      }
    ]
  };
}
