import { Image } from "next-sanity/image";
import NextImage from "next/image";

import { urlForImage } from "@/sanity/lib/utils";

interface CoverImageProps {
  image: any;
  imageUrl?: string | null;
  priority?: boolean;
}

export default function CoverImage(props: CoverImageProps) {
  const { image: source, imageUrl, priority } = props;
  
  // If imageUrl is provided (from img field), use it directly
  if (imageUrl) {
    return (
      <div className="shadow-md transition-shadow duration-200 group-hover:shadow-lg sm:mx-0">
        <NextImage
          className="h-auto w-full"
          width={2000}
          height={1000}
          alt=""
          src={imageUrl}
          sizes="100vw"
          priority={priority}
        />
      </div>
    );
  }
  
  // Otherwise, use the Sanity image object if available
  const image = source?.asset?._ref ? (
    <Image
      className="h-auto w-full"
      width={2000}
      height={1000}
      alt={source?.alt || ""}
      src={urlForImage(source)?.height(1000).width(2000).url() as string}
      sizes="100vw"
      priority={priority}
    />
  ) : (
    <div className="bg-slate-50" style={{ paddingTop: "50%" }} />
  );

  return (
    <div className="shadow-md transition-shadow duration-200 group-hover:shadow-lg sm:mx-0">
      {image}
    </div>
  );
}
