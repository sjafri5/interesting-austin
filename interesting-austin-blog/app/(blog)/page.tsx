import Link from "next/link";
import { Suspense } from "react";

import Navigation from "./navigation";
import EventCard from "./event-card";
import GuideCard from "./guide-card";
import PortableText from "./portable-text";

import type { HeroQueryResult } from "@/sanity.types";
import * as demo from "@/sanity/lib/demo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { heroQuery, settingsQuery, moreStoriesQuery, guidesQuery } from "@/sanity/lib/queries";

type GuideItem = {
  _id: string;
  status?: "draft" | "published";
  title?: string;
  slug?: string | null;
  content?: string | null;
  guideType?: string | null;
  img?: string | null;
  updatedAt?: string;
  places?: Array<{ name?: string; slug?: { current?: string } | null; type?: string }> | null;
  neighborhoods?: Array<{ name?: string; slug?: { current?: string } | null }> | null;
};

function HeroSection({
  title,
  description,
  featuredPost,
}: {
  title: string | null | undefined;
  description: any;
  featuredPost: HeroQueryResult | null;
}) {
  const displayTitle = title || demo.title;
  
  return (
    <section className="relative bg-gradient-to-br from-austin-cream via-white to-austin-cream/50 py-20 md:py-32 border-b border-austin-cream/50">
      <div className="container mx-auto px-5">
        <div className="max-w-4xl">
          <h1 className="text-balance text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-tight tracking-tight text-austin-navy mb-6">
            {displayTitle}
          </h1>
          <div className="text-lg md:text-xl text-austin-navy/80 leading-relaxed mb-8">
            <PortableText
              className="prose-lg prose-headings:font-serif"
              value={description?.length ? description : demo.description}
            />
          </div>

          {/* Featured Event Badge */}
          {featuredPost && (
            <Link
              href={`/posts/${featuredPost.slug}`}
              className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-austin-cream/50 hover:-translate-y-1 group"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-austin-terracotta rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
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
              </div>
              <div>
                <div className="text-xs font-semibold text-austin-navy/60 uppercase tracking-wide">
                  Today&apos;s Top Event
                </div>
                <div className="text-base font-bold text-austin-navy group-hover:text-austin-terracotta transition-colors">
                  {featuredPost.title}
                </div>
              </div>
              <svg
                className="w-5 h-5 text-austin-terracotta transition-transform group-hover:translate-x-1"
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
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

async function EventsStream() {
  const events = await sanityFetch({
    query: moreStoriesQuery,
    params: { skip: "", limit: 6 },
  });

  if (!events || events.length === 0) {
    return (
      <div className="text-center py-16 text-austin-navy/60">
        <p className="text-lg">No events available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {events.map((event) => (
        <EventCard
          key={event._id}
          _id={event._id}
          title={event.title}
          slug={event.slug}
          excerpt={event.excerpt}
          coverImage={event.coverImage}
          img={event.img}
          date={event.date}
        />
      ))}
    </div>
  );
}

async function GuidesStream() {
  const guides = (await sanityFetch({
    query: guidesQuery,
    params: { limit: 6 },
  })) as GuideItem[] | null;

  if (!guides || guides.length === 0) {
    return (
      <div className="text-center py-16 text-austin-navy/60">
        <p className="text-lg">No guides available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {guides
        .filter((guide) => guide.title && guide.slug)
        .map((guide) => (
          <GuideCard
            key={guide._id}
            _id={guide._id}
            title={guide.title!}
            slug={guide.slug!}
            content={guide.content}
            guideType={guide.guideType}
            img={guide.img}
            updatedAt={guide.updatedAt}
            places={guide.places}
            neighborhoods={guide.neighborhoods}
          />
        ))}
    </div>
  );
}

export default async function Page() {
  const [settings, heroPost] = await Promise.all([
    sanityFetch({
      query: settingsQuery,
    }),
    sanityFetch({ query: heroQuery }),
  ]);

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-austin-cream">
        {/* Hero Section */}
        <HeroSection
          title={settings?.title}
          description={settings?.description}
          featuredPost={heroPost}
        />

        {/* Main Content */}
        <main className="container mx-auto px-5 py-16">
          {/* Today's Events Section */}
          <section className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-austin-navy mb-2">
                  Today&apos;s Events
                </h2>
                <p className="text-austin-navy/60 text-lg">
                  Discover what&apos;s happening in Austin today
                </p>
              </div>
            </div>
            <Suspense
              fallback={
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="bg-white rounded-lg h-64 animate-pulse"
                    />
                  ))}
                </div>
              }
            >
              <EventsStream />
            </Suspense>
          </section>

          {/* Essential Guides Section */}
          <section className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-austin-navy mb-2">
                  Essential Guides
                </h2>
                <p className="text-austin-navy/60 text-lg">
                  Curated recommendations for exploring Austin
                </p>
              </div>
              <Link
                href="/guides"
                className="hidden md:flex items-center gap-2 text-austin-terracotta font-medium hover:gap-3 transition-all"
              >
                View All Guides
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
            <Suspense
              fallback={
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="bg-white rounded-lg h-80 animate-pulse"
                    />
                  ))}
                </div>
              }
            >
              <GuidesStream />
            </Suspense>
            <div className="mt-8 text-center md:hidden">
              <Link
                href="/guides"
                className="inline-flex items-center gap-2 text-austin-terracotta font-medium"
              >
                View All Guides
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
