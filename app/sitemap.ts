import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date("2026-10-05");
  return [
    { url: absoluteUrl("/"), lastModified: updated, changeFrequency: "weekly", priority: 1 },
    {
      url: absoluteUrl("/privacidad"),
      lastModified: updated,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/terminos"),
      lastModified: updated,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
