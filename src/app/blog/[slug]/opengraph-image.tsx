import { ImageResponse } from "next/og";
import { getAuthor, getPostBySlug, publishedPosts } from "@/lib/posts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return publishedPosts.map((post) => ({ slug: post.slug }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const author = post ? getAuthor(post.author) : undefined;

  const cells = [
    { left: 1000, top: 60, color: "#7fd99a" },
    { left: 1076, top: 136, color: "#0a2d3b" },
    { left: 1000, top: 212, color: "#ffce6b" },
    { left: 1076, top: 288, color: "#0a2d3b" },
    { left: 1000, top: 364, color: "#0a2d3b" },
    { left: 1076, top: 440, color: "#ff9d94" },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#061e28",
          padding: 72,
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {cells.map((cell) => (
          <div
            key={`${cell.left}-${cell.top}`}
            style={{
              position: "absolute",
              left: cell.left,
              top: cell.top,
              width: 64,
              height: 64,
              borderRadius: 8,
              backgroundColor: cell.color,
              opacity: 0.85,
            }}
          />
        ))}
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#ffab70",
            letterSpacing: 3,
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          Blog da E-Soluções
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 62,
            lineHeight: 1.12,
            color: "#ffffff",
            fontWeight: 700,
            maxWidth: 860,
          }}
        >
          {post?.title ?? "SST na prática"}
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#aed4e3" }}>
          {author?.name ?? "Equipe E-Soluções"}
        </div>
      </div>
    ),
    size,
  );
}
