import Link from "next/link";
import { format, parseISO } from "date-fns";

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

// Helper to format date
function formatDate(dateString: string | null | undefined): string {
  if (!dateString) return "";
  try {
    const date = typeof dateString === "string" ? parseISO(dateString) : new Date(dateString);
    return format(date, "EEEE, MMMM d");
  } catch {
    return "";
  }
}

interface RedesignedEventCardProps {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  date?: string | null;
  category?: string | null;
  location?: string | null;
}

const categoryStyles = {
  art: {
    tagBg: "bg-[#F97316]",
    tagText: "text-white",
    buttonBg: "bg-[#F97316]",
    buttonHover: "hover:bg-[#EA580C]",
  },
  music: {
    tagBg: "bg-[#8B5CF6]",
    tagText: "text-white",
    buttonBg: "bg-[#8B5CF6]",
    buttonHover: "hover:bg-[#7C3AED]",
  },
  food: {
    tagBg: "bg-[#22C55E]",
    tagText: "text-white",
    buttonBg: "bg-[#22C55E]",
    buttonHover: "hover:bg-[#16A34A]",
  },
  comedy: {
    tagBg: "bg-[#F59E0B]",
    tagText: "text-white",
    buttonBg: "bg-[#F59E0B]",
    buttonHover: "hover:bg-[#D97706]",
  },
  nightlife: {
    tagBg: "bg-[#EC4899]",
    tagText: "text-white",
    buttonBg: "bg-[#EC4899]",
    buttonHover: "hover:bg-[#DB2777]",
  },
  outdoor: {
    tagBg: "bg-[#10B981]",
    tagText: "text-white",
    buttonBg: "bg-[#10B981]",
    buttonHover: "hover:bg-[#059669]",
  },
  culture: {
    tagBg: "bg-[#6366F1]",
    tagText: "text-white",
    buttonBg: "bg-[#6366F1]",
    buttonHover: "hover:bg-[#4F46E5]",
  },
  default: {
    tagBg: "bg-[#6B7280]",
    tagText: "text-white",
    buttonBg: "bg-[#6B7280]",
    buttonHover: "hover:bg-[#4B5563]",
  },
};

const categoryLabels = {
  art: "Art",
  music: "Music",
  food: "Food",
  comedy: "Comedy",
  nightlife: "Nightlife",
  outdoor: "Outdoor",
  culture: "Culture",
  default: "Event",
};

export default function RedesignedEventCard({
  _id,
  title,
  slug,
  excerpt,
  date,
  category,
  location,
}: RedesignedEventCardProps) {
  const eventCategory = category || getCategory(title, excerpt);
  const time = formatTime(date);
  const dateFormatted = formatDate(date);
  const styles = categoryStyles[eventCategory as keyof typeof categoryStyles] || categoryStyles.default;
  const categoryLabel = categoryLabels[eventCategory as keyof typeof categoryLabels] || categoryLabels.default;

  return (
    <article className="bg-white rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.1)] border border-[#e0e0e0] p-6 w-full transition-all duration-200 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] max-w-[500px] md:max-w-[500px] lg:max-w-[600px] mx-auto" style={{ marginBottom: "28px", borderRadius: "8px" }}>
      {/* Category Tag */}
      <div className="mb-3" style={{ marginBottom: "12px" }}>
        <span
          className={`inline-block text-xs font-bold uppercase px-3 py-1.5 rounded ${styles.tagBg} ${styles.tagText}`}
          style={{ fontSize: "12px", fontWeight: 700, padding: "6px 12px", borderRadius: "4px" }}
        >
          {categoryLabel}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-bold text-[#1F2937]" style={{ fontWeight: 700, fontSize: "24px", marginBottom: "12px" }}>
        {title}
      </h3>

      {/* Time & Location Section */}
      <div className="space-y-2" style={{ marginBottom: "16px" }}>
        {time && time !== "TBD" && (
          <div className="flex items-center text-[#6B7280] text-sm md:text-[15px]" style={{ fontSize: "15px", lineHeight: "1.8" }}>
            <svg
              className="w-[18px] h-[18px] mr-2 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{dateFormatted && `${dateFormatted} at `}{time}</span>
          </div>
        )}
        {location && (
          <div className="flex items-center text-[#6B7280] text-sm md:text-[15px]" style={{ fontSize: "15px", lineHeight: "1.8" }}>
            <svg
              className="w-[18px] h-[18px] mr-2 flex-shrink-0"
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
            <span>{location}</span>
          </div>
        )}
      </div>

      {/* Description */}
      {excerpt && (
        <p className="text-[#4B5563] text-sm md:text-[15px]" style={{ fontSize: "15px", lineHeight: "1.6", marginBottom: "20px" }}>
          {excerpt}
        </p>
      )}

      {/* Get Tickets Button */}
      <Link
        href={`/posts/${slug}`}
        className={`block w-full text-center ${styles.buttonBg} ${styles.buttonHover} text-white font-semibold py-3 px-6 rounded-md transition-all duration-200 hover:shadow-md`}
        style={{
          fontSize: "15px",
          fontWeight: 600,
          minHeight: "44px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Get Tickets
      </Link>
    </article>
  );
}

