"use client";
import dynamic from "next/dynamic";

export function FeaturedContent() {
  const Content = dynamic(() => import("./home/FeaturedContent.mdx"), {
    ssr: false,
    loading: () => <div>Loading...</div>,
  });
  return (
    <div className="featured-content prose">
      <Content />
    </div>
  );
}

export function SecondaryContent() {
  const Content = dynamic(() => import("./home/SecondaryContent.mdx"), {
    ssr: false,
    loading: () => <div>Loading...</div>,
  });
  return (
    <div className="secondary-content prose">
      <Content />
    </div>
  );
}
