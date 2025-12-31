import Link from "next/link";
import { format, parseISO } from "date-fns";

import CoverImage from "./cover-image";

interface EventCardProps {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  coverImage?: any;
  img?: string | null;
  date?: string | null;
  category?: string | null;
  location?: string | null;
}

// Helper to extract category from title or excerpt
function getCategory(title: string, excerpt?: string | null): string {
  const text = `${title} ${excerpt || ""}`.toLowerCase();
  if (text.includes("music") || text.includes("concert") || text.includes("band")) return "music";
  if (text.includes("food") || text.includes("restaurant") || text.includes("taco") || text.includes("dining")) return "food";
  if (text.includes("art") || text.includes("gallery") || text.includes("exhibition")) return "art";
  if (text.includes("comedy") || text.includes("standup")) return "comedy";
  if (text.includes("bar") || text.includes("nightlife") || text.includes("drink")) return "nightlife";
  if (text.includes("outdoor") || text.includes("park") || text.includes("hike")) return "outdoor";
  if (text.includes("culture") || text.includes("museum") || text.includes("theater")) return "culture";
  return "default";
}

// Helper to format time from date
function formatTime(dateString: string | null | undefined): string {
  if (!dateString) return "TBD";
  try {
    const date = typeof dateString === "string" ? parseISO(dateString) : new Date(dateString);
    return format(date, "h:mm a");
  } catch {
    return "TBD";
  }
}

const categoryColors = {
  music: "bg-category-music/10 text-category-music border-category-music/20",
  food: "bg-category-food/10 text-category-food border-category-food/20",
  art: "bg-category-art/10 text-category-art border-category-art/20",
  comedy: "bg-category-comedy/10 text-category-comedy border-category-comedy/20",
  nightlife: "bg-category-nightlife/10 text-category-nightlife border-category-nightlife/20",
  outdoor: "bg-category-outdoor/10 text-category-outdoor border-category-outdoor/20",
  culture: "bg-category-culture/10 text-category-culture border-category-culture/20",
  default: "bg-category-default/10 text-category-default border-category-default/20",
};

const categoryLabels = {
  music: "Music",
  food: "Food & Drink",
  art: "Art",
  comedy: "Comedy",
  nightlife: "Nightlife",
  outdoor: "Outdoor",
  culture: "Culture",
  default: "Event",
};

export default function EventCard({
  _id,
  title,
  slug,
  excerpt,
  coverImage,
  img,
  date,
  category,
  location,
}: EventCardProps) {
  const eventCategory = category || getCategory(title, excerpt);
  const time = formatTime(date);
  const categoryColor = categoryColors[eventCategory as keyof typeof categoryColors] || categoryColors.default;
  const categoryLabel = categoryLabels[eventCategory as keyof typeof categoryLabels] || categoryLabels.default;

  return (
    <article className="group">
      <Link
        href={`/posts/${slug}`}
        className="block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-austin-cream/50 hover:-translate-y-1"
      >
        {/* Image */}
        {(coverImage || img) && (
          <div className="relative h-48 overflow-hidden">
            <CoverImage image={coverImage} imageUrl={img} priority={false} />
            <div className="absolute top-4 right-4">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${categoryColor}`}>
                {categoryLabel}
              </span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Time - Prominent */}
          <div className="mb-3">
            <span className="text-2xl font-bold text-austin-terracotta font-serif">
              {time}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-serif font-bold text-austin-navy mb-3 line-clamp-2 group-hover:text-austin-terracotta transition-colors">
            {title}
          </h3>

          {/* Location */}
          {location && (
            <div className="flex items-center gap-2 mb-3 text-austin-navy/70">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-sm font-medium">{location}</span>
            </div>
          )}

          {/* Excerpt */}
          {excerpt && (
            <p className="text-austin-navy/70 text-sm leading-relaxed mb-4 line-clamp-2">
              {excerpt}
            </p>
          )}

          {/* CTA */}
          <div className="flex items-center gap-2 text-austin-terracotta font-medium text-sm group-hover:gap-3 transition-all">
            <span>Learn More</span>
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </Link>
    </article>
  );
}


