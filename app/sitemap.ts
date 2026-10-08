import type { MetadataRoute } from "next";
import { href, locales, localeTags, type RouteKey } from "@/i18n/config";
import { absoluteUrl } from "@/lib/site";

const routes: { route: RouteKey; changeFrequency: "weekly" | "monthly" | "yearly"; priority: number }[] = [
  { route: "home", changeFrequency: "weekly", priority: 1 },
  { route: "privacy", changeFrequency: "yearly", priority: 0.3 },
  { route: "terms", changeFrequency: "yearly", priority: 0.3 },
  { route: "people", changeFrequency: "monthly", priority: 0.7 },
  { route: "revenue", changeFrequency: "monthly", priority: 0.6 },
  { route: "gtm", changeFrequency: "monthly", priority: 0.6 },
  { route: "players", changeFrequency: "monthly", priority: 0.5 },
  { route: "expansion", changeFrequency: "monthly", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const updated = new Date("2026-10-06");
  return routes.flatMap(({ route, changeFrequency, priority }) =>
    locales.map((locale) => ({
      url: absoluteUrl(href(route, locale)),
      lastModified: updated,
      changeFrequency,
      priority: locale === "es" ? priority : priority * 0.9,
      alternates: {
        languages: Object.fromEntries(
          locales.map((code) => [localeTags[code].hreflang, absoluteUrl(href(route, code))]),
        ),
      },
    })),
  );
}
