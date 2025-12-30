import { defineQuery } from "next-sanity";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

import Navigation from "../../navigation";
import CoverImage from "../../cover-image";
import PortableText from "../../portable-text";

import * as demo from "@/sanity/lib/demo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { guideQuery, settingsQuery } from "@/sanity/lib/queries";

type Props = {
  params: Promise<{ slug: string }>;
};

const guideSlugs = defineQuery(
  `*[_type == "guide" && defined(slug.current)]{"slug": slug.current}`,
);

export async function generateStaticParams() {
  return await sanityFetch({
    query: guideSlugs,
    perspective: "published",
    stega: false,
  });
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const guide = await sanityFetch({
    query: guideQuery,
    params,
    stega: false,
  });

  return {
    title: guide?.title,
    description: guide?.content?.substring(0, 160),
  } satisfies Metadata;
}

export default async function GuidePage({ params }: Props) {
  const [guide, settings] = await Promise.all([
    sanityFetch({ query: guideQuery, params }),
    sanityFetch({ query: settingsQuery }),
  ]);

  if (!guide?._id) {
    return notFound();
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-austin-cream">
        <main className="container mx-auto px-5 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="mb-8 text-sm text-austin-navy/60">
              <Link href="/" className="hover:text-austin-terracotta transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link href="/guides" className="hover:text-austin-terracotta transition-colors">
                Guides
              </Link>
              <span className="mx-2">/</span>
              <span className="text-austin-navy">{guide.title}</span>
            </nav>

            {/* Guide Type Badge */}
            {guide.guideType && (
              <div className="mb-6">
                <span className="px-4 py-2 rounded-full text-sm font-semibold bg-austin-sage/10 text-austin-sage border border-austin-sage/20">
                  {guide.guideType.charAt(0).toUpperCase() + guide.guideType.slice(1)} Guide
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-austin-navy mb-6">
              {guide.title}
            </h1>

            {/* Stats */}
            {(guide.places?.length || guide.neighborhoods?.length) && (
              <div className="flex items-center gap-6 mb-8 text-austin-navy/70">
                {guide.places?.length && (
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
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
                    <span className="font-medium">
                      {guide.places.length} {guide.places.length === 1 ? "place" : "places"}
                    </span>
                  </div>
                )}
                {guide.neighborhoods?.length && (
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    <span className="font-medium">
                      {guide.neighborhoods.length}{" "}
                      {guide.neighborhoods.length === 1 ? "neighborhood" : "neighborhoods"}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Image */}
            {guide.img && (
              <div className="mb-12 rounded-lg overflow-hidden shadow-lg">
                <CoverImage image={null} imageUrl={guide.img} priority={false} />
              </div>
            )}

            {/* Content */}
            {guide.content && (
              <div className="prose prose-lg max-w-none">
                <div className="text-austin-navy/80 leading-relaxed whitespace-pre-line">
                  {guide.content}
                </div>
              </div>
            )}

            {/* Places List */}
            {guide.places && guide.places.length > 0 && (
              <div className="mt-12 pt-8 border-t border-austin-cream/50">
                <h2 className="text-2xl font-serif font-bold text-austin-navy mb-6">
                  Featured Places
                </h2>
                <ul className="space-y-3">
                  {guide.places.map((place, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-austin-terracotta"></div>
                      <span className="text-austin-navy font-medium">{place.name}</span>
                      {place.type && (
                        <span className="text-xs px-2 py-1 rounded bg-austin-cream text-austin-navy/60">
                          {place.type}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Back Link */}
            <div className="mt-12 pt-8 border-t border-austin-cream/50">
              <Link
                href="/guides"
                className="inline-flex items-center gap-2 text-austin-terracotta font-medium hover:gap-3 transition-all"
              >
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Guides
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

