import { Suspense } from "react";

import Navigation from "../navigation";
import GuideCard from "../guide-card";

import { sanityFetch } from "@/sanity/lib/fetch";
import { guidesQuery } from "@/sanity/lib/queries";

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

async function AllGuides() {
  const guides = (await sanityFetch({
    query: guidesQuery,
    params: { limit: 50 },
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
      {guides.map((guide) => (
        <GuideCard
          key={guide._id}
          _id={guide._id}
          title={guide.title}
          slug={guide.slug}
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

export default async function GuidesPage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-austin-cream">
        <main className="container mx-auto px-5 py-16">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-austin-navy mb-4">
              Essential Guides
            </h1>
            <p className="text-austin-navy/60 text-lg max-w-2xl">
              Discover curated recommendations, insider tips, and comprehensive guides to make the most of your time in Austin.
            </p>
          </div>

          <Suspense
            fallback={
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg h-80 animate-pulse"
                  />
                ))}
              </div>
            }
          >
            <AllGuides />
          </Suspense>
        </main>
      </div>
    </>
  );
}

