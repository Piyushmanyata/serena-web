import type { MetadataRoute } from "next";
import { SEED_PRODUCTS } from "@/lib/products";
import { SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/shop", "/customize", "/gift", "/about", "/contact", "/faq", "/privacy", "/terms"];
  const productRoutes = SEED_PRODUCTS.map((product) => `/shop/${product.slug}`);

  return [...staticRoutes, ...productRoutes].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route.startsWith("/shop") ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/shop") ? 0.8 : 0.6,
  }));
}
