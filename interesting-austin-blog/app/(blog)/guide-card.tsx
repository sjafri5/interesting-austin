import Link from "next/link";
import { format, parseISO } from "date-fns";
import { type PortableTextBlock, toPlainText } from "next-sanity";

import CoverImage from "./cover-image";

interface GuideCardProps {
  _id: string;
  title: string;
  slug: string;
  content?: PortableTextBlock[] | string | null;
  guideType?: string | null;
  img?: string | null;
  updatedAt?: string | null;
  places?: Array<{ name?: string }> | null;
  neighborhoods?: Array<{ name?: string }> | null;
}

function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return "Recently";
  try {
    const date = typeof dateString === "string" ? parseISO(dateString) : new Date(dateString);
    return format(date, "MMM yyyy");
  } catch {
    return "Recently";
  }
}

const guideTypeLabels: Record<string, string> = {
  list: "List",
  explainer: "Guide",
  review: "Review",
  roundup: "Roundup",
  feature: "Feature",
};

export default function GuideCard({
  _id,
  title,
  slug,
  content,
  guideType,
  img,
  updatedAt,
  places,
  neighborhoods,
}: GuideCardProps) {
  const placeCount = places?.length || 0;
  const neighborhoodCount = neighborhoods?.length || 0;
  const totalLocations = placeCount + neighborhoodCount;
  const updatedDate = formatDate(updatedAt);
  
  // Handle both Portable Text array and plain string for backward compatibility
  const previewText = content
    ? Array.isArray(content)
      ? toPlainText(content).substring(0, 120)
      : content.substring(0, 120)
    : "";

  return (
    <article className="group">
      <Link
        href={`/guides/${slug}`}
        className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-austin-cream/50 hover:-translate-y-2 h-full"
      >
        {/* Image */}
        {img && (
          <div className="relative h-56 overflow-hidden">
            <CoverImage image={null} imageUrl={img} priority={false} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        )}

        {/* Content */}
        <div className="p-6 flex flex-col h-full">
          {/* Guide Type Badge */}
          {guideType && (
            <div className="mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-austin-sage/10 text-austin-sage border border-austin-sage/20">
                {guideTypeLabels[guideType] || "Guide"}
              </span>
            </div>
          )}

          {/* Title */}
          <h3 className="text-2xl font-serif font-bold text-austin-navy mb-2 group-hover:text-austin-terracotta transition-colors">
            {title}
          </h3>

          {/* Stats */}
          <div className="flex items-center gap-4 mb-4 text-sm text-austin-navy/60">
            {totalLocations > 0 && (
              <span className="font-medium">
                {totalLocations} {totalLocations === 1 ? "location" : "locations"}
              </span>
            )}
            <span>Updated {updatedDate}</span>
          </div>

          {/* Preview Text - Shows on hover */}
          {previewText && (
            <p className="text-austin-navy/70 text-sm leading-relaxed mb-4 line-clamp-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {previewText}...
            </p>
          )}

          {/* CTA */}
          <div className="mt-auto flex items-center gap-2 text-austin-terracotta font-medium text-sm group-hover:gap-3 transition-all">
            <span>Explore Guide</span>
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


