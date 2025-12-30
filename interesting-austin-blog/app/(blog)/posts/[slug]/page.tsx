import { defineQuery } from "next-sanity";
import type { Metadata, ResolvingMetadata } from "next";
import { type PortableTextBlock } from "next-sanity";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { format, parseISO } from "date-fns";

import Navigation from "../../navigation";
import CoverImage from "../../cover-image";
import Avatar from "../../avatar";
import PortableText from "../../portable-text";
import EventCard from "../../event-card";

import * as demo from "@/sanity/lib/demo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { postQuery, settingsQuery, moreStoriesQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

const postSlugs = defineQuery(
  `*[_type == "post" && defined(slug.current)]{"slug": slug.current}`,
);

export async function generateStaticParams() {
  return await sanityFetch({
    query: postSlugs,
    perspective: "published",
    stega: false,
  });
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const post = await sanityFetch({
    query: postQuery,
    params,
    stega: false,
  });
  const previousImages = (await parent).openGraph?.images || [];
  const ogImage = resolveOpenGraphImage(post?.coverImage);

  return {
    authors: post?.author?.name ? [{ name: post?.author?.name }] : [],
    title: post?.title,
    description: post?.excerpt,
    openGraph: {
      images: ogImage ? [ogImage, ...previousImages] : previousImages,
    },
  } satisfies Metadata;
}

function formatTime(dateString: string | null | undefined): string {
  if (!dateString) return "";
  try {
    const date = typeof dateString === "string" ? parseISO(dateString) : new Date(dateString);
    return format(date, "EEEE, MMMM d 'at' h:mm a");
  } catch {
    return "";
  }
}

export default async function PostPage({ params }: Props) {
  const [post, settings] = await Promise.all([
    sanityFetch({ query: postQuery, params }),
    sanityFetch({ query: settingsQuery }),
  ]);

  if (!post?._id) {
    return notFound();
  }

  const formattedDate = formatTime(post.date);

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
              <Link href="/" className="hover:text-austin-terracotta transition-colors">
                Today&apos;s Events
              </Link>
              <span className="mx-2">/</span>
              <span className="text-austin-navy">{post.title}</span>
            </nav>

            <article>
              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-austin-navy mb-6">
                {post.title}
              </h1>

              {/* Date/Time - Prominent */}
              {formattedDate && (
                <div className="mb-8">
                  <div className="inline-flex items-center gap-3 bg-white rounded-full px-6 py-3 shadow-sm border border-austin-cream/50">
                    <svg
                      className="w-5 h-5 text-austin-terracotta"
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
                    <span className="text-lg font-semibold text-austin-navy">
                      {formattedDate}
                    </span>
                  </div>
                </div>
              )}

              {/* Cover Image */}
              {(post.coverImage || post.img) && (
                <div className="mb-12 rounded-lg overflow-hidden shadow-xl">
                  <CoverImage image={post.coverImage} imageUrl={post.img} priority />
                </div>
              )}

              {/* Excerpt */}
              {post.excerpt && (
                <div className="mb-8">
                  <p className="text-xl text-austin-navy/80 leading-relaxed font-medium">
                    {post.excerpt}
                  </p>
                </div>
              )}

              {/* Content */}
              {post.content?.length && (
                <div className="prose prose-lg max-w-none mb-12">
                  <PortableText
                    className="text-austin-navy/80 leading-relaxed"
                    value={post.content as PortableTextBlock[]}
                  />
                </div>
              )}

              {/* Author */}
              {post.author && (
                <div className="mb-12 pt-8 border-t border-austin-cream/50">
                  <div className="text-sm text-austin-navy/60 mb-2">Written by</div>
                  <Avatar name={post.author.name} picture={post.author.picture} />
                </div>
              )}
            </article>

            {/* Related Events */}
            <aside className="mt-16 pt-12 border-t border-austin-cream/50">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-austin-navy mb-8">
                More Events
              </h2>
              <Suspense
                fallback={
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {[1, 2].map((i) => (
                      <div
                        key={i}
                        className="bg-white rounded-lg h-64 animate-pulse"
                      />
                    ))}
                  </div>
                }
              >
                <RelatedEvents skip={post._id} />
              </Suspense>
            </aside>
          </div>
        </main>
      </div>
    </>
  );
}

async function RelatedEvents({ skip }: { skip: string | null }) {
  const events = await sanityFetch({
    query: moreStoriesQuery,
    params: { skip: skip || "", limit: 2 },
  });

  if (!events || events.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      {events
        .filter((event) => event.title && event.slug)
        .map((event) => (
          <EventCard
            key={event._id}
            _id={event._id}
            title={event.title}
            slug={event.slug!}
            excerpt={event.excerpt}
            coverImage={event.coverImage}
            img={event.img}
            date={event.date}
          />
        ))}
    </div>
  );
}
