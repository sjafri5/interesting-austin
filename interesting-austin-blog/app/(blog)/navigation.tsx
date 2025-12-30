"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<"posts" | "guides">("posts");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine active tab based on pathname
  useEffect(() => {
    if (pathname?.includes("/guides")) {
      setActiveTab("guides");
    } else {
      setActiveTab("posts");
    }
  }, [pathname]);

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-austin-cream"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-5">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl md:text-2xl font-serif font-bold text-austin-navy hover:text-austin-terracotta transition-colors"
          >
            <span className="hidden sm:inline">Interesting Austin</span>
            <span className="sm:hidden">IA</span>
          </Link>

          {/* Center: Tabs */}
          <div className="flex items-center gap-1 md:gap-2 bg-austin-cream/50 rounded-full p-1 md:p-1.5 border border-austin-cream/80">
            <Link
              href="/"
              className={`px-3 md:px-6 py-2 md:py-2.5 rounded-full font-medium text-xs md:text-sm transition-all duration-200 whitespace-nowrap ${
                activeTab === "posts"
                  ? "bg-white text-austin-terracotta shadow-sm"
                  : "text-austin-navy/70 hover:text-austin-navy"
              }`}
            >
              <span className="hidden sm:inline">Today's Events</span>
              <span className="sm:hidden">Events</span>
            </Link>
            <Link
              href="/guides"
              className={`px-3 md:px-6 py-2 md:py-2.5 rounded-full font-medium text-xs md:text-sm transition-all duration-200 whitespace-nowrap ${
                activeTab === "guides"
                  ? "bg-white text-austin-terracotta shadow-sm"
                  : "text-austin-navy/70 hover:text-austin-navy"
              }`}
            >
              <span className="hidden sm:inline">Essential Guides</span>
              <span className="sm:hidden">Guides</span>
            </Link>
          </div>

          {/* Right: Optional icons */}
          <div className="flex items-center gap-4">
            {/* Placeholder for search/social icons */}
            <div className="w-8 h-8"></div>
          </div>
        </div>
      </div>
    </nav>
  );
}

